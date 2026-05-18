"use client"

import { useActionState } from "react"
import { Plus } from "lucide-react"

import { createContractAction, type CrmActionState } from "@/app/crm/actions"
import { Field, SelectField } from "@/components/crm/form-fields"
import { FormStatus } from "@/components/crm/form-status"
import { CompanyOptions, UserOptions } from "@/components/crm/options"
import { Button } from "@/components/ui/button"
import type { Company, CrmUser } from "@/lib/crm/types"

export function ContractForm({ companies, users }: { companies: Company[]; users: CrmUser[] }) {
  const [state, action, pending] = useActionState<CrmActionState, FormData>(createContractAction, {})

  return (
    <form action={action} noValidate className="grid gap-3 md:grid-cols-4" data-testid="contract-form">
      <div className="md:col-span-4">
        <FormStatus state={state} />
      </div>
      <SelectField label="Müşteri" name="company_id">
        <CompanyOptions companies={companies} />
      </SelectField>
      <Field label="Sözleşme no" name="contract_no" placeholder="S25298-081" />
      <Field label="Başlangıç" name="starts_at" type="date" />
      <Field label="Bitiş" name="ends_at" type="date" />
      <Field label="Aylık hizmet bedeli" name="monthly_fee" type="number" defaultValue={144000} />
      <SelectField label="Para birimi" name="currency" defaultValue="TRY">
        <option>TRY</option>
        <option>EUR</option>
        <option>USD</option>
      </SelectField>
      <Field label="Ödeme günü" name="payment_day" type="number" defaultValue={15} />
      <Field label="Yenileme uyarısı" name="renewal_notice_at" type="date" />
      <Field label="Dosya adı" name="file_name" placeholder="Sözleşme PDF adı" />
      <Field label="Dosya yolu / referans" name="file_path" placeholder="Storage veya klasör referansı" />
      <SelectField label="Sorumlu" name="assigned_to">
        <UserOptions users={users} />
      </SelectField>
      <SelectField label="Durum" name="status" defaultValue="Aktif">
        <option>Aktif</option>
        <option>Askıda</option>
        <option>Tamamlandı</option>
        <option>Yenilendi</option>
      </SelectField>
      <div className="md:col-span-4">
        <Button type="submit" disabled={pending} data-testid="contract-submit">
          <Plus className="size-4" />
          {pending ? "Oluşturuluyor" : "Sözleşmeye dönüştür"}
        </Button>
      </div>
    </form>
  )
}
