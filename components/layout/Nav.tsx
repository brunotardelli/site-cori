'use client'
import { SECTIONS } from '@/lib/constants'

const TOTAL = SECTIONS.length

interface NavProps {
  currentSection: number
  widgetStep: number
  widgetDone: boolean
  goTo: (n: number) => void
}

export function Nav({ currentSection, widgetStep, widgetDone, goTo }: NavProps) {
  const p = currentSection / (TOTAL - 1)

  const fillColor = p > 0.75 ? '#E8EDF5' : p > 0.5 ? '#E24B4A' : p > 0.2 ? '#EF9F27' : '#1D9E75'
  const label = p > 0.75 ? 'CORI active' : p > 0.5 ? 'critical' : p > 0.2 ? 'accumulating' : 'observing'

  return (
    <nav
      className="fixed top-0 left-0 right-0 h-11 flex items-center px-7 gap-3.5"
      style={{
        background: 'rgba(8,8,14,.92)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255,255,255,.04)',
      }}
    >
      <span
        className="text-[10px] font-bold tracking-[.16em] uppercase flex-shrink-0 cursor-pointer"
        style={{ color: 'rgba(255,255,255,.3)' }}
        onClick={() => goTo(0)}
      >
        CORI
      </span>

      <div className="flex-1 h-[1.5px] rounded overflow-hidden" style={{ background: 'rgba(255,255,255,.06)' }}>
        <div
          className="h-full rounded transition-all duration-500"
          style={{ width: `${1 + p * 99}%`, background: fillColor }}
        />
      </div>

      <span
        className="font-mono text-[9px] flex-shrink-0 min-w-[80px] text-right transition-colors duration-300"
        style={{ color: 'rgba(255,255,255,.2)' }}
      >
        {label}
      </span>
    </nav>
  )
}
