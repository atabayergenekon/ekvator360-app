"use client"

import { MapPin } from "lucide-react"

import { Container } from "@/components/site/container"
import { Logo } from "@/components/site/logo"
import { Separator } from "@/components/ui/separator"
import { useLanguage } from "@/lib/i18n/language-provider"

export function SiteFooter() {
  const { t } = useLanguage()

  return (
    <footer className="relative mt-12 border-t border-border bg-[color-mix(in_oklch,var(--brand)_4%,white)]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, color-mix(in oklch, var(--brand-accent) 30%, transparent), transparent)",
        }}
      />
      <Container className="py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_3fr]">
          <div className="flex flex-col gap-6">
            <Logo />
            <p className="max-w-sm text-[14px] leading-relaxed text-muted-foreground">
              {t.footer.tagline}
            </p>
            <div className="flex flex-col gap-2">
              {t.footer.offices.map((o) => (
                <div
                  key={o.city}
                  className="flex items-center gap-2 text-[12.5px] text-foreground/80"
                >
                  <MapPin className="size-3.5 text-[var(--brand-accent)]" />
                  <span className="font-medium">{o.city}</span>
                  <span className="text-muted-foreground">· {o.role}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {t.footer.columns.map((col) => (
              <div key={col.title} className="flex flex-col gap-3">
                <h4 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground/70">
                  {col.title}
                </h4>
                <ul className="flex flex-col gap-2.5">
                  {col.links.map((l) => (
                    <li key={`${col.title}-${l.label}`}>
                      <a
                        href={l.href}
                        className="text-[13.5px] text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <Separator className="my-10" />
        <div className="flex flex-col items-start justify-between gap-4 text-[12px] text-muted-foreground sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} Ekvator360. {t.footer.rights}
          </p>
          <p className="flex items-center gap-3">
            <span
              className="inline-flex size-1.5 rounded-full bg-[var(--success)]"
              aria-hidden
            />
            {t.footer.statusLine}
          </p>
        </div>
      </Container>
    </footer>
  )
}
