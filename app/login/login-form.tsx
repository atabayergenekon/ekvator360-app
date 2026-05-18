"use client"

import { useActionState } from "react"
import { ArrowRight, LockKeyhole, UserRound } from "lucide-react"

import { loginAction, type LoginState } from "@/app/login/actions"
import { Button } from "@/components/ui/button"

export function LoginForm() {
  const [state, action, pending] = useActionState<LoginState, FormData>(loginAction, {})

  return (
    <form action={action} className="grid gap-4">
      <label className="grid gap-2 text-sm font-medium text-white/88">
        Kullanıcı adı
        <span className="relative">
          <UserRound className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-white/45" />
          <input
            name="username"
            autoComplete="username"
            className="h-12 w-full rounded-lg border border-white/10 bg-white/8 px-10 text-sm text-white outline-none transition focus:border-white/30 focus:bg-white/12"
            placeholder="atabay"
          />
        </span>
      </label>
      <label className="grid gap-2 text-sm font-medium text-white/88">
        Şifre
        <span className="relative">
          <LockKeyhole className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-white/45" />
          <input
            name="password"
            type="password"
            autoComplete="current-password"
            className="h-12 w-full rounded-lg border border-white/10 bg-white/8 px-10 text-sm text-white outline-none transition focus:border-white/30 focus:bg-white/12"
            placeholder="••••••••"
          />
        </span>
      </label>
      {state.error ? (
        <p className="rounded-lg border border-red-300/20 bg-red-500/12 px-3 py-2 text-sm text-red-100">
          {state.error}
        </p>
      ) : null}
      <Button
        type="submit"
        size="lg"
        disabled={pending}
        className="h-12 bg-white text-[var(--brand-deep)] hover:bg-white/90"
      >
        {pending ? "Giriş yapılıyor" : "CRM'e giriş yap"}
        <ArrowRight className="size-4" />
      </Button>
    </form>
  )
}
