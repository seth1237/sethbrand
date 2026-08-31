"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { SectionHeading } from "@/components/section-heading"

const testimonials = [
  {
    id: 1,
    name: "James Ondiek",
    position: "Founder",
    company: "Boom Audio Visuals",
    quote:
      "The design captures our brand, and inquiries have increased by over 60% since launch.",
  },
  {
    id: 2,
    name: "John Green",
    position: "Director",
    company: "Amani Centre CBO",
    quote:
      "He understood our mission and built a site that actually helps us reach people in need.",
  },
  {
    id: 3,
    name: "Dickson Cadiet",
    position: "Fitness Coach",
    company: "Cadiet Gym Coach",
    quote:
      "Clean, easy to use, and my online bookings have tripled since the site went live.",
  },
]

export function Testimonials() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const totalSlides = Math.ceil(testimonials.length / 2)

  return (
    <section id="testimonials" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl space-y-8 sm:space-y-10">
        <SectionHeading
          eyebrow="Clients"
          title="What working together looks like"
          description="Owners who needed a site that brings in work — not just a brochure."
          align="center"
        />

        <div className="grid gap-4 md:hidden">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="p-5 relative">
              <Quote className="h-7 w-7 text-primary/30 absolute top-4 right-4" />
              <blockquote className="text-foreground leading-relaxed mb-5 pr-8">
                “{testimonial.quote}”
              </blockquote>
              <div>
                <div className="font-heading font-semibold text-foreground">{testimonial.name}</div>
                <div className="text-sm text-muted-foreground">
                  {testimonial.position}, {testimonial.company}
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="relative hidden md:block">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {Array(totalSlides)
                .fill(0)
                .map((_, slideIndex) => (
                  <div key={slideIndex} className="w-full flex-shrink-0 px-1">
                    <div className="grid md:grid-cols-2 gap-4">
                      {testimonials.slice(slideIndex * 2, slideIndex * 2 + 2).map((testimonial) => (
                        <Card key={testimonial.id} className="p-6 relative">
                          <Quote className="h-8 w-8 text-primary/30 absolute top-5 right-5" />
                          <blockquote className="text-foreground leading-relaxed mb-6 pr-8">
                            “{testimonial.quote}”
                          </blockquote>
                          <div>
                            <div className="font-heading font-semibold text-foreground">{testimonial.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {testimonial.position}, {testimonial.company}
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {totalSlides > 1 && (
            <div className="flex justify-center mt-8 gap-3">
              <Button variant="outline" size="icon" onClick={() => setCurrentSlide((p) => (p - 1 + totalSlides) % totalSlides)}>
                <ChevronLeft className="h-5 w-5" />
                <span className="sr-only">Previous</span>
              </Button>
              <div className="flex items-center gap-2">
                {Array(totalSlides)
                  .fill(0)
                  .map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentSlide(i)}
                      className={`h-2 rounded-full transition-all ${
                        i === currentSlide ? "w-6 bg-primary" : "w-2 bg-primary/30"
                      }`}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
              </div>
              <Button variant="outline" size="icon" onClick={() => setCurrentSlide((p) => (p + 1) % totalSlides)}>
                <ChevronRight className="h-5 w-5" />
                <span className="sr-only">Next</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
