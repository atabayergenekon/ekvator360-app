"use client"

import { ArrowUpRight, Building2, Mail, MapPin, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Container } from "@/components/site/container"
import { useLanguage } from "@/lib/i18n/language-provider"

export function FinalCtaSection() {
  const { t } = useLanguage()

  return (
    <section id="contact" className="relative scroll-mt-24 py-24 lg:py-32">
      <Container>
        <div className="relative isolate overflow-hidden rounded-[28px] border border-white/10 bg-[var(--brand-deep)] p-10 text-white shadow-[0_34px_80px_-42px_color-mix(in_oklch,var(--brand)_75%,transparent)] sm:p-14 lg:p-20">
          <svg
            aria-hidden
            viewBox="0 0 600 400"
            className="pointer-events-none absolute -right-20 -top-24 -z-10 h-[520px] w-[680px] opacity-70"
          >
            <defs>
              <radialGradient id="ctaGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="var(--brand-accent)" stopOpacity="0.20" />
                <stop offset="100%" stopColor="var(--brand-accent)" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="ctaLine" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--brand-accent)" stopOpacity="0" />
                <stop offset="50%" stopColor="var(--brand-red)" stopOpacity="0.28" />
                <stop offset="100%" stopColor="var(--brand-accent)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <circle cx="380" cy="220" r="160" fill="url(#ctaGlow)" />
            {[140, 200, 260, 320].map((r, i) => (
              <ellipse
                key={r}
                cx="380"
                cy="220"
                rx={r}
                ry={r * 0.55}
                fill="none"
                stroke="url(#ctaLine)"
                strokeWidth="1"
                opacity={1 - i * 0.18}
              />
            ))}
          </svg>

          <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div className="flex flex-col gap-6">
              <span className="eyebrow text-white/80">{t.finalCta.eyebrow}</span>
              <h2 className="text-balance text-[36px] font-medium leading-[1.05] tracking-tight text-white sm:text-[46px] lg:text-[56px]">
                {t.finalCta.titleStart}{" "}
                <span className="font-semibold text-white">
                  {t.finalCta.titleHighlight}
                </span>{" "}
                {t.finalCta.titleEnd}
              </h2>
              <p className="max-w-xl text-[17px] leading-relaxed text-white/68">
                {t.finalCta.subtitle}
              </p>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  asChild
                  size="lg"
                  className="h-11 gap-2 bg-white px-5 text-[14px] text-[var(--brand)] hover:bg-white/90"
                >
                  <a href={`mailto:${t.finalCta.emailValue}`}>
                    {t.finalCta.ctaPrimary}
                    <ArrowUpRight className="size-4" />
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-11 gap-2 border-white/15 bg-white/[0.04] px-5 text-[14px] text-white hover:bg-white/[0.08] hover:text-white"
                >
                  <a href="#services">{t.finalCta.ctaSecondary}</a>
                </Button>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <a
                href={`mailto:${t.finalCta.emailValue}`}
                className="group flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.06] p-5 transition-colors hover:border-[var(--brand-red)]/45 hover:bg-white/[0.08]"
              >
                <div className="flex items-center gap-4">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-white/[0.08] text-white">
                    <Mail className="size-5" />
                  </span>
                  <div className="flex flex-col">
                    <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/45">
                      {t.finalCta.emailLabel}
                    </span>
                    <span className="text-[15px] font-semibold tracking-tight text-white">
                      {t.finalCta.emailValue}
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="size-4 text-white/45 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.06] p-5">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white/[0.08] text-[var(--brand-red)]">
                  <MapPin className="size-5" />
                </span>
                <div className="flex flex-col gap-1">
                  <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/45">
                    {t.finalCta.addressLabel}
                  </span>
                  <span className="text-[14px] font-semibold leading-relaxed text-white">
                    {t.finalCta.addressValue}
                  </span>
                </div>
              </div>
              <a
                href={`tel:${t.finalCta.phoneValue.replace(/[^+\d]/g, "")}`}
                className="group flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.06] p-5 transition-colors hover:border-[var(--brand-red)]/45 hover:bg-white/[0.08]"
              >
                <div className="flex items-center gap-4">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-white/[0.08] text-white">
                    <Phone className="size-5" />
                  </span>
                  <div className="flex flex-col">
                    <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/45">
                      {t.finalCta.phoneLabel}
                    </span>
                    <span className="text-[15px] font-semibold tracking-tight text-white">
                      {t.finalCta.phoneValue}
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="size-4 text-white/45 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.06] p-5">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white/[0.08] text-white">
                  <Building2 className="size-5" />
                </span>
                <div className="flex flex-col gap-1">
                  <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/45">
                    {t.finalCta.londonLabel}
                  </span>
                  <span className="text-[14px] font-semibold leading-relaxed text-white">
                    {t.finalCta.londonAddress}
                  </span>
                </div>
              </div>
              <p className="mt-1 text-[12px] leading-relaxed text-white/55">
                {t.finalCta.note}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
