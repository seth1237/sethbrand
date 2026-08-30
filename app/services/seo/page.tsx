import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, Check, BarChart3, Search, Settings, LineChart } from "lucide-react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"

export default function SEOService() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-20">
        <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-12 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-8 space-y-12">
              {/* Hero */}
              <div className="space-y-4">
                <p className="font-label text-xs tracking-[0.2em] uppercase text-primary">SEO</p>
                <h1 className="font-heading text-4xl sm:text-5xl font-semibold text-foreground leading-tight tracking-tight">
                  Search Engine Optimization
                </h1>
                <p className="text-xl text-muted-foreground">
                  Get found when Kenyan customers search for what you sell.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" asChild>
                    <Link href="/contact">
                      Get a Free SEO Audit
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link href="/contact">
                      Schedule a Consultation
                    </Link>
                  </Button>
                </div>
              </div>
              
              {/* Introduction */}
              <div className="prose dark:prose-invert max-w-none">
                <p>
                  In today's competitive digital landscape, having a strong search engine presence is crucial. Our SEO services 
                  are designed to help your business gain visibility in search results, drive organic traffic, and 
                  increase conversions through strategic optimization techniques.
                </p>
                <p>
                  Whether you're looking to improve local visibility, boost e-commerce sales, or establish industry 
                  authority through content, our comprehensive SEO solutions will help you achieve your goals with 
                  measurable results.
                </p>
              </div>
              
              {/* Our Approach */}
              <div className="space-y-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Our SEO Approach</h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  <Card className="p-6 space-y-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Search className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">Research & Analysis</h3>
                    <p className="text-muted-foreground">
                      We start by conducting thorough research of your industry, competitors, and target keywords to develop a 
                      data-driven SEO strategy tailored to your business goals.
                    </p>
                  </Card>
                  
                  <Card className="p-6 space-y-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Settings className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">Technical Optimization</h3>
                    <p className="text-muted-foreground">
                      We ensure your website's technical foundation is solid by addressing issues like site speed, mobile-friendliness, 
                      crawlability, and indexing to provide the best user experience.
                    </p>
                  </Card>
                  
                  <Card className="p-6 space-y-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <BarChart3 className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">On-Page Optimization</h3>
                    <p className="text-muted-foreground">
                      We optimize your content, meta tags, headings, and internal linking structure to make your pages more relevant 
                      for target keywords and improve user engagement.
                    </p>
                  </Card>
                  
                  <Card className="p-6 space-y-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <LineChart className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">Ongoing Optimization</h3>
                    <p className="text-muted-foreground">
                      SEO is not a one-time effort. We continuously monitor performance, make data-driven adjustments, and 
                      keep up with algorithm changes to maintain and improve your results.
                    </p>
                  </Card>
                </div>
              </div>
              
              {/* Services */}
              <div className="space-y-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Our SEO Services</h2>
                <div className="space-y-6">
                  <Card className="p-6 space-y-4">
                    <h3 className="text-xl font-semibold text-foreground">Comprehensive SEO Audit</h3>
                    <p className="text-muted-foreground">
                      Our thorough audit identifies technical issues, content gaps, and opportunities for improvement in your current SEO 
                      strategy. You'll receive a detailed report with actionable recommendations.
                    </p>
                    <ul className="grid sm:grid-cols-2 gap-2 pt-2">
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-primary shrink-0 mr-2" />
                        <span>Technical SEO analysis</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-primary shrink-0 mr-2" />
                        <span>Competitor analysis</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-primary shrink-0 mr-2" />
                        <span>Keyword opportunity research</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-primary shrink-0 mr-2" />
                        <span>Content quality assessment</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-primary shrink-0 mr-2" />
                        <span>Backlink profile analysis</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-primary shrink-0 mr-2" />
                        <span>Mobile usability check</span>
                      </li>
                    </ul>
                  </Card>
                  
                  <Card className="p-6 space-y-4">
                    <h3 className="text-xl font-semibold text-foreground">Local SEO</h3>
                    <p className="text-muted-foreground">
                      Dominate local search results and attract more customers from your service area with our local SEO services.
                    </p>
                    <ul className="grid sm:grid-cols-2 gap-2 pt-2">
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-primary shrink-0 mr-2" />
                        <span>Google Business Profile optimization</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-primary shrink-0 mr-2" />
                        <span>Local citation building</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-primary shrink-0 mr-2" />
                        <span>Local keyword targeting</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-primary shrink-0 mr-2" />
                        <span>Review management</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-primary shrink-0 mr-2" />
                        <span>Localized content creation</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-primary shrink-0 mr-2" />
                        <span>Competitive local analysis</span>
                      </li>
                    </ul>
                  </Card>
                  
                  <Card className="p-6 space-y-4">
                    <h3 className="text-xl font-semibold text-foreground">Content & Link Building</h3>
                    <p className="text-muted-foreground">
                      Establish your site's authority with high-quality content and strategic backlink acquisition.
                    </p>
                    <ul className="grid sm:grid-cols-2 gap-2 pt-2">
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-primary shrink-0 mr-2" />
                        <span>Content gap analysis</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-primary shrink-0 mr-2" />
                        <span>SEO content creation</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-primary shrink-0 mr-2" />
                        <span>Content optimization</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-primary shrink-0 mr-2" />
                        <span>Quality link building</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-primary shrink-0 mr-2" />
                        <span>Digital PR strategies</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-primary shrink-0 mr-2" />
                        <span>Internal linking optimization</span>
                      </li>
                    </ul>
                  </Card>
                </div>
              </div>
              
              {/* Case Study */}
              <div className="space-y-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Case Study</h2>
                <Card className="overflow-hidden">
                  <div className="aspect-video w-full">
                    <img 
                      src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5" 
                      alt="Dental Practice SEO Case Study" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 space-y-4">
                    <h3 className="text-xl font-semibold text-foreground">Dental Practice Increases New Patients by 156%</h3>
                    <p className="text-muted-foreground">
                      A local dental practice struggling with online visibility implemented our comprehensive Local SEO strategy. 
                      Within just 3 months, they saw dramatic improvements in search visibility and patient acquisition.
                    </p>
                    <div className="grid grid-cols-3 gap-4 pt-2">
                      <div className="text-center p-4 bg-muted/50 rounded-lg">
                        <div className="text-2xl font-bold text-primary">250%</div>
                        <div className="text-sm text-muted-foreground">Increase in organic traffic</div>
                      </div>
                      <div className="text-center p-4 bg-muted/50 rounded-lg">
                        <div className="text-2xl font-bold text-primary">Top 3</div>
                        <div className="text-sm text-muted-foreground">Rankings for 28 keywords</div>
                      </div>
                      <div className="text-center p-4 bg-muted/50 rounded-lg">
                        <div className="text-2xl font-bold text-primary">156</div>
                        <div className="text-sm text-muted-foreground">New patient inquiries</div>
                      </div>
                    </div>
                    <div className="pt-2">
                      <Button variant="outline" className="group" asChild>
                        <Link href="/case-studies/dental-practice-local-seo">
                          Read Full Case Study
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
              
              {/* CTA */}
              <div className="bg-muted/50 rounded-lg p-8 text-center">
                <h2 className="text-2xl font-bold text-foreground mb-4">Ready to Improve Your Search Rankings?</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
                  Get a complimentary SEO audit and discover how our strategies can help your business grow online.
                </p>
                <Button size="lg" asChild>
                  <Link href="/contact">
                    Request Your Free SEO Audit
                  </Link>
                </Button>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Our SEO Services</h3>
                <nav className="space-y-2">
                  <Link href="/services/seo" className="flex items-center py-2 px-3 bg-primary/10 text-primary rounded-md">
                    Search Engine Optimization
                  </Link>
                  <Link href="/services/local-seo" className="flex items-center py-2 px-3 hover:bg-muted transition-colors rounded-md">
                    Local SEO
                  </Link>
                  <Link href="/services/ecommerce-seo" className="flex items-center py-2 px-3 hover:bg-muted transition-colors rounded-md">
                    E-commerce SEO
                  </Link>
                  <Link href="/services/content-marketing" className="flex items-center py-2 px-3 hover:bg-muted transition-colors rounded-md">
                    Content Marketing
                  </Link>
                  <Link href="/services/technical-seo" className="flex items-center py-2 px-3 hover:bg-muted transition-colors rounded-md">
                    Technical SEO
                  </Link>
                </nav>
              </Card>
              
              <Card className="p-6 space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Why Choose Our SEO Services?</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary shrink-0 mr-2" />
                    <span className="text-muted-foreground">Data-driven strategies with measurable results</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary shrink-0 mr-2" />
                    <span className="text-muted-foreground">Transparent reporting and communication</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary shrink-0 mr-2" />
                    <span className="text-muted-foreground">Customized approach for your industry and goals</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary shrink-0 mr-2" />
                    <span className="text-muted-foreground">White-hat techniques for sustainable growth</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary shrink-0 mr-2" />
                    <span className="text-muted-foreground">Experienced team of SEO specialists</span>
                  </li>
                </ul>
              </Card>
              
              <Card className="p-6 space-y-4 bg-primary text-primary-foreground">
                <h3 className="text-lg font-semibold">Get a Free SEO Consultation</h3>
                <p className="text-primary-foreground/80">
                  Speak with our SEO experts to discover how we can help improve your search rankings and drive more qualified traffic.
                </p>
                <Button variant="secondary" className="w-full" asChild>
                  <Link href="/contact">
                    Schedule Now
                  </Link>
                </Button>
              </Card>
              
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Related Resources</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="h-12 w-12 rounded bg-muted shrink-0"></div>
                    <div>
                      <Link href="/blog/seo-best-practices-2025" className="font-medium hover:text-primary">
                        10 Essential SEO Strategies for 2025
                      </Link>
                      <p className="text-xs text-muted-foreground mt-1">October 8, 2025</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-12 w-12 rounded bg-muted shrink-0"></div>
                    <div>
                      <Link href="/blog/local-seo-guide" className="font-medium hover:text-primary">
                        The Ultimate Guide to Local SEO
                      </Link>
                      <p className="text-xs text-muted-foreground mt-1">September 15, 2025</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-12 w-12 rounded bg-muted shrink-0"></div>
                    <div>
                      <Link href="/blog/technical-seo-checklist" className="font-medium hover:text-primary">
                        Technical SEO Checklist for 2025
                      </Link>
                      <p className="text-xs text-muted-foreground mt-1">August 22, 2025</p>
                    </div>
                  </div>
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