"use client"

import { useActionState } from "react"
import { Plus } from "lucide-react"

import { createFollowUpAction, type CrmActionState } from "@/app/crm/actions"
import { Field, SelectField } from "@/components/crm/form-fields"
import { FormStatus } from "@/components/crm/form-status"
import { CompanyOptions, followUpChannels, QuoteOptions, UserOptions } from "@/components/crm/options"
import { Button } from "@/components/ui/button"
import type { Company, CrmUser, Quote } from "@/lib/crm/types"

export function FollowUpForm({
  companies,
  quotes,
  users,
}: {
  companies: Company[]
  quotes: Quote[]
  users: CrmUser[]
}) {
  const [state, action, pending] = useActionState<CrmActionState, FormData>(createFollowUpAction, {})

  return (
    <form action={action} noValidate className="grid gap-3 md:grid-cols-3">
      <div className="md:col-span-3">
        <FormStatus state={state} />
      </div>
      <SelectField label="Müşteri" name="company_id">
        <CompanyOptions companies={companies} />
      </SelectField>
      <SelectField label="Teklif" name="quote_id">
        <QuoteOptions quotes={quotes} />
      </SelectField>
      <Field label="Başlık" name="title" placeholder="Teklif sonrası arama" />
      <SelectField label="Kanal" name="channel" defaultValue="Telefon">
        {followUpChannels.map((channel) => (
          <option key={channel}>{channel}</option>
        ))}
      </SelectField>
      <Field label="Hatırlatma" name="due_at" type="datetime-local" />
      <SelectField label="Sorumlu" name="assigned_to">
        <UserOptions users={users} />
      </SelectField>
      <label className="grid gap-1.5 text-sm font-medium md:col-span-3">
        Not
        <textarea
          name="note"
          rows={3}
          className="rounded-lg border bg-background px-3 py-2 text-sm outline-none transition focus:border-[var(--brand)] focus:ring-3 focus:ring-[var(--brand)]/10"
          placeholder="Görüşme notu veya beklenen aksiyon"
        />
      </label>
      <div className="md:col-span-3">
        <Button type="submit" disabled={pending}>
          <Plus className="size-4" />
          {pending ? "Ekleniyor" : "Takip ekle"}
        </Button>
      </div>
    </form>
  )
}
