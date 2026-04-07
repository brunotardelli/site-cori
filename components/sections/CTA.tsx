'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'

export function CTA() {
  const [sent, setSent] = useState(false)

  return (
    <div className="section" style={{ height: 'calc(100vh - 44px)' }}>
      <div className="flex flex-col justify-center h-full px-[52px]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="font-sans font-extrabold tracking-[-0.04em] leading-[1.04] mb-7"
          style={{ fontSize: 'clamp(2.2rem,5.5vw,4.8rem)', maxWidth: 640 }}
        >
          See your<br />point of no return.
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="font-mono leading-[1.9] mb-6"
          style={{ fontSize: 11, color: 'rgba(255,255,255,.28)', maxWidth: 360 }}
        >
          We compute your dataset's reconstruction threshold, propagation speed, and blast radius.
          No data leaves your environment.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="flex flex-col gap-2.5 max-w-[340px]"
        >
          <input
            type="text"
            placeholder="Your name"
            className="font-mono text-[12px] text-white rounded-[3px] px-4 py-3 outline-none transition-colors"
            style={{
              background: 'rgba(255,255,255,.04)',
              border: '1px solid rgba(255,255,255,.1)',
            }}
            onFocus={e => (e.target.style.borderColor = '#7166D1')}
            onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,.1)')}
          />
          <input
            type="email"
            placeholder="Institutional email"
            className="font-mono text-[12px] text-white rounded-[3px] px-4 py-3 outline-none transition-colors"
            style={{
              background: 'rgba(255,255,255,.04)',
              border: '1px solid rgba(255,255,255,.1)',
            }}
            onFocus={e => (e.target.style.borderColor = '#7166D1')}
            onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,.1)')}
          />
          <button
            onClick={() => setSent(true)}
            className="w-full py-3.5 font-sans font-bold text-[11px] tracking-[.08em] uppercase text-white rounded-[3px] transition-all duration-200"
            style={{
              background: sent ? '#1D9E75' : '#7166D1',
              letterSpacing: '.08em',
            }}
          >
            {sent ? '[ Request received → ]' : '[ Find where your system already fails ]'}
          </button>
          <p className="font-mono text-[9px] leading-[1.8]" style={{ color: 'rgba(255,255,255,.18)' }}>
            We never see your actual data. Only its inferential structure.
          </p>
        </motion.div>
      </div>
    </div>
  )
}
