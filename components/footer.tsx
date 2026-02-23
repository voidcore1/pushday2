"use client"

import { Instagram, Mail, MapPin, Phone, Clock } from "lucide-react"
import Image from "next/image"

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

const quickLinks = [
  { label: "About", href: "/#about" },
  { label: "Learn", href: "/#offerings" },
  { label: "Community", href: "/#testimonials" },
  { label: "Contact", href: "/#contact" },
]

const programs = [
  "Price Action",
  "Options Trading",
  "Technical Analysis",
  "Trading Psychology",
  "Risk Management",
]

export function Footer() {
  return (
    <footer className="bg-dark">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Col 1 - Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Image
                src="/images/bullsedge-logo.png"
                alt="Bulls Edge Logo"
                width={32}
                height={32}
                className="shrink-0"
              />
              <span className="font-sans text-sm font-bold tracking-widest text-background uppercase">
                Bullsedge Academy
              </span>
            </div>
            <p className="text-sm text-background/50 leading-relaxed mb-6">
              Master the Markets. Empowering the next generation of disciplined, profitable traders through education and mentorship.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com/bullsedge_academy"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-background/20 text-background/70 transition-colors hover:border-primary hover:text-primary"
                aria-label="Instagram"
              >
                <Instagram size={16} />
              </a>
              <a
                href="https://wa.me/917087568155"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-background/20 text-background/70 transition-colors hover:border-primary hover:text-primary"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon className="text-current" />
              </a>
              <a
                href="mailto:ajmera.vaibhav1217@gmail.com"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-background/20 text-background/70 transition-colors hover:border-primary hover:text-primary"
                aria-label="Email"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* Col 2 - Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-background mb-4 font-sans">Quick Links</h4>
            <ul className="flex flex-col gap-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-background/60 transition-colors hover:text-primary">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 - Programs */}
          <div>
            <h4 className="text-sm font-bold text-background mb-4 font-sans">Programs</h4>
            <ul className="flex flex-col gap-2.5">
              {programs.map((p) => (
                <li key={p}>
                  <a href="#offerings" className="text-sm text-background/60 transition-colors hover:text-primary">
                    {p}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 - Contact Info */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest mb-4 font-sans" style={{ color: "#00A855", letterSpacing: "0.15em" }}>
              Contact Info
            </h4>
            <ul className="flex flex-col gap-3 font-sans text-[0.9rem]" style={{ color: "rgba(255,255,255,0.75)" }}>
              <li className="flex items-center gap-2.5">
                <MapPin size={18} className="shrink-0" style={{ color: "#00A855" }} />
                <span>Ahmedabad, Gujarat, India</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={18} className="shrink-0" style={{ color: "#00A855" }} />
                <a href="tel:+917087568155" className="transition-colors hover:text-primary">+91 7087568155</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={18} className="shrink-0" style={{ color: "#00A855" }} />
                <a href="mailto:ajmera.vaibhav1217@gmail.com" className="transition-colors hover:text-primary">ajmera.vaibhav1217@gmail.com</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock size={18} className="shrink-0" style={{ color: "#00A855" }} />
                <span>Mon – Sat  |  10:00 AM – 7:00 PM</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-background/10">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <p className="text-center text-xs font-sans" style={{ color: "rgba(255,255,255,0.75)" }}>
            © 2025 BullsEdge Academy. All rights reserved. | Ahmedabad, Gujarat, India  ·  <a href="/terms" className="transition-colors hover:text-primary">Terms & Conditions</a>  ·  <a href="/privacy" className="transition-colors hover:text-primary">Privacy Policy</a>
          </p>
        </div>
      </div>
    </footer>
  )
}
