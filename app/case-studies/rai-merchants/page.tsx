import { CaseStudyArticle, caseStudyMetadata, type CaseStudyData } from "@/components/case-study"

const study: CaseStudyData = {
  slug: "rai-merchants",
  title: "Rai Merchants",
  industry: "Retail · phones and gadgets",
  stack: "Next.js, shop",
  timeline: "4 weeks",
  problem:
    "A Nairobi electronics shop needed a site that loaded on a phone, showed stock clearly, and made it easy to ask about a device.",
  approach: [
    "Designed a compact shop layout for phones, accessories, and gadgets.",
    "Optimised images and navigation for mobile-first shoppers.",
    "Put contact and WhatsApp next to products so questions turn into sales.",
  ],
  results: [
    "A live shop at raimerchants.co.ke that works on a phone.",
    "Customers can find a device and reach the store without a visit first.",
    "A base for listings and local search.",
  ],
  liveUrl: "https://www.raimerchants.co.ke/",
}

export const metadata = caseStudyMetadata(study)

export default function Page() {
  return <CaseStudyArticle study={study} />
}
