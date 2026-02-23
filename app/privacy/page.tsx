import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Privacy Policy | BullsEdge Academy",
  description: "Privacy Policy for BullsEdge Academy. How we collect, use, store, and protect your personal information.",
}

export default function PrivacyPage() {
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
            Privacy Policy
          </h1>
          <p className="text-sm text-muted-foreground mb-10">Last Updated: June 2025</p>

          <p className="text-[#2D4A35] leading-[1.8] mb-10 font-sans">
            At BullsEdge Academy, your privacy is important to us. This Privacy Policy explains how we collect, use, store, and protect your personal information when you visit our website or interact with our services.
          </p>

          <section className="mb-10">
            <h2 className="font-serif text-2xl font-bold text-[#0A0F0C] mb-3 pl-3 border-l-4 border-primary">
              Information We Collect
            </h2>
            <p className="text-[#2D4A35] leading-[1.8] font-sans">
              We collect the following personal information when you submit an inquiry or contact form on our website:
            </p>
            <ul className="list-disc list-inside text-[#2D4A35] leading-[1.8] font-sans mt-3 space-y-1">
              <li>Full Name</li>
              <li>Phone Number</li>
              <li>Email Address</li>
              <li>Any message or inquiry content you choose to provide</li>
            </ul>
            <p className="text-[#2D4A35] leading-[1.8] font-sans mt-3">
              We do not collect payment information directly through our website. We do not use cookies for tracking or advertising purposes beyond standard website functionality.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-serif text-2xl font-bold text-[#0A0F0C] mb-3 pl-3 border-l-4 border-primary">
              How We Use Your Information
            </h2>
            <p className="text-[#2D4A35] leading-[1.8] font-sans mb-3">
              The personal information you provide is used solely for the following purposes:
            </p>
            <ul className="list-disc list-inside text-[#2D4A35] leading-[1.8] font-sans space-y-1">
              <li>To respond to your inquiry or course-related questions</li>
              <li>To provide updates about upcoming batches, programs, and academy news</li>
              <li>To contact you regarding your enrollment and learning progress</li>
              <li>For internal record-keeping and communication</li>
            </ul>
            <p className="text-[#2D4A35] leading-[1.8] font-sans mt-3">
              We will never use your information for unsolicited marketing from third parties.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-serif text-2xl font-bold text-[#0A0F0C] mb-3 pl-3 border-l-4 border-primary">
              Data Sharing and Selling
            </h2>
            <p className="text-[#2D4A35] leading-[1.8] font-sans">
              BullsEdge Academy does not sell, rent, trade, or share your personal data with any third party for commercial purposes. Your information will not be disclosed to external organizations, advertisers, or data brokers. Information may only be shared if required by law or legal process.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-serif text-2xl font-bold text-[#0A0F0C] mb-3 pl-3 border-l-4 border-primary">
              Data Security
            </h2>
            <p className="text-[#2D4A35] leading-[1.8] font-sans">
              We take the security of your personal information seriously. Your data is stored securely and access is restricted to authorized personnel only. While we implement industry-standard security measures, please note that no method of electronic transmission or storage is 100% secure. We encourage you to contact us immediately if you suspect any unauthorized use of your information.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-serif text-2xl font-bold text-[#0A0F0C] mb-3 pl-3 border-l-4 border-primary">
              Data Deletion Requests
            </h2>
            <p className="text-[#2D4A35] leading-[1.8] font-sans">
              You have the right to request deletion of your personal data from our records at any time. To submit a data deletion request, please contact us at the details below. We will process your request within 7 business days and confirm once your data has been removed from our systems.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-serif text-2xl font-bold text-[#0A0F0C] mb-3 pl-3 border-l-4 border-primary">
              Contact Us
            </h2>
            <p className="text-[#2D4A35] leading-[1.8] font-sans mb-4">
              If you have any questions, concerns, or requests regarding this Privacy Policy or your personal data, please contact us:
            </p>
            <p className="text-[#2D4A35] leading-[1.8] font-sans">
              <strong>BullsEdge Academy</strong><br />
              Ahmedabad, Gujarat, India<br />
              Phone: <a href="tel:+917087568155" className="text-primary hover:underline">+91 7087568155</a><br />
              Email: <a href="mailto:ajmera.vaibhav1217@gmail.com" className="text-primary hover:underline">ajmera.vaibhav1217@gmail.com</a><br />
              Working Hours: Monday – Saturday | 10:00 AM – 7:00 PM
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
