"use client"

import { useAuth } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogOut, Users, Dumbbell, TrendingUp, MessageSquare, Calendar } from "lucide-react"
import { useRouter } from "next/navigation"

/**
 * A dashboard component for the personal trainer user.
 *
 * This component displays the personal trainer's dashboard, including their profile information,
 * key statistics, upcoming appointments, and quick action buttons. It also provides a logout button.
 *
 * @returns {JSX.Element} The personal trainer dashboard component.
 */
export function PersonalDashboard() {
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const stats = [
    { label: "Alunos Ativos", value: "24", icon: Users, color: "text-primary" },
    { label: "Treinos Criados", value: "156", icon: Dumbbell, color: "text-accent" },
    { label: "Taxa de Progresso", value: "87%", icon: TrendingUp, color: "text-secondary" },
    { label: "Mensagens", value: "12", icon: MessageSquare, color: "text-chart-4" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <header className="border-b border-border/50 bg-card/30 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 border-2 border-primary">
              <AvatarImage src={user?.avatar || "/placeholder.svg"} />
              <AvatarFallback className="bg-primary/10 text-primary font-bold">{user?.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-bold text-lg">{user?.name}</h2>
              <p className="text-sm text-muted-foreground">Personal Trainer</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={handleLogout}>
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-black tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground text-lg">Bem-vindo de volta! Aqui está um resumo da sua atividade.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 hover:scale-[1.02]"
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-semibold text-muted-foreground">{stat.label}</CardTitle>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-black">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl font-black">Próximas Avaliações</CardTitle>
              <CardDescription>Alunos agendados para esta semana</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: "João Silva", date: "Hoje, 14:00", avatar: "/student-studying.png" },
                { name: "Maria Santos", date: "Amanhã, 10:00", avatar: "/diverse-student-studying.png" },
                { name: "Pedro Costa", date: "Qui, 16:00", avatar: "/diverse-students-studying.png" },
              ].map((aluno, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <Avatar className="h-10 w-10 border-2 border-primary/20">
                    <AvatarImage src={aluno.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="bg-primary/10 text-primary font-bold">
                      {aluno.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-semibold">{aluno.name}</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {aluno.date}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl font-black">Ações Rápidas</CardTitle>
              <CardDescription>Acesso rápido às principais funcionalidades</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start h-12 text-base font-semibold bg-primary hover:bg-primary/90">
                <Users className="mr-2 h-5 w-5" />
                Gerenciar Alunos
              </Button>
              <Button className="w-full justify-start h-12 text-base font-semibold bg-transparent" variant="outline">
                <Dumbbell className="mr-2 h-5 w-5" />
                Criar Novo Treino
              </Button>
              <Button className="w-full justify-start h-12 text-base font-semibold bg-transparent" variant="outline">
                <MessageSquare className="mr-2 h-5 w-5" />
                Ver Mensagens
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
