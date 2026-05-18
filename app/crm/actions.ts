"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import { clearSessionCookie, getCurrentUser } from "@/lib/crm/auth"
import { recordActivity } from "@/lib/crm/data"
import {
  localInsert,
  localPatchCompanyStatus,
  localPatchDealStage,
  localPatchProcessStepStatus,
  localPatchQuote,
} from "@/lib/crm/local-store"
import { hashPassword } from "@/lib/crm/password"
import { insertRow, isSupabaseConfigured, patchRows } from "@/lib/crm/supabase"
import { sendCrmMail } from "@/lib/crm/smtp"
import type { Company, Contract, CrmTask, CrmUser, Deal, FollowUp, Lead, ProcessStep, Quote } from "@/lib/crm/types"

export type CrmActionState = {
  error?: string
  success?: string
}

function formFromArgs(arg1: FormData | CrmActionState, arg2?: FormData) {
  return arg2 ?? (arg1 as FormData)
}

function fail(error: string): CrmActionState {
  return { error }
}

function ok(success: string): CrmActionState {
  return { success }
}

async function requireUser() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  return user
}

function optionalString(value: FormDataEntryValue | null) {
  const text = String(value ?? "").trim()
  return text.length > 0 ? text : null
}

function numberValue(value: FormDataEntryValue | null, fallback = 0) {
  const number = Number(value ?? fallback)
  return Number.isFinite(number) ? number : fallback
}

function dateOnly(date: Date) {
  return date.toISOString().slice(0, 10)
}

function addDays(value: string, days: number) {
  const date = new Date(value)
  date.setDate(date.getDate() + days)
  return dateOnly(date)
}

function addMonths(value: string, months: number) {
  const date = new Date(value)
  date.setMonth(date.getMonth() + months)
  return dateOnly(date)
}

function monthSpan(start: string, end: string) {
  const startsAt = new Date(start)
  const endsAt = new Date(end)
  const months =
    (endsAt.getFullYear() - startsAt.getFullYear()) * 12 + endsAt.getMonth() - startsAt.getMonth()
  return Math.max(1, months || 1)
}

function processTemplate(input: {
  contractId: string
  companyId: string
  startsAt: string
  endsAt: string
  assignedTo: string | null
}) {
  const monthly = Array.from({ length: monthSpan(input.startsAt, input.endsAt) }, (_, index) => ({
    title: `${index + 1}. ay raporlama ve ödeme kontrolü`,
    description: "Aylık faaliyet raporu, ödeme günü kontrolü ve müşteri geri bildirimlerini takip edin.",
    due_at: addMonths(input.startsAt, index),
    sort_order: 50 + index,
  }))

  return [
    {
      title: "İlk ödeme ve sözleşme başlangıcı",
      description: "Sözleşmenin yürürlüğe girdiğini, ilk ödemenin alındığını ve müşteri statüsünü Başladı yapın.",
      due_at: input.startsAt,
      sort_order: 10,
    },
    {
      title: "Ürün/firma eğitim toplantısı",
      description: "Sözleşmeye göre ilk ödeme sonrası 10 iş günü içinde ürün, üretim ve rekabet avantajı toplantısı yapılır.",
      due_at: addDays(input.startsAt, 14),
      sort_order: 20,
    },
    {
      title: "Hedef pazar ve potansiyel müşteri listesi",
      description: "İthalatçı, distribütör, toptancı ve zincir profillerini belirleyip ilk listeyi oluşturun.",
      due_at: addDays(input.startsAt, 21),
      sort_order: 30,
    },
    {
      title: "İlk temas ve dijital tanıtım",
      description: "E-posta, telefon, LinkedIn ve uygun dijital kanallar üzerinden müşteri adına ilk teması başlatın.",
      due_at: addDays(input.startsAt, 30),
      sort_order: 40,
    },
    ...monthly,
    {
      title: "Teklif talepleri için 5 iş günü SLA takibi",
      description: "Müşteriden teklif gerektiren taleplere 5 iş günü içinde yanıt alınmasını takip edin.",
      due_at: addDays(input.startsAt, 35),
      sort_order: 70,
    },
    {
      title: "İhracat satış bildirimi 7 iş günü kontrolü",
      description: "Müşteri ihracat satışlarını ülke, alıcı, ürün ve fatura tutarıyla en geç 7 iş günü içinde bildirmeli.",
      due_at: addDays(input.startsAt, 45),
      sort_order: 80,
    },
    {
      title: "Yenileme görüşmesi",
      description: "Bitişten en az 20 iş günü önce yeni dönem ücret, kapsam ve süre koşullarını görüşün.",
      due_at: addDays(input.endsAt, -28),
      sort_order: 90,
    },
  ].map((step) => ({
    ...step,
    contract_id: input.contractId,
    company_id: input.companyId,
    status: "Bekliyor",
    assigned_to: input.assignedTo,
  }))
}

