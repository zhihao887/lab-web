import { createClient } from '@supabase/supabase-js'
import { existsSync, readFileSync } from 'node:fs'
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

const readLocalEnv = () => {
  if (!existsSync('.env.local')) return {}

  return Object.fromEntries(
    readFileSync('.env.local', 'utf8')
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith('#') && line.includes('='))
      .map((line) => {
        const [key, ...rest] = line.split('=')
        return [key.trim(), rest.join('=').trim()]
      }),
  )
}

const env = Object.assign({}, readLocalEnv(), process.env)

const supabaseUrl = env.VITE_SUPABASE_URL || env.SUPABASE_URL
const serviceRoleKey = env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !serviceRoleKey) {
  console.error('Missing SUPABASE_URL/VITE_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.')
  console.error('Put the service role key in a local, uncommitted environment variable. Do not use VITE_ for secret keys.')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
})

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

const chunkSize = 50

for (let index = 0; index < rows.length; index += chunkSize) {
  const chunk = rows.slice(index, index + chunkSize)
  const { error } = await supabase.from('content_entries').upsert(chunk, {
    onConflict: 'content_type,entry_key',
  })

  if (error) {
    console.error(error.message)
    process.exit(1)
  }
}

console.log(`Imported ${rows.length} content entries.`)
