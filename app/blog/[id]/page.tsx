import { notFound } from "next/navigation"
import { Navigation } from "@/components/navigation"

// This would typically come from a database or CMS
const blogPosts = [
  {
    id: 1,
    title: "10 Essential SEO Strategies for 2025",
    excerpt: "Discover the latest search engine optimization techniques that will boost your website's visibility in 2025.",
    date: "October 8, 2025",
    category: "SEO",
    imageUrl: "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    content: `
      <p>Search Engine Optimization (SEO) continues to evolve rapidly as search algorithms become more sophisticated. In 2025, staying ahead requires adapting to new trends and technologies.</p>
      
      <h2>1. AI-Driven Content Optimization</h2>
      <p>Artificial intelligence tools can now analyze top-performing content and provide actionable insights for optimization. These tools help identify content gaps, suggest improvements, and predict how changes might affect rankings.</p>
      
      <h2>2. Voice Search Optimization</h2>
      <p>With the continued growth of smart speakers and voice assistants, optimizing for conversational queries is essential. Focus on natural language patterns and question-based keywords that match how people speak rather than type.</p>
      
      <h2>3. Mobile-First Indexing</h2>
      <p>Google now predominantly uses the mobile version of content for indexing and ranking. Ensure your site is fully responsive, loads quickly on mobile devices, and offers an excellent user experience regardless of screen size.</p>
      
      <h2>4. Core Web Vitals</h2>
      <p>User experience metrics like loading performance, interactivity, and visual stability are now key ranking factors. Monitor and optimize your Core Web Vitals to ensure your site meets these important benchmarks.</p>
      
      <h2>5. E-A-T Principles</h2>
      <p>Expertise, Authoritativeness, and Trustworthiness continue to gain importance. Establish your credentials, obtain quality backlinks, and provide accurate, well-researched content to build trust with both users and search engines.</p>
    `,
  },
  {
    id: 2,
    title: "The Future of Web Development with AI Integration",
    excerpt: "Explore how artificial intelligence is transforming web development practices and creating new possibilities.",
    date: "September 27, 2025",
    category: "Web Development",
    imageUrl: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    content: `
      <p>Artificial intelligence is revolutionizing how websites are built, optimized, and maintained. The integration of AI into web development workflows is creating unprecedented opportunities and efficiencies.</p>
      
      <h2>AI-Assisted Coding</h2>
      <p>Advanced code completion tools can now understand context and suggest entire functions or components. This technology accelerates development and helps maintain consistency across large codebases.</p>
      
      <h2>Automated Testing and Debugging</h2>
      <p>AI systems can now generate comprehensive test cases, identify potential bugs before deployment, and even suggest fixes for common issues, reducing the QA burden on development teams.</p>
      
      <h2>Personalized User Experiences</h2>
      <p>Machine learning algorithms analyze user behavior to dynamically adjust content, layouts, and functionality based on individual preferences and needs, creating truly personalized web experiences.</p>
    `,
  },
  {
    id: 3,
    title: "Creating Effective Digital Marketing Campaigns",
    excerpt: "Learn how to design and implement digital marketing strategies that convert visitors into customers.",
    date: "September 15, 2025",
    category: "Digital Marketing",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    content: `
      <p>Effective digital marketing campaigns require careful planning, execution, and analysis. Here's how to create campaigns that resonate with your audience and drive meaningful conversions.</p>
      
      <h2>Audience Research</h2>
      <p>Understanding your target audience is the foundation of any successful campaign. Develop detailed personas that include demographics, behaviors, pain points, and goals to guide your messaging and channel selection.</p>
      
      <h2>Clear Goals and KPIs</h2>
      <p>Define specific, measurable objectives for your campaign. Whether you're aiming for brand awareness, lead generation, or direct sales, establishing key performance indicators helps track progress and demonstrate ROI.</p>
      
      <h2>Compelling Content Creation</h2>
      <p>Develop content that addresses your audience's needs while showcasing your unique value proposition. Use diverse formats—videos, blogs, infographics, case studies—to engage different segments of your audience.</p>
      
      <h2>Multi-Channel Approach</h2>
      <p>Leverage a mix of owned, earned, and paid media to maximize reach. Coordinate messaging across email, social media, search advertising, and content marketing for a cohesive brand experience.</p>
    `,
  }
]

export async function generateStaticParams() {
  return blogPosts.map(post => ({
    id: post.id.toString(),
  }))
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const post = blogPosts.find(post => post.id === parseInt(params.id))
  
  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.'
    }
  }
  
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${params.id}` },
  }
}

export default function BlogPost({ params }: { params: { id: string } }) {
  const post = blogPosts.find(post => post.id === parseInt(params.id))
  
  if (!post) {
    notFound()
  }
  
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: "Seth Makori",
    },
  }

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "/" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "/blog" },
      { "@type": "ListItem", position: 3, name: post.title, item: `/blog/${params.id}` },
    ],
  }

  return (
    <main className="min-h-screen pt-16">
      <Navigation />
      <article className="container mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
        <div className="space-y-8">
          {/* Header */}
          <header className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium px-2.5 py-0.5 rounded bg-primary/10 text-primary">
                {post.category}
              </span>
              <span className="text-sm text-muted-foreground">{post.date}</span>
            </div>
            
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground text-balance">
              {post.title}
            </h1>
          </header>
          
          {/* Featured Image */}
          <div className="rounded-lg overflow-hidden">
            <img 
              src={post.imageUrl} 
              alt={post.title} 
              className="w-full h-auto aspect-video object-cover"
            />
          </div>
          
          {/* Content */}
          <div 
            className="prose dark:prose-invert prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          
          {/* Footer */}
          <div className="pt-8 border-t border-border">
            <div className="flex justify-between items-center">
              <a href="/blog" className="text-primary hover:underline">
                &larr; Back to Blog
              </a>
              <div className="flex items-center gap-4">
                {/* Share buttons could go here */}
              </div>
            </div>
          </div>
        </div>
      </article>
    </main>
  )
}