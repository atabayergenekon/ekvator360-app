"use client"

import { ArrowUpRight, Compass, Globe2, ShieldCheck } from "lucide-react"
import type { LucideIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Container } from "@/components/site/container"
import { Globe } from "@/components/site/globe"
import { useLanguage } from "@/lib/i18n/language-provider"

const trustIcons: LucideIcon[] = [Globe2, Compass, ShieldCheck]

export function HeroSection() {
  const { t } = useLanguage()

  return (
    <section id="hero" className="relative isolate overflow-hidden scroll-mt-24">
      <div aria-hidden className="bg-hero-glow absolute inset-0 -z-20" />
      <div
        aria-hidden
        className="bg-grid-fine mask-fade-y absolute inset-0 -z-10 opacity-60"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-10 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, color-mix(in oklch, var(--brand-accent) 35%, transparent), transparent)",
        }}
      />

      <Container className="relative pt-14 pb-20 sm:pt-20 lg:pt-24 lg:pb-28">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-10 xl:gap-16">
          <div className="relative flex flex-col items-start">
            <span className="eyebrow animate-fade-up">{t.hero.eyebrow}</span>

            <h1
              className="animate-fade-up mt-6 text-balance text-[42px] font-medium leading-[1.04] tracking-tight text-foreground sm:text-[56px] lg:text-[68px]"
              style={{ animationDelay: "60ms" }}
            >
              {t.hero.titleStart}{" "}
              <span className="bg-gradient-to-br from-[var(--brand)] via-[var(--brand-accent)] to-[var(--brand)] bg-clip-text font-semibold text-transparent">
                {t.hero.titleHighlight}
              </span>{" "}
              {t.hero.titleEnd}
            </h1>

            <p
              className="animate-fade-up mt-6 max-w-xl text-balance text-[17px] leading-relaxed text-muted-foreground sm:text-[18.5px]"
              style={{ animationDelay: "120ms" }}
            >
              {t.hero.subtitle}
            </p>

            <div
              className="animate-fade-up mt-8 flex flex-col gap-3 sm:flex-row"
              style={{ animationDelay: "180ms" }}
            >
              <Button asChild size="lg" className="h-11 gap-2 px-5 text-[14px]">
                <a href="#contact">
                  {t.hero.ctaPrimary}
                  <ArrowUpRight className="size-4" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-11 gap-2 px-5 text-[14px]"
              >
                <a href="#services">{t.hero.ctaSecondary}</a>
              </Button>
            </div>

            <ul
              className="animate-fade-up mt-12 grid w-full max-w-xl grid-cols-3 gap-4 border-t border-border/70 pt-6"
              style={{ animationDelay: "260ms" }}
            >
              {t.hero.trust.map((item, i) => {
                const Icon = trustIcons[i] ?? Globe2
                return (
                  <li key={item.label} className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-foreground">
                      <Icon className="size-4 text-[var(--brand-accent)]" />
                      <span className="text-[15px] font-semibold tracking-tight">
                        {item.label}
                      </span>
                    </div>
                    <span className="text-[12px] text-muted-foreground">
                      {item.caption}
                    </span>
                  </li>
                )
              })}
            </ul>
          </div>

          <div
            className="animate-fade-in relative mx-auto w-full max-w-[560px]"
            style={{ animationDelay: "200ms" }}
          >
            <Globe
              liveLabel={t.hero.liveChip}
              activeMarketsLabel={t.hero.activeMarketsLabel}
              activeMarketsValue={t.hero.activeMarketsValue}
            />
          </div>
        </div>

        <div className="mt-16 lg:mt-24">
          <div className="flex flex-wrap items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/80">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand-red)]" />
            {t.hero.sectorsHeading}
          </div>
          <div className="mt-5 flex flex-wrap gap-2.5">
            {t.hero.sectors.map((sector) => (
              <span
                key={sector}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-white/80 px-3.5 py-2 text-[13px] font-medium text-foreground/75 shadow-[0_1px_2px_0_color-mix(in_oklch,var(--foreground)_4%,transparent)] transition-colors hover:border-[var(--brand-red)]/35 hover:text-foreground"
              >
                <span
                  className="inline-block size-1.5 rounded-full bg-[var(--brand)]"
                  aria-hidden
                />
                {sector}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
