import { getFallbackItems, loadPublishedContent } from './contentStore'
import { isSupabaseConfigured, supabase } from './supabaseClient'

const fallbackKeyFor = (item, index, contentType) =>
  item.id || item.slug || item.name || `${contentType}-${String(index + 1).padStart(3, '0')}`

const fallbackEntriesFor = (contentType) =>
  getFallbackItems(contentType).map((item, index) => ({
    content_type: contentType,
    entry_key: fallbackKeyFor(item, index, contentType),
    data: item,
    status: 'published',
    sort_order: index,
    readonly: true,
  }))

export const adminModules = {
  newsItems: {
    title: '动态',
    singular: '动态',
    route: 'news',
    keyPrefix: 'news',
    idField: 'id',
    summaryField: 'title',
    fields: [
      { name: 'title', label: '标题', type: 'text', required: true },
      { name: 'excerpt', label: '摘要', type: 'textarea' },
      { name: 'date', label: '日期', type: 'date' },
      {
        name: 'category',
        label: '分类',
        type: 'select',
        options: ['research', 'recruiting', 'event', 'achievement'],
      },
      {
        name: 'featured',
        label: '首页精选',
        type: 'checkbox',
        help: '首页最多展示 3 条，超过后按日期优先显示最新动态。',
      },
      { name: 'cover', label: '封面图 URL', type: 'url', upload: 'image' },
    ],
  },
  people: {
    title: '成员',
    singular: '成员',
    route: 'people',
    keyPrefix: 'person',
    idField: 'name',
    summaryField: 'name',
    fields: [
      { name: 'name', label: '姓名', type: 'text', required: true },
      { name: 'role', label: '角色', type: 'text' },
      {
        name: 'group',
        label: '分组',
        type: 'select',
        options: ['directors', 'control-theory', 'unmanned-systems', 'artificial-intelligence', 'engineering-projects'],
      },
      { name: 'problemTitle', label: '关联问题', type: 'text' },
      { name: 'avatar', label: '头像 URL', type: 'url', upload: 'image' },
    ],
  },
  projects: {
    title: '项目',
    singular: '项目',
    route: 'projects',
    keyPrefix: 'project',
    idField: 'id',
    summaryField: 'title',
    fields: [
      { name: 'title', label: '标题', type: 'text', required: true },
      { name: 'description', label: '简介', type: 'textarea' },
      { name: 'problem', label: '问题', type: 'textarea' },
      { name: 'vision', label: '愿景', type: 'textarea' },
      { name: 'value', label: '价值', type: 'textarea' },
      { name: 'challenge', label: '挑战', type: 'textarea' },
      { name: 'opportunity', label: '探索空间', type: 'textarea' },
      { name: 'progress', label: '进展', type: 'textarea' },
      { name: 'lead', label: '参与人', type: 'text' },
      { name: 'owner', label: '登记人', type: 'text' },
      { name: 'phase', label: '阶段', type: 'text' },
      { name: 'status', label: '状态', type: 'text' },
      { name: 'year', label: '年份', type: 'text' },
      {
        name: 'researchSlug',
        label: '研究方向',
        type: 'select',
        options: ['control-theory', 'unmanned-systems', 'artificial-intelligence', 'engineering-projects'],
      },
      { name: 'direction', label: '方向名称', type: 'text' },
      { name: 'tags', label: '标签', type: 'list' },
      { name: 'outputs', label: '阶段产出', type: 'list' },
      { name: 'milestones', label: '近期推进', type: 'list' },
      { name: 'links', label: '相关链接', type: 'list' },
    ],
  },
  publications: {
    title: '成果',
    singular: '成果',
    route: 'publications',
    keyPrefix: 'pub',
    idField: 'id',
    summaryField: 'title',
    fields: [
      { name: 'title', label: '标题', type: 'text', required: true },
      { name: 'authors', label: '作者', type: 'text' },
      { name: 'venue', label: '发表载体', type: 'text' },
      { name: 'year', label: '年份', type: 'text' },
      { name: 'type', label: '类型', type: 'select', options: ['conference', 'journal', 'preprint'] },
      { name: 'tag', label: '标签', type: 'text' },
      { name: 'featured', label: '首页精选', type: 'checkbox' },
      { name: 'doi', label: 'DOI', type: 'text' },
      { name: 'paper', label: 'Paper URL', type: 'url' },
      { name: 'pdf', label: 'PDF URL', type: 'url', upload: 'file' },
      { name: 'code', label: 'Code URL', type: 'url' },
      { name: 'dataset', label: 'Dataset URL', type: 'url' },
      {
        name: 'researchSlug',
        label: '研究方向',
        type: 'select',
        options: ['control-theory', 'unmanned-systems', 'artificial-intelligence', 'engineering-projects'],
      },
      { name: 'projectIds', label: '关联项目 ID', type: 'list' },
      { name: 'resourceIds', label: '关联资源 ID', type: 'list' },
      { name: 'abstract', label: '摘要', type: 'textarea' },
      { name: 'highlights', label: '主要贡献', type: 'list' },
      { name: 'citation', label: '引用信息', type: 'textarea' },
      { name: 'bibtex', label: 'BibTeX', type: 'textarea' },
    ],
  },
  resources: {
    title: '资源',
    singular: '资源',
    route: 'resources',
    keyPrefix: 'res',
    idField: 'id',
    summaryField: 'title',
    fields: [
      { name: 'title', label: '标题', type: 'text', required: true },
      { name: 'category', label: '分类', type: 'select', options: ['dataset', 'code', 'demo', 'document'] },
      { name: 'description', label: '说明', type: 'textarea' },
      { name: 'status', label: '状态', type: 'text' },
      { name: 'owner', label: '负责人', type: 'text' },
      { name: 'updated', label: '更新时间', type: 'date' },
      { name: 'href', label: '资源链接/附件 URL', type: 'url', upload: 'file' },
    ],
  },
}

