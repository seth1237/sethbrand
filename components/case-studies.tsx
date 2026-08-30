"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
import { StaggerContainer, StaggerItem } from "./animations"

// Sample case studies
const caseStudies = [
  {
    id: 1,
    title: "E-commerce Conversion Rate Optimization",
    client: "Fashion Retailer",
    industry: "Retail",
    services: ["SEO", "UX Design", "Analytics"],
    challenge: "Low conversion rate of 1.2% despite high traffic",
    solution: "Implemented UX improvements, optimized product pages, and streamlined checkout process",
    results: ["87% increase in conversion rate", "32% reduction in cart abandonment", "124% increase in revenue"],
    imageUrl: "https://images.unsplash.com/photo-1573855619003-97b4799dcd8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    slug: "fashion-retailer-conversion-optimization"
  },
  {
    id: 2,
    title: "Local Business SEO Campaign",
    client: "Dental Practice",
    industry: "Healthcare",
    services: ["Local SEO", "Content Marketing", "Website Development"],
    challenge: "Low online visibility and difficulty attracting new patients",
    solution: "Comprehensive local SEO strategy with Google Business optimization and targeted content",
    results: ["250% increase in organic traffic", "Top 3 rankings for 28 targeted keywords", "156 new patient inquiries in 3 months"],
    imageUrl: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    slug: "dental-practice-local-seo"
  },
  {
    id: 3,
    title: "Social Media Campaign Launch",
    client: "Food Delivery Startup",
    industry: "Food & Beverage",
    services: ["Social Media Marketing", "Graphic Design", "Paid Advertising"],
    challenge: "New brand with no social presence or brand recognition",
    solution: "Cross-platform social media strategy with engaging content and targeted advertising",
    results: ["15,000+ new followers in 2 months", "38% engagement rate on campaign content", "276% ROI on ad spend"],
    imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    slug: "food-delivery-social-campaign"
  }
]

export function CaseStudies() {
  return (
    <section id="case-studies" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <div className="space-y-12">
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Case Studies</h2>
            <div className="w-20 h-1 bg-primary"></div>
            <p className="text-muted-foreground max-w-3xl">
              Explore how we've helped businesses achieve measurable results through strategic digital solutions.
              These case studies demonstrate our approach to solving real-world marketing challenges.
            </p>
          </div>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((study) => (
              <StaggerItem key={study.id}>
                <Card className="overflow-hidden h-full flex flex-col hover:border-primary transition-colors">
                  <div className="aspect-[16/9] w-full relative overflow-hidden">
                    <img 
                      src={study.imageUrl} 
                      alt={study.title} 
                      className="object-cover w-full h-full transition-transform hover:scale-105 duration-500" 
                    />
                    <div className="absolute top-2 left-2 flex flex-wrap gap-2">
                      {study.industry && (
                        <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
                          {study.industry}
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="p-6 space-y-4 flex-1 flex flex-col">
                    <div className="space-y-2 flex-1">
                      <h3 className="font-semibold text-xl text-foreground line-clamp-2">{study.title}</h3>
                      <p className="text-sm text-primary">{study.client}</p>
                      
                      <div className="flex flex-wrap gap-2 py-2">
                        {study.services.map((service) => (
                          <Badge key={service} variant="outline" className="text-xs">
                            {service}
                          </Badge>
                        ))}
                      </div>
                      
                      <p className="text-muted-foreground text-sm">
                        <span className="font-medium text-foreground">Challenge:</span> {study.challenge}
                      </p>
                    </div>
                    
                    <div className="pt-4">
                      <p className="text-sm text-muted-foreground mb-4">
                        <span className="font-medium text-foreground">Results:</span> {study.results[0]}
                      </p>
                      
                      <Button variant="ghost" className="group p-0 h-auto text-primary" asChild>
                        <a href={`/case-studies/${study.slug}`}>
                          View Case Study
                          <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
          
          <div className="text-center pt-8">
            <Button size="lg" asChild>
              <a href="/case-studies">View All Case Studies</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}