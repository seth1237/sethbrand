"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  BarChart, 
  LineChart, 
  Calculator, 
  Users, 
  Target, 
  TrendingUp,
  Share2, 
  Download 
} from "lucide-react"
import { useRouter } from "next/navigation"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Navigation } from "@/components/navigation"
import Link from "next/link"

const calculatorSchema = z.object({
  industry: z.string({
    required_error: "Please select an industry",
  }),
  monthlyVisitors: z.coerce.number()
    .min(0, "Must be at least 0")
    .max(10000000, "Must be less than 10 million"),
  conversionRate: z.coerce.number()
    .min(0, "Must be at least 0")
    .max(100, "Must be 100% or less"),
  averageOrderValue: z.coerce.number()
    .min(0, "Must be at least 0"),
  marketingBudget: z.coerce.number()
    .min(0, "Must be at least 0"),
})

type CalculatorValues = z.infer<typeof calculatorSchema>

// Industry benchmark data
const industryBenchmarks = {
  "ecommerce": {
    conversionRate: 2.5,
    ctr: 1.8,
    cpc: 0.75,
    roi: 5.2
  },
  "finance": {
    conversionRate: 4.2,
    ctr: 3.5,
    cpc: 3.50,
    roi: 7.8
  },
  "healthcare": {
    conversionRate: 3.1,
    ctr: 2.7,
    cpc: 2.80,
    roi: 5.5
  },
  "education": {
    conversionRate: 3.8,
    ctr: 3.2,
    cpc: 2.50,
    roi: 6.2
  },
  "real-estate": {
    conversionRate: 2.7,
    ctr: 2.2,
    cpc: 2.20,
    roi: 5.8
  },
  "travel": {
    conversionRate: 1.9,
    ctr: 2.0,
    cpc: 1.20,
    roi: 4.9
  },
  "technology": {
    conversionRate: 2.8,
    ctr: 2.1,
    cpc: 1.80,
    roi: 5.0
  },
  "other": {
    conversionRate: 2.4,
    ctr: 2.0,
    cpc: 1.50,
    roi: 5.0
  }
}

