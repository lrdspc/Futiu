"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2, GripVertical, Save, Search } from "lucide-react"
import { exerciseDatabase, type WorkoutExercise } from "@/lib/exercises"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function WorkoutBuilderPage() {
  const [workoutName, setWorkoutName] = useState("")
  const [workoutDescription, setWorkoutDescription] = useState("")
  const [workoutCategory, setWorkoutCategory] = useState("")
  const [selectedExercises, setSelectedExercises] = useState<WorkoutExercise[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddExerciseOpen, setIsAddExerciseOpen] = useState(false)

  const filteredExercises = exerciseDatabase.filter((exercise) =>
    exercise.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const addExercise = (exerciseId: string) => {
    const newExercise: WorkoutExercise = {
      exerciseId,
      sets: 3,
      reps: "10-12",
      rest: "60s",
      order: selectedExercises.length,
    }
    setSelectedExercises([...selectedExercises, newExercise])
    setIsAddExerciseOpen(false)
    setSearchQuery("")
  }

  const removeExercise = (index: number) => {
    const updatedExercises = selectedExercises
      .filter((_, i) => i !== index)
      .map((exercise, i) => ({ ...exercise, order: i }))
    setSelectedExercises(updatedExercises)
  }

  const updateExercise = (index: number, field: keyof WorkoutExercise, value: string | number) => {
    const updated = [...selectedExercises]
    updated[index] = { ...updated[index], [field]: value }
    setSelectedExercises(updated)
  }

  const getExerciseDetails = (exerciseId: string) => {
    return exerciseDatabase.find((ex) => ex.id === exerciseId)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black tracking-tight">Criar Novo Treino</h2>
          <p className="text-muted-foreground">Monte um treino personalizado para seus alunos</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Save className="h-4 w-4 mr-2" />
          Salvar Treino
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm lg:col-span-1">
          <CardHeader>
            <CardTitle>Informações do Treino</CardTitle>
            <CardDescription>Defina os detalhes básicos</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="workout-name">Nome do Treino</Label>
              <Input
                id="workout-name"
                placeholder="Ex: Treino A - Peito e Tríceps"
                value={workoutName}
                onChange={(e) => setWorkoutName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="workout-category">Categoria</Label>
              <Select value={workoutCategory} onValueChange={setWorkoutCategory}>
                <SelectTrigger id="workout-category">
                  <SelectValue placeholder="Selecione" />
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
              <Label htmlFor="workout-description">Descrição</Label>
              <Textarea
                id="workout-description"
                placeholder="Descreva o objetivo do treino..."
                rows={4}
                value={workoutDescription}
                onChange={(e) => setWorkoutDescription(e.target.value)}
              />
            </div>

            <div className="pt-4 border-t border-border/50">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total de Exercícios</span>
                  <span className="font-bold">{selectedExercises.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Duração Estimada</span>
                  <span className="font-bold">
                    {selectedExercises.length * 8}-{selectedExercises.length * 10} min
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Exercícios do Treino</CardTitle>
                <CardDescription>Adicione e organize os exercícios</CardDescription>
              </div>
              <Dialog open={isAddExerciseOpen} onOpenChange={setIsAddExerciseOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-primary hover:bg-primary/90">
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar Exercício
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl">
                  <DialogHeader>
                    <DialogTitle>Selecionar Exercício</DialogTitle>
                    <DialogDescription>Escolha um exercício da biblioteca</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Buscar exercícios..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <ScrollArea className="h-[400px]">
                      <div className="grid gap-3 pr-4">
                        {filteredExercises.map((exercise) => (
                          <button
                            key={exercise.id}
                            onClick={() => addExercise(exercise.id)}
                            className="flex items-center gap-4 p-4 rounded-lg border border-border/50 bg-card/50 hover:border-primary/50 hover:bg-muted/50 transition-all text-left"
                          >
                            <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                              <img
                                src={exercise.imageUrl || "/placeholder.svg"}
                                alt={exercise.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold mb-1">{exercise.name}</h3>
                              <p className="text-sm text-muted-foreground line-clamp-1">{exercise.description}</p>
                              <div className="flex gap-2 mt-2">
                                <Badge variant="outline" className="text-xs">
                                  {exercise.category}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  {exercise.difficulty}
                                </Badge>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            {selectedExercises.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Plus className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-lg font-semibold mb-2">Nenhum exercício adicionado</p>
                <p className="text-sm text-muted-foreground">Clique em "Adicionar Exercício" para começar</p>
              </div>
            ) : (
              <div className="space-y-4">
                {selectedExercises.map((workoutEx, index) => {
                  const exercise = getExerciseDetails(workoutEx.exerciseId)
                  if (!exercise) return null

                  return (
                    <Card key={index} className="border-border/50 bg-muted/30">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <div className="flex items-center gap-2">
                            <GripVertical className="h-5 w-5 text-muted-foreground cursor-move" />
                            <div
                              className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm"
                              data-testid="exercise-order"
                            >
                              {index + 1}
                            </div>
                          </div>

                          <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                            <img
                              src={exercise.imageUrl || "/placeholder.svg"}
                              alt={exercise.name}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          <div className="flex-1 space-y-3">
                            <div>
                              <h3 className="font-semibold">{exercise.name}</h3>
                              <p className="text-sm text-muted-foreground">{exercise.muscleGroups.join(", ")}</p>
                            </div>

                            <div className="grid grid-cols-3 gap-3">
                              <div className="space-y-1">
                                <Label className="text-xs">Séries</Label>
                                <Input
                                  type="number"
                                  value={workoutEx.sets}
                                  onChange={(e) => updateExercise(index, "sets", Number.parseInt(e.target.value))}
                                  className="h-8"
                                />
                              </div>
                              <div className="space-y-1">
                                <Label className="text-xs">Repetições</Label>
                                <Input
                                  value={workoutEx.reps}
                                  onChange={(e) => updateExercise(index, "reps", e.target.value)}
                                  placeholder="10-12"
                                  className="h-8"
                                />
                              </div>
                              <div className="space-y-1">
                                <Label className="text-xs">Descanso</Label>
                                <Input
                                  value={workoutEx.rest}
                                  onChange={(e) => updateExercise(index, "rest", e.target.value)}
                                  placeholder="60s"
                                  className="h-8"
                                />
                              </div>
                            </div>

                            <Input
                              placeholder="Observações (opcional)"
                              value={workoutEx.notes || ""}
                              onChange={(e) => updateExercise(index, "notes", e.target.value)}
                              className="h-8 text-sm"
                            />
                          </div>

                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => removeExercise(index)}
                            className="text-destructive hover:text-destructive"
                            title="Remove exercise"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
