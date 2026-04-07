// Section types
export type SectionKind = 'hero' | 'engine' | 'bridge' | 'noreturn' | 'widget' | 'product' | 'cta'

export interface SectionDef {
  id: number
  kind: SectionKind
  widgetId?: 1 | 2 | 3 | 4 | 5 | 6 | 7
  steps?: number
}

// Scroll engine
export interface ScrollState {
  currentSection: number
  widgetRaw: number          // 0 → steps * STEP_DELTA (scroll-driven)
  widgetStep: number         // floor(widgetRaw / STEP_DELTA)
  widgetProgress: number     // (widgetRaw % STEP_DELTA) / STEP_DELTA
  widgetDone: boolean
  secAccum: number
}

// Canvas draw
export interface DrawArgs {
  ctx: CanvasRenderingContext2D
  W: number
  H: number
  step: number
  progress: number    // 0→1 within current step
  fg: number          // fieldGlow pulsing 0→1
  killFlash: number   // 0→1 flash on kill
}

// Widget step header text
export interface StepText {
  title: string
  subtitle: string
}

// Easing helpers (exported from lib/utils)
export type EasingFn = (t: number) => number
