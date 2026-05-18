create extension if not exists "pgcrypto";

create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  username text not null unique,
  password_hash text not null,
  full_name text not null,
  email text,
  role text not null default 'user' check (role in ('admin', 'user')),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists companies (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  sector text,
  country text,
  status text not null default 'Potansiyel',
  phone text,
  email text,
  tags text[] default '{}',
  assigned_to uuid references users(id),
  created_by uuid references users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists contacts (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references companies(id) on delete cascade,
  full_name text not null,
  title text,
  phone text,
  email text,
  whatsapp text,
  created_by uuid references users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists customers (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references companies(id) on delete cascade,
  status text not null default 'Aktif',
  lifetime_value numeric default 0,
  created_by uuid references users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  company_name text not null,
  contact_name text,
  source text,
  status text not null default 'Yeni',
  estimated_value numeric default 0,
  next_follow_up_at timestamptz,
  assigned_to uuid references users(id),
  created_by uuid references users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists pipeline_stages (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  sort_order integer not null default 0
);

insert into pipeline_stages (name, sort_order)
values ('Yeni', 10), ('Görüşme', 20), ('Teklif', 30), ('Müzakere', 40), ('Kazanıldı', 50)
on conflict (name) do nothing;

create table if not exists deals (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  company_id uuid references companies(id),
  stage text not null default 'Yeni',
  value numeric not null default 0,
  currency text not null default 'EUR',
  probability integer not null default 25,
  expected_close_at date,
  assigned_to uuid references users(id),
  created_by uuid references users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists quotes (
  id uuid primary key default gen_random_uuid(),
  quote_no text not null unique,
  company_id uuid references companies(id),
  subject text not null,
  amount numeric not null default 0,
  currency text not null default 'EUR',
  status text not null default 'Taslak',
  valid_until date,
  follow_up_at timestamptz,
  lost_reason text,
  accepted_at timestamptz,
  created_by uuid references users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists tasks (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  related_type text,
  related_id uuid,
  due_at timestamptz,
  priority text not null default 'Orta',
  prefix text not null default 'Genel',
  status text not null default 'Açık',
  assigned_to uuid references users(id),
  created_by uuid references users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists follow_ups (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references companies(id) on delete cascade,
  quote_id uuid references quotes(id) on delete set null,
  title text not null,
  channel text not null default 'Telefon',
  due_at timestamptz,
  status text not null default 'Açık',
  note text,
  assigned_to uuid references users(id),
  created_by uuid references users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists reminders (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  remind_at timestamptz not null,
  related_type text,
  related_id uuid,
  assigned_to uuid references users(id),
  created_by uuid references users(id),
  created_at timestamptz not null default now()
);

create table if not exists meetings (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  starts_at timestamptz not null,
  ends_at timestamptz,
  company_id uuid references companies(id),
  contact_id uuid references contacts(id),
  notes text,
  assigned_to uuid references users(id),
  created_by uuid references users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists notes (
  id uuid primary key default gen_random_uuid(),
  entity_type text not null,
  entity_id uuid,
  body text not null,
  created_by uuid references users(id),
  created_at timestamptz not null default now()
);

create table if not exists activities (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references users(id),
  action text not null,
  entity_type text not null,
  entity_id uuid,
  description text not null,
  created_at timestamptz not null default now()
);

create table if not exists files (
  id uuid primary key default gen_random_uuid(),
  entity_type text,
  entity_id uuid,
  bucket text not null default 'crm-files',
  path text not null,
  file_name text not null,
  mime_type text,
  size_bytes bigint,
  uploaded_by uuid references users(id),
  created_at timestamptz not null default now()
);

create table if not exists tags (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  color text,
  created_at timestamptz not null default now()
);

create table if not exists notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id),
  title text not null,
  body text,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists email_logs (
  id uuid primary key default gen_random_uuid(),
  to_email text not null,
  subject text not null,
  body text,
  status text not null default 'sent',
  created_by uuid references users(id),
  created_at timestamptz not null default now()
);

create table if not exists contracts (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references companies(id) on delete cascade,
  contract_no text not null unique,
  starts_at date not null,
  ends_at date not null,
  monthly_fee numeric not null default 0,
  currency text not null default 'TRY',
  payment_day integer not null default 15,
  renewal_notice_at date,
  status text not null default 'Aktif',
  file_name text,
  file_path text,
  assigned_to uuid references users(id),
  created_by uuid references users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists process_steps (
  id uuid primary key default gen_random_uuid(),
  contract_id uuid references contracts(id) on delete cascade,
  company_id uuid references companies(id) on delete cascade,
  title text not null,
  description text not null,
  due_at date,
  status text not null default 'Bekliyor',
  sort_order integer not null default 0,
  assigned_to uuid references users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists companies_search_idx on companies using gin (
  to_tsvector('simple', coalesce(name, '') || ' ' || coalesce(sector, '') || ' ' || coalesce(country, ''))
);
create index if not exists leads_status_idx on leads(status);
create index if not exists deals_stage_idx on deals(stage);
create index if not exists tasks_due_at_idx on tasks(due_at);
create index if not exists follow_ups_company_idx on follow_ups(company_id);
create index if not exists follow_ups_due_at_idx on follow_ups(due_at);
create index if not exists contracts_company_idx on contracts(company_id);
create index if not exists process_steps_contract_idx on process_steps(contract_id);
create index if not exists process_steps_due_at_idx on process_steps(due_at);
