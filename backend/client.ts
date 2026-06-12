import { createClient } from '@supabase/supabase-js'

export function createSupabaseClient() {
  return createClient(
    "https://vlwyvlagsluxlfwyxnhy.supabase.co",
    process.env.SUPABASE_SECRET_KEY!
  )
}
