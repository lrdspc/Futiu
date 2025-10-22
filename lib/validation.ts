import { z } from 'zod'

export const workoutSchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  description: z.string().optional(),
  category: z.enum(['hipertrofia', 'forca', 'cardio', 'funcional']),
  exercises: z.array(z.object({
    exerciseId: z.string(),
    sets: z.number().min(1).max(10),
    reps: z.string(),
    rest: z.string(),
    notes: z.string().optional(),
  })).min(1, 'Adicione pelo menos um exercício'),
})

export const progressSchema = z.object({
  weight_kg: z.number().positive().optional(),
  chest_cm: z.number().positive().optional(),
  waist_cm: z.number().positive().optional(),
  hip_cm: z.number().positive().optional(),
  arm_cm: z.number().positive().optional(),
  leg_cm: z.number().positive().optional(),
})

export const messageSchema = z.object({
  content: z.string().min(1, 'Mensagem não pode estar vazia'),
  recipientId: z.string().uuid(),
})

export type WorkoutInput = z.infer<typeof workoutSchema>
export type ProgressInput = z.infer<typeof progressSchema>
export type MessageInput = z.infer<typeof messageSchema>
