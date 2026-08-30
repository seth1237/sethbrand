"use client"

import { Button } from "@/components/ui/button"
import { BentoButton } from "@/components/ui/bento-button"
import { NeumorphicCard } from "@/components/ui/neumorphic-card"
import { 
  NeumorphicWrapper, 
  NeumorphicFlatWrapper, 
  NeumorphicRaisedWrapper, 
  NeumorphicPressedWrapper 
} from "@/components/ui/neumorphic-wrapper"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"
import { Sun, Moon, ArrowRight, Info } from "lucide-react"

export default function NeumorphismGuide() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const currentTheme = theme || "light"

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="mb-12 space-y-4 text-center">
        <h1 className="text-4xl font-bold">Neumorphism Design Guide</h1>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          How to apply neumorphic styles to UI elements in your project
        </p>

        <div className="flex justify-center gap-3">
          <Button
            variant={currentTheme === "light" ? "default" : "outline"}
            onClick={() => setTheme("light")}
            className="gap-2"
          >
            <Sun className="h-4 w-4" /> Light Mode
          </Button>
          <Button
            variant={currentTheme === "dark" ? "default" : "outline"}
            onClick={() => setTheme("dark")}
            className="gap-2"
          >
            <Moon className="h-4 w-4" /> Dark Mode
          </Button>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-7">
        <div className="col-span-full md:col-span-2">
          <div className="sticky top-24 space-y-4">
            <NeumorphicCard variant="raised">
              <h2 className="mb-4 text-xl font-semibold">Benefits of Neumorphism</h2>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Soft, tactile appearance</li>
                <li>• Modern, clean aesthetic</li>
                <li>• Makes UI elements "pop"</li>
                <li>• Creates visual hierarchy</li>
                <li>• Looks stunning in light mode</li>
              </ul>
            </NeumorphicCard>

            <NeumorphicCard variant="flat" glassMorphism>
              <div className="flex items-start gap-3">
                <Info className="mt-1 h-5 w-5 text-blue-500" />
                <div>
                  <h3 className="mb-1 font-medium">Best for Light Mode</h3>
                  <p className="text-sm text-muted-foreground">
                    Neumorphism looks best in light mode but we provide subtle adaptations for dark mode too.
                  </p>
                </div>
              </div>
            </NeumorphicCard>
          </div>
        </div>

        <div className="col-span-full space-y-10 md:col-span-5">
          <Tabs defaultValue="buttons">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="buttons">Buttons</TabsTrigger>
              <TabsTrigger value="cards">Cards</TabsTrigger>
              <TabsTrigger value="wrappers">Wrappers</TabsTrigger>
            </TabsList>

            {/* Buttons Tab */}
            <TabsContent value="buttons" className="space-y-6 pt-6">
              <Card className="p-6">
                <h2 className="mb-4 text-xl font-semibold">Standard Buttons</h2>
                <p className="mb-6 text-muted-foreground">
                  All standard buttons now include neumorphic effects in light mode.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button>Default Button</Button>
                  <Button variant="secondary">Secondary Button</Button>
                  <Button variant="outline">Outline Button</Button>
                  <Button variant="destructive">Destructive Button</Button>
                </div>

                <Separator className="my-6" />

                <h3 className="mb-4 font-medium">Code Example:</h3>
                <pre className="overflow-x-auto rounded bg-muted p-4 text-sm">
                  <code>{`<Button>Default Button</Button>
<Button variant="secondary">Secondary Button</Button>
<Button variant="outline">Outline Button</Button>
<Button variant="destructive">Destructive Button</Button>`}</code>
                </pre>
              </Card>

              <Card className="p-6">
                <h2 className="mb-4 text-xl font-semibold">Bento Buttons</h2>
                <p className="mb-6 text-muted-foreground">
                  Bento buttons have enhanced neumorphic effects with more variants.
                </p>
                <div className="flex flex-wrap gap-4">
                  <BentoButton variant="primary">Primary Button</BentoButton>
                  <BentoButton variant="secondary">Secondary Button</BentoButton>
                  <BentoButton variant="glass">Glass Button</BentoButton>
                  <BentoButton variant="outline">Outline Button</BentoButton>
                  <BentoButton variant="gradient">Gradient Button</BentoButton>
                </div>

                <Separator className="my-6" />

                <h3 className="mb-4 font-medium">Code Example:</h3>
                <pre className="overflow-x-auto rounded bg-muted p-4 text-sm">
                  <code>{`<BentoButton variant="primary">Primary Button</BentoButton>
<BentoButton variant="secondary">Secondary Button</BentoButton>
<BentoButton variant="glass">Glass Button</BentoButton>
<BentoButton variant="outline">Outline Button</BentoButton>
<BentoButton variant="gradient">Gradient Button</BentoButton>`}</code>
                </pre>
              </Card>
            </TabsContent>

            {/* Cards Tab */}
            <TabsContent value="cards" className="space-y-6 pt-6">
              <Card className="p-6">
                <h2 className="mb-4 text-xl font-semibold">Neumorphic Cards</h2>
                <p className="mb-6 text-muted-foreground">
                  Use the NeumorphicCard component for different neumorphic effects.
                </p>

                <div className="grid gap-6 sm:grid-cols-2">
                  <NeumorphicCard variant="raised">
                    <h3 className="mb-2 font-medium">Raised Card</h3>
                    <p className="text-sm text-muted-foreground">
                      Appears to raise from the surface with soft shadows.
                    </p>
                  </NeumorphicCard>

                  <NeumorphicCard variant="pressed">
                    <h3 className="mb-2 font-medium">Pressed Card</h3>
                    <p className="text-sm text-muted-foreground">
                      Appears pressed into the surface with inset shadows.
                    </p>
                  </NeumorphicCard>

                  <NeumorphicCard variant="flat">
                    <h3 className="mb-2 font-medium">Flat Card</h3>
                    <p className="text-sm text-muted-foreground">
                      A subtle flat neumorphic effect with minimal shadows.
                    </p>
                  </NeumorphicCard>

                  <NeumorphicCard variant="raised" glassMorphism>
                    <h3 className="mb-2 font-medium">Glass Card</h3>
                    <p className="text-sm text-muted-foreground">
                      Combines neumorphism with glass morphism effects.
                    </p>
                  </NeumorphicCard>
                </div>

                <Separator className="my-6" />

                <h3 className="mb-4 font-medium">Code Example:</h3>
                <pre className="overflow-x-auto rounded bg-muted p-4 text-sm">
                  <code>{`<NeumorphicCard variant="raised">
  <h3>Raised Card</h3>
  <p>Card content goes here.</p>
</NeumorphicCard>

<NeumorphicCard variant="pressed">
  <h3>Pressed Card</h3>
  <p>Card content goes here.</p>
</NeumorphicCard>

<NeumorphicCard variant="flat" glassMorphism>
  <h3>Glass + Flat Card</h3>
  <p>Card content goes here.</p>
</NeumorphicCard>`}</code>
                </pre>
              </Card>
            </TabsContent>

            {/* Wrappers Tab */}
            <TabsContent value="wrappers" className="space-y-6 pt-6">
              <Card className="p-6">
                <h2 className="mb-4 text-xl font-semibold">Neumorphic Wrappers</h2>
                <p className="mb-6 text-muted-foreground">
                  Use wrapper components to add neumorphic effects to any UI element.
                </p>

                <div className="grid gap-6 sm:grid-cols-2">
                  <NeumorphicRaisedWrapper className="p-4">
                    <h3 className="mb-2 font-medium">Raised Wrapper</h3>
                    <p className="text-sm text-muted-foreground">
                      Wrap any content with a raised neumorphic effect.
                    </p>
                  </NeumorphicRaisedWrapper>

                  <NeumorphicPressedWrapper className="p-4">
                    <h3 className="mb-2 font-medium">Pressed Wrapper</h3>
                    <p className="text-sm text-muted-foreground">
                      Wrap content with a pressed-in effect.
                    </p>
                  </NeumorphicPressedWrapper>

                  <NeumorphicFlatWrapper className="p-4">
                    <div className="flex items-center justify-between">
                      <span>Toggle Setting</span>
                      <Button variant="outline" size="sm">Enable</Button>
                    </div>
                  </NeumorphicFlatWrapper>

                  <NeumorphicWrapper variant="raised" className="p-4 rounded-lg">
                    <div className="space-y-2">
                      <h3 className="font-medium">Custom Content</h3>
                      <div className="h-2 w-3/4 rounded-full bg-primary/20"></div>
                      <div className="h-2 w-1/2 rounded-full bg-primary/20"></div>
                    </div>
                  </NeumorphicWrapper>
                </div>

                <Separator className="my-6" />

                <h3 className="mb-4 font-medium">Code Example:</h3>
                <pre className="overflow-x-auto rounded bg-muted p-4 text-sm">
                  <code>{`<NeumorphicRaisedWrapper className="p-4">
  <h3>Your Content Here</h3>
</NeumorphicRaisedWrapper>

<NeumorphicPressedWrapper className="p-4">
  <p>Pressed effect content</p>
</NeumorphicPressedWrapper>

<NeumorphicWrapper variant="raised" className="p-4 rounded-lg">
  <div>Custom content with rounded corners</div>
</NeumorphicWrapper>`}</code>
                </pre>
              </Card>
            </TabsContent>
          </Tabs>

          <Card className="p-6">
            <h2 className="mb-4 text-xl font-semibold">Best Practices</h2>
            <div className="space-y-4">
              <div className="rounded-lg border border-border p-4">
                <h3 className="mb-2 font-medium">Use appropriate contrast</h3>
                <p className="text-sm text-muted-foreground">
                  Ensure sufficient contrast between text and background colors. Neumorphic 
                  effects can sometimes reduce contrast, so check accessibility.
                </p>
              </div>

              <div className="rounded-lg border border-border p-4">
                <h3 className="mb-2 font-medium">Don't overuse</h3>
                <p className="text-sm text-muted-foreground">
                  Apply neumorphic effects to key interactive elements or containers, 
                  but don't apply to every element. Use it strategically.
                </p>
              </div>

              <div className="rounded-lg border border-border p-4">
                <h3 className="mb-2 font-medium">Provide dark mode alternatives</h3>
                <p className="text-sm text-muted-foreground">
                  Neumorphism works best on light backgrounds. For dark mode, consider 
                  using subtle glows or minimal shadows instead.
                </p>
              </div>
            </div>
          </Card>

          <NeumorphicCard variant="raised" className="p-6">
            <div className="space-y-4 text-center">
              <h2 className="text-2xl font-semibold">Ready to Apply Neumorphism?</h2>
              <p className="text-muted-foreground">
                Use our components throughout your site to create a cohesive, tactile user interface.
              </p>
              <BentoButton 
                variant="gradient" 
                size="lg" 
                rounded="lg"
                rightIcon={<ArrowRight className="h-4 w-4" />}
              >
                Explore Design Examples
              </BentoButton>
            </div>
          </NeumorphicCard>
        </div>
      </div>
    </div>
  )
}