"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, LineChart, Share2, Download, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"

export default function SharedCalculatorResults({ params }: { params: { id: string } }) {
  const [results, setResults] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("roi")

  // Fetch the calculator results from our API
  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/calculator/${params.id}`);
        
        if (!response.ok) {
          throw new Error(`Error fetching calculator results: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        if (!data.success) {
          throw new Error(data.message || "Failed to retrieve calculator results");
        }
        
        setResults(data.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching calculator results:", err);
        setError("Unable to load the calculator results. The results may have expired or the link is invalid.");
        setLoading(false);
      }
    };
    
    fetchResults();
  }, [params.id]);

  const handleShareClick = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Marketing ROI Calculator Results',
        text: 'Check out my marketing ROI analysis!',
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  if (loading) {
    return (
      <>
        <Navigation />
        <main className="min-h-screen pt-20">
          <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-6xl">
            <div className="space-y-8">
              <Skeleton className="h-12 w-2/3 mx-auto" />
              <Skeleton className="h-6 w-1/2 mx-auto" />
              
              <div className="grid lg:grid-cols-2 gap-8">
                <Card className="p-6 lg:p-8">
                  <Skeleton className="h-8 w-2/3 mb-6" />
                  <div className="space-y-6">
                    <Skeleton className="h-24 w-full" />
                    <Skeleton className="h-24 w-full" />
                    <Skeleton className="h-24 w-full" />
                  </div>
                </Card>
                
                <Card className="p-6 lg:p-8">
                  <Skeleton className="h-8 w-2/3 mb-6" />
                  <div className="space-y-6">
                    <Skeleton className="h-32 w-full" />
                    <Skeleton className="h-40 w-full" />
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      </>
    )
  }

  if (error) {
    return (
      <>
        <Navigation />
        <main className="min-h-screen pt-20">
          <section className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="container mx-auto max-w-6xl">
              <Card className="p-8 text-center">
                <h2 className="text-2xl font-bold text-foreground mb-4">Error Loading Results</h2>
                <p className="text-muted-foreground mb-6">{error}</p>
                <Button asChild>
                  <Link href="/tools/marketing-calculator">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Calculator
                  </Link>
                </Button>
              </Card>
            </div>
          </section>
        </main>
      </>
    )
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-20">
        <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="space-y-12">
            <div className="text-center space-y-3">
              <p className="font-label text-xs tracking-[0.2em] uppercase text-primary">Shared result</p>
              <h1 className="font-heading text-4xl font-semibold tracking-tight">Marketing ROI analysis</h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Shared results from our Marketing ROI Calculator
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Inputs Summary */}
              <Card className="p-6 lg:p-8">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <LineChart className="h-6 w-6 text-primary" />
                    <h2 className="text-2xl font-semibold text-foreground">Calculator Inputs</h2>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between pb-2 border-b">
                      <div className="font-medium">Industry</div>
                      <div className="capitalize">{results?.inputs?.industry?.replace("-", " ") || "N/A"}</div>
                    </div>
                    <div className="flex justify-between pb-2 border-b">
                      <div className="font-medium">Monthly Website Visitors</div>
                      <div>{results?.inputs?.monthlyVisitors?.toLocaleString() || "N/A"}</div>
                    </div>
                    <div className="flex justify-between pb-2 border-b">
                      <div className="font-medium">Conversion Rate</div>
                      <div>{results?.inputs?.conversionRate || "N/A"}%</div>
                    </div>
                    <div className="flex justify-between pb-2 border-b">
                      <div className="font-medium">Average Order Value</div>
                      <div>KSh {results?.inputs?.averageOrderValue || "N/A"}</div>
                    </div>
                    <div className="flex justify-between pb-2 border-b">
                      <div className="font-medium">Monthly Marketing Budget</div>
                      <div>KSh {results?.inputs?.marketingBudget?.toLocaleString() || "N/A"}</div>
                    </div>
                  </div>
                </div>
              </Card>
              
              {/* Results */}
              <Card className="p-6 lg:p-8">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <BarChart className="h-6 w-6 text-primary" />
                    <h2 className="text-2xl font-semibold text-foreground">Results</h2>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-muted/50 rounded-lg text-center">
                      <div className="text-sm text-muted-foreground">Monthly Revenue</div>
                      <div className="text-2xl font-bold text-foreground">KSh {results?.monthlyRevenue || "N/A"}</div>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg text-center">
                      <div className="text-sm text-muted-foreground">Annual Revenue</div>
                      <div className="text-2xl font-bold text-foreground">KSh {results?.annualRevenue || "N/A"}</div>
                    </div>
                    <div className="p-4 bg-primary/10 rounded-lg text-center col-span-2">
                      <div className="text-sm text-muted-foreground">Estimated ROI</div>
                      <div className="text-2xl font-bold text-primary">{results?.roi || "N/A"}%</div>
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
                        <div>{results?.inputs?.conversionRate || "N/A"}%</div>
                      </div>
                      <div className="flex items-center justify-between pb-2 border-b">
                        <div className="font-medium">Industry Benchmark</div>
                        <div>{results?.benchmark?.conversionRate || "N/A"}%</div>
                      </div>
                      <div className="flex items-center justify-between pb-2 border-b">
                        <div className="font-medium">Your Monthly Marketing Budget</div>
                        <div>KSh {results?.inputs?.marketingBudget || "N/A"}</div>
                      </div>
                      <div className="flex items-center justify-between pb-2 border-b">
                        <div className="font-medium">Industry Avg. ROI</div>
                        <div>{results?.benchmark?.roi || "N/A"}x</div>
                      </div>
                      <div className="pt-2">
                        <p className="text-sm text-muted-foreground">
                          {results?.roi && results?.benchmark?.roi && Number(results.roi) > results.benchmark.roi * 100 ? 
                            "Your estimated ROI is above industry average. Your marketing strategy is performing well!" : 
                            "Your estimated ROI is below industry average. Consider optimizing your marketing strategy."}
                        </p>
                      </div>
                    </TabsContent>
                    <TabsContent value="channels" className="pt-4">
                      <div className="space-y-4">
                        <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="font-semibold">SEO Potential</div>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Traffic Increase:</span>
                              <span className="font-medium">{results?.seo?.trafficIncrease || "N/A"} visitors</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Revenue Increase:</span>
                              <span className="font-medium">KSh {results?.seo?.revenueIncrease || "N/A"}</span>
                            </div>
                          </div>
                        </div>
                        <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="font-semibold">PPC Potential</div>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Estimated Clicks:</span>
                              <span className="font-medium">{results?.ppc?.estimatedClicks || "N/A"}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Avg. CPC:</span>
                              <span className="font-medium">KSh {results?.ppc?.cpc || "N/A"}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Conversions:</span>
                              <span className="font-medium">{results?.ppc?.conversions || "N/A"}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Revenue:</span>
                              <span className="font-medium">KSh {results?.ppc?.revenue || "N/A"}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </Card>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={handleShareClick} className="flex items-center gap-2">
                <Share2 className="h-4 w-4" /> Share Results
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Download className="h-4 w-4" /> Download Report
              </Button>
              <Button variant="secondary" asChild>
                <Link href="/tools/marketing-calculator">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back to Calculator
                </Link>
              </Button>
            </div>
            
            <div className="bg-muted/30 rounded-lg p-8 text-center space-y-6">
              <h2 className="text-2xl font-bold text-foreground">Want to maximize your marketing ROI?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our team of digital marketing experts can help you develop and implement strategies 
                that deliver real results and a strong return on investment.
              </p>
              <Button size="lg" asChild>
                <Link href="/#contact">Contact Our Team</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
    </>
  )
}