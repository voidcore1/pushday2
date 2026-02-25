"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { BarChart2, Shield, Brain, Target, TrendingUp, Layers, Globe, Wheat, CheckCircle2, Eye, Rocket } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: "easeOut" },
  }),
}

const coreAreas = [
  { icon: BarChart2, label: "Technical Analysis" },
  { icon: Shield, label: "Risk Management" },
  { icon: Brain, label: "Trading Psychology" },
  { icon: Target, label: "Trader's Discipline" },
]

const segments = [
  { icon: TrendingUp, label: "Equity" },
  { icon: Layers, label: "Future & Options" },
  { icon: Globe, label: "Forex & Crypto" },
  { icon: Wheat, label: "Commodities" },
]

const whyUs = [
  "Practical, market-focused curriculum — not just theory",
  "Real-time chart analysis with live market examples",
  "Structured mentorship from experienced traders",
  "Small batch sizes for personalised attention",
  "Lifetime access to course materials and updates",
  "Community of traders for peer learning and support",
]

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-24 pb-20">

        {/* Hero */}
        <section className="mx-auto max-w-5xl px-6 py-14 md:py-20">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
            <Link
              href="/"
              className="inline-block text-primary font-sans text-sm font-medium mb-8 hover:underline"
            >
              ← Back to Home
            </Link>
            <p className="text-xs font-sans font-semibold uppercase tracking-widest text-primary mb-4">
              About Us
            </p>
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-foreground text-balance leading-tight mb-6">
              About BullsEdge Academy
            </h1>
            <p className="text-body font-sans text-lg leading-relaxed max-w-3xl">
              BullsEdge Academy is a trading education institute based in Ahmedabad, focused on practical market training. We provide structured programs in equity, derivatives, forex, and cryptocurrency markets. Our objective is to help students understand markets with discipline, risk management, and real-time application.
            </p>
          </motion.div>
        </section>

        {/* Mission & Vision */}
        <section className="bg-muted py-16 md:py-20">
          <div className="mx-auto max-w-5xl px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: Rocket,
                label: "Our Mission",
                text:
                  "To make quality trading education accessible to every aspiring trader in India — equipping them with the skills, mindset, and discipline to participate in financial markets confidently and responsibly.",
              },
              {
                icon: Eye,
                label: "Our Vision",
                text:
                  "To build a generation of self-sufficient, disciplined traders who approach the markets with structure, strategy, and patience — turning trading from speculation into a professional craft.",
              },
            ].map((item, i) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.label}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                  custom={i}
                  variants={fadeUp}
                  className="rounded-xl border border-border/80 bg-background/90 backdrop-blur-md p-7 md:p-9"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-secondary">
                    <Icon size={22} className="text-primary" />
                  </div>
                  <h2 className="font-serif text-2xl font-bold text-foreground mb-3">{item.label}</h2>
                  <p className="text-body font-sans text-sm leading-relaxed">{item.text}</p>
                </motion.div>
              )
            })}
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
            custom={0}
            className="mb-12"
          >
            <p className="text-xs font-sans font-semibold uppercase tracking-widest text-primary mb-3">
              Advantages
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground text-balance">
              Why Choose BullsEdge
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {whyUs.map((point, i) => (
              <motion.div
                key={point}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                custom={i}
                variants={fadeUp}
                className="flex items-start gap-3 rounded-xl border border-border/80 bg-background/90 backdrop-blur-md p-5"
              >
                <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-primary" />
                <span className="text-sm font-sans text-body leading-relaxed">{point}</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Core Areas */}
        <section className="bg-muted py-16 md:py-20">
          <div className="mx-auto max-w-5xl px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={fadeUp}
              custom={0}
              className="mb-12"
            >
              <p className="text-xs font-sans font-semibold uppercase tracking-widest text-primary mb-3">
                Curriculum
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground text-balance">
                Core Areas We Cover
              </h2>
            </motion.div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
              {coreAreas.map((area, i) => {
                const Icon = area.icon
                return (
                  <motion.div
                    key={area.label}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-60px" }}
                    custom={i}
                    variants={fadeUp}
                    className="flex flex-col items-center gap-3 rounded-xl border border-border/80 bg-background/90 backdrop-blur-md p-6 text-center"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary">
                      <Icon size={22} className="text-primary" />
                    </div>
                    <span className="text-sm font-sans font-semibold text-foreground leading-snug">{area.label}</span>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Market Segments */}
        <section className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
            custom={0}
            className="mb-12"
          >
            <p className="text-xs font-sans font-semibold uppercase tracking-widest text-primary mb-3">
              Markets
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground text-balance">
              Segments We Make You Master At
            </h2>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
            {segments.map((seg, i) => {
              const Icon = seg.icon
              return (
                <motion.div
                  key={seg.label}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                  custom={i}
                  variants={fadeUp}
                  className="flex flex-col items-center gap-3 rounded-xl border border-border/80 bg-background/90 backdrop-blur-md p-6 text-center"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary">
                    <Icon size={22} className="text-primary" />
                  </div>
                  <span className="text-sm font-sans font-semibold text-foreground leading-snug">{seg.label}</span>
                </motion.div>
              )
            })}
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-5xl px-6 pb-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
            custom={0}
            className="rounded-2xl border border-primary/30 bg-secondary/60 p-10 md:p-14 text-center"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground text-balance mb-4">
              Ready to Start Your Trading Journey?
            </h2>
            <p className="text-body font-sans text-sm leading-relaxed mb-8 max-w-xl mx-auto">
              Join BullsEdge Academy and learn to trade the markets with structure, confidence, and a professional edge.
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-dark-green"
            >
              Inquire Now
            </Link>
          </motion.div>
        </section>

      </main>
      <Footer />
    </>
  )
}
