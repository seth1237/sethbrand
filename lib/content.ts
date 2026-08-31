import { ObjectId } from "mongodb"
import { getDb } from "@/lib/mongo"
import {
  DEFAULT_POSTERS,
  DEFAULT_SITES,
  type PosterItem,
  type SiteItem,
} from "@/lib/content-defaults"

const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"])
const MAX_BYTES = 4 * 1024 * 1024

export function mediaSrc(mediaId: string) {
  return `/api/media/${mediaId}`
}

function mapPoster(doc: Record<string, unknown>): PosterItem {
  const mediaId = doc.mediaId ? String(doc.mediaId) : ""
  return {
    id: String(doc._id),
    title: String(doc.title || "Untitled"),
    group: String(doc.group || "Poster"),
    description: String(doc.description || ""),
    src: mediaId ? mediaSrc(mediaId) : String(doc.imageUrl || ""),
    source: "upload",
  }
}

function mapSite(doc: Record<string, unknown>): SiteItem {
  const mediaId = doc.mediaId ? String(doc.mediaId) : ""
  return {
    id: String(doc._id),
    title: String(doc.title || "Untitled"),
    description: String(doc.description || ""),
    tags: Array.isArray(doc.tags) ? doc.tags.map(String) : [],
    link: String(doc.link || ""),
    image: mediaId ? mediaSrc(mediaId) : String(doc.imageUrl || "/placeholder.svg"),
    source: "upload",
  }
}

export async function listPosters(options: { fallback?: boolean } = {}): Promise<PosterItem[]> {
  try {
    const db = await getDb()
    const [hidden, uploaded, overrides] = await Promise.all([
      db.collection("content_hidden").find({ kind: "poster" }).toArray(),
      db.collection("posters").find().sort({ createdAt: -1 }).toArray(),
      db.collection("poster_overrides").find().toArray(),
    ])
    const hiddenIds = new Set(hidden.map((row) => String(row.slug)))
    const overrideMap = new Map(overrides.map((row) => [String(row.slug), row]))

    const defaults = DEFAULT_POSTERS.filter((item) => !hiddenIds.has(item.id)).map((item) => {
      const override = overrideMap.get(item.id)
      if (!override) return item
      return {
        ...item,
        title: String(override.title || item.title),
        group: String(override.group || item.group),
        description: String(override.description ?? item.description),
      }
    })

    return [...uploaded.map((doc) => mapPoster(doc as Record<string, unknown>)), ...defaults]
  } catch (error) {
    if (options.fallback === false) throw error
    return DEFAULT_POSTERS
  }
}

export async function listSites(options: { fallback?: boolean } = {}): Promise<SiteItem[]> {
  try {
    const db = await getDb()
    const [hidden, uploaded] = await Promise.all([
      db.collection("content_hidden").find({ kind: "site" }).toArray(),
      db.collection("sites").find().sort({ createdAt: -1 }).toArray(),
    ])
    const hiddenIds = new Set(hidden.map((row) => String(row.slug)))
    const defaults = DEFAULT_SITES.filter((item) => !hiddenIds.has(item.id))
    return [...uploaded.map((doc) => mapSite(doc as Record<string, unknown>)), ...defaults]
  } catch (error) {
    if (options.fallback === false) throw error
    return DEFAULT_SITES
  }
}

export async function saveMedia(file: File) {
  if (!ALLOWED_TYPES.has(file.type)) {
    throw new Error("Use a JPG, PNG, WebP, or GIF image")
  }
  if (file.size > MAX_BYTES) {
    throw new Error("Image must be under 4MB")
  }

  const buffer = Buffer.from(await file.arrayBuffer())
  const db = await getDb()
  const result = await db.collection("media").insertOne({
    filename: file.name.slice(0, 180),
    mimeType: file.type,
    data: buffer,
    createdAt: new Date(),
  })
  return result.insertedId.toString()
}

export async function getMedia(id: string) {
  if (!ObjectId.isValid(id)) return null
  const db = await getDb()
  return db.collection("media").findOne({ _id: new ObjectId(id) })
}

export async function createPoster(input: {
  title: string
  group: string
  description: string
  file: File
}) {
  const mediaId = await saveMedia(input.file)
  const db = await getDb()
  const result = await db.collection("posters").insertOne({
    title: input.title.trim(),
    group: input.group.trim() || "Poster",
    description: input.description.trim(),
    mediaId,
    createdAt: new Date(),
  })
  return result.insertedId.toString()
}

export async function updatePoster(
  id: string,
  input: { title?: string; group?: string; description?: string },
) {
  const db = await getDb()
  if (id.startsWith("poster-")) {
    const current = DEFAULT_POSTERS.find((item) => item.id === id)
    const existing = await db.collection("poster_overrides").findOne({ slug: id })
    await db.collection("poster_overrides").updateOne(
      { slug: id },
      {
        $set: {
          slug: id,
          title: input.title ?? existing?.title ?? current?.title,
          group: input.group ?? existing?.group ?? current?.group,
          description: input.description ?? existing?.description ?? current?.description,
          updatedAt: new Date(),
        },
      },
      { upsert: true },
    )
    return
  }
  if (!ObjectId.isValid(id)) throw new Error("Invalid poster")
  await db.collection("posters").updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        ...(input.title !== undefined ? { title: input.title.trim() } : {}),
        ...(input.group !== undefined ? { group: input.group.trim() } : {}),
        ...(input.description !== undefined ? { description: input.description.trim() } : {}),
      },
    },
  )
}

export async function deletePoster(id: string) {
  const db = await getDb()
  if (id.startsWith("poster-")) {
    await db.collection("content_hidden").updateOne(
      { kind: "poster", slug: id },
      { $set: { kind: "poster", slug: id, hiddenAt: new Date() } },
      { upsert: true },
    )
    return
  }
  if (!ObjectId.isValid(id)) throw new Error("Invalid poster")
  const doc = await db.collection("posters").findOne({ _id: new ObjectId(id) })
  await db.collection("posters").deleteOne({ _id: new ObjectId(id) })
  if (doc?.mediaId && ObjectId.isValid(String(doc.mediaId))) {
    await db.collection("media").deleteOne({ _id: new ObjectId(String(doc.mediaId)) })
  }
}

export async function createSite(input: {
  title: string
  description: string
  tags: string[]
  link: string
  file?: File | null
}) {
  const mediaId = input.file ? await saveMedia(input.file) : null
  const db = await getDb()
  const result = await db.collection("sites").insertOne({
    title: input.title.trim(),
    description: input.description.trim(),
    tags: input.tags,
    link: input.link.trim(),
    mediaId,
    createdAt: new Date(),
  })
  return result.insertedId.toString()
}

export async function deleteSite(id: string) {
  const db = await getDb()
  if (id.startsWith("site-")) {
    await db.collection("content_hidden").updateOne(
      { kind: "site", slug: id },
      { $set: { kind: "site", slug: id, hiddenAt: new Date() } },
      { upsert: true },
    )
    return
  }
  if (!ObjectId.isValid(id)) throw new Error("Invalid site")
  const doc = await db.collection("sites").findOne({ _id: new ObjectId(id) })
  await db.collection("sites").deleteOne({ _id: new ObjectId(id) })
  if (doc?.mediaId && ObjectId.isValid(String(doc.mediaId))) {
    await db.collection("media").deleteOne({ _id: new ObjectId(String(doc.mediaId)) })
  }
}
