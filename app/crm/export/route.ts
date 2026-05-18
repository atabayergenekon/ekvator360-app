import { NextResponse } from "next/server"

import { getCurrentUser } from "@/lib/crm/auth"
import { getDashboardData } from "@/lib/crm/data"

function csvCell(value: unknown) {
  const text = Array.isArray(value) ? value.join("; ") : String(value ?? "")
  return `"${text.replaceAll('"', '""')}"`
}

export async function GET(request: Request) {
  const user = await getCurrentUser()

  if (!user) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  const data = await getDashboardData()
  const rows = [
    ["Firma", "Sektor", "Ulke", "Durum", "Telefon", "E-posta", "Etiketler"],
    ...data.companies.map((company) => [
      company.name,
      company.sector,
      company.country,
      company.status,
      company.phone,
      company.email,
      company.tags,
    ]),
  ]

  const csv = rows.map((row) => row.map(csvCell).join(",")).join("\r\n")

  return new NextResponse(`\uFEFF${csv}`, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="ekvator360-crm-firmalar.csv"',
    },
  })
}
