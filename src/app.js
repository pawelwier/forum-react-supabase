import { createClient } from '@supabase/supabase-js'
import { createContext } from 'react'

const supabase = createClient(
  import.meta.env.VITE_PROJECT_URL,
  import.meta.env.VITE_ANON_KEY
)

export const SupabaseContext = createContext(supabase)
