'use client'
import { useCallback } from 'react'
import { useWidgetCanvas } from '@/hooks/useWidgetCanvas'
import { easeOut, drawCoverageBar } from '@/lib/canvas-utils'

interface Props { widgetRaw: number; isActive: boolean }

const OPS = {
  A:{id:'OP-4471',col:'#7166D1',n:[0,1,2]},
  B:{id:'OP-8823',col:'#1D9E75',n:[3,4,5]},
  C:{id:'OP-2241',col:'#EF9F27',n:[6,7,2]},
} as const
type OpKey = keyof typeof OPS
const EDGS: Record<OpKey,[number,number][]> = {A:[[0,1],[1,2],[0,2]],B:[[3,4],[4,5],[3,5]],C:[[6,7],[7,2],[6,2]]}
const QN=[{id:0,l:'Zip',x:.17,y:.2},{id:1,l:'Salary',x:.48,y:.1},{id:2,l:'Age',x:.80,y:.23},{id:3,l:'Marital',x:.86,y:.56},{id:4,l:'Nationality',x:.67,y:.80},{id:5,l:'Employer',x:.37,y:.86},{id:6,l:'Occupation',x:.09,y:.7},{id:7,l:'Education',x:.11,y:.4}]
const EN=[{l:'CPF',x:.04,y:.28},{l:'Name',x:.30,y:.05}]
const COV=[0,28,47,62,74]

