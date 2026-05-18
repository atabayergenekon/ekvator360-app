"use client"

import ResponsiveHeroBanner from "@/components/responsive-hero-banner"
import { useLanguage } from "@/lib/i18n/language-provider"

export function HeroSection() {
  const { t } = useLanguage()
  const navLinks = [
    { label: t.nav.about, href: "#about", isActive: true },
    { label: t.nav.services, href: "#services" },
    { label: t.nav.process, href: "#process" },
    { label: t.nav.whyUs, href: "#why-us" },
    { label: t.nav.contact, href: "#contact" },
  ]
  const titleLine2 = t.hero.titleEnd.trim() === "." ? "" : t.hero.titleEnd

  return (
    <ResponsiveHeroBanner
      logoUrl="/logo-light.png"
      navLinks={navLinks}
      ctaButtonText={t.nav.cta}
      ctaButtonHref="#contact"
      badgeLabel="Ekvator360"
      badgeText={t.nav.badge}
      title={t.hero.titleStart}
      titleLine2={`${t.hero.titleHighlight} ${titleLine2}`.trim()}
      description={t.hero.subtitle}
      primaryButtonText={t.hero.ctaPrimary}
      primaryButtonHref="#contact"
      secondaryButtonText={t.hero.ctaSecondary}
      secondaryButtonHref="#services"
      partnersTitle={t.hero.sectorsHeading}
      partners={t.hero.sectors.map((sector) => ({
        label: sector,
        href: "#services",
      }))}
    />
  )
}
