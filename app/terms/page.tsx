import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"

export const metadata: Metadata = {
  title: "Terms of Service | CodeWithSeth",
  description: "Terms governing the use of our website and services.",
  alternates: { canonical: "/terms" },
}

export default function TermsOfService() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-20">
        <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <div className="space-y-12">
            <div className="text-center space-y-3">
              <h1 className="font-heading text-4xl font-semibold tracking-tight">Terms of Service</h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Last updated: October 15, 2025
              </p>
            </div>
            
            <div className="prose dark:prose-invert max-w-none">
              <h2>1. Acceptance of Terms</h2>
              <p>
                Welcome to Seth Digital Solutions. These Terms of Service ("Terms") govern your use of our website and services. By accessing or using our website or services, you agree to be bound by these Terms. If you do not agree to all the terms and conditions of this agreement, you may not access the website or use any services.
              </p>
              
              <h2>2. Description of Services</h2>
              <p>
                Seth Digital Solutions provides digital marketing services, including but not limited to web design and development, search engine optimization (SEO), pay-per-click (PPC) advertising, social media marketing, content creation, and graphic design. The specific services to be provided will be outlined in separate agreements or statements of work between Seth Digital Solutions and the client.
              </p>
              
              <h2>3. Use of Our Website</h2>
              <p>You agree to use our website only for lawful purposes and in a way that does not infringe the rights of, restrict, or inhibit anyone else's use and enjoyment of the website. Prohibited behavior includes harassing or causing distress or inconvenience to any other user, transmitting obscene or offensive content, or disrupting the normal flow of dialogue within our website.</p>
              
              <h2>4. Intellectual Property Rights</h2>
              <p>
                The content on our website, including but not limited to text, graphics, logos, images, audio clips, digital downloads, data compilations, and software, is the property of Seth Digital Solutions or its content suppliers and is protected by international copyright laws.
              </p>
              <p>
                The compilation of all content on this site is the exclusive property of Seth Digital Solutions and is protected by international copyright laws. All trademarks, service marks, and trade names used on the site are trademarks or registered trademarks of Seth Digital Solutions or its affiliates.
              </p>
              
              <h2>5. User Accounts</h2>
              <p>
                Some services may require you to create an account. You are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer. You agree to accept responsibility for all activities that occur under your account or password.
              </p>
              
              <h2>6. Client Responsibilities</h2>
              <p>If you engage our services, you agree to:</p>
              <ul>
                <li>Provide accurate and complete information necessary for the performance of services</li>
                <li>Respond to requests for information or approvals in a timely manner</li>
                <li>Designate a primary contact person with authority to make decisions regarding the services</li>
                <li>Pay all fees and charges in accordance with the agreed-upon payment terms</li>
              </ul>
              
              <h2>7. Payment Terms</h2>
              <p>
                Payment terms will be specified in the service agreement or statement of work between Seth Digital Solutions and the client. Generally, we require a deposit before commencing work, with the balance due according to the payment schedule outlined in the agreement.
              </p>
              <p>
                All fees are exclusive of taxes, which will be added to invoices where applicable. Late payments may result in suspension of services and/or late fees.
              </p>
              
              <h2>8. Project Timelines and Deliverables</h2>
              <p>
                We will work diligently to meet all project deadlines. However, we cannot be responsible for delays caused by client actions or inactions, such as failing to provide required information or approvals in a timely manner. Timelines may be adjusted due to changes in project scope, which may also affect pricing.
              </p>
              
              <h2>9. Changes to Services</h2>
              <p>
                We reserve the right to modify or discontinue any service with or without notice to you. We shall not be liable to you or any third party should we exercise this right. Any changes to ongoing services will be communicated to active clients.
              </p>
              
              <h2>10. Limitation of Liability</h2>
              <p>
                Seth Digital Solutions will not be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
              </p>
              <ul>
                <li>Your use or inability to use our services</li>
                <li>Any unauthorized access to or use of our servers and/or any personal information stored therein</li>
                <li>Any interruption or cessation of transmission to or from our services</li>
                <li>Any bugs, viruses, or the like that may be transmitted to or through our service by any third party</li>
              </ul>
              
              <h2>11. Indemnification</h2>
              <p>
                You agree to defend, indemnify, and hold harmless Seth Digital Solutions, its officers, directors, employees, and agents, from and against any claims, liabilities, damages, losses, and expenses, including without limitation reasonable attorney's fees and costs, arising out of or in any way connected with your access to or use of the services.
              </p>
              
              <h2>12. Termination</h2>
              <p>
                Either party may terminate services in accordance with the terms specified in the service agreement. Upon termination, your right to use the services will immediately cease. All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
              </p>
              
              <h2>13. Governing Law</h2>
              <p>
                These Terms shall be governed and construed in accordance with the laws of Kenya, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
              </p>
              
              <h2>14. Changes to Terms</h2>
              <p>
                We reserve the right to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
              </p>
              
              <h2>15. Contact Us</h2>
              <p>
                If you have any questions about these Terms, please contact us at:
              </p>
              <p>
                Email: legal@sethmakori.com<br />
                Phone: +254 114 627 400<br />
                Address: Nairobi, Kenya
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
    </>
  )
}