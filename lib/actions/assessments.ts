"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function createAssessment(studentId: string, data: any) {
  const supabase = await createClient()

  const { data: student } = await supabase
    .from("student_profiles")
    .select("user_id")
    .eq("id", studentId)
    .single()

  if (!student) throw new Error("Student not found")

  const { error } = await supabase
    .from("body_measurements")
    .insert({
      user_id: student.user_id,
      measured_at: new Date().toISOString(),
      ...data
    })

  if (error) throw error

  revalidatePath(`/dashboard/trainer/students/${studentId}`)
}

export async function getStudentAssessments(studentId: string) {
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
