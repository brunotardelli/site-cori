'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { STEP_DELTA } from '@/lib/constants'

interface Props { widgetRaw: number; isActive: boolean }

const STEPS = [
  {
    title: 'Your raw database.',
    content: `Before any query. This is where identity already exists — latent in the structure.`,
    render: () => (
      <div className="border rounded-[3px] overflow-hidden" style={{borderColor:'rgba(255,255,255,.08)'}}>
        <div className="grid text-[8px] tracking-[.07em] uppercase px-3 py-1.5 font-mono" style={{gridTemplateColumns:'1fr 1.2fr 1.2fr 1fr',background:'rgba(255,255,255,.03)',borderBottom:'1px solid rgba(255,255,255,.05)',color:'rgba(255,255,255,.28)'}}>
          <span>Name</span><span>CPF</span><span>Email</span><span>Diagnosis</span>
        </div>
        {[['João Silva','048.212.387-91','joao@email.com','F41.1'],['Maria Costa','271.839.442-07','maria@hosp.br','I10'],['Carlos Lima','509.318.774-22','carlos@gov.br','E11.9']].map((r,i)=>(
          <div key={i} className="grid px-3 py-1.5 font-mono text-[9px]" style={{gridTemplateColumns:'1fr 1.2fr 1.2fr 1fr',borderBottom:'1px solid rgba(255,255,255,.04)',color:'rgba(255,255,255,.6)'}}>
            {r.map((c,j)=><span key={j}>{c}</span>)}
          </div>
        ))}
      </div>
    ),
  },
  {
    title: 'Your HSM tokenizes.',
    content: 'Sensitive fields transformed inside your hardware. Nothing leaves in plaintext.',
    render: () => (
      <div className="flex items-center gap-3 p-4 rounded-[3px]" style={{border:'1px solid rgba(255,255,255,.07)',background:'rgba(255,255,255,.02)'}}>
        <div className="flex-1">
          <div className="font-mono text-[8px] uppercase tracking-[.08em] mb-1.5" style={{color:'rgba(226,75,74,.7)'}}>plaintext</div>
          {['048.212.387-91','joao@email.com','F41.1','João Silva'].map(v=>(
            <div key={v} className="font-mono text-[9px] px-2 py-1 mb-1 rounded-[2px]" style={{border:'1px solid rgba(226,75,74,.18)',color:'rgba(226,75,74,.7)'}}>{v}</div>
          ))}
        </div>
        <div className="text-[20px] px-2" style={{color:'rgba(113,102,209,.4)'}}>→</div>
        <div className="px-4 py-3 rounded-[3px] font-mono text-[10px] font-bold text-center" style={{border:'1.5px solid rgba(113,102,209,.45)',background:'rgba(113,102,209,.08)',color:'#afa9ec'}}>
          HSM<div className="text-[8px] font-normal mt-0.5" style={{color:'rgba(113,102,209,.5)'}}>your hardware</div>
        </div>
        <div className="text-[20px] px-2" style={{color:'rgba(29,158,117,.4)'}}>→</div>
        <div className="flex-1">
          <div className="font-mono text-[8px] uppercase tracking-[.08em] mb-1.5" style={{color:'rgba(29,158,117,.7)'}}>tokens</div>
          {['TKN_83AF…','TKN_C71B…','TKN_9D44…','TKN_4A2F…'].map(v=>(
            <div key={v} className="font-mono text-[9px] px-2 py-1 mb-1 rounded-[2px]" style={{border:'1px solid rgba(29,158,117,.22)',color:'rgba(29,158,117,.8)'}}>{v}</div>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: 'Only structure remains.',
    content: 'Same schema. No values. CORI will only ever see this — and it is enough.',
    render: () => (
      <div className="border rounded-[3px] overflow-hidden" style={{borderColor:'rgba(255,255,255,.08)'}}>
        <div className="grid text-[8px] tracking-[.07em] uppercase px-3 py-1.5 font-mono" style={{gridTemplateColumns:'1fr 1.2fr 1.2fr 1fr',background:'rgba(255,255,255,.03)',borderBottom:'1px solid rgba(255,255,255,.05)',color:'rgba(255,255,255,.28)'}}>
          <span>Name</span><span>CPF</span><span>Email</span><span>Diagnosis</span>
        </div>
        {[['TKN_4A2F…','TKN_83AF…','TKN_C71B…','TKN_9D44…'],['TKN_F302…','TKN_12CC…','TKN_8E59…','TKN_3A11…']].map((r,i)=>(
          <div key={i} className="grid px-3 py-1.5 font-mono text-[8px]" style={{gridTemplateColumns:'1fr 1.2fr 1.2fr 1fr',borderBottom:'1px solid rgba(255,255,255,.04)',color:'#1D9E75'}}>
            {r.map((c,j)=><span key={j}>{c}</span>)}
          </div>
        ))}
      </div>
    ),
  },
  { title:'CORI receives only tokens.', content:'Inferential geometry computed from the tokenized dataset alone.', render:()=><div className="font-mono text-[10px] p-3 rounded-[3px]" style={{border:'1px solid rgba(113,102,209,.2)',color:'rgba(175,169,236,.7)'}}>Geometry computation in progress — nodes: attributes · edges: inferential correlations · weight: rarity</div> },
  { title:'The geometry of inference — derived.', content:'Nodes are attributes. Edges are correlations. Weight encodes rarity.', render:()=><div className="font-mono text-[11px] p-3 rounded-[3px]" style={{border:'1px solid rgba(113,102,209,.2)',background:'rgba(113,102,209,.05)',color:'rgba(175,169,236,.7)'}}>Inferential graph constructed. 8 nodes · 11 edges · λ₂ computed.</div> },
  {
    title: 'Your dataset has a reconstruction threshold.',
    content: '87% reconstruction risk without CORI. Calculated. Not estimated.',
    render: () => (
      <div className="p-4 rounded-[3px]" style={{background:'rgba(255,255,255,.03)',border:'1px solid rgba(255,255,255,.06)'}}>
        <div className="font-mono text-[10px] mb-2" style={{color:'#1D9E75'}}>No anomaly detected.</div>
        <div className="font-mono text-[8px] uppercase tracking-[.08em] mb-1.5" style={{color:'rgba(255,255,255,.22)'}}>reconstruction risk — baseline</div>
        <div className="h-1.5 rounded overflow-hidden" style={{background:'rgba(255,255,255,.06)'}}>
          <div className="h-full rounded" style={{width:'87%',background:'#E24B4A'}} />
        </div>
        <div className="font-mono text-[20px] font-medium mt-1.5" style={{color:'#E24B4A'}}>87%</div>
        <div className="font-mono text-[9px] mt-1" style={{color:'rgba(255,255,255,.22)'}}>Without CORI: 87% reconstruction risk</div>
      </div>
    ),
  },
  {
    title: 'You define the acceptable limit.',
    content: 'This becomes the contract. Not a policy. A mathematical obligation.',
    render: () => (
      <div className="p-4 rounded-[3px]" style={{background:'rgba(255,255,255,.03)',border:'1px solid rgba(255,255,255,.06)'}}>
        <div className="flex justify-between items-baseline mb-1.5">
          <span className="font-mono text-[8px] uppercase tracking-[.08em]" style={{color:'rgba(255,255,255,.22)'}}>contracted limit</span>
          <span className="font-mono text-[20px] font-medium" style={{color:'#7166D1'}}>51%</span>
        </div>
        <input type="range" min="5" max="70" defaultValue="51" className="w-full" style={{accentColor:'#7166D1'}} />
        <div className="font-mono text-[9px] mt-1.5" style={{color:'rgba(113,102,209,.6)'}}>this will be enforced</div>
      </div>
    ),
  },
  {
    title: 'These limits become the contract.',
    content: 'Derived from geometry. Not configured. Not arbitrary.',
    render: () => (
      <div className="rounded-[4px] overflow-hidden" style={{border:'1px solid rgba(255,255,255,.08)'}}>
        <div className="font-mono text-[9px] px-3.5 py-1.5" style={{color:'rgba(113,102,209,.6)',borderBottom:'1px solid rgba(255,255,255,.05)'}}>Derived from dataset geometry. Not configured. Not estimated.</div>
        <div className="px-3.5 py-2.5 font-mono text-[9px] leading-[2]">
          {[['operator limit','51%','#7166D1'],['auditor limit','7%','#7166D1'],['blast radius','bounded','rgba(255,255,255,.7)'],['enforcement','automatic','rgba(255,255,255,.7)'],['raw data accessed','0 records','rgba(255,255,255,.7)']].map(([k,v,c])=>(
            <div key={k} className="flex justify-between" style={{borderBottom:'1px solid rgba(255,255,255,.03)',padding:'1px 0'}}>
              <span style={{color:'rgba(255,255,255,.28)'}}>{k}</span>
              <span style={{color:c}}>{v}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: 'Anchored in a Verkle tree.',
    content: 'Immutable. Auditable by the ANPD without exposing a single record.',
    render: () => (
      <div className="font-mono text-[9px]" style={{color:'rgba(29,158,117,.7)'}}>
        <div className="p-3 rounded-[3px]" style={{border:'1px solid rgba(29,158,117,.25)',background:'rgba(29,158,117,.05)'}}>
          contract hash: 0x3f8a2b91c4d7e5f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4…
          <div className="mt-2 inline-block px-2.5 py-1 rounded-[2px] text-[8px] uppercase tracking-[.1em]" style={{border:'1px solid rgba(29,158,117,.35)',background:'rgba(29,158,117,.05)'}}>anchored — immutable</div>
        </div>
      </div>
    ),
  },
  {
    title: 'The system enforces what is allowed.',
    content: 'The limit is not configured. It is derived. And then enforced.',
    render: () => (
      <div>
        <div className="p-3 rounded-[3px] mb-3" style={{background:'rgba(255,255,255,.03)',border:'1px solid rgba(255,255,255,.06)'}}>
          <div className="font-mono text-[8px] uppercase tracking-[.08em] mb-1.5 flex justify-between" style={{color:'rgba(255,255,255,.22)'}}>
            <span>reconstruction risk</span><span style={{color:'rgba(29,158,117,.7)'}}>CORI active</span>
          </div>
          <div className="h-1.5 rounded overflow-hidden relative" style={{background:'rgba(255,255,255,.06)'}}>
            <div className="h-full rounded" style={{width:'51%',background:'#1D9E75'}} />
          </div>
          <div className="font-mono text-[18px] font-medium mt-1.5" style={{color:'#1D9E75'}}>51% (enforced)</div>
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {[['OP-4471','ok'],['OP-8823','ok'],['OP-4499','bk']].map(([id,cls])=>(
            <div key={id} className="flex-1 min-w-[70px] text-center px-2.5 py-1.5 rounded-[3px] font-mono text-[9px]"
              style={{border:`1px solid ${cls==='ok'?'rgba(29,158,117,.3)':'rgba(226,75,74,.4)'}`,background:cls==='ok'?'rgba(29,158,117,.04)':'rgba(226,75,74,.05)',color:cls==='ok'?'rgba(29,158,117,.8)':'rgba(226,75,74,.8)'}}>
              {id}<br/><span className="text-[7px]">{cls==='ok'?'within limit':'blocked'}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
]

export function W4DayZero({ widgetRaw, isActive }: Props) {
  const totalSteps = STEPS.length
  const step = Math.min(Math.floor(widgetRaw / STEP_DELTA), totalSteps - 1)
  const [displayStep, setDisplayStep] = useState(step)
  const prevStep = useRef(step)

  useEffect(() => {
    if (prevStep.current !== step) {
      prevStep.current = step
      setDisplayStep(step)
    }
  }, [step])

  const s = STEPS[displayStep]

  return (
    <div className="dom-body flex flex-col gap-3">
      <AnimatePresence mode="wait">
        <motion.div
          key={displayStep}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.18 }}
        >
          <div className="font-sans font-bold mb-2" style={{ fontSize: 13, color: 'rgba(255,255,255,.85)' }}>{s.title}</div>
          <div className="font-mono mb-3 leading-[1.8]" style={{ fontSize: 10, color: 'rgba(255,255,255,.35)' }}>{s.content}</div>
          {s.render()}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
