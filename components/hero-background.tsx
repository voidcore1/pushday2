"use client"

import { useEffect, useRef, useState } from "react"

// ─── Ticker data ────────────────────────────────────────────────────────────
const TICKER_ITEMS = [
  { symbol: "NIFTY",     price: "22,847", change: "+1.24%", up: true  },
  { symbol: "SENSEX",    price: "73,912", change: "+0.98%", up: true  },
  { symbol: "BANKNIFTY", price: "48,340", change: "-0.43%", up: false },
  { symbol: "RELIANCE",  price: "2,940",  change: "+2.11%", up: true  },
  { symbol: "TCS",       price: "3,820",  change: "-0.67%", up: false },
  { symbol: "BTC/USD",   price: "67,400", change: "+4.12%", up: true  },
  { symbol: "GOLD",      price: "71,200", change: "+0.54%", up: true  },
  { symbol: "CRUDE OIL", price: "6,820",  change: "-1.23%", up: false },
  { symbol: "ETH/USD",   price: "3,540",  change: "+2.87%", up: true  },
]

// ─── Chart line colours ──────────────────────────────────────────────────────
const LINE_CONFIGS = [
  { stroke: "#d4a843", fill: "rgba(212,168,67,0.12)",    glow: "rgba(212,168,67,0.6)",  speed: 0.6,  amplitude: 55, baseY: 0.38 },
  { stroke: "#22c55e", fill: "rgba(34,197,94,0.08)",     glow: "rgba(34,197,94,0.5)",   speed: 0.45, amplitude: 40, baseY: 0.52 },
  { stroke: "#06b6d4", fill: "rgba(6,182,212,0.07)",     glow: "rgba(6,182,212,0.45)",  speed: 0.55, amplitude: 48, baseY: 0.62 },
  { stroke: "rgba(255,255,255,0.45)", fill: "rgba(255,255,255,0.03)", glow: "rgba(255,255,255,0.2)", speed: 0.35, amplitude: 32, baseY: 0.45 },
  { stroke: "#fb923c", fill: "rgba(251,146,60,0.06)",    glow: "rgba(251,146,60,0.4)",  speed: 0.5,  amplitude: 36, baseY: 0.58 },
]

// ─── Floating particles ──────────────────────────────────────────────────────
const PARTICLE_TEXTS = [
  "22,847.50", "+2.4%", "VOL: 2.3M", "52W HIGH", "BUY",
  "BREAKOUT", "RSI: 68", "MACD ▲", "EMA 200", "SUPPORT",
  "+1.8%", "SELL", "ATH", "-0.9%", "OI: 1.2M",
  "NIFTY", "FII BUY", "DII SELL", "PCR 1.2", "IV: 14%",
]

// ─── Types ───────────────────────────────────────────────────────────────────
type LineState = {
  points: number[]
  offset: number
  phase: number
}

type Candle = {
  x: number
  open: number
  high: number
  low: number
  close: number
  alpha: number
}

type Particle = {
  x: number
  y: number
  text: string
  size: number
  opacity: number
  speed: number
  alpha: number
}

type Dot = {
  x: number
  y: number
  vx: number
  vy: number
}

type SparkLine = {
  points: number[]
  phase: number
}

