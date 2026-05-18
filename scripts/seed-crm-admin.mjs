import { pbkdf2Sync, randomBytes } from "node:crypto"

const supabaseUrl = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const adminPassword = process.env.CRM_ADMIN_PASSWORD

if (!supabaseUrl || !serviceRoleKey || !adminPassword) {
  console.error("SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY and CRM_ADMIN_PASSWORD are required.")
  process.exit(1)
}

function hashPassword(password) {
  const salt = randomBytes(16).toString("base64url")
  const iterations = 210000
  const hash = pbkdf2Sync(password, salt, iterations, 32, "sha256").toString("base64url")
  return `pbkdf2$${iterations}$${salt}$${hash}`
}

async function supabase(path, init = {}) {
  const response = await fetch(new URL(path, supabaseUrl), {
    ...init,
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      "Content-Type": "application/json",
      Prefer: "resolution=merge-duplicates,return=representation",
      ...(init.headers ?? {}),
    },
  })

  if (!response.ok) {
    throw new Error(`${response.status} ${await response.text()}`)
  }

  return response.json()
}

const [admin] = await supabase("/rest/v1/users?on_conflict=username", {
  method: "POST",
  body: JSON.stringify({
    username: "atabay",
    password_hash: hashPassword(adminPassword),
    full_name: "Atabay Admin",
    email: "crm@ekvator360.com.tr",
    role: "admin",
    is_active: true,
  }),
})

console.log(`Admin user ready: ${admin.username}`)
