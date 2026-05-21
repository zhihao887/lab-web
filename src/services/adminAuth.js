import { adminEmail, isAllowedAdmin, isSupabaseConfigured, supabase } from './supabaseClient'

export const getCurrentAdmin = async () => {
  if (!isSupabaseConfigured || !supabase) return null

  const { data } = await supabase.auth.getUser()
  return isAllowedAdmin(data.user) ? data.user : null
}

export const signInAdmin = async ({ email, password }) => {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error('Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY first.')
  }

  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw error
  if (!isAllowedAdmin(data.user)) {
    await supabase.auth.signOut()
    throw new Error(`Only ${adminEmail || 'the configured admin email'} can access this admin area.`)
  }

  return data.user
}

export const signOutAdmin = async () => {
  if (!supabase) return
  await supabase.auth.signOut()
}
