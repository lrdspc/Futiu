import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

/**
 * Handles the GET request for the authentication callback.
 *
 * This function is responsible for exchanging the authorization code for a session
 * with Supabase. After a successful exchange, it redirects the user to the dashboard.
 *
 * @param {Request} request - The incoming request object.
 * @returns {Promise<NextResponse>} A promise that resolves to a Next.js response object.
 */
export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")
  const origin = requestUrl.origin

  if (code) {
    const supabase = await createClient()
    await supabase.auth.exchangeCodeForSession(code)
  }

  // Redirect to dashboard after successful authentication
  return NextResponse.redirect(`${origin}/dashboard`)
}
