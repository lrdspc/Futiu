import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"

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
