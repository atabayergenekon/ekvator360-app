"use client"

import Image from "next/image"
import React, { useState } from "react"
import { ArrowRight, ArrowUpRight, Menu, Play, X } from "lucide-react"

import { LanguageSwitcher } from "@/components/site/language-switcher"

interface NavLink {
  label: string
  href: string
  isActive?: boolean
}

interface Partner {
  label: string
  href: string
}

interface ResponsiveHeroBannerProps {
  logoUrl?: string
  backgroundImageUrl?: string
  navLinks?: NavLink[]
  ctaButtonText?: string
  ctaButtonHref?: string
  badgeText?: string
  badgeLabel?: string
  title?: string
  titleLine2?: string
  description?: string
  primaryButtonText?: string
  primaryButtonHref?: string
  secondaryButtonText?: string
  secondaryButtonHref?: string
  partnersTitle?: string
  partners?: Partner[]
}

const countryFlags = [
  { code: "de", label: "Germany" },
  { code: "gb", label: "United Kingdom" },
  { code: "nl", label: "Netherlands" },
  { code: "it", label: "Italy" },
  { code: "ae", label: "United Arab Emirates" },
  { code: "sa", label: "Saudi Arabia" },
  { code: "qa", label: "Qatar" },
  { code: "us", label: "United States" },
  { code: "ca", label: "Canada" },
  { code: "jp", label: "Japan" },
  { code: "sg", label: "Singapore" },
  { code: "br", label: "Brazil" },
  { code: "za", label: "South Africa" },
  { code: "fr", label: "France" },
  { code: "es", label: "Spain" },
]

