import { createClient } from '@supabase/supabase-js'

export const adminBasePath = '/manage-lab-2026'
export const adminEmail = (import.meta.env.VITE_ADMIN_EMAIL || '').trim().toLowerCase()

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
      },
    })
  : null

export const isAllowedAdmin = (user) => {
  if (!adminEmail || !user?.email) return false
  return user.email.toLowerCase() === adminEmail
}
