import { redirect } from "next/navigation"
import { Bell, LogOut, Search, Settings, ShieldCheck } from "lucide-react"

import { logoutAction } from "@/app/crm/actions"
import { CrmMobileNav, CrmSidebarNav } from "@/components/crm/crm-nav"
import { Logo } from "@/components/site/logo"
import { Button } from "@/components/ui/button"
import { getCurrentUser } from "@/lib/crm/auth"

export default async function CrmLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  return (
    <div className="min-h-svh bg-[#f7f7f5] text-foreground">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r bg-white lg:flex lg:flex-col">
        <div className="flex h-16 items-center border-b px-5">
          <Logo />
        </div>
        <CrmSidebarNav />
        <div className="border-t p-4">
          <div className="mb-3 rounded-lg bg-muted p-3">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <ShieldCheck className="size-4 text-[var(--brand)]" />
              {user.full_name}
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              {user.role === "admin" ? "Admin" : "Kullanıcı"} · {user.username}
            </p>
          </div>
          <form action={logoutAction}>
            <Button type="submit" variant="outline" className="w-full justify-start">
              <LogOut className="size-4" />
              Çıkış yap
            </Button>
          </form>
        </div>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 border-b bg-white/90 backdrop-blur-xl">
          <div className="flex h-16 items-center gap-3 px-4 lg:px-6">
            <div className="lg:hidden">
              <Logo />
            </div>
            <div className="hidden h-9 max-w-xl flex-1 items-center gap-2 rounded-lg border bg-muted/40 px-3 lg:flex">
              <Search className="size-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Müşteri, firma, teklif, süreç veya görev ara
              </span>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <Button variant="outline" size="icon" aria-label="Bildirimler">
                <Bell className="size-4" />
              </Button>
              <Button variant="outline" size="icon" aria-label="Ayarlar">
                <Settings className="size-4" />
              </Button>
              <form action={logoutAction} className="lg:hidden">
                <Button type="submit" variant="outline" size="icon" aria-label="Çıkış yap">
                  <LogOut className="size-4" />
                </Button>
              </form>
            </div>
          </div>
          <CrmMobileNav />
        </header>
        {children}
      </div>
    </div>
  )
}
