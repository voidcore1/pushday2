"use client"

import { motion } from "framer-motion"
import { useRef } from "react"
import { useInView } from "framer-motion"
import { useCountUp } from "@/hooks/use-count-up"
import Image from "next/image"

const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

function AnimatedStat({ target, suffix, size = "text-7xl" }: { target: number; suffix: string; size?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })
  const count = useCountUp(target, 2000, inView)
  return (
    <span ref={ref} className={`${size} font-serif font-bold text-primary md:text-8xl lg:text-[96px]`}>
      {count}{suffix}
    </span>
  )
}

const pillsLeft = ["Quality", "Discipline", "Mentorship", "Consistency", "Real Results", "Live Learning"]
const pillsRight = ["Risk Management", "Price Action", "Psychology", "Community", "Support", "Growth"]

export function WhyUsSection() {
  return (
    <section id="about" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUpVariant}
          className="mb-16"
        >
          <p className="text-xs font-sans font-semibold uppercase tracking-widest text-primary mb-3">
            Why Bullsedge
          </p>
          <h2 className="font-serif text-4xl font-bold text-foreground md:text-5xl text-balance">
            Why Thousands Choose Us
          </h2>
        </motion.div>

        {/* Card 1 - full width two columns */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUpVariant}
          className="mb-8 flex flex-col lg:flex-row gap-8 rounded-2xl border border-border/80 bg-background/90 backdrop-blur-md p-6 md:p-10"
        >
          <div className="aspect-[3/4] w-full lg:w-80 shrink-0 rounded-xl overflow-hidden relative">
            <Image
              src="/images/trading-growth.jpg"
              alt="Trading chart showing growth performance"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <AnimatedStat target={150} suffix="%" />
            <p className="mt-3 text-xs font-sans font-semibold uppercase tracking-widest text-muted-foreground">
              Growth in Trading Performance
            </p>
            <p className="mt-4 text-body leading-relaxed max-w-lg">
              Our students consistently report up to 150% improvement in trading performance within months of completing our programs. With structured strategies and risk management, we help traders move from random decisions to disciplined execution.
            </p>
            <a href="#contact" className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
              Book a Free Call <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </motion.div>

        {/* Card 2 - reversed */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUpVariant}
          className="mb-8 flex flex-col lg:flex-row-reverse gap-8 rounded-2xl border border-border/80 bg-background/90 backdrop-blur-md p-6 md:p-10"
        >
          <div className="aspect-[3/4] w-full lg:w-80 shrink-0 rounded-xl overflow-hidden relative">
            <Image
              src="/images/trading-students.jpg"
              alt="Trading academy classroom with monitors"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <AnimatedStat target={500} suffix="+" />
            <p className="mt-3 text-xs font-sans font-semibold uppercase tracking-widest text-muted-foreground">
              Students Trained Successfully
            </p>
            <p className="mt-4 text-body leading-relaxed max-w-lg">
              Bullsedge Academy has trained hundreds of students across India, from complete beginners to experienced traders looking to level up their consistency and discipline.
            </p>
          </div>
        </motion.div>

        {/* Card 3 - centered with pills */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUpVariant}
          className="mb-8 rounded-2xl border border-border/80 bg-background/90 backdrop-blur-md p-6 md:p-10"
        >
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="flex flex-wrap justify-center gap-2 lg:w-1/4">
              {pillsLeft.map((pill, i) => (
                <motion.span
                  key={pill}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className="rounded-full border border-primary/30 bg-secondary px-3 py-1.5 text-xs font-medium text-primary"
                >
                  {pill}
                </motion.span>
              ))}
            </div>
            <div className="text-center lg:w-2/4">
              <AnimatedStat target={95} suffix="%" />
              <p className="mt-3 text-xs font-sans font-semibold uppercase tracking-widest text-muted-foreground">
                Student Satisfaction Rate
              </p>
              <p className="mt-4 text-body leading-relaxed">
                Our students rate their experience at 95% satisfaction, reflecting the quality of mentorship, curriculum, and community support we provide.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-2 lg:w-1/4">
              {pillsRight.map((pill, i) => (
                <motion.span
                  key={pill}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className="rounded-full border border-primary/30 bg-secondary px-3 py-1.5 text-xs font-medium text-primary"
                >
                  {pill}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Card 4 - full width */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUpVariant}
          className="rounded-2xl border border-border/80 bg-background/90 backdrop-blur-md p-6 md:p-10 text-center"
        >
          <AnimatedStat target={80} suffix="%" />
          <p className="mt-3 text-xs font-sans font-semibold uppercase tracking-widest text-muted-foreground">
            Higher Success Rate vs Self-Taught Traders
          </p>
          <p className="mt-4 text-body leading-relaxed max-w-xl mx-auto">
            Structured education combined with expert mentorship gives our students an 80% higher chance of becoming consistently profitable compared to self-taught traders.
          </p>
          <a
            href="#contact"
            className="mt-6 inline-flex items-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-dark-green"
          >
            Book a short call
          </a>
        </motion.div>
      </div>
    </section>
  )
}
