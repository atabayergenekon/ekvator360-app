import Link from "next/link"
import { Mail, MessageCircle } from "lucide-react"

import { CustomerForm } from "@/components/crm/customer-form"
import { CrmPageShell } from "@/components/crm/page-shell"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getDashboardData } from "@/lib/crm/data"

export const metadata = {
  title: "Müşteriler · Ekvator360 CRM",
}

export default async function CustomersPage() {
  const data = await getDashboardData()

  return (
    <CrmPageShell
      title="Müşteriler"
      description="Ekvator360 hizmetleri için takip edilen firma, yetkili kişi ve iletişim kayıtları."
      helpTitle="Müşteriler nasıl kullanılır?"
      help="Yeni firmayı Lead olarak ekleyin, görüşme ilerledikçe durumunu Teklifte veya Başladı yapın. Karttan müşteri detayına geçerek teklif, randevu, not ve sözleşme sürecini tek yerde yönetin."
    >
      <Card className="rounded-lg">
        <CardHeader>
          <CardTitle>Yeni müşteri / firma kartı</CardTitle>
          <CardDescription>İlk temas bilgilerini girin; detay sayfasında süreç derinleşir.</CardDescription>
        </CardHeader>
        <CardContent>
          <CustomerForm users={data.users} />
        </CardContent>
      </Card>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {data.companies.map((company) => (
          <Card key={company.id} className="rounded-lg">
            <CardHeader>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <CardTitle>{company.name}</CardTitle>
                  <CardDescription>
                    {company.sector ?? "Sektör yok"} · {company.country ?? "Pazar yok"}
                  </CardDescription>
                </div>
                <Badge>{company.status}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {(company.tags ?? []).map((tag) => (
                  <Badge key={tag} variant="soft">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {company.email ? (
                  <Button asChild size="sm" variant="outline">
                    <a href={`mailto:${company.email}`}>
                      <Mail className="size-4" />
                      Mail
                    </a>
                  </Button>
                ) : null}
                {company.phone ? (
                  <Button asChild size="sm" variant="outline">
                    <a href={`https://wa.me/${company.phone.replace(/\D/g, "")}`} target="_blank">
                      <MessageCircle className="size-4" />
                      WhatsApp
                    </a>
                  </Button>
                ) : null}
                <Button asChild size="sm">
                  <Link href={`/crm/customers/${company.id}`}>Detay</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>
    </CrmPageShell>
  )
}
