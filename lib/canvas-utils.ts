// Easing
export const easeOut = (t: number) => 1 - (1 - t) * (1 - t)
export const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v))
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t

// Resize canvas to match CSS size
export function sizeCanvas(cv: HTMLCanvasElement): [number, number] {
  const W = cv.parentElement?.offsetWidth ?? cv.offsetWidth
  const H = cv.parentElement?.offsetHeight ?? cv.offsetHeight
  if (W > 0 && H > 0 && (cv.width !== W || cv.height !== H)) {
    cv.width = W
    cv.height = H
  }
  return [cv.width, cv.height]
}

// Format population numbers
export function fmtPop(n: number): string {
  if (n >= 1e6) return (n / 1e6).toFixed(1) + 'M'
  if (n >= 1e3) return Math.round(n / 1e3) + 'K'
  return String(Math.round(n))
}

// Draw HUD risk bar (top right)
export function drawRiskBar(
  ctx: CanvasRenderingContext2D,
  W: number,
  risk: number,           // 0–100
  label: string = 'reconstruction risk'
) {
  const bx = W - 190, by = 14, bw = 170, bh = 5
  ctx.fillStyle = 'rgba(255,255,255,.06)'
  ctx.fillRect(bx, by, bw, bh)
  const bc = risk >= 49 ? '#E24B4A' : risk >= 28 ? '#EF9F27' : '#1D9E75'
  if (risk > 0) {
    ctx.fillStyle = bc
    ctx.fillRect(bx, by, bw * Math.min(risk, 51) / 51, bh)
  }
  // Limit line at 51%
  ctx.fillStyle = 'rgba(226,75,74,.68)'
  ctx.fillRect(bx + bw, by - 2, 1.5, bh + 4)
  ctx.fillStyle = 'rgba(255,255,255,.22)'
  ctx.font = '7px "JetBrains Mono",monospace'
  ctx.textAlign = 'end'
  ctx.fillText(label, bx - 5, by + 5)
  if (risk > 0) {
    ctx.fillStyle = bc
    ctx.font = '500 11px "JetBrains Mono",monospace'
    ctx.textAlign = 'end'
    ctx.fillText(risk + '%', bx - 5, by - 1)
  }
}

// Draw coverage bar (top left)
export function drawCoverageBar(
  ctx: CanvasRenderingContext2D,
  W: number,
  cov: number,
  maxCov: number = 74
) {
  const bx = 20, by = 14, bw = Math.min(W - 40, 260), bh = 5
  ctx.fillStyle = 'rgba(255,255,255,.06)'
  ctx.fillRect(bx, by, bw, bh)
  const bc = cov >= 51 ? '#E24B4A' : cov >= 35 ? '#EF9F27' : '#1D9E75'
  if (cov > 0) {
    ctx.fillStyle = bc
    ctx.fillRect(bx, by, bw * Math.min(cov, maxCov) / maxCov, bh)
  }
  ctx.fillStyle = 'rgba(226,75,74,.65)'
  ctx.fillRect(bx + bw * 51 / maxCov, by - 2, 1.5, bh + 4)
  ctx.fillStyle = 'rgba(255,255,255,.22)'
  ctx.font = '7px "JetBrains Mono",monospace'
  ctx.textAlign = 'start'
  ctx.fillText('combined coverage', bx, by - 4)
  if (cov > 0) {
    ctx.fillStyle = bc
    ctx.font = '500 11px "JetBrains Mono",monospace'
    ctx.fillText(cov + '%', bx + bw * Math.min(cov, maxCov) / maxCov + 5, by + 8)
  }
}
