"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Calendar, CheckCircle2, Play } from "lucide-react"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Workout {
  id: string
  name: string
  day: string
  exercises: number
  duration: string
  completed: boolean
  lastCompleted?: string
}

export default function StudentWorkoutsPage() {
  const workouts: Workout[] = [
    {
      id: "1",
      name: "Treino A - Peito e Tríceps",
      day: "Segunda-feira",
      exercises: 8,
      duration: "60-75 min",
      completed: false,
      lastCompleted: "Há 3 dias",
    },
    {
      id: "2",
      name: "Treino B - Costas e Bíceps",
      day: "Terça-feira",
      exercises: 9,
      duration: "65-80 min",
      completed: true,
      lastCompleted: "Ontem",
    },
    {
      id: "3",
      name: "Treino C - Pernas",
      day: "Quinta-feira",
      exercises: 10,
      duration: "70-85 min",
      completed: false,
      lastCompleted: "Há 5 dias",
    },
    {
      id: "4",
      name: "Treino D - Ombros e Abdômen",
      day: "Sexta-feira",
      exercises: 7,
      duration: "55-70 min",
      completed: false,
      lastCompleted: "Há 6 dias",
    },
    {
      id: "5",
      name: "HIIT Cardio",
      day: "Sábado",
      exercises: 6,
      duration: "30-40 min",
      completed: false,
      lastCompleted: "Há 7 dias",
    },
  ]

  const activeWorkouts = workouts.filter((w) => !w.completed)
  const completedWorkouts = workouts.filter((w) => w.completed)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-black tracking-tight">Meus Treinos</h2>
        <p className="text-muted-foreground">Acesse seus treinos e acompanhe seu progresso</p>
      </div>

      <Tabs defaultValue="active" className="space-y-6">
        <TabsList>
          <TabsTrigger value="active">Ativos ({activeWorkouts.length})</TabsTrigger>
          <TabsTrigger value="completed">Concluídos ({completedWorkouts.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            {activeWorkouts.map((workout) => (
              <Card
                key={workout.id}
                className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-accent/50 transition-all duration-300 hover:scale-[1.02]"
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant="outline" className="text-accent border-accent/50">
                      {workout.day}
                    </Badge>
                    <Badge variant="secondary">{workout.exercises} exercícios</Badge>
                  </div>
                  <CardTitle className="text-xl leading-tight">{workout.name}</CardTitle>
                  <CardDescription className="flex items-center gap-4 mt-2">
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {workout.duration}
                    </span>
                    {workout.lastCompleted && (
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        {workout.lastCompleted}
                      </span>
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button asChild className="w-full bg-accent hover:bg-accent/90">
                    <Link href={`/dashboard/student/workouts/${workout.id}`}>
                      <Play className="h-4 w-4 mr-2" />
                      Iniciar Treino
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full bg-transparent">
                    <Link href={`/dashboard/student/workouts/${workout.id}`}>Ver Detalhes</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            {completedWorkouts.map((workout) => (
              <Card
                key={workout.id}
                className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300"
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge className="bg-primary/10 text-primary">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      Concluído
                    </Badge>
                    <Badge variant="secondary">{workout.exercises} exercícios</Badge>
                  </div>
                  <CardTitle className="text-xl leading-tight">{workout.name}</CardTitle>
                  <CardDescription className="flex items-center gap-4 mt-2">
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {workout.duration}
                    </span>
                    <span className="flex items-center gap-1 text-primary">
                      <Calendar className="h-4 w-4" />
                      {workout.lastCompleted}
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="outline" className="w-full bg-transparent">
                    <Link href={`/dashboard/student/workouts/${workout.id}`}>Ver Histórico</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
