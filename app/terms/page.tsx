import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Terms & Conditions | BullsEdge Academy",
  description: "Terms and Conditions for BullsEdge Academy. Educational purpose only, no profit guarantee, market risk disclaimer.",
}

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white pt-24 pb-16">
        <div className="mx-auto max-w-[800px] px-6 py-8">
          <Link
            href="/"
            className="inline-block text-primary font-medium mb-8 hover:underline"
          >
            ← Back to Home
          </Link>

          <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#0A0F0C] mb-2">
            Terms & Conditions
          </h1>
          <p className="text-sm text-muted-foreground mb-10">Last Updated: June 2025</p>

          <p className="text-[#2D4A35] leading-[1.8] mb-10 font-sans">
            Welcome to BullsEdge Academy. By accessing our website or enrolling in any of our programs, you agree to be bound by the following Terms and Conditions. Please read them carefully before proceeding.
          </p>

          <section className="mb-10">
            <h2 className="font-serif text-2xl font-bold text-[#0A0F0C] mb-3 pl-3 border-l-4 border-primary">
              Educational Purpose Only
            </h2>
            <p className="text-[#2D4A35] leading-[1.8] font-sans">
              All content, courses, materials, and information provided by BullsEdge Academy are strictly for educational and informational purposes only. Nothing on this website or in our programs constitutes financial advice, investment advice, trading advice, or any other type of professional advice. BullsEdge Academy is an educational institution — not a SEBI-registered investment advisor, portfolio manager, or broker.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-serif text-2xl font-bold text-[#0A0F0C] mb-3 pl-3 border-l-4 border-primary">
              No Profit Guarantee
            </h2>
            <p className="text-[#2D4A35] leading-[1.8] font-sans">
              BullsEdge Academy makes no guarantee, representation, or warranty of any kind regarding financial returns, trading profits, or income from trading activities. Results mentioned on this website or shared by students are individual experiences and are not typical. Past performance of any trading strategy or student result does not guarantee future results. Trading involves substantial risk and may not be suitable for everyone.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-serif text-2xl font-bold text-[#0A0F0C] mb-3 pl-3 border-l-4 border-primary">
              Market Risk Disclaimer
            </h2>
            <p className="text-[#2D4A35] leading-[1.8] font-sans">
              Trading in financial instruments including stocks, futures, options, forex, and cryptocurrency involves significant risk of loss. You may lose some or all of your invested capital. Market conditions are inherently unpredictable and no educational program can eliminate the risks associated with trading. BullsEdge Academy is not responsible for any trading losses incurred by students or website visitors as a result of applying any technique or strategy learned through our programs.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-serif text-2xl font-bold text-[#0A0F0C] mb-3 pl-3 border-l-4 border-primary">
              Intellectual Property
            </h2>
            <p className="text-[#2D4A35] leading-[1.8] font-sans">
              All content on this website and within our course materials — including but not limited to text, graphics, logos, videos, course content, strategies, and frameworks — is the exclusive intellectual property of BullsEdge Academy and is protected under applicable copyright and intellectual property laws. You may not reproduce, distribute, republish, sell, or create derivative works from our content without prior written permission from BullsEdge Academy.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-serif text-2xl font-bold text-[#0A0F0C] mb-3 pl-3 border-l-4 border-primary">
              Fee and Payment Policy
            </h2>
            <p className="text-[#2D4A35] leading-[1.8] font-sans">
              Course fees are communicated at the time of enrollment and are subject to change without prior notice for future batches. Fees once paid are non-refundable unless explicitly stated otherwise at the time of enrollment. BullsEdge Academy reserves the right to modify, postpone, or cancel programs. In the event of cancellation by BullsEdge Academy, enrolled students will be offered a rescheduled batch or a full refund. All payments must be completed prior to accessing course materials.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-serif text-2xl font-bold text-[#0A0F0C] mb-3 pl-3 border-l-4 border-primary">
              Contact
            </h2>
            <p className="text-[#2D4A35] leading-[1.8] font-sans mb-4">
              For any questions regarding these Terms & Conditions, please contact us:
            </p>
            <p className="text-[#2D4A35] leading-[1.8] font-sans">
              <strong>BullsEdge Academy</strong><br />
              A-504, Dev Aurum Commercial Building, Anand Nagar Crossroad, Prahladanagar, Ahmedabad – 380015<br />
              Phone: <a href="tel:+916355268155" className="text-primary hover:underline">6355268155</a><br />
              WhatsApp: <a href="https://wa.me/916355258155" className="text-primary hover:underline">6355258155</a><br />
              Email: <a href="mailto:bullsedgeacad@gmail.com" className="text-primary hover:underline">bullsedgeacad@gmail.com</a><br />
              Working Hours: Monday – Saturday | 10:00 AM – 7:00 PM
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
