'use client'

interface StepBarProps {
  totalSteps: number
  currentStep: number
  progress: number
  done: boolean
}

export function StepBar({ totalSteps, currentStep, progress, done }: StepBarProps) {
  return (
    <div
      className="flex-shrink-0 h-7 flex items-center px-7 gap-1.5"
      style={{ borderTop: '1px solid rgba(255,255,255,.04)', background: 'rgba(255,255,255,.012)' }}
    >
      {Array.from({ length: totalSteps }, (_, i) => (
        <div
          key={i}
          className={`pip ${i < currentStep ? 'done' : i === currentStep ? 'active' : ''}`}
          style={{ width: i === currentStep ? 32 : 20 }}
        />
      ))}

      {/* Progress fill for active step */}
      <div className="ml-1 h-[3px] w-8 rounded overflow-hidden" style={{ background: 'rgba(255,255,255,.06)' }}>
        <div
          className="h-full rounded"
          style={{ width: `${progress * 100}%`, background: '#7166D1', transition: 'width 0.05s linear' }}
        />
      </div>

      <span className="font-mono text-[8px] ml-auto" style={{ color: 'rgba(255,255,255,.15)' }}>
        {done ? 'completed — scroll to continue ↓' : 'scroll to advance ↓'}
      </span>
    </div>
  )
}
