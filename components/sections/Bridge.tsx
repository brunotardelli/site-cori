'use client'
import { motion } from 'framer-motion'
import { BRIDGE_CONTENT } from '@/lib/constants'

interface BridgeProps {
  sectionId: number
}

export function Bridge({ sectionId }: BridgeProps) {
  const content = BRIDGE_CONTENT[sectionId]
  if (!content) return null

  const lines = content.heading.split('\n')
  const bodyLines = content.body.split('\n')

  return (
    <div className="section" style={{ height: 'calc(100vh - 44px)' }}>
      <div className="bridge-container">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="font-mono text-[9px] tracking-[.16em] uppercase mb-[18px]"
          style={{ color: 'rgba(255,255,255,.18)' }}
        >
          {content.num}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-sans font-extrabold tracking-[-0.035em] leading-[1.08]"
          style={{ fontSize: 'clamp(1.8rem,4vw,3.4rem)', maxWidth: 660 }}
        >
          {lines.map((line, i) => (
            <span key={i} className="block">{line}</span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="font-mono leading-[1.95] mt-[18px]"
          style={{ fontSize: 11, color: 'rgba(255,255,255,.28)', maxWidth: 520 }}
        >
          {bodyLines.map((line, i) =>
            line === '' ? (
              <br key={i} />
            ) : line.startsWith('The identity') || line.startsWith('Your data') || line.startsWith('The attacker') ? (
              <em key={i} style={{ fontStyle: 'normal', color: 'rgba(255,255,255,.65)' }}>
                {line}
                <br />
              </em>
            ) : (
              <span key={i}>
                {line}
                <br />
              </span>
            )
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.6 }}
          className="font-mono mt-5 tracking-[.06em]"
          style={{ fontSize: 9, color: 'rgba(255,255,255,.14)' }}
        >
          scroll to continue ↓
        </motion.div>
      </div>
    </div>
  )
}
