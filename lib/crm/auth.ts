import "server-only"

import { cookies } from "next/headers"
import { createHmac } from "node:crypto"

import { CRM_SESSION_COOKIE } from "@/lib/crm/constants"
import { authenticateLocalUser, findLocalUserById } from "@/lib/crm/local-store"
import { verifyPassword } from "@/lib/crm/password"
import { isSupabaseConfigured, selectRows } from "@/lib/crm/supabase"
import type { CrmRole, CrmUser } from "@/lib/crm/types"

const sessionSecret = process.env.CRM_SESSION_SECRET ?? process.env.SUPABASE_SERVICE_ROLE_KEY
const sessionMaxAge = 60 * 60 * 8

type SessionPayload = {
  sub: string
  username: string
  role: CrmRole
  name: string
  exp: number
}

function base64Url(input: string | Buffer) {
  return Buffer.from(input).toString("base64url")
}

function sign(value: string) {
  if (!sessionSecret) {
    throw new Error("CRM_SESSION_SECRET is missing")
  }

  return createHmac("sha256", sessionSecret).update(value).digest("base64url")
}

export function createSessionToken(user: CrmUser) {
  const payload: SessionPayload = {
    sub: user.id,
    username: user.username,
    role: user.role,
    name: user.full_name,
    exp: Math.floor(Date.now() / 1000) + sessionMaxAge,
  }
  const body = base64Url(JSON.stringify(payload))
  return `${body}.${sign(body)}`
}

export function readSessionToken(token: string | undefined): SessionPayload | null {
  if (!token || !sessionSecret) {
    return null
  }

  const [body, signature] = token.split(".")

  if (!body || !signature || sign(body) !== signature) {
    return null
  }

  try {
    const payload = JSON.parse(Buffer.from(body, "base64url").toString("utf8")) as SessionPayload

    if (payload.exp < Math.floor(Date.now() / 1000)) {
      return null
    }

    return payload
  } catch {
    return null
  }
}

export async function setSessionCookie(user: CrmUser) {
  const cookieStore = await cookies()
  cookieStore.set(CRM_SESSION_COOKIE, createSessionToken(user), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: sessionMaxAge,
  })
}

export async function clearSessionCookie() {
  const cookieStore = await cookies()
  cookieStore.delete(CRM_SESSION_COOKIE)
}

export async function getCurrentUser() {
  const cookieStore = await cookies()
  const payload = readSessionToken(cookieStore.get(CRM_SESSION_COOKIE)?.value)

  if (!payload) {
    return null
  }

  if (!isSupabaseConfigured()) {
    return findLocalUserById(payload.sub)
  }

  try {
    const users = await selectRows<CrmUser>("users", {
      filters: { id: `eq.${payload.sub}`, is_active: "eq.true" },
      limit: 1,
    })
    return users[0] ?? null
  } catch {
    return {
      id: payload.sub,
      username: payload.username,
      full_name: payload.name,
      email: null,
      role: payload.role,
      is_active: true,
    } satisfies CrmUser
  }
}

export async function authenticate(username: string, password: string) {
  if (!isSupabaseConfigured()) {
    return authenticateLocalUser(username, password)
  }

  const users = await selectRows<CrmUser & { password_hash: string }>("users", {
    filters: {
      username: `eq.${username.trim().toLowerCase()}`,
      is_active: "eq.true",
    },
    limit: 1,
  })
  const user = users[0]

  if (!user || !verifyPassword(password, user.password_hash)) {
    return null
  }

  return {
    id: user.id,
    username: user.username,
    full_name: user.full_name,
    email: user.email,
    role: user.role,
    is_active: user.is_active,
  } satisfies CrmUser
}
