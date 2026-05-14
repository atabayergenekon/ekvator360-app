"use client"

import {
  ClipboardList,
  Compass,
  FileText,
  HandshakeIcon,
  Microscope,
  PenLine,
  Repeat,
  Telescope,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

import { Container } from "@/components/site/container"
import { SectionHeading } from "@/components/site/section-heading"
import { useLanguage } from "@/lib/i18n/language-provider"

const stepIcons: LucideIcon[] = [
  HandshakeIcon,
  Microscope,
  Telescope,
  FileText,
  PenLine,
  Compass,
  ClipboardList,
  Repeat,
]

export function OurProcessSection() {
  const { t } = useLanguage()

  return (
    <section id="process" className="relative scroll-mt-24 py-24 lg:py-32">
      <div
        aria-hidden
        className="bg-grid mask-fade-y absolute inset-0 -z-10 opacity-30"
      />
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow={t.process.eyebrow}
            title={
              <>
                {t.process.titleStart}{" "}
                <span className="font-semibold text-[var(--brand-accent)]">
                  {t.process.titleHighlight}
                </span>
              </>
            }
            subtitle={t.process.subtitle}
          />
          <div className="flex items-center gap-3 text-[13px] text-muted-foreground">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 font-medium">
              <span
                className="inline-block size-1.5 rounded-full bg-[var(--brand-accent)]"
                aria-hidden
              />
              {t.process.engagement}
            </span>
          </div>
        </div>

        <ol className="relative mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {t.process.steps.map((step, i) => {
            const Icon = stepIcons[i] ?? Compass
            const n = (i + 1).toString().padStart(2, "0")
            return (
              <li
                key={step.title}
                className="card-lift group relative flex flex-col gap-4 rounded-2xl border border-border bg-background p-6 hover:border-[var(--brand-accent)]/50"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] font-medium tracking-[0.16em] text-muted-foreground/80">
                    {t.process.stepLabel} {n}
                  </span>
                  <span className="flex size-9 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--brand)] to-[var(--brand-accent)] text-white shadow-[0_6px_16px_-6px_color-mix(in_oklch,var(--brand)_60%,transparent)]">
                    <Icon className="size-4" />
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-[16.5px] font-semibold tracking-tight text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-[13.5px] leading-relaxed text-muted-foreground">
                    {step.body}
                  </p>
                </div>
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-[var(--brand-accent)]/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
                />
              </li>
            )
          })}
        </ol>
      </Container>
    </section>
  )
}
