'use client'
import { useEffect, useRef, useState } from 'react'
import { useScrollEngine } from '@/hooks/useScrollEngine'
import { useLenis } from '@/hooks/useLenis'
import { Nav } from '@/components/layout/Nav'
import { Hero } from '@/components/sections/Hero'
import { EngineClarity } from '@/components/sections/EngineClarity'
import { Bridge } from '@/components/sections/Bridge'
import { PointOfNoReturn } from '@/components/sections/PointOfNoReturn'
import { ProductSection } from '@/components/sections/ProductSection'
import { CTA } from '@/components/sections/CTA'
import { WidgetShell } from '@/components/ui/WidgetShell'
import { W1SingleAttacker } from '@/components/widgets/W1SingleAttacker'
import { W2MassExtraction } from '@/components/widgets/W2MassExtraction'
import { W3Collusion } from '@/components/widgets/W3Collusion'
import { W4DayZero } from '@/components/widgets/W4DayZero'
import { W5T86 } from '@/components/widgets/W5T86'
import { W6AttackCost } from '@/components/widgets/W6AttackCost'
import { W7AdaptiveLayer } from '@/components/widgets/W7AdaptiveLayer'
import { SECTIONS } from '@/lib/constants'

const NAV_H = 44

export default function Home() {
  useLenis()
  const { currentSection, widgetRaw, widgetStep, widgetProgress, widgetDone, goTo } = useScrollEngine()
  const trackRef = useRef<HTMLDivElement>(null)
  const [secH, setSecH] = useState(0)

  useEffect(() => {
    const calc = () => setSecH(window.innerHeight - NAV_H)
    calc()
    window.addEventListener('resize', calc)
    return () => window.removeEventListener('resize', calc)
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track || secH === 0) return
    track.style.transform = `translateY(-${currentSection * secH}px)`
  }, [currentSection, secH])

  const isActive = (id: number) => currentSection === id

  if (secH === 0) return null

  const sH = `${secH}px`

  return (
    <>
      <Nav
        currentSection={currentSection}
        widgetStep={widgetStep}
        widgetDone={widgetDone}
        goTo={goTo}
      />

      <div
        id="scroller"
        className="fixed"
        style={{ top: NAV_H, left: 0, right: 0, bottom: 0, overflow: 'hidden' }}
      >
        <div
          id="track"
          ref={trackRef}
          style={{
            display: 'flex',
            flexDirection: 'column',
            willChange: 'transform',
            transition: 'transform 0.72s cubic-bezier(0.77,0,0.14,1)',
          }}
        >
          {SECTIONS.map(sec => {
            const baseStyle = { height: sH, flexShrink: 0, overflow: 'hidden' as const }

            if (sec.kind === 'hero') return (
              <div key={sec.id} id={`section-${sec.id}`} style={baseStyle}>
                <Hero />
              </div>
            )

            if (sec.kind === 'engine') return (
              <div key={sec.id} id={`section-${sec.id}`} style={baseStyle}>
                <EngineClarity />
              </div>
            )

            if (sec.kind === 'bridge') return (
              <div key={sec.id} id={`section-${sec.id}`} style={baseStyle}>
                <Bridge sectionId={sec.id} />
              </div>
            )

            if (sec.kind === 'noreturn') return (
              <div key={sec.id} id={`section-${sec.id}`} style={baseStyle}>
                <PointOfNoReturn />
              </div>
            )

            if (sec.kind === 'product') return (
              <div key={sec.id} id={`section-${sec.id}`} style={baseStyle}>
                <ProductSection />
              </div>
            )

            if (sec.kind === 'cta') return (
              <div key={sec.id} id={`section-${sec.id}`} style={baseStyle}>
                <CTA />
              </div>
            )

            if (sec.kind === 'widget' && sec.widgetId && sec.steps) {
              const secNumMap: Record<number, string> = {
                1: '01 / 07', 2: '02 / 07', 3: '03 / 07', 4: '04 / 07',
                5: '05 / 07', 6: '06 / 07', 7: '07 / 07',
              }
              const active = isActive(sec.id)
              const raw = active ? widgetRaw : 0
              const step = active ? widgetStep : 0
              const prog = active ? widgetProgress : 0
              const done = active ? widgetDone : false

              return (
                <div
                  key={sec.id}
                  id={`section-${sec.id}`}
                  style={{ ...baseStyle, display: 'flex', flexDirection: 'column' }}
                >
                  <WidgetShell
                    widgetId={sec.widgetId}
                    secNum={secNumMap[sec.widgetId]}
                    step={step}
                    progress={prog}
                    done={done}
                  >
                    {sec.widgetId === 1 && <W1SingleAttacker widgetRaw={raw} isActive={active} />}
                    {sec.widgetId === 2 && <W2MassExtraction widgetRaw={raw} isActive={active} />}
                    {sec.widgetId === 3 && <W3Collusion      widgetRaw={raw} isActive={active} />}
                    {sec.widgetId === 4 && <W4DayZero        widgetRaw={raw} isActive={active} />}
                    {sec.widgetId === 5 && <W5T86            widgetRaw={raw} isActive={active} />}
                    {sec.widgetId === 6 && <W6AttackCost     widgetRaw={raw} isActive={active} />}
                    {sec.widgetId === 7 && <W7AdaptiveLayer  widgetRaw={raw} isActive={active} />}
                  </WidgetShell>
                </div>
              )
            }

            return null
          })}
        </div>
      </div>
    </>
  )
}