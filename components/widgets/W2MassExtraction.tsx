'use client'
import { useCallback } from 'react'
import { useWidgetCanvas } from '@/hooks/useWidgetCanvas'
import { easeOut, drawRiskBar } from '@/lib/canvas-utils'

interface Props { widgetRaw: number; isActive: boolean }

const OPS = [
  { id:'OP-4471', col:'#7166D1', na:[0,1] },
  { id:'OP-8823', col:'#1D9E75', na:[1,2] },
  { id:'OP-2241', col:'#EF9F27', na:[0,3] },
  { id:'OP-3319', col:'#E24B4A', na:[1,4] },
  { id:'OP-7762', col:'#5DCAA5', na:[2,3] },
]
const QN = [
  {id:0,l:'Gender',x:.33,y:.24},{id:1,l:'Zip code',x:.58,y:.14},
  {id:2,l:'Plan',x:.80,y:.30},{id:3,l:'Birth yr',x:.78,y:.66},{id:4,l:'Diagnosis',x:.54,y:.82},
]
const EN = [{l:'CPF',x:.07,y:.2},{l:'Email',x:.07,y:.5},{l:'Name',x:.25,y:.07}]

export function W2MassExtraction({ widgetRaw, isActive }: Props) {
  const draw = useCallback((
    ctx: CanvasRenderingContext2D, W: number, H: number,
    step: number, progress: number, fg: number
  ) => {
    ctx.clearRect(0, 0, W, H)
    const killP = step >= 5 ? easeOut(progress) : 0
    const opA = OPS.map((_,i) => i < step-1 ? 1 : i===step-1 ? easeOut(progress) : 0)
    const td: Record<number,number> = {}
    QN.forEach(n => td[n.id]=0)
    OPS.forEach((op,i) => op.na.forEach(id => td[id] += opA[i]))
    const nx = (n:{x:number}) => n.x*W, ny = (n:{y:number}) => n.y*H

    // Field
    const hi = QN.filter(n => td[n.id] >= 1.2)
    if (hi.length >= 2 && killP < .8) {
      for (let i=0;i<hi.length;i++) for (let j=i+1;j<hi.length;j++){
        const a = Math.min(td[hi[i].id],td[hi[j].id])
        const alpha = (a/5)*.16*fg
        const gr = ctx.createLinearGradient(nx(hi[i]),ny(hi[i]),nx(hi[j]),ny(hi[j]))
        gr.addColorStop(0,`rgba(226,75,74,${alpha})`); gr.addColorStop(.5,`rgba(239,159,39,${alpha*1.5})`); gr.addColorStop(1,`rgba(226,75,74,${alpha})`)
        ctx.beginPath(); ctx.moveTo(nx(hi[i]),ny(hi[i])); ctx.lineTo(nx(hi[j]),ny(hi[j]))
        ctx.strokeStyle=gr; ctx.lineWidth=10; ctx.stroke()
      }
    }
    OPS.forEach((op,i) => {
      const a=opA[i]; if(a<.02)return
      const na=QN[op.na[0]],nb=QN[op.na[1]]
      ctx.beginPath(); ctx.moveTo(nx(na),ny(na)); ctx.lineTo(nx(nb),ny(nb))
      if(killP>.5){ctx.strokeStyle=`rgba(255,185,0,${.35*a})`;ctx.lineWidth=1.2}
      else{ctx.strokeStyle=op.col+Math.round(a*0x99).toString(16).padStart(2,'0');ctx.lineWidth=1.6}
      ctx.stroke()
      if(!killP&&a>.35){const mx=(nx(na)+nx(nb))/2,my=(ny(na)+ny(nb))/2;ctx.fillStyle=op.col+Math.round(a*0xbb).toString(16).padStart(2,'0');ctx.font='7px "JetBrains Mono",monospace';ctx.textAlign='center';ctx.fillText(op.id,mx,my-7)}
    })
    EN.forEach(n=>{ctx.beginPath();ctx.arc(nx(n),ny(n),13,0,Math.PI*2);ctx.fillStyle='rgba(255,255,255,.03)';ctx.fill();ctx.strokeStyle='rgba(255,255,255,.09)';ctx.lineWidth=.7;ctx.stroke();ctx.textAlign='center';ctx.fillStyle='rgba(255,255,255,.2)';ctx.font='7px "JetBrains Mono",monospace';ctx.fillText(n.l,nx(n),ny(n)+3)})
    QN.forEach(n=>{
      const x=nx(n),y=ny(n),d=td[n.id],r=19+d*2.5,h=d/5
      if(d>0&&killP<.8){ctx.beginPath();ctx.arc(x,y,r+fg*d*2.5,0,Math.PI*2);ctx.fillStyle=`rgba(226,75,74,${h*.09*fg})`;ctx.fill()}
      let bg,bd,tc
      if(killP>.5){bg='rgba(255,185,0,.07)';bd='rgba(255,185,0,.45)';tc='rgba(255,185,0,.8)'}
      else if(d<.1){bg='rgba(113,102,209,.04)';bd='rgba(113,102,209,.13)';tc='rgba(113,102,209,.28)'}
      else{bg=`rgba(226,75,74,${.06+h*.14})`;bd=`rgba(226,75,74,${.35+h*.5})`;tc=`rgba(226,${Math.round(75+h*20)},74,1)`}
      ctx.beginPath();ctx.arc(x,y,Math.max(r,19),0,Math.PI*2);ctx.fillStyle=bg;ctx.fill();ctx.strokeStyle=bd;ctx.lineWidth=1.2;ctx.stroke()
      ctx.textAlign='center';ctx.fillStyle=tc;ctx.font='500 8px "JetBrains Mono",monospace';ctx.fillText(n.l,x,y-4)
      if(d>.1){ctx.font='7px "JetBrains Mono",monospace';ctx.fillStyle=tc+'cc';ctx.fillText(Math.round(d)+' ops',x,y+7)}
    })
    const dens = step<=0?0:[18,28,37,44,50,51][step-1]??50
    drawRiskBar(ctx,W,Math.min(dens,51),'token density signal')
    if(killP>.5){const a=easeOut((killP-.5)/.5);ctx.fillStyle=`rgba(255,255,255,${.7*a})`;ctx.font='500 10px "JetBrains Mono",monospace';ctx.textAlign='start';ctx.fillText('No operator violated policy. Yet the system would have failed.',20,H-24);ctx.fillStyle=`rgba(29,158,117,${.7*a})`;ctx.font='9px "JetBrains Mono",monospace';ctx.fillText('Compliance was preserved. Exposure was inevitable.',20,H-8)}
    else if(step>=4){ctx.fillStyle='rgba(255,255,255,.28)';ctx.font='8px "JetBrains Mono",monospace';ctx.textAlign='start';ctx.fillText('anomalies detected: 0  ·  all sessions compliant',20,H-10)}
  }, [])

  const canvasRef = useWidgetCanvas({ totalSteps: 6, widgetRaw, isActive, draw })
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
}
