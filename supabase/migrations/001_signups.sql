-- PolyLingo LP: signups table
-- Run in Supabase SQL Editor or via: supabase db push

create table if not exists signups (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  mother_tongue text not null,
  target_languages text[] not null default '{}',
  message text,
  source text,
  user_agent text,
  ip_country text,
  created_at timestamptz default now(),
  confirmed_at timestamptz,
  unsubscribed_at timestamptz
);

create index if not exists idx_signups_email on signups(email);
create index if not exists idx_signups_created on signups(created_at desc);

alter table signups enable row level security;

-- Allow anonymous inserts only (LP pre-registration form)
drop policy if exists "Anyone can sign up" on signups;
create policy "Anyone can sign up"
  on signups
  for insert
  to anon
  with check (true);

-- Service role bypasses RLS for admin reads; anon cannot select
drop policy if exists "No public reads" on signups;
create policy "No public reads"
  on signups
  for select
  to anon
  using (false);
