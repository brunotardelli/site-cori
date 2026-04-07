'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { STEP_DELTA } from '@/lib/constants'

interface Props { widgetRaw: number; isActive: boolean }

// ── W6 Attack Cost ──────────────────────────────────────────────────────────

const W6_STEPS = [
  {
    render: () => (
      <div>
        <div className="font-sans font-bold mb-3" style={{fontSize:12,color:'rgba(255,255,255,.85)'}}>Three dimensions. All compound before the goal is reached.</div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:2}}>
          {['Without CORI','With CORI'].map((h,i)=>(
            <div key={h} className="px-3 py-2 font-mono text-[9px] uppercase tracking-[.1em]" style={{background:i?'rgba(29,158,117,.06)':'rgba(226,75,74,.08)',border:`1px solid ${i?'rgba(29,158,117,.18)':'rgba(226,75,74,.2)'}`,color:i?'rgba(29,158,117,.7)':'rgba(226,75,74,.7)',borderRadius:'3px 3px 0 0'}}>{h}</div>
          ))}
          {[['operational cost','low — fixed per query','exponential — compounds with risk'],['forensic exposure','zero — no usable trace','maximum — before completion'],['legal risk','low — no provable pattern','maximum — cryptographic proof']].map(([d,n2,y])=>[
            <div key={d+'n'} className="px-3 py-2.5 font-mono text-[9px] leading-[1.7]" style={{border:'1px solid rgba(255,255,255,.05)',background:'rgba(226,75,74,.03)'}}>
              <div className="text-[7px] uppercase tracking-[.07em] mb-1" style={{color:'rgba(255,255,255,.22)'}}>{d}</div>
              <div style={{color:'rgba(226,75,74,.8)'}}>{n2}</div>
            </div>,
            <div key={d+'y'} className="px-3 py-2.5 font-mono text-[9px] leading-[1.7]" style={{border:'1px solid rgba(255,255,255,.05)',background:'rgba(29,158,117,.02)'}}>
              <div className="text-[7px] uppercase tracking-[.07em] mb-1" style={{color:'rgba(255,255,255,.22)'}}>{d}</div>
              <div style={{color:'rgba(29,158,117,.85)'}}>{y}</div>
            </div>
          ])}
        </div>
      </div>
    ),
  },
  {
    render: () => (
      <div>
        <div className="font-sans font-bold mb-2" style={{fontSize:12,color:'rgba(255,255,255,.85)'}}>Total attack cost vs data value recovered.</div>
        <div className="flex justify-end gap-3.5 mb-1.5 font-mono text-[9px]">
          <span style={{color:'rgba(226,75,74,.7)'}}>— without CORI</span>
          <span style={{color:'rgba(29,158,117,.7)'}}>— with CORI</span>
        </div>
        <CostChart showCross={false} />
      </div>
    ),
  },
  {
    render: () => (
      <div>
        <div className="font-sans font-bold mb-2" style={{fontSize:12,color:'rgba(255,255,255,.85)'}}>The crossover: ~42 queries.</div>
        <CostChart showCross={true} />
        <div className="mt-2.5 px-3 py-2.5 rounded-[3px] font-mono text-[10px] leading-[1.8]" style={{border:'1px solid rgba(29,158,117,.2)',background:'rgba(29,158,117,.04)',color:'rgba(255,255,255,.4)'}}>
          <span style={{color:'#1D9E75'}}>Crossover: ~42 queries.</span> After this, the attack costs more than the value of the data. <span style={{color:'rgba(255,255,255,.65)'}}>Economically irrational.</span>
        </div>
      </div>
    ),
  },
  {
    render: () => (
      <div>
        <div className="font-sans font-bold mb-4 leading-[1.4]" style={{fontSize:14,color:'rgba(255,255,255,.8)'}}>
          Without CORI: low cost, no trace, no consequence.<br />
          <span style={{color:'#E24B4A'}}>With CORI: exponential cost, forensic signature, cryptographic proof of breach.</span>
        </div>
        {['Every move is recorded before the goal is reached.','Every pattern generates a topological signature linked to the operator.','The Verkle tree already holds the proof. The contract defines what was violated.'].map(t=>(
          <div key={t} className="font-mono text-[10px] px-3 py-1.5 mb-1.5 leading-[1.8]" style={{borderLeft:'1px solid rgba(255,255,255,.08)',color:'rgba(255,255,255,.4)'}}>{t}</div>
        ))}
      </div>
    ),
  },
]

