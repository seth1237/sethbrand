import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import { Navigation } from "@/components/navigation"

// Same blog posts data as in the Blog component
const blogPosts = [
  {
    id: 1,
    title: "10 Essential SEO Strategies for 2025",
    excerpt: "Discover the latest search engine optimization techniques that will boost your website's visibility in 2025.",
    date: "October 8, 2025",
    category: "SEO",
    imageUrl: "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "The Future of Web Development with AI Integration",
    excerpt: "Explore how artificial intelligence is transforming web development practices and creating new possibilities.",
    date: "September 27, 2025",
    category: "Web Development",
    imageUrl: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "Creating Effective Digital Marketing Campaigns",
    excerpt: "Learn how to design and implement digital marketing strategies that convert visitors into customers.",
    date: "September 15, 2025",
    category: "Digital Marketing",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    title: "Modern Graphic Design Trends for Brand Identity",
    excerpt: "Stay current with the latest graphic design trends that can elevate your brand's visual identity and recognition.",
    date: "August 30, 2025",
    category: "Graphic Design",
    imageUrl: "https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    title: "Ethical Considerations in AI Development",
    excerpt: "Exploring the ethical implications and responsibilities when developing and implementing AI solutions.",
    date: "August 15, 2025",
    category: "AI",
    imageUrl: "https://images.unsplash.com/photo-1677442135747-20340c5cb2a6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    title: "Optimizing Website Performance for Better Conversions",
    excerpt: "Learn how improving your website's speed and performance can directly impact conversion rates and user engagement.",
    date: "August 2, 2025",
    category: "Web Development",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
  },
]

export const metadata = {
  title: "Blog | Seth Makori",
  description: "Insights and articles on web development, SEO, digital marketing, and graphic design by Seth Makori.",
  alternates: { canonical: "/blog" },
}

export default function BlogPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      
      <section className="py-20 px-4 sm:px-6 lg:px-8 pt-24">
        <div className="container mx-auto max-w-6xl">
          <div className="space-y-12">
            <div className="space-y-3">
              <p className="font-label text-xs tracking-[0.2em] uppercase text-primary">Blog</p>
              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">Notes on web, SEO, and marketing</h1>
              <p className="text-muted-foreground max-w-2xl">
                Practical writing for Kenyan businesses growing online.
              </p>
            </div>

            {/* Filter categories would go here */}
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <Card key={post.id} className="h-full overflow-hidden border-border hover:border-primary transition-colors duration-300">
                  <div className="aspect-video w-full overflow-hidden">
                    <img 
                      src={post.imageUrl} 
                      alt={post.title} 
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                    />
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium px-2.5 py-0.5 rounded bg-primary/10 text-primary">
                        {post.category}
                      </span>
                      <span className="text-xs text-muted-foreground">{post.date}</span>
                    </div>
                    
                    <h3 className="font-semibold text-xl text-foreground">{post.title}</h3>
                    
                    <p className="text-sm text-muted-foreground">{post.excerpt}</p>
                    
                    <Button variant="ghost" className="group p-0 h-auto" asChild>
                      <a href={`/blog/${post.id}`}>
                        Read More 
                        <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </a>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}