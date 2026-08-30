import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"

export const metadata: Metadata = {
  title: "Privacy Policy | CodeWithSeth",
  description: "How we collect, use, and protect your data.",
  alternates: { canonical: "/privacy" },
}

export default function PrivacyPolicy() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-20">
        <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <div className="space-y-12">
            <div className="text-center space-y-3">
              <h1 className="font-heading text-4xl font-semibold tracking-tight">Privacy Policy</h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Last updated: October 15, 2025
              </p>
            </div>
            
            <div className="prose dark:prose-invert max-w-none">
              <h2>1. Introduction</h2>
              <p>
                Welcome to Seth Digital Solutions ("we," "our," or "us"). We respect your privacy and are committed to protecting your personal data.
                This privacy policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
              </p>
              <p>
                Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site or use our services.
              </p>
              
              <h2>2. Information We Collect</h2>
              <p>We may collect several types of information from and about users of our website and services, including:</p>
              <ul>
                <li>
                  <strong>Personal Data:</strong> Personal information that you provide to us, such as your name, email address, telephone number, company name, and any other information you choose to provide when you contact us, submit a form, or interact with our website.
                </li>
                <li>
                  <strong>Usage Data:</strong> Information about how you use our website, services, and marketing communications.
                </li>
                <li>
                  <strong>Technical Data:</strong> Information about your browser, device, IP address, time zone, and operating system when you visit our website.
                </li>
                <li>
                  <strong>Marketing Data:</strong> Your preferences in receiving marketing communications from us.
                </li>
              </ul>
              
              <h2>3. How We Collect Your Data</h2>
              <p>We use different methods to collect data from and about you, including through:</p>
              <ul>
                <li>Direct interactions when you fill in forms, contact us, or subscribe to our publications</li>
                <li>Automated technologies or interactions through the use of cookies and similar technologies</li>
                <li>Third parties or publicly available sources</li>
              </ul>
              
              <h2>4. How We Use Your Information</h2>
              <p>We may use the information we collect about you for various purposes, including to:</p>
              <ul>
                <li>Provide, maintain, and improve our website and services</li>
                <li>Process and fulfill your requests or transactions</li>
                <li>Send you technical notices, updates, security alerts, and support messages</li>
                <li>Respond to your comments, questions, and customer service requests</li>
                <li>Communicate with you about products, services, offers, and events</li>
                <li>Monitor and analyze trends, usage, and activities in connection with our website</li>
                <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities</li>
                <li>Personalize your website experience</li>
              </ul>
              
              <h2>5. Disclosure of Your Information</h2>
              <p>We may share your personal information with:</p>
              <ul>
                <li>Service providers who perform services on our behalf</li>
                <li>Professional advisers including lawyers, bankers, auditors, and insurers</li>
                <li>Regulatory authorities, law enforcement agencies, and other governmental entities when required by law</li>
                <li>Business partners in connection with offers, products, or services</li>
              </ul>
              <p>We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties without your consent.</p>
              
              <h2>6. Data Security</h2>
              <p>
                We have implemented appropriate security measures to prevent your personal data from being accidentally lost, used, accessed, altered, or disclosed in an unauthorized way. Additionally, we limit access to your personal data to employees, agents, contractors, and other third parties who have a business need to know.
              </p>
              
              <h2>7. Data Retention</h2>
              <p>
                We will only retain your personal data for as long as necessary to fulfill the purposes for which we collected it, including for the purposes of satisfying any legal, accounting, or reporting requirements.
              </p>
              
              <h2>8. Your Rights</h2>
              <p>Depending on your location, you may have various rights regarding your personal information, including:</p>
              <ul>
                <li>The right to access your personal data</li>
                <li>The right to request correction of your personal data</li>
                <li>The right to request deletion of your personal data</li>
                <li>The right to object to processing of your personal data</li>
                <li>The right to request restriction of processing your personal data</li>
                <li>The right to data portability</li>
              </ul>
              
              <h2>9. Cookies and Tracking Technologies</h2>
              <p>
                Our website uses cookies and similar tracking technologies to track activity on our website and store certain information. Cookies are files with a small amount of data that may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
              </p>
              
              <h2>10. Third-Party Links</h2>
              <p>
                Our website may contain links to third-party websites. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.
              </p>
              
              <h2>11. Children's Privacy</h2>
              <p>
                Our website is not intended for children under 13 years of age, and we do not knowingly collect personal information from children under 13.
              </p>
              
              <h2>12. Changes to Our Privacy Policy</h2>
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
              </p>
              
              <h2>13. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <p>
                Email: privacy@sethmakori.com<br />
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