"use client"

import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { PosterItem, SiteItem } from "@/lib/content-defaults"

const FALLBACK_GROUPS = [
  "Poster",
  "Social Campaign",
  "Event Design",
  "Brand Identity",
  "Greeting Card",
  "Graphics",
  "Creative Work",
]

export function AdminApp() {
  const [session, setSession] = useState<{ ok: boolean; configured: boolean } | null>(null)
  const [password, setPassword] = useState("")
  const [loginError, setLoginError] = useState("")
  const [busy, setBusy] = useState(false)
  const [posters, setPosters] = useState<PosterItem[]>([])
  const [sites, setSites] = useState<SiteItem[]>([])
  const [notice, setNotice] = useState("")

  async function loadSession() {
    const res = await fetch("/api/admin/session", { cache: "no-store" })
    const data = await res.json()
    setSession(data)
    if (data.ok) await loadContent()
  }

  async function loadContent() {
    const [posterRes, siteRes] = await Promise.all([
      fetch("/api/admin/posters", { cache: "no-store" }),
      fetch("/api/admin/sites", { cache: "no-store" }),
    ])
    if (posterRes.ok) {
      const data = await posterRes.json()
      setPosters(data.posters || [])
    }
    if (siteRes.ok) {
      const data = await siteRes.json()
      setSites(data.sites || [])
    }
  }

  useEffect(() => {
    loadSession()
  }, [])

  async function login(event: React.FormEvent) {
    event.preventDefault()
    setBusy(true)
    setLoginError("")
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      })
      const data = await res.json()
      if (!res.ok) {
        setLoginError(data.error || "Could not sign in")
        return
      }
      setPassword("")
      await loadSession()
    } finally {
      setBusy(false)
    }
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" })
    setSession({ ok: false, configured: session?.configured ?? true })
    setPosters([])
    setSites([])
  }

  if (!session) {
    return <p className="text-sm text-muted-foreground">Checking access…</p>
  }

  if (!session.ok) {
    return (
      <div className="min-h-[75dvh] flex items-center">
      <form onSubmit={login} className="glass-neu rounded-2xl p-5 sm:p-8 space-y-5 max-w-md mx-auto w-full">
        <div className="space-y-1">
          <p className="font-label text-[10px] tracking-widest uppercase text-primary">Studio</p>
          <h1 className="font-heading text-2xl font-semibold">Admin</h1>
          <p className="text-sm text-muted-foreground">
            Upload posters, group them, and add websites you have built.
          </p>
        </div>
        {!session.configured && (
          <p className="text-sm text-destructive">
            Add <code className="font-label">ADMIN_PASSWORD</code> to <code className="font-label">.env.local</code>{" "}
            (at least 6 characters), then restart the server.
          </p>
        )}
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            required
          />
        </div>
        {loginError && <p className="text-sm text-destructive">{loginError}</p>}
        <Button type="submit" className="w-full min-h-11" disabled={busy || !session.configured}>
          {busy ? "Signing in…" : "Sign in"}
        </Button>
      </form>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="font-label text-[10px] tracking-widest uppercase text-primary">Studio</p>
          <h1 className="font-heading text-2xl sm:text-3xl font-semibold">Content</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Changes show on the portfolio and homepage right away.
          </p>
        </div>
        <Button variant="outline" onClick={logout}>
          Sign out
        </Button>
      </div>

      {notice && <p className="text-sm text-primary">{notice}</p>}

      <Tabs defaultValue="posters">
        <TabsList className="glass-neu h-11 w-full sm:w-fit rounded-xl">
          <TabsTrigger value="posters" className="flex-1 sm:flex-none">Posters</TabsTrigger>
          <TabsTrigger value="sites" className="flex-1 sm:flex-none">Websites</TabsTrigger>
        </TabsList>
        <TabsContent value="posters" className="mt-6">
          <PosterManager
            posters={posters}
            onChange={async (message) => {
              setNotice(message)
              await loadContent()
            }}
          />
        </TabsContent>
        <TabsContent value="sites" className="mt-6">
          <SiteManager
            sites={sites}
            onChange={async (message) => {
              setNotice(message)
              await loadContent()
            }}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function PosterManager({
  posters,
  onChange,
}: {
  posters: PosterItem[]
  onChange: (message: string) => Promise<void>
}) {
  const groups = useMemo(() => {
    const set = new Set([...FALLBACK_GROUPS, ...posters.map((item) => item.group)])
    return [...set].filter(Boolean).sort()
  }, [posters])

  const [title, setTitle] = useState("")
  const [group, setGroup] = useState("Poster")
  const [newGroup, setNewGroup] = useState("")
  const [description, setDescription] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState("")

  async function submit(event: React.FormEvent) {
    event.preventDefault()
    if (!file) {
      setError("Choose a poster image")
      return
    }
    setBusy(true)
    setError("")
    try {
      const form = new FormData()
      form.set("file", file)
      form.set("title", title)
      form.set("group", newGroup.trim() || group)
      form.set("description", description)
      const res = await fetch("/api/admin/posters", { method: "POST", body: form })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || "Could not upload")
        return
      }
      setTitle("")
      setDescription("")
      setNewGroup("")
      setFile(null)
      await onChange("Poster uploaded")
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="space-y-8">
      <form onSubmit={submit} className="glass-neu rounded-2xl p-4 sm:p-6 grid gap-4 md:grid-cols-2">
        <div className="md:col-span-2">
          <h2 className="font-heading text-lg font-semibold">Add a poster</h2>
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="poster-file">Image</Label>
          <Input
            id="poster-file"
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={(event) => setFile(event.target.files?.[0] || null)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="poster-title">Title</Label>
          <Input id="poster-title" value={title} onChange={(event) => setTitle(event.target.value)} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="poster-group">Group</Label>
          <select
            id="poster-group"
            value={group}
            onChange={(event) => setGroup(event.target.value)}
            className="glass-neu-pressed h-9 w-full rounded-xl px-3 text-sm"
          >
            {groups.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="poster-new-group">Or create a group</Label>
          <Input
            id="poster-new-group"
            placeholder="New group name"
            value={newGroup}
            onChange={(event) => setNewGroup(event.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="poster-description">Description</Label>
          <Input
            id="poster-description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>
        {error && <p className="text-sm text-destructive md:col-span-2">{error}</p>}
        <div className="md:col-span-2">
          <Button type="submit" disabled={busy}>
            {busy ? "Uploading…" : "Upload poster"}
          </Button>
        </div>
      </form>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4">
        {posters.map((poster) => (
          <PosterCard key={poster.id} poster={poster} groups={groups} onChange={onChange} />
        ))}
      </div>
    </div>
  )
}

function PosterCard({
  poster,
  groups,
  onChange,
}: {
  poster: PosterItem
  groups: string[]
  onChange: (message: string) => Promise<void>
}) {
  const [group, setGroup] = useState(poster.group)
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    setGroup(poster.group)
  }, [poster.group])

  async function changeGroup(next: string) {
    setGroup(next)
    setBusy(true)
    try {
      await fetch(`/api/admin/posters/${poster.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ group: next }),
      })
      await onChange("Group updated")
    } finally {
      setBusy(false)
    }
  }

  async function remove() {
    if (!window.confirm(`Delete “${poster.title}”?`)) return
    setBusy(true)
    try {
      await fetch(`/api/admin/posters/${poster.id}`, { method: "DELETE" })
      await onChange("Poster removed")
    } finally {
      setBusy(false)
    }
  }

  return (
    <article className="glass-neu rounded-2xl p-2 space-y-2">
      <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-muted">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={poster.src} alt={poster.title} className="h-full w-full object-cover" />
      </div>
      <p className="font-heading text-sm font-semibold px-1 line-clamp-2">{poster.title}</p>
      <select
        value={group}
        disabled={busy}
        onChange={(event) => changeGroup(event.target.value)}
        className="glass-neu-pressed h-8 w-full rounded-lg px-2 text-xs"
      >
        {!groups.includes(group) && <option value={group}>{group}</option>}
        {groups.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
      <Button variant="outline" size="sm" className="w-full" onClick={remove} disabled={busy}>
        Delete
      </Button>
    </article>
  )
}

function SiteManager({
  sites,
  onChange,
}: {
  sites: SiteItem[]
  onChange: (message: string) => Promise<void>
}) {
  const [title, setTitle] = useState("")
  const [link, setLink] = useState("")
  const [description, setDescription] = useState("")
  const [tags, setTags] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState("")

  async function submit(event: React.FormEvent) {
    event.preventDefault()
    setBusy(true)
    setError("")
    try {
      const form = new FormData()
      if (file) form.set("file", file)
      form.set("title", title)
      form.set("link", link)
      form.set("description", description)
      form.set("tags", tags)
      const res = await fetch("/api/admin/sites", { method: "POST", body: form })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || "Could not save site")
        return
      }
      setTitle("")
      setLink("")
      setDescription("")
      setTags("")
      setFile(null)
      await onChange("Website added")
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="space-y-8">
      <form onSubmit={submit} className="glass-neu rounded-2xl p-4 sm:p-6 grid gap-4 md:grid-cols-2">
        <div className="md:col-span-2">
          <h2 className="font-heading text-lg font-semibold">Add a website</h2>
          <p className="text-sm text-muted-foreground">Title, live URL, and a thumbnail of the build.</p>
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="site-file">Thumbnail</Label>
          <Input
            id="site-file"
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={(event) => setFile(event.target.files?.[0] || null)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="site-title">Title</Label>
          <Input id="site-title" value={title} onChange={(event) => setTitle(event.target.value)} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="site-link">URL</Label>
          <Input
            id="site-link"
            type="url"
            placeholder="https://"
            value={link}
            onChange={(event) => setLink(event.target.value)}
            required
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="site-description">Description</Label>
          <Textarea
            id="site-description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="site-tags">Tags (comma separated)</Label>
          <Input
            id="site-tags"
            placeholder="Next.js, E-commerce"
            value={tags}
            onChange={(event) => setTags(event.target.value)}
          />
        </div>
        {error && <p className="text-sm text-destructive md:col-span-2">{error}</p>}
        <div className="md:col-span-2">
          <Button type="submit" disabled={busy}>
            {busy ? "Saving…" : "Add website"}
          </Button>
        </div>
      </form>

      <div className="grid gap-4">
        {sites.map((site) => (
          <article key={site.id} className="glass-neu rounded-2xl p-3 flex flex-col sm:flex-row gap-3 sm:gap-4 sm:items-center">
            <div className="relative h-36 sm:h-20 w-full sm:w-32 shrink-0 overflow-hidden rounded-xl bg-muted">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={site.image} alt="" className="h-full w-full object-cover" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-heading font-semibold truncate">{site.title}</p>
              <p className="text-xs text-muted-foreground truncate">{site.link}</p>
            </div>
            <Button
              className="w-full sm:w-auto"
              variant="outline"
              size="sm"
              onClick={async () => {
                if (!window.confirm(`Remove “${site.title}”?`)) return
                await fetch(`/api/admin/sites/${site.id}`, { method: "DELETE" })
                await onChange("Website removed")
              }}
            >
              Delete
            </Button>
          </article>
        ))}
      </div>
    </div>
  )
}
