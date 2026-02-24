import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { MarqueeSection } from "@/components/marquee-section"
import { WhyUsSection } from "@/components/why-us-section"
import { OfferingsSection } from "@/components/offerings-section"
import { BoldStatementSection } from "@/components/bold-statement-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { FloatingElements } from "@/components/floating-elements"

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <MarqueeSection />
        <WhyUsSection />
        <OfferingsSection />
        <BoldStatementSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
      <FloatingElements />
    </>
  )
}
