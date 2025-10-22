"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Dumbbell, TrendingUp, Calendar, Trophy, Flame, Play } from "lucide-react"
import Link from "next/link"

export default function StudentDashboardPage() {
  const weekProgress = 4
  const totalWorkouts = 5
  const currentStreak = 12

  const todayWorkout = {
    id: "1",
    name: "Treino A - Peito e Tríceps",
    exercises: 8,
    duration: "60-75 min",
    completed: false,
  }

  const upcomingWorkouts = [
    { id: "2", name: "Treino B - Costas e Bíceps", day: "Terça-feira", exercises: 9 },
    { id: "3", name: "Treino C - Pernas", day: "Quinta-feira", exercises: 10 },
    { id: "4", name: "Treino D - Ombros", day: "Sábado", exercises: 7 },
  ]

  const recentAchievements = [
    { id: "1", name: "Primeira Semana", description: "Complete 5 treinos", icon: Trophy, unlocked: true },
    { id: "2", name: "Sequência de Fogo", description: "12 dias consecutivos", icon: Flame, unlocked: true },
    { id: "3", name: "Força Crescente", description: "Aumente 5kg na carga", icon: TrendingUp, unlocked: true },
  ]

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-3xl font-black tracking-tight">Bem-vindo de volta!</h2>
        <p className="text-muted-foreground text-lg">Continue firme! Você está fazendo um ótimo trabalho.</p>
      </div>

      <Card className="border-2 border-accent/20 bg-gradient-to-br from-accent/10 to-transparent backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-black">Progresso Semanal</CardTitle>
              <CardDescription className="text-base mt-1">
                {weekProgress} de {totalWorkouts} treinos concluídos
              </CardDescription>
            </div>
            <div className="flex items-center gap-2 text-accent">
              <Flame className="h-6 w-6" />
              <span className="text-3xl font-black">{currentStreak}</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Progress value={(weekProgress / totalWorkouts) * 100} className="h-3" />
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Falta apenas 1 treino!</span>
            <span className="font-bold text-accent">{Math.round((weekProgress / totalWorkouts) * 100)}%</span>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-semibold text-muted-foreground">Sequência</CardTitle>
            <Flame className="h-5 w-5 text-chart-4" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black">{currentStreak} dias</div>
            <p className="text-sm text-muted-foreground mt-1">Sem faltar treinos</p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-semibold text-muted-foreground">Evolução</CardTitle>
            <TrendingUp className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black">+5.2kg</div>
            <p className="text-sm text-muted-foreground mt-1">Carga total aumentada</p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-semibold text-muted-foreground">Conquistas</CardTitle>
            <Trophy className="h-5 w-5 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black">8</div>
            <p className="text-sm text-muted-foreground mt-1">Medalhas desbloqueadas</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-black">Treino de Hoje</h2>
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-accent/50 transition-all duration-300">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <CardTitle className="text-xl font-black">{todayWorkout.name}</CardTitle>
                <CardDescription className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Segunda-feira
                </CardDescription>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-bold">
                <Dumbbell className="h-4 w-4" />
                {todayWorkout.exercises} exercícios
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>Duração: {todayWorkout.duration}</span>
            </div>
            <Button asChild className="w-full h-12 text-base font-bold bg-accent hover:bg-accent/90">
              <Link href="/dashboard/student/workouts/1">
                <Play className="h-5 w-5 mr-2" />
                Iniciar Treino
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl font-black">Próximos Treinos</CardTitle>
            <CardDescription>Sua programação da semana</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingWorkouts.map((workout) => (
              <div
                key={workout.id}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <div>
                  <p className="font-semibold">{workout.name}</p>
                  <p className="text-sm text-muted-foreground">{workout.day}</p>
                </div>
                <Badge variant="outline">{workout.exercises} exercícios</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl font-black">Conquistas Recentes</CardTitle>
            <CardDescription>Suas últimas medalhas desbloqueadas</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentAchievements.map((achievement) => (
              <div
                key={achievement.id}
                className="flex items-center gap-4 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-secondary/10">
                  <achievement.icon className="h-6 w-6 text-secondary" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold">{achievement.name}</p>
                  <p className="text-sm text-muted-foreground">{achievement.description}</p>
                </div>
                <Badge className="bg-secondary/10 text-secondary">Desbloqueada</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
