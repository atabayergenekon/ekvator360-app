"use client"

import { Award, Globe2, Quote, ShieldCheck, Sparkles, Workflow } from "lucide-react"
import type { LucideIcon } from "lucide-react"

import { Container } from "@/components/site/container"
import { SectionHeading } from "@/components/site/section-heading"
import { useLanguage } from "@/lib/i18n/language-provider"

const reasonIcons: LucideIcon[] = [Workflow, Globe2, ShieldCheck, Sparkles]

export function WhyChooseUsSection() {
  const { t } = useLanguage()

  const initials = t.whyUs.quoteAuthor
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()

  return (
    <section id="why-us" className="relative scroll-mt-24 py-24 lg:py-32">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
          <div className="flex flex-col gap-10">
            <SectionHeading
              eyebrow={t.whyUs.eyebrow}
              title={
                <>
                  {t.whyUs.titleStart}{" "}
                  <span className="font-semibold text-[var(--brand-accent)]">
                    {t.whyUs.titleHighlight}
                  </span>
                </>
              }
              subtitle={t.whyUs.subtitle}
            />

            <div className="grid grid-cols-2 gap-4">
              {t.whyUs.stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-border bg-background p-5"
                >
                  <div className="text-4xl font-semibold text-foreground sm:text-5xl">
                    {s.value}
                  </div>
                  <p className="mt-1.5 text-[12.5px] leading-relaxed text-muted-foreground">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>

            <figure className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-[color-mix(in_oklch,var(--brand-accent)_8%,white)] to-background p-7">
              <Quote className="size-7 text-[var(--brand-accent)]" />
              <blockquote className="mt-5 text-[17px] font-medium leading-relaxed tracking-tight text-foreground sm:text-[18px]">
                &ldquo;{t.whyUs.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-[var(--brand)] text-[12px] font-semibold text-white">
                  {initials}
                </div>
                <div className="flex flex-col">
                  <span className="text-[14px] font-semibold tracking-tight text-foreground">
                    {t.whyUs.quoteAuthor}
                  </span>
                  <span className="text-[12px] text-muted-foreground">
                    {t.whyUs.quoteRole}
                  </span>
                </div>
              </figcaption>
            </figure>
          </div>

          <ul className="flex flex-col gap-4">
            {t.whyUs.reasons.map((r, i) => {
              const Icon = reasonIcons[i] ?? Workflow
              return (
                <li
                  key={r.title}
                  className="card-lift group relative flex gap-5 rounded-2xl border border-border bg-background p-6 hover:border-[var(--brand-accent)]/40"
                >
                  <div className="flex shrink-0 flex-col items-center gap-2">
                    <span className="font-mono text-[10.5px] font-medium tracking-[0.2em] text-muted-foreground">
                      {(i + 1).toString().padStart(2, "0")}
                    </span>
                    <span className="flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--brand)] to-[var(--brand-accent)] text-white shadow-[0_10px_22px_-12px_color-mix(in_oklch,var(--brand)_55%,transparent)]">
                      <Icon className="size-5" />
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-[17px] font-semibold tracking-tight text-foreground">
                      {r.title}
                    </h3>
                    <p className="text-[14.5px] leading-relaxed text-muted-foreground">
                      {r.body}
                    </p>
                  </div>
                  <Award
                    aria-hidden
                    className="pointer-events-none absolute right-5 top-5 size-4 text-[var(--brand-accent)]/0 transition-colors group-hover:text-[var(--brand-accent)]/60"
                  />
                </li>
              )
            })}
          </ul>
        </div>
      </Container>
    </section>
  )
}
