import { createBrowserClient } from "@supabase/ssr"

/**
 * Creates a Supabase client for the browser.
 *
 * This function initializes and returns a Supabase client that can be used in client-side
 * components. It reads the Supabase URL and anonymous key from the environment variables.
 *
 * @returns {SupabaseClient} An instance of the Supabase client.
 */
export function createClient() {
  return createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
}
