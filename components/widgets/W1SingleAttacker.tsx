'use client'
import { useCallback } from 'react'
import { useWidgetCanvas } from '@/hooks/useWidgetCanvas'
import { easeOut, clamp, lerp, drawRiskBar, fmtPop } from '@/lib/canvas-utils'

interface Props { widgetRaw: number; isActive: boolean }

const QN = [
  { l: 'Gender',    x: .33, y: .24, r: .04, pop: 6000000, risk: 4  },
  { l: 'Zip code',  x: .57, y: .12, r: .32, pop: 84000,   risk: 13 },
  { l: 'Plan',      x: .80, y: .28, r: .34, pop: 12400,   risk: 22 },
  { l: 'Birth yr',  x: .82, y: .62, r: .48, pop: 890,     risk: 35 },
  { l: 'Diagnosis', x: .56, y: .80, r: .82, pop: 23,      risk: 49 },
]
const EN   = [{ l:'CPF',x:.07,y:.2 },{ l:'Email',x:.07,y:.52 },{ l:'Phone',x:.07,y:.8 },{ l:'Name',x:.27,y:.05 }]
const BN   = [{ l:'Surname',x:.40,y:.92 },{ l:'Religion',x:.18,y:.68 }]
const BLKN = { l:'Occupation', x:.19, y:.72 }
const EDGES: [number,number][] = [[0,1],[1,2],[2,3],[3,4],[0,3],[1,4]]
const STEP_DELTA_LOCAL = 160

