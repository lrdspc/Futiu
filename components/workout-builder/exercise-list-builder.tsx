"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Trash2, GripVertical } from "lucide-react"

interface WorkoutExercise {
  exercise_id: string
  exercise_name: string
  order_index: number
  sets?: number
  reps?: string
  rest_seconds?: number
  notes?: string
}

interface ExerciseListBuilderProps {
  exercises: WorkoutExercise[]
  onUpdate: (index: number, updates: Partial<WorkoutExercise>) => void
  onRemove: (index: number) => void
}

export function ExerciseListBuilder({ exercises, onUpdate, onRemove }: ExerciseListBuilderProps) {
  if (exercises.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p>Nenhum exercício adicionado</p>
        <p className="text-sm mt-1">Selecione exercícios da lista ao lado</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {exercises.map((exercise, index) => (
        <div key={index} className="p-4 rounded-lg border border-border/50 space-y-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2 flex-1">
              <GripVertical className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-semibold">{exercise.exercise_name}</p>
                <p className="text-xs text-muted-foreground">Exercício {index + 1}</p>
              </div>
            </div>
            <Button
              size="sm"
              variant="ghost"
              className="text-destructive"
              onClick={() => onRemove(index)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1">
              <Label className="text-xs">Séries</Label>
              <Input
                type="number"
                value={exercise.sets || ""}
                onChange={(e) => onUpdate(index, { sets: parseInt(e.target.value) })}
                placeholder="3"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Repetições</Label>
              <Input
                value={exercise.reps || ""}
                onChange={(e) => onUpdate(index, { reps: e.target.value })}
                placeholder="10-12"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Descanso (s)</Label>
              <Input
                type="number"
                value={exercise.rest_seconds || ""}
                onChange={(e) => onUpdate(index, { rest_seconds: parseInt(e.target.value) })}
                placeholder="60"
              />
            </div>
          </div>

          <div className="space-y-1">
            <Label className="text-xs">Observações</Label>
            <Textarea
              value={exercise.notes || ""}
              onChange={(e) => onUpdate(index, { notes: e.target.value })}
              placeholder="Dicas ou observações específicas..."
              rows={2}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
