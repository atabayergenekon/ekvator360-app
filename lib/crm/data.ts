import "server-only"

import { getLocalDashboardData, localRecordActivity } from "@/lib/crm/local-store"
import { insertRow, isSupabaseConfigured, selectRows } from "@/lib/crm/supabase"
import type {
  Activity,
  Company,
  Contact,
  Contract,
  CrmDashboardData,
  CrmTask,
  CrmUser,
  Deal,
  FollowUp,
  Lead,
  ProcessStep,
  Quote,
} from "@/lib/crm/types"

export async function getDashboardData(): Promise<CrmDashboardData> {
  if (!isSupabaseConfigured()) {
    return getLocalDashboardData()
  }

  const [users, companies, contacts, leads, deals, quotes, tasks, followUps, contracts, processSteps, activities] = await Promise.all([
    selectRows<CrmUser>("users", { order: "created_at.desc", limit: 25 }),
    selectRows<Company>("companies", { order: "created_at.desc", limit: 50 }),
    selectRows<Contact>("contacts", { order: "created_at.desc", limit: 50 }),
    selectRows<Lead>("leads", { order: "created_at.desc", limit: 50 }),
    selectRows<Deal>("deals", { order: "created_at.desc", limit: 50 }),
    selectRows<Quote>("quotes", { order: "created_at.desc", limit: 50 }),
    selectRows<CrmTask>("tasks", { order: "due_at.asc", limit: 50 }),
    selectRows<FollowUp>("follow_ups", { order: "due_at.asc", limit: 100 }),
    selectRows<Contract>("contracts", { order: "created_at.desc", limit: 50 }),
    selectRows<ProcessStep>("process_steps", { order: "sort_order.asc", limit: 200 }),
    selectRows<Activity>("activities", { order: "created_at.desc", limit: 25 }),
  ])

  return {
    envReady: true,
    users,
    companies,
    contacts,
    leads,
    deals,
    quotes,
    tasks,
    followUps,
    contracts,
    processSteps,
    activities,
  }
}

export async function recordActivity(input: {
  actorId: string
  action: string
  entityType: string
  entityId?: string | null
  description: string
}) {
  if (!isSupabaseConfigured()) {
    await localRecordActivity(input)
    return
  }

  await insertRow<Activity>("activities", {
    actor_id: input.actorId,
    action: input.action,
    entity_type: input.entityType,
    entity_id: input.entityId ?? null,
    description: input.description,
  })
}
