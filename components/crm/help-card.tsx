import { Info } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"

export function HelpCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Card className="rounded-lg border-[var(--brand)]/20 bg-[color-mix(in_oklch,var(--brand)_5%,white)] p-0">
      <CardContent className="flex gap-3 p-4 text-sm leading-6 text-muted-foreground">
        <div className="mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-[var(--brand)] text-white">
          <Info className="size-4" aria-hidden="true" />
        </div>
        <div>
          <p className="font-semibold text-foreground">(i) {title}</p>
          <div className="mt-1">{children}</div>
        </div>
      </CardContent>
    </Card>
  )
}
