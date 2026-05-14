import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium tracking-wide whitespace-nowrap transition-colors",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary/10 text-primary",
        outline: "border-border bg-background text-foreground/80",
        soft: "border-transparent bg-muted text-muted-foreground",
        success:
          "border-transparent bg-[color-mix(in_oklch,var(--success)_15%,transparent)] text-[var(--success)]",
        accent:
          "border-transparent bg-[color-mix(in_oklch,var(--brand-accent)_14%,transparent)] text-[var(--brand-accent)]",
      },
    },
    defaultVariants: { variant: "default" },
  },
)

function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ variant, className }))}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
