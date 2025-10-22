"use client"

import { useAuth } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { LogOut, Dumbbell, TrendingUp, Calendar, Trophy, Flame } from "lucide-react"
import { useRouter } from "next/navigation"

/**
 * A dashboard component for the student user.
 *
 * This component displays the student's dashboard, including their profile information,
 * weekly progress, today's workout, and various stats like workout streak, evolution,
 * and achievements. It also provides a logout button.
 *
 * @returns {JSX.Element} The student dashboard component.
 */
export function AlunoDashboard() {
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const weekProgress = 4
  const totalWorkouts = 5

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <header className="border-b border-border/50 bg-card/30 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 border-2 border-accent">
              <AvatarImage src={user?.avatar || "/placeholder.svg"} />
              <AvatarFallback className="bg-accent/10 text-accent font-bold">{user?.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-bold text-lg">{user?.name}</h2>
              <p className="text-sm text-muted-foreground">Aluno</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={handleLogout}>
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-black tracking-tight">Seus Treinos</h1>
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
                <span className="text-3xl font-black">{weekProgress}</span>
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

        <div className="space-y-4">
          <h2 className="text-2xl font-black">Treino de Hoje</h2>
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-accent/50 transition-all duration-300 hover:scale-[1.01] cursor-pointer">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-xl font-black">Treino A - Peito e Tríceps</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Segunda-feira
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-bold">
                  <Dumbbell className="h-4 w-4" />8 exercícios
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button className="w-full h-12 text-base font-bold bg-accent hover:bg-accent/90">Iniciar Treino</Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-semibold text-muted-foreground">Sequência</CardTitle>
              <Flame className="h-5 w-5 text-chart-4" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black">12 dias</div>
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
      </main>
    </div>
  )
}
