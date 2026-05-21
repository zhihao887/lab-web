import {
  joinReasons,
  newsItems,
  people,
  projects,
  publications,
  researchAreas,
  resources,
  siteInfo,
  stats,
} from '../src/data/siteData.js'

const collections = {
  stats,
  researchAreas,
  people,
  publications,
  newsItems,
  projects,
  resources,
  joinReasons,
}

const sqlString = (value) => `'${String(value).replaceAll("'", "''")}'`
const jsonb = (value) => `${sqlString(JSON.stringify(value))}::jsonb`

const keyFor = (item, index, prefix) => item.id || item.slug || item.name || `${prefix}-${String(index + 1).padStart(3, '0')}`

const rows = [
  {
    content_type: 'siteInfo',
    entry_key: 'default',
    data: siteInfo,
    status: 'published',
    sort_order: 0,
  },
]

Object.entries(collections).forEach(([contentType, items]) => {
  items.forEach((item, index) => {
    rows.push({
      content_type: contentType,
      entry_key: keyFor(item, index, contentType),
      data: item,
      status: 'published',
      sort_order: index,
    })
  })
})

console.log('-- Generated from src/data/siteData.js')
console.log('-- Run after supabase/schema.sql.')
console.log('begin;')

rows.forEach((row) => {
  console.log(`
insert into public.content_entries (content_type, entry_key, data, status, sort_order)
values (${sqlString(row.content_type)}, ${sqlString(row.entry_key)}, ${jsonb(row.data)}, ${sqlString(row.status)}, ${row.sort_order})
on conflict (content_type, entry_key) do update set
  data = excluded.data,
  status = excluded.status,
  sort_order = excluded.sort_order,
  updated_at = now();`)
})

console.log('commit;')
