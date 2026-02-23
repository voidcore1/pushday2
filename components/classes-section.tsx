"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { useRef } from "react"
import Image from "next/image"

const courses = [
  {
    title: "Price Action Mastery",
    description: "From zero to reading raw charts like a professional. The foundation of all trading.",
    image: "/images/price-action.jpg",
  },
  {
    title: "Options Trading Blueprint",
    description: "Complete options education \u2014 strategies, risk management, and real-world application.",
    image: "/images/options-trading.jpg",
  },
  {
    title: "Technical Analysis Complete",
    description: "Charts, patterns, indicators, and timing \u2014 everything a technical trader needs.",
    image: "/images/technical-analysis.jpg",
  },
  {
    title: "Trader's Mindset Program",
    description: "The psychology and risk management program that separates consistent traders from gamblers.",
    image: "/images/trading-psychology.jpg",
  },
]

const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
}

export function ClassesSection() {
  const scrollRef = useRef<HTMLDivElement>(null)

  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUpVariant}
          className="mb-14"
        >
          <p className="text-xs font-sans font-semibold uppercase tracking-widest text-primary mb-3">
            Classes
          </p>
          <h2 className="font-serif text-4xl font-bold text-foreground md:text-5xl text-balance">
            Our Trading Programs
          </h2>
        </motion.div>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {courses.map((course, i) => (
            <motion.div
              key={course.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4, boxShadow: "0 12px 40px rgba(0,0,0,0.08)" }}
              className="min-w-[280px] max-w-[320px] shrink-0 snap-start rounded-xl border border-border bg-background overflow-hidden"
            >
              <div className="relative">
                <div className="aspect-[3/4] w-full rounded-t-xl overflow-hidden relative">
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="absolute top-4 left-4 rounded-full bg-background px-3 py-1 text-xs font-medium text-foreground shadow-sm">
                  Class
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-base font-bold text-foreground font-sans mb-2">
                  {course.title}
                </h3>
                <p className="text-sm text-body leading-relaxed mb-3">
                  {course.description}
                </p>
                <a href="#contact" className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
                  Learn More <ArrowRight size={14} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUpVariant}
          className="mt-10 text-center"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border-2 border-primary px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            View All Programs <ArrowRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
