-- 1. 创建通用内容表
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

-- 2. 强行开启 RLS
alter table public.content_entries enable row level security;

-- 3. 清理旧策略
drop policy if exists "public can read published content" on public.content_entries;
drop policy if exists "single admin can read all content" on public.content_entries;
drop policy if exists "single admin can insert content" on public.content_entries;
drop policy if exists "single admin can update content" on public.content_entries;
drop policy if exists "single admin can delete content" on public.content_entries;

-- 4. 重新建立新策略 (直接使用硬编码邮箱校验)
create policy "public can read published content"
  on public.content_entries
  for select
  using (status = 'published');

create policy "single admin can read all content"
  on public.content_entries
  for select
  to authenticated
  using (lower(auth.jwt() ->> 'email') = '15933511645@163.com');

create policy "single admin can insert content"
  on public.content_entries
  for insert
  to authenticated
  with check (lower(auth.jwt() ->> 'email') = '15933511645@163.com');

create policy "single admin can update content"
  on public.content_entries
  for update
  to authenticated
  using (lower(auth.jwt() ->> 'email') = '15933511645@163.com')
  with check (lower(auth.jwt() ->> 'email') = '15933511645@163.com');

create policy "single admin can delete content"
  on public.content_entries
  for delete
  to authenticated
  using (lower(auth.jwt() ->> 'email') = '15933511645@163.com');

-- 5. 初始化 Storage 存储桶
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'site-media',
  'site-media',
  true,
  10485760,
  array['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml', 'application/pdf']
)
on conflict (id) do nothing;

-- 6. Storage 的权限策略 (直接使用硬编码邮箱校验)
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
    and lower(auth.jwt() ->> 'email') = '15933511645@163.com'
  );

drop policy if exists "single admin can update site media" on storage.objects;
create policy "single admin can update site media"
  on storage.objects
  for update
  to authenticated
  using (
    bucket_id = 'site-media'
    and lower(auth.jwt() ->> 'email') = '15933511645@163.com'
  );

drop policy if exists "single admin can delete site media" on storage.objects;
create policy "single admin can delete site media"
  on storage.objects
  for delete
  to authenticated
  using (
    bucket_id = 'site-media'
    and lower(auth.jwt() ->> 'email') = '15933511645@163.com'
  );