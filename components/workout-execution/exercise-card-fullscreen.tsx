"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, MessageSquare } from "lucide-react"
import { RestTimer } from "./rest-timer"
import { updateExerciseLog } from "@/lib/actions/workout-sessions"

interface ExerciseCardFullscreenProps {
  exercise: any
  onNext: () => void
  onPrevious: () => void
  isFirst: boolean
  isLast: boolean
  sessionId: string
}

export function ExerciseCardFullscreen({
  exercise,
  onNext,
  onPrevious,
  isFirst,
  isLast,
  sessionId
}: ExerciseCardFullscreenProps) {
  const [sets, setSets] = useState<Array<{ completed: boolean; weight?: number; reps?: number }>>([])
  const [showTimer, setShowTimer] = useState(false)

  const exerciseData = exercise.exercises
  const totalSets = exercise.sets || 3

  if (sets.length === 0) {
    setSets(Array(totalSets).fill({ completed: false }))
  }

  const handleSetComplete = async (index: number) => {
    const updated = [...sets]
    updated[index] = { ...updated[index], completed: !updated[index].completed }
    setSets(updated)

    if (!updated[index].completed && index < totalSets - 1) {
      setShowTimer(true)
    }

    await updateExerciseLog(sessionId, exercise.exercise_id, {
      set_number: index + 1,
      weight_kg: updated[index].weight,
      reps: updated[index].reps
    })
  }

  const handleWeightChange = (index: number, weight: number) => {
    const updated = [...sets]
    updated[index] = { ...updated[index], weight }
    setSets(updated)
  }

  const handleRepsChange = (index: number, reps: number) => {
    const updated = [...sets]
    updated[index] = { ...updated[index], reps }
    setSets(updated)
  }

  const allSetsCompleted = sets.every(s => s.completed)

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="aspect-video rounded-lg overflow-hidden bg-muted">
        <img
          src={exerciseData?.image_url || "/placeholder.svg"}
          alt={exerciseData?.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="space-y-2">
        <h2 className="text-3xl font-black">{exerciseData?.name}</h2>
        <div className="flex flex-wrap gap-2">
          {exerciseData?.muscleGroups?.map((muscle: string, idx: number) => (
            <Badge key={idx} variant="outline">{muscle}</Badge>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 p-4 rounded-lg bg-muted/30">
        <div className="text-center">
          <p className="text-sm text-muted-foreground">Séries</p>
          <p className="text-2xl font-black">{exercise.sets}</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-muted-foreground">Repetições</p>
          <p className="text-2xl font-black">{exercise.reps}</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-muted-foreground">Descanso</p>
          <p className="text-2xl font-black">{exercise.rest_seconds}s</p>
        </div>
      </div>

      {exercise.notes && (
        <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
          <p className="text-sm font-semibold text-accent mb-1">💡 Dica</p>
          <p className="text-sm">{exercise.notes}</p>
        </div>
      )}

      <div className="space-y-3">
        <h3 className="font-bold">Registrar Séries</h3>
        {sets.map((set, index) => (
          <div key={index} className="flex items-center gap-3 p-3 rounded-lg border border-border/50">
            <Checkbox
              checked={set.completed}
              onCheckedChange={() => handleSetComplete(index)}
            />
            <span className="font-semibold min-w-[80px]">Série {index + 1}</span>
            <Input
              type="number"
              placeholder="Carga (kg)"
              value={set.weight || ""}
              onChange={(e) => handleWeightChange(index, parseFloat(e.target.value))}
              className="w-24"
            />
            <Input
              type="number"
              placeholder="Reps"
              value={set.reps || ""}
              onChange={(e) => handleRepsChange(index, parseInt(e.target.value))}
              className="w-20"
            />
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <Button
          variant="outline"
          onClick={onPrevious}
          disabled={isFirst}
          className="flex-1"
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Anterior
        </Button>
        <Button
          onClick={onNext}
          disabled={!allSetsCompleted}
          className="flex-1 bg-accent hover:bg-accent/90"
        >
          {isLast ? "Finalizar" : "Próximo"}
          {!isLast && <ChevronRight className="h-4 w-4 ml-2" />}
        </Button>
      </div>

      <Button variant="outline" className="w-full">
        <MessageSquare className="h-4 w-4 mr-2" />
        Tirar Dúvida com Personal
      </Button>

      {showTimer && (
        <RestTimer
          seconds={exercise.rest_seconds || 60}
          onComplete={() => setShowTimer(false)}
          onSkip={() => setShowTimer(false)}
        />
      )}
    </div>
  )
}
