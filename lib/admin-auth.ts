import { createHmac, timingSafeEqual } from "crypto"
import { cookies } from "next/headers"

export const ADMIN_COOKIE = "seth_admin"

function secret() {
  return process.env.ADMIN_PASSWORD || ""
}

export function adminConfigured() {
  return secret().length >= 6
}

function token() {
  return createHmac("sha256", secret()).update("seth-admin-ok").digest("hex")
}

export function checkPassword(password: string) {
  const expected = secret()
  if (!expected || password.length !== expected.length) return false
  return timingSafeEqual(Buffer.from(password), Buffer.from(expected))
}

export async function isAdmin() {
  if (!adminConfigured()) return false
  const jar = await cookies()
  const value = jar.get(ADMIN_COOKIE)?.value
  if (!value) return false
  const expected = token()
  if (value.length !== expected.length) return false
  return timingSafeEqual(Buffer.from(value), Buffer.from(expected))
}

export async function setAdminCookie() {
  const jar = await cookies()
  jar.set(ADMIN_COOKIE, token(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 14,
  })
}

export async function clearAdminCookie() {
  const jar = await cookies()
  jar.delete(ADMIN_COOKIE)
}
