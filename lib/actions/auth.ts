"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath("/", "layout")
  redirect("/")
}

export async function getCurrentUser() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return null

  // Get user data from database
  const { data: userData } = await supabase.from("users").select("*").eq("id", user.id).single()

  return userData
}

export async function updateUserProfile(data: { full_name?: string; avatar_url?: string }) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("Not authenticated")
  }

  // Update auth metadata
  const { error: authError } = await supabase.auth.updateUser({
    data,
  })

  if (authError) throw authError

  // Update users table
  const { error: dbError } = await supabase.from("users").update(data).eq("id", user.id)

  if (dbError) throw dbError

  revalidatePath("/dashboard")
  return { success: true }
}

export async function updateStudentProfile(data: {
  height_cm?: number
  date_of_birth?: string
  gender?: string
  fitness_goal?: string
  medical_notes?: string
  current_weight_kg?: number
  goal_weight_kg?: number
}) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("Not authenticated")
  }

  const { error } = await supabase.from("student_profiles").update(data).eq("id", user.id)

  if (error) throw error

  revalidatePath("/dashboard/student/settings")
  return { success: true }
}

export async function updatePersonalProfile(data: {
  bio?: string
  specialization?: string
  years_experience?: number
  certifications?: string[]
  phone?: string
}) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("Not authenticated")
  }

  const { error } = await supabase.from("personal_profiles").update(data).eq("id", user.id)

  if (error) throw error

  revalidatePath("/dashboard/trainer/settings")
  return { success: true }
}
