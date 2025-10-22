"use server"

import { createClient } from "@/lib/supabase/server"

export async function getAllExercises() {
  const supabase = await createClient()

  const { data: exercises } = await supabase.from("exercises").select("*").eq("is_public", true).order("name")

  return exercises || []
}

export async function getExercisesByMuscleGroup(muscleGroup: string) {
  const supabase = await createClient()

  const { data: exercises } = await supabase
    .from("exercises")
    .select("*")
    .eq("muscle_group", muscleGroup)
    .eq("is_public", true)
    .order("name")

  return exercises || []
}
