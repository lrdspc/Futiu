"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ExerciseCardFullscreen } from "./exercise-card-fullscreen"
import { WorkoutCompletionScreen } from "./workout-completion-screen"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { startWorkoutSession, completeWorkoutSession } from "@/lib/actions/workout-sessions"

interface WorkoutExecutionProps {
  workout: any
}

export function WorkoutExecution({ workout }: WorkoutExecutionProps) {
  const router = useRouter()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [completed, setCompleted] = useState(false)
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [startTime] = useState(Date.now())

  const exercises = workout.workout_exercises || []
  const currentExercise = exercises[currentIndex]
  const progress = ((currentIndex + 1) / exercises.length) * 100

  const handleStart = async () => {
    const session = await startWorkoutSession(workout.id)
    setSessionId(session.id)
  }

  const handleNext = () => {
    if (currentIndex < exercises.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      setCompleted(true)
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const handleComplete = async (feedback: any) => {
    if (sessionId) {
      const duration = Math.floor((Date.now() - startTime) / 60000)
      await completeWorkoutSession(sessionId, { ...feedback, duration_minutes: duration })
    }
    router.push("/dashboard/student")
  }

  const handleExit = () => {
    if (confirm("Tem certeza que deseja sair? Seu progresso será perdido.")) {
      router.back()
    }
  }

  if (!sessionId) {
    return (
      <div className="fixed inset-0 bg-background flex items-center justify-center z-50">
        <div className="text-center space-y-6 max-w-md px-4">
          <div>
            <h1 className="text-4xl font-black mb-2">{workout.name}</h1>
            <p className="text-muted-foreground">{exercises.length} exercícios</p>
          </div>
          <Button onClick={handleStart} size="lg" className="w-full bg-accent hover:bg-accent/90">
            Iniciar Treino
          </Button>
          <Button onClick={() => router.back()} variant="ghost" className="w-full">
            Voltar
          </Button>
        </div>
      </div>
    )
  }

  if (completed) {
    return <WorkoutCompletionScreen onComplete={handleComplete} />
  }

  return (
    <div className="fixed inset-0 bg-background z-50 flex flex-col">
      <div className="p-4 border-b border-border/50 flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground">
            Exercício {currentIndex + 1} de {exercises.length}
          </p>
          <Progress value={progress} className="h-2 mt-2" />
        </div>
        <Button variant="ghost" size="icon" onClick={handleExit}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex-1 overflow-auto">
        <ExerciseCardFullscreen
          exercise={currentExercise}
          onNext={handleNext}
          onPrevious={handlePrevious}
          isFirst={currentIndex === 0}
          isLast={currentIndex === exercises.length - 1}
          sessionId={sessionId}
        />
      </div>
    </div>
  )
}
