import { reactive, readonly } from 'vue'
import {
  joinReasons as fallbackJoinReasons,
  navItems as fallbackNavItems,
  newsItems as fallbackNewsItems,
  people as fallbackPeople,
  projects as fallbackProjects,
  publications as fallbackPublications,
  researchAreas as fallbackResearchAreas,
  resources as fallbackResources,
  siteInfo as fallbackSiteInfo,
  stats as fallbackStats,
} from '../data/siteData'
import { isSupabaseConfigured, supabase } from './supabaseClient'

export const contentTypes = [
  'stats',
  'researchAreas',
  'people',
  'publications',
  'newsItems',
  'projects',
  'resources',
  'joinReasons',
]

const fallbackCollections = {
  stats: fallbackStats,
  researchAreas: fallbackResearchAreas,
  people: fallbackPeople,
  publications: fallbackPublications,
  newsItems: fallbackNewsItems,
  projects: fallbackProjects,
  resources: fallbackResources,
  joinReasons: fallbackJoinReasons,
}

export const contentStatus = reactive({
  loaded: false,
  loading: false,
  source: 'static',
  error: '',
})

export const siteInfo = reactive({ ...fallbackSiteInfo })
export const navItems = readonly(fallbackNavItems)
export const stats = reactive([...fallbackStats])
export const researchAreas = reactive([...fallbackResearchAreas])
export const people = reactive([...fallbackPeople])
export const publications = reactive([...fallbackPublications])
export const newsItems = reactive([...fallbackNewsItems])
export const projects = reactive([...fallbackProjects])
export const resources = reactive([...fallbackResources])
export const joinReasons = reactive([...fallbackJoinReasons])

const collectionTargets = {
  stats,
  researchAreas,
  people,
  publications,
  newsItems,
  projects,
  resources,
  joinReasons,
}

const replaceArray = (target, values) => {
  target.splice(0, target.length, ...values)
}

const applySiteInfo = (value) => {
  const normalizedValue = { ...value }
  if (normalizedValue.email === 'contact@imblab.cn') {
    normalizedValue.email = fallbackSiteInfo.email
  }

  Object.keys(siteInfo).forEach((key) => {
    delete siteInfo[key]
  })
  Object.assign(siteInfo, normalizedValue)
}

export const getFallbackItems = (contentType) => fallbackCollections[contentType] || []

export const loadPublishedContent = async () => {
  if (!isSupabaseConfigured || !supabase) {
    contentStatus.loaded = true
    contentStatus.source = 'static'
    return
  }

  contentStatus.loading = true
  contentStatus.error = ''

  const { data, error } = await supabase
    .from('content_entries')
    .select('content_type, entry_key, data, sort_order')
    .eq('status', 'published')
    .in('content_type', ['siteInfo', ...contentTypes])
    .order('sort_order', { ascending: true })
    .order('entry_key', { ascending: true })

  contentStatus.loading = false
  contentStatus.loaded = true

  if (error) {
    contentStatus.source = 'static'
    contentStatus.error = error.message
    return
  }

  const grouped = data.reduce((result, row) => {
    if (!result[row.content_type]) result[row.content_type] = []
    result[row.content_type].push(row)
    return result
  }, {})

  if (grouped.siteInfo?.[0]) {
    applySiteInfo(grouped.siteInfo[0].data)
  }

  contentTypes.forEach((type) => {
    if (grouped[type]?.length) {
      replaceArray(collectionTargets[type], grouped[type].map((row) => row.data))
    }
  })

  contentStatus.source = 'supabase'
}
