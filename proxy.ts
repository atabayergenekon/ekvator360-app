import { NextResponse, type NextRequest } from "next/server"

import { CRM_SESSION_COOKIE } from "@/lib/crm/constants"

export function proxy(request: NextRequest) {
  const hasSession = request.cookies.has(CRM_SESSION_COOKIE)

  if (request.nextUrl.pathname.startsWith("/crm") && !hasSession) {
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("next", request.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }

  if (request.nextUrl.pathname === "/login" && hasSession) {
    return NextResponse.redirect(new URL("/crm", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/crm/:path*", "/login"],
}
