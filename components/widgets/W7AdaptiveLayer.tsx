'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { STEP_DELTA } from '@/lib/constants'

interface Props { widgetRaw: number; isActive: boolean }

const ARCH_SVG = `<svg width="100%" viewBox="0 0 960 340" xmlns="http://www.w3.org/2000/svg">
<defs><marker id="wfarr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></marker></defs>
<rect x="10" y="26" width="232" height="280" rx="6" fill="rgba(29,158,117,.04)" stroke="rgba(29,158,117,.28)" stroke-width="1" stroke-dasharray="6 4"/>
<text x="18" y="42" font-family="JetBrains Mono,monospace" font-size="8" fill="rgba(29,158,117,.5)" letter-spacing="2">DATA PLANE</text>
<rect x="30" y="82" width="90" height="42" fill="#0F6E56" stroke="none"/><line x1="30" y1="82" x2="30" y2="124" stroke="#1D9E75" stroke-width="0.5"/><line x1="120" y1="82" x2="120" y2="124" stroke="#1D9E75" stroke-width="0.5"/>
<ellipse cx="75" cy="96" rx="45" ry="8" fill="none" stroke="#1D9E75" stroke-width="0.5" stroke-opacity=".4"/><ellipse cx="75" cy="110" rx="45" ry="8" fill="none" stroke="#1D9E75" stroke-width="0.5" stroke-opacity=".3"/>
<ellipse cx="75" cy="124" rx="45" ry="8" fill="#0F6E56" stroke="#1D9E75" stroke-width="0.5"/><ellipse cx="75" cy="82" rx="45" ry="8" fill="#1D9E75" fill-opacity=".2" stroke="#1D9E75" stroke-width="0.5"/>
<text x="75" y="116" font-family="JetBrains Mono,monospace" font-size="11" font-weight="500" fill="#9FE1CB" text-anchor="middle" dominant-baseline="central">Data</text>
<rect x="30" y="200" width="90" height="72" rx="3" fill="#0F6E56" stroke="#1D9E75" stroke-width="0.5"/>
<line x1="30" y1="224" x2="120" y2="224" stroke="#1D9E75" stroke-width="0.5" stroke-opacity=".5"/><line x1="30" y1="244" x2="120" y2="244" stroke="#1D9E75" stroke-width="0.5" stroke-opacity=".5"/>
<circle cx="39" cy="212" r="2.5" fill="#9FE1CB" fill-opacity=".8"/><circle cx="39" cy="234" r="2.5" fill="#9FE1CB" fill-opacity=".7"/><circle cx="39" cy="254" r="2.5" fill="#9FE1CB" fill-opacity=".5"/>
<rect x="46" y="209" width="62" height="5" rx="1" fill="#1D9E75" fill-opacity=".25"/><rect x="46" y="230" width="62" height="5" rx="1" fill="#1D9E75" fill-opacity=".25"/><rect x="46" y="250" width="62" height="5" rx="1" fill="#1D9E75" fill-opacity=".15"/>
<text x="75" y="265" font-family="JetBrains Mono,monospace" font-size="10" font-weight="500" fill="#9FE1CB" text-anchor="middle" dominant-baseline="central">Documents</text>
<rect x="148" y="140" width="86" height="56" rx="4" fill="rgba(255,255,255,.06)" stroke="rgba(255,255,255,.2)" stroke-width="0.5"/>
<text x="191" y="168" font-family="JetBrains Mono,monospace" font-size="11" font-weight="500" fill="rgba(255,255,255,.7)" text-anchor="middle" dominant-baseline="central">Applications</text>
<line x1="120" y1="103" x2="148" y2="155" stroke="rgba(29,158,117,.45)" stroke-width="1" marker-end="url(#wfarr)"/>
<line x1="120" y1="236" x2="148" y2="181" stroke="rgba(29,158,117,.45)" stroke-width="1" marker-end="url(#wfarr)"/>
<rect x="250" y="60" width="198" height="210" rx="6" fill="rgba(113,102,209,.06)" stroke="rgba(113,102,209,.45)" stroke-width="1.5" stroke-dasharray="6 4"/>
<text x="258" y="76" font-family="JetBrains Mono,monospace" font-size="8" fill="rgba(113,102,209,.6)" letter-spacing="2">CORI CONTROL PLANE</text>
<rect x="260" y="86" width="178" height="58" rx="4" fill="rgba(113,102,209,.18)" stroke="#7166D1" stroke-width="1.5"/>
<text x="349" y="106" font-family="JetBrains Mono,monospace" font-size="12" font-weight="500" fill="#CECBF6" text-anchor="middle" dominant-baseline="central">CORI Orchestrator</text>
<text x="349" y="125" font-family="JetBrains Mono,monospace" font-size="9" fill="rgba(175,169,236,.55)" text-anchor="middle" dominant-baseline="central">Inference + Control Engine</text>
<polygon points="349,172 403,216 349,260 295,216" fill="rgba(113,102,209,.07)" stroke="#7166D1" stroke-width="0.5"/>
<text x="349" y="208" font-family="JetBrains Mono,monospace" font-size="10" fill="#CECBF6" text-anchor="middle" dominant-baseline="central">Risk</text>
<text x="349" y="224" font-family="JetBrains Mono,monospace" font-size="10" fill="#CECBF6" text-anchor="middle" dominant-baseline="central">threshold</text>
<line x1="349" y1="144" x2="349" y2="172" stroke="#AFA9EC" stroke-width="1" stroke-opacity=".5" marker-end="url(#wfarr)"/>
<line x1="234" y1="168" x2="260" y2="130" stroke="rgba(113,102,209,.2)" stroke-width="1" stroke-dasharray="3 5" marker-end="url(#wfarr)"/>
<text x="230" y="150" font-family="JetBrains Mono,monospace" font-size="8" fill="rgba(113,102,209,.35)" text-anchor="end">monitors</text>
<rect x="458" y="26" width="492" height="294" rx="6" fill="rgba(255,255,255,.02)" stroke="rgba(255,255,255,.1)" stroke-width="1" stroke-dasharray="6 4"/>
<text x="466" y="42" font-family="JetBrains Mono,monospace" font-size="8" fill="rgba(255,255,255,.25)" letter-spacing="2">EXECUTION LAYER</text>
<rect x="560" y="68" width="376" height="58" rx="4" fill="rgba(113,102,209,.12)" stroke="#7166D1" stroke-width="0.5"/>
<text x="748" y="88" font-family="JetBrains Mono,monospace" font-size="12" font-weight="500" fill="#CECBF6" text-anchor="middle" dominant-baseline="central">Encryption</text>
<text x="748" y="107" font-family="JetBrains Mono,monospace" font-size="10" fill="rgba(113,102,209,.6)" text-anchor="middle" dominant-baseline="central">Thales · IBM · Protegrity · via existing APIs</text>
<rect x="620" y="248" width="316" height="58" rx="4" fill="rgba(29,158,117,.1)" stroke="#1D9E75" stroke-width="0.5"/>
<text x="778" y="268" font-family="JetBrains Mono,monospace" font-size="12" font-weight="500" fill="#5DCAA5" text-anchor="middle" dominant-baseline="central">Anonymization</text>
<text x="778" y="287" font-family="JetBrains Mono,monospace" font-size="10" fill="rgba(29,158,117,.6)" text-anchor="middle" dominant-baseline="central">Anonimiza.ai · redact</text>
<path d="M 403 216 L 520 216 L 520 97 L 560 97" fill="none" stroke="#AFA9EC" stroke-width="1" stroke-opacity=".5" marker-end="url(#wfarr)"/>
<text x="534" y="150" font-family="JetBrains Mono,monospace" font-size="9" fill="rgba(175,169,236,.5)">exceeded</text>
<path d="M 403 216 L 520 216 L 520 277 L 620 277" fill="none" stroke="#AFA9EC" stroke-width="1" stroke-opacity=".5" marker-end="url(#wfarr)"/>
<text x="534" y="248" font-family="JetBrains Mono,monospace" font-size="9" fill="rgba(175,169,236,.5)">exceeded</text>
<path d="M 748 68 L 748 14 L 75 14 L 75 74" fill="none" stroke="#E24B4A" stroke-width="1" stroke-opacity=".4" stroke-dasharray="6 4" marker-end="url(#wfarr)"/>
<text x="410" y="10" font-family="JetBrains Mono,monospace" font-size="8" fill="rgba(226,75,74,.5)" text-anchor="middle" dominant-baseline="central">encrypts records in place</text>
<path d="M 778 306 L 778 324 L 75 324 L 75 272" fill="none" stroke="#E24B4A" stroke-width="1" stroke-opacity=".4" stroke-dasharray="6 4" marker-end="url(#wfarr)"/>
<text x="420" y="320" font-family="JetBrains Mono,monospace" font-size="8" fill="rgba(226,75,74,.45)" text-anchor="middle" dominant-baseline="central">redacts documents in place</text>
</svg>`

