import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    "https://vlwyvlagsluxlfwyxnhy.supabase.co",
    "sb_publishable_naVvPJHb0Ufqj_-8y6MLkA_I_cE0sBt"
  )
}
