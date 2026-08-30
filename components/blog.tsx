"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import { SlideIn, StaggerContainer, StaggerItem } from "./animations"

// Sample blog posts data
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
]

export function Blog() {
  return (
    <section id="blog" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="space-y-12">
          <SlideIn>
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Latest Insights</h2>
              <div className="w-20 h-1 bg-primary"></div>
              <p className="text-muted-foreground max-w-2xl">
                Thoughts, ideas, and knowledge sharing on web development, SEO, digital marketing, and graphic design.
              </p>
            </div>
          </SlideIn>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <StaggerItem key={post.id}>
                <Card className="h-full overflow-hidden border-border hover:border-primary transition-colors duration-300">
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
              </StaggerItem>
            ))}
          </StaggerContainer>

          <div className="text-center pt-8">
            <Button size="lg">
              View All Posts
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}