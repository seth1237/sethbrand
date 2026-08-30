"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Check, X } from "lucide-react"
import { Navigation } from "@/components/navigation"
import Link from "next/link"

const pricingPlans = [
  {
    name: "Starter",
    description: "For small businesses getting found locally.",
    price: { monthly: 22000, yearly: 19800 },
    features: [
      { name: "Website audit and basic optimization", included: true },
      { name: "Local SEO setup", included: true },
      { name: "Google Business Profile optimization", included: true },
      { name: "Monthly performance report", included: true },
      { name: "Social media setup (2 platforms)", included: true },
      { name: "Content creation (4 posts/month)", included: true },
      { name: "Email marketing setup", included: false },
      { name: "Paid advertising management", included: false },
      { name: "Conversion rate optimization", included: false },
      { name: "Dedicated account manager", included: false },
    ],
    callToAction: "Book a free call",
    popular: false,
  },
  {
    name: "Professional",
    description: "Full marketing stack for businesses that want consistent leads.",
    price: { monthly: 58000, yearly: 52200 },
    features: [
      { name: "Website audit and advanced optimization", included: true },
      { name: "Complete SEO strategy", included: true },
      { name: "Google Business Profile optimization", included: true },
      { name: "Weekly performance reports", included: true },
      { name: "Social media management (4 platforms)", included: true },
      { name: "Content creation (12 posts/month)", included: true },
      { name: "Email marketing campaigns", included: true },
      { name: "Paid advertising management (up to $5k spend)", included: true },
      { name: "Conversion rate optimization", included: true },
      { name: "Dedicated account manager", included: true },
    ],
    callToAction: "Book a free call",
    popular: true,
  },
  {
    name: "Enterprise",
    description: "Custom work for teams with heavier marketing needs.",
    price: { monthly: 118000, yearly: 106200 },
    features: [
      { name: "Full website audit and optimization", included: true },
      { name: "Advanced SEO strategy and implementation", included: true },
      { name: "Google Business Profile optimization", included: true },
      { name: "Real-time reporting dashboard", included: true },
      { name: "Full social media management (all platforms)", included: true },
      { name: "Custom content creation (25+ posts/month)", included: true },
      { name: "Advanced email marketing automation", included: true },
      { name: "Paid advertising management (unlimited spend)", included: true },
      { name: "Advanced CRO & A/B testing", included: true },
      { name: "Senior dedicated account manager", included: true },
    ],
    callToAction: "Talk about a custom plan",
    popular: false,
  },
]

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly")

  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-20">
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-6xl space-y-12">
            <div className="text-center space-y-3">
              <p className="font-label text-xs sm:text-sm tracking-[0.2em] uppercase text-primary">Pricing</p>
              <h1 className="font-heading text-4xl sm:text-5xl font-semibold tracking-tight">
                Clear monthly retainers
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Pick a plan, or book a call and we&apos;ll size the work to what you actually need.
              </p>
            </div>

            <div className="flex justify-center">
              <div className="inline-flex items-center rounded-full border border-foreground/10 p-1">
                <button
                  type="button"
                  onClick={() => setBillingCycle("monthly")}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    billingCycle === "monthly"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Monthly
                </button>
                <button
                  type="button"
                  onClick={() => setBillingCycle("yearly")}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    billingCycle === "yearly"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Yearly <span className={billingCycle === "yearly" ? "opacity-80" : "text-primary"}>Save 10%</span>
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pricingPlans.map((plan) => (
                <Card
                  key={plan.name}
                  className={`relative flex flex-col overflow-hidden ${
                    plan.popular ? "border-primary" : "border-foreground/10"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-0">
                      <div className="font-label text-[10px] tracking-widest uppercase bg-primary text-primary-foreground py-1 px-3 rounded-bl-lg">
                        Most popular
                      </div>
                    </div>
                  )}

                  <div className="p-6 space-y-4">
                    <h2 className="font-heading text-2xl font-semibold">{plan.name}</h2>
                    <p className="text-muted-foreground text-sm">{plan.description}</p>
                    <div className="pt-2">
                      <div className="flex items-baseline">
                        <span className="font-heading text-4xl font-semibold">
                          KSh {plan.price[billingCycle].toLocaleString()}
                        </span>
                        <span className="ml-1 text-muted-foreground text-sm">/month</span>
                      </div>
                    </div>
                    <Button className="w-full" variant={plan.popular ? "default" : "outline"} asChild>
                      <Link href="/contact">{plan.callToAction}</Link>
                    </Button>
                  </div>

                  <div className="px-6 pt-2 pb-6">
                    <ul className="space-y-3 border-t border-foreground/10 pt-4">
                      {plan.features.map((feature) => (
                        <li key={feature.name} className="flex items-start">
                          {feature.included ? (
                            <Check className="h-4 w-4 text-primary shrink-0 mr-2 mt-0.5" />
                          ) : (
                            <X className="h-4 w-4 text-muted-foreground/50 shrink-0 mr-2 mt-0.5" />
                          )}
                          <span className={feature.included ? "text-sm text-foreground" : "text-sm text-muted-foreground"}>
                            {feature.name}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              ))}
            </div>

            <div className="rounded-xl border border-foreground/10 p-8 text-center">
              <h2 className="font-heading text-2xl font-semibold mb-3">Need something custom?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
                One-off websites, M-Pesa integrations, and internal systems are quoted separately.
              </p>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">Book a free call</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
