"use client"

import Image from "next/image"
import Link from "next/link"
import * as React from "react"

import { cn } from "@/lib/utils"

/* ────────────────────────────────────────────────────────────────────────────
 * REPLACING THE LOGO
 * ────────────────────────────────────────────────────────────────────────────
 * 1. Drop your logo file into `/public` (e.g. /public/logo.svg or /public/logo.png).
 * 2. Set USE_CUSTOM_LOGO to `true` below.
 * 3. Adjust CUSTOM_LOGO_SRC / WIDTH / HEIGHT to match your asset.
 *    - For a dark-on-light header logo, leave tone="default" usage as is.
 *    - For a light-on-dark variant, drop a second file (e.g. logo-light.svg)
 *      and tone="light" will use it automatically.
 *
 * The inline SVG mark below is the temporary placeholder, leave it in place
 * until your real file is added. No other code needs to change.
 * ──────────────────────────────────────────────────────────────────────────── */

const USE_CUSTOM_LOGO = true
const CUSTOM_LOGO_SRC = "/logo.png"
const CUSTOM_LOGO_SRC_LIGHT = "/logo-light.png"
const CUSTOM_LOGO_WIDTH = 401
const CUSTOM_LOGO_HEIGHT = 59

export function Logo({
  className,
  tone = "default",
  showWordmark = true,
}: {
  className?: string
  tone?: "default" | "light"
  showWordmark?: boolean
}) {
  const logoSrc = tone === "light" ? CUSTOM_LOGO_SRC_LIGHT : CUSTOM_LOGO_SRC
  const [failedLogoSrc, setFailedLogoSrc] = React.useState<string | null>(null)

  const showCustomLogo = USE_CUSTOM_LOGO && failedLogoSrc !== logoSrc

  return (
    <Link
      href="#hero"
      aria-label="Ekvator360"
      className={cn(
        "group inline-flex items-center gap-2.5 transition-opacity hover:opacity-90 focus-visible:opacity-90 focus-visible:outline-none",
        tone === "light" ? "text-white" : "text-foreground",
        className,
      )}
    >
      {showCustomLogo ? (
        <Image
          src={logoSrc}
          alt="Ekvator360"
          width={CUSTOM_LOGO_WIDTH}
          height={CUSTOM_LOGO_HEIGHT}
          priority
          className="h-8 w-auto"
          onError={() => setFailedLogoSrc(logoSrc)}
        />
      ) : (
        <>
          <span
            aria-hidden
            className="relative inline-flex size-9 items-center justify-center overflow-hidden rounded-[10px] bg-gradient-to-br from-[var(--brand)] via-[var(--brand-accent)] to-[var(--brand)] text-white shadow-[0_8px_22px_-8px_color-mix(in_oklch,var(--brand)_65%,transparent)]"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-[18px]"
            >
              <circle cx="12" cy="12" r="9" />
              <ellipse cx="12" cy="12" rx="9" ry="4" />
              <path d="M3 12h18" />
              <path d="M12 3a14 14 0 0 1 0 18" />
              <path d="M12 3a14 14 0 0 0 0 18" />
            </svg>
            <span className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent" />
          </span>
          {showWordmark ? (
            <span className="flex flex-col leading-none">
              <span className="text-[16px] font-semibold tracking-tight">
                Ekvator
                <span
                  className={cn(
                    tone === "light" ? "text-white/80" : "text-[var(--brand-accent)]",
                  )}
                >
                  360
                </span>
              </span>
              <span
                className={cn(
                  "mt-1 text-[9.5px] font-medium uppercase tracking-[0.22em]",
                  tone === "light" ? "text-white/55" : "text-muted-foreground/80",
                )}
              >
                Global Export Partners
              </span>
            </span>
          ) : null}
        </>
      )}
    </Link>
  )
}