export async function logoutAction() {
  await clearSessionCookie()
  redirect("/login")
}

export async function createUserAction(formData: FormData) {
  const actor = await requireUser()

  if (actor.role !== "admin") {
    throw new Error("Bu işlem için admin yetkisi gerekir.")
  }

  const username = String(formData.get("username") ?? "").trim().toLowerCase()
  const password = String(formData.get("password") ?? "")
  const fullName = String(formData.get("full_name") ?? "").trim()
  const email = optionalString(formData.get("email"))
  const role = String(formData.get("role") ?? "user") === "admin" ? "admin" : "user"

  if (!username || !password || !fullName) {
    throw new Error("Kullanıcı adı, ad soyad ve şifre gerekli.")
  }

  const payload = {
    username,
    password_hash: hashPassword(password),
    full_name: fullName,
    email,
    role,
    is_active: true,
  }
  const user = isSupabaseConfigured()
    ? await insertRow<CrmUser>("users", payload)
    : await localInsert<CrmUser>("users", payload)

  await recordActivity({
    actorId: actor.id,
    action: "created",
    entityType: "user",
    entityId: user.id,
    description: `${fullName} kullanıcısı oluşturuldu.`,
  })
  revalidatePath("/crm")
}

export async function createCompanyAction(arg1: FormData | CrmActionState, arg2?: FormData) {
  const formData = formFromArgs(arg1, arg2)
  const actor = await requireUser()

  const name = String(formData.get("name") ?? "").trim()

  if (!name) {
    return fail("Firma adı gerekli.")
  }

  const payload = {
    name,
    sector: optionalString(formData.get("sector")),
    country: optionalString(formData.get("country")),
    status: String(formData.get("status") ?? "Lead"),
    phone: optionalString(formData.get("phone")),
    email: optionalString(formData.get("email")),
    tags: String(formData.get("tags") ?? "")
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean),
    assigned_to: optionalString(formData.get("assigned_to")) ?? actor.id,
    created_by: actor.id,
  }
  const company = isSupabaseConfigured()
    ? await insertRow<Company>("companies", payload)
    : await localInsert<Company>("companies", payload)

  const contactName = optionalString(formData.get("contact_name"))

  if (contactName) {
    const contactPayload = {
      company_id: company.id,
      full_name: contactName,
      title: optionalString(formData.get("contact_title")),
      phone: optionalString(formData.get("phone")),
      email: optionalString(formData.get("email")),
      whatsapp: optionalString(formData.get("whatsapp")),
      created_by: actor.id,
    }
    if (isSupabaseConfigured()) {
      await insertRow("contacts", contactPayload)
    } else {
      await localInsert("contacts", contactPayload)
    }
  }

  await recordActivity({
    actorId: actor.id,
    action: "created",
    entityType: "company",
    entityId: company.id,
    description: `${name} firma kartı oluşturuldu.`,
  })
  revalidatePath("/crm")
  revalidatePath("/crm/customers")
  return ok("Müşteri oluşturuldu.")
}

export async function createLeadAction(formData: FormData) {
  const actor = await requireUser()

  const companyName = String(formData.get("company_name") ?? "").trim()

  if (!companyName) {
    throw new Error("Lead firma adı gerekli.")
  }

  const payload = {
    company_name: companyName,
    contact_name: optionalString(formData.get("contact_name")),
    source: optionalString(formData.get("source")),
    status: String(formData.get("status") ?? "Yeni"),
    estimated_value: numberValue(formData.get("estimated_value")),
    next_follow_up_at: optionalString(formData.get("next_follow_up_at")),
    assigned_to: optionalString(formData.get("assigned_to")) ?? actor.id,
    created_by: actor.id,
  }
  const lead = isSupabaseConfigured()
    ? await insertRow<Lead>("leads", payload)
    : await localInsert<Lead>("leads", payload)

  await recordActivity({
    actorId: actor.id,
    action: "created",
    entityType: "lead",
    entityId: lead.id,
    description: `${companyName} lead olarak eklendi.`,
  })
  revalidatePath("/crm")
  revalidatePath("/crm/pipeline")
}

