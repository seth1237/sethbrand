import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, Search, Layout, PenTool, BarChart3 } from "lucide-react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"

export const metadata: Metadata = {
  title: "Digital Marketing & SEO Services | CodeWithSeth",
  description: "Web design, SEO, digital marketing, and content services tailored for Kenyan and global businesses.",
  alternates: { canonical: "/services" },
}

const serviceCategories = [
  {
    id: "web-design-development",
    title: "Web Design & Development",
    description: "Custom-designed, high-performance websites tailored to your business goals.",
    icon: Layout,
    services: [
      {
        title: "Website Design & Development",
        description: "Custom, responsive websites built with modern technologies that look great on all devices.",
        features: [
          "Strategic UX/UI design",
          "Mobile-first responsive development",
          "WordPress, Next.js, or custom CMS",
          "E-commerce solutions",
          "Accessibility compliance",
          "Performance optimization"
        ]
      },
      {
        title: "Website Redesign",
        description: "Transform your outdated website into a modern, conversion-focused digital asset.",
        features: [
          "UX audit and analysis",
          "Brand-aligned visual refresh",
          "Conversion funnel optimization",
          "Content restructuring",
          "Technical improvements",
          "Full migration support"
        ]
      },
      {
        title: "Landing Page Design",
        description: "High-converting landing pages designed to turn visitors into customers.",
        features: [
          "Conversion-focused design",
          "A/B testing",
          "Compelling copy",
          "Call-to-action optimization",
          "Mobile optimization",
          "Integration with marketing tools"
        ]
      }
    ]
  },
  {
    id: "seo-optimization",
    title: "SEO & Search Marketing",
    description: "Data-driven strategies to improve visibility and drive qualified organic traffic.",
    icon: Search,
    services: [
      {
        title: "Search Engine Optimization",
        description: "Comprehensive SEO strategies to improve rankings and drive targeted organic traffic.",
        features: [
          "Technical SEO audit",
          "On-page optimization",
          "Content strategy",
          "Link building",
          "Local SEO",
          "Monthly reporting & analysis"
        ]
      },
      {
        title: "Local SEO",
        description: "Dominate local search results and attract more customers from your service area.",
        features: [
          "Google Business Profile optimization",
          "Local citation building",
          "Review management",
          "Local content strategy",
          "Competitor analysis",
          "Local link building"
        ]
      },
      {
        title: "E-commerce SEO",
        description: "Specialized SEO strategies to increase visibility and sales for online stores.",
        features: [
          "Product page optimization",
          "Category structure optimization",
          "Schema markup implementation",
          "Shopping feed optimization",
          "Conversion rate optimization",
          "Ongoing keyword research"
        ]
      }
    ]
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    description: "Strategic campaigns that connect with your audience and drive measurable results.",
    icon: BarChart3,
    services: [
      {
        title: "Paid Advertising (PPC)",
        description: "Strategic paid campaigns that deliver measurable ROI across multiple platforms.",
        features: [
          "Google Ads management",
          "Social media advertising",
          "Display & remarketing",
          "Audience targeting",
          "Ad creative development",
          "Performance analysis & optimization"
        ]
      },
      {
        title: "Social Media Marketing",
        description: "Build brand awareness and engagement through strategic social media presence.",
        features: [
          "Platform strategy & management",
          "Content creation & scheduling",
          "Community management",
          "Paid social campaigns",
          "Influencer partnerships",
          "Performance analytics"
        ]
      },
      {
        title: "Email Marketing",
        description: "Targeted email campaigns that nurture leads and drive conversions.",
        features: [
          "Campaign strategy",
          "Email template design",
          "List segmentation",
          "Automated sequences",
          "A/B testing",
          "Performance reporting"
        ]
      }
    ]
  },
  {
    id: "content-creation",
    title: "Content Creation",
    description: "Compelling content that resonates with your audience and drives engagement.",
    icon: PenTool,
    services: [
      {
        title: "Content Strategy & Creation",
        description: "Strategic content that builds authority and engages your target audience.",
        features: [
          "Content strategy development",
          "Blog writing & optimization",
          "Long-form content",
          "Keyword research",
          "Editorial calendar",
          "Content performance analysis"
        ]
      },
      {
        title: "Copywriting",
        description: "Persuasive copy that converts visitors into customers across all touchpoints.",
        features: [
          "Website copy",
          "Landing page copy",
          "Email sequences",
          "Product descriptions",
          "Brand messaging",
          "Call-to-action optimization"
        ]
      },
      {
        title: "Graphic Design",
        description: "Visual content that enhances your brand and captures audience attention.",
        features: [
          "Social media graphics",
          "Digital ads",
          "Infographics",
          "Presentation design",
          "Email templates",
          "Brand collateral"
        ]
      }
    ]
  }
]

