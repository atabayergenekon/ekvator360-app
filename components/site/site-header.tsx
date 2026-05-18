"use client"

import * as React from "react"
import { Menu, X, ArrowUpRight, LockKeyhole } from "lucide-react"

import { cn } from "@/lib/utils"
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
    [t]
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
        "fixed inset-x-0 top-0 z-50 w-full transition-[background-color,border-color,backdrop-filter] duration-300",
        scrolled
          ? "border-b border-border/80 bg-background/90 backdrop-blur-xl supports-[backdrop-filter]:bg-background/75"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <Container className="flex h-[72px] items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-5">
          <Logo tone={scrolled ? "default" : "light"} />
          <nav
            className={cn(
              "hidden items-center gap-1 rounded-full px-1 py-1 ring-1 backdrop-blur lg:flex",
              scrolled
                ? "bg-background/80 ring-border"
                : "bg-white/5 ring-white/10"
            )}
            aria-label={t.nav.about}
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-3 py-2 text-[13.5px] font-medium transition-colors",
                  scrolled
                    ? "text-foreground/75 hover:bg-muted hover:text-foreground"
                    : "text-white/78 hover:bg-white/10 hover:text-white"
                )}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher tone={scrolled ? "default" : "light"} />
          <a
            href="/login"
            className={cn(
              "inline-flex h-10 items-center gap-2 rounded-full border px-4 text-[13.5px] font-semibold transition-colors",
              scrolled
                ? "border-border bg-background text-foreground hover:bg-muted"
                : "border-white/15 bg-white/10 text-white hover:bg-white/15"
            )}
          >
            <LockKeyhole className="size-3.5" />
            Giriş Yap
          </a>
          <a
            href="#contact"
            className={cn(
              "inline-flex h-10 items-center gap-2 rounded-full px-4 text-[13.5px] font-semibold transition-colors",
              scrolled
                ? "bg-[var(--brand)] text-white hover:bg-[var(--brand-accent)]"
                : "bg-white text-[var(--brand-deep)] hover:bg-white/90"
            )}
          >
            {t.nav.cta}
            <ArrowUpRight className="size-3.5" />
          </a>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <LanguageSwitcher tone={scrolled ? "default" : "light"} />
          <button
            type="button"
            aria-label={open ? t.nav.menuClose : t.nav.menuOpen}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className={cn(
              "inline-flex size-10 items-center justify-center rounded-full border backdrop-blur transition-colors",
              scrolled
                ? "border-border bg-background text-foreground hover:bg-muted"
                : "border-white/15 bg-white/10 text-white hover:bg-white/15"
            )}
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </Container>

      {open ? (
        <div
          className={cn(
            "fixed inset-x-0 top-[72px] bottom-0 z-40 overflow-y-auto border-t backdrop-blur-xl lg:hidden",
            scrolled
              ? "border-border bg-background/95 text-foreground"
              : "border-white/10 bg-[var(--brand-deep)]/92 text-white"
          )}
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
                  className={cn(
                    "flex items-center justify-between border-b py-4 text-base font-medium",
                    scrolled
                      ? "border-border/70 text-foreground"
                      : "border-white/10 text-white/88"
                  )}
                >
                  {item.label}
                  <ArrowUpRight
                    className={cn(
                      "size-4",
                      scrolled ? "text-muted-foreground" : "text-white/55"
                    )}
                  />
                </a>
              ))}
            </nav>
            <a
              href="/login"
              onClick={() => setOpen(false)}
              className={cn(
                "inline-flex h-11 w-full items-center justify-center gap-2 rounded-full border text-sm font-semibold transition-colors",
                scrolled
                  ? "border-border bg-background text-foreground hover:bg-muted"
                  : "border-white/15 bg-white/10 text-white hover:bg-white/15"
              )}
            >
              <LockKeyhole className="size-4" />
              Giriş Yap
            </a>
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className={cn(
                "inline-flex h-11 w-full items-center justify-center rounded-full text-sm font-semibold transition-colors",
                scrolled
                  ? "bg-[var(--brand)] text-white hover:bg-[var(--brand-accent)]"
                  : "bg-white text-[var(--brand-deep)] hover:bg-white/90"
              )}
            >
              {t.nav.cta}
            </a>
          </Container>
        </div>
      ) : null}
    </header>
  )
}
