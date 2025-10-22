import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

/**
 * Creates a Supabase client for server-side components.
 *
 * This function initializes and returns a Supabase client that can be used in server-side
 * components. It reads the Supabase URL and anonymous key from the environment variables,
 * and uses the `cookies` from `next/headers` to manage the user's session.
 *
 * @returns {Promise<SupabaseClient>} A promise that resolves to an instance of the Supabase client.
 */
export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
        } catch {
          // The "setAll" method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
    },
  })
}
