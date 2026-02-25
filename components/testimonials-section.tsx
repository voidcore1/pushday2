"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

const testimonials = [
  {
    name: "Arjun M.",
    role: "Intermediate Trader",
    quote: "Bullsedge completely changed how I look at charts. The price action modules alone were worth every rupee. I went from losing money to trading with a clear system.",
    initials: "AM",
    bgColor: "bg-primary",
  },
  {
    name: "Priya S.",
    role: "Beginner",
    quote: "I had zero knowledge about stocks. Now I trade options with real confidence. The structured approach and mentorship made all the difference.",
    initials: "PS",
    bgColor: "bg-dark-green",
  },
  {
    name: "Rahul K.",
    role: "Advanced Trader",
    quote: "The psychology sessions hit different. I completely stopped revenge trading after week two. The mindset work is what I was missing all along.",
    initials: "RK",
    bgColor: "bg-dark",
  },
  {
    name: "Sneha D.",
    role: "Intermediate",
    quote: "The community and WhatsApp support group are incredibly active. The mentors respond fast and genuinely care about your progress.",
    initials: "SD",
    bgColor: "bg-primary",
  },
  {
    name: "Vikram T.",
    role: "Beginner",
    quote: "Clear, structured, zero fluff. Exactly what I needed to start my trading journey without getting overwhelmed by noise and fake gurus.",
    initials: "VT",
    bgColor: "bg-dark-green",
  },
  {
    name: "Ananya R.",
    role: "Intermediate",
    quote: "Best investment I\u2019ve made this year \u2014 and I mean that as a trader. The risk management module has saved my capital more times than I can count.",
    initials: "AR",
    bgColor: "bg-dark",
  },
]

function StarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="#F59E0B">
      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
    </svg>
  )
}

const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
}

export function TestimonialsSection() {
  const featured = testimonials[0]

  return (
    <section id="testimonials" className="py-20 md:py-28" style={{ background: "rgba(255,255,255,0.55)", backdropFilter: "blur(20px) saturate(160%)", WebkitBackdropFilter: "blur(20px) saturate(160%)", borderTop: "1px solid rgba(255,255,255,0.70)", borderBottom: "1px solid rgba(255,255,255,0.40)" }}>
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUpVariant}
          className="mb-14"
        >
          <p className="text-xs font-sans font-semibold uppercase tracking-widest text-primary mb-3">
            Testimonials
          </p>
          <h2 className="font-serif text-4xl font-bold text-foreground md:text-5xl text-balance">
            What Our Traders Say
          </h2>
        </motion.div>

        {/* Featured quote */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUpVariant}
          className="mb-14 p-8 md:p-12"
          style={{ background: "rgba(255,255,255,0.72)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.85)", borderRadius: "16px", boxShadow: "0 2px 16px rgba(0,0,0,0.05)" }}
        >
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div
              className="h-16 w-16 shrink-0 rounded-full"
              style={{ background: featured.gradient }}
            />
            <div>
              <span className="font-serif text-6xl leading-none text-primary">{"\u201C"}</span>
              <p className="font-serif text-xl italic text-foreground leading-relaxed md:text-2xl -mt-4">
                {featured.quote}
              </p>
              <div className="mt-4">
                <p className="font-sans font-bold text-foreground">{featured.name}</p>
                <p className="text-sm text-muted-foreground">{featured.role}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Card grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.slice(1).map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -4, boxShadow: "0 12px 40px rgba(0,0,0,0.08)" }}
              className="p-6"
              style={{ background: "rgba(255,255,255,0.72)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.85)", borderRadius: "16px", boxShadow: "0 2px 16px rgba(0,0,0,0.05)" }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="h-10 w-10 rounded-full shrink-0"
                  style={{ background: t.gradient }}
                />
                <div>
                  <p className="font-sans font-bold text-foreground text-sm">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
              <div className="flex gap-0.5 mb-3">
                {[...Array(5)].map((_, j) => (
                  <StarIcon key={j} />
                ))}
              </div>
              <p className="text-sm italic text-body leading-relaxed">{t.quote}</p>
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
            View All Reviews <ArrowRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
