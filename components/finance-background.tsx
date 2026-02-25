"use client"

import { useEffect, useRef } from "react"

// ─── Ticker data ──────────────────────────────────────────────────────────────
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

// ─── Constants ────────────────────────────────────────────────────────────────
const CANDLE_W   = 14
const CANDLE_GAP = 5
const STEP       = CANDLE_W + CANDLE_GAP  // 19
const CHART_PAD  = 0.08
const SCROLL_SPD = 0.5
const SEED_PRICE = 22400

type OHLC = { open: number; close: number; high: number; low: number }

function makeCandle(prevClose: number): OHLC {
  const vol   = prevClose * 0.018
  const open  = prevClose
  const close = open + (Math.random() - 0.47) * vol
  const high  = Math.max(open, close) + Math.random() * vol * 0.5
  const low   = Math.min(open, close) - Math.random() * vol * 0.5
  return { open, close, high, low }
}

function mapY(price: number, minP: number, maxP: number, H: number): number {
  const range = maxP - minP || 1
  return H * CHART_PAD + ((maxP - price) / range) * H * (1 - CHART_PAD * 2)
}

export function FinanceBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1

    // Candle buffer
    let candles: OHLC[] = []
    let offset = 0

    const init = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      canvas.width  = w * dpr
      canvas.height = h * dpr
      canvas.style.width  = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      // Rebuild candle buffer
      const count = Math.ceil(w / STEP) + 40
      candles = []
      let price = SEED_PRICE
      for (let i = 0; i < count; i++) {
        const c = makeCandle(price)
        candles.push(c)
        price = c.close
      }
      offset = 0
    }

    init()
    window.addEventListener("resize", init)

    let raf: number

    const render = () => {
      const w = window.innerWidth
      const h = window.innerHeight

      ctx.clearRect(0, 0, w, h)

      // ── Advance scroll ──────────────────────────────────────────────────
      offset += SCROLL_SPD
      if (offset >= STEP) {
        offset -= STEP
        candles.shift()
        candles.push(makeCandle(candles[candles.length - 1]?.close ?? SEED_PRICE))
      }

      // Price range
      const allHighs = candles.map((c) => c.high)
      const allLows  = candles.map((c) => c.low)
      const minP = Math.min(...allLows)
      const maxP = Math.max(...allHighs)

      const totalW = candles.length * STEP
      const startX = w - totalW + offset

      // ── STEP 1: Horizontal grid lines ───────────────────────────────────
      ctx.save()
      ctx.strokeStyle = "rgba(192,139,47,0.07)"
      ctx.lineWidth = 1
      for (let i = 1; i <= 5; i++) {
        const y = (h / 6) * i
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(w, y)
        ctx.stroke()
      }
      ctx.restore()

      // ── STEP 2: Vertical grid lines ─────────────────────────────────────
      ctx.save()
      ctx.strokeStyle = "rgba(100,100,100,0.04)"
      ctx.lineWidth = 1
      for (let i = 0; i <= 11; i++) {
        const x = (w / 11) * i
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, h)
        ctx.stroke()
      }
      ctx.restore()

      // ── STEP 3: Area fill under close line ───────────────────────────────
      ctx.save()
      const grad = ctx.createLinearGradient(0, 0, 0, h)
      grad.addColorStop(0,   "rgba(192,139,47,0.10)")
      grad.addColorStop(0.5, "rgba(192,139,47,0.04)")
      grad.addColorStop(1,   "rgba(192,139,47,0.00)")
      ctx.fillStyle = grad

      ctx.beginPath()
      let areaStarted = false
      candles.forEach((c, i) => {
        const cx = startX + i * STEP + CANDLE_W / 2
        if (cx < -STEP || cx > w + STEP) return
        const cy = mapY(c.close, minP, maxP, h)
        if (!areaStarted) { ctx.moveTo(cx, cy); areaStarted = true }
        else ctx.lineTo(cx, cy)
      })
      // Close path to bottom
      const lastVisibleX = startX + (candles.length - 1) * STEP + CANDLE_W / 2
      ctx.lineTo(Math.min(lastVisibleX, w + STEP), h)
      ctx.lineTo(startX + CANDLE_W / 2, h)
      ctx.closePath()
      ctx.fill()
      ctx.restore()

      // ── STEP 4: Candlesticks ─────────────────────────────────────────────
      candles.forEach((c, i) => {
        const cx = startX + i * STEP
        if (cx + CANDLE_W < 0 || cx > w) return

        const bull      = c.close >= c.open
        const bodyColor = bull ? "#c08b2f" : "#9ca3af"
        const centerX   = cx + CANDLE_W / 2
        const bodyTop    = mapY(Math.max(c.open, c.close), minP, maxP, h)
        const bodyBottom = mapY(Math.min(c.open, c.close), minP, maxP, h)
        const bodyH      = Math.max(bodyBottom - bodyTop, 2)

        // Wick
        ctx.save()
        ctx.strokeStyle = bodyColor
        ctx.lineWidth   = 1.2
        ctx.globalAlpha = bull ? 0.30 : 0.30
        ctx.beginPath()
        ctx.moveTo(centerX, mapY(c.high, minP, maxP, h))
        ctx.lineTo(centerX, mapY(c.low,  minP, maxP, h))
        ctx.stroke()
        ctx.restore()

        // Body fill
        ctx.save()
        ctx.fillStyle   = bodyColor
        ctx.globalAlpha = bull ? 0.35 : 0.20
        ctx.fillRect(cx, bodyTop, CANDLE_W, bodyH)
        ctx.restore()

        // Body outline
        ctx.save()
        ctx.strokeStyle = bodyColor
        ctx.lineWidth   = 0.8
        ctx.globalAlpha = bull ? 0.50 : 0.30
        ctx.strokeRect(cx, bodyTop, CANDLE_W, bodyH)
        ctx.restore()
      })

      // ── STEP 5: Solid close line ─────────────────────────────────────────
      ctx.save()
      ctx.strokeStyle  = "#c08b2f"
      ctx.lineWidth    = 2.2
      ctx.globalAlpha  = 0.70
      ctx.lineJoin     = "round"
      ctx.lineCap      = "round"
      ctx.shadowBlur   = 0
      ctx.beginPath()
      let closeStarted = false
      candles.forEach((c, i) => {
        const cx = startX + i * STEP + CANDLE_W / 2
        if (cx < -STEP || cx > w + STEP) return
        const cy = mapY(c.close, minP, maxP, h)
        if (!closeStarted) { ctx.moveTo(cx, cy); closeStarted = true }
        else ctx.lineTo(cx, cy)
      })
      ctx.stroke()
      ctx.restore()

      // ── STEP 6: Dashed open line ─────────────────────────────────────────
      ctx.save()
      ctx.strokeStyle  = "#6b7280"
      ctx.lineWidth    = 1.3
      ctx.globalAlpha  = 0.28
      ctx.lineJoin     = "round"
      ctx.setLineDash([7, 6])
      ctx.shadowBlur   = 0
      ctx.beginPath()
      let openStarted = false
      candles.forEach((c, i) => {
        const cx = startX + i * STEP + CANDLE_W / 2
        if (cx < -STEP || cx > w + STEP) return
        const cy = mapY(c.open, minP, maxP, h)
        if (!openStarted) { ctx.moveTo(cx, cy); openStarted = true }
        else ctx.lineTo(cx, cy)
      })
      ctx.stroke()
      ctx.setLineDash([])
      ctx.restore()

      // ── STEP 7: Pulsing live dot ─────────────────────────────────────────
      const lastCandle = candles[candles.length - 1]
      if (lastCandle) {
        const dotX    = startX + (candles.length - 1) * STEP + CANDLE_W / 2
        const dotY    = mapY(lastCandle.close, minP, maxP, h)
        const pulse   = (Math.sin(Date.now() * 0.004) + 1) / 2

        // Outer ring
        ctx.save()
        ctx.fillStyle   = `rgba(192,139,47,${0.08 + pulse * 0.08})`
        ctx.globalAlpha = 1
        ctx.shadowBlur  = 0
        ctx.beginPath()
        ctx.arc(dotX, dotY, 6 + pulse * 5, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()

        // Inner dot
        ctx.save()
        ctx.fillStyle   = "#c08b2f"
        ctx.globalAlpha = 0.85
        ctx.shadowBlur  = 0
        ctx.beginPath()
        ctx.arc(dotX, dotY, 4, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }

      raf = requestAnimationFrame(render)
    }

    raf = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", init)
    }
  }, [])

  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{ background: "transparent" }}
      >
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ background: "transparent" }} />
      </div>
      <TickerBar />
    </>
  )
}

// ─── Ticker bar ───────────────────────────────────────────────────────────────
function TickerBar() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS]

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed bottom-0 left-0 right-0 z-[5] flex items-center overflow-hidden"
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
