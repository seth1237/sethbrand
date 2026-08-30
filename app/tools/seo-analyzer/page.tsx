"use client"

import { useState } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Navigation } from '@/components/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

const schema = z.object({
  url: z.string().url('Please enter a valid URL starting with https://'),
})

type Values = z.infer<typeof schema>

export default function SeoAnalyzerLite() {
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { url: '' },
  })

  async function onSubmit(values: Values) {
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || ""
      const res = await fetch(`${apiUrl}/api/tools/seo-analyzer?url=${encodeURIComponent(values.url)}`)
      if (!res.ok) throw new Error('Unable to analyze the URL')
      const data = await res.json()
      setResult(data)
    } catch (e: any) {
      setError(e.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen pt-20">
      <Navigation />
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl space-y-8">
          <header className="space-y-2 text-center">
            <p className="font-label text-xs tracking-[0.2em] uppercase text-primary">Tool</p>
            <h1 className="font-heading text-3xl font-semibold tracking-tight">SEO Analyzer</h1>
            <p className="text-muted-foreground">Check a page for basic on-page SEO signals.</p>
          </header>

          <Card className="p-6 space-y-4">
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-3 flex-col sm:flex-row">
              <Input placeholder="https://example.com/page" {...form.register('url')} />
              <Button type="submit" disabled={loading}>{loading ? 'Analyzing…' : 'Analyze'}</Button>
            </form>
          </Card>

          {error && (
            <Alert variant="destructive">
              <AlertTitle>Analysis failed</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {result && (
            <Card className="p-6 space-y-3">
              <h2 className="text-xl font-semibold">Results</h2>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-muted-foreground">Title</div>
                  <div className="font-medium">{result.title || '—'}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Meta Description</div>
                  <div className="font-medium">{result.description || '—'}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Canonical</div>
                  <div className="font-medium break-all">{result.canonical || '—'}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Robots</div>
                  <div className="font-medium">{result.robots || '—'}</div>
                </div>
                <div className="sm:col-span-2">
                  <div className="text-muted-foreground">Headings (H1–H3)</div>
                  <ul className="list-disc pl-5">
                    {(result.headings || []).map((h: any, i: number) => (
                      <li key={i}><span className="text-muted-foreground">{h.tag}:</span> {h.text}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          )}
        </div>
      </section>
    </main>
  )
}
