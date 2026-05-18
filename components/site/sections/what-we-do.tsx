"use client"

import { ArrowRight, Building2, Globe, Handshake, LineChart, Play, Ship } from "lucide-react"
import type { LucideIcon } from "lucide-react"

import { Container } from "@/components/site/container"
import { SectionHeading } from "@/components/site/section-heading"
import { useLanguage } from "@/lib/i18n/language-provider"

const pillarIcons: LucideIcon[] = [Globe, Handshake, LineChart, Building2]
const tradeImageUrl =
  "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1400&q=82"

const workflowCopy = {
  tr: [
    {
      title: "Pazar seçimi",
      body: "Ürününüz için talep, fiyat seviyesi ve kanal yapısı netleşir.",
    },
    {
      title: "Alıcı listesi",
      body: "İthalatçı, distribütör ve doğrudan müşteri adayları önceliklendirilir.",
    },
    {
      title: "Satış görüşmeleri",
      body: "Tanıtım, takip, teklif ve müzakere tek ritimde yönetilir.",
    },
    {
      title: "Sevkiyata dönüşüm",
      body: "Nitelikli ilgi sipariş, evrak ve operasyon takibine bağlanır.",
    },
  ],
  en: [
    {
      title: "Market selection",
      body: "Demand, price level and channel structure are clarified for your product.",
    },
    {
      title: "Buyer shortlist",
      body: "Importers, distributors and direct customers are prioritized by fit.",
    },
    {
      title: "Sales conversations",
      body: "Introductions, follow-ups, quotations and negotiation run in one rhythm.",
    },
    {
      title: "Shipment conversion",
      body: "Qualified interest becomes orders, documents and operational follow-up.",
    },
  ],
  ru: [
    {
      title: "Выбор рынков",
      body: "Спрос, уровень цен и структура каналов уточняются под ваш продукт.",
    },
    {
      title: "Список покупателей",
      body: "Импортёры, дистрибьюторы и прямые клиенты получают приоритет.",
    },
    {
      title: "Продажи и переговоры",
      body: "Знакомства, follow-up, предложения и переговоры идут в едином ритме.",
    },
    {
      title: "Переход к отгрузке",
      body: "Квалифицированный интерес связывается с заказом и операциями.",
    },
  ],
}

const tradePanelCopy = {
  tr: {
    label: "Global ticaret hatları",
    title: "Üretim, alıcı talebi ve lojistik tek yönetilen akışta birleşir.",
    route: ["İstanbul", "Avrupa", "Körfez", "Global"],
  },
  en: {
    label: "Global trade routes",
    title: "Factory output, buyer demand and logistics in one managed flow.",
    route: ["Istanbul", "Europe", "Gulf", "Global"],
  },
  ru: {
    label: "Глобальные торговые маршруты",
    title: "Производство, спрос покупателей и логистика объединяются в один управляемый поток.",
    route: ["Стамбул", "Европа", "Залив", "Глобально"],
  },
}

export function WhatWeDoSection() {
  const { locale, t } = useLanguage()
  const workflowSteps = workflowCopy[locale]
  const tradePanel = tradePanelCopy[locale]

  return (
    <section id="about" className="relative scroll-mt-24 py-24 lg:py-32">
      <Container>
        <div className="relative overflow-hidden rounded-[28px] border border-border/70 bg-[linear-gradient(135deg,white_0%,color-mix(in_oklch,var(--brand-accent)_4%,white)_52%,color-mix(in_oklch,var(--brand-red)_5%,white)_100%)] p-7 shadow-[0_28px_70px_-58px_color-mix(in_oklch,var(--brand)_55%,transparent)] sm:p-9 lg:p-11">
          <div
            aria-hidden
            className="pointer-events-none absolute right-0 top-0 h-40 w-64 bg-[radial-gradient(closest-side,color-mix(in_oklch,var(--brand-red)_16%,transparent),transparent_72%)]"
          />
          <div className="relative grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-16">
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
            <div className="relative border-border/70 lg:border-l lg:pl-10">
              <div className="absolute left-0 top-1 hidden h-12 w-px bg-gradient-to-b from-[var(--brand-red)] to-transparent lg:block" />
              <p className="max-w-2xl text-[16px] leading-[1.85] text-foreground/78">
                {t.whatWeDo.intro}
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3 text-[12.5px] text-muted-foreground">
                {t.whatWeDo.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex h-8 items-center rounded-full border border-[color-mix(in_oklch,var(--brand-accent)_18%,var(--border))] bg-white/75 px-3.5 font-semibold text-foreground/70 shadow-[0_1px_2px_0_color-mix(in_oklch,var(--foreground)_5%,transparent)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 overflow-hidden rounded-2xl border border-border/80 bg-[linear-gradient(135deg,color-mix(in_oklch,var(--brand-accent)_7%,white),white_44%,color-mix(in_oklch,var(--brand-red)_6%,white))] p-4 shadow-[0_28px_70px_-48px_color-mix(in_oklch,var(--brand)_55%,transparent)]">
          <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="relative min-h-[300px] overflow-hidden rounded-xl bg-[var(--brand-deep)] text-white">
              <div
                aria-hidden
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${tradeImageUrl})` }}
              />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(22,8,6,0.86)_0%,rgba(22,8,6,0.52)_48%,rgba(22,8,6,0.2)_100%)]" />
              <div className="relative flex h-full min-h-[300px] flex-col justify-between p-6">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[12px] font-medium text-white/78 ring-1 ring-white/10">
                    <Play className="size-3.5" />
                    Export workflow
                  </span>
                  <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/45">
                    Live pipeline
                  </span>
                </div>
                <div>
                  <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[12px] font-medium text-white/78 ring-1 ring-white/10 backdrop-blur">
                    <Ship className="size-3.5 text-[var(--brand-red)]" />
                    {tradePanel.label}
                  </span>
                  <p className="mt-5 max-w-[390px] text-[26px] font-semibold leading-tight tracking-tight">
                    {tradePanel.title}
                  </p>
                  <div className="mt-5 flex flex-wrap items-center gap-2 text-[12px] font-medium text-white/66">
                    {tradePanel.route.map((item, index) => (
                      <span key={item} className="inline-flex items-center gap-2">
                        {item}
                        {index < tradePanel.route.length - 1 ? (
                          <ArrowRight className="size-3.5 text-[var(--brand-red)]" />
                        ) : null}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="grid gap-3">
              {workflowSteps.map((step, index) => (
                <div
                  key={step.title}
                  className="flex items-start gap-4 rounded-xl border border-border/70 bg-white/70 p-4"
                >
                  <span className="mt-1 inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-[var(--brand)] text-[12px] font-semibold text-white">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="text-[15px] font-semibold tracking-tight text-foreground">
                      {step.title}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-[13px] leading-relaxed text-muted-foreground">
                      {step.body}
                    </p>
                  </div>
                </div>
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
