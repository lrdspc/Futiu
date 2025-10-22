"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function startWorkoutSession(workoutId: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) throw new Error("Not authenticated")

  const { data, error } = await supabase
    .from("workout_sessions")
    .insert({
      user_id: user.id,
      workout_id: workoutId,
      started_at: new Date().toISOString()
    })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateExerciseLog(
  sessionId: string,
  exerciseId: string,
  setData: { set_number: number; weight_kg?: number; reps?: number }
) {
  const supabase = await createClient()

  const { error } = await supabase
    .from("exercise_logs")
    .upsert({
      session_id: sessionId,
      exercise_id: exerciseId,
      ...setData
    })

  if (error) throw error
}

export async function completeWorkoutSession(
  sessionId: string,
  feedback: { rating: number; notes: string; duration_minutes: number }
) {
  const supabase = await createClient()

  const { error } = await supabase
    .from("workout_sessions")
    .update({
      completed_at: new Date().toISOString(),
      duration_minutes: feedback.duration_minutes,
      rating: feedback.rating,
      notes: feedback.notes
    })
    .eq("id", sessionId)

  if (error) throw error

  revalidatePath("/dashboard/student")
  revalidatePath("/dashboard/student/workouts")
}

export async function getWorkoutSessionHistory(workoutId: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) throw new Error("Not authenticated")

  const { data } = await supabase
    .from("workout_sessions")
    .select("*")
    .eq("workout_id", workoutId)
    .eq("user_id", user.id)
    .order("started_at", { ascending: false })

  return data || []
}
