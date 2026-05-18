import { HelpCard } from "@/components/crm/help-card"

export function CrmPageShell({
  eyebrow = "Ekvator360 CRM",
  title,
  description,
  helpTitle,
  help,
  actions,
  children,
}: {
  eyebrow?: string
  title: string
  description: string
  helpTitle: string
  help: React.ReactNode
  actions?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <main className="space-y-6 px-4 py-6 lg:px-6">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-medium text-[var(--brand)]">{eyebrow}</p>
          <h1 className="text-2xl font-semibold tracking-tight lg:text-3xl">{title}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        </div>
        {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
      </div>
      <HelpCard title={helpTitle}>{help}</HelpCard>
      {children}
    </main>
  )
}
