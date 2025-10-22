"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function getStudentWorkouts() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("Not authenticated")
  }

  const { data: workouts } = await supabase
    .from("workouts")
    .select(`
      *,
      workout_exercises(
        *,
        exercises(*)
      )
    `)
    .eq("assigned_to", user.id)
    .order("created_at", { ascending: false })

  return workouts || []
}

export async function getWorkoutById(workoutId: string) {
  const supabase = await createClient()

  const { data: workout } = await supabase
    .from("workouts")
    .select(`
      *,
      workout_exercises(
        *,
        exercises(*)
      )
    `)
    .eq("id", workoutId)
    .single()

  return workout
}

export async function getTrainerWorkouts() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("Not authenticated")
  }

  const { data: workouts } = await supabase
    .from("workouts")
    .select(`
      *,
      assigned_user:users!workouts_assigned_to_fkey(full_name, email),
      workout_exercises(count)
    `)
    .eq("created_by", user.id)
    .order("created_at", { ascending: false })

  return workouts || []
}

export async function createWorkout(data: {
  name: string
  description?: string
  assigned_to?: string
  workout_type?: string
  difficulty?: string
  estimated_duration_minutes?: number
  is_template?: boolean
  exercises: Array<{
    exercise_id: string
    order_index: number
    sets?: number
    reps?: string
    rest_seconds?: number
    notes?: string
  }>
}) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("Not authenticated")
  }

  const { exercises, ...workoutData } = data

  // Create workout
  const { data: workout, error: workoutError } = await supabase
    .from("workouts")
    .insert({
      ...workoutData,
      created_by: user.id,
    })
    .select()
    .single()

  if (workoutError) throw workoutError

  // Add exercises to workout
  if (exercises.length > 0) {
    const { error: exercisesError } = await supabase.from("workout_exercises").insert(
      exercises.map((ex) => ({
        workout_id: workout.id,
        ...ex,
      })),
    )

    if (exercisesError) throw exercisesError
  }

  revalidatePath("/dashboard/trainer/workouts")
  return workout
}
