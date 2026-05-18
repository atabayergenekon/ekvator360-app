import Link from "next/link"
import { ArrowUpRight, CalendarClock, FileSpreadsheet, TrendingUp, UsersRound } from "lucide-react"

import { CrmPageShell } from "@/components/crm/page-shell"
import { dateTimeLabel, money } from "@/components/crm/format"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getCurrentUser } from "@/lib/crm/auth"
import { getDashboardData } from "@/lib/crm/data"

export const metadata = {
  title: "CRM Dashboard · Ekvator360",
}

export default async function CrmPage() {
  const [user, data] = await Promise.all([getCurrentUser(), getDashboardData()])
  const pipelineValue = data.deals.reduce((total, deal) => total + Number(deal.value ?? 0), 0)
  const activeContracts = data.contracts.filter((contract) => contract.status === "Aktif")
  const overdueSteps = data.processSteps.filter((step) => {
    return step.status !== "Tamamlandı" && step.due_at && new Date(step.due_at) < new Date()
  })
  const openFollowUps = data.followUps.filter((followUp) => followUp.status !== "Tamamlandı")

  return (
    <CrmPageShell
      title="Dashboard"
      description={`Hoş geldiniz ${user?.full_name}. Ekvator360 müşteri, satış ve 6 aylık hizmet süreç özeti.`}
      helpTitle="Dashboard nasıl kullanılır?"
      help="Burada genel sağlık durumunu görürsünüz: açık fırsatlar, başlayan sözleşmeler, geciken süreç adımları ve yaklaşan görevler. Detay için kartlardaki modül bağlantılarına geçin."
    >
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card className="rounded-lg">
          <CardHeader>
            <CardDescription>Pipeline değeri</CardDescription>
            <CardTitle className="text-2xl">{money(pipelineValue)}</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{data.deals.length} aktif fırsat</span>
            <TrendingUp className="size-4 text-emerald-600" />
          </CardContent>
        </Card>
        <Card className="rounded-lg">
          <CardHeader>
            <CardDescription>Müşteri kartları</CardDescription>
            <CardTitle className="text-2xl">{data.companies.length}</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{data.contacts.length} yetkili kişi</span>
            <UsersRound className="size-4 text-[var(--brand)]" />
          </CardContent>
        </Card>
        <Card className="rounded-lg">
          <CardHeader>
            <CardDescription>Aktif sözleşmeler</CardDescription>
            <CardTitle className="text-2xl">{activeContracts.length}</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{overdueSteps.length} geciken süreç adımı</span>
            <FileSpreadsheet className="size-4 text-violet-600" />
          </CardContent>
        </Card>
        <Card className="rounded-lg">
          <CardHeader>
            <CardDescription>Takip/Hatırlatma</CardDescription>
            <CardTitle className="text-2xl">{openFollowUps.length}</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Teklif sonrası temaslar</span>
            <CalendarClock className="size-4 text-blue-600" />
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
        <Card className="rounded-lg">
          <CardHeader className="flex-row items-center justify-between">
            <div>
              <CardTitle>Bugün ne yapılacak?</CardTitle>
              <CardDescription>Teklif takipleri, müşteri randevuları ve geciken süreç adımları.</CardDescription>
            </div>
            <Button asChild variant="outline">
              <Link href="/crm/process">
                Süreçlere git
                <ArrowUpRight className="size-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {openFollowUps.slice(0, 3).map((followUp) => (
              <div key={followUp.id} className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <p className="font-medium">{followUp.title}</p>
                  <p className="text-xs text-muted-foreground">{dateTimeLabel(followUp.due_at)}</p>
                </div>
                <Badge variant="soft">{followUp.channel}</Badge>
              </div>
            ))}
            {[...overdueSteps.slice(0, 3), ...data.processSteps.slice(0, 3)].slice(0, 4).map((step) => (
              <div key={step.id} className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <p className="font-medium">{step.title}</p>
                  <p className="text-xs text-muted-foreground">{dateTimeLabel(step.due_at)}</p>
                </div>
                <Badge variant={step.status === "Gecikti" ? "accent" : "soft"}>{step.status}</Badge>
              </div>
            ))}
            {data.processSteps.length === 0 && openFollowUps.length === 0 ? (
              <p className="text-sm text-muted-foreground">Henüz takip veya sözleşmeli süreç oluşturulmadı.</p>
            ) : null}
          </CardContent>
        </Card>

        <Card className="rounded-lg">
          <CardHeader>
            <CardTitle>Son aktiviteler</CardTitle>
            <CardDescription>Müşteri, teklif, görev ve sözleşme hareketleri.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {data.activities.slice(0, 8).map((activity) => (
              <div key={activity.id} className="border-l-2 border-[var(--brand)] pl-3">
                <p className="text-sm font-medium">{activity.description}</p>
                <p className="text-xs text-muted-foreground">{dateTimeLabel(activity.created_at)}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </CrmPageShell>
  )
}
