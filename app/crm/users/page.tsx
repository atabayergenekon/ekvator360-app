import { Plus } from "lucide-react"

import { createUserAction } from "@/app/crm/actions"
import { Field, SelectField } from "@/components/crm/form-fields"
import { CrmPageShell } from "@/components/crm/page-shell"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getCurrentUser } from "@/lib/crm/auth"
import { getDashboardData } from "@/lib/crm/data"

export const metadata = {
  title: "Kullanıcılar · Ekvator360 CRM",
}

export default async function UsersPage() {
  const [user, data] = await Promise.all([getCurrentUser(), getDashboardData()])

  return (
    <CrmPageShell
      title="Kullanıcılar"
      description="Ekip üyeleri, admin/user rol ayrımı ve erişim yönetimi."
      helpTitle="Kullanıcılar nasıl kullanılır?"
      help="Admin yeni kullanıcı açar ve rol atar. User rolü müşteri, görev, teklif ve süreçleri yönetebilir; kullanıcı yönetimi admin’e ayrılır."
    >
      <Card className="rounded-lg">
        <CardHeader>
          <CardTitle>Kullanıcı oluştur</CardTitle>
          <CardDescription>Sadece admin hesaplar kullanıcı açabilir.</CardDescription>
        </CardHeader>
        <CardContent>
          {user?.role === "admin" ? (
            <form action={createUserAction} className="grid gap-3 md:grid-cols-3">
              <Field label="Ad soyad" name="full_name" required />
              <Field label="Kullanıcı adı" name="username" required />
              <Field label="E-posta" name="email" type="email" />
              <Field label="Geçici şifre" name="password" type="password" required />
              <SelectField label="Rol" name="role" defaultValue="user">
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </SelectField>
              <div className="flex items-end">
                <Button type="submit">
                  <Plus className="size-4" />
                  Kullanıcı oluştur
                </Button>
              </div>
            </form>
          ) : (
            <p className="text-sm text-muted-foreground">
              Kullanıcı oluşturma ve rol atama yalnızca admin hesabına açıktır.
            </p>
          )}
        </CardContent>
      </Card>

      <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {data.users.map((crmUser) => (
          <Card key={crmUser.id} className="rounded-lg">
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="font-medium">{crmUser.full_name}</p>
                <p className="text-xs text-muted-foreground">{crmUser.username}</p>
              </div>
              <Badge variant={crmUser.role === "admin" ? "default" : "soft"}>{crmUser.role}</Badge>
            </CardContent>
          </Card>
        ))}
      </section>
    </CrmPageShell>
  )
}
