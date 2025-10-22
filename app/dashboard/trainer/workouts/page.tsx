"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Dumbbell, Clock, Users, Copy, Edit, Trash2 } from "lucide-react"
import Link from "next/link"

interface Workout {
  id: string
  name: string
  description: string
  category: string
  exercises: number
  duration: string
  assignedTo: number
  createdAt: string
}

export default function WorkoutsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [workouts] = useState<Workout[]>([
    {
      id: "1",
      name: "Treino A - Peito e Tríceps",
      description: "Foco em desenvolvimento de força e hipertrofia do peitoral e tríceps",
      category: "Hipertrofia",
      exercises: 8,
      duration: "60-75 min",
      assignedTo: 12,
      createdAt: "2025-01-15",
    },
    {
      id: "2",
      name: "Treino B - Costas e Bíceps",
      description: "Trabalho completo de costas com ênfase em largura e espessura",
      category: "Hipertrofia",
      exercises: 9,
      duration: "65-80 min",
      assignedTo: 12,
      createdAt: "2025-01-15",
    },
    {
      id: "3",
      name: "Treino C - Pernas",
      description: "Treino intenso de membros inferiores com foco em quadríceps e posterior",
      category: "Hipertrofia",
      exercises: 10,
      duration: "70-85 min",
      assignedTo: 12,
      createdAt: "2025-01-15",
    },
    {
      id: "4",
      name: "Treino D - Ombros e Abdômen",
      description: "Desenvolvimento de ombros e core com exercícios compostos",
      category: "Hipertrofia",
      exercises: 7,
      duration: "55-70 min",
      assignedTo: 8,
      createdAt: "2025-01-20",
    },
    {
      id: "5",
      name: "HIIT Cardio",
      description: "Treino intervalado de alta intensidade para queima de gordura",
      category: "Cardio",
      exercises: 6,
      duration: "30-40 min",
      assignedTo: 15,
      createdAt: "2025-01-22",
    },
  ])

  const filteredWorkouts = workouts.filter(
    (workout) =>
      workout.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      workout.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "hipertrofia":
        return "bg-primary/10 text-primary"
      case "cardio":
        return "bg-accent/10 text-accent"
      case "força":
        return "bg-secondary/10 text-secondary"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black tracking-tight">Treinos</h2>
          <p className="text-muted-foreground">Crie e gerencie treinos para seus alunos</p>
        </div>
        <Button asChild className="bg-primary hover:bg-primary/90">
          <Link href="/dashboard/trainer/workouts/builder">
            <Plus className="h-4 w-4 mr-2" />
            Criar Treino
          </Link>
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar treinos por nome ou categoria..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredWorkouts.map((workout) => (
          <Card
            key={workout.id}
            className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 hover:scale-[1.02]"
          >
            <CardHeader>
              <div className="flex items-start justify-between mb-2">
                <Badge className={getCategoryColor(workout.category)}>{workout.category}</Badge>
                <div className="flex gap-1">
                  <Button size="icon" variant="ghost" className="h-8 w-8">
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost" className="h-8 w-8">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardTitle className="text-lg leading-tight">{workout.name}</CardTitle>
              <CardDescription className="text-sm line-clamp-2">{workout.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <Dumbbell className="h-4 w-4 text-muted-foreground" />
                  <span className="font-semibold">{workout.exercises}</span>
                  <span className="text-muted-foreground">exercícios</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="font-semibold">{workout.duration}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm pt-4 border-t border-border/50">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Atribuído a</span>
                <span className="font-semibold text-primary">{workout.assignedTo} alunos</span>
              </div>

              <Button className="w-full bg-transparent" variant="outline">
                Ver Detalhes
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredWorkouts.length === 0 && (
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Dumbbell className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-lg font-semibold mb-2">Nenhum treino encontrado</p>
            <p className="text-sm text-muted-foreground">Tente ajustar sua busca</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
