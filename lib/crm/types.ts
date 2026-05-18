export type CrmRole = "admin" | "user"

export type CrmUser = {
  id: string
  username: string
  full_name: string
  email: string | null
  role: CrmRole
  is_active: boolean
}

export type Company = {
  id: string
  name: string
  sector: string | null
  country: string | null
  status: string
  phone: string | null
  email: string | null
  tags: string[] | null
  assigned_to: string | null
  created_at: string
}

export type Contact = {
  id: string
  company_id: string | null
  full_name: string
  title: string | null
  phone: string | null
  email: string | null
  whatsapp: string | null
}

export type Lead = {
  id: string
  company_name: string
  contact_name: string | null
  source: string | null
  status: string
  estimated_value: number | null
  next_follow_up_at: string | null
  assigned_to: string | null
  created_at: string
}

export type Deal = {
  id: string
  title: string
  company_id: string | null
  stage: string
  value: number
  currency: string
  probability: number
  expected_close_at: string | null
  assigned_to: string | null
}

export type Quote = {
  id: string
  quote_no: string
  company_id: string | null
  subject: string
  amount: number
  currency: string
  status: string
  valid_until: string | null
  follow_up_at: string | null
  lost_reason: string | null
  accepted_at: string | null
  created_at: string
}

export type CrmTask = {
  id: string
  title: string
  related_type: string | null
  related_id: string | null
  due_at: string | null
  priority: string
  prefix: string
  status: string
  assigned_to: string | null
}

export type FollowUp = {
  id: string
  company_id: string
  quote_id: string | null
  title: string
  channel: string
  due_at: string | null
  status: string
  note: string | null
  assigned_to: string | null
  created_at: string
}

export type Activity = {
  id: string
  actor_id: string | null
  action: string
  entity_type: string
  entity_id: string | null
  description: string
  created_at: string
}

export type Contract = {
  id: string
  company_id: string
  contract_no: string
  starts_at: string
  ends_at: string
  monthly_fee: number
  currency: string
  payment_day: number
  renewal_notice_at: string | null
  status: string
  file_name: string | null
  file_path: string | null
  assigned_to: string | null
  created_at: string
}

export type ProcessStep = {
  id: string
  contract_id: string
  company_id: string
  title: string
  description: string
  due_at: string | null
  status: string
  sort_order: number
  assigned_to: string | null
  created_at: string
}

export type CrmDashboardData = {
  users: CrmUser[]
  companies: Company[]
  contacts: Contact[]
  leads: Lead[]
  deals: Deal[]
  quotes: Quote[]
  tasks: CrmTask[]
  followUps: FollowUp[]
  contracts: Contract[]
  processSteps: ProcessStep[]
  activities: Activity[]
  envReady: boolean
}
