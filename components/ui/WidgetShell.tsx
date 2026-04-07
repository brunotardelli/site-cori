'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { StepBar } from './StepBar'
import { STEP_TEXTS } from '@/lib/constants'

interface WidgetShellProps {
  widgetId: 1 | 2 | 3 | 4 | 5 | 6 | 7
  secNum: string
  step: number
  progress: number
  done: boolean
  children: React.ReactNode
}

export function WidgetShell({ widgetId, secNum, step, progress, done, children }: WidgetShellProps) {
  const texts = STEP_TEXTS[widgetId]
  const totalSteps = texts?.length ?? 1
  const safeStep = Math.min(step, totalSteps - 1)
  const current = texts?.[safeStep]

  const [displayed, setDisplayed] = useState(current)
  const [key, setKey] = useState(0)
  const prevStep = useRef(safeStep)

  useEffect(() => {
    if (prevStep.current !== safeStep) {
      prevStep.current = safeStep
      setDisplayed(texts?.[safeStep])
      setKey(k => k + 1)
    }
  }, [safeStep, texts])

  return (
    <div className="section">
      {/* Header */}
      <div
        className="flex-shrink-0 px-7 pt-[18px] pb-3.5"
        style={{ borderBottom: '1px solid rgba(255,255,255,.04)' }}
      >
        <div className="font-mono text-[8px] tracking-[.14em] uppercase mb-1.5" style={{ color: 'rgba(255,255,255,.18)' }}>
          {secNum}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={key + '-title'}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="font-sans font-bold tracking-tight leading-tight"
            style={{ fontSize: 'clamp(1rem,2.2vw,1.55rem)' }}
          >
            {displayed?.title}
          </motion.div>
        </AnimatePresence>
        <AnimatePresence mode="wait">
          <motion.div
            key={key + '-sub'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15, delay: 0.05 }}
            className="font-mono mt-1 leading-relaxed"
            style={{ fontSize: 10, color: 'rgba(255,255,255,.28)' }}
          >
            {displayed?.subtitle}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Body */}
      <div className="widget-body">
        {children}
      </div>

      {/* Step bar */}
      <StepBar totalSteps={totalSteps} currentStep={safeStep} progress={progress} done={done} />
    </div>
  )
}
