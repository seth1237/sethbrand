"use client"

import { useState, useEffect } from "react"
import { BentoButton } from "@/components/ui/bento-button"
import { useTheme } from "next-themes"
import { Card } from "@/components/ui/card"
import {
  Sun,
  Moon,
  ArrowRight,
  Heart,
  Download,
  SendHorizonal,
  AlertCircle,
  CheckCircle2,
  Play,
} from "lucide-react"
import { cn } from "@/lib/utils"

export default function ButtonShowcase() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null // Avoid rendering during SSR to prevent hydration mismatch
  }

  const currentTheme = theme as "light" | "dark" | "system"

  return (
    <div className="w-full space-y-8 py-12">
      <div className="mx-auto max-w-3xl space-y-3 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">
          Bento Button System
        </h2>
        <p className="text-muted-foreground">
          A collection of beautiful buttons with Bento-style design and
          neumorphic effects in light mode.
        </p>
        <div className="flex flex-wrap justify-center gap-2 pt-2">
          <BentoButton
            variant={currentTheme === "light" ? "primary" : "outline"}
            onClick={() => setTheme("light")}
            leftIcon={<Sun className="h-4 w-4" />}
          >
            Light
          </BentoButton>
          <BentoButton
            variant={currentTheme === "dark" ? "primary" : "outline"}
            onClick={() => setTheme("dark")}
            leftIcon={<Moon className="h-4 w-4" />}
          >
            Dark
          </BentoButton>
          <a href="/design/neumorphism-guide">
            <BentoButton variant="glass">
              Neumorphism Guide
            </BentoButton>
          </a>
        </div>
      </div>

      <div className="mx-auto grid max-w-5xl gap-8">
        {/* Button Variants */}
        <Card className={cn(
          "p-6",
          "data-[theme=light]:bg-gradient-to-br data-[theme=light]:from-gray-50 data-[theme=light]:to-gray-100",
          "data-[theme=dark]:bg-gradient-to-br data-[theme=dark]:from-background data-[theme=dark]:to-background/80"
        )} data-theme={theme}>
          <h3 className="mb-6 text-xl font-semibold">Button Variants</h3>
          <div className="flex flex-wrap gap-4">
            <BentoButton variant="primary">Primary</BentoButton>
            <BentoButton variant="secondary">Secondary</BentoButton>
            <BentoButton variant="outline">Outline</BentoButton>
            <BentoButton variant="ghost">Ghost</BentoButton>
            <BentoButton variant="destructive">Destructive</BentoButton>
            <BentoButton variant="link">Link</BentoButton>
            <BentoButton variant="glass">Glass</BentoButton>
            <BentoButton variant="gradient">Gradient</BentoButton>
          </div>
        </Card>

        {/* Button Sizes */}
        <Card className={cn(
          "p-6",
          "data-[theme=light]:bg-gradient-to-br data-[theme=light]:from-gray-50 data-[theme=light]:to-gray-100",
          "data-[theme=dark]:bg-gradient-to-br data-[theme=dark]:from-background data-[theme=dark]:to-background/80"
        )} data-theme={theme}>
          <h3 className="mb-6 text-xl font-semibold">Button Sizes</h3>
          <div className="flex flex-wrap items-center gap-4">
            <BentoButton variant="primary" size="xs">
              Extra Small
            </BentoButton>
            <BentoButton variant="primary" size="sm">
              Small
            </BentoButton>
            <BentoButton variant="primary" size="default">
              Default
            </BentoButton>
            <BentoButton variant="primary" size="lg">
              Large
            </BentoButton>
            <BentoButton variant="primary" size="xl">
              Extra Large
            </BentoButton>
          </div>
        </Card>

        {/* Button Rounded Variations */}
        <Card className={cn(
          "p-6",
          "data-[theme=light]:bg-gradient-to-br data-[theme=light]:from-gray-50 data-[theme=light]:to-gray-100",
          "data-[theme=dark]:bg-gradient-to-br data-[theme=dark]:from-background data-[theme=dark]:to-background/80"
        )} data-theme={theme}>
          <h3 className="mb-6 text-xl font-semibold">Button Rounded Variations</h3>
          <div className="flex flex-wrap gap-4">
            <BentoButton variant="primary" rounded="none">
              Square
            </BentoButton>
            <BentoButton variant="primary" rounded="sm">
              Small Radius
            </BentoButton>
            <BentoButton variant="primary" rounded="default">
              Default
            </BentoButton>
            <BentoButton variant="primary" rounded="lg">
              Large Radius
            </BentoButton>
            <BentoButton variant="primary" rounded="xl">
              Extra Large
            </BentoButton>
            <BentoButton variant="primary" rounded="full">
              Pill
            </BentoButton>
          </div>
        </Card>

        {/* Icon Buttons */}
        <Card className={cn(
          "p-6",
          "data-[theme=light]:bg-gradient-to-br data-[theme=light]:from-gray-50 data-[theme=light]:to-gray-100",
          "data-[theme=dark]:bg-gradient-to-br data-[theme=dark]:from-background data-[theme=dark]:to-background/80"
        )} data-theme={theme}>
          <h3 className="mb-6 text-xl font-semibold">Icon Buttons</h3>
          <div className="flex flex-wrap gap-4">
            <BentoButton
              variant="primary"
              leftIcon={<Heart className="h-4 w-4" />}
            >
              Like
            </BentoButton>
            <BentoButton
              variant="outline"
              rightIcon={<ArrowRight className="h-4 w-4" />}
            >
              Next
            </BentoButton>
            <BentoButton
              variant="secondary"
              leftIcon={<Download className="h-4 w-4" />}
            >
              Download
            </BentoButton>
            <BentoButton
              variant="glass"
              leftIcon={<SendHorizonal className="h-4 w-4" />}
            >
              Send
            </BentoButton>
            <BentoButton
              variant="destructive"
              leftIcon={<AlertCircle className="h-4 w-4" />}
            >
              Alert
            </BentoButton>
            <BentoButton
              variant="gradient"
              rightIcon={<Play className="h-4 w-4" />}
            >
              Start
            </BentoButton>
          </div>
        </Card>

        {/* Loading States */}
        <Card className={cn(
          "p-6",
          "data-[theme=light]:bg-gradient-to-br data-[theme=light]:from-gray-50 data-[theme=light]:to-gray-100",
          "data-[theme=dark]:bg-gradient-to-br data-[theme=dark]:from-background data-[theme=dark]:to-background/80"
        )} data-theme={theme}>
          <h3 className="mb-6 text-xl font-semibold">Loading States</h3>
          <div className="flex flex-wrap gap-4">
            <BentoButton variant="primary" isLoading>
              Loading
            </BentoButton>
            <BentoButton
              variant="secondary"
              isLoading
              loadingText="Processing..."
            >
              Submit
            </BentoButton>
            <BentoButton
              variant="outline"
              isLoading
              loadingText="Sending..."
            >
              Send
            </BentoButton>
            <BentoButton variant="destructive" isLoading>
              Delete
            </BentoButton>
          </div>
        </Card>

        {/* Animation Examples */}
        <Card className={cn(
          "p-6",
          "data-[theme=light]:bg-gradient-to-br data-[theme=light]:from-gray-50 data-[theme=light]:to-gray-100",
          "data-[theme=dark]:bg-gradient-to-br data-[theme=dark]:from-background data-[theme=dark]:to-background/80"
        )} data-theme={theme}>
          <h3 className="mb-6 text-xl font-semibold">Animation Examples</h3>
          <div className="flex flex-wrap gap-4">
            <BentoButton variant="primary" animation="pulse">
              Pulse
            </BentoButton>
            <BentoButton variant="secondary" animation="bounce">
              Bounce
            </BentoButton>
            <BentoButton variant="glass" animation="shimmer">
              Shimmer
            </BentoButton>
          </div>
        </Card>

        {/* Call to Action Section */}
        <Card className={cn(
          "p-8",
          "data-[theme=light]:bg-gradient-to-r data-[theme=light]:from-gray-50 data-[theme=light]:to-blue-50",
          "data-[theme=dark]:bg-gradient-to-r data-[theme=dark]:from-background data-[theme=dark]:to-primary/10"
        )} data-theme={theme}>
          <div className="text-center">
            <h3 className="mb-2 text-2xl font-bold">Ready to upgrade your UI?</h3>
            <p className="mb-6 text-muted-foreground">
              Use these beautiful Bento-style buttons throughout your application
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <BentoButton variant="primary" size="lg" rounded="lg">
                Get Started
              </BentoButton>
              <BentoButton variant="outline" size="lg" rounded="lg">
                Documentation
              </BentoButton>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}