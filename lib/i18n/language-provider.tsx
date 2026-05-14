"use client"

import * as React from "react"

import {
  DEFAULT_LOCALE,
  LOCALES,
  dictionaries,
  type Dictionary,
  type Locale,
} from "@/lib/i18n/dictionaries"

const STORAGE_KEY = "ekvator360.locale"
const LOCALE_CHANGE_EVENT = "ekvator360.locale-change"

type LanguageContextValue = {
  locale: Locale
  setLocale: (l: Locale) => void
  t: Dictionary
}

const LanguageContext = React.createContext<LanguageContextValue | null>(null)

function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (LOCALES as string[]).includes(value)
}

function getBrowserLocale(): Locale {
  if (typeof window === "undefined") {
    return DEFAULT_LOCALE
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (isLocale(stored)) {
      return stored
    }
  } catch {
    /* ignore storage errors */
  }

  const browser = window.navigator.language.slice(0, 2).toLowerCase()
  return isLocale(browser) ? browser : DEFAULT_LOCALE
}

function subscribeToLocale(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange)
  window.addEventListener(LOCALE_CHANGE_EVENT, onStoreChange)

  return () => {
    window.removeEventListener("storage", onStoreChange)
    window.removeEventListener(LOCALE_CHANGE_EVENT, onStoreChange)
  }
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const locale = React.useSyncExternalStore(
    subscribeToLocale,
    getBrowserLocale,
    () => DEFAULT_LOCALE,
  )

  // Keep <html lang> in sync
  React.useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale
    }
  }, [locale])

  const setLocale = React.useCallback((next: Locale) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* ignore storage errors */
    }
    window.dispatchEvent(new Event(LOCALE_CHANGE_EVENT))
  }, [])

  const value = React.useMemo<LanguageContextValue>(
    () => ({ locale, setLocale, t: dictionaries[locale] }),
    [locale, setLocale],
  )

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  )
}

export function useLanguage(): LanguageContextValue {
  const ctx = React.useContext(LanguageContext)
  if (!ctx) {
    throw new Error("useLanguage must be used inside <LanguageProvider>")
  }
  return ctx
}