export async function createDealAction(formData: FormData) {
  const actor = await requireUser()

  const title = String(formData.get("title") ?? "").trim()

  if (!title) {
    throw new Error("Fırsat başlığı gerekli.")
  }

  const payload = {
    title,
    company_id: optionalString(formData.get("company_id")),
    stage: String(formData.get("stage") ?? "Lead"),
    value: numberValue(formData.get("value")),
    currency: String(formData.get("currency") ?? "EUR"),
    probability: numberValue(formData.get("probability"), 25),
    expected_close_at: optionalString(formData.get("expected_close_at")),
    assigned_to: optionalString(formData.get("assigned_to")) ?? actor.id,
    created_by: actor.id,
  }
  const deal = isSupabaseConfigured()
    ? await insertRow<Deal>("deals", payload)
    : await localInsert<Deal>("deals", payload)

  await recordActivity({
    actorId: actor.id,
    action: "created",
    entityType: "deal",
    entityId: deal.id,
    description: `${title} pipeline'a eklendi.`,
  })
  revalidatePath("/crm")
  revalidatePath("/crm/pipeline")
}

export async function updateDealStageAction(formData: FormData) {
  const actor = await requireUser()

  const id = String(formData.get("id") ?? "")
  const stage = String(formData.get("stage") ?? "")

  if (!id || !stage) {
    return
  }

  if (isSupabaseConfigured()) {
    await patchRows<Deal>("deals", { id: `eq.${id}` }, { stage })
  } else {
    await localPatchDealStage(id, stage)
  }
  await recordActivity({
    actorId: actor.id,
    action: "updated",
    entityType: "deal",
    entityId: id,
    description: `Satış fırsatı ${stage} aşamasına taşındı.`,
  })
  revalidatePath("/crm")
  revalidatePath("/crm/quotes")
}

export async function createQuoteAction(arg1: FormData | CrmActionState, arg2?: FormData) {
  const formData = formFromArgs(arg1, arg2)
  const actor = await requireUser()

  const subject = String(formData.get("subject") ?? "").trim()

  if (!subject) {
    return fail("Teklif konusu gerekli.")
  }

  const payload = {
    quote_no: optionalString(formData.get("quote_no")) ?? `EKV-${new Date().getFullYear()}-${Date.now()}`,
    company_id: optionalString(formData.get("company_id")),
    subject,
    amount: numberValue(formData.get("amount")),
    currency: String(formData.get("currency") ?? "EUR"),
    status: String(formData.get("status") ?? "Taslak"),
    valid_until: optionalString(formData.get("valid_until")),
    follow_up_at: optionalString(formData.get("follow_up_at")),
    lost_reason: null,
    accepted_at: null,
    created_by: actor.id,
  }
  const quote = isSupabaseConfigured()
    ? await insertRow<Quote>("quotes", payload)
    : await localInsert<Quote>("quotes", payload)

  if (payload.company_id) {
    const companyStatus = payload.status === "Teklif Gönderildi" ? "Teklif Gönderildi" : "Teklif Hazırlanıyor"
    if (isSupabaseConfigured()) {
      await patchRows<Company>("companies", { id: `eq.${payload.company_id}` }, { status: companyStatus })
    } else {
      await localPatchCompanyStatus(payload.company_id, companyStatus)
    }
  }

  await recordActivity({
    actorId: actor.id,
    action: "created",
    entityType: "quote",
    entityId: quote.id,
    description: `${quote.quote_no} numaralı teklif oluşturuldu.`,
  })
  revalidatePath("/crm")
  revalidatePath("/crm/tasks")
  revalidatePath("/crm/quotes")
  return ok("Teklif oluşturuldu.")
}

