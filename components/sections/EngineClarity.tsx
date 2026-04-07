'use client'
import { motion } from 'framer-motion'

const cards = [
  {
    num: '01 — measure',
    name: 'Inference Engine',
    body: 'Computes the inferential geometry of your dataset from structure alone. Derives the reconstruction threshold. Tracks risk across every session, operator, and query.',
    tag: 'deterministic · geometric',
  },
  {
    num: '02 — decide',
    name: 'Control Engine',
    body: 'When reconstruction becomes inevitable, the system acts. Not by blocking — by changing the state of the data. CORI triggers. Your HSM executes. The path disappears.',
    tag: 'T86 protocol · blast radius',
  },
  {
    num: '03 — enforce',
    name: 'Orchestration Layer',
    body: 'Coordinates Thales CipherTrust, IBM Guardium, Protegrity, CyberArk, and Anonimiza.ai — without replacing any of them. CORI decides when they act.',
    tag: 'Thales · IBM · Protegrity · CyberArk',
  },
]

export function EngineClarity() {
  return (
    <div
      className="section"
      style={{ height: 'calc(100vh - 44px)', background: 'rgba(113,102,209,.03)' }}
    >
      <div className="flex flex-col justify-center h-full px-[52px]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="font-mono text-[9px] tracking-[.16em] uppercase mb-5"
          style={{ color: 'rgba(255,255,255,.18)' }}
        >
          What CORI is — before the proof
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-mono leading-[1.75] mb-9"
          style={{ fontSize: 'clamp(.95rem,1.8vw,1.2rem)', color: 'rgba(255,255,255,.42)', maxWidth: 660 }}
        >
          CORI is an{' '}
          <span style={{ color: 'rgba(255,255,255,.82)', fontWeight: 500 }}>
            inference control infrastructure
          </span>{' '}
          that orchestrates encryption, anonymization, and access controls based on the real-time inferential risk of your dataset.
        </motion.p>

        <div
          className="grid gap-px rounded overflow-hidden"
          style={{
            gridTemplateColumns: 'repeat(3,1fr)',
            background: 'rgba(255,255,255,.07)',
            maxWidth: 860,
          }}
        >
          {cards.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
              className="flex flex-col p-6"
              style={{ background: '#08080e' }}
            >
              <div
                className="font-mono text-[8px] tracking-[.14em] uppercase mb-2.5"
                style={{ color: 'rgba(113,102,209,.5)' }}
              >
                {c.num}
              </div>
              <div
                className="font-sans font-bold tracking-[-0.03em] mb-2.5"
                style={{ fontSize: 'clamp(.95rem,1.6vw,1.2rem)' }}
              >
                {c.name}
              </div>
              <div
                className="font-mono leading-[1.85] flex-1"
                style={{ fontSize: 10, color: 'rgba(255,255,255,.28)' }}
              >
                {c.body}
              </div>
              <div
                className="inline-block mt-3 px-2.5 py-1 font-mono text-[8px] tracking-[.08em] rounded-[2px]"
                style={{ border: '1px solid rgba(113,102,209,.2)', color: 'rgba(113,102,209,.65)' }}
              >
                {c.tag}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="font-mono mt-7 leading-[1.9]"
          style={{ fontSize: 11, color: 'rgba(255,255,255,.22)', maxWidth: 560 }}
        >
          CORI does not just measure risk.{' '}
          <span style={{ color: 'rgba(255,255,255,.58)', fontWeight: 400 }}>It acts on it.</span>
          <br />
          Observe. Decide. Enforce.
        </motion.div>
      </div>
    </div>
  )
}
