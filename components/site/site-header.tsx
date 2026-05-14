"use client"

import * as React from "react"
import { Menu, X, ArrowUpRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/site/container"
import { Logo } from "@/components/site/logo"
import { LanguageSwitcher } from "@/components/site/language-switcher"
import { useLanguage } from "@/lib/i18n/language-provider"

export function SiteHeader() {
  const { t } = useLanguage()
  const [scrolled, setScrolled] = React.useState(false)
  const [open, setOpen] = React.useState(false)

  const navItems = React.useMemo(
    () => [
      { label: t.nav.about, href: "#about" },
      { label: t.nav.services, href: "#services" },
      { label: t.nav.process, href: "#process" },
      { label: t.nav.whyUs, href: "#why-us" },
      { label: t.nav.contact, href: "#contact" },
    ],
    [t],
  )

  React.useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-[background-color,border-color,backdrop-filter] duration-300",
        scrolled
          ? "border-b border-border/80 bg-background/85 backdrop-blur-xl supports-[backdrop-filter]:bg-background/70"
          : "border-b border-transparent bg-background/0",
      )}
    >
      <Container className="flex h-[72px] items-center justify-between gap-8">
        <div className="flex items-center gap-10">
          <Logo />
          <nav
            className="hidden items-center gap-1 lg:flex"
            aria-label={t.nav.about}
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-2 text-[13.5px] font-medium text-foreground/75 transition-colors hover:bg-muted hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher />
          <Button asChild size="lg" className="gap-1.5 px-4">
            <a href="#contact">
              {t.nav.cta}
              <ArrowUpRight className="size-3.5" />
            </a>
          </Button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <LanguageSwitcher />
          <button
            type="button"
            aria-label={open ? t.nav.menuClose : t.nav.menuOpen}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex size-10 items-center justify-center rounded-lg border border-border bg-background text-foreground hover:bg-muted"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </Container>

      {open ? (
        <div
          className="fixed inset-x-0 top-[72px] bottom-0 z-40 overflow-y-auto border-t border-border bg-background lg:hidden"
          role="dialog"
          aria-modal="true"
        >
          <Container className="flex flex-col gap-6 py-6">
            <nav className="flex flex-col" aria-label="mobile">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between border-b border-border/70 py-4 text-base font-medium text-foreground"
                >
                  {item.label}
                  <ArrowUpRight className="size-4 text-muted-foreground" />
                </a>
              ))}
            </nav>
            <Button asChild size="lg" className="w-full">
              <a href="#contact" onClick={() => setOpen(false)}>
                {t.nav.cta}
              </a>
            </Button>
          </Container>
        </div>
      ) : null}
    </header>
  )
}