function CostChart({ showCross }: { showCross: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const cv = ref.current; if (!cv) return
    const ctx = cv.getContext('2d'); if (!ctx) return
    cv.width = cv.offsetWidth; cv.height = 185
    const W=cv.width,H=185,pl=30,pr=18,pt=12,pb=20,cw=W-pl-pr,ch=H-pt-pb
    for(let i=0;i<=4;i++){const y=pt+ch*(1-i/4);ctx.beginPath();ctx.moveTo(pl,y);ctx.lineTo(pl+cw,y);ctx.strokeStyle='rgba(255,255,255,.05)';ctx.lineWidth=.5;ctx.stroke()}
    ctx.setLineDash([4,4]);ctx.beginPath();ctx.moveTo(pl,pt+ch*.35);ctx.lineTo(pl+cw,pt+ch*.35);ctx.strokeStyle='rgba(255,255,255,.12)';ctx.lineWidth=1;ctx.stroke();ctx.setLineDash([])
    ctx.fillStyle='rgba(255,255,255,.16)';ctx.font='7px "JetBrains Mono",monospace';ctx.textAlign='start';ctx.fillText('data value',pl+cw+3,pt+ch*.35+3)
    let cx2:number|null=null
    ctx.beginPath();for(let i=0;i<=200;i++){const t=i/200;const x=pl+t*cw,y=pt+ch*(1-Math.min(t*.28,1));i===0?ctx.moveTo(x,y):ctx.lineTo(x,y)};ctx.strokeStyle='rgba(226,75,74,.75)';ctx.lineWidth=2;ctx.stroke()
    ctx.beginPath();for(let i=0;i<=200;i++){const t=i/200;let c=t<.38?t*.25:.38*.25+Math.pow((t-.38)*3.2,2.2)*.9;const nc=Math.min(c,1);const x=pl+t*cw,y=pt+ch*(1-nc);i===0?ctx.moveTo(x,y):ctx.lineTo(x,y);if(!cx2&&nc>=.65)cx2=x};ctx.strokeStyle='rgba(29,158,117,.85)';ctx.lineWidth=2;ctx.stroke()
    if(showCross&&cx2){ctx.beginPath();ctx.arc(cx2,pt+ch*.35,4,0,Math.PI*2);ctx.fillStyle='rgba(239,159,39,.9)';ctx.fill();ctx.fillStyle='rgba(239,159,39,.8)';ctx.font='7px "JetBrains Mono",monospace';ctx.textAlign='center';ctx.fillText('crossover',cx2,pt+ch+17)}
  }, [showCross])
  return <canvas ref={ref} style={{display:'block',width:'100%',height:185,border:'1px solid rgba(255,255,255,.05)',borderRadius:3}} />
}

export function W6AttackCost({ widgetRaw, isActive }: Props) {
  const step = Math.min(Math.floor(widgetRaw / STEP_DELTA), W6_STEPS.length - 1)
  const [displayStep, setDisplayStep] = useState(step)
  const prevStep = useRef(step)
  useEffect(() => { if (prevStep.current !== step) { prevStep.current = step; setDisplayStep(step) } }, [step])
  const s = W6_STEPS[displayStep]
  return (
    <div className="dom-body">
      <AnimatePresence mode="wait">
        <motion.div key={displayStep} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}} transition={{duration:0.16}}>
          {s.render()}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
