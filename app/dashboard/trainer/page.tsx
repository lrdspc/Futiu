"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Users, Dumbbell, TrendingUp, MessageSquare, Calendar, Plus } from "lucide-react"
import Link from "next/link"

export default function TrainerDashboardPage() {
  const stats = [
    { label: "Alunos Ativos", value: "24", icon: Users, color: "text-primary", href: "/dashboard/trainer/students" },
    {
      label: "Treinos Criados",
      value: "156",
      icon: Dumbbell,
      color: "text-accent",
      href: "/dashboard/trainer/workouts",
    },
    {
      label: "Taxa de Progresso",
      value: "87%",
      icon: TrendingUp,
      color: "text-secondary",
      href: "/dashboard/trainer/progress",
    },
    {
      label: "Mensagens",
      value: "12",
      icon: MessageSquare,
      color: "text-chart-4",
      href: "/dashboard/trainer/messages",
    },
  ]

  const upcomingEvaluations = [
    { id: "1", name: "João Silva", date: "Hoje, 14:00", avatar: "/student-studying.png", status: "confirmed" },
    {
      id: "2",
      name: "Maria Santos",
      date: "Amanhã, 10:00",
      avatar: "/diverse-student-studying.png",
      status: "confirmed",
    },
    { id: "3", name: "Pedro Costa", date: "Qui, 16:00", avatar: "/diverse-students-studying.png", status: "pending" },
  ]

  const recentActivity = [
    { id: "1", type: "workout", message: "Novo treino criado para João Silva", time: "2h atrás" },
    { id: "2", type: "progress", message: "Maria Santos completou Treino A", time: "4h atrás" },
    { id: "3", type: "message", message: "Nova mensagem de Pedro Costa", time: "5h atrás" },
  ]

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-3xl font-black tracking-tight">Bem-vindo de volta!</h2>
        <p className="text-muted-foreground text-lg">Aqui está um resumo da sua atividade.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Link key={index} href={stat.href}>
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 hover:scale-[1.02] cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-semibold text-muted-foreground">{stat.label}</CardTitle>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-black">{stat.value}</div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl font-black">Próximas Avaliações</CardTitle>
                <CardDescription>Alunos agendados para esta semana</CardDescription>
              </div>
              <Button size="sm" variant="outline">
                <Plus className="h-4 w-4 mr-1" />
                Agendar
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingEvaluations.map((evaluation) => (
              <div
                key={evaluation.id}
                className="flex items-center gap-4 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <Avatar className="h-10 w-10 border-2 border-primary/20">
                  <AvatarImage src={evaluation.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="bg-primary/10 text-primary font-bold">
                    {evaluation.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-semibold">{evaluation.name}</p>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {evaluation.date}
                  </p>
                </div>
                <div
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    evaluation.status === "confirmed" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {evaluation.status === "confirmed" ? "Confirmado" : "Pendente"}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl font-black">Atividade Recente</CardTitle>
            <CardDescription>Últimas atualizações dos seus alunos</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <div
                  className={`p-2 rounded-full ${
                    activity.type === "workout"
                      ? "bg-accent/10 text-accent"
                      : activity.type === "progress"
                        ? "bg-primary/10 text-primary"
                        : "bg-chart-4/10 text-chart-4"
                  }`}
                >
                  {activity.type === "workout" && <Dumbbell className="h-4 w-4" />}
                  {activity.type === "progress" && <TrendingUp className="h-4 w-4" />}
                  {activity.type === "message" && <MessageSquare className="h-4 w-4" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="border-border/50 bg-gradient-to-br from-primary/10 to-transparent backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-black">Ações Rápidas</CardTitle>
          <CardDescription>Acesso rápido às principais funcionalidades</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-3">
          <Button asChild className="h-12 text-base font-semibold bg-primary hover:bg-primary/90">
            <Link href="/dashboard/trainer/students">
              <Users className="mr-2 h-5 w-5" />
              Gerenciar Alunos
            </Link>
          </Button>
          <Button asChild className="h-12 text-base font-semibold bg-transparent" variant="outline">
            <Link href="/dashboard/trainer/workouts">
              <Dumbbell className="mr-2 h-5 w-5" />
              Criar Novo Treino
            </Link>
          </Button>
          <Button asChild className="h-12 text-base font-semibold bg-transparent" variant="outline">
            <Link href="/dashboard/trainer/messages">
              <MessageSquare className="mr-2 h-5 w-5" />
              Ver Mensagens
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
