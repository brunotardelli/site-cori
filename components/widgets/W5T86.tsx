'use client'
import { useCallback } from 'react'
import { useWidgetCanvas } from '@/hooks/useWidgetCanvas'
import { easeOut, clamp, drawRiskBar } from '@/lib/canvas-utils'

interface Props { widgetRaw: number; isActive: boolean }

const TN=[{l:'Diagnosis',x:.17,y:.19,r:.85},{l:'CPF',x:.40,y:.10,r:.97},{l:'Zip code',x:.70,y:.18,r:.78},{l:'Salary',x:.85,y:.52,r:.62},{l:'Name',x:.66,y:.78,r:.15},{l:'Marital',x:.32,y:.84,r:.70},{l:'Employer',x:.07,y:.64,r:.65},{l:'Education',x:.09,y:.36,r:.50}]
const TE:Array<[number,number]>=[[0,1],[1,2],[2,3],[0,5],[5,6],[6,7],[7,0],[1,5],[2,5],[0,2],[1,6]]
const BLAST=new Set([0,1,2,5,6,7])
const ROWS=[{n:'João Silva',c:'048.212.387-91',d:'F41.1',z:'01310-100',s:'R$4-6k'},{n:'Maria Costa',c:'271.839.442-07',d:'I10',z:'01310-200',s:'R$4-6k'}]
function encVal(seed:number){return '[ENC:'+Math.abs(seed*9973%65536).toString(16).toUpperCase().padStart(4,'0')+'…]'}

export function W5T86({ widgetRaw, isActive }: Props) {
  const draw = useCallback((
    ctx: CanvasRenderingContext2D, W: number, H: number,
    step: number, progress: number, fg: number
  ) => {
    ctx.clearRect(0,0,W,H)
    const tblH=82, gH=H-tblH-8
    const phase=clamp(step,0,4)
    const blastActive=phase>=2
    const encActive=phase>=3
    const encProg=phase>=3?(phase>=4?1:easeOut(progress)):0
    const nx=(n:{x:number})=>n.x*W, ny=(n:{y:number})=>n.y*gH

    TN.forEach((ni,i)=>TN.forEach((nj,j)=>{
      if(j<=i)return
      if(Math.hypot(ni.x*W-nj.x*W,ni.y*gH-nj.y*gH)>W*.65)return
      const inB=(BLAST.has(i)||BLAST.has(j))&&blastActive
      const al=fg*(inB?.12:.04)
      const col=phase<=1?'29,158,117':phase===2?'239,159,39':'226,75,74'
      ctx.beginPath();ctx.moveTo(ni.x*W,ni.y*gH);ctx.lineTo(nj.x*W,nj.y*gH)
      ctx.strokeStyle=`rgba(${col},${al})`;ctx.lineWidth=7;ctx.stroke()
    }))
    TE.forEach(([a,b])=>{
      const na=TN[a],nb=TN[b]
      const bothE=encActive&&BLAST.has(a)&&BLAST.has(b)
      if(bothE&&encProg>.9)return
      const isE=encActive&&(BLAST.has(a)||BLAST.has(b))&&encProg>.5
      const inB=(BLAST.has(a)||BLAST.has(b))&&blastActive
      ctx.beginPath();ctx.moveTo(nx(na),ny(na));ctx.lineTo(nx(nb),ny(nb))
      ctx.strokeStyle=isE?`rgba(113,102,209,${.2*encProg})`:inB?'rgba(239,159,39,.45)':phase<=1?'rgba(29,158,117,.35)':'rgba(226,75,74,.35)'
      ctx.lineWidth=1.3;ctx.stroke()
    })
    TN.forEach((n,i)=>{
      const x=nx(n),y=ny(n),r=17+n.r*5
      const isE=encActive&&BLAST.has(i)
      const encP=isE?clamp((encProg-(i%4)*.12)/.6,0,1):0
      const isB=BLAST.has(i)&&blastActive&&!isE
      let bg,bd,tc
      if(isE&&encP>.5){bg='rgba(113,102,209,.1)';bd='rgba(113,102,209,.55)';tc='rgba(113,102,209,.8)'}
      else if(isB){ctx.beginPath();ctx.arc(x,y,r+fg*9,0,Math.PI*2);ctx.fillStyle=`rgba(239,159,39,${fg*.08})`;ctx.fill();bg='rgba(239,159,39,.1)';bd='rgba(239,159,39,.7)';tc='#EF9F27'}
      else if(phase<=1){bg='rgba(29,158,117,.08)';bd='rgba(29,158,117,.5)';tc='rgba(29,158,117,.85)'}
      else{bg='rgba(226,75,74,.08)';bd='rgba(226,75,74,.5)';tc='rgba(226,75,74,.85)'}
      ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fillStyle=bg;ctx.fill();ctx.strokeStyle=bd;ctx.lineWidth=1.2;ctx.stroke()
      ctx.textAlign='center';ctx.fillStyle=tc;ctx.font='500 8px "JetBrains Mono",monospace';ctx.fillText(n.l,x,y+3)
      if(isE&&encP>.5){ctx.fillStyle=`rgba(113,102,209,${encP*.5})`;ctx.font='6px "JetBrains Mono",monospace';ctx.fillText('encrypted',x,y+12)}
    })

    // Mini table
    const ty=gH+4,tw=W-28,tx=14
    ctx.fillStyle='rgba(255,255,255,.025)';ctx.fillRect(tx,ty,tw,tblH)
    ctx.strokeStyle='rgba(255,255,255,.07)';ctx.lineWidth=.7;ctx.strokeRect(tx,ty,tw,tblH)
    const cw2=tw/5
    ;['Name','CPF','Diagnosis','Zip','Salary'].forEach((h2,i2)=>{ctx.fillStyle='rgba(255,255,255,.22)';ctx.font='7px "JetBrains Mono",monospace';ctx.textAlign='start';ctx.fillText(h2,tx+i2*cw2+4,ty+11)})
    ROWS.forEach((row,ri)=>{
      const ry=ty+22+ri*20
      const vals=[row.n,row.c,encActive&&encProg>.3?encVal(ri*10+0):row.d,encActive&&encProg>.5?encVal(ri*10+1):row.z,encActive&&encProg>.7?encVal(ri*10+2):row.s]
      vals.forEach((v,ci)=>{const isE2=v.startsWith('[ENC');ctx.fillStyle=isE2?'rgba(113,102,209,.8)':'rgba(255,255,255,.6)';ctx.font='8px "JetBrains Mono",monospace';ctx.textAlign='start';ctx.fillText(v.slice(0,17),tx+ci*cw2+4,ry)})
    })

    const risk=[12,42,49,51,51][phase]
    drawRiskBar(ctx,W,risk,'reconstruction risk')
    const labels=['normal operation','approaching limit','threshold exceeded — CORI intervenes','HSM executing encryption','protection active']
    const lcol=['rgba(29,158,117,.7)','rgba(239,159,39,.7)','rgba(226,75,74,.8)','rgba(113,102,209,.85)','rgba(232,237,245,.6)']
    ctx.fillStyle=lcol[phase];ctx.font='9px "JetBrains Mono",monospace';ctx.textAlign='start';ctx.fillText(labels[phase],14,gH-3)
    if(phase>=4){ctx.fillStyle='rgba(255,255,255,.65)';ctx.font='500 9px "JetBrains Mono",monospace';ctx.textAlign='start';ctx.fillText('No query was denied. No anomaly. No error returned.',14,H-6)}
  }, [])

  const canvasRef = useWidgetCanvas({ totalSteps: 5, widgetRaw, isActive, draw })
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
}
