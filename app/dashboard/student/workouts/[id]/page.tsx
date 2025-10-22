"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Play, CheckCircle2, Clock, Dumbbell } from "lucide-react"
import { useNotifications } from "@/hooks/use-notifications"
import { offlineSyncService } from "@/lib/offline-sync"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { exerciseDatabase } from "@/lib/exercises"

interface ExerciseSet {
  completed: boolean
  weight?: string
  reps?: string
}

interface WorkoutExerciseState {
  exerciseId: string
  sets: ExerciseSet[]
  notes: string
}

export default function WorkoutDetailPage() {
  const [isStarted, setIsStarted] = useState(false)
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0)
  const { notifyWorkoutCompleted, notifyAchievementUnlocked } = useNotifications()
  const { toast } = useToast()

  const workout = {
    id: "1",
    name: "Treino A - Peito e Tríceps",
    description: "Foco em desenvolvimento de força e hipertrofia do peitoral e tríceps",
    exercises: [
      { exerciseId: "ex-001", sets: 4, reps: "8-10", rest: "90s" },
      { exerciseId: "ex-002", sets: 3, reps: "10-12", rest: "60s" },
      { exerciseId: "ex-003", sets: 3, reps: "12-15", rest: "60s" },
      { exerciseId: "ex-012", sets: 3, reps: "10-12", rest: "60s" },
    ],
  }

  const [exerciseStates, setExerciseStates] = useState<WorkoutExerciseState[]>(
    workout.exercises.map((ex) => ({
      exerciseId: ex.exerciseId,
      sets: Array(ex.sets).fill({ completed: false, weight: "", reps: "" }),
      notes: "",
    })),
  )

  const currentExercise = workout.exercises[currentExerciseIndex]
  const exerciseDetails = exerciseDatabase.find((ex) => ex.id === currentExercise?.exerciseId)
  const currentState = exerciseStates[currentExerciseIndex]

  const completedSets = currentState?.sets.filter((s) => s.completed).length || 0
  const totalSets = currentExercise?.sets || 0
  const progressPercentage = (completedSets / totalSets) * 100

  const toggleSetComplete = (setIndex: number) => {
    const newStates = [...exerciseStates]
    newStates[currentExerciseIndex].sets[setIndex] = {
      ...newStates[currentExerciseIndex].sets[setIndex],
      completed: !newStates[currentExerciseIndex].sets[setIndex].completed,
    }
    setExerciseStates(newStates)
  }

  const updateSetData = (setIndex: number, field: "weight" | "reps", value: string) => {
    const newStates = [...exerciseStates]
    newStates[currentExerciseIndex].sets[setIndex] = {
      ...newStates[currentExerciseIndex].sets[setIndex],
      [field]: value,
    }
    setExerciseStates(newStates)
  }

  const goToNextExercise = () => {
    if (currentExerciseIndex < workout.exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1)
    }
  }

  const goToPreviousExercise = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex(currentExerciseIndex - 1)
    }
  }

  if (!isStarted) {
    return (
      <div className="space-y-6">
        <Button asChild variant="ghost">
          <Link href="/dashboard/student/workouts">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Link>
        </Button>

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-3xl font-black">{workout.name}</CardTitle>
            <CardDescription className="text-base">{workout.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/30">
                <Dumbbell className="h-8 w-8 text-accent" />
                <div>
                  <p className="text-2xl font-black">{workout.exercises.length}</p>
                  <p className="text-sm text-muted-foreground">Exercícios</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/30">
                <Clock className="h-8 w-8 text-accent" />
                <div>
                  <p className="text-2xl font-black">60-75</p>
                  <p className="text-sm text-muted-foreground">Minutos</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/30">
                <CheckCircle2 className="h-8 w-8 text-accent" />
                <div>
                  <p className="text-2xl font-black">{workout.exercises.reduce((acc, ex) => acc + ex.sets, 0)}</p>
                  <p className="text-sm text-muted-foreground">Séries Totais</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-black">Exercícios</h3>
              {workout.exercises.map((ex, index) => {
                const details = exerciseDatabase.find((e) => e.id === ex.exerciseId)
                return (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-accent/10 text-accent font-bold">
                      {index + 1}
                    </div>
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                      <img
                        src={details?.imageUrl || "/placeholder.svg"}
                        alt={details?.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold">{details?.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {ex.sets} séries × {ex.reps} reps • {ex.rest} descanso
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>

            <Button
              onClick={() => setIsStarted(true)}
              className="w-full h-14 text-lg font-bold bg-accent hover:bg-accent/90"
            >
              <Play className="h-5 w-5 mr-2" />
              Iniciar Treino
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => setIsStarted(false)}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Sair do Treino
        </Button>
        <Badge variant="outline" className="text-base px-4 py-2">
          Exercício {currentExerciseIndex + 1} de {workout.exercises.length}
        </Badge>
      </div>

      <Card className="border-2 border-accent/20 bg-gradient-to-br from-accent/10 to-transparent backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <CardTitle className="text-2xl font-black mb-2">{exerciseDetails?.name}</CardTitle>
              <CardDescription className="text-base">{exerciseDetails?.description}</CardDescription>
            </div>
            <div className="w-24 h-24 rounded-lg overflow-hidden bg-muted flex-shrink-0 ml-4">
              <img
                src={exerciseDetails?.imageUrl || "/placeholder.svg"}
                alt={exerciseDetails?.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Progresso</span>
              <span className="font-bold text-accent">
                {completedSets}/{totalSets} séries
              </span>
            </div>
            <Progress value={progressPercentage} className="h-3" />
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 rounded-lg bg-muted/30">
              <p className="text-sm text-muted-foreground mb-1">Repetições</p>
              <p className="text-2xl font-black">{currentExercise.reps}</p>
            </div>
            <div className="p-4 rounded-lg bg-muted/30">
              <p className="text-sm text-muted-foreground mb-1">Descanso</p>
              <p className="text-2xl font-black">{currentExercise.rest}</p>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-bold text-lg">Séries</h3>
            {currentState?.sets.map((set, index) => (
              <Card key={index} className={`border-border/50 ${set.completed ? "bg-accent/5" : "bg-card/50"}`}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <Checkbox
                      checked={set.completed}
                      onCheckedChange={() => toggleSetComplete(index)}
                      className="h-6 w-6"
                    />
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-accent/10 text-accent font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1 grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <Label className="text-xs">Carga (kg)</Label>
                        <Input
                          type="number"
                          placeholder="0"
                          value={set.weight}
                          onChange={(e) => updateSetData(index, "weight", e.target.value)}
                          className="h-9"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Repetições</Label>
                        <Input
                          type="number"
                          placeholder="0"
                          value={set.reps}
                          onChange={(e) => updateSetData(index, "reps", e.target.value)}
                          className="h-9"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={goToPreviousExercise}
              disabled={currentExerciseIndex === 0}
              className="flex-1 bg-transparent"
            >
              Anterior
            </Button>
            {currentExerciseIndex === workout.exercises.length - 1 ? (
              <Button 
                className="flex-1 bg-accent hover:bg-accent/90"
                onClick={async () => {
                  // Save workout completion
                  await offlineSyncService.saveWorkoutOffline({
                    workoutId: workout.id,
                    completedAt: new Date().toISOString(),
                    exercises: exerciseStates,
                  })
                  
                  // Show success message
                  toast({
                    title: "🎉 Treino Concluído!",
                    description: "Parabéns! Você completou o treino com sucesso.",
                  })
                  
                  // Send notification
                  await notifyWorkoutCompleted(workout.name)
                  
                  // Check for achievements
                  const totalWorkouts = 10 // Mock - get from backend
                  if (totalWorkouts === 10) {
                    await notifyAchievementUnlocked("10 Treinos Completados")
                  }
                  
                  // Redirect after 2 seconds
                  setTimeout(() => {
                    window.location.href = "/dashboard/student/workouts"
                  }, 2000)
                }}
              >
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Finalizar Treino
              </Button>
            ) : (
              <Button onClick={goToNextExercise} className="flex-1 bg-accent hover:bg-accent/90">
                Próximo Exercício
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {exerciseDetails && (
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Instruções</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-3">
              {exerciseDetails.instructions.map((instruction, idx) => (
                <li key={idx} className="flex gap-3">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-accent/10 text-accent text-sm font-bold flex-shrink-0">
                    {idx + 1}
                  </span>
                  <span className="text-sm text-muted-foreground">{instruction}</span>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
