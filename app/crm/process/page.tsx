import Link from "next/link"
import { FileText } from "lucide-react"

import { updateProcessStepStatusAction } from "@/app/crm/actions"
import { ContractForm } from "@/components/crm/contract-form"
import { dateLabel, money } from "@/components/crm/format"
import { processStatuses } from "@/components/crm/options"
import { CrmPageShell } from "@/components/crm/page-shell"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getDashboardData } from "@/lib/crm/data"

export const metadata = {
  title: "Süreç/Sözleşmeler · Ekvator360 CRM",
}

export default async function ProcessPage() {
  const data = await getDashboardData()

  return (
    <CrmPageShell
      title="Süreç/Sözleşmeler"
      description="Sözleşmeye dönen müşteriler için bağımsız operasyon ve hizmet süreci."
      helpTitle="Süreç/Sözleşmeler nasıl kullanılır?"
      help="Teklif kabul edilince müşteriyi sözleşmeye dönüştürün. Başlangıç ve bitiş tarihini siz seçersiniz; bitiş boşsa 6 ay sonrası kullanılır. Süreç adımları yalnızca burada ve müşteri detayında güncellenir."
    >
      <Card className="rounded-lg">
        <CardHeader>
          <CardTitle>Sözleşme oluştur</CardTitle>
          <CardDescription>Sözleşme açılınca müşteri bazlı süreç adımları otomatik üretilir.</CardDescription>
        </CardHeader>
        <CardContent>
          <ContractForm companies={data.companies} users={data.users} />
        </CardContent>
      </Card>

      <section className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <Card className="rounded-lg">
          <CardHeader>
            <CardTitle>Sözleşmeler</CardTitle>
            <CardDescription>Aktif, askıda ve tamamlanan hizmet sözleşmeleri.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {data.contracts.map((contract) => {
              const company = data.companies.find((item) => item.id === contract.company_id)
              return (
                <div key={contract.id} className="rounded-lg border p-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-medium">{contract.contract_no}</p>
                      <p className="text-sm text-muted-foreground">{company?.name ?? "Firma bulunamadı"}</p>
                    </div>
                    <Badge>{contract.status}</Badge>
                  </div>
                  <p className="mt-2 text-sm">
                    {dateLabel(contract.starts_at)} - {dateLabel(contract.ends_at)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {money(contract.monthly_fee, contract.currency)} / ay · ödeme günü {contract.payment_day}
                  </p>
                  {contract.file_name ? (
                    <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                      <FileText className="size-3.5" />
                      {contract.file_name}
                    </div>
                  ) : null}
                  <Button asChild className="mt-3" size="sm" variant="outline">
                    <Link href={`/crm/customers/${contract.company_id}`}>Müşteri detayına git</Link>
                  </Button>
                </div>
              )
            })}
            {data.contracts.length === 0 ? (
              <p className="text-sm text-muted-foreground">Henüz sözleşme kaydı yok.</p>
            ) : null}
          </CardContent>
        </Card>

        <Card className="rounded-lg">
          <CardHeader>
            <CardTitle>Süreç akışı</CardTitle>
            <CardDescription>Onboarding, takip, raporlama, ödeme ve yenileme adımları.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {data.processSteps.map((step) => {
              const company = data.companies.find((item) => item.id === step.company_id)
              const overdue = step.status !== "Tamamlandı" && step.due_at && new Date(step.due_at) < new Date()
              return (
                <div key={step.id} className="rounded-lg border p-3">
                  <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-medium">{step.title}</p>
                        <Badge variant={overdue ? "accent" : "soft"}>{overdue ? "Gecikti" : step.status}</Badge>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">{step.description}</p>
                      <p className="mt-2 text-xs text-muted-foreground">
                        {company?.name ?? "Firma bulunamadı"} · hedef tarih {dateLabel(step.due_at)}
                      </p>
                    </div>
                    <form action={updateProcessStepStatusAction} className="flex shrink-0 gap-2">
                      <input type="hidden" name="id" value={step.id} />
                      <select name="status" defaultValue={step.status} className="h-9 rounded-lg border px-2 text-sm">
                        {processStatuses.map((status) => (
                          <option key={status}>{status}</option>
                        ))}
                      </select>
                      <Button type="submit" size="sm" variant="outline">
                        Süreç adımı tamamla
                      </Button>
                    </form>
                  </div>
                </div>
              )
            })}
            {data.processSteps.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Süreç akışı görmek için önce bir sözleşme oluşturun.
              </p>
            ) : null}
          </CardContent>
        </Card>
      </section>
    </CrmPageShell>
  )
}
