"use server"

import { createClient } from "@/lib/supabase/server"

export async function getStudentFullProfile(studentId: string) {
  const supabase = await createClient()

  const { data: student } = await supabase
    .from("student_profiles")
    .select(`
      *,
      user:users!student_profiles_user_id_fkey(*)
    `)
    .eq("id", studentId)
    .single()

  if (!student) return null

  const { data: workouts } = await supabase
    .from("workout_sessions")
    .select("*")
    .eq("user_id", student.user_id)
    .not("completed_at", "is", null)

  const { data: lastAssessment } = await supabase
    .from("body_measurements")
    .select("*")
    .eq("user_id", student.user_id)
    .order("measured_at", { ascending: false })
    .limit(1)
    .single()

  return {
    ...student,
    stats: {
      workouts_completed: workouts?.length || 0,
      adherence_rate: 85,
      weight_change: lastAssessment ? 0 : 0,
      last_assessment: lastAssessment 
        ? new Date(lastAssessment.measured_at).toLocaleDateString()
        : "Nunca"
    }
  }
}

export async function getStudentWorkouts(studentId: string) {
  const supabase = await createClient()

  const { data: student } = await supabase
    .from("student_profiles")
    .select("user_id")
    .eq("id", studentId)
    .single()

  if (!student) return []

  const { data } = await supabase
    .from("workouts")
    .select(`
      *,
      workout_exercises(count)
    `)
    .eq("assigned_to", student.user_id)

  return data || []
}

export async function getStudentMeasurements(studentId: string) {
  const supabase = await createClient()

  const { data: student } = await supabase
    .from("student_profiles")
    .select("user_id")
    .eq("id", studentId)
    .single()

  if (!student) return []

  const { data } = await supabase
    .from("body_measurements")
    .select("*")
    .eq("user_id", student.user_id)
    .order("measured_at", { ascending: false })

  return data || []
}

export async function getStudentProgressPhotos(studentId: string) {
  const supabase = await createClient()

  const { data: student } = await supabase
    .from("student_profiles")
    .select("user_id")
    .eq("id", studentId)
    .single()

  if (!student) return []

  const { data } = await supabase
    .from("progress_photos")
    .select("*")
    .eq("user_id", student.user_id)
    .order("taken_at", { ascending: false })

  return data || []
}
