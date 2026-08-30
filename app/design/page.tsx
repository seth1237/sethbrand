"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { BentoButton } from "@/components/ui/bento-button"
import { NeumorphicCard } from "@/components/ui/neumorphic-card"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sun, Moon, Palette, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { Navigation } from "@/components/navigation"

export default function DesignShowcase() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="container mx-auto px-4 py-20">
        <div className="space-y-8 pb-10 text-center">
          <p className="font-label text-xs tracking-[0.2em] uppercase text-primary">Design system</p>
          <h1 className="font-heading text-4xl font-semibold tracking-tight">Components</h1>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          Featuring Bento-style UI components with neumorphism in light mode and
          consistent dark mode styling.
        </p>

        <div className="flex justify-center gap-3">
          <BentoButton
            variant={theme === "light" ? "primary" : "outline"}
            size="sm"
            onClick={() => setTheme("light")}
            leftIcon={<Sun className="h-4 w-4" />}
          >
            Light
          </BentoButton>
          <BentoButton
            variant={theme === "dark" ? "primary" : "outline"}
            size="sm"
            onClick={() => setTheme("dark")}
            leftIcon={<Moon className="h-4 w-4" />}
          >
            Dark
          </BentoButton>
          
          <Link href="/design/neumorphism-guide">
            <BentoButton
              variant="glass"
              size="sm"
              rightIcon={<ArrowRight className="h-4 w-4" />}
            >
              Neumorphism Guide
            </BentoButton>
          </Link>
        </div>
      </div>

      <Tabs defaultValue="cards" className="w-full">
        <TabsList className="mx-auto w-full max-w-md grid grid-cols-3">
          <TabsTrigger value="cards">Cards</TabsTrigger>
          <TabsTrigger value="buttons">Buttons</TabsTrigger>
          <TabsTrigger value="sections">Sections</TabsTrigger>
        </TabsList>
        
        {/* Cards Showcase */}
        <TabsContent value="cards" className="py-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <NeumorphicCard variant="raised">
              <div className="p-2 text-center">
                <h3 className="mb-2 text-lg font-medium">Raised Card</h3>
                <p className="text-sm text-muted-foreground">
                  Neumorphic card with raised effect
                </p>
              </div>
            </NeumorphicCard>

            <NeumorphicCard variant="flat">
              <div className="p-2 text-center">
                <h3 className="mb-2 text-lg font-medium">Flat Card</h3>
                <p className="text-sm text-muted-foreground">
                  Neumorphic card with flat effect
                </p>
              </div>
            </NeumorphicCard>

            <NeumorphicCard variant="pressed">
              <div className="p-2 text-center">
                <h3 className="mb-2 text-lg font-medium">Pressed Card</h3>
                <p className="text-sm text-muted-foreground">
                  Neumorphic card with pressed effect
                </p>
              </div>
            </NeumorphicCard>

            <NeumorphicCard variant="raised" glassMorphism>
              <div className="p-2 text-center">
                <h3 className="mb-2 text-lg font-medium">Glass Morphism</h3>
                <p className="text-sm text-muted-foreground">
                  Combining neumorphism with glass effect
                </p>
              </div>
            </NeumorphicCard>

            <NeumorphicCard 
              variant="raised" 
              header={<h3 className="text-lg font-medium">With Header</h3>}
              footer={<div className="text-sm text-muted-foreground text-center">Card Footer</div>}
            >
              <div className="p-2 text-center">
                <p className="text-sm text-muted-foreground">
                  This card includes a header and footer section
                </p>
              </div>
            </NeumorphicCard>

            <NeumorphicCard 
              variant="raised" 
              onClick={() => alert("Card clicked!")}
            >
              <div className="p-2 text-center">
                <h3 className="mb-2 text-lg font-medium">Interactive Card</h3>
                <p className="text-sm text-muted-foreground">
                  Click me! I'm an interactive card
                </p>
              </div>
            </NeumorphicCard>
          </div>
        </TabsContent>

        {/* Buttons Showcase */}
        <TabsContent value="buttons" className="py-8">
          <div className="space-y-8">
            {/* Regular Button Variants */}
            <div className="space-y-2">
              <h3 className="text-xl font-medium">Regular Buttons</h3>
              <div className="flex flex-wrap gap-3">
                <Button variant="default">Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="link">Link</Button>
              </div>
            </div>

            {/* Bento Button Variants */}
            <div className="space-y-2">
              <h3 className="text-xl font-medium">Bento Buttons</h3>
              <div className="flex flex-wrap gap-3">
                <BentoButton variant="primary">Primary</BentoButton>
                <BentoButton variant="secondary">Secondary</BentoButton>
                <BentoButton variant="outline">Outline</BentoButton>
                <BentoButton variant="glass">Glass</BentoButton>
                <BentoButton variant="gradient">Gradient</BentoButton>
              </div>
            </div>

            {/* Button Sizes */}
            <div className="space-y-2">
              <h3 className="text-xl font-medium">Bento Button Sizes</h3>
              <div className="flex flex-wrap items-end gap-3">
                <BentoButton variant="primary" size="xs">XS</BentoButton>
                <BentoButton variant="primary" size="sm">SM</BentoButton>
                <BentoButton variant="primary" size="default">Default</BentoButton>
                <BentoButton variant="primary" size="lg">Large</BentoButton>
                <BentoButton variant="primary" size="xl">XL</BentoButton>
              </div>
            </div>

            {/* Button Shapes */}
            <div className="space-y-2">
              <h3 className="text-xl font-medium">Bento Button Shapes</h3>
              <div className="flex flex-wrap gap-3">
                <BentoButton variant="primary" rounded="none">Square</BentoButton>
                <BentoButton variant="primary" rounded="sm">Small Radius</BentoButton>
                <BentoButton variant="primary" rounded="default">Default</BentoButton>
                <BentoButton variant="primary" rounded="lg">Large Radius</BentoButton>
                <BentoButton variant="primary" rounded="full">Pill</BentoButton>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Layout Sections */}
        <TabsContent value="sections" className="py-8">
          <div className="space-y-10">
            {/* Hero Section */}
            <NeumorphicCard variant="raised" className="overflow-hidden">
              <div className="p-6 sm:p-10">
                <div className="mx-auto max-w-2xl space-y-6 text-center">
                  <h2 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
                    Modern Neumorphic Design
                  </h2>
                  <p className="text-muted-foreground">
                    Combining the best of flat design with subtle shadows and highlights
                    for a modern, tactile feel.
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <BentoButton variant="primary" size="lg">Get Started</BentoButton>
                    <BentoButton variant="outline" size="lg">Learn More</BentoButton>
                  </div>
                </div>
              </div>
            </NeumorphicCard>

            {/* Features Section */}
            <div className="space-y-4">
              <h3 className="text-xl font-medium">Feature Cards</h3>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((i) => (
                  <NeumorphicCard key={i} variant="raised" className="h-full">
                    <div className="flex flex-col items-center p-6 text-center">
                      <div className="mb-4 rounded-full bg-primary/10 p-3">
                        <Palette className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="mb-2 text-lg font-medium">Feature {i}</h3>
                      <p className="text-sm text-muted-foreground">
                        This is a feature description with neumorphic styling that looks
                        great in both light and dark modes.
                      </p>
                    </div>
                  </NeumorphicCard>
                ))}
              </div>
            </div>

            {/* Call to Action */}
            <NeumorphicCard variant="raised" glassMorphism className="overflow-hidden">
              <div className={cn(
                "p-8 text-center",
                "bg-gradient-to-r",
                "from-background to-background/50"
              )}>
                <div className="mx-auto max-w-2xl space-y-6">
                  <h2 className="text-2xl font-bold sm:text-3xl">
                    Ready to upgrade your design?
                  </h2>
                  <p className="text-muted-foreground">
                    Use our Bento-style components with neumorphic effects to create
                    beautiful interfaces.
                  </p>
                  <BentoButton variant="gradient" size="lg">
                    Get Started
                  </BentoButton>
                </div>
              </div>
            </NeumorphicCard>
          </div>
        </TabsContent>
      </Tabs>
    </div>
    </main>
  )
}