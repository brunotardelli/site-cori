'use client'
import { motion } from 'framer-motion'

const layers = [
  {
    num: '01',
    name: 'Inference Engine — Measurement',
    body: 'Computes inferential geometry from tokenized data. Derives the Day 0 reconstruction threshold. Tracks risk in real time. No raw data required.',
  },
  {
    num: '02',
    name: 'Control Engine — Enforcement',
    body: 'When reconstruction becomes inevitable, the Control Engine triggers. Your HSM encrypts. The blast radius is sealed. No query is denied. The path disappears.',
  },
  {
    num: '03',
    name: 'Orchestration Layer — Integration',
    body: 'Coordinates Thales CipherTrust, IBM Guardium, Protegrity, CyberArk Conjur, and Anonimiza.ai. CORI decides when they act. They act through existing APIs.',
  },
]

export function ProductSection() {
  return (
    <div
      className="flex flex-col justify-center px-[52px]"
      style={{ height: '100%', overflow: 'hidden' }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="font-mono text-[9px] tracking-[.16em] uppercase mb-[22px]"
        style={{ color: 'rgba(255,255,255,.18)' }}
      >
        The product — for the enterprise buyer
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="font-sans font-extrabold tracking-[-0.04em] leading-[1.04] mb-2.5"
        style={{ fontSize: 'clamp(1rem,2.5vw,2rem)' }}
      >
        Three layers.<br />One infrastructure.
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="font-mono leading-[1.9] mb-6"
        style={{ fontSize: 11, color: 'rgba(255,255,255,.28)', maxWidth: 520 }}
      >
        CORI is not a DLP tool. Not a cryptography library. Not a monitoring system.<br />
        It is the orchestration layer that makes existing controls respond to the actual state of inferential risk — before the attack completes.
      </motion.p>

      <div className="flex flex-col max-w-[640px]" style={{ borderTop: '1px solid rgba(255,255,255,.05)' }}>
        {layers.map((layer, i) => (
          <motion.div
            key={layer.num}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.35 + i * 0.1 }}
            className="flex items-start gap-5 py-3"
            style={{ borderBottom: '1px solid rgba(255,255,255,.05)' }}
          >
            <div
              className="font-mono text-[9px] flex-shrink-0 pt-0.5 w-7"
              style={{ color: 'rgba(113,102,209,.5)' }}
            >
              {layer.num}
            </div>
            <div>
              <div
                className="font-sans font-bold tracking-[-0.02em] mb-1"
                style={{ fontSize: 'clamp(.9rem,1.5vw,1.05rem)' }}
              >
                {layer.name}
              </div>
              <div
                className="font-mono leading-[1.75]"
                style={{ fontSize: 10, color: 'rgba(255,255,255,.28)' }}
              >
                {layer.body}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="mt-5 pb-4"
        style={{ borderBottom: '1px solid rgba(255,255,255,.05)' }}
      >
        <div
          className="font-sans font-bold leading-[1.5] tracking-[-0.02em]"
          style={{ fontSize: 'clamp(1rem,2vw,1.25rem)', color: 'rgba(255,255,255,.75)' }}
        >
          The system did not fail.<br />
          It behaved exactly as designed.<br />
          <span style={{ color: '#E24B4A' }}>And still, identity was reconstructed.</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.85 }}
        className="font-mono mt-4 leading-[1.9]"
        style={{ fontSize: 10, color: 'rgba(255,255,255,.2)' }}
      >
        You do not need to replace your stack.<br />
        <strong style={{ color: 'rgba(255,255,255,.55)', fontWeight: 400 }}>
          You need to make it respond to inference.
        </strong>
      </motion.div>
    </div>
  )
}