# CORI Landing — Next.js 14

Stack: **Next.js 14 (App Router) · TypeScript · Framer Motion · Canvas API · Tailwind CSS**

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Structure

```
app/
  layout.tsx          # Root layout, Syne + JetBrains Mono fonts
  page.tsx            # Main page — composes all 19 sections
  globals.css         # Tailwind + CSS variables

components/
  layout/
    Nav.tsx           # Top nav with progress bar
  sections/
    Hero.tsx          # S0 — hero
    EngineClarity.tsx # S1 — what CORI is (3 engine cards)
    Bridge.tsx        # Narrative bridges (S2,4,6,9,11,13,15)
    PointOfNoReturn.tsx # S8 — "The system is still compliant. And already compromised."
    ProductSection.tsx  # S17 — three layers, enterprise buyer
    CTA.tsx           # S18 — "See your point of no return."
  widgets/
    W1SingleAttacker.tsx  # Canvas — 6 steps, quasi-identifiers
    W2MassExtraction.tsx  # Canvas — 6 steps, token density
    W3Collusion.tsx       # Canvas — 4 steps, combined coverage
    W4DayZero.tsx         # DOM   — 10 steps, Day 0 flow
    W5T86.tsx             # Canvas — 5 steps, T86 orchestration
    W6AttackCost.tsx      # DOM   — 4 steps, economics
    W7AdaptiveLayer.tsx   # DOM   — 6 steps, adaptive layer + arch SVG
  ui/
    WidgetShell.tsx   # Header with Framer Motion step transitions
    StepBar.tsx       # Step pips + progress fill

hooks/
  useScrollEngine.ts  # Core: wheel delta → section nav + widget progress
  useWidgetCanvas.ts  # RAF loop + kill flash + pulsing
  useLenis.ts         # Disables native scroll (engine takes control)

lib/
  constants.ts        # SECTIONS[], STEP_TEXTS[], BRIDGE_CONTENT[]
  canvas-utils.ts     # easeOut, sizeCanvas, drawRiskBar, drawCoverageBar

types/
  index.ts            # ScrollEngine, DrawArgs, SectionDef, StepText
```

## Scroll Architecture

- `useScrollEngine` captures `wheel / touch / keyboard` events
- For **narrative sections**: accumulates delta → flips section at threshold
- For **widget sections**: scroll drives `widgetRaw` (0 → steps × 160px)
  - `step = floor(widgetRaw / 160)`
  - `progress = (widgetRaw % 160) / 160`
  - Canvas redraws every RAF frame using current step + progress
  - When `widgetRaw >= total`, widget is "done" and scroll resumes section navigation

## Canvas Widgets

Each canvas widget receives `widgetRaw + isActive` props.  
`useWidgetCanvas` runs the RAF loop, manages `fg` (fieldGlow pulsing), and `killFlash` state.  
Drawing functions receive `(ctx, W, H, step, progress, fg, killFlash)` and draw the interpolated state.

## Deployment

```bash
npm run build
npm start
# or deploy to Vercel — zero config
```
