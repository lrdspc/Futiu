"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Zap, Save, Plus, Minus } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"

interface WorkoutAdjustment {
  exerciseId: string
  sets?: number
  reps?: string
  rest?: string
  notes?: string
}

export function WorkoutRealtimeAdjust({ workoutId, studentId }: { workoutId: string; studentId: string }) {
  const [adjustments, setAdjustments] = useState<WorkoutAdjustment[]>([])
  const [selectedExercise, setSelectedExercise] = useState("")
  const [adjustmentNotes, setAdjustmentNotes] = useState("")

  const exercises = [
    { id: "ex-001", name: "Supino Reto", currentSets: 4, currentReps: "8-10", currentRest: "90s" },
    { id: "ex-002", name: "Supino Inclinado", currentSets: 3, currentReps: "10-12", currentRest: "60s" },
  ]

  const [tempAdjustment, setTempAdjustment] = useState<WorkoutAdjustment>({
    exerciseId: "",
    sets: undefined,
    reps: "",
    rest: "",
    notes: "",
  })

  const handleAdjust = (exerciseId: string, field: keyof WorkoutAdjustment, value: any) => {
    setTempAdjustment({ ...tempAdjustment, exerciseId, [field]: value })
  }

  const saveAdjustment = () => {
    if (!tempAdjustment.exerciseId) return
    
    const existing = adjustments.findIndex(a => a.exerciseId === tempAdjustment.exerciseId)
    if (existing >= 0) {
      const updated = [...adjustments]
      updated[existing] = tempAdjustment
      setAdjustments(updated)
    } else {
      setAdjustments([...adjustments, tempAdjustment])
    }

    // Send to backend/realtime
    console.log("Saving adjustment:", tempAdjustment)
    
    setTempAdjustment({ exerciseId: "", sets: undefined, reps: "", rest: "", notes: "" })
  }

  return (
    <Card className="border-2 border-accent/20 bg-gradient-to-br from-accent/10 to-transparent backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-accent" />
          Ajuste em Tempo Real
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Exercício</Label>
          <select
            className="w-full h-10 px-3 rounded-md border border-input bg-background"
            value={tempAdjustment.exerciseId}
            onChange={(e) => handleAdjust(e.target.value, "exerciseId", e.target.value)}
          >
            <option value="">Selecione um exercício</option>
            {exercises.map((ex) => (
              <option key={ex.id} value={ex.id}>
                {ex.name}
              </option>
            ))}
          </select>
        </div>

        {tempAdjustment.exerciseId && (
          <>
            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-2">
                <Label>Séries</Label>
                <div className="flex items-center gap-2">
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-8 w-8"
                    onClick={() => handleAdjust(tempAdjustment.exerciseId, "sets", (tempAdjustment.sets || 0) - 1)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Input
                    type="number"
                    value={tempAdjustment.sets || ""}
                    onChange={(e) => handleAdjust(tempAdjustment.exerciseId, "sets", Number(e.target.value))}
                    className="h-8 text-center"
                  />
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-8 w-8"
                    onClick={() => handleAdjust(tempAdjustment.exerciseId, "sets", (tempAdjustment.sets || 0) + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Repetições</Label>
                <Input
                  placeholder="10-12"
                  value={tempAdjustment.reps}
                  onChange={(e) => handleAdjust(tempAdjustment.exerciseId, "reps", e.target.value)}
                  className="h-8"
                />
              </div>

              <div className="space-y-2">
                <Label>Descanso</Label>
                <Input
                  placeholder="60s"
                  value={tempAdjustment.rest}
                  onChange={(e) => handleAdjust(tempAdjustment.exerciseId, "rest", e.target.value)}
                  className="h-8"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Observações</Label>
              <Textarea
                placeholder="Ex: Reduzir carga se sentir dor..."
                value={tempAdjustment.notes}
                onChange={(e) => handleAdjust(tempAdjustment.exerciseId, "notes", e.target.value)}
                rows={3}
              />
            </div>

            <Button onClick={saveAdjustment} className="w-full bg-accent hover:bg-accent/90">
              <Save className="h-4 w-4 mr-2" />
              Salvar Ajuste
            </Button>
          </>
        )}

        {adjustments.length > 0 && (
          <div className="space-y-2 pt-4 border-t border-border/50">
            <Label>Ajustes Salvos</Label>
            {adjustments.map((adj, idx) => {
              const exercise = exercises.find(e => e.id === adj.exerciseId)
              return (
                <div key={idx} className="p-3 rounded-lg bg-muted/30 space-y-1">
                  <p className="font-semibold">{exercise?.name}</p>
                  <div className="flex gap-2 text-sm">
                    {adj.sets && <Badge variant="outline">{adj.sets} séries</Badge>}
                    {adj.reps && <Badge variant="outline">{adj.reps} reps</Badge>}
                    {adj.rest && <Badge variant="outline">{adj.rest}</Badge>}
                  </div>
                  {adj.notes && <p className="text-xs text-muted-foreground">{adj.notes}</p>}
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
