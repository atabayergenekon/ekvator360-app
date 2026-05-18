import Link from "next/link"
import { notFound } from "next/navigation"

import { CrmPageShell } from "@/components/crm/page-shell"
import { dateLabel, dateTimeLabel, money } from "@/components/crm/format"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getDashboardData } from "@/lib/crm/data"

export default async function CustomerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const data = await getDashboardData()
  const company = data.companies.find((item) => item.id === id)

  if (!company) {
    notFound()
  }

  const contacts = data.contacts.filter((item) => item.company_id === company.id)
  const deals = data.deals.filter((item) => item.company_id === company.id)
  const quotes = data.quotes.filter((item) => item.company_id === company.id)
  const followUps = data.followUps.filter((item) => item.company_id === company.id)
  const contracts = data.contracts.filter((item) => item.company_id === company.id)
  const steps = data.processSteps.filter((item) => item.company_id === company.id)
  const activities = data.activities.filter((item) => item.entity_id === company.id)

  return (
    <CrmPageShell
      title={company.name}
      description={`${company.status} · ${company.sector ?? "Sektör yok"} · ${company.country ?? "Pazar yok"}`}
      helpTitle="Müşteri detayı nasıl kullanılır?"
      help="Bu sayfa firmanın tek çalışma dosyasıdır. İletişim kişileri, pipeline fırsatları, teklifler, sözleşmeler, 6 aylık süreç adımları ve aktiviteleri birlikte takip edin."
      actions={
        <Button asChild variant="outline">
          <Link href="/crm/customers">Müşterilere dön</Link>
        </Button>
      }
    >
      <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <Card className="rounded-lg">
          <CardHeader>
            <CardTitle>Firma bilgileri</CardTitle>
            <CardDescription>Temel iletişim ve durum.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p>
              <strong>Telefon:</strong> {company.phone ?? "-"}
            </p>
            <p>
              <strong>E-posta:</strong> {company.email ?? "-"}
            </p>
            <p>
              <strong>Etiketler:</strong> {(company.tags ?? []).join(", ") || "-"}
            </p>
            <div className="pt-2">
              <Badge>{company.status}</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-lg">
          <CardHeader>
            <CardTitle>Yetkili kişiler</CardTitle>
            <CardDescription>Müşteri tarafındaki irtibat noktaları.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 md:grid-cols-2">
            {contacts.map((contact) => (
              <div key={contact.id} className="rounded-lg border p-3">
                <p className="font-medium">{contact.full_name}</p>
                <p className="text-xs text-muted-foreground">{contact.title ?? "Unvan yok"}</p>
                <p className="mt-2 text-sm">{contact.email ?? "-"}</p>
                <p className="text-sm">{contact.phone ?? contact.whatsapp ?? "-"}</p>
              </div>
            ))}
            {contacts.length === 0 ? <p className="text-sm text-muted-foreground">Yetkili kişi yok.</p> : null}
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 xl:grid-cols-4">
        <Card className="rounded-lg">
          <CardHeader>
            <CardTitle>Pipeline</CardTitle>
            <CardDescription>Satış öncesi fırsatlar.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {deals.map((deal) => (
              <div key={deal.id} className="rounded-lg border p-3">
                <p className="font-medium">{deal.title}</p>
                <p className="text-sm text-muted-foreground">
                  {deal.stage} · {money(deal.value, deal.currency)}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card className="rounded-lg">
          <CardHeader>
            <CardTitle>Takip/Hatırlatma</CardTitle>
            <CardDescription>Teklif sonrası iletişim ve randevular.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {followUps.map((followUp) => (
              <div key={followUp.id} className="rounded-lg border p-3">
                <p className="font-medium">{followUp.title}</p>
                <p className="text-sm text-muted-foreground">
                  {followUp.channel} · {dateTimeLabel(followUp.due_at)}
                </p>
              </div>
            ))}
            {followUps.length === 0 ? <p className="text-sm text-muted-foreground">Takip yok.</p> : null}
          </CardContent>
        </Card>
        <Card className="rounded-lg">
          <CardHeader>
            <CardTitle>Teklifler</CardTitle>
            <CardDescription>Hazırlanan ve gönderilen teklifler.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {quotes.map((quote) => (
              <div key={quote.id} className="rounded-lg border p-3">
                <p className="font-medium">{quote.quote_no}</p>
                <p className="text-sm text-muted-foreground">
                  {quote.status} · {money(quote.amount, quote.currency)}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card className="rounded-lg">
          <CardHeader>
            <CardTitle>Sözleşmeler</CardTitle>
            <CardDescription>6 aylık hizmet takibi.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {contracts.map((contract) => (
              <div key={contract.id} className="rounded-lg border p-3">
                <p className="font-medium">{contract.contract_no}</p>
                <p className="text-sm text-muted-foreground">
                  {dateLabel(contract.starts_at)} - {dateLabel(contract.ends_at)}
                </p>
                <p className="text-sm">{money(contract.monthly_fee, contract.currency)} / ay</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Card className="rounded-lg">
          <CardHeader>
            <CardTitle>6 aylık süreç akışı</CardTitle>
            <CardDescription>Başlayan firmalar için operasyonel yapılacaklar.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {steps.map((step) => (
              <div key={step.id} className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <p className="font-medium">{step.title}</p>
                  <p className="text-xs text-muted-foreground">{dateLabel(step.due_at)}</p>
                </div>
                <Badge variant="soft">{step.status}</Badge>
              </div>
            ))}
            {steps.length === 0 ? (
              <p className="text-sm text-muted-foreground">Bu müşteri için henüz sözleşmeli süreç yok.</p>
            ) : null}
          </CardContent>
        </Card>

        <Card className="rounded-lg">
          <CardHeader>
            <CardTitle>Aktivite geçmişi</CardTitle>
            <CardDescription>Bu müşteriyle ilişkili son kayıtlar.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {activities.map((activity) => (
              <div key={activity.id} className="border-l-2 border-[var(--brand)] pl-3">
                <p className="text-sm font-medium">{activity.description}</p>
                <p className="text-xs text-muted-foreground">{dateTimeLabel(activity.created_at)}</p>
              </div>
            ))}
            {activities.length === 0 ? <p className="text-sm text-muted-foreground">Aktivite yok.</p> : null}
          </CardContent>
        </Card>
      </section>
    </CrmPageShell>
  )
}