export default function ServicesPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-[calc(4.5rem+env(safe-area-inset-top))]">
        <section className="py-10 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="space-y-12">
            <div className="text-center space-y-3 max-w-3xl mx-auto">
              <p className="font-label text-[11px] sm:text-sm tracking-[0.12em] sm:tracking-[0.2em] uppercase text-primary">Services</p>
              <h1 className="font-heading text-[1.75rem] sm:text-5xl font-semibold text-foreground tracking-tight">
                What I can do for your business
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground">
                Websites, SEO, marketing, and design — built for Kenyan businesses that need customers, not just a pretty page.
              </p>
            </div>
            
            <div className="space-y-14 sm:space-y-24 pt-4 sm:pt-8">
              {serviceCategories.map((category) => (
                <div key={category.id} id={category.id} className="scroll-mt-24">
                  <div className="grid md:grid-cols-12 gap-8 items-start">
                    <div className="md:col-span-4 space-y-4">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10">
                        <category.icon className="h-6 w-6 text-primary" />
                      </div>
                      <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-foreground">{category.title}</h2>
                      <p className="text-muted-foreground">{category.description}</p>
                      <div className="pt-4">
                        <Button asChild variant="outline" className="w-full sm:w-auto min-h-11">
                          <Link href="/contact">
                            Book a free call
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                    
                    <div className="md:col-span-8 space-y-6">
                      {category.services.map((service, index) => (
                        <Card key={index} className="p-6 border-foreground/10 hover:border-primary/40 transition-colors">
                          <h3 className="font-heading text-xl font-semibold text-foreground mb-3">{service.title}</h3>
                          <p className="text-muted-foreground mb-4">{service.description}</p>
                          
                          <div className="grid sm:grid-cols-2 gap-2">
                            {service.features.map((feature, fIndex) => (
                              <div key={fIndex} className="flex items-start">
                                <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 mr-2"></div>
                                <span className="text-sm">{feature}</span>
                              </div>
                            ))}
                          </div>
                          {category.id === 'seo-optimization' && index === 1 && (
                            <div className="pt-4 text-sm">
                              <span className="text-muted-foreground">Popular in Nairobi: </span>
                              <a href="/services/seo/local-seo-nairobi" className="text-primary underline">Local SEO Services</a>
                            </div>
                          )}
                          {category.id === 'seo-optimization' && index === 0 && (
                            <div className="pt-2 text-sm">
                              <a href="/services/seo/technical-seo-audit-kenya" className="text-primary underline">See our Technical SEO Audit</a>
                            </div>
                          )}
                          {category.id === 'digital-marketing' && index === 0 && (
                            <div className="pt-2 text-sm">
                              <a href="/services/seo/mpesa-integration-systems-kenya" className="text-primary underline">M‑Pesa Systems Integration</a>
                            </div>
                          )}
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="rounded-xl border border-foreground/10 p-8 text-center mt-8">
              <h2 className="font-heading text-2xl font-semibold text-foreground mb-3">Not sure where to start?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
                Most clients begin with a website, then add SEO and campaigns. Book a call and we&apos;ll map the right first step.
              </p>
              <Button size="lg" asChild>
                <Link href="/contact">Book a free call</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
    </>
  )
}