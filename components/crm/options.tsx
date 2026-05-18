import type { Company, CrmUser, Quote } from "@/lib/crm/types"

export function UserOptions({ users }: { users: CrmUser[] }) {
  return (
    <>
      {users.map((user) => (
        <option key={user.id} value={user.id}>
          {user.full_name}
        </option>
      ))}
    </>
  )
}

export function CompanyOptions({ companies }: { companies: Company[] }) {
  return (
    <>
      <option value="">Firma seçilmedi</option>
      {companies.map((company) => (
        <option key={company.id} value={company.id}>
          {company.name}
        </option>
      ))}
    </>
  )
}

export function QuoteOptions({ quotes }: { quotes: Quote[] }) {
  return (
    <>
      <option value="">Teklif seçilmedi</option>
      {quotes.map((quote) => (
        <option key={quote.id} value={quote.id}>
          {quote.quote_no} - {quote.subject}
        </option>
      ))}
    </>
  )
}

export const customerStatuses = [
  "Lead",
  "Teklif Hazırlanıyor",
  "Teklif Gönderildi",
  "Takipte",
  "Sözleşme",
  "Süreçte",
  "Kaybedildi",
  "Tamamlandı",
]

export const pipelineStages = [
  "Lead",
  "Teklif Hazırlanıyor",
  "Teklif Gönderildi",
  "Takipte",
  "Sözleşme",
  "Süreçte",
  "Kaybedildi",
]

export const processStatuses = ["Bekliyor", "Devam ediyor", "Tamamlandı", "Gecikti"]
export const taskPrefixes = ["Genel", "Müşteri", "Teklif", "Operasyon", "İç İş"]
export const followUpChannels = ["Telefon", "E-posta", "WhatsApp", "Randevu", "Sunum", "Diğer"]