// ─── Main component ──────────────────────────────────────────────────────────
export function HeroBackground() {
  return (
    <div aria-hidden="true" className="absolute inset-0 z-0 overflow-hidden bg-[#0a0a0a]">
      {/* Canvas layer */}
      <HeroCanvas />

      {/* Gradient overlay — keeps hero text readable */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            linear-gradient(to right,
              rgba(10,10,10,0.88) 0%,
              rgba(10,10,10,0.65) 35%,
              rgba(10,10,10,0.25) 65%,
              rgba(10,10,10,0.10) 100%
            ),
            linear-gradient(to top,
              rgba(10,10,10,0.95) 0%,
              transparent 18%
            ),
            linear-gradient(to bottom,
              rgba(10,10,10,0.7) 0%,
              transparent 10%
            )
          `,
        }}
      />

      {/* Ticker bar */}
      <TickerBar />

      {/* Bottom sparkline strip */}
      <SparklineStrip />
    </div>
  )
}

// ─── Ticker bar ──────────────────────────────────────────────────────────────
function TickerBar() {
  // Duplicate for seamless loop
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS]

  return (
    <div
      className="absolute top-0 left-0 right-0 z-20 flex items-center overflow-hidden"
      style={{
        height: "32px",
        background: "rgba(0,0,0,0.88)",
        borderBottom: "1px solid rgba(212,168,67,0.25)",
      }}
    >
      <div className="ticker-track flex items-center gap-0 whitespace-nowrap">
        {items.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-1.5 px-5" style={{ fontSize: "11px", fontFamily: "monospace" }}>
            <span style={{ color: "#d4a843", fontWeight: 700 }}>{item.symbol}</span>
            <span style={{ color: "rgba(255,255,255,0.8)" }}>{item.price}</span>
            <span style={{ color: item.up ? "#22c55e" : "#ef4444", fontWeight: 600 }}>
              {item.up ? "▲" : "▼"} {item.change}
            </span>
            <span style={{ color: "rgba(255,255,255,0.15)", margin: "0 4px" }}>|</span>
          </span>
        ))}
      </div>

      <style>{`
        .ticker-track {
          display: flex;
          animation: ticker-scroll 28s linear infinite;
        }
        @keyframes ticker-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}

// ─── Main canvas ─────────────────────────────────────────────────────────────
function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const isMobile = () => window.innerWidth < 768

    const resize = () => {
      const w = canvas.parentElement?.clientWidth || window.innerWidth
      const h = canvas.parentElement?.clientHeight || window.innerHeight
      canvas.width  = w * dpr
      canvas.height = h * dpr
      canvas.style.width  = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener("resize", resize)

    const W = () => canvas.clientWidth
    const H = () => canvas.clientHeight

    // ── Line chart state ────────────────────────────────────────────────────
    const POINT_COUNT = 120
    const lineStates: LineState[] = LINE_CONFIGS.map((cfg, i) => {
      const pts: number[] = []
      for (let j = 0; j < POINT_COUNT; j++) {
        pts.push(H() * cfg.baseY + Math.sin(j * 0.18 + i) * cfg.amplitude)
      }
      return { points: pts, offset: 0, phase: i * 1.3 }
    })

    // ── Candlestick state ───────────────────────────────────────────────────
    const CANDLE_COUNT = 18
    const buildCandles = (corner: "tl" | "br"): Candle[] =>
      Array.from({ length: CANDLE_COUNT }).map((_, i) => {
        const baseX = corner === "tl"
          ? 20 + i * 22
          : W() - 20 - (CANDLE_COUNT - i) * 22
        const mid = H() * (corner === "tl" ? 0.72 : 0.30)
        const o = mid + (Math.random() - 0.5) * 40
        const c = o + (Math.random() - 0.5) * 30
        return {
          x: baseX,
          open: o, close: c,
          high: Math.min(o, c) - Math.random() * 12,
          low:  Math.max(o, c) + Math.random() * 12,
          alpha: 0.06 + Math.random() * 0.10,
        }
      })

    let candlesTL = buildCandles("tl")
    let candlesBR = buildCandles("br")
    let candleTimer = 0

    // ── Particles ───────────────────────────────────────────────────────────
    const makeParticle = (): Particle => ({
      x: Math.random() * W(),
      y: H() + Math.random() * 80,
      text: PARTICLE_TEXTS[Math.floor(Math.random() * PARTICLE_TEXTS.length)],
      size: 9 + Math.random() * 7,
      opacity: 0.08 + Math.random() * 0.07,
      speed: 0.18 + Math.random() * 0.22,
      alpha: 0,
    })
    const PARTICLE_COUNT = isMobile() ? 0 : 24
    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, makeParticle)

    // ── Dot network ─────────────────────────────────────────────────────────
    const DOT_COUNT = isMobile() ? 0 : 40
    const dots: Dot[] = Array.from({ length: DOT_COUNT }, () => ({
      x: Math.random() * W(),
      y: Math.random() * H(),
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
    }))

    let raf: number
    let last = performance.now()

    const render = (now: number) => {
      const dt = Math.min((now - last) / 16.67, 3)
      last = now
      const w = W(), h = H()

      ctx.clearRect(0, 0, w, h)

      // Layer E — dot network (deepest)
      if (!isMobile()) drawDotNetwork(ctx, dots, w, h, dt)

      // Layer D — grid
      drawGrid(ctx, w, h)

      // Layer B — candlesticks
      drawCandleCluster(ctx, candlesTL)
      drawCandleCluster(ctx, candlesBR)

      // Slowly regenerate candles
      candleTimer += dt
      if (candleTimer > 120) {
        candleTimer = 0
        candlesTL = buildCandles("tl")
        candlesBR = buildCandles("br")
      }

      // Layer A — line charts
      LINE_CONFIGS.forEach((cfg, i) => {
        updateLineState(lineStates[i], cfg, h, dt, now)
        drawLineChart(ctx, lineStates[i].points, cfg, w, h)
      })

      // Layer C — particles
      if (!isMobile()) {
        particles.forEach((p, i) => {
          p.y -= p.speed * dt
          if (p.y < -20) {
            particles[i] = makeParticle()
            particles[i].y = h + 10
          }
          drawParticle(ctx, p)
        })
      }

      raf = requestAnimationFrame(render)
    }

    raf = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
}

// ─── Drawing helpers ─────────────────────────────────────────────────────────

function drawGrid(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.save()
  ctx.strokeStyle = "rgba(212,168,67,0.05)"
  ctx.lineWidth = 1
  const col = Math.round(w / 60)
  const row = Math.round(h / 60)
  for (let i = 0; i <= col; i++) {
    const x = (w / col) * i
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke()
  }
  for (let j = 0; j <= row; j++) {
    const y = (h / row) * j
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke()
  }
  ctx.restore()
}

function updateLineState(
  state: LineState,
  cfg: typeof LINE_CONFIGS[0],
  h: number,
  dt: number,
  now: number,
) {
  state.phase += cfg.speed * 0.008 * dt
  // Shift all points left by fractional offset
  state.offset += cfg.speed * 0.5 * dt
  if (state.offset >= (800 / state.points.length)) {
    state.offset = 0
    state.points.shift()
    const last = state.points[state.points.length - 1]
    const target = h * cfg.baseY + Math.sin(now * 0.0007 * cfg.speed + state.phase) * cfg.amplitude
    state.points.push(last + (target - last) * 0.25 + (Math.random() - 0.5) * 8)
  }
}

function drawLineChart(
  ctx: CanvasRenderingContext2D,
  points: number[],
  cfg: typeof LINE_CONFIGS[0],
  w: number,
  h: number,
) {
  if (points.length < 2) return
  const n = points.length
  const stepX = w / (n - 1)

  // Glow
  ctx.save()
  ctx.shadowBlur = 14
  ctx.shadowColor = cfg.glow
  ctx.strokeStyle = cfg.stroke
  ctx.lineWidth = 1.8
  ctx.beginPath()
  for (let i = 0; i < n; i++) {
    const x = i * stepX
    const y = points[i]
    if (i === 0) {
      ctx.moveTo(x, y)
    } else {
      const px = (i - 1) * stepX
      const py = points[i - 1]
      const cpx = (px + x) / 2
      ctx.bezierCurveTo(cpx, py, cpx, y, x, y)
    }
  }
  ctx.stroke()
  ctx.restore()

  // Area fill
  ctx.save()
  const grad = ctx.createLinearGradient(0, 0, 0, h)
  grad.addColorStop(0, cfg.fill)
  grad.addColorStop(1, "rgba(0,0,0,0)")
  ctx.fillStyle = grad
  ctx.beginPath()
  for (let i = 0; i < n; i++) {
    const x = i * stepX
    const y = points[i]
    if (i === 0) {
      ctx.moveTo(x, y)
    } else {
      const px = (i - 1) * stepX
      const py = points[i - 1]
      const cpx = (px + x) / 2
      ctx.bezierCurveTo(cpx, py, cpx, y, x, y)
    }
  }
  ctx.lineTo((n - 1) * stepX, h)
  ctx.lineTo(0, h)
  ctx.closePath()
  ctx.fill()
  ctx.restore()
}

function drawCandleCluster(ctx: CanvasRenderingContext2D, candles: Candle[]) {
  candles.forEach((c) => {
    const bull = c.close < c.open // lower close = bullish (price went up from open)
    const color = bull ? "#22c55e" : "#ef4444"
    const bodyTop    = Math.min(c.open, c.close)
    const bodyBottom = Math.max(c.open, c.close)
    const bodyH      = Math.max(bodyBottom - bodyTop, 2)

    ctx.save()
    ctx.globalAlpha = c.alpha

    // Wick
    ctx.strokeStyle = color
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(c.x + 5, c.high)
    ctx.lineTo(c.x + 5, c.low)
    ctx.stroke()

    // Body
    ctx.fillStyle = color
    ctx.fillRect(c.x, bodyTop, 10, bodyH)

    ctx.restore()
  })
}

function drawParticle(ctx: CanvasRenderingContext2D, p: Particle) {
  ctx.save()
  ctx.globalAlpha = p.opacity
  ctx.fillStyle = "#d4a843"
  ctx.font = `${p.size}px monospace`
  ctx.fillText(p.text, p.x, p.y)
  ctx.restore()
}

function drawDotNetwork(
  ctx: CanvasRenderingContext2D,
  dots: Dot[],
  w: number,
  h: number,
  dt: number,
) {
  // Move dots
  dots.forEach((d) => {
    d.x += d.vx * dt
    d.y += d.vy * dt
    if (d.x < 0 || d.x > w) d.vx *= -1
    if (d.y < 0 || d.y > h) d.vy *= -1
  })

  const CONNECTION_DIST = 130
  ctx.save()
  // Draw connections
  for (let i = 0; i < dots.length; i++) {
    for (let j = i + 1; j < dots.length; j++) {
      const dx = dots[i].x - dots[j].x
      const dy = dots[i].y - dots[j].y
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < CONNECTION_DIST) {
        const alpha = (1 - dist / CONNECTION_DIST) * 0.07
        ctx.strokeStyle = `rgba(212,168,67,${alpha})`
        ctx.lineWidth = 0.5
        ctx.beginPath()
        ctx.moveTo(dots[i].x, dots[i].y)
        ctx.lineTo(dots[j].x, dots[j].y)
        ctx.stroke()
      }
    }
  }
  // Draw dots
  dots.forEach((d) => {
    ctx.beginPath()
    ctx.arc(d.x, d.y, 1.5, 0, Math.PI * 2)
    ctx.fillStyle = "rgba(212,168,67,0.2)"
    ctx.fill()
  })
  ctx.restore()
}

