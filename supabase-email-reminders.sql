create table if not exists public.alinexa_reminder_deliveries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  card_id text not null,
  planned_at timestamptz not null,
  channel text not null default 'email',
  sent_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  unique (user_id, card_id, planned_at, channel)
);

alter table public.alinexa_reminder_deliveries enable row level security;

drop policy if exists "Users can read their reminder deliveries" on public.alinexa_reminder_deliveries;
create policy "Users can read their reminder deliveries"
on public.alinexa_reminder_deliveries
for select
using (auth.uid() = user_id);
