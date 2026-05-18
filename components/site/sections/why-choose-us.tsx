"use client"

import { Award, Globe2, Quote, ShieldCheck, Sparkles, Workflow } from "lucide-react"
import type { LucideIcon } from "lucide-react"

import { Container } from "@/components/site/container"
import { SectionHeading } from "@/components/site/section-heading"
import { useLanguage } from "@/lib/i18n/language-provider"

const reasonIcons: LucideIcon[] = [Workflow, Globe2, ShieldCheck, Sparkles]

const testimonials = {
  tr: [
    {
      quote:
        "Ekvator360 sekiz haftada ihracat departmanımız oldu. Kurdukları pipeline, kendi başımıza ulaşamayacağımız pazarlarda bizi taşıyor.",
      author: "Cem Yıldız",
      role: "Genel Müdür · Endüstriyel makine üreticisi",
    },
    {
      quote:
        "En değerli farkları, görüşmeleri sadece başlatmaları değil düzenli takip edip karar noktasına kadar taşımaları oldu.",
      author: "Aylin Karaca",
      role: "Ticari Direktör · Ambalaj üreticisi",
    },
    {
      quote:
        "Yeni pazarlara girerken neyi öncelememiz gerektiğini netleştirdiler. Ekiplerimiz daha az deneme yanılma ile ilerledi.",
      author: "Murat Demir",
      role: "Kurucu Ortak · Yapı malzemeleri",
    },
    {
      quote:
        "Yabancı alıcılarla iletişimde ton, hız ve hazırlık seviyesi belirgin şekilde yükseldi. Bu doğrudan teklif kalitemize yansıdı.",
      author: "Selin Öz",
      role: "İhracat Müdürü · Gıda üreticisi",
    },
    {
      quote:
        "Ekvator360 süreci görünür hale getirdi. Hangi ülkede kiminle konuşulduğunu ve sonraki adımı haftalık olarak biliyoruz.",
      author: "Kerem Arslan",
      role: "CEO · Plastik ve hammadde",
    },
    {
      quote:
        "Fuar sonrası dağılmaya alışık olduğumuz lead’leri bu kez düzenli bir satış akışına çevirebildik.",
      author: "Derya Sönmez",
      role: "Satış Direktörü · Mobilya üreticisi",
    },
  ],
  en: [
    {
      quote:
        "Ekvator360 became our export department in eight weeks. The pipeline they built carries us in markets we couldn't have reached on our own.",
      author: "Cem Yildiz",
      role: "General Manager · Industrial machinery manufacturer",
    },
    {
      quote:
        "Their real value was not just opening conversations, but following them with enough discipline to reach decisions.",
      author: "Aylin Karaca",
      role: "Commercial Director · Packaging manufacturer",
    },
    {
      quote:
        "They clarified which markets deserved priority. Our team moved with less guesswork and more commercial focus.",
      author: "Murat Demir",
      role: "Co-founder · Construction materials",
    },
    {
      quote:
        "The quality of our buyer communication improved quickly: better timing, better preparation and stronger quotations.",
      author: "Selin Oz",
      role: "Export Manager · Food producer",
    },
    {
      quote:
        "Ekvator360 made the process visible. Every week we know who was contacted, in which country, and what happens next.",
      author: "Kerem Arslan",
      role: "CEO · Plastics and raw materials",
    },
    {
      quote:
        "Leads that usually faded after trade fairs became a structured sales flow with clear ownership.",
      author: "Derya Sonmez",
      role: "Sales Director · Furniture manufacturer",
    },
  ],
  ru: [
    {
      quote:
        "Ekvator360 за восемь недель стал нашим внешним экспортным отделом. Воронка вывела нас на рынки, куда мы сами бы не дошли.",
      author: "Джем Йылдыз",
      role: "Генеральный директор · Промышленное оборудование",
    },
    {
      quote:
        "Их ценность не только в первых контактах. Они регулярно ведут переговоры до понятного следующего шага.",
      author: "Айлин Карача",
      role: "Коммерческий директор · Упаковка",
    },
    {
      quote:
        "Они помогли понять, какие рынки важнее. Команда стала двигаться с меньшим количеством догадок.",
      author: "Мурат Демир",
      role: "Сооснователь · Строительные материалы",
    },
    {
      quote:
        "Коммуникация с иностранными покупателями стала сильнее: лучше подготовка, темп и качество предложений.",
      author: "Селин Оз",
      role: "Экспорт-менеджер · Пищевое производство",
    },
    {
      quote:
        "Процесс стал прозрачным. Каждую неделю мы видим, с кем общались, в какой стране и какой следующий шаг.",
      author: "Керем Арслан",
      role: "CEO · Пластик и сырьё",
    },
    {
      quote:
        "Лиды после выставки не потерялись, а превратились в управляемый поток продаж.",
      author: "Дерья Сёнмез",
      role: "Директор по продажам · Мебель",
    },
  ],
}

export function WhyChooseUsSection() {
  const { locale, t } = useLanguage()
  const visibleTestimonials = testimonials[locale]

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

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {visibleTestimonials.map((item) => {
            const initials = item.author
              .split(" ")
              .map((part) => part[0])
              .slice(0, 2)
              .join("")
              .toUpperCase()

            return (
              <figure
                key={`${item.author}-${item.role}`}
                className="relative flex min-h-[250px] flex-col justify-between overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-[color-mix(in_oklch,var(--brand-accent)_7%,white)] via-background to-background p-7 shadow-[0_24px_60px_-48px_color-mix(in_oklch,var(--brand)_45%,transparent)]"
              >
                <Quote className="size-7 text-[var(--brand-accent)]" />
                <blockquote className="mt-5 text-[16px] font-medium leading-relaxed tracking-tight text-foreground">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-7 flex items-center gap-3 border-t border-border/70 pt-5">
                  <div className="flex size-11 items-center justify-center rounded-full bg-[var(--brand)] text-[12px] font-semibold text-white">
                    {initials}
                  </div>
                  <div className="flex min-w-0 flex-col">
                    <span className="text-[14px] font-semibold tracking-tight text-foreground">
                      {item.author}
                    </span>
                    <span className="text-[12px] leading-relaxed text-muted-foreground">
                      {item.role}
                    </span>
                  </div>
                </figcaption>
              </figure>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
