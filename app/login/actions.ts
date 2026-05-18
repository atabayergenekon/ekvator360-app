"use server"

import { redirect } from "next/navigation"

import { authenticate, setSessionCookie } from "@/lib/crm/auth"

export type LoginState = {
  error?: string
}

export async function loginAction(_state: LoginState, formData: FormData): Promise<LoginState> {
  const username = String(formData.get("username") ?? "")
  const password = String(formData.get("password") ?? "")

  if (!username || !password) {
    return { error: "Kullanıcı adı ve şifre gerekli." }
  }

  try {
    const user = await authenticate(username, password)

    if (!user) {
      return { error: "Kullanıcı adı veya şifre hatalı." }
    }

    await setSessionCookie(user)
  } catch (error) {
    return {
      error:
        error instanceof Error && error.message.includes("SUPABASE")
          ? "Supabase ortam değişkenleri eksik. Lütfen .env.local dosyasını tamamlayın."
          : "Giriş sırasında bir hata oluştu.",
    }
  }

  redirect("/crm")
}
