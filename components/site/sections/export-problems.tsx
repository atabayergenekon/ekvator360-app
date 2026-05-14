"use client"

import {
  AlertTriangle,
  Languages,
  MapPinOff,
  MessageSquareOff,
  TrendingDown,
  Users2,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

import { Container } from "@/components/site/container"
import { SectionHeading } from "@/components/site/section-heading"
import { useLanguage } from "@/lib/i18n/language-provider"

const problemIcons: LucideIcon[] = [
  MapPinOff,
  Languages,
  MessageSquareOff,
  Users2,
  TrendingDown,
  AlertTriangle,
]

export function ExportProblemsSection() {
  const { t } = useLanguage()

  return (
    <section id="problems" className="relative scroll-mt-24 py-24 lg:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-70"
        style={{
          background:
            "linear-gradient(180deg, color-mix(in oklch, var(--brand-accent) 4%, transparent), transparent 80%)",
        }}
      />
      <Container>
        <SectionHeading
          eyebrow={t.problems.eyebrow}
          title={
            <>
              {t.problems.titleStart}{" "}
              <span className="font-semibold text-[var(--brand-accent)]">
                {t.problems.titleHighlight}
              </span>{" "}
              {t.problems.titleEnd}
            </>
          }
          subtitle={t.problems.subtitle}
          align="center"
          className="mx-auto"
        />

        <div className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
          {t.problems.items.map((p, i) => {
            const Icon = problemIcons[i] ?? AlertTriangle
            return (
              <div
                key={p.title}
                className="group relative flex flex-col gap-4 bg-background p-8 transition-colors hover:bg-[color-mix(in_oklch,var(--brand-accent)_4%,white)]"
              >
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-[color-mix(in_oklch,var(--brand-accent)_10%,white)] text-[var(--brand)]">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="text-[16px] font-semibold tracking-tight text-foreground">
                    {p.title}
                  </h3>
                </div>
                <p className="text-[14.5px] leading-relaxed text-muted-foreground">
                  {p.body}
                </p>
                <div
                  aria-hidden
                  className="absolute inset-x-8 bottom-0 h-px bg-gradient-to-r from-transparent via-[var(--brand-accent)]/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
                />
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
