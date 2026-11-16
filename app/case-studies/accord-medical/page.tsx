import { CaseStudyArticle, caseStudyMetadata, type CaseStudyData } from "@/components/case-study"

const study: CaseStudyData = {
  slug: "accord-medical",
  title: "Accord Medical",
  industry: "Medical equipment",
  stack: "Next.js, catalog, SEO",
  timeline: "6 weeks",
  problem:
    "A Kenya-wide medical supplier needed a catalog clinics could actually search and order from — not a brochure that hid the products.",
  approach: [
    "Mapped product lines and built a storefront clinics can browse on a phone.",
    "Structured categories, fast image loading, and a contact path for quotes.",
    "Set up on-page SEO so equipment searches surface the right pages.",
  ],
  results: [
    "A live catalog at accordmedical.co.ke used by clinics nationwide.",
    "Staff can point buyers to a product page instead of sending PDFs.",
    "Foundation for the private HR, sales, and servicing systems that followed.",
  ],
  liveUrl: "https://www.accordmedical.co.ke/",
}

export const metadata = caseStudyMetadata(study)

export default function Page() {
  return <CaseStudyArticle study={study} />
}
