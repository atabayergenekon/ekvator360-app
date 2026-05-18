import "server-only"

import { mkdir, readFile, writeFile } from "node:fs/promises"
import path from "node:path"
import { randomUUID } from "node:crypto"

import { hashPassword, verifyPassword } from "@/lib/crm/password"
import { demoDashboardData } from "@/lib/crm/supabase"
import type { CrmDashboardData, CrmUser } from "@/lib/crm/types"

type LocalUser = CrmUser & {
  password_hash: string
  created_at: string
  updated_at: string
}

type LocalStore = Omit<CrmDashboardData, "users" | "envReady"> & {
  users: LocalUser[]
  email_logs: Array<Record<string, unknown>>
}

const dataDir = path.join(process.cwd(), "data")
const dataFile = path.join(dataDir, "crm.json")

function now() {
  return new Date().toISOString()
}

function withId<T extends Record<string, unknown>>(row: T) {
  return {
    id: randomUUID(),
    created_at: now(),
    updated_at: now(),
    ...row,
  }
}

function safeUser(user: LocalUser): CrmUser {
  return {
    id: user.id,
    username: user.username,
    full_name: user.full_name,
    email: user.email,
    role: user.role,
    is_active: user.is_active,
  }
}

function initialStore(): LocalStore {
  const adminPassword = process.env.CRM_ADMIN_PASSWORD ?? "Atabay123123..!!"

  return {
    users: [
      {
        id: "local-admin",
        username: "atabay",
        password_hash: hashPassword(adminPassword),
        full_name: "Atabay Admin",
        email: "crm@ekvator360.com.tr",
        role: "admin",
        is_active: true,
        created_at: now(),
        updated_at: now(),
      },
    ],
    companies: demoDashboardData.companies,
    contacts: demoDashboardData.contacts,
    leads: demoDashboardData.leads,
    deals: demoDashboardData.deals,
    quotes: demoDashboardData.quotes,
    tasks: demoDashboardData.tasks,
    followUps: demoDashboardData.followUps,
    contracts: demoDashboardData.contracts,
    processSteps: demoDashboardData.processSteps,
    activities: demoDashboardData.activities,
    email_logs: [],
  }
}

function normalizeStore(store: LocalStore) {
  store.quotes = store.quotes.map((quote) => ({
    ...quote,
    follow_up_at: quote.follow_up_at ?? null,
    lost_reason: quote.lost_reason ?? null,
    accepted_at: quote.accepted_at ?? null,
  }))
  store.tasks = store.tasks.map((task) => ({
    ...task,
    prefix: task.prefix ?? "Genel",
  }))
  store.followUps ??= []
  store.contracts ??= []
  store.processSteps ??= []
  store.email_logs ??= []
  return store
}

async function ensureStore() {
  await mkdir(dataDir, { recursive: true })

  try {
    const content = await readFile(dataFile, "utf8")
    const store = JSON.parse(content) as Partial<LocalStore>
    return normalizeStore({
      ...initialStore(),
      ...store,
      contracts: store.contracts ?? [],
      processSteps: store.processSteps ?? [],
      followUps: store.followUps ?? [],
      email_logs: store.email_logs ?? [],
    } as LocalStore)
  } catch {
    const store = normalizeStore(initialStore())
    await writeStore(store)
    return store
  }
}

async function writeStore(store: LocalStore) {
  await mkdir(dataDir, { recursive: true })
  await writeFile(dataFile, `${JSON.stringify(store, null, 2)}\n`, "utf8")
}

export async function getLocalDashboardData(): Promise<CrmDashboardData> {
  const store = await ensureStore()

  return {
    envReady: true,
    users: store.users.map(safeUser),
    companies: store.companies,
    contacts: store.contacts,
    leads: store.leads,
    deals: store.deals,
    quotes: store.quotes,
    tasks: store.tasks,
    followUps: store.followUps,
    contracts: store.contracts,
    processSteps: store.processSteps,
    activities: store.activities,
  }
}

export async function authenticateLocalUser(username: string, password: string) {
  const store = await ensureStore()
  const user = store.users.find(
    (item) => item.username === username.trim().toLowerCase() && item.is_active,
  )

  if (!user || !verifyPassword(password, user.password_hash)) {
    return null
  }

  return safeUser(user)
}

export async function findLocalUserById(id: string) {
  const store = await ensureStore()
  const user = store.users.find((item) => item.id === id && item.is_active)

  if (!user) {
    return null
  }

  return safeUser(user)
}

export async function localInsert<T>(table: keyof LocalStore, row: Record<string, unknown>) {
  const store = await ensureStore()
  const record = withId(row)

  if (table === "users") {
    const username = String(record.username ?? "").toLowerCase()
    if (store.users.some((user) => user.username === username)) {
      throw new Error("Bu kullanıcı adı zaten var.")
    }
    record.username = username
  }

  ;(store[table] as Array<Record<string, unknown>>).unshift(record)
  await writeStore(store)

  if (table === "users") {
    return safeUser(record as LocalUser) as T
  }

  return record as T
}

export async function localPatchDealStage(id: string, stage: string) {
  const store = await ensureStore()
  const deal = store.deals.find((item) => item.id === id)

  if (deal) {
    deal.stage = stage
    await writeStore(store)
  }
}

export async function localPatchCompanyStatus(id: string, status: string) {
  const store = await ensureStore()
  const company = store.companies.find((item) => item.id === id)

  if (company) {
    company.status = status
    await writeStore(store)
  }
}

export async function localPatchQuote(
  id: string,
  body: { status?: string; lost_reason?: string | null; accepted_at?: string | null },
) {
  const store = await ensureStore()
  const quote = store.quotes.find((item) => item.id === id)

  if (quote) {
    Object.assign(quote, body)
    await writeStore(store)
  }
}

export async function localPatchProcessStepStatus(id: string, status: string) {
  const store = await ensureStore()
  const step = store.processSteps.find((item) => item.id === id)

  if (step) {
    step.status = status
    await writeStore(store)
  }
}

export async function localRecordActivity(input: {
  actorId: string
  action: string
  entityType: string
  entityId?: string | null
  description: string
}) {
  return localInsert("activities", {
    actor_id: input.actorId,
    action: input.action,
    entity_type: input.entityType,
    entity_id: input.entityId ?? null,
    description: input.description,
  })
}
