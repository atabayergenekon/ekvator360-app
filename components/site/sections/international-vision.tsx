"use client"

import { Container } from "@/components/site/container"
import { WorldMap } from "@/components/site/world-map"
import { useLanguage } from "@/lib/i18n/language-provider"

export function InternationalVisionSection() {
  const { t } = useLanguage()

  return (
    <section
      id="vision"
      className="bg-ocean-deep relative isolate scroll-mt-24 overflow-hidden py-24 text-white lg:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-25"
        style={{
          background:
            "radial-gradient(40% 30% at 20% 0%, color-mix(in oklch, var(--brand-accent) 48%, transparent), transparent 60%), radial-gradient(34% 26% at 90% 90%, color-mix(in oklch, var(--brand-red) 14%, transparent), transparent 62%)",
        }}
      />

      <Container className="relative">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-center lg:gap-16">
          <div className="flex flex-col gap-6">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80 backdrop-blur">
              <span className="size-1.5 rounded-full bg-[var(--brand-red)]" />
              {t.vision.badge}
            </span>
            <h2 className="text-balance text-[40px] font-medium leading-[1.05] tracking-tight sm:text-[52px] lg:text-[60px]">
              {t.vision.titleLine1}
              <br />
              <span className="font-semibold text-white">
                {t.vision.titleLine2}
              </span>
            </h2>
            <p className="max-w-xl text-[16.5px] leading-relaxed text-white/75">
              {t.vision.subtitle}
            </p>

            <div className="mt-4 grid grid-cols-2 gap-3">
              {t.vision.regions.map((r) => (
                <div
                  key={r.name}
                  className="rounded-xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur"
                >
                  <div className="text-[13.5px] font-semibold tracking-tight text-white">
                    {r.name}
                  </div>
                  <p className="mt-1 text-[11.5px] leading-relaxed text-white/55">
                    {r.countries}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-10 -z-10 rounded-[40px] opacity-50"
              style={{
                background:
                  "radial-gradient(closest-side, color-mix(in oklch, var(--brand-accent) 28%, transparent), transparent 70%)",
              }}
            />
            <div className="relative rounded-2xl border border-white/10 bg-white/[0.02] p-3 backdrop-blur">
              <div className="text-white/30">
                <WorldMap />
              </div>
              <div className="pointer-events-none absolute inset-x-3 bottom-3 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-white/10 bg-[oklch(0.12_0.04_260)]/70 px-4 py-3 text-[11.5px] text-white/70 backdrop-blur">
                <span className="font-mono uppercase tracking-[0.18em]">
                  {t.vision.liveLabel}
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="size-1.5 animate-pulse rounded-full bg-[var(--brand-red)]" />
                  {t.vision.routesLabel}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
