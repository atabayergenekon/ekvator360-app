import type { CrmDashboardData } from "@/lib/crm/types"

const supabaseUrl = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

export const CRM_STORAGE_BUCKET = process.env.SUPABASE_STORAGE_BUCKET ?? "crm-files"

export function isSupabaseConfigured() {
  return Boolean(supabaseUrl && serviceRoleKey)
}

type QueryOptions = {
  select?: string
  order?: string
  limit?: number
  filters?: Record<string, string>
}

function tableUrl(table: string, options: QueryOptions = {}) {
  if (!supabaseUrl) {
    throw new Error("SUPABASE_URL is missing")
  }

  const url = new URL(`/rest/v1/${table}`, supabaseUrl)
  url.searchParams.set("select", options.select ?? "*")

  if (options.order) {
    url.searchParams.set("order", options.order)
  }

  if (options.limit) {
    url.searchParams.set("limit", String(options.limit))
  }

  for (const [key, value] of Object.entries(options.filters ?? {})) {
    url.searchParams.set(key, value)
  }

  return url
}

async function request<T>(table: string, init: RequestInit, options?: QueryOptions): Promise<T> {
  if (!serviceRoleKey) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is missing")
  }

  const response = await fetch(tableUrl(table, options), {
    ...init,
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
      ...(init.headers ?? {}),
    },
    cache: "no-store",
  })

  if (!response.ok) {
    const body = await response.text()
    throw new Error(`Supabase ${table} request failed: ${response.status} ${body}`)
  }

  if (response.status === 204) {
    return undefined as T
  }

  return (await response.json()) as T
}

export async function selectRows<T>(table: string, options?: QueryOptions) {
  return request<T[]>(table, { method: "GET" }, options)
}

export async function insertRow<T>(table: string, body: Record<string, unknown>) {
  const rows = await request<T[]>(table, { method: "POST", body: JSON.stringify(body) })
  return rows[0]
}

export async function patchRows<T>(
  table: string,
  filters: Record<string, string>,
  body: Record<string, unknown>,
) {
  return request<T[]>(table, { method: "PATCH", body: JSON.stringify(body) }, { filters })
}

export const demoDashboardData: CrmDashboardData = {
  envReady: false,
  users: [
    {
      id: "demo-admin",
      username: "atabay",
      full_name: "Atabay Admin",
      email: "crm@ekvator360.com.tr",
      role: "admin",
      is_active: true,
    },
    {
      id: "demo-user",
      username: "satis",
      full_name: "Satış Ekibi",
      email: "sales@ekvator360.com.tr",
      role: "user",
      is_active: true,
    },
  ],
  companies: [
    {
      id: "c-1",
      name: "Marmara Makine A.Ş.",
      sector: "Makine",
      country: "Almanya",
      status: "Aktif müşteri",
      phone: "+90 216 606 35 85",
      email: "export@marmaramakine.com",
      tags: ["ihracat", "yüksek öncelik"],
      assigned_to: "demo-admin",
      created_at: new Date().toISOString(),
    },
    {
      id: "c-2",
      name: "Anka Gıda Sanayi",
      sector: "Gıda",
      country: "BAE",
      status: "Potansiyel",
      phone: "+90 212 000 00 00",
      email: "info@ankagida.com",
      tags: ["fuar", "numune"],
      assigned_to: "demo-user",
      created_at: new Date().toISOString(),
    },
  ],
  contacts: [
    {
      id: "p-1",
      company_id: "c-1",
      full_name: "Deniz Kara",
      title: "İhracat Müdürü",
      phone: "+905321112233",
      email: "deniz@marmaramakine.com",
      whatsapp: "+905321112233",
    },
  ],
  leads: [
    {
      id: "l-1",
      company_name: "Nord Trade GmbH",
      contact_name: "Lukas Meyer",
      source: "LinkedIn",
      status: "Nitelendiriliyor",
      estimated_value: 46000,
      next_follow_up_at: new Date(Date.now() + 86400000).toISOString(),
      assigned_to: "demo-admin",
      created_at: new Date().toISOString(),
    },
  ],
  deals: [
    {
      id: "d-1",
      title: "Almanya distribütör anlaşması",
      company_id: "c-1",
      stage: "Teklif",
      value: 82000,
      currency: "EUR",
      probability: 62,
      expected_close_at: new Date(Date.now() + 86400000 * 24).toISOString(),
      assigned_to: "demo-admin",
    },
    {
      id: "d-2",
      title: "Körfez numune sevkiyatı",
      company_id: "c-2",
      stage: "Görüşme",
      value: 18500,
      currency: "USD",
      probability: 35,
      expected_close_at: new Date(Date.now() + 86400000 * 12).toISOString(),
      assigned_to: "demo-user",
    },
  ],
  quotes: [
    {
      id: "q-1",
      quote_no: "EKV-2026-0001",
      company_id: "c-1",
      subject: "Yedek parça ve makine hattı",
      amount: 82000,
      currency: "EUR",
      status: "Gönderildi",
      valid_until: new Date(Date.now() + 86400000 * 14).toISOString(),
      follow_up_at: new Date(Date.now() + 86400000 * 3).toISOString(),
      lost_reason: null,
      accepted_at: null,
      created_at: new Date().toISOString(),
    },
  ],
  tasks: [
    {
      id: "t-1",
      title: "Nord Trade follow-up e-postası",
      related_type: "lead",
      related_id: "l-1",
      due_at: new Date(Date.now() + 86400000).toISOString(),
      priority: "Yüksek",
      prefix: "Teklif",
      status: "Açık",
      assigned_to: "demo-admin",
    },
    {
      id: "t-2",
      title: "BAE toplantısı için teklif dosyası hazırla",
      related_type: "company",
      related_id: "c-2",
      due_at: new Date(Date.now() + 86400000 * 3).toISOString(),
      priority: "Orta",
      prefix: "Operasyon",
      status: "Açık",
      assigned_to: "demo-user",
    },
  ],
  followUps: [],
  contracts: [],
  processSteps: [],
  activities: [
    {
      id: "a-1",
      actor_id: "demo-admin",
      action: "created",
      entity_type: "quote",
      entity_id: "q-1",
      description: "EKV-2026-0001 numaralı teklif oluşturuldu.",
      created_at: new Date().toISOString(),
    },
    {
      id: "a-2",
      actor_id: "demo-user",
      action: "scheduled",
      entity_type: "meeting",
      entity_id: null,
      description: "Anka Gıda için Körfez pazar görüşmesi planlandı.",
      created_at: new Date(Date.now() - 3600000).toISOString(),
    },
  ],
}