export const listAdminEntries = async (contentType) => {
  if (!isSupabaseConfigured || !supabase) {
    return fallbackEntriesFor(contentType)
  }

  const { data, error } = await supabase
    .from('content_entries')
    .select('content_type, entry_key, data, status, sort_order, updated_at')
    .eq('content_type', contentType)
    .order('sort_order', { ascending: true })
    .order('entry_key', { ascending: true })

  if (error) throw error

  return data.length ? data : fallbackEntriesFor(contentType)
}

export const saveAdminEntry = async ({ contentType, entryKey, data, status, sortOrder }) => {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error('Supabase is not configured, so changes cannot be saved.')
  }

  const { error } = await supabase.from('content_entries').upsert(
    {
      content_type: contentType,
      entry_key: entryKey,
      data,
      status,
      sort_order: sortOrder,
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'content_type,entry_key' },
  )

  if (error) throw error
  await loadPublishedContent()
}

export const deleteAdminEntry = async ({ contentType, entryKey }) => {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error('Supabase is not configured, so changes cannot be deleted.')
  }

  const { error } = await supabase.from('content_entries').delete().match({
    content_type: contentType,
    entry_key: entryKey,
  })

  if (error) throw error
  await loadPublishedContent()
}

export const uploadAdminAsset = async ({ file, contentType }) => {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error('Supabase is not configured, so files cannot be uploaded.')
  }

  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '-')
  const path = `${contentType}/${Date.now()}-${safeName}`
  const { error } = await supabase.storage.from('site-media').upload(path, file, {
    cacheControl: '3600',
    upsert: false,
  })

  if (error) throw error

  const { data } = supabase.storage.from('site-media').getPublicUrl(path)
  return data.publicUrl
}

export const deleteAdminAsset = async (publicUrl) => {
  if (!publicUrl) return false
  if (!isSupabaseConfigured || !supabase) {
    throw new Error('Supabase is not configured, so files cannot be deleted.')
  }

  let path = ''

  try {
    const url = new URL(publicUrl)
    const marker = '/storage/v1/object/public/site-media/'
    const markerIndex = url.pathname.indexOf(marker)
    if (markerIndex === -1) return false
    path = decodeURIComponent(url.pathname.slice(markerIndex + marker.length))
  } catch {
    return false
  }

  if (!path) return false

  const { error } = await supabase.storage.from('site-media').remove([path])
  if (error) throw error

  return true
}
