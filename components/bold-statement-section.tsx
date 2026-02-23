"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { useCountUp } from "@/hooks/use-count-up"
import { Target, BookOpen, User } from "lucide-react"

const marqueeItems = "BEST TRADING ACADEMY \u2022 REAL EDUCATION \u2022 REAL RESULTS \u2022 DISCIPLINE FIRST \u2022 MASTER THE MARKETS \u2022 "

function CounterStat({ target, suffix, label }: { target: number; suffix: string; label: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })
  const count = useCountUp(target, 2000, inView)

  return (
    <div ref={ref} className="text-center">
      <p className="font-serif text-5xl font-bold text-background md:text-6xl">
        {count}{suffix}
      </p>
      <p className="mt-2 text-sm text-background/50 font-sans">{label}</p>
    </div>
  )
}

const features = [
  {
    icon: Target,
    title: "India's Most Trusted Trading Academy",
    description: "We have built a reputation as a trusted partner in your trading journey.",
  },
  {
    icon: BookOpen,
    title: "Unique, Practical Skills",
    description: "Learn price action, risk management, and real-world trading psychology \u2014 skills that actually make money.",
  },
  {
    icon: User,
    title: "Personalized Mentorship",
    description: "Get one-on-one guidance, progress tracking, and constant support throughout your journey.",
  },
]

export function BoldStatementSection() {
  return (
    <section className="bg-dark py-20 md:py-28 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        {/* Bold text */}
        <div className="text-center mb-16">
          {["We Don\u2019t", "Chase", "Profits.", "We Build"].map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="font-serif text-5xl font-bold text-background md:text-7xl lg:text-[96px] leading-[1.05]"
            >
              {line}
            </motion.p>
          ))}
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.48 }}
            className="font-serif text-5xl font-bold italic text-primary md:text-7xl lg:text-[96px] leading-[1.05]"
          >
            Traders.
          </motion.p>
        </div>

        {/* Marquee */}
        <div className="mb-16 overflow-hidden">
          <motion.div
            className="flex whitespace-nowrap"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ x: { repeat: Infinity, repeatType: "loop", duration: 20, ease: "linear" } }}
          >
            {[...Array(4)].map((_, i) => (
              <span key={i} className="text-xs font-sans font-medium uppercase tracking-[0.3em] text-background/30">
                {marqueeItems}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Counters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
        >
          <CounterStat target={4} suffix="+" label="Years of Experience" />
          <CounterStat target={50} suffix="+" label="Live Workshops" />
          <CounterStat target={500} suffix="+" label="Happy Students" />
          <CounterStat target={200} suffix="+" label="Five-Star Reviews" />
        </motion.div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="rounded-xl border border-background/10 bg-background/5 p-6 md:p-8"
            >
              <feature.icon size={28} className="text-primary mb-4" />
              <h3 className="text-lg font-bold text-background font-sans mb-2">{feature.title}</h3>
              <p className="text-sm text-background/60 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
