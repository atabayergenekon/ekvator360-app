"use client"

import { Globe } from "lucide-react"

import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/i18n/language-provider"
import {
  LOCALES,
  LOCALE_FULL_LABELS,
  LOCALE_LABELS,
} from "@/lib/i18n/dictionaries"

export function LanguageSwitcher({
  className,
  tone = "default",
}: {
  className?: string
  tone?: "default" | "light"
}) {
  const { locale, setLocale, t } = useLanguage()

  return (
    <div
      role="group"
      aria-label={t.nav.languageLabel}
      className={cn(
        "inline-flex items-center gap-0.5 rounded-full border p-0.5 backdrop-blur",
        tone === "light"
          ? "border-white/15 bg-white/[0.04]"
          : "border-border bg-background/80",
        className,
      )}
    >
      <Globe
        aria-hidden
        className={cn(
          "mx-1.5 size-3.5",
          tone === "light" ? "text-white/65" : "text-muted-foreground",
        )}
      />
      {LOCALES.map((l) => {
        const active = l === locale
        return (
          <button
            key={l}
            type="button"
            onClick={() => setLocale(l)}
            aria-pressed={active}
            aria-label={LOCALE_FULL_LABELS[l]}
            title={LOCALE_FULL_LABELS[l]}
            className={cn(
              "h-6 rounded-full px-2 text-[11px] font-semibold tracking-wide transition-colors",
              active
                ? tone === "light"
                  ? "bg-white text-[var(--brand-deep)]"
                  : "bg-[var(--brand)] text-white shadow-[0_4px_10px_-4px_color-mix(in_oklch,var(--brand)_50%,transparent)]"
                : tone === "light"
                  ? "text-white/65 hover:text-white"
                  : "text-foreground/70 hover:text-foreground",
            )}
          >
            {LOCALE_LABELS[l]}
          </button>
        )
      })}
    </div>
  )
}
