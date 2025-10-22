"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function getTrainerStudents() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("Not authenticated")
  }

  // Get trainer profile
  const { data: trainerProfile } = await supabase.from("trainer_profiles").select("id").eq("user_id", user.id).single()

  if (!trainerProfile) {
    return []
  }

  // Get students assigned to this trainer
  const { data: students } = await supabase
    .from("student_profiles")
    .select(`
      *,
      user:users!student_profiles_user_id_fkey(
        id,
        email,
        full_name,
        avatar_url
      )
    `)
    .eq("trainer_id", trainerProfile.id)
    .order("created_at", { ascending: false })

  return students || []
}

export async function getStudentById(studentId: string) {
  const supabase = await createClient()

  const { data: student } = await supabase
    .from("student_profiles")
    .select(`
      *,
      user:users!student_profiles_user_id_fkey(
        id,
        email,
        full_name,
        avatar_url
      )
    `)
    .eq("id", studentId)
    .single()

  return student
}

export async function updateStudentProfile(
  studentId: string,
  data: {
    height_cm?: number
    current_weight_kg?: number
    goal_weight_kg?: number
    fitness_goal?: string
    activity_level?: string
    notes?: string
  },
) {
  const supabase = await createClient()

  const { error } = await supabase.from("student_profiles").update(data).eq("id", studentId)

  if (error) throw error

  revalidatePath("/dashboard/trainer/students")
  return { success: true }
}
