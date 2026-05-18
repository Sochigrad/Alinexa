create table if not exists public.alinexa_workspaces (
  user_id uuid primary key references auth.users(id) on delete cascade,
  board jsonb not null default '{"columns":[],"cards":[]}'::jsonb,
  theme jsonb not null default '{}'::jsonb,
  labels jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.alinexa_workspaces enable row level security;

drop policy if exists "Users can read their Alinexa workspace" on public.alinexa_workspaces;
create policy "Users can read their Alinexa workspace"
on public.alinexa_workspaces
for select
using (auth.uid() = user_id);

drop policy if exists "Users can insert their Alinexa workspace" on public.alinexa_workspaces;
create policy "Users can insert their Alinexa workspace"
on public.alinexa_workspaces
for insert
with check (auth.uid() = user_id);

drop policy if exists "Users can update their Alinexa workspace" on public.alinexa_workspaces;
create policy "Users can update their Alinexa workspace"
on public.alinexa_workspaces
for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Users can delete their Alinexa workspace" on public.alinexa_workspaces;
create policy "Users can delete their Alinexa workspace"
on public.alinexa_workspaces
for delete
using (auth.uid() = user_id);