export async function createContractAction(arg1: FormData | CrmActionState, arg2?: FormData) {
  const formData = formFromArgs(arg1, arg2)
  const actor = await requireUser()
  const companyId = String(formData.get("company_id") ?? "")
  const startsAt = String(formData.get("starts_at") ?? "")
  const endsAt = String(formData.get("ends_at") || (startsAt ? addMonths(startsAt, 6) : ""))

  if (!companyId || !startsAt) {
    return fail("Müşteri ve başlangıç tarihi gerekli. Bitiş boşsa sistem 6 ay sonrası olarak doldurur.")
  }

  const payload = {
    company_id: companyId,
    contract_no: optionalString(formData.get("contract_no")) ?? `EKV-S-${Date.now()}`,
    starts_at: startsAt,
    ends_at: endsAt,
    monthly_fee: numberValue(formData.get("monthly_fee")),
    currency: String(formData.get("currency") ?? "TRY"),
    payment_day: numberValue(formData.get("payment_day"), 15),
    renewal_notice_at: optionalString(formData.get("renewal_notice_at")) ?? addDays(endsAt, -28),
    status: String(formData.get("status") ?? "Aktif"),
    file_name: optionalString(formData.get("file_name")),
    file_path: optionalString(formData.get("file_path")),
    assigned_to: optionalString(formData.get("assigned_to")) ?? actor.id,
    created_by: actor.id,
  }
  const contract = isSupabaseConfigured()
    ? await insertRow<Contract>("contracts", payload)
    : await localInsert<Contract>("contracts", payload)

  if (isSupabaseConfigured()) {
    await patchRows<Company>("companies", { id: `eq.${companyId}` }, { status: "Süreçte" })
  } else {
    await localPatchCompanyStatus(companyId, "Süreçte")
  }

  const steps = processTemplate({
    contractId: contract.id,
    companyId,
    startsAt,
    endsAt,
    assignedTo: contract.assigned_to,
  })

  for (const step of steps) {
    if (isSupabaseConfigured()) {
      await insertRow<ProcessStep>("process_steps", step)
    } else {
      await localInsert<ProcessStep>("processSteps", step)
    }
  }

  await recordActivity({
    actorId: actor.id,
    action: "created",
    entityType: "contract",
    entityId: contract.id,
    description: `${contract.contract_no} sözleşmesi ve 6 aylık süreç akışı oluşturuldu.`,
  })
  revalidatePath("/crm")
  revalidatePath("/crm/process")
  revalidatePath(`/crm/customers/${companyId}`)
  return ok("Sözleşme oluşturuldu ve müşteri süreci başlatıldı.")
}

export async function updateProcessStepStatusAction(formData: FormData) {
  const actor = await requireUser()
  const id = String(formData.get("id") ?? "")
  const status = String(formData.get("status") ?? "")

  if (!id || !status) {
    return
  }

  if (isSupabaseConfigured()) {
    await patchRows<ProcessStep>("process_steps", { id: `eq.${id}` }, { status })
  } else {
    await localPatchProcessStepStatus(id, status)
  }
  await recordActivity({
    actorId: actor.id,
    action: "updated",
    entityType: "process_step",
    entityId: id,
    description: `Süreç adımı ${status} olarak işaretlendi.`,
  })
  revalidatePath("/crm/process")
  revalidatePath("/crm/tasks")
}

export async function createTaskAction(arg1: FormData | CrmActionState, arg2?: FormData) {
  const formData = formFromArgs(arg1, arg2)
  const actor = await requireUser()

  const title = String(formData.get("title") ?? "").trim()

  if (!title) {
    return fail("Görev başlığı gerekli.")
  }

  const payload = {
    title,
    related_type: optionalString(formData.get("related_type")),
    related_id: optionalString(formData.get("related_id")),
    due_at: optionalString(formData.get("due_at")),
    priority: String(formData.get("priority") ?? "Orta"),
    prefix: String(formData.get("prefix") ?? "Genel"),
    status: String(formData.get("status") ?? "Açık"),
    assigned_to: optionalString(formData.get("assigned_to")) ?? actor.id,
    created_by: actor.id,
  }
  const task = isSupabaseConfigured()
    ? await insertRow<CrmTask>("tasks", payload)
    : await localInsert<CrmTask>("tasks", payload)

  await recordActivity({
    actorId: actor.id,
    action: "created",
    entityType: "task",
    entityId: task.id,
    description: `${title} görevi oluşturuldu.`,
  })
  revalidatePath("/crm")
  revalidatePath("/crm/tasks")
  return ok("Görev oluşturuldu.")
}

