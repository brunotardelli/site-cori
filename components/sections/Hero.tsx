'use client'
import { motion } from 'framer-motion'

export function Hero() {
  return (
    <div className="section" style={{ height: 'calc(100vh - 44px)' }}>
      <div className="flex flex-col justify-center h-full px-[52px]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-mono text-[9px] tracking-[.16em] uppercase mb-[22px]"
          style={{ color: 'rgba(255,255,255,.18)' }}
        >
          Risk Inference Control Infrastructure
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-sans font-extrabold tracking-[-0.04em] leading-[1.02]"
          style={{ fontSize: 'clamp(2.4rem,6vw,5.5rem)', maxWidth: 860 }}
        >
          Privacy is already lost.
          <span className="block font-normal" style={{ color: 'rgba(255,255,255,.32)' }}>
            You are just measuring it too late.
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="font-mono leading-[1.95] mt-6"
          style={{ fontSize: 11, color: 'rgba(255,255,255,.28)', maxWidth: 540 }}
        >
          Even a fully compliant system can be systematically extracted.<br />
          Not by breaking rules. By following them — one query at a time.<br /><br />
          <span style={{ color: 'rgba(255,255,255,.6)' }}>
            CORI measures and limits what can be learned from your data.<br />
            Before the first query is even executed.
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="flex gap-2.5 flex-wrap mt-7"
        >
          {['LGPD · ANPD compliant', 'Deployment in days', 'SLA-backed limits'].map(tag => (
            <div
              key={tag}
              className="px-3.5 py-2 font-mono text-[9px] tracking-[.08em] rounded-[3px]"
              style={{ border: '1px solid rgba(113,102,209,.28)', color: 'rgba(113,102,209,.7)' }}
            >
              {tag}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