// ─── Bottom sparkline strip ──────────────────────────────────────────────────
const SPARK_LABELS = ["NIFTY", "BANKNIFTY", "BTC"]
const SPARK_COLORS = ["#d4a843", "#22c55e", "#06b6d4"]
const SPARK_GLOWS  = ["rgba(212,168,67,0.7)", "rgba(34,197,94,0.7)", "rgba(6,182,212,0.7)"]

function SparklineStrip() {
  const refs = [
    useRef<HTMLCanvasElement>(null),
    useRef<HTMLCanvasElement>(null),
    useRef<HTMLCanvasElement>(null),
  ]

  useEffect(() => {
    const states: SparkLine[] = refs.map((_, i) => ({
      points: Array.from({ length: 60 }, (__, j) => 40 + Math.sin(j * 0.3 + i) * 18),
      phase: i * 1.1,
    }))

    let raf: number
    let last = performance.now()

    const render = (now: number) => {
      const dt = Math.min((now - last) / 16.67, 3)
      last = now

      refs.forEach((ref, i) => {
        const canvas = ref.current
        if (!canvas) return
        const ctx = canvas.getContext("2d")
        if (!ctx) return
        const dpr = window.devicePixelRatio || 1
        const w = canvas.clientWidth
        const h = canvas.clientHeight
        if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
          canvas.width  = w * dpr
          canvas.height = h * dpr
          ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
        }

        ctx.clearRect(0, 0, w, h)

        // Update state
        states[i].phase += 0.018 * dt
        states[i].points.shift()
        const last2 = states[i].points[states[i].points.length - 1]
        const next = last2 + Math.sin(now * 0.001 * (i + 1) + states[i].phase) * 3 + (Math.random() - 0.5) * 2
        states[i].points.push(Math.max(8, Math.min(h - 8, next)))

        // Grid line
        ctx.strokeStyle = "rgba(212,168,67,0.06)"
        ctx.lineWidth = 1
        for (let g = 0; g < 4; g++) {
          const gy = (h / 3) * g
          ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(w, gy); ctx.stroke()
        }

        const pts = states[i].points
        const n = pts.length
        const sx = w / (n - 1)

        // Area fill
        const grad = ctx.createLinearGradient(0, 0, 0, h)
        grad.addColorStop(0, SPARK_COLORS[i].replace(")", ",0.15)").replace("rgb", "rgba"))
        grad.addColorStop(1, "rgba(0,0,0,0)")
        ctx.fillStyle = grad
        ctx.beginPath()
        for (let k = 0; k < n; k++) {
          const x = k * sx, y = pts[k]
          k === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
        }
        ctx.lineTo((n - 1) * sx, h); ctx.lineTo(0, h); ctx.closePath(); ctx.fill()

        // Line
        ctx.save()
        ctx.shadowBlur = 8
        ctx.shadowColor = SPARK_GLOWS[i]
        ctx.strokeStyle = SPARK_COLORS[i]
        ctx.lineWidth = 1.5
        ctx.beginPath()
        for (let k = 0; k < n; k++) {
          const x = k * sx, y = pts[k]
          k === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
        }
        ctx.stroke()
        ctx.restore()
      })

      raf = requestAnimationFrame(render)
    }

    raf = requestAnimationFrame(render)
    return () => cancelAnimationFrame(raf)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      className="absolute bottom-0 left-0 right-0 z-10 flex"
      style={{
        height: "80px",
        background: "rgba(0,0,0,0.55)",
        borderTop: "1px solid rgba(212,168,67,0.12)",
      }}
    >
      {refs.map((ref, i) => (
        <div
          key={i}
          className="flex-1 relative flex flex-col"
          style={{ borderRight: i < 2 ? "1px solid rgba(212,168,67,0.08)" : "none" }}
        >
          <span
            className="absolute top-2 left-3 z-10 text-[10px] font-mono font-bold"
            style={{ color: SPARK_COLORS[i] }}
          >
            {SPARK_LABELS[i]}
          </span>
          <canvas ref={ref} className="w-full flex-1" style={{ display: "block" }} />
        </div>
      ))}
    </div>
  )
}
