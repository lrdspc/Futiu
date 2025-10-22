"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Plus, Save } from "lucide-react"
import Link from "next/link"
import { ExerciseSelector } from "@/components/workout-builder/exercise-selector"
import { ExerciseListBuilder } from "@/components/workout-builder/exercise-list-builder"
import { createWorkout } from "@/lib/actions/workouts"
import { useToast } from "@/hooks/use-toast"

interface WorkoutExercise {
  exercise_id: string
  exercise_name: string
  order_index: number
  sets?: number
  reps?: string
  rest_seconds?: number
  notes?: string
}

export default function WorkoutBuilderPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  
  const [workoutData, setWorkoutData] = useState({
    name: "",
    description: "",
    workout_type: "hipertrofia",
    difficulty: "intermediario",
    estimated_duration_minutes: 60,
  })
  
  const [exercises, setExercises] = useState<WorkoutExercise[]>([])

  const handleAddExercise = (exercise: any) => {
    setExercises([...exercises, {
      exercise_id: exercise.id,
      exercise_name: exercise.name,
      order_index: exercises.length,
      sets: 3,
      reps: "10-12",
      rest_seconds: 60,
      notes: ""
    }])
  }

  const handleUpdateExercise = (index: number, updates: Partial<WorkoutExercise>) => {
    const updated = [...exercises]
    updated[index] = { ...updated[index], ...updates }
    setExercises(updated)
  }

  const handleRemoveExercise = (index: number) => {
    setExercises(exercises.filter((_, i) => i !== index))
  }

  const handleSave = async () => {
    if (!workoutData.name || exercises.length === 0) {
      toast({
        title: "Erro",
        description: "Preencha o nome e adicione pelo menos um exercício",
        variant: "destructive"
      })
      return
    }

    setLoading(true)
    try {
      await createWorkout({
        ...workoutData,
        exercises: exercises.map(({ exercise_id, order_index, sets, reps, rest_seconds, notes }) => ({
          exercise_id,
          order_index,
          sets,
          reps,
          rest_seconds,
          notes
        }))
      })
      
      toast({
        title: "Sucesso!",
        description: "Treino criado com sucesso"
      })
      
      router.push("/dashboard/trainer/workouts")
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao criar treino",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard/trainer/workouts">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h2 className="text-3xl font-black">Criar Novo Treino</h2>
            <p className="text-muted-foreground">Monte um treino personalizado</p>
          </div>
        </div>
        <Button onClick={handleSave} disabled={loading} className="bg-primary">
          <Save className="h-4 w-4 mr-2" />
          Salvar Treino
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informações Básicas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome do Treino *</Label>
                <Input
                  id="name"
                  placeholder="Ex: Treino A - Peito e Tríceps"
                  value={workoutData.name}
                  onChange={(e) => setWorkoutData({ ...workoutData, name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  placeholder="Descreva o objetivo do treino..."
                  value={workoutData.description}
                  onChange={(e) => setWorkoutData({ ...workoutData, description: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Tipo</Label>
                  <Select value={workoutData.workout_type} onValueChange={(v) => setWorkoutData({ ...workoutData, workout_type: v })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hipertrofia">Hipertrofia</SelectItem>
                      <SelectItem value="forca">Força</SelectItem>
                      <SelectItem value="cardio">Cardio</SelectItem>
                      <SelectItem value="funcional">Funcional</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Dificuldade</Label>
                  <Select value={workoutData.difficulty} onValueChange={(v) => setWorkoutData({ ...workoutData, difficulty: v })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="iniciante">Iniciante</SelectItem>
                      <SelectItem value="intermediario">Intermediário</SelectItem>
                      <SelectItem value="avancado">Avançado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Duração (min)</Label>
                  <Input
                    type="number"
                    value={workoutData.estimated_duration_minutes}
                    onChange={(e) => setWorkoutData({ ...workoutData, estimated_duration_minutes: parseInt(e.target.value) })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Exercícios ({exercises.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <ExerciseListBuilder
                exercises={exercises}
                onUpdate={handleUpdateExercise}
                onRemove={handleRemoveExercise}
              />
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <ExerciseSelector onSelect={handleAddExercise} />
        </div>
      </div>
    </div>
  )
}
