create table if not exists public.alinexa_push_subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  endpoint text not null unique,
  subscription jsonb not null,
  user_agent text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.alinexa_push_subscriptions enable row level security;

drop policy if exists "Users can view their Alinexa push subscriptions" on public.alinexa_push_subscriptions;
create policy "Users can view their Alinexa push subscriptions"
on public.alinexa_push_subscriptions
for select
using (auth.uid() = user_id);

drop policy if exists "Users can create their Alinexa push subscriptions" on public.alinexa_push_subscriptions;
create policy "Users can create their Alinexa push subscriptions"
on public.alinexa_push_subscriptions
for insert
with check (auth.uid() = user_id);

drop policy if exists "Users can update their Alinexa push subscriptions" on public.alinexa_push_subscriptions;
create policy "Users can update their Alinexa push subscriptions"
on public.alinexa_push_subscriptions
for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Users can delete their Alinexa push subscriptions" on public.alinexa_push_subscriptions;
create policy "Users can delete their Alinexa push subscriptions"
on public.alinexa_push_subscriptions
for delete
using (auth.uid() = user_id);

create table if not exists public.alinexa_reminder_deliveries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  card_id text not null,
  planned_at timestamptz not null,
  sent_at timestamptz not null default now(),
  unique (user_id, card_id, planned_at)
);

alter table public.alinexa_reminder_deliveries enable row level security;

drop policy if exists "Users can view their Alinexa reminder deliveries" on public.alinexa_reminder_deliveries;
create policy "Users can view their Alinexa reminder deliveries"
on public.alinexa_reminder_deliveries
for select
using (auth.uid() = user_id);
