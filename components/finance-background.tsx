'use client'

import React, { useEffect, useMemo, useRef, useState } from "react"
import { useTheme } from "next-themes"

type Candle = {
  x: number
  y: number
  width: number
  height: number
  color: 'green' | 'red'
  alpha: number
  floatSpeed: number
  pulseOffset: number
}

type TickerLine = {
  amplitude: number
  frequency: number
  speed: number
  thickness: number
  offset: number
}

const FINANCE_GREEN = '#66a50c'
const BEAR_RED = '#ef4444'

export function FinanceBackground() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || resolvedTheme !== "light") {
    return null
  }

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-transparent"
    >
      <FinanceCanvas />
      <FloatingSymbols />
    </div>
  )
}

function FinanceCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1

    const resize = () => {
      const { innerWidth, innerHeight } = window
      canvas.width = innerWidth * dpr
      canvas.height = innerHeight * dpr
      canvas.style.width = `${innerWidth}px`
      canvas.style.height = `${innerHeight}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resize()
    window.addEventListener("resize", resize)

    const isMobile = window.innerWidth < 768
    const candleCount = isMobile ? 18 : 34
    const tickerCount = 3

    const candles: Candle[] = Array.from({ length: candleCount }).map((_, index) => {
      const baseWidth = isMobile ? 6 : 8
      const height = (Math.random() * 90 + 40) * (isMobile ? 0.75 : 1)
      return {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        width: baseWidth,
        height,
        color: Math.random() > 0.45 ? 'green' : 'red',
        alpha: 0.06 + Math.random() * 0.04,
        floatSpeed: 0.12 + Math.random() * 0.18 + index * 0.002,
        pulseOffset: Math.random() * Math.PI * 2,
      }
    })

    const tickerLines: TickerLine[] = Array.from({ length: tickerCount }).map(
      (_, i) => ({
        amplitude: (isMobile ? 14 : 22) + i * 4,
        frequency: 0.004 + i * 0.0008,
        speed: 0.15 + i * 0.05,
        thickness: 1.1,
        offset: Math.random() * 1000,
      }),
    )

    let animationFrameId: number
    let lastTime = performance.now()

    const render = (time: number) => {
      const dt = (time - lastTime) / 16.67
      lastTime = time

      const { innerWidth, innerHeight } = window

      ctx.clearRect(0, 0, innerWidth, innerHeight)

      drawGrid(ctx, innerWidth, innerHeight)
      drawTickers(ctx, innerWidth, innerHeight, tickerLines, time)
      drawCandles(ctx, innerWidth, innerHeight, candles, dt, time)

      animationFrameId = window.requestAnimationFrame(render)
    }

    animationFrameId = window.requestAnimationFrame(render)

    return () => {
      window.cancelAnimationFrame(animationFrameId)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="h-full w-full" />
}

function drawGrid(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
) {
  const spacing = 40
  ctx.save()
  ctx.strokeStyle = "rgba(102,165,12,0.04)"
  ctx.lineWidth = 1

  for (let x = 0; x < width; x += spacing) {
    ctx.beginPath()
    ctx.moveTo(x + 0.5, 0)
    ctx.lineTo(x + 0.5, height)
    ctx.stroke()
  }

  for (let y = 0; y < height; y += spacing) {
    ctx.beginPath()
    ctx.moveTo(0, y + 0.5)
    ctx.lineTo(width, y + 0.5)
    ctx.stroke()
  }

  ctx.restore()
}

function drawCandles(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  candles: Candle[],
  dt: number,
  time: number,
) {
  const t = time / 1000

  candles.forEach((candle) => {
    candle.y -= candle.floatSpeed * dt * 10
    if (candle.y + candle.height < 0) {
      candle.y = height + Math.random() * 80
      candle.x = Math.random() * width
    }

    const pulse =
      0.75 + 0.25 * Math.sin(t * 1.2 + candle.pulseOffset)
    const alpha = candle.alpha * pulse

    const color = candle.color === "green" ? FINANCE_GREEN : BEAR_RED

    ctx.save()
    ctx.globalAlpha = alpha

    ctx.beginPath()
    ctx.strokeStyle = color
    ctx.lineWidth = 1
    const centerX = candle.x + candle.width / 2
    ctx.moveTo(centerX, candle.y - candle.height * 0.15)
    ctx.lineTo(centerX, candle.y + candle.height * 0.85)
    ctx.stroke()

    ctx.fillStyle = color
    ctx.fillRect(
      candle.x,
      candle.y,
      candle.width,
      candle.height,
    )

    ctx.restore()
  })
}

function drawTickers(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  tickerLines: TickerLine[],
  time: number,
) {
  const t = time / 1000

  tickerLines.forEach((line, index) => {
    ctx.save()
    ctx.strokeStyle = `rgba(102,165,12,0.08)`
    ctx.lineWidth = line.thickness

    const verticalPosition =
      height * (0.25 + 0.2 * index) +
      Math.sin(t * 0.3 + index) * 20

    ctx.beginPath()

    const step = 16
    for (let x = -40; x <= width + 40; x += step) {
      const phase = (x + t * 60 * line.speed + line.offset) * line.frequency
      const y =
        verticalPosition +
        Math.sin(phase) * line.amplitude +
        Math.cos(phase * 0.7) * (line.amplitude * 0.4)

      if (x === -40) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    }

    ctx.stroke()
    ctx.restore()
  })
}

const FLOATING_SYMBOLS = ["📈", "$", "%", "+", "−", "▲", "▼", "●"] as const

type FloatingSymbolConfig = {
  id: number
  symbol: string
  left: number
  duration: number
  delay: number
  fontSize: number
  opacity: number
}

function FloatingSymbols() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768)
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  const symbols = useMemo<FloatingSymbolConfig[]>(() => {
    const count = isMobile ? 10 : 18
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      symbol:
        FLOATING_SYMBOLS[
          Math.floor(Math.random() * FLOATING_SYMBOLS.length)
        ],
      left: Math.random() * 100,
      duration: 22 + Math.random() * 16,
      delay: Math.random() * 14,
      fontSize: isMobile
        ? 10 + Math.random() * 4
        : 11 + Math.random() * 5,
      opacity: 0.05 + Math.random() * 0.03,
    }))
  }, [isMobile])

  return (
    <div className="absolute inset-0">
      {symbols.map((item) => (
        <span
          key={item.id}
          className="finance-floating-symbol select-none"
          style={
            {
              left: `${item.left}%`,
              animationDuration: `${item.duration}s`,
              animationDelay: `${item.delay}s`,
              fontSize: `${item.fontSize}px`,
              opacity: item.opacity,
            } as React.CSSProperties
          }
        >
          {item.symbol}
        </span>
      ))}
    </div>
  )
}

