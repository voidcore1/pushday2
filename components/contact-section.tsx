"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, CheckCircle, Phone, Instagram, Mail } from "lucide-react"

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
}

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section
      id="contact"
      className="py-20 md:py-28"
      style={{
        background: "radial-gradient(circle at 50% 0%, rgba(0,168,85,0.06), transparent 60%)",
      }}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Left info */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUpVariant}
            className="flex-1"
          >
            <p className="text-xs font-sans font-semibold uppercase tracking-widest text-primary mb-3">
              Get in Touch
            </p>
            <h2 className="font-serif text-4xl font-bold text-foreground md:text-5xl text-balance mb-4">
              Start Your Journey Today
            </h2>
            <p className="text-body leading-relaxed mb-8 max-w-md">
              Have questions about our programs? We respond within 24 hours. Reach out via form, WhatsApp, or Instagram.
            </p>

            <div className="flex flex-col gap-4 mb-8">
              <a
                href="https://wa.me/917087568155"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-xl border border-border bg-background p-4 transition-colors hover:border-primary"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366]">
                  <WhatsAppIcon className="text-background" />
                </div>
                <div>
                  <p className="font-sans font-semibold text-foreground text-sm">WhatsApp Us</p>
                  <p className="text-xs text-muted-foreground">Chat directly with our team</p>
                </div>
              </a>

              <div className="flex items-center gap-4 rounded-xl border border-border bg-background p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
                  <Instagram size={18} className="text-primary" />
                </div>
                <div>
                  <p className="font-sans font-semibold text-foreground text-sm">Instagram</p>
                  <p className="text-xs text-muted-foreground">@bullsedge_academy</p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-xl border border-border bg-background p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
                  <Mail size={18} className="text-primary" />
                </div>
                <div>
                  <p className="font-sans font-semibold text-foreground text-sm">Email</p>
                  <p className="text-xs text-muted-foreground">ajmera.vaibhav1217@gmail.com</p>
                </div>
              </div>
            </div>

            <p className="text-sm text-muted-foreground">
              Join 500+ students who chose Bullsedge Academy
            </p>
          </motion.div>

          {/* Right form */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUpVariant}
            className="flex-1"
          >
            <div className="rounded-2xl border border-border bg-background p-6 md:p-8 shadow-sm">
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col gap-5"
                  >
                    <div>
                      <label className="block text-xs font-sans font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-sans font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="you@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-sans font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-sans font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                        Message / Inquiry
                      </label>
                      <textarea
                        rows={4}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                        placeholder="Tell us about your trading experience and goals..."
                      />
                    </div>
                    <button
                      type="submit"
                      className="flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-dark-green"
                    >
                      Send Inquiry <Send size={16} />
                    </button>
                    <a
                      href="https://wa.me/917087568155"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-center text-sm font-semibold text-primary hover:underline"
                    >
                      Or chat directly on WhatsApp &rarr;
                    </a>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="flex flex-col items-center justify-center py-16 text-center"
                  >
                    <CheckCircle size={56} className="text-primary mb-4" />
                    <h3 className="font-serif text-2xl font-bold text-foreground mb-2">
                      Message Received!
                    </h3>
                    <p className="text-body">
                      {"We\u2019ll be in touch within 24 hours."}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
