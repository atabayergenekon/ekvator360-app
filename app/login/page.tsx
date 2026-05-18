import Link from "next/link"
import { BarChart3, CheckCircle2, ShieldCheck } from "lucide-react"

import { LoginForm } from "@/app/login/login-form"
import { Logo } from "@/components/site/logo"

export const metadata = {
  title: "CRM Giriş · Ekvator360",
}

export default function LoginPage() {
  return (
    <main className="min-h-svh bg-[var(--brand-deep)] text-white">
      <div className="grid min-h-svh lg:grid-cols-[1.05fr_0.95fr]">
        <section className="relative flex min-h-[42svh] flex-col justify-between overflow-hidden border-white/10 p-6 lg:border-r lg:p-10">
          <div className="absolute inset-0 bg-global-hero opacity-80" />
          <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(0,0,0,.42),rgba(0,0,0,.08)_52%,rgba(0,0,0,.58))]" />
          <div className="relative z-10 flex items-center justify-between">
            <Logo tone="light" />
            <Link
              href="/"
              className="rounded-lg border border-white/12 px-3 py-2 text-sm text-white/80 transition hover:bg-white/10 hover:text-white"
            >
              Ana sayfa
            </Link>
          </div>

          <div className="relative z-10 max-w-2xl py-14 lg:py-20">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-3 py-1 text-xs font-medium text-white/75">
              <ShieldCheck className="size-3.5" />
              Ekvator360 özel CRM alanı
            </div>
            <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              İhracat satışlarını tek panelden yönetin.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-white/72">
              Müşteri kayıtları, teklifler, pipeline, görevler, toplantılar ve follow-up
              hatırlatmaları satış ekibiniz için tek bir çalışma alanında birleşir.
            </p>
          </div>

          <div className="relative z-10 grid gap-3 text-sm text-white/76 sm:grid-cols-3">
            {["Rol bazlı yetki", "Pipeline takibi", "SMTP e-posta"].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-[var(--brand-red)]" />
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="flex items-center justify-center bg-[#09090b] px-6 py-10 lg:px-12">
          <div className="w-full max-w-md rounded-lg border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-black/30 backdrop-blur-xl">
            <div className="mb-8">
              <div className="mb-4 inline-flex size-11 items-center justify-center rounded-lg bg-white text-[var(--brand)]">
                <BarChart3 className="size-5" />
              </div>
              <h2 className="text-2xl font-semibold">CRM Giriş</h2>
              <p className="mt-2 text-sm leading-6 text-white/58">
                Yetkili kullanıcı bilgileriyle giriş yapın. Oturum HttpOnly cookie ile
                korunur.
              </p>
            </div>
            <LoginForm />
          </div>
        </section>
      </div>
    </main>
  )
}
