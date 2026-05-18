"use client"

import { useActionState } from "react"
import { Plus } from "lucide-react"

import { createCompanyAction, type CrmActionState } from "@/app/crm/actions"
import { Field, SelectField } from "@/components/crm/form-fields"
import { FormStatus } from "@/components/crm/form-status"
import { customerStatuses, UserOptions } from "@/components/crm/options"
import { Button } from "@/components/ui/button"
import type { CrmUser } from "@/lib/crm/types"

export function CustomerForm({ users }: { users: CrmUser[] }) {
  const [state, action, pending] = useActionState<CrmActionState, FormData>(createCompanyAction, {})

  return (
    <form action={action} noValidate className="grid gap-3 md:grid-cols-3">
      <div className="md:col-span-3">
        <FormStatus state={state} />
      </div>
      <Field label="Firma adı" name="name" placeholder="Firma Ltd." />
      <Field label="Sektör" name="sector" placeholder="Mobilya, makine, gıda" />
      <Field label="Ülke / hedef pazar" name="country" placeholder="Almanya" />
      <Field label="Yetkili kişi" name="contact_name" placeholder="Ad Soyad" />
      <Field label="Telefon" name="phone" placeholder="+90..." />
      <Field label="E-posta" name="email" type="email" placeholder="mail@firma.com" />
      <Field label="WhatsApp" name="whatsapp" placeholder="+905..." />
      <Field label="Etiketler" name="tags" placeholder="ihracat, sözleşme adayı" />
      <SelectField label="Durum" name="status" defaultValue="Lead">
        {customerStatuses.map((status) => (
          <option key={status}>{status}</option>
        ))}
      </SelectField>
      <SelectField label="Sorumlu" name="assigned_to">
        <UserOptions users={users} />
      </SelectField>
      <div className="flex items-end md:col-span-2">
        <Button type="submit" disabled={pending}>
          <Plus className="size-4" />
          {pending ? "Ekleniyor" : "Firma ekle"}
        </Button>
      </div>
    </form>
  )
}