export default function MarketingCalculator() {
  const [results, setResults] = useState<any>(null)
  const [activeTab, setActiveTab] = useState("roi")
  const [isSharing, setIsSharing] = useState(false)
  const [shareUrl, setShareUrl] = useState<string | null>(null)
  const [shareError, setShareError] = useState<string | null>(null)
  const router = useRouter()
  
  const form = useForm<CalculatorValues>({
    resolver: zodResolver(calculatorSchema),
    defaultValues: {
      industry: "ecommerce",
      monthlyVisitors: 5000,
      conversionRate: 2,
      averageOrderValue: 75,
      marketingBudget: 2500
    },
  })

  function onSubmit(data: CalculatorValues) {
    // Calculate results based on inputs
    const monthlyRevenue = data.monthlyVisitors * (data.conversionRate / 100) * data.averageOrderValue
    const annualRevenue = monthlyRevenue * 12
    
    // Get industry benchmarks
    const benchmark = industryBenchmarks[data.industry as keyof typeof industryBenchmarks] || industryBenchmarks.other
    
    // Calculate ROI
    const roi = (monthlyRevenue - data.marketingBudget) / data.marketingBudget * 100
    
    // Calculate SEO improvement estimates (simplified)
    const seoTrafficIncrease = data.monthlyVisitors * 0.35 // Estimate 35% increase
    const seoRevenueIncrease = seoTrafficIncrease * (data.conversionRate / 100) * data.averageOrderValue
    
    // Calculate PPC estimates
    const averageCPC = benchmark.cpc
    const estimatedClicks = data.marketingBudget * 0.7 / averageCPC // Assuming 70% of budget to PPC
    const ppcConversions = estimatedClicks * (benchmark.conversionRate / 100)
    const ppcRevenue = ppcConversions * data.averageOrderValue
    
    // Set the results
    setResults({
      monthlyRevenue: monthlyRevenue.toFixed(2),
      annualRevenue: annualRevenue.toFixed(2),
      roi: roi.toFixed(2),
      industry: data.industry,
      benchmark: benchmark,
      seo: {
        trafficIncrease: seoTrafficIncrease.toFixed(0),
        revenueIncrease: seoRevenueIncrease.toFixed(2)
      },
      ppc: {
        estimatedClicks: estimatedClicks.toFixed(0),
        conversions: ppcConversions.toFixed(0),
        revenue: ppcRevenue.toFixed(2),
        cpc: averageCPC.toFixed(2)
      }
    })
  }

  return (
    <main className="min-h-screen pt-20">
      <Navigation />
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="space-y-12">
            <div className="text-center space-y-3">
              <p className="font-label text-xs tracking-[0.2em] uppercase text-primary">Calculator</p>
              <h1 className="font-heading text-4xl font-semibold tracking-tight">Marketing ROI calculator</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Estimate return before you spend. Numbers in Kenyan shillings.
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Calculator Form */}
              <Card className="p-6 lg:p-8">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <Calculator className="h-6 w-6 text-primary" />
                    <h2 className="text-2xl font-semibold text-foreground">Enter Your Information</h2>
                  </div>
                  
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="industry"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Industry</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select your industry" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="ecommerce">E-commerce</SelectItem>
                                <SelectItem value="finance">Finance</SelectItem>
                                <SelectItem value="healthcare">Healthcare</SelectItem>
                                <SelectItem value="education">Education</SelectItem>
                                <SelectItem value="real-estate">Real Estate</SelectItem>
                                <SelectItem value="travel">Travel & Hospitality</SelectItem>
                                <SelectItem value="technology">Technology</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              Selecting your industry provides more accurate benchmarks.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="monthlyVisitors"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Monthly Website Visitors</FormLabel>
                            <FormControl>
                              <Input type="number" {...field} />
                            </FormControl>
                            <FormDescription>
                              The average number of visitors to your website each month.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="conversionRate"
                        render={({ field: { value, onChange, ...field } }) => (
                          <FormItem>
                            <div className="flex justify-between items-center">
                              <FormLabel>Conversion Rate (%)</FormLabel>
                              <span className="text-sm font-medium">{value}%</span>
                            </div>
                            <FormControl>
                              <Slider
                                min={0}
                                max={10}
                                step={0.1}
                                value={[value]}
                                onValueChange={values => onChange(values[0])}
                              />
                            </FormControl>
                            <FormDescription>
                              The percentage of visitors who complete a desired action.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="averageOrderValue"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Average Order Value (KSh)</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input type="number" {...field} />
                              </div>
                            </FormControl>
                            <FormDescription>
                              The average value of each conversion or sale.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="marketingBudget"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Monthly Marketing Budget (KSh)</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input type="number" {...field} />
                              </div>
                            </FormControl>
                            <FormDescription>
                              Your planned monthly spending on digital marketing.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button type="submit" className="w-full" size="lg">
                        Calculate Results
                      </Button>
                    </form>
                  </Form>
                </div>
              </Card>
              
              {/* Results */}
              <div className="space-y-6">
                {results ? (
                  <div className="space-y-6">
                    <Card className="p-6 lg:p-8">
                      <div className="space-y-6">
                        <div className="flex items-center gap-3">
                          <BarChart className="h-6 w-6 text-primary" />
                          <h2 className="text-2xl font-semibold text-foreground">Your Results</h2>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-4 bg-muted/50 rounded-lg text-center">
                            <div className="text-sm text-muted-foreground">Monthly Revenue</div>
                            <div className="text-2xl font-bold text-foreground">KSh {results.monthlyRevenue}</div>
                          </div>
                          <div className="p-4 bg-muted/50 rounded-lg text-center">
                            <div className="text-sm text-muted-foreground">Annual Revenue</div>
                            <div className="text-2xl font-bold text-foreground">KSh {results.annualRevenue}</div>
                          </div>
                          <div className="p-4 bg-primary/10 rounded-lg text-center col-span-2">
                            <div className="text-sm text-muted-foreground">Estimated ROI</div>
                            <div className="text-2xl font-bold text-primary">{results.roi}%</div>
                          </div>
                        </div>
                        
                        <Tabs value={activeTab} onValueChange={setActiveTab}>
                          <TabsList className="grid grid-cols-2">
                            <TabsTrigger value="roi">ROI Analysis</TabsTrigger>
                            <TabsTrigger value="channels">Marketing Channels</TabsTrigger>
                          </TabsList>
                          <TabsContent value="roi" className="pt-4 space-y-4">
                            <div className="flex items-center justify-between pb-2 border-b">
                              <div className="font-medium">Your Conversion Rate</div>
                              <div>{form.getValues().conversionRate}%</div>
                            </div>
                            <div className="flex items-center justify-between pb-2 border-b">
                              <div className="font-medium">Industry Benchmark</div>
                              <div>{results.benchmark.conversionRate}%</div>
                            </div>
                            <div className="flex items-center justify-between pb-2 border-b">
                              <div className="font-medium">Your Monthly Marketing Budget</div>
                              <div>KSh {form.getValues().marketingBudget}</div>
                            </div>
                            <div className="flex items-center justify-between pb-2 border-b">
                              <div className="font-medium">Industry Avg. ROI</div>
                              <div>{results.benchmark.roi}x</div>
                            </div>
                            <div className="pt-2">
                              <p className="text-sm text-muted-foreground">
                                {Number(results.roi) > results.benchmark.roi * 100 ? 
                                  "Your estimated ROI is above industry average. Your marketing strategy is performing well!" : 
                                  "Your estimated ROI is below industry average. Consider optimizing your marketing strategy."}
                              </p>
                            </div>
                          </TabsContent>
                          <TabsContent value="channels" className="pt-4">
                            <div className="space-y-4">
                              <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                                <div className="flex items-center gap-2">
                                  <TrendingUp className="h-5 w-5 text-primary" />
                                  <h3 className="font-semibold">SEO Potential</h3>
                                </div>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">Traffic Increase:</span>
                                    <span className="font-medium">{results.seo.trafficIncrease} visitors</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">Revenue Increase:</span>
                                    <span className="font-medium">KSh {results.seo.revenueIncrease}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                                <div className="flex items-center gap-2">
                                  <Target className="h-5 w-5 text-primary" />
                                  <h3 className="font-semibold">PPC Potential</h3>
                                </div>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">Estimated Clicks:</span>
                                    <span className="font-medium">{results.ppc.estimatedClicks}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">Avg. CPC:</span>
                                    <span className="font-medium">KSh {results.ppc.cpc}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">Conversions:</span>
                                    <span className="font-medium">{results.ppc.conversions}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">Revenue:</span>
                                    <span className="font-medium">KSh {results.ppc.revenue}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </TabsContent>
                        </Tabs>
                      </div>
                    </Card>
                    
                    {shareUrl && (
                      <Alert className="mb-4">
                        <AlertTitle className="flex items-center gap-2">
                          <Share2 className="h-4 w-4" />
                          Share your results
                        </AlertTitle>
                        <AlertDescription className="mt-2">
                          <p className="mb-2 text-muted-foreground text-sm break-all">{shareUrl}</p>
                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => {
                                navigator.clipboard.writeText(shareUrl);
                                alert('Link copied to clipboard!');
                              }}
                            >
                              Copy Link
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => router.push(shareUrl)}
                            >
                              View Shared Page
                            </Button>
                          </div>
                        </AlertDescription>
                      </Alert>
                    )}
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={isSharing}
                        onClick={async () => {
                          try {
                            setIsSharing(true);
                            setShareError(null);
                            
                            const response = await fetch('/api/calculator', {
                              method: 'POST',
                              headers: {
                                'Content-Type': 'application/json',
                              },
                              body: JSON.stringify({
                                results,
                                inputs: form.getValues(),
                              }),
                            });
                            
                            const data = await response.json();
                            
                            if (data.success) {
                              setShareUrl(data.shareUrl);
                            } else {
                              setShareError("Failed to generate share link");
                            }
                          } catch (error) {
                            setShareError("Error creating share link");
                            console.error("Share error:", error);
                          } finally {
                            setIsSharing(false);
                          }
                        }}
                      >
                        <Share2 className="h-4 w-4 mr-1" /> 
                        {isSharing ? 'Creating link...' : 'Share Results'}
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                      >
                        <Download className="h-4 w-4 mr-1" /> Download Report
                      </Button>
                    </div>
                    
                    {shareError && (
                      <Alert variant="destructive" className="mb-4">
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{shareError}</AlertDescription>
                      </Alert>
                    )}
                    
                    <Card className="p-6 bg-muted/50">
                      <div className="text-center space-y-4">
                        <h3 className="font-semibold text-lg">Want a detailed analysis?</h3>
                        <p className="text-muted-foreground text-sm">
                          Our team of marketing experts can provide a personalized analysis
                          of your business and create a tailored strategy to maximize your ROI.
                        </p>
                        <Button asChild>
                          <Link href="/contact">Book a free call</Link>
                        </Button>
                      </div>
                    </Card>
                  </div>
                ) : (
                  <Card className="p-6 lg:p-8 h-full flex flex-col justify-center items-center text-center">
                    <div className="space-y-4">
                      <div className="h-16 w-16 rounded-full bg-primary/10 mx-auto flex items-center justify-center">
                        <Calculator className="h-8 w-8 text-primary" />
                      </div>
                      <h2 className="text-xl font-semibold text-foreground">Results will appear here</h2>
                      <p className="text-muted-foreground max-w-md">
                        Fill out the form with your information and click "Calculate Results" to see your 
                        projected marketing performance and ROI.
                      </p>
                    </div>
                  </Card>
                )}
              </div>
            </div>
            
            <div className="text-center space-y-6 pt-8">
              <h2 className="text-2xl font-bold text-foreground">Ready to maximize your marketing ROI?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our team of digital marketing experts can help you develop and implement strategies 
                that deliver real results and a strong return on investment.
              </p>
              <Button size="lg" asChild>
                <Link href="/contact">Book a free call</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}