const STEPS = [
  { title:'Static rules', content:'Configured once. Unable to sense accumulation.', body: () => (
    <div className="flex gap-1.5 flex-wrap">
      {['mask CPF','encrypt column X','anonymize doc Y','block after N queries'].map(r=>(
        <div key={r} className="px-2.5 py-2 rounded-[3px] font-mono text-[9px]" style={{border:'1px solid rgba(255,255,255,.09)',background:'rgba(255,255,255,.03)',color:'rgba(255,255,255,.4)'}}>
          {r}<div className="text-[7px] mt-0.5" style={{color:'rgba(226,75,74,.45)'}}>always — regardless of state</div>
        </div>
      ))}
    </div>
  )},
  { title:'Inference is dynamic', content:'Rules fire too late — or not at all.', body: () => (
    <div className="p-2.5 rounded-[3px] font-mono text-[10px] leading-[1.8]" style={{border:'1px solid rgba(239,159,39,.2)',background:'rgba(239,159,39,.04)',color:'rgba(239,159,39,.7)'}}>
      Inference accumulates across sessions, operators, and time. Static rules cannot see the field forming.
    </div>
  )},
  { title:'CORI sits above existing controls', content:'State → decision → action. Not rule → action.', body: () => (
    <div className="flex flex-col gap-1">
      <div className="px-4 py-2.5 rounded-[3px] font-mono text-[11px] font-bold text-center" style={{border:'1.5px solid rgba(113,102,209,.5)',background:'rgba(113,102,209,.1)',color:'#afa9ec'}}>CORI — inferential risk engine</div>
      <div className="text-center font-mono text-[10px]" style={{color:'rgba(255,255,255,.15)'}}>↓ &nbsp; observes · computes · triggers &nbsp; ↓</div>
      <div className="flex gap-1">
        {['encryption','anonymization','masking','access ctrl'].map(c=><div key={c} className="flex-1 px-2 py-1.5 rounded-[3px] font-mono text-[9px] text-center" style={{border:'1px solid rgba(255,255,255,.09)',color:'rgba(255,255,255,.45)'}}>{c}</div>)}
      </div>
    </div>
  )},
  { title:'Data plane vs. control plane', content:'CORI does not sit in the data path — it controls it indirectly.', body: () => (
    <div dangerouslySetInnerHTML={{ __html: ARCH_SVG }} />
  )},
  { title:'Same rule. Different behavior.', content:'Driven by the current state of inferential risk.', body: () => (
    <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:7}}>
      {[['low risk','rgba(29,158,117,.08)','rgba(29,158,117,.15)','rgba(29,158,117,.8)','12%',['CPF: readable','Doc: delivered','no intervention']],
        ['medium risk','rgba(239,159,39,.07)','rgba(239,159,39,.15)','rgba(239,159,39,.8)','38%',['CPF: masked','Doc: redacted','col X: encrypted']],
        ['critical risk','rgba(226,75,74,.07)','rgba(226,75,74,.15)','rgba(226,75,74,.8)','49%',['CPF: encrypted','Doc: anonymized','blast radius: sealed']]
      ].map(([nm,bg,bd,tc,ri,acts])=>(
        <div key={String(nm)} className="rounded-[3px] overflow-hidden" style={{border:'1px solid rgba(255,255,255,.07)'}}>
          <div className="px-2.5 py-1.5 font-mono text-[8px] uppercase tracking-[.07em]" style={{background:String(bg),borderBottom:`1px solid ${String(bd)}`,color:String(tc)}}>{String(nm)}<div className="font-normal normal-case tracking-normal mt-0.5" style={{color:String(tc)+'99',fontSize:8}}>risk: {String(ri)}</div></div>
          <div className="px-2.5 py-2">{(acts as string[]).map(a=><div key={a} className="px-1.5 py-1 mb-1 rounded-[2px] font-mono text-[8px]" style={{border:'1px solid rgba(255,255,255,.08)',color:'rgba(255,255,255,.55)'}}>{a}</div>)}</div>
        </div>
      ))}
    </div>
  )},
  { title:'Protection is no longer configured.', content:'It is computed. From the geometry of your data. Before the first query runs.', body: () => (
    <div className="flex flex-col gap-1.5">
      {[['Static rules assume the world is stable.','CORI adapts to what is actually happening.'],['The controls you already have.','Now driven by inference.'],['Encryption, anonymization, masking —','activated only when they matter.']].map(([a,b])=>(
        <div key={a} className="px-3 py-2 font-mono text-[11px] leading-[1.9]" style={{borderLeft:'1px solid rgba(255,255,255,.08)',color:'rgba(255,255,255,.32)'}}>
          {a} <span style={{color:'rgba(255,255,255,.72)'}}>{b}</span>
        </div>
      ))}
    </div>
  )},
]

export function W7AdaptiveLayer({ widgetRaw, isActive }: Props) {
  const step = Math.min(Math.floor(widgetRaw / STEP_DELTA), STEPS.length - 1)
  const [displayStep, setDisplayStep] = useState(step)
  const prevStep = useRef(step)
  useEffect(() => { if (prevStep.current !== step) { prevStep.current = step; setDisplayStep(step) } }, [step])
  const s = STEPS[displayStep]
  return (
    <div className="dom-body overflow-auto">
      <AnimatePresence mode="wait">
        <motion.div key={displayStep} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}} transition={{duration:0.16}}>
          {s.body()}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
