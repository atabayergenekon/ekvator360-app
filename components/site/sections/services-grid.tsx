"use client"

import {
  ArrowUpRight,
  Briefcase,
  ClipboardCheck,
  Compass,
  FileSearch,
  GitBranch,
  Globe2,
  Network,
  Plane,
  Users,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

import { Container } from "@/components/site/container"
import { SectionHeading } from "@/components/site/section-heading"
import { useLanguage } from "@/lib/i18n/language-provider"

const serviceIcons: LucideIcon[] = [
  Briefcase,
  Network,
  FileSearch,
  Compass,
  ClipboardCheck,
  Globe2,
  Plane,
  GitBranch,
  Users,
]

export function ServicesGridSection() {
  const { t } = useLanguage()

  return (
    <section id="services" className="relative scroll-mt-24 py-24 lg:py-32">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow={t.services.eyebrow}
            title={
              <>
                {t.services.titleStart}{" "}
                <span className="font-semibold text-[var(--brand-accent)]">
                  {t.services.titleHighlight}
                </span>
                {t.services.titleEnd}
              </>
            }
            subtitle={t.services.subtitle}
          />
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.services.items.map((s, i) => {
            const Icon = serviceIcons[i] ?? Briefcase
            const highlight = i === 0
            return (
              <a
                key={s.title}
                href="#contact"
                className={`card-lift group relative flex flex-col gap-5 overflow-hidden rounded-2xl border bg-background p-7 transition-all ${
                  highlight
                    ? "border-[var(--brand-accent)]/40 shadow-[0_24px_50px_-32px_color-mix(in_oklch,var(--brand)_55%,transparent)]"
                    : "border-border hover:border-[var(--brand-accent)]/40"
                }`}
              >
                {highlight ? (
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-12 -top-12 size-40 rounded-full bg-[color-mix(in_oklch,var(--brand-accent)_18%,transparent)] blur-3xl"
                  />
                ) : null}
                <div className="flex items-start justify-between">
                  <div
                    className={`flex size-12 items-center justify-center rounded-xl ${
                      highlight
                        ? "bg-gradient-to-br from-[var(--brand)] to-[var(--brand-accent)] text-white shadow-[0_10px_24px_-10px_color-mix(in_oklch,var(--brand)_60%,transparent)]"
                        : "border border-border bg-gradient-to-br from-[color-mix(in_oklch,var(--brand-accent)_8%,white)] to-background text-[var(--brand)]"
                    }`}
                  >
                    <Icon className="size-5" />
                  </div>
                  <ArrowUpRight className="size-4 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-[18px] font-semibold tracking-tight text-foreground">
                    {s.title}
                  </h3>
                  <p className="text-[14px] leading-relaxed text-muted-foreground">
                    {s.body}
                  </p>
                </div>
                {highlight ? (
                  <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-[color-mix(in_oklch,var(--brand-accent)_14%,white)] px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--brand)]">
                    {t.services.flagshipTag}
                  </span>
                ) : null}
              </a>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
