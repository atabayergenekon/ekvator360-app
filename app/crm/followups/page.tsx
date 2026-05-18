import { CalendarClock } from "lucide-react"

import { FollowUpForm } from "@/components/crm/follow-up-form"
import { dateTimeLabel } from "@/components/crm/format"
import { CrmPageShell } from "@/components/crm/page-shell"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getDashboardData } from "@/lib/crm/data"

export const metadata = {
  title: "Takip/Hatırlatma · Ekvator360 CRM",
}

export default async function FollowUpsPage() {
  const data = await getDashboardData()

  return (
    <CrmPageShell
      title="Takip/Hatırlatma"
      description="Teklif sonrası müşteri follow-up, randevu, sunum ve iletişim hatırlatmaları."
      helpTitle="Takip/Hatırlatma nasıl kullanılır?"
      help="Teklif gönderildikten sonra müşteriyi burada takip edin. Takipler müşteri ve istenirse teklif ile bağlıdır; ekip içi görevlerden ayrı tutulur."
    >
      <Card className="rounded-lg">
        <CardHeader>
          <CardTitle>Takip ekle</CardTitle>
          <CardDescription>Müşteri veya teklif için bir sonraki temas adımını planlayın.</CardDescription>
        </CardHeader>
        <CardContent>
          <FollowUpForm companies={data.companies} quotes={data.quotes} users={data.users} />
        </CardContent>
      </Card>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {data.followUps.map((followUp) => {
          const company = data.companies.find((item) => item.id === followUp.company_id)
          const quote = data.quotes.find((item) => item.id === followUp.quote_id)
          return (
            <Card key={followUp.id} className="rounded-lg">
              <CardHeader>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <CardTitle>{followUp.title}</CardTitle>
                    <CardDescription>{company?.name ?? "Firma bulunamadı"}</CardDescription>
                  </div>
                  <Badge>{followUp.status}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p className="flex items-center gap-2">
                  <CalendarClock className="size-4" />
                  {dateTimeLabel(followUp.due_at)}
                </p>
                <p>Kanal: {followUp.channel}</p>
                {quote ? <p>Teklif: {quote.quote_no}</p> : null}
                {followUp.note ? <p className="text-foreground">{followUp.note}</p> : null}
              </CardContent>
            </Card>
          )
        })}
      </section>
    </CrmPageShell>
  )
}
