import { Mail } from "lucide-react"

import { sendQuoteEmailAction } from "@/app/crm/actions"
import { Field } from "@/components/crm/form-fields"
import { dateLabel, dateTimeLabel, money } from "@/components/crm/format"
import { CrmPageShell } from "@/components/crm/page-shell"
import { QuoteForm, QuoteOutcomeForm } from "@/components/crm/quote-form"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getDashboardData } from "@/lib/crm/data"

export const metadata = {
  title: "Teklifler · Ekvator360 CRM",
}

export default async function QuotesPage() {
  const data = await getDashboardData()

  return (
    <CrmPageShell
      title="Teklifler"
      description="Müşteriye teklif oluşturun, takip tarihini belirleyin, kabul veya kayıp sonucunu işleyin."
      helpTitle="Teklifler nasıl kullanılır?"
      help="Akış müşteriyle başlar: teklif oluşturun, takip tarihini girin, sonra Takip/Hatırlatma modülünden görüşmeleri planlayın. Kabul edilen teklif sözleşmeye döner; kaybedilen teklif müşteri durumunu Kaybedildi yapar."
    >
      <section className="grid gap-6 xl:grid-cols-2">
        <Card className="rounded-lg">
          <CardHeader>
            <CardTitle>Teklif oluştur</CardTitle>
            <CardDescription>Teklifi müşteriyle bağlayın ve takip tarihini belirleyin.</CardDescription>
          </CardHeader>
          <CardContent>
            <QuoteForm companies={data.companies} />
          </CardContent>
        </Card>

        <Card className="rounded-lg">
          <CardHeader>
            <CardTitle>E-posta gönder</CardTitle>
            <CardDescription>SMTP hazır; DNS/port sorunu çözülünce gönderim çalışır.</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={sendQuoteEmailAction} className="grid gap-3">
              <Field label="Alıcı" name="to" type="email" required placeholder="musteri@firma.com" />
              <Field label="Konu" name="subject" required placeholder="Ekvator360 teklifiniz" />
              <label className="grid gap-1.5 text-sm font-medium">
                Mesaj
                <textarea
                  name="text"
                  required
                  rows={5}
                  className="rounded-lg border bg-background px-3 py-2 text-sm outline-none transition focus:border-[var(--brand)] focus:ring-3 focus:ring-[var(--brand)]/10"
                  placeholder="Merhaba, teklif detaylarımız ektedir..."
                />
              </label>
              <Button type="submit">
                <Mail className="size-4" />
                E-posta gönder
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {data.quotes.map((quote) => (
          <Card key={quote.id} className="rounded-lg">
            <CardHeader>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <CardTitle>{quote.quote_no}</CardTitle>
                  <CardDescription>{quote.subject}</CardDescription>
                </div>
                <Badge>{quote.status}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>{money(quote.amount, quote.currency)}</p>
              <p>Geçerlilik: {dateLabel(quote.valid_until)}</p>
              <p>Takip: {dateTimeLabel(quote.follow_up_at)}</p>
              {quote.lost_reason ? <p>Kayıp nedeni: {quote.lost_reason}</p> : null}
              <QuoteOutcomeForm quote={quote} />
            </CardContent>
          </Card>
        ))}
      </section>
    </CrmPageShell>
  )
}
