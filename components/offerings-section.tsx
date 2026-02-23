"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

const offerings = [
  {
    topic: "Price Action",
    title: "Price Action",
    points: [
      "Read markets with pure chart analysis, no lagging indicators",
      "Identify high-probability trade setups using only price",
      "Master support, resistance, and key market levels",
      "Build a complete price action trading system",
    ],
  },
  {
    topic: "Technical Analysis",
    title: "Technical Analysis",
    points: [
      "Identify patterns, trends, and key levels with precision",
      "Use indicators intelligently without becoming dependent on them",
      "Learn chart patterns: head & shoulders, triangles, flags, wedges",
      "Time your entries and exits like a professional",
    ],
  },
  {
    topic: "Options Trading",
    title: "Options Trading",
    points: [
      "Understand calls, puts, and how to build powerful strategies",
      "Learn straddles, strangles, spreads, and iron condors",
      "Trade volatility instead of fearing it",
      "Risk control frameworks that protect your capital in F&O",
    ],
  },
  {
    topic: "Trading Psychology",
    title: "Trading Psychology",
    points: [
      "Master your emotions and eliminate revenge trading",
      "Develop unshakeable discipline and patience",
      "Journal and review trades like a professional athlete",
      "Build a winning mindset that compounds over time",
    ],
  },
  {
    topic: "Risk Management",
    title: "Risk Management",
    points: [
      "Professional position sizing and capital allocation",
      "Stop-loss strategies and R:R ratio frameworks",
      "Protect your capital in volatile market conditions",
      "Build consistency through disciplined risk rules",
    ],
  },
  {
    topic: "Candlestick Patterns",
    title: "Candlestick Patterns",
    points: [
      "Decode market sentiment through powerful candlestick formations",
      "Learn doji, engulfing, hammer, shooting star, and more",
      "Combine candlestick signals with key market levels",
      "Read institutional footprints in raw price data",
    ],
  },
  {
    topic: "Market Structure",
    title: "Market Structure",
    points: [
      "Understand how institutional money moves markets",
      "Identify trending vs. ranging market conditions",
      "Trade with smart money instead of against it",
      "Read higher timeframe structures for precision entries",
    ],
  },
  {
    topic: "Trading Plans",
    title: "Trading Plans & Journaling",
    points: [
      "Build a complete personal trading plan from scratch",
      "Develop journaling habits that accelerate growth",
      "Track and review trades to eliminate repeated mistakes",
      "Create a system that works with your personality and schedule",
    ],
  },
]

const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
}

export function OfferingsSection() {
  return (
    <section id="offerings" className="py-20 md:py-28 bg-muted">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUpVariant}
          >
            <p className="text-xs font-sans font-semibold uppercase tracking-widest text-primary mb-3">
              Offerings
            </p>
            <h2 className="font-serif text-4xl font-bold text-foreground md:text-5xl text-balance">
              What We Are Offering
            </h2>
          </motion.div>
          <motion.a
            href="#pricing"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUpVariant}
            className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
          >
            View All Offerings <ArrowRight size={16} />
          </motion.a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {offerings.map((offering, i) => (
            <motion.div
              key={offering.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.06, ease: "easeOut" } },
              }}
              whileHover={{ y: -4, boxShadow: "0 12px 40px rgba(0,0,0,0.08)" }}
              className="rounded-xl border border-border bg-background p-6 md:p-8 transition-colors hover:border-primary"
            >
              <span className="inline-block rounded-full bg-secondary px-3 py-1 text-xs font-medium text-primary mb-4">
                {offering.topic}
              </span>
              <h3 className="text-lg font-bold text-foreground font-sans mb-4">
                {offering.title}
              </h3>
              <ul className="flex flex-col gap-2.5 mb-5">
                {offering.points.map((point) => (
                  <li key={point} className="flex items-start gap-2 text-sm text-body leading-relaxed">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {point}
                  </li>
                ))}
              </ul>
              <a href="#contact" className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
                Learn More <ArrowRight size={14} />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
