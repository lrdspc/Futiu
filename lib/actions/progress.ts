"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function getStudentProgress(studentId: string) {
  const supabase = await createClient()

  // Get workout sessions
  const { data: sessions } = await supabase
    .from("workout_sessions")
    .select("*")
    .eq("user_id", studentId)
    .order("started_at", { ascending: false })
    .limit(30)

  // Get body measurements
  const { data: measurements } = await supabase
    .from("body_measurements")
    .select("*")
    .eq("user_id", studentId)
    .order("measured_at", { ascending: false })
    .limit(12)

  // Get progress photos
  const { data: photos } = await supabase
    .from("progress_photos")
    .select("*")
    .eq("user_id", studentId)
    .order("taken_at", { ascending: false })

  return {
    sessions: sessions || [],
    measurements: measurements || [],
    photos: photos || [],
  }
}

export async function addBodyMeasurement(data: {
  weight_kg?: number
  body_fat_percentage?: number
  chest_cm?: number
  waist_cm?: number
  hips_cm?: number
  bicep_left_cm?: number
  bicep_right_cm?: number
  thigh_left_cm?: number
  thigh_right_cm?: number
  notes?: string
}) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("Not authenticated")
  }

  const { error } = await supabase.from("body_measurements").insert({
    user_id: user.id,
    ...data,
  })

  if (error) throw error

  revalidatePath("/dashboard/student/progress")
  return { success: true }
}

export async function logWorkoutSession(data: {
  workout_id?: string
  started_at: string
  completed_at?: string
  duration_minutes?: number
  notes?: string
  rating?: number
}) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("Not authenticated")
  }

  const { data: session, error } = await supabase
    .from("workout_sessions")
    .insert({
      user_id: user.id,
      ...data,
    })
    .select()
    .single()

  if (error) throw error

  revalidatePath("/dashboard/student")
  return session
}

export async function logExercise(data: {
  session_id: string
  exercise_id: string
  set_number: number
  reps?: number
  weight_kg?: number
  duration_seconds?: number
  notes?: string
}) {
  const supabase = await createClient()

  const { error } = await supabase.from("exercise_logs").insert(data)

  if (error) throw error

  return { success: true }
}

export async function getTrainerStudentsProgress() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("Not authenticated")
  }

  // Get all students for this trainer
  const { data: students } = await supabase
    .from("student_profiles")
    .select(`
      id,
      users!inner(id, full_name, email, avatar_url)
    `)
    .eq("personal_trainer_id", user.id)

  if (!students) return []

  // Get recent workout sessions for each student
  const studentsWithProgress = await Promise.all(
    students.map(async (student) => {
      const { data: sessions } = await supabase
        .from("workout_sessions")
        .select("*")
        .eq("user_id", student.id)
        .order("started_at", { ascending: false })
        .limit(10)

      const { data: measurements } = await supabase
        .from("body_measurements")
        .select("*")
        .eq("user_id", student.id)
        .order("measured_at", { ascending: false })
        .limit(2)

      return {
        ...student,
        recentSessions: sessions || [],
        recentMeasurements: measurements || [],
      }
    }),
  )

  return studentsWithProgress
}
