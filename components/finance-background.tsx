"use client"

import { useEffect, useRef } from "react"

// ─── Ticker data ─────────────────────────────────────────────────────────────
const TICKER_ITEMS = [
  { symbol: "NIFTY",     price: "22,847",  change: "+1.24%", up: true  },
  { symbol: "SENSEX",    price: "73,912",  change: "+0.98%", up: true  },
  { symbol: "BANKNIFTY", price: "48,340",  change: "−0.43%", up: false },
  { symbol: "RELIANCE",  price: "₹2,940",  change: "+2.11%", up: true  },
  { symbol: "TCS",       price: "₹3,820",  change: "−0.67%", up: false },
  { symbol: "HDFC",      price: "₹1,680",  change: "+1.55%", up: true  },
  { symbol: "INFY",      price: "₹1,450",  change: "+0.88%", up: true  },
  { symbol: "BTC/USD",   price: "$67,400", change: "+4.12%", up: true  },
  { symbol: "ETH/USD",   price: "$3,540",  change: "+2.87%", up: true  },
  { symbol: "GOLD",      price: "₹71,200", change: "+0.54%", up: true  },
  { symbol: "CRUDE OIL", price: "₹6,820",  change: "−1.23%", up: false },
  { symbol: "USD/INR",   price: "83.42",   change: "−0.12%", up: false },
]

// ─── Strip configs ────────────────────────────────────────────────────────────
const STRIPS = [
  { yFrac: 0.04, heightFrac: 0.30, lineColor: "#b8832a", lineOpacity: 0.55, scrollSpeed: 0.55, startPrice: 22400 },
  { yFrac: 0.37, heightFrac: 0.28, lineColor: "#2d6a4f", lineOpacity: 0.40, scrollSpeed: 0.40, startPrice: 48200 },
  { yFrac: 0.68, heightFrac: 0.28, lineColor: "#1d4ed8", lineOpacity: 0.35, scrollSpeed: 0.65, startPrice: 67400 },
]

const CANDLE_W  = 9
const CANDLE_GAP = 4
const STEP      = CANDLE_W + CANDLE_GAP  // 13

type OHLC = { open: number; close: number; high: number; low: number }

function genCandles(n: number, startPrice: number): OHLC[] {
  const arr: OHLC[] = []
  let price = startPrice
  for (let i = 0; i < n; i++) {
    const open  = price
    const move  = (Math.random() - 0.48) * price * 0.022
    const close = open + move
    const high  = Math.max(open, close) + Math.random() * price * 0.008
    const low   = Math.min(open, close) - Math.random() * price * 0.008
    arr.push({ open, close, high, low })
    price = close
  }
  return arr
}

type StripState = {
  candles: OHLC[]
  offset: number
  cfg: typeof STRIPS[0]
}

function mapY(price: number, minP: number, maxP: number, yTop: number, zoneH: number): number {
  const pad = zoneH * 0.12
  const range = maxP - minP || 1
  return yTop + pad + ((maxP - price) / range) * (zoneH - pad * 2)
}