export function W1SingleAttacker({ widgetRaw, isActive }: Props) {
  const draw = useCallback((
    ctx: CanvasRenderingContext2D, W: number, H: number,
    step: number, progress: number, fg: number, killFlash: number
  ) => {
    ctx.clearRect(0, 0, W, H)
    if (killFlash > 0) {
      ctx.fillStyle = `rgba(29,158,117,${killFlash * .15})`
      ctx.fillRect(0, 0, W, H)
    }

    const killP = step >= 5 ? easeOut(progress) : 0
    const nx = (n: {x:number}) => n.x * W
    const ny = (n: {y:number}) => n.y * H

    // Field glow
    if (step > 0 && killP < .9) {
      for (let i = 0; i < step; i++) for (let j = i+1; j < step; j++) {
        const ai = i < step-1 ? 1 : easeOut(progress)
        const aj = j < step-1 ? 1 : easeOut(progress)
        ctx.beginPath(); ctx.moveTo(nx(QN[i]),ny(QN[i])); ctx.lineTo(nx(QN[j]),ny(QN[j]))
        ctx.strokeStyle = `rgba(226,75,74,${Math.min(ai,aj)*fg*.1})`; ctx.lineWidth = 9; ctx.stroke()
      }
    }

    // Edges
    EDGES.forEach(([a,b]) => {
      const ai = a < step-1 ? 1 : a === step-1 ? easeOut(progress) : 0
      const bi = b < step-1 ? 1 : b === step-1 ? easeOut(progress) : 0
      const ea = Math.min(ai,bi); if (ea < .02) return
      ctx.beginPath(); ctx.moveTo(nx(QN[a]),ny(QN[a])); ctx.lineTo(nx(QN[b]),ny(QN[b]))
      if (killP > .5) { ctx.strokeStyle = `rgba(255,185,0,0)`; ctx.lineWidth = 0 }
      else { ctx.strokeStyle = `rgba(226,75,74,${.6*ea})`; ctx.lineWidth = 1.6 }
      ctx.stroke()
    })

    // Enc nodes
    EN.forEach(n => {
      ctx.beginPath(); ctx.arc(nx(n),ny(n),13,0,Math.PI*2)
      ctx.fillStyle = 'rgba(255,255,255,.03)'; ctx.fill()
      ctx.strokeStyle = 'rgba(255,255,255,.09)'; ctx.lineWidth = .8; ctx.stroke()
      ctx.textAlign = 'center'; ctx.fillStyle = 'rgba(255,255,255,.2)'
      ctx.font = '7px "JetBrains Mono",monospace'; ctx.fillText(n.l,nx(n),ny(n)-2)
      ctx.fillStyle = 'rgba(255,255,255,.09)'; ctx.font = '6px "JetBrains Mono",monospace'; ctx.fillText('enc',nx(n),ny(n)+8)
    })
    BN.forEach(n => {
      ctx.beginPath(); ctx.arc(nx(n),ny(n),11,0,Math.PI*2)
      ctx.strokeStyle='rgba(226,75,74,.13)'; ctx.setLineDash([2,4]); ctx.lineWidth=.7; ctx.stroke(); ctx.setLineDash([])
      ctx.textAlign='center'; ctx.fillStyle='rgba(226,75,74,.2)'; ctx.font='7px "JetBrains Mono",monospace'; ctx.fillText(n.l,nx(n),ny(n)+3)
    })

    // Quasi nodes
    QN.forEach((n, i) => {
      const a = i < step-1 ? 1 : i === step-1 ? easeOut(progress) : 0
      const x = nx(n), y = ny(n), r = 20 + n.r * 8
      if (a < .02) {
        ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2)
        ctx.fillStyle='rgba(113,102,209,.04)'; ctx.fill()
        ctx.strokeStyle='rgba(113,102,209,.1)'; ctx.lineWidth=1; ctx.stroke()
        ctx.textAlign='center'; ctx.fillStyle='rgba(113,102,209,.2)'
        ctx.font='500 8px "JetBrains Mono",monospace'; ctx.fillText(n.l,x,y+3)
        return
      }
      if (killP < .5) {
        ctx.beginPath(); ctx.arc(x,y,r+fg*6*a,0,Math.PI*2)
        ctx.fillStyle=`rgba(226,75,74,${.08*fg*a})`; ctx.fill()
      }
      ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2)
      if (killP > .5) { ctx.fillStyle=`rgba(255,185,0,${.07*a})`; ctx.fill(); ctx.strokeStyle=`rgba(255,185,0,${.45*a})`; ctx.lineWidth=1.2 }
      else { ctx.fillStyle=`rgba(226,75,74,${.12*a})`; ctx.fill(); ctx.strokeStyle=`rgba(226,75,74,${.75*a})`; ctx.lineWidth=1.3 }
      ctx.stroke()
      ctx.textAlign='center'
      ctx.fillStyle = killP>.5 ? `rgba(255,185,0,${.85*a})` : `rgba(226,75,74,${a})`
      ctx.font='500 8px "JetBrains Mono",monospace'; ctx.fillText(n.l,x,y-7)
      ctx.fillStyle=`rgba(255,255,255,${.22*a})`; ctx.font='7px "JetBrains Mono",monospace'
      ctx.fillText('[0x'+Math.abs((n.r*1e6+i*7)|0).toString(16).slice(0,4)+'…]',x,y+3)
      const pop = i < step-1 ? n.pop : lerp(6e6,n.pop,easeOut(progress))
      ctx.fillStyle=`rgba(255,255,255,${.3*a})`; ctx.fillText(fmtPop(pop),x,y+13)

      // ISOLATED: pulsing rings + bold label + causal break
      if (killP > .5 && i === 4) {
        const ra = killP*(0.35+fg*.25)
        ctx.beginPath(); ctx.arc(x,y,r+10+fg*10,0,Math.PI*2); ctx.strokeStyle=`rgba(29,158,117,${ra})`; ctx.lineWidth=2; ctx.stroke()
        ctx.beginPath(); ctx.arc(x,y,r+22+fg*6,0,Math.PI*2); ctx.strokeStyle=`rgba(29,158,117,${ra*.4})`; ctx.lineWidth=1; ctx.stroke()
        ctx.fillStyle=`rgba(29,158,117,${killP*a*.95})`; ctx.font='700 12px "JetBrains Mono",monospace'; ctx.fillText('ISOLATED',x,y+32)
        ctx.fillStyle=`rgba(29,158,117,${killP*a*.45})`; ctx.font='8px "JetBrains Mono",monospace'; ctx.fillText('causal break',x,y+47)
      }
    })

    // Blocked node
    if (killP > .3) {
      const a = easeOut((killP-.3)/.7)
      const x = nx(BLKN), y = ny(BLKN)
      ctx.beginPath(); ctx.arc(x,y,22,0,Math.PI*2)
      ctx.fillStyle=`rgba(232,237,245,${.06*a})`; ctx.fill()
      ctx.strokeStyle=`rgba(232,237,245,${.4*a})`; ctx.lineWidth=1.2; ctx.stroke()
      ctx.textAlign='center'; ctx.fillStyle=`rgba(232,237,245,${.8*a})`
      ctx.font='500 8px "JetBrains Mono",monospace'; ctx.fillText(BLKN.l,x,y-4)
      ctx.fillStyle=`rgba(29,158,117,${.8*a})`; ctx.font='7px "JetBrains Mono",monospace'; ctx.fillText('ISOLATED',x,y+8)
    }

    // Risk bar
    const ai = clamp(step-1, 0, 4)
    const baseRisk = step <= 0 ? 0 : step >= 5 ? QN[4].risk : lerp(ai>0?QN[ai-1].risk:0, QN[ai].risk, easeOut(progress))
    drawRiskBar(ctx, W, Math.round(baseRisk))

    // Population counter
    if (step > 0) {
      const ai2 = clamp(step-1,0,4)
      const popNow = step<=1 ? lerp(6e6,QN[0].pop,easeOut(progress)) : lerp(QN[Math.max(0,ai2-1)].pop||6e6, QN[ai2].pop, easeOut(progress))
      ctx.fillStyle='rgba(255,255,255,.18)'; ctx.font='8px "JetBrains Mono",monospace'; ctx.textAlign='start'
      ctx.fillText('individuals matching profile',20,H-30)
      ctx.fillStyle='rgba(255,255,255,.8)'; ctx.font='500 20px "JetBrains Mono",monospace'; ctx.fillText(fmtPop(Math.round(popNow)),20,H-9)
    }
    if (killP > .6) {
      const a2 = easeOut((killP-.6)/.4)
      ctx.fillStyle=`rgba(255,255,255,${.55*a2})`; ctx.font='9px "JetBrains Mono",monospace'; ctx.textAlign='start'
      ctx.fillText('anomalies detected: 0  ·  raw data accessed: 0  ·  credentials: valid',20,H-9)
    }
  }, [])

  const canvasRef = useWidgetCanvas({ totalSteps: 6, widgetRaw, isActive, draw })
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
}
