import { Plus } from "lucide-react"

import { createDealAction, createLeadAction, updateDealStageAction } from "@/app/crm/actions"
import { Field, SelectField } from "@/components/crm/form-fields"
import { money } from "@/components/crm/format"
import { CompanyOptions, pipelineStages, UserOptions } from "@/components/crm/options"
import { CrmPageShell } from "@/components/crm/page-shell"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getDashboardData } from "@/lib/crm/data"

export const metadata = {
  title: "Pipeline · Ekvator360 CRM",
}

export default async function PipelinePage() {
  const data = await getDashboardData()

  return (
    <CrmPageShell
      title="Pipeline"
      description="İlk temastan başlama veya kaybetme kararına kadar satış öncesi akış."
      helpTitle="Pipeline nasıl kullanılır?"
      help="Lead’i ekleyin, sunum/randevu sonrası fırsat oluşturun ve aşamayı ilerletin. Başladı aşaması sözleşme ve süreç modülüne geçiş sinyalidir; Kaybedildi ise nedenleri aktivite/not olarak takip edilmelidir."
    >
      <section className="grid gap-6 xl:grid-cols-2">
        <Card className="rounded-lg">
          <CardHeader>
            <CardTitle>Lead ekle</CardTitle>
            <CardDescription>Potansiyel müşteriyi ilk temas listesine alın.</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={createLeadAction} className="grid gap-3 md:grid-cols-2">
              <Field label="Firma" name="company_name" required />
              <Field label="Yetkili" name="contact_name" />
              <Field label="Kaynak" name="source" placeholder="Fuar, LinkedIn, referans" />
              <Field label="Tahmini değer" name="estimated_value" type="number" />
              <Field label="Follow-up" name="next_follow_up_at" type="datetime-local" />
              <SelectField label="Sorumlu" name="assigned_to">
                <UserOptions users={data.users} />
              </SelectField>
              <div className="md:col-span-2">
                <Button type="submit">
                  <Plus className="size-4" />
                  Lead ekle
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card className="rounded-lg">
          <CardHeader>
            <CardTitle>Fırsat oluştur</CardTitle>
            <CardDescription>Sunum, teklif veya müzakere aşamasındaki satışı pipeline’a alın.</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={createDealAction} className="grid gap-3 md:grid-cols-2">
              <Field label="Başlık" name="title" required />
              <SelectField label="Firma" name="company_id">
                <CompanyOptions companies={data.companies} />
              </SelectField>
              <SelectField label="Aşama" name="stage" defaultValue="İlk temas">
                {pipelineStages.map((stage) => (
                  <option key={stage}>{stage}</option>
                ))}
              </SelectField>
              <Field label="Değer" name="value" type="number" />
              <Field label="Kapanış tarihi" name="expected_close_at" type="date" />
              <SelectField label="Sorumlu" name="assigned_to">
                <UserOptions users={data.users} />
              </SelectField>
              <div className="md:col-span-2">
                <Button type="submit">
                  <Plus className="size-4" />
                  Pipeline’a ekle
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </section>

      <section className="flex gap-4 overflow-x-auto pb-2">
        {pipelineStages.map((stage) => {
          const deals = data.deals.filter((deal) => deal.stage === stage)
          return (
            <div key={stage} className="min-w-[260px] flex-1 rounded-lg border bg-muted/35 p-3">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-semibold">{stage}</h3>
                <Badge variant="soft">{deals.length}</Badge>
              </div>
              <div className="space-y-3">
                {deals.map((deal) => (
                  <Card key={deal.id} className="rounded-lg bg-white p-0">
                    <CardContent className="p-3">
                      <p className="font-medium">{deal.title}</p>
                      <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                        <span>{money(deal.value, deal.currency)}</span>
                        <span>%{deal.probability}</span>
                      </div>
                      <form action={updateDealStageAction} className="mt-3 flex gap-2">
                        <input type="hidden" name="id" value={deal.id} />
                        <select name="stage" defaultValue={deal.stage} className="h-8 flex-1 rounded-lg border px-2 text-xs">
                          {pipelineStages.map((item) => (
                            <option key={item}>{item}</option>
                          ))}
                        </select>
                        <Button type="submit" size="sm" variant="outline">
                          Taşı
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )
        })}
      </section>
    </CrmPageShell>
  )
}
