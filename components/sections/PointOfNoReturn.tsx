'use client'
import { motion } from 'framer-motion'

export function PointOfNoReturn() {
  return (
    <div className="section" style={{ height: 'calc(100vh - 44px)' }}>
      <div
        className="bridge-container"
        style={{ borderLeftColor: 'rgba(226,75,74,.25)' }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="font-mono text-[9px] tracking-[.16em] uppercase mb-[18px]"
          style={{ color: 'rgba(226,75,74,.55)' }}
        >
          State — Critical
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-sans font-extrabold tracking-[-0.035em] leading-[1.08]"
          style={{ fontSize: 'clamp(1.8rem,4vw,3.4rem)', maxWidth: 660, color: 'rgba(255,255,255,.9)' }}
        >
          The system is still compliant.
          <span className="block">And already compromised.</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="font-mono leading-[1.95] mt-[18px]"
          style={{ fontSize: 11, color: 'rgba(255,255,255,.28)', maxWidth: 520 }}
        >
          No alert fired.<br />
          No rule was broken.<br /><br />
          <span style={{ color: 'rgba(226,75,74,.8)', fontStyle: 'normal' }}>
            The identity is already reconstructable.
          </span>
          <br /><br />
          This is the point most systems never measure.<br />
          Because they are designed to detect violations — not inference.
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.65 }}
          className="font-mono mt-5 tracking-[.06em]"
          style={{ fontSize: 9, color: 'rgba(255,255,255,.14)' }}
        >
          scroll to continue ↓
        </motion.div>
      </div>
    </div>
  )
}
