'use client'
import { useEffect, useRef, useCallback } from 'react'
import { STEP_DELTA } from '@/lib/constants'
import { sizeCanvas } from '@/lib/canvas-utils'

interface UseWidgetCanvasOptions {
  totalSteps: number
  widgetRaw: number          // from scroll engine
  isActive: boolean          // is this widget's section current?
  draw: (ctx: CanvasRenderingContext2D, W: number, H: number, step: number, progress: number, fg: number, killFlash: number) => void
}

export function useWidgetCanvas(options: UseWidgetCanvasOptions) {
  const { totalSteps, widgetRaw, isActive, draw } = options
  const canvasRef  = useRef<HTMLCanvasElement>(null)
  const rafRef     = useRef<number>(0)
  const fgRef      = useRef(0.5)
  const fdRef      = useRef(1)
  const killFlashRef  = useRef(0)
  const wasKillRef    = useRef(false)
  const rawRef     = useRef(widgetRaw)

  // Keep raw in sync
  rawRef.current = widgetRaw

  const loop = useCallback(() => {
    const cv = canvasRef.current
    if (!cv) return
    const ctx = cv.getContext('2d')
    if (!ctx) return
    const [W, H] = sizeCanvas(cv)

    const total  = totalSteps * STEP_DELTA
    const capped = Math.min(rawRef.current, total)
    const step   = Math.min(Math.floor(capped / STEP_DELTA), totalSteps - 1)
    const prog   = (capped % STEP_DELTA) / STEP_DELTA

    // Kill detection (last step, progress > 0.5)
    const isKill = step >= totalSteps - 1 && prog > 0.5
    if (isKill && !wasKillRef.current) { killFlashRef.current = 1; wasKillRef.current = true }
    if (!isKill) wasKillRef.current = false
    if (killFlashRef.current > 0) killFlashRef.current = Math.max(0, killFlashRef.current - 0.04)

    // Pulsing: freeze when kill
    if (!isKill) {
      fgRef.current += 0.04 * fdRef.current
      if (fgRef.current >= 1) fdRef.current = -1
      if (fgRef.current <= 0.22) fdRef.current = 1
    } else {
      fgRef.current = 0.5
    }

    draw(ctx, W, H, step, prog, fgRef.current, killFlashRef.current)
    rafRef.current = requestAnimationFrame(loop)
  }, [totalSteps, draw])

  useEffect(() => {
    if (!isActive) { cancelAnimationFrame(rafRef.current); return }
    rafRef.current = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(rafRef.current)
  }, [isActive, loop])

  return canvasRef
}