const ResponsiveHeroBanner: React.FC<ResponsiveHeroBannerProps> = ({
  logoUrl = "/logo-light.png",
  backgroundImageUrl = "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/0e2dbea0-c0a9-413f-a57b-af279633c0df_3840w.jpg",
  navLinks = [],
  ctaButtonText = "Start a Conversation",
  ctaButtonHref = "#contact",
  badgeLabel = "Ekvator360",
  badgeText = "",
  title = "",
  titleLine2 = "",
  description = "",
  primaryButtonText = "",
  primaryButtonHref = "#contact",
  secondaryButtonText = "",
  secondaryButtonHref = "#services",
  partnersTitle = "",
  partners = [],
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <section
      id="hero"
      className="relative isolate min-h-screen w-full scroll-mt-24 overflow-hidden bg-[var(--brand-deep)] text-white"
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImageUrl})` }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(7,3,5,0.2)_0%,rgba(16,2,3,0.18)_34%,rgba(0,0,0,0.58)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(42%_36%_at_56%_33%,rgba(255,227,112,0.38)_0%,rgba(255,88,22,0.2)_22%,transparent_58%),radial-gradient(54%_42%_at_86%_54%,rgba(255,91,17,0.36)_0%,rgba(154,20,14,0.24)_36%,transparent_75%),radial-gradient(42%_38%_at_40%_24%,rgba(164,19,28,0.2)_0%,transparent_64%)]" />
      <div className="pointer-events-none absolute inset-0 ring-1 ring-black/30" />

      <header className="relative z-10">
        <div className="mx-auto max-w-7xl px-6 pt-6">
          <div className="flex items-center justify-between gap-6">
            <a
              href="#hero"
              aria-label="Ekvator360"
              className="inline-flex h-[72px] shrink-0 items-center justify-center transition-opacity hover:opacity-90"
            >
              <Image
                src={logoUrl}
                alt="Ekvator360"
                width={401}
                height={59}
                priority
                className="h-[60px] w-auto"
              />
            </a>

            <nav className="hidden flex-1 items-center justify-center gap-8 lg:flex">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`font-sans text-[15px] font-semibold transition-colors hover:text-white ${
                    link.isActive ? "text-white/95" : "text-white/78"
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="hidden shrink-0 items-center gap-3 lg:flex">
              <LanguageSwitcher
                tone="light"
                className="border-white/10 bg-white/[0.03]"
              />
              <a
                href={ctaButtonHref}
                className="inline-flex h-11 items-center gap-2 rounded-xl bg-white px-5 font-sans text-[15px] font-semibold text-neutral-900 transition-colors hover:bg-white/90"
              >
                {ctaButtonText}
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>

            <div className="flex items-center gap-3 lg:hidden">
              <LanguageSwitcher
                tone="light"
                className="hidden border-white/10 bg-white/[0.03] sm:inline-flex"
              />
              <button
                type="button"
                onClick={() => setMobileMenuOpen((open) => !open)}
                className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15 backdrop-blur"
                aria-expanded={mobileMenuOpen}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6 text-white/90" />
                ) : (
                  <Menu className="h-6 w-6 text-white/90" />
                )}
              </button>
            </div>
          </div>

          {mobileMenuOpen ? (
            <div className="mt-4 rounded-3xl bg-[var(--brand-deep)]/88 p-3 ring-1 ring-white/12 backdrop-blur-xl lg:hidden">
              <nav className="flex flex-col">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between border-b border-white/10 px-2 py-3 text-sm font-medium text-white/88"
                  >
                    {link.label}
                    <ArrowUpRight className="h-4 w-4 text-white/50" />
                  </a>
                ))}
              </nav>
              <LanguageSwitcher
                tone="light"
                className="mt-3 w-full justify-center border-white/10 bg-white/[0.04]"
              />
              <a
                href={ctaButtonHref}
                onClick={() => setMobileMenuOpen(false)}
                className="mt-3 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-white px-4 text-sm font-semibold text-[var(--brand-deep)] transition-colors hover:bg-white/90"
              >
                {ctaButtonText}
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          ) : null}
        </div>
      </header>

      <div className="relative z-10">
        <div className="mx-auto max-w-7xl px-6 pt-28 pb-16 sm:pt-28 md:pt-32 lg:pt-40">
          <div className="mx-auto max-w-4xl text-center">
            <div className="animate-fade-slide-in-1 mb-6 inline-flex max-w-full items-center gap-3 rounded-full bg-white/10 px-2.5 py-2 text-left ring-1 ring-white/15 backdrop-blur">
              <span className="inline-flex shrink-0 items-center rounded-full bg-white/90 px-2 py-0.5 font-sans text-xs font-medium text-neutral-900">
                {badgeLabel}
              </span>
              <span className="truncate font-sans text-sm font-medium text-white/90">
                {badgeText}
              </span>
            </div>

            <h1 className="animate-fade-slide-in-2 text-4xl leading-tight font-semibold tracking-tight text-balance text-white sm:text-5xl md:text-6xl lg:text-7xl">
              {title}
              {titleLine2 ? (
                <>
                  <br className="hidden sm:block" />
                  {titleLine2}
                </>
              ) : null}
            </h1>

            <p className="animate-fade-slide-in-3 mx-auto mt-6 max-w-2xl text-base text-balance text-white/80 sm:text-lg">
              {description}
            </p>

            <div className="animate-fade-slide-in-4 mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <a
                href={primaryButtonHref}
                className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-3 font-sans text-sm font-medium text-white ring-1 ring-white/15 transition-colors hover:bg-white/15"
              >
                {primaryButtonText}
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href={secondaryButtonHref}
                className="inline-flex items-center gap-2 rounded-full bg-transparent px-5 py-3 font-sans text-sm font-medium text-white/90 transition-colors hover:text-white"
              >
                {secondaryButtonText}
                <Play className="h-4 w-4" />
              </a>
            </div>

            <div className="animate-fade-slide-in-4 mx-auto mt-10 w-full max-w-5xl overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
              <div className="animate-country-marquee flex min-w-max items-center gap-3 pr-3">
                {[...countryFlags, ...countryFlags].map((flag, index) => (
                  <span
                    key={`${flag.code}-${index}`}
                    className="inline-flex size-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.08] shadow-[0_10px_30px_-24px_rgba(255,255,255,0.5)] backdrop-blur transition-colors hover:bg-white/[0.12]"
                    aria-label={flag.label}
                  >
                    <span
                      aria-hidden
                      className="h-5 w-7 rounded-[4px] bg-cover bg-center shadow-[0_0_0_1px_rgba(255,255,255,0.18)]"
                      style={{
                        backgroundImage: `url(https://flagcdn.com/w80/${flag.code}.png)`,
                      }}
                    />
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mx-auto mt-20 w-full max-w-6xl overflow-hidden">
            <p className="animate-fade-slide-in-1 text-center text-base font-medium text-white/76 sm:text-[17px]">
              {partnersTitle}
            </p>
            <div className="animate-fade-slide-in-2 mt-6 flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
              <div className="animate-sector-marquee-reverse flex min-w-max items-center gap-3 pr-3">
                {[...partners, ...partners].map((partner, index) => (
                  <a
                    key={`${partner.label}-${index}`}
                    href={partner.href}
                    className="inline-flex min-h-10 items-center justify-center rounded-full bg-white/[0.08] px-5 text-center text-[15px] font-semibold text-white/82 ring-1 ring-white/10 backdrop-blur transition-colors hover:bg-white/12 hover:text-white"
                  >
                    {partner.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        aria-hidden
        className="relative z-10 h-24 bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.62)_42%,rgba(22,8,6,0.28)_66%,rgba(255,255,255,0)_100%)]"
      />
      <div
        aria-hidden
        className="relative z-10 h-14 bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,var(--background)_88%)]"
      />
    </section>
  )
}

export default ResponsiveHeroBanner
