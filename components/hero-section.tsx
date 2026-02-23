"use client"

import { motion } from "framer-motion"
import { useCountUp } from "@/hooks/use-count-up"
import { useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

function TrustStat({ target, suffix, label }: { target: number; suffix: string; label: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const count = useCountUp(target, 2000, inView)

  return (
    <div ref={ref} className="text-center">
      <span className="text-3xl font-bold font-sans text-primary">
        {count}{suffix}
      </span>
      <p className="text-sm text-muted-foreground mt-1">{label}</p>
    </div>
  )
}

export function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden"
      style={{
        backgroundImage:
          "radial-gradient(circle, rgba(0,168,85,0.04) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    >
      <div className="mx-auto max-w-7xl px-6 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left column */}
          <motion.div
            className="flex-1 lg:max-w-[60%]"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 rounded-full border border-primary px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-primary">
                <span className="text-primary">&#9889;</span> #1 Trading Academy
              </span>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-6 flex items-start gap-4 md:gap-6">
              <Image
                src="/images/logo.jpeg"
                alt="Bulls Edge Logo"
                width={90}
                height={90}
                className="rounded-lg shrink-0 hidden md:block"
              />
              <h1 className="font-serif text-5xl leading-[1.05] font-bold text-foreground md:text-6xl lg:text-7xl text-balance">
                Experience Trading
                <br />
                Like{" "}
                <span className="italic text-primary">Never Before</span>
              </h1>
            </motion.div>

            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-xl text-lg text-body leading-relaxed"
            >
              Hands-On Training. Real-World Results. Join the academy that builds
              disciplined, profitable traders from the ground up.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="https://wa.me/917087568155"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-primary-foreground transition-colors hover:bg-dark-green"
              >
                <WhatsAppIcon className="text-primary-foreground" />
                Chat on WhatsApp
              </a>
              <a
                href="#contact"
                className="inline-flex items-center rounded-full border-2 border-primary px-7 py-3 text-base font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                Inquire Now
              </a>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="mt-10 flex items-center gap-8 md:gap-12"
            >
              <TrustStat target={500} suffix="+" label="Students Trained" />
              <TrustStat target={3} suffix="+" label="Years Experience" />
              <TrustStat target={95} suffix="%" label="Positive Feedback" />
            </motion.div>
          </motion.div>

          {/* Right column */}
          <motion.div
            className="relative flex-1 w-full max-w-md lg:max-w-none"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <div className="aspect-[3/4] w-full max-w-sm mx-auto rounded-2xl shadow-2xl overflow-hidden relative">
              <Image
                src="/images/trading-chart-hero.jpg"
                alt="Trading candlestick chart showing bullish trend"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F0C]/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center p-6">
                <div className="rounded-full bg-background/95 px-4 py-2 flex items-center gap-2 shadow-lg">
                  <span className="text-sm font-medium text-foreground">200+</span>
                  <span className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#F59E0B">
                        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                      </svg>
                    ))}
                  </span>
                  <span className="text-xs text-muted-foreground">5-Star Reviews</span>
                </div>
              </div>
            </div>

            {/* Floating card */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-4 -left-4 md:left-0 rounded-xl bg-background border border-border px-4 py-3 shadow-lg flex items-center gap-3"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00A855" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                  <polyline points="17 6 23 6 23 12" />
                </svg>
              </div>
              <div>
                <p className="text-lg font-bold text-foreground">500+</p>
                <p className="text-xs text-muted-foreground">Students</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
