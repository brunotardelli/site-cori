'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
import { SECTIONS, WIDGET_SEC_IDS, STEP_DELTA, SEC_DELTA } from '@/lib/constants'

export interface ScrollEngine {
  currentSection: number
  widgetRaw: number
  widgetStep: number
  widgetProgress: number
  widgetDone: boolean
  goTo: (n: number) => void
}

const TOTAL = SECTIONS.length

export function useScrollEngine(): ScrollEngine {
  const [currentSection, setCurrentSection] = useState(0)
  const [widgetRaw, setWidgetRaw] = useState(0)

  const curRef = useRef(0)
  const rawRef = useRef(0)
  const secAccum = useRef(0)
  const doneSet = useRef(new Set<number>())

  // Widget step/progress derived from rawRef
  const getStepInfo = useCallback((secId: number, raw: number) => {
    const sec = SECTIONS.find(s => s.id === secId)
    const totalSteps = sec?.steps ?? 1
    const total = totalSteps * STEP_DELTA
    const capped = Math.min(raw, total)

    const step = Math.min(Math.floor(capped / STEP_DELTA), totalSteps - 1)
    const progress = (capped % STEP_DELTA) / STEP_DELTA
    const done = capped >= total

    return { step, progress, done, totalSteps }
  }, [])

  const goTo = useCallback((n: number) => {
    if (n < 0 || n >= TOTAL) return

    curRef.current = n
    secAccum.current = 0

    // Reset widget raw if entering fresh widget
    if (WIDGET_SEC_IDS.has(n) && !doneSet.current.has(n)) {
      rawRef.current = 0
    } else if (WIDGET_SEC_IDS.has(n) && doneSet.current.has(n)) {
      const sec = SECTIONS.find(s => s.id === n)
      rawRef.current = (sec?.steps ?? 1) * STEP_DELTA
    }

    setCurrentSection(n)
    setWidgetRaw(rawRef.current)

    // Scroll section into view
    const el = document.getElementById(`section-${n}`)
    el?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  const onDelta = useCallback((delta: number) => {
    const cur = curRef.current
    const isWidget = WIDGET_SEC_IDS.has(cur)
    const isDone = doneSet.current.has(cur)

    if (isWidget && !isDone) {
      const sec = SECTIONS.find(s => s.id === cur)
      const total = (sec?.steps ?? 1) * STEP_DELTA

      const prevRaw = rawRef.current
      rawRef.current = Math.max(0, Math.min(total, prevRaw + delta))

      setWidgetRaw(rawRef.current)

      if (rawRef.current >= total) {
        doneSet.current.add(cur)
      }

      if (rawRef.current <= 0 && delta < 0) {
        goTo(Math.max(cur - 1, 0))
      }

      return
    }

    // Non-widget or done widget — navigate sections
    secAccum.current += delta

    if (secAccum.current > SEC_DELTA) {
      secAccum.current = 0
      goTo(Math.min(cur + 1, TOTAL - 1))
    } else if (secAccum.current < -SEC_DELTA) {
      secAccum.current = 0
      goTo(Math.max(cur - 1, 0))
    }
  }, [goTo])

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      onDelta(e.deltaY * 0.8)
    }

    let ty = 0

    const handleTouchStart = (e: TouchEvent) => {
      ty = e.touches[0].clientY
    }

    const handleTouchEnd = (e: TouchEvent) => {
      const dy = ty - e.changedTouches[0].clientY
      if (Math.abs(dy) > 12) onDelta(dy * 1.4)
    }

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault()
        onDelta(STEP_DELTA * 0.8)
      }

      if (e.key === 'ArrowUp') {
        e.preventDefault()
        onDelta(-STEP_DELTA * 0.8)
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchend', handleTouchEnd, { passive: true })
    window.addEventListener('keydown', handleKey)

    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
      window.removeEventListener('keydown', handleKey)
    }
  }, [onDelta])

  const { step: widgetStep, progress: widgetProgress, done: widgetDone } =
    getStepInfo(currentSection, widgetRaw)

  return {
    currentSection,
    widgetRaw,
    widgetStep,
    widgetProgress,
    widgetDone,
    goTo
  }
}