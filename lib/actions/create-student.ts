"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

interface CreateStudentData {
  email: string
  full_name: string
  date_of_birth?: string
  gender?: string
  height_cm?: number
  current_weight_kg?: number
  goal_weight_kg?: number
  fitness_goal?: string
  medical_notes?: string
}

interface CreateStudentResult {
  data?: { message: string; userId?: string }
  error?: { message: string }
}

/**
 * Server Action para criar um novo aluno
 * 
 * O Personal Trainer cria a conta do aluno e o Supabase envia
 * um email de convite para o aluno definir sua senha
 */
export async function createStudent(formData: CreateStudentData): Promise<CreateStudentResult> {
  try {
    const supabase = await createClient()

    // 1. Verificar se o usuário logado é um Personal Trainer
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return { error: { message: "Você precisa estar autenticado." } }
    }

    const { data: userData } = await supabase
      .from("users")
      .select("user_type")
      .eq("id", user.id)
      .single()

    if (userData?.user_type !== "personal") {
      return { error: { message: "Apenas Personal Trainers podem criar alunos." } }
    }

    // 2. Validar email único
    const { data: existingUser } = await supabase
      .from("users")
      .select("id")
      .eq("email", formData.email)
      .single()

    if (existingUser) {
      return { error: { message: "Este email já está cadastrado." } }
    }

    // 3. Criar usuário no Supabase Auth com inviteUserByEmail
    // Isso envia automaticamente um email para o aluno definir a senha
    const { data: authData, error: authError } = await supabase.auth.admin.inviteUserByEmail(
      formData.email,
      {
        data: {
          full_name: formData.full_name,
          user_type: "student",
        },
        redirectTo: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/auth/callback`,
      }
    )

    if (authError) {
      console.error("Erro ao criar usuário:", authError)
      return { error: { message: `Erro ao criar usuário: ${authError.message}` } }
    }

    if (!authData.user) {
      return { error: { message: "Erro ao criar usuário: dados não retornados." } }
    }

    const newUserId = authData.user.id

    // 4. O trigger do banco já cria o registro em users e student_profiles
    // Mas vamos atualizar o student_profile com os dados adicionais

    const { error: profileError } = await supabase
      .from("student_profiles")
      .update({
        personal_trainer_id: user.id,
        date_of_birth: formData.date_of_birth || null,
        gender: formData.gender || null,
        height_cm: formData.height_cm || null,
        current_weight_kg: formData.current_weight_kg || null,
        goal_weight_kg: formData.goal_weight_kg || null,
        fitness_goal: formData.fitness_goal || null,
        medical_notes: formData.medical_notes || null,
      })
      .eq("id", newUserId)

    if (profileError) {
      console.error("Erro ao atualizar perfil do aluno:", profileError)
      // Não retornar erro aqui, pois o usuário já foi criado
      // O perfil pode ser atualizado depois
    }

    // 5. Revalidar a rota para atualizar a lista de alunos
    revalidatePath("/dashboard/trainer/students")

    return {
      data: {
        message: "Aluno criado com sucesso! Um email de convite foi enviado.",
        userId: newUserId,
      },
    }
  } catch (err: any) {
    console.error("Erro geral ao criar aluno:", err)
    return {
      error: { message: `Ocorreu um erro ao criar o aluno: ${err.message}` },
    }
  }
}

