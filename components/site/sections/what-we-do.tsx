"use client"

import { Building2, Globe, Handshake, LineChart } from "lucide-react"
import type { LucideIcon } from "lucide-react"

import { Container } from "@/components/site/container"
import { SectionHeading } from "@/components/site/section-heading"
import { useLanguage } from "@/lib/i18n/language-provider"

const pillarIcons: LucideIcon[] = [Globe, Handshake, LineChart, Building2]

export function WhatWeDoSection() {
  const { t } = useLanguage()

  return (
    <section id="about" className="relative scroll-mt-24 py-24 lg:py-32">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-end lg:gap-20">
          <SectionHeading
            eyebrow={t.whatWeDo.eyebrow}
            title={
              <>
                {t.whatWeDo.titleStart}{" "}
                <span className="font-semibold text-[var(--brand-accent)]">
                  {t.whatWeDo.titleHighlight}
                </span>
                {t.whatWeDo.titleEnd}
              </>
            }
            subtitle={t.whatWeDo.subtitle}
          />
          <div>
            <p className="max-w-xl text-[15.5px] leading-relaxed text-foreground/85">
              {t.whatWeDo.intro}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3 text-[12.5px] text-muted-foreground">
              {t.whatWeDo.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex h-7 items-center rounded-full border border-border bg-background px-3 font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {t.whatWeDo.pillars.map((p, i) => {
            const Icon = pillarIcons[i] ?? Globe
            return (
              <div
                key={p.title}
                className="card-lift relative flex flex-col gap-4 rounded-2xl border border-border/80 bg-background p-6 hover:border-[var(--brand-accent)]/40 hover:shadow-[0_24px_44px_-28px_color-mix(in_oklch,var(--brand)_45%,transparent)]"
              >
                <div className="flex size-11 items-center justify-center rounded-xl border border-border bg-gradient-to-br from-[color-mix(in_oklch,var(--brand-accent)_8%,white)] to-background text-[var(--brand)]">
                  <Icon className="size-5" />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-[17px] font-semibold tracking-tight text-foreground">
                    {p.title}
                  </h3>
                  <p className="text-[14px] leading-relaxed text-muted-foreground">
                    {p.body}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
