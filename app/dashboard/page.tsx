import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"

/**
 * The main dashboard page.
 *
 * This page acts as a router, redirecting users to their respective dashboards
 * (student or personal trainer) based on their user type. If the user is not
 * authenticated, they are redirected to the login page.
 *
 * @returns {Promise<null>} This function does not return a component, it redirects.
 */
export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: userData } = await supabase.from("users").select("user_type").eq("id", user.id).single()

  if (!userData) {
    redirect("/auth/login")
  }

  if (userData.user_type === "personal") {
    redirect("/dashboard/trainer")
  } else {
    redirect("/dashboard/student")
  }
}