export function FinanceBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1

    const resize = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      canvas.width  = w * dpr
      canvas.height = h * dpr
      canvas.style.width  = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener("resize", resize)

    const W = () => window.innerWidth
    const H = () => window.innerHeight

    // Initialise strips — fill enough candles to cover full width + buffer
    const strips: StripState[] = STRIPS.map((cfg) => {
      const count = Math.ceil(W() / STEP) + 20
      return { candles: genCandles(count, cfg.startPrice), offset: 0, cfg }
    })

    let raf: number

    const render = () => {
      const w = W()
      const h = H()
      ctx.clearRect(0, 0, w, h)

      // ── STEP 1: vertical grid lines ──────────────────────────────────────
      ctx.save()
      ctx.strokeStyle = "rgba(85,85,85,0.04)"
      ctx.lineWidth = 1
      const cols = 14
      for (let i = 0; i <= cols; i++) {
        const x = (w / cols) * i
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, h)
        ctx.stroke()
      }
      ctx.restore()

      // ── STEP 2: three chart strips ────────────────────────────────────────
      for (const s of strips) {
        const { cfg } = s
        const yTop   = h * cfg.yFrac
        const zoneH  = h * cfg.heightFrac

        // Advance scroll
        s.offset += cfg.scrollSpeed
        while (s.offset >= STEP) {
          s.offset -= STEP
          s.candles.shift()
          s.candles.push(genCandles(1, s.candles[s.candles.length - 1]?.close ?? cfg.startPrice)[0])
        }

        // ── A: horizontal grid lines inside strip ─────────────────────────
        ctx.save()
        ctx.strokeStyle = "#b8832a"
        ctx.globalAlpha = 0.07
        ctx.lineWidth = 0.5
        for (let d = 1; d <= 3; d++) {
          const gy = yTop + (zoneH / 4) * d
          ctx.beginPath()
          ctx.moveTo(0, gy)
          ctx.lineTo(w, gy)
          ctx.stroke()
        }
        ctx.restore()

        // Price range for mapping
        const allHighs = s.candles.map((c) => c.high)
        const allLows  = s.candles.map((c) => c.low)
        const minP = Math.min(...allLows)
        const maxP = Math.max(...allHighs)

        const totalW  = s.candles.length * STEP
        const startX  = w - totalW + s.offset

        // ── B: candlesticks ────────────────────────────────────────────────
        s.candles.forEach((c, i) => {
          const cx = startX + i * STEP
          if (cx + CANDLE_W < 0 || cx > w) return

          const bull = c.close >= c.open
          const bodyColor = bull ? "#b8832a" : "#8a8a8a"
          const bodyTop    = mapY(Math.max(c.open, c.close), minP, maxP, yTop, zoneH)
          const bodyBottom = mapY(Math.min(c.open, c.close), minP, maxP, yTop, zoneH)
          const bodyH      = Math.max(bodyBottom - bodyTop, 1)
          const centerX    = cx + CANDLE_W / 2

          // Wick
          ctx.save()
          ctx.strokeStyle = bodyColor
          ctx.lineWidth = 1
          ctx.globalAlpha = 0.22
          ctx.beginPath()
          ctx.moveTo(centerX, mapY(c.high, minP, maxP, yTop, zoneH))
          ctx.lineTo(centerX, mapY(c.low,  minP, maxP, yTop, zoneH))
          ctx.stroke()
          ctx.restore()

          // Body fill
          ctx.save()
          ctx.fillStyle = bodyColor
          ctx.globalAlpha = bull ? 0.28 : 0.18
          ctx.fillRect(cx, bodyTop, CANDLE_W, bodyH)
          ctx.restore()

          // Body outline
          ctx.save()
          ctx.strokeStyle = bodyColor
          ctx.lineWidth = 0.8
          ctx.globalAlpha = 0.35
          ctx.strokeRect(cx, bodyTop, CANDLE_W, bodyH)
          ctx.restore()
        })

        // ── C: solid overlay line (close prices) ──────────────────────────
        ctx.save()
        ctx.strokeStyle = cfg.lineColor
        ctx.lineWidth = 1.8
        ctx.globalAlpha = cfg.lineOpacity
        ctx.lineJoin = "round"
        ctx.shadowBlur = 0
        ctx.beginPath()
        let started = false
        s.candles.forEach((c, i) => {
          const cx = startX + i * STEP + CANDLE_W / 2
          if (cx < -STEP || cx > w + STEP) return
          const cy = mapY(c.close, minP, maxP, yTop, zoneH)
          if (!started) { ctx.moveTo(cx, cy); started = true }
          else ctx.lineTo(cx, cy)
        })
        ctx.stroke()
        ctx.restore()

        // ── D: dashed overlay line (open prices) ──────────────────────────
        ctx.save()
        ctx.strokeStyle = cfg.lineColor
        ctx.lineWidth = 1.2
        ctx.globalAlpha = cfg.lineOpacity * 0.55
        ctx.lineJoin = "round"
        ctx.setLineDash([6, 5])
        ctx.shadowBlur = 0
        ctx.beginPath()
        let started2 = false
        s.candles.forEach((c, i) => {
          const cx = startX + i * STEP + CANDLE_W / 2
          if (cx < -STEP || cx > w + STEP) return
          const cy = mapY(c.open, minP, maxP, yTop, zoneH)
          if (!started2) { ctx.moveTo(cx, cy); started2 = true }
          else ctx.lineTo(cx, cy)
        })
        ctx.stroke()
        ctx.setLineDash([])
        ctx.restore()
      }

      raf = requestAnimationFrame(render)
    }

    raf = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
      style={{ background: "transparent" }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ background: "transparent" }} />
      <TickerBar />
    </div>
  )
}

// ─── Ticker bar ───────────────────────────────────────────────────────────────
function TickerBar() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS]

  return (
    <div
      className="absolute bottom-0 left-0 right-0 flex items-center overflow-hidden"
      style={{
        height: "34px",
        background: "rgba(18,18,18,0.94)",
        borderTop: "1px solid rgba(184,131,42,0.35)",
      }}
    >
      <div className="ticker-bg-track flex items-center whitespace-nowrap">
        {items.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-1.5 px-5"
            style={{ fontSize: "11.5px", fontWeight: 600, fontFamily: "monospace" }}
          >
            <span style={{ color: "rgba(255,255,255,0.55)" }}>{item.symbol}</span>
            <span style={{ color: "#ffffff" }}>{item.price}</span>
            <span style={{ color: item.up ? "#22c55e" : "#ef4444" }}>{item.change}</span>
            <span style={{ color: "rgba(255,255,255,0.12)", margin: "0 4px" }}>|</span>
          </span>
        ))}
      </div>

      <style>{`
        .ticker-bg-track {
          display: flex;
          animation: ticker-bg-scroll 40s linear infinite;
        }
        @keyframes ticker-bg-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}
