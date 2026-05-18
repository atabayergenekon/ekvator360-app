"use client"

import { useActionState } from "react"
import { Plus } from "lucide-react"

import { createTaskAction, type CrmActionState } from "@/app/crm/actions"
import { Field, SelectField } from "@/components/crm/form-fields"
import { FormStatus } from "@/components/crm/form-status"
import { taskPrefixes, UserOptions } from "@/components/crm/options"
import { Button } from "@/components/ui/button"
import type { CrmUser } from "@/lib/crm/types"

export function TaskForm({ users }: { users: CrmUser[] }) {
  const [state, action, pending] = useActionState<CrmActionState, FormData>(createTaskAction, {})

  return (
    <form action={action} noValidate className="grid gap-3 md:grid-cols-5">
      <div className="md:col-span-5">
        <FormStatus state={state} />
      </div>
      <Field label="Görev" name="title" placeholder="İç ekip işi" />
      <SelectField label="Kategori" name="prefix" defaultValue="Genel">
        {taskPrefixes.map((prefix) => (
          <option key={prefix}>{prefix}</option>
        ))}
      </SelectField>
      <Field label="Bitiş zamanı" name="due_at" type="datetime-local" />
      <SelectField label="Öncelik" name="priority" defaultValue="Orta">
        <option>Yüksek</option>
        <option>Orta</option>
        <option>Düşük</option>
      </SelectField>
      <SelectField label="Sorumlu" name="assigned_to">
        <UserOptions users={users} />
      </SelectField>
      <div className="md:col-span-5">
        <Button type="submit" disabled={pending}>
          <Plus className="size-4" />
          {pending ? "Atanıyor" : "Görev ata"}
        </Button>
      </div>
    </form>
  )
}
