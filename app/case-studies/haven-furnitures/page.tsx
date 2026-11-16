import { CaseStudyArticle, caseStudyMetadata, type CaseStudyData } from "@/components/case-study"

const study: CaseStudyData = {
  slug: "haven-furnitures",
  title: "Haven Furnitures",
  industry: "Furniture e-commerce",
  stack: "Next.js, admin dashboard",
  timeline: "5 weeks",
  problem:
    "Haven needed an online shop where the team could add products and photos themselves, without waiting on a developer for every new piece.",
  approach: [
    "Built a furniture storefront with consistent crops and product pages.",
    "Added an admin dashboard for products, images, and inventory updates.",
    "Kept the site fast on mobile so Nairobi shoppers could browse on the go.",
  ],
  results: [
    "The team updates the catalog without a developer.",
    "Live store at havenlivingfurniture.co.ke.",
    "A clearer path from browsing to inquiry.",
  ],
  liveUrl: "https://www.havenlivingfurniture.co.ke/",
}

export const metadata = caseStudyMetadata(study)

export default function Page() {
  return <CaseStudyArticle study={study} />
}
