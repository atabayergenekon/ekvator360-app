"use client"

import { useActionState } from "react"
import { Plus } from "lucide-react"

import { createQuoteAction, updateQuoteOutcomeAction, type CrmActionState } from "@/app/crm/actions"
import { Field, SelectField } from "@/components/crm/form-fields"
import { FormStatus } from "@/components/crm/form-status"
import { CompanyOptions } from "@/components/crm/options"
import { Button } from "@/components/ui/button"
import type { Company, Quote } from "@/lib/crm/types"

export function QuoteForm({ companies }: { companies: Company[] }) {
  const [state, action, pending] = useActionState<CrmActionState, FormData>(createQuoteAction, {})

  return (
    <form action={action} noValidate className="grid gap-3 md:grid-cols-2">
      <div className="md:col-span-2">
        <FormStatus state={state} />
      </div>
      <Field label="Teklif no" name="quote_no" placeholder="EKV-2026-0001" />
      <SelectField label="Firma" name="company_id">
        <CompanyOptions companies={companies} />
      </SelectField>
      <Field label="Konu" name="subject" />
      <Field label="Tutar" name="amount" type="number" />
      <Field label="Geçerlilik" name="valid_until" type="date" />
      <Field label="Takip tarihi" name="follow_up_at" type="datetime-local" />
      <SelectField label="Durum" name="status" defaultValue="Taslak">
        <option>Taslak</option>
        <option>Teklif Hazırlanıyor</option>
        <option>Teklif Gönderildi</option>
        <option>Kabul edildi</option>
        <option>Kaybedildi</option>
      </SelectField>
      <div className="flex items-end">
        <Button type="submit" disabled={pending}>
          <Plus className="size-4" />
          {pending ? "Oluşturuluyor" : "Teklif oluştur"}
        </Button>
      </div>
    </form>
  )
}

export function QuoteOutcomeForm({ quote }: { quote: Quote }) {
  const [state, action, pending] = useActionState<CrmActionState, FormData>(updateQuoteOutcomeAction, {})

  return (
    <form action={action} noValidate className="mt-3 grid gap-2">
      <FormStatus state={state} />
      <input type="hidden" name="quote_id" value={quote.id} />
      <input type="hidden" name="company_id" value={quote.company_id ?? ""} />
      <label className="grid gap-1.5 text-xs font-medium">
        Kayıp nedeni
        <input
          name="lost_reason"
          placeholder="Fiyat, zamanlama, kapsam..."
          className="h-8 rounded-lg border bg-background px-2 text-xs outline-none"
        />
      </label>
      <div className="flex flex-wrap gap-2">
        <Button type="submit" name="outcome" value="accepted" size="sm" disabled={pending || !quote.company_id}>
          Sözleşmeye dönüştür
        </Button>
        <Button
          type="submit"
          name="outcome"
          value="lost"
          size="sm"
          variant="outline"
          disabled={pending || !quote.company_id}
        >
          Kaybedildi olarak işaretle
        </Button>
      </div>
    </form>
  )
}