export async function createFollowUpAction(arg1: FormData | CrmActionState, arg2?: FormData) {
  const formData = formFromArgs(arg1, arg2)
  const actor = await requireUser()
  const companyId = String(formData.get("company_id") ?? "")
  const title = String(formData.get("title") ?? "").trim()

  if (!companyId || !title) {
    return fail("Takip için müşteri ve başlık gerekli.")
  }

  const payload = {
    company_id: companyId,
    quote_id: optionalString(formData.get("quote_id")),
    title,
    channel: String(formData.get("channel") ?? "Telefon"),
    due_at: optionalString(formData.get("due_at")),
    status: String(formData.get("status") ?? "Açık"),
    note: optionalString(formData.get("note")),
    assigned_to: optionalString(formData.get("assigned_to")) ?? actor.id,
    created_by: actor.id,
  }
  const followUp = isSupabaseConfigured()
    ? await insertRow<FollowUp>("follow_ups", payload)
    : await localInsert<FollowUp>("followUps", payload)

  if (isSupabaseConfigured()) {
    await patchRows<Company>("companies", { id: `eq.${companyId}` }, { status: "Takipte" })
  } else {
    await localPatchCompanyStatus(companyId, "Takipte")
  }

  await recordActivity({
    actorId: actor.id,
    action: "created",
    entityType: "follow_up",
    entityId: followUp.id,
    description: `${title} takip kaydı oluşturuldu.`,
  })
  revalidatePath("/crm")
  revalidatePath("/crm/followups")
  revalidatePath(`/crm/customers/${companyId}`)
  return ok("Takip / hatırlatma oluşturuldu.")
}

export async function updateQuoteOutcomeAction(arg1: FormData | CrmActionState, arg2?: FormData) {
  const formData = formFromArgs(arg1, arg2)
  const actor = await requireUser()
  const quoteId = String(formData.get("quote_id") ?? "")
  const companyId = String(formData.get("company_id") ?? "")
  const outcome = String(formData.get("outcome") ?? "")
  const lostReason = optionalString(formData.get("lost_reason"))

  if (!quoteId || !companyId || !outcome) {
    return fail("Teklif sonucu için teklif, müşteri ve sonuç gerekli.")
  }

  const quotePatch =
    outcome === "accepted"
      ? { status: "Kabul edildi", accepted_at: new Date().toISOString(), lost_reason: null }
      : { status: "Kaybedildi", accepted_at: null, lost_reason: lostReason ?? "Neden girilmedi" }
  const companyStatus = outcome === "accepted" ? "Sözleşme" : "Kaybedildi"

  if (isSupabaseConfigured()) {
    await patchRows<Quote>("quotes", { id: `eq.${quoteId}` }, quotePatch)
    await patchRows<Company>("companies", { id: `eq.${companyId}` }, { status: companyStatus })
  } else {
    await localPatchQuote(quoteId, quotePatch)
    await localPatchCompanyStatus(companyId, companyStatus)
  }

  await recordActivity({
    actorId: actor.id,
    action: "updated",
    entityType: "quote",
    entityId: quoteId,
    description: outcome === "accepted" ? "Teklif kabul edildi, sözleşmeye hazır." : "Teklif kaybedildi.",
  })
  revalidatePath("/crm/quotes")
  revalidatePath(`/crm/customers/${companyId}`)
  return ok(outcome === "accepted" ? "Teklif kabul edildi." : "Teklif kaybedildi olarak işaretlendi.")
}

export async function sendQuoteEmailAction(formData: FormData) {
  const actor = await requireUser()

  const to = String(formData.get("to") ?? "").trim()
  const subject = String(formData.get("subject") ?? "Ekvator360 teklifiniz").trim()
  const text = String(formData.get("text") ?? "").trim()

  if (!to || !text) {
    throw new Error("Alıcı ve e-posta metni gerekli.")
  }

  await sendCrmMail({ to, subject, text })
  const payload = {
    to_email: to,
    subject,
    body: text,
    status: "sent",
    created_by: actor.id,
  }
  if (isSupabaseConfigured()) {
    await insertRow("email_logs", payload)
  } else {
    await localInsert("email_logs", payload)
  }
  await recordActivity({
    actorId: actor.id,
    action: "sent",
    entityType: "email",
    description: `${to} adresine e-posta gönderildi.`,
  })
  revalidatePath("/crm")
}