export function W3Collusion({ widgetRaw, isActive }: Props) {
  const draw = useCallback((
    ctx: CanvasRenderingContext2D, W: number, H: number,
    step: number, progress: number, fg: number
  ) => {
    ctx.clearRect(0,0,W,H)
    const killP = step>=3?easeOut(progress):0
    const opAlphaFn = (op:OpKey) => {const idx={A:0,B:1,C:2}[op];return idx<step-1?1:idx===step-1?easeOut(progress):0}
    const oA: Record<OpKey,number> = {A:opAlphaFn('A'),B:opAlphaFn('B'),C:opAlphaFn('C')}
    const nx=(n:{x:number})=>n.x*W, ny=(n:{y:number})=>n.y*H

    // Field
    const opList=(Object.keys(oA) as OpKey[]).filter(k=>oA[k]>.05)
    if(opList.length>=2&&killP<.8){
      for(let i=0;i<opList.length;i++) for(let j=i+1;j<opList.length;j++){
        const opX=OPS[opList[i]],opY=OPS[opList[j]]
        opX.n.forEach(na=>opY.n.forEach(nb=>{
          if(na===nb)return
          const nA=QN.find(n=>n.id===na),nB=QN.find(n=>n.id===nb)
          if(!nA||!nB)return
          const alpha=.05*fg*Math.min(oA[opList[i]],oA[opList[j]])
          const gr=ctx.createLinearGradient(nx(nA),ny(nA),nx(nB),ny(nB))
          gr.addColorStop(0,opX.col+Math.round(alpha*255).toString(16).padStart(2,'0'))
          gr.addColorStop(1,opY.col+Math.round(alpha*255).toString(16).padStart(2,'0'))
          ctx.beginPath();ctx.moveTo(nx(nA),ny(nA));ctx.lineTo(nx(nB),ny(nB));ctx.strokeStyle=gr;ctx.lineWidth=7;ctx.stroke()
        }))
      }
    }
    ;(Object.keys(oA) as OpKey[]).forEach(op=>{
      const a=oA[op];if(a<.02)return
      EDGS[op].forEach(([x,y])=>{const na=QN.find(n=>n.id===x),nb=QN.find(n=>n.id===y);if(!na||!nb)return;ctx.beginPath();ctx.moveTo(nx(na),ny(na));ctx.lineTo(nx(nb),ny(nb));if(killP>.5){ctx.strokeStyle=`rgba(255,185,0,${.35*a})`;ctx.lineWidth=1.2}else{ctx.strokeStyle=OPS[op].col+Math.round(a*0x99).toString(16).padStart(2,'0');ctx.lineWidth=1.8};ctx.stroke()})
      if(!killP&&a>.4){const ns=OPS[op].n;const cxp=ns.reduce((s,id)=>s+nx(QN.find(n=>n.id===id)!),0)/ns.length;const cyp=ns.reduce((s,id)=>s+ny(QN.find(n=>n.id===id)!),0)/ns.length;ctx.fillStyle=OPS[op].col+Math.round(a*0xbb).toString(16).padStart(2,'0');ctx.font='7px "JetBrains Mono",monospace';ctx.textAlign='center';ctx.fillText(OPS[op].id,cxp,cyp)}
    })
    EN.forEach(n=>{ctx.beginPath();ctx.arc(nx(n),ny(n),12,0,Math.PI*2);ctx.fillStyle='rgba(255,255,255,.025)';ctx.fill();ctx.strokeStyle='rgba(255,255,255,.09)';ctx.lineWidth=.7;ctx.stroke();ctx.textAlign='center';ctx.fillStyle='rgba(255,255,255,.2)';ctx.font='7px "JetBrains Mono",monospace';ctx.fillText(n.l,nx(n),ny(n)+3)})
    QN.forEach(n=>{
      const x=nx(n),y=ny(n),r=20
      const opsCovering=(Object.keys(oA) as OpKey[]).filter(op=>OPS[op].n.includes(n.id))
      const maxA=opsCovering.reduce((m,op)=>Math.max(m,oA[op]),0)
      const isOv=n.id===2&&oA.A>.1&&oA.C>.1
      const col=opsCovering.length>0?OPS[opsCovering[0]].col:null
      let bg,bd,tc
      if(killP>.5){bg='rgba(255,185,0,.07)';bd='rgba(255,185,0,.4)';tc='rgba(255,185,0,.75)'}
      else if(isOv){bg='rgba(255,255,255,.08)';bd='rgba(255,255,255,.6)';tc='rgba(255,255,255,.9)'}
      else if(maxA>.05&&col){bg=col+'22';bd=col+'cc';tc=col}
      else{bg='rgba(113,102,209,.04)';bd='rgba(113,102,209,.13)';tc='rgba(113,102,209,.28)'}
      if(maxA>.05&&!killP){ctx.beginPath();ctx.arc(x,y,r+fg*(isOv?5:2.5)*maxA,0,Math.PI*2);ctx.fillStyle=isOv?`rgba(255,255,255,${.07*maxA})`:(col||'#fff')+Math.round(maxA*.15*255).toString(16).padStart(2,'0')+'18';ctx.fill()}
      ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fillStyle=bg;ctx.fill();ctx.strokeStyle=bd;ctx.lineWidth=isOv?2:1.2;ctx.stroke()
      ctx.textAlign='center';ctx.fillStyle=tc;ctx.font='500 8px "JetBrains Mono",monospace';ctx.fillText(n.l,x,y+3)
      if(isOv&&!killP){ctx.font='6px "JetBrains Mono",monospace';ctx.fillStyle='rgba(255,255,255,.35)';ctx.fillText('overlap',x,y+13)}
    })
    drawCoverageBar(ctx,W,COV[Math.min(step,4)])
    if(killP>.5){const a=easeOut((killP-.5)/.5);ctx.fillStyle=`rgba(255,255,255,${.7*a})`;ctx.font='500 10px "JetBrains Mono",monospace';ctx.textAlign='start';ctx.fillText('Three operators. Each below the limit. Together, they resolved the space.',20,H-22);ctx.fillStyle=`rgba(29,158,117,${.7*a})`;ctx.font='9px "JetBrains Mono",monospace';ctx.fillText('Anomalies detected: 0  ·  CORI blocked the pattern.',20,H-7)}
  }, [])

  const canvasRef = useWidgetCanvas({ totalSteps: 4, widgetRaw, isActive, draw })
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
}
