import { dateTimeLabel } from "@/components/crm/format"
import { CrmPageShell } from "@/components/crm/page-shell"
import { TaskForm } from "@/components/crm/task-form"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getDashboardData } from "@/lib/crm/data"

export const metadata = {
  title: "Görevler · Ekvator360 CRM",
}

export default async function TasksPage() {
  const data = await getDashboardData()

  return (
    <CrmPageShell
      title="Görevler"
      description="Kullanıcıların kendine veya ekip arkadaşlarına atadığı iç işler."
      helpTitle="Görevler nasıl kullanılır?"
      help="Bu modül müşteri sürecinden ayrıdır. İç ekip işi, operasyon hazırlığı, doküman kontrolü veya toplantı öncesi yapılacakları kullanıcıya atayın. Müşteri teklif takibi için Takip/Hatırlatma modülünü kullanın."
    >
      <Card className="rounded-lg">
        <CardHeader>
          <CardTitle>Yeni görev ata</CardTitle>
          <CardDescription>Görevleri kategori, ekip üyesi ve bitiş tarihiyle yönetin.</CardDescription>
        </CardHeader>
        <CardContent>
          <TaskForm users={data.users} />
        </CardContent>
      </Card>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {data.tasks.map((task) => (
          <Card key={task.id} className="rounded-lg">
            <CardHeader>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <CardTitle>{task.title}</CardTitle>
                  <CardDescription>{dateTimeLabel(task.due_at)}</CardDescription>
                </div>
                <Badge>{task.status}</Badge>
              </div>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              <Badge variant="soft">{task.prefix ?? "Genel"}</Badge>
              <Badge variant="soft">{task.priority}</Badge>
            </CardContent>
          </Card>
        ))}
      </section>
    </CrmPageShell>
  )
}
