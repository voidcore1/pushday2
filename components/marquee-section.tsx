"use client"

import { motion } from "framer-motion"

const topRow = [
  "MASTER THE MARKETS",
  "PRICE ACTION",
  "OPTIONS TRADING",
  "RISK MANAGEMENT",
  "TRADING PSYCHOLOGY",
  "LIVE MENTORSHIP",
  "500+ STUDENTS",
  "REAL RESULTS",
]

const bottomRow = [
  "DISCIPLINE FIRST",
  "CANDLESTICK PATTERNS",
  "MARKET STRUCTURE",
  "TECHNICAL ANALYSIS",
  "SMART MONEY",
  "TRADING PLANS",
  "COMMUNITY",
  "CONSISTENCY",
]

function MarqueeRow({ items, direction = "left", duration = 25 }: { items: string[]; direction?: "left" | "right"; duration?: number }) {
  const doubled = [...items, ...items]

  return (
    <div className="flex overflow-hidden">
      <motion.div
        className="flex shrink-0 gap-0"
        animate={{
          x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration,
            ease: "linear",
          },
        }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="shrink-0 whitespace-nowrap px-6 text-sm font-sans font-medium uppercase tracking-widest text-background/90"
          >
            <span className="text-primary mr-4">&#10022;</span>
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

export function MarqueeSection() {
  return (
    <section className="bg-dark py-4 overflow-hidden">
      <div className="flex flex-col gap-3">
        <MarqueeRow items={topRow} direction="left" duration={30} />
        <MarqueeRow items={bottomRow} direction="right" duration={35} />
      </div>
    </section>
  )
}
