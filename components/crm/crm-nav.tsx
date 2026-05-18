"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  Building2,
  CalendarDays,
  FileText,
  GitBranch,
  PhoneCall,
  Target,
  UsersRound,
} from "lucide-react"

import { cn } from "@/lib/utils"

const navItems = [
  { label: "Dashboard", href: "/crm", icon: BarChart3 },
  { label: "Müşteriler", href: "/crm/customers", icon: Building2 },
  { label: "Pipeline", href: "/crm/pipeline", icon: Target },
  { label: "Teklifler", href: "/crm/quotes", icon: FileText },
  { label: "Takip/Hatırlatma", href: "/crm/followups", icon: PhoneCall },
  { label: "Görevler", href: "/crm/tasks", icon: CalendarDays },
  { label: "Süreç/Sözleşmeler", href: "/crm/process", icon: GitBranch },
  { label: "Kullanıcılar", href: "/crm/users", icon: UsersRound },
]

function isActive(pathname: string, href: string) {
  return href === "/crm" ? pathname === href : pathname.startsWith(href)
}

export function CrmSidebarNav() {
  const pathname = usePathname()

  return (
    <nav className="flex-1 space-y-1 px-3 py-4">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "flex h-10 items-center gap-3 rounded-lg px-3 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground",
            isActive(pathname, item.href) &&
              "bg-[var(--brand)] text-white hover:bg-[var(--brand)] hover:text-white",
          )}
        >
          <item.icon className="size-4" />
          {item.label}
        </Link>
      ))}
    </nav>
  )
}

export function CrmMobileNav() {
  const pathname = usePathname()

  return (
    <nav className="flex gap-1 overflow-x-auto border-t px-4 py-2 lg:hidden">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "inline-flex h-9 shrink-0 items-center gap-2 rounded-lg px-3 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground",
            isActive(pathname, item.href) &&
              "bg-[var(--brand)] text-white hover:bg-[var(--brand)] hover:text-white",
          )}
        >
          <item.icon className="size-4" />
          {item.label}
        </Link>
      ))}
    </nav>
  )
}
