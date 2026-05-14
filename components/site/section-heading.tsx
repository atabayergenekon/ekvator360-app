import * as React from "react"

import { cn } from "@/lib/utils"

type Align = "left" | "center"

interface SectionHeadingProps {
  eyebrow?: string
  title: React.ReactNode
  subtitle?: React.ReactNode
  align?: Align
  className?: string
  as?: "h2" | "h3"
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className,
  as = "h2",
}: SectionHeadingProps) {
  const Title = as
  return (
    <div
      className={cn(
        "flex max-w-3xl flex-col gap-4",
        align === "center" && "mx-auto items-center text-center",
        className,
      )}
    >
      {eyebrow ? (
        <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-primary">
          <span className="h-px w-6 bg-primary/40" aria-hidden />
          {eyebrow}
        </span>
      ) : null}
      <Title className="text-balance text-3xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-4xl lg:text-[44px]">
        {title}
      </Title>
      {subtitle ? (
        <p className="text-balance text-base leading-relaxed text-muted-foreground sm:text-lg">
          {subtitle}
        </p>
      ) : null}
    </div>
  )
}
