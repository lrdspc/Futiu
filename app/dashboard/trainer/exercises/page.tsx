"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Dumbbell, Filter } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { exerciseDatabase, type Exercise } from "@/lib/exercises"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function ExercisesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all")
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null)

  const filteredExercises = exerciseDatabase.filter((exercise) => {
    const matchesSearch =
      exercise.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exercise.muscleGroups.some((muscle) => muscle.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = categoryFilter === "all" || exercise.category === categoryFilter
    const matchesDifficulty = difficultyFilter === "all" || exercise.difficulty === difficultyFilter
    return matchesSearch && matchesCategory && matchesDifficulty
  })

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      peito: "bg-primary/10 text-primary",
      costas: "bg-accent/10 text-accent",
      pernas: "bg-secondary/10 text-secondary",
      ombros: "bg-chart-4/10 text-chart-4",
      bracos: "bg-chart-1/10 text-chart-1",
      abdomen: "bg-chart-2/10 text-chart-2",
      cardio: "bg-chart-3/10 text-chart-3",
    }
    return colors[category] || "bg-muted text-muted-foreground"
  }

  const getDifficultyColor = (difficulty: string) => {
    const colors: Record<string, string> = {
      iniciante: "bg-green-500/10 text-green-500",
      intermediario: "bg-yellow-500/10 text-yellow-500",
      avancado: "bg-red-500/10 text-red-500",
    }
    return colors[difficulty] || "bg-muted text-muted-foreground"
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black tracking-tight">Biblioteca de Exercícios</h2>
          <p className="text-muted-foreground">Explore e adicione exercícios aos seus treinos</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Exercício
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar exercícios por nome ou grupo muscular..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[180px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas Categorias</SelectItem>
              <SelectItem value="peito">Peito</SelectItem>
              <SelectItem value="costas">Costas</SelectItem>
              <SelectItem value="pernas">Pernas</SelectItem>
              <SelectItem value="ombros">Ombros</SelectItem>
              <SelectItem value="bracos">Braços</SelectItem>
              <SelectItem value="abdomen">Abdômen</SelectItem>
              <SelectItem value="cardio">Cardio</SelectItem>
            </SelectContent>
          </Select>
          <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Dificuldade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas Dificuldades</SelectItem>
              <SelectItem value="iniciante">Iniciante</SelectItem>
              <SelectItem value="intermediario">Intermediário</SelectItem>
              <SelectItem value="avancado">Avançado</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredExercises.map((exercise) => (
          <Dialog key={exercise.id}>
            <DialogTrigger asChild>
              <Card
                className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                onClick={() => setSelectedExercise(exercise)}
              >
                <CardHeader className="pb-3">
                  <div className="aspect-video rounded-lg overflow-hidden mb-3 bg-muted">
                    <img
                      src={exercise.imageUrl || "/placeholder.svg"}
                      alt={exercise.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <Badge className={getCategoryColor(exercise.category)}>
                      {exercise.category.charAt(0).toUpperCase() + exercise.category.slice(1)}
                    </Badge>
                    <Badge className={getDifficultyColor(exercise.difficulty)}>
                      {exercise.difficulty.charAt(0).toUpperCase() + exercise.difficulty.slice(1)}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg leading-tight">{exercise.name}</CardTitle>
                  <CardDescription className="text-sm line-clamp-2">{exercise.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-1">
                      {exercise.muscleGroups.slice(0, 2).map((muscle, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {muscle}
                        </Badge>
                      ))}
                      {exercise.muscleGroups.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{exercise.muscleGroups.length - 2}
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Dumbbell className="h-4 w-4" />
                      {exercise.equipment.join(", ")}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh]">
              <DialogHeader>
                <DialogTitle className="text-2xl font-black">{exercise.name}</DialogTitle>
                <DialogDescription>{exercise.description}</DialogDescription>
              </DialogHeader>
              <ScrollArea className="max-h-[60vh]">
                <div className="space-y-6 pr-4">
                  <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                    <img
                      src={exercise.imageUrl || "/placeholder.svg"}
                      alt={exercise.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex gap-2">
                    <Badge className={getCategoryColor(exercise.category)}>
                      {exercise.category.charAt(0).toUpperCase() + exercise.category.slice(1)}
                    </Badge>
                    <Badge className={getDifficultyColor(exercise.difficulty)}>
                      {exercise.difficulty.charAt(0).toUpperCase() + exercise.difficulty.slice(1)}
                    </Badge>
                  </div>

                  <div>
                    <h3 className="font-bold mb-2">Grupos Musculares</h3>
                    <div className="flex flex-wrap gap-2">
                      {exercise.muscleGroups.map((muscle, idx) => (
                        <Badge key={idx} variant="outline">
                          {muscle}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold mb-2">Equipamentos</h3>
                    <div className="flex flex-wrap gap-2">
                      {exercise.equipment.map((equip, idx) => (
                        <Badge key={idx} variant="secondary">
                          {equip}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold mb-2">Instruções</h3>
                    <ol className="space-y-2">
                      {exercise.instructions.map((instruction, idx) => (
                        <li key={idx} className="flex gap-3">
                          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-bold flex-shrink-0">
                            {idx + 1}
                          </span>
                          <span className="text-sm text-muted-foreground">{instruction}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  <Button className="w-full bg-primary hover:bg-primary/90">Adicionar ao Treino</Button>
                </div>
              </ScrollArea>
            </DialogContent>
          </Dialog>
        ))}
      </div>

      {filteredExercises.length === 0 && (
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Dumbbell className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-lg font-semibold mb-2">Nenhum exercício encontrado</p>
            <p className="text-sm text-muted-foreground">Tente ajustar seus filtros de busca</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
