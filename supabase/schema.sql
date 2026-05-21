-- Single-admin content backend for the hidden Vue admin route.
-- Run this in the Supabase SQL Editor, then create one Auth user whose
-- email matches VITE_ADMIN_EMAIL in Vercel/local .env.

create table if not exists public.content_entries (
  id uuid primary key default gen_random_uuid(),
  content_type text not null,
  entry_key text not null,
  data jsonb not null default '{}'::jsonb,
  status text not null default 'draft' check (status in ('draft', 'published')),
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (content_type, entry_key)
);

create index if not exists content_entries_public_idx
  on public.content_entries (content_type, status, sort_order);

alter table public.content_entries enable row level security;

drop policy if exists "public can read published content" on public.content_entries;
create policy "public can read published content"
  on public.content_entries
  for select
  using (status = 'published');

drop policy if exists "single admin can read all content" on public.content_entries;
create policy "single admin can read all content"
  on public.content_entries
  for select
  to authenticated
  using (lower(auth.jwt() ->> 'email') = lower(current_setting('app.admin_email', true)));

drop policy if exists "single admin can insert content" on public.content_entries;
create policy "single admin can insert content"
  on public.content_entries
  for insert
  to authenticated
  with check (lower(auth.jwt() ->> 'email') = lower(current_setting('app.admin_email', true)));

drop policy if exists "single admin can update content" on public.content_entries;
create policy "single admin can update content"
  on public.content_entries
  for update
  to authenticated
  using (lower(auth.jwt() ->> 'email') = lower(current_setting('app.admin_email', true)))
  with check (lower(auth.jwt() ->> 'email') = lower(current_setting('app.admin_email', true)));

drop policy if exists "single admin can delete content" on public.content_entries;
create policy "single admin can delete content"
  on public.content_entries
  for delete
  to authenticated
  using (lower(auth.jwt() ->> 'email') = lower(current_setting('app.admin_email', true)));

-- Replace this value with the same email used for VITE_ADMIN_EMAIL.
-- Supabase policies cannot read Vite env vars, so the DB needs its own setting.
alter database postgres set app.admin_email = 'admin@neu.com';

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'site-media',
  'site-media',
  true,
  10485760,
  array['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml', 'application/pdf']
)
on conflict (id) do nothing;

drop policy if exists "public can read site media" on storage.objects;
create policy "public can read site media"
  on storage.objects
  for select
  using (bucket_id = 'site-media');

drop policy if exists "single admin can upload site media" on storage.objects;
create policy "single admin can upload site media"
  on storage.objects
  for insert
  to authenticated
  with check (
    bucket_id = 'site-media'
    and lower(auth.jwt() ->> 'email') = lower(current_setting('app.admin_email', true))
  );

drop policy if exists "single admin can update site media" on storage.objects;
create policy "single admin can update site media"
  on storage.objects
  for update
  to authenticated
  using (
    bucket_id = 'site-media'
    and lower(auth.jwt() ->> 'email') = lower(current_setting('app.admin_email', true))
  );

drop policy if exists "single admin can delete site media" on storage.objects;
create policy "single admin can delete site media"
  on storage.objects
  for delete
  to authenticated
  using (
    bucket_id = 'site-media'
    and lower(auth.jwt() ->> 'email') = lower(current_setting('app.admin_email', true))
  );
