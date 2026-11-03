export type PosterItem = {
  id: string
  title: string
  group: string
  description: string
  src: string
  source: "default" | "upload"
}

export type SiteItem = {
  id: string
  title: string
  description: string
  tags: string[]
  link: string
  image: string
  source: "default" | "upload"
}

const toTitle = (name: string) =>
  name
    .replace(/_/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase())

const squarePosterFiles = [
  "Chemiluminescence",
  "Choirtraining",
  "ChurchService",
  "Marketing",
  "Sermon",
  "Speakerposter",
  "baby warmer baby incubator offer",
  "blood sugarmachinemarketing",
  "choirtrainingposter",
  "easterposter",
  "electrolyte analyzer",
  "fetal dopler",
  "hospital furniture",
  "infusion pump",
  "kidney day",
  "labequipment",
  "locations",
  "marketingemergencyresponsepackage",
  "marketingsteamsterilizer",
  "newmonthposter",
  "ultrasound machine",
  "ultrasound_marketing",
  "vespersposter",
]

const featuredPosters: PosterItem[] = [
  {
    id: "poster-1",
    src: "/pro_samples/heroesforher_campaign.webp",
    title: "Heroes For Her Campaign",
    group: "Social Campaign",
    description: "Empowerment campaign for women's rights and equality",
    source: "default",
  },
  {
    id: "poster-2",
    src: "/pro_samples/wedding_card.webp",
    title: "Wedding Invitation Card",
    group: "Event Design",
    description: "Elegant wedding invitation with modern typography",
    source: "default",
  },
  {
    id: "poster-3",
    src: "/pro_samples/wedding_poster.webp",
    title: "Wedding Poster",
    group: "Event Design",
    description: "Wedding announcement poster",
    source: "default",
  },
  {
    id: "poster-4",
    src: "/pro_samples/agosti.webp",
    title: "Agosti Design",
    group: "Brand Identity",
    description: "Brand identity and visual design",
    source: "default",
  },
  {
    id: "poster-5",
    src: "/pro_samples/thankyou.webp",
    title: "Thank You Card",
    group: "Greeting Card",
    description: "Appreciation card",
    source: "default",
  },
  {
    id: "poster-6",
    src: "/pro_samples/mm.webp",
    title: "MM Design",
    group: "Graphics",
    description: "Graphic design showcase",
    source: "default",
  },
  {
    id: "poster-7",
    src: "/pro_samples/36.webp",
    title: "Design Sample 36",
    group: "Creative Work",
    description: "Professional design work",
    source: "default",
  },
  {
    id: "poster-8",
    src: "/pro_samples/38.webp",
    title: "Design Sample 38",
    group: "Creative Work",
    description: "Design solution",
    source: "default",
  },
  {
    id: "poster-9",
    src: "/pro_samples/39.webp",
    title: "Design Sample 39",
    group: "Creative Work",
    description: "Modern design",
    source: "default",
  },
]

export const DEFAULT_POSTERS: PosterItem[] = [
  ...featuredPosters,
  ...squarePosterFiles.map((fileName, index) => ({
    id: `poster-${featuredPosters.length + index + 1}`,
    src: `/moreposterssquareall/${fileName}.webp`,
    title: toTitle(fileName),
    group: "Poster",
    description: "Square poster design",
    source: "default" as const,
  })),
]

export const DEFAULT_SITES: SiteItem[] = [
  {
    id: "site-1",
    title: "Boom Audio Visuals",
    description:
      "Event production site for a premium AV brand. Clear services, portfolio, and a contact flow that grew inquiries.",
    image: "/boom-audio-visuals-website.webp",
    tags: ["Next.js", "Events"],
    link: "https://boomevents.co.ke/",
    source: "default",
  },
  {
    id: "site-2",
    title: "Astermed Medical Supplies",
    description:
      "Product catalog for a medical supplier — upload, featured items, and a clean storefront for clinics.",
    image: "/astermed-medical-supplies-logo.webp",
    tags: ["Catalog", "Medical"],
    link: "https://www.astermedsupplies.co.ke/",
    source: "default",
  },
  {
    id: "site-3",
    title: "Haven Furnitures",
    description: "Furniture e-commerce with an admin dashboard for products and images.",
    image: "/modern-furniture-website-dashboard.webp",
    tags: ["E-commerce", "Dashboard"],
    link: "https://www.havenlivingfurniture.co.ke/",
    source: "default",
  },
  {
    id: "site-4",
    title: "Amani Centre CBO",
    description: "Community site for flood response and outreach. Fast on mobile, easy to update.",
    image: "/community-organization-website.webp",
    tags: ["NGO", "Community"],
    link: "https://www.amanicentercbo.org/",
    source: "default",
  },
  {
    id: "site-5",
    title: "WOMD Digitech",
    description: "Kenyan domain registration platform from the KENIC hackathon.",
    image: "/domain-registration-website.webp",
    tags: ["Hackathon", "Domains"],
    link: "http://womd.co.ke/",
    source: "default",
  },
  {
    id: "site-6",
    title: "Cadiet Gym Coach",
    description: "Fitness coaching site. Bookings went up after launch.",
    image: "/fitness-gym-coach-website.webp",
    tags: ["Fitness", "Portfolio"],
    link: "https://cadiet.vercel.app/",
    source: "default",
  },
  {
    id: "site-7",
    title: "MyKitchen",
    description: "Vegan recipe site with 700+ recipes, built for search and speed.",
    image: "/mykitchen.png",
    tags: ["SEO", "Content"],
    link: "https://mykitchen.codewithseth.co.ke/",
    source: "default",
  },
  {
    id: "site-8",
    title: "Dhamira Imara",
    description: "Financial management for NGOs — budgeting, reporting, donors.",
    image: "/dhamira.png",
    tags: ["Finance", "NGO"],
    link: "https://www.dhamiraimara.org/",
    source: "default",
  },
  {
    id: "site-9",
    title: "Elevate (HR System)",
    description: "HR platform for payroll, attendance, and employee lifecycle.",
    image: "/pro_samples/elevate-hr.webp",
    tags: ["HR", "Enterprise"],
    link: "https://hr.codewithseth.co.ke/",
    source: "default",
  },
  {
    id: "site-10",
    title: "API to PDF",
    description: "HTML-to-PDF microservice for reports and exports.",
    image: "/api_pdf.png",
    tags: ["API", "PDF"],
    link: "https://api-pdf.codewithseth.co.ke/",
    source: "default",
  },
]
