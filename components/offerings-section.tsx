"use client"

import { motion } from "framer-motion"
import { BarChart2, Shield, Brain, Target, TrendingUp, Layers, Globe, Wheat } from "lucide-react"

const coreAreas = [
  {
    icon: BarChart2,
    title: "Technical Analysis",
    description:
      "Master chart reading, patterns, trend identification, and indicator usage to time entries and exits with precision.",
  },
  {
    icon: Shield,
    title: "Risk Management",
    description:
      "Professional position sizing, capital allocation, stop-loss frameworks, and R:R ratios that keep you in the game long-term.",
  },
  {
    icon: Brain,
    title: "Trading Psychology",
    description:
      "Eliminate emotional trading, build discipline, master patience, and develop the mindset of a consistent professional trader.",
  },
  {
    icon: Target,
    title: "Trader's Discipline",
    description:
      "Build structured routines, journaling habits, and a personal trading plan that removes impulsive decisions from your process.",
  },
]

const segments = [
  {
    icon: TrendingUp,
    title: "Equity",
    description:
      "NSE & BSE listed stocks — learn to analyse, select, and trade equities with confidence across all market conditions.",
  },
  {
    icon: Layers,
    title: "Future and Options Derivative Market",
    description:
      "Futures contracts, options strategies (straddles, spreads, iron condors) — trade derivatives with a structured edge.",
  },
  {
    icon: Globe,
    title: "Forex and Cryptocurrency",
    description:
      "Currency pairs and digital assets — understand global macro drivers and apply technical analysis across 24/7 markets.",
  },
  {
    icon: Wheat,
    title: "Commodities",
    description:
      "Gold, silver, crude oil, and agri-commodities — diversify your trading across multiple asset classes with proven frameworks.",
  },
]

const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
}

function CardGrid({
  items,
}: {
  items: { icon: React.ElementType; title: string; description: string }[]
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {items.map((item, i) => {
        const Icon = item.icon
        return (
          <motion.div
            key={item.title}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, delay: i * 0.07, ease: "easeOut" },
              },
            }}
            whileHover={{ y: -4, boxShadow: "0 12px 40px rgba(0,0,0,0.08)" }}
            className="rounded-xl border border-border/80 bg-background/90 backdrop-blur-md p-6 md:p-8 transition-colors hover:border-primary"
          >
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-secondary">
              <Icon size={22} className="text-primary" />
            </div>
            <h3 className="text-base font-bold text-foreground font-sans mb-2">{item.title}</h3>
            <p className="text-sm text-body leading-relaxed">{item.description}</p>
          </motion.div>
        )
      })}
    </div>
  )
}

export function OfferingsSection() {
  return (
    <section id="offerings" className="py-20 md:py-28" style={{ background: "rgba(255,255,255,0.78)", backdropFilter: "blur(12px)" }}>
      <div className="mx-auto max-w-7xl px-6 flex flex-col gap-20">

        {/* Core Areas */}
        <div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUpVariant}
            className="mb-12"
          >
            <p className="text-xs font-sans font-semibold uppercase tracking-widest text-primary mb-3">
              Curriculum
            </p>
            <h2 className="font-serif text-4xl font-bold text-foreground md:text-5xl text-balance">
              Core Areas We Cover
            </h2>
          </motion.div>
          <CardGrid items={coreAreas} />
        </div>

        {/* Market Segments */}
        <div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUpVariant}
            className="mb-12"
          >
            <p className="text-xs font-sans font-semibold uppercase tracking-widest text-primary mb-3">
              Markets
            </p>
            <h2 className="font-serif text-4xl font-bold text-foreground md:text-5xl text-balance">
              Segments We Make You Master At
            </h2>
          </motion.div>
          <CardGrid items={segments} />
        </div>

      </div>
    </section>
  )
}
