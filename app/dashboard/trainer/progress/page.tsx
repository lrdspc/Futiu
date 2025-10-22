import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown, Dumbbell, Calendar, Trophy, Flame } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export default async function ProgressPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: students } = await supabase
    .from("student_profiles")
    .select(`
      id,
      users!inner(id, full_name, email, avatar_url)
    `)
    .eq("personal_trainer_id", user.id)

  const { data: allSessions } = await supabase
    .from("workout_sessions")
    .select("*")
    .order("started_at", { ascending: false })
    .limit(100)

  const studentsList = students || []
  const sessions = allSessions || []

  const topPerformers = studentsList
    .map((student) => {
      const studentSessions = sessions.filter((s) => s.user_id === student.id)
      const completedWorkouts = studentSessions.filter((s) => s.completed_at).length
      const avgRating = studentSessions.reduce((acc, s) => acc + (s.rating || 0), 0) / (studentSessions.length || 1)

      return {
        id: student.id,
        name: student.users.full_name || "Sem nome",
        avatar: student.users.avatar_url,
        workoutsCompleted: completedWorkouts,
        progress: Math.round(avgRating * 20),
        streak: 0,
        improvement: "+0%",
      }
    })
    .sort((a, b) => b.workoutsCompleted - a.workoutsCompleted)
    .slice(0, 3)

  const recentProgress = sessions.slice(0, 4).map((session) => {
    const student = studentsList.find((s) => s.id === session.user_id)
    return {
      id: session.id,
      student: student?.users.full_name || "Aluno",
      avatar: student?.users.avatar_url,
      workout: "Treino completado",
      date: new Date(session.started_at).toLocaleDateString("pt-BR"),
      performance: session.rating ? session.rating * 20 : 0,
      trend: session.rating && session.rating >= 4 ? "up" : "down",
    }
  })

  const weeklyStats = [
    { day: "Seg", completed: 18, total: 24 },
    { day: "Ter", completed: 20, total: 24 },
    { day: "Qua", completed: 22, total: 24 },
    { day: "Qui", completed: 19, total: 24 },
    { day: "Sex", completed: 21, total: 24 },
    { day: "Sáb", completed: 15, total: 20 },
    { day: "Dom", completed: 12, total: 16 },
  ]

  const totalCompleted = sessions.filter((s) => s.completed_at).length
  const totalStudents = studentsList.length

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-black tracking-tight">Progresso</h2>
        <p className="text-muted-foreground">Acompanhe o desempenho e evolução dos seus alunos</p>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-semibold text-muted-foreground">Taxa de Conclusão</CardTitle>
            <TrendingUp className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black">
              {sessions.length > 0 ? Math.round((totalCompleted / sessions.length) * 100) : 0}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">Treinos completados</p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-semibold text-muted-foreground">Treinos Concluídos</CardTitle>
            <Dumbbell className="h-5 w-5 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black">{totalCompleted}</div>
            <p className="text-xs text-muted-foreground mt-1">Total registrado</p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-semibold text-muted-foreground">Alunos Ativos</CardTitle>
            <Flame className="h-5 w-5 text-chart-4" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black">{totalStudents}</div>
            <p className="text-xs text-muted-foreground mt-1">Total de alunos</p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-semibold text-muted-foreground">Conquistas</CardTitle>
            <Trophy className="h-5 w-5 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black">0</div>
            <p className="text-xs text-muted-foreground mt-1">Desbloqueadas este mês</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="top-performers" className="space-y-6">
        <TabsList>
          <TabsTrigger value="top-performers">Melhores Desempenhos</TabsTrigger>
          <TabsTrigger value="recent">Atividade Recente</TabsTrigger>
          <TabsTrigger value="weekly">Visão Semanal</TabsTrigger>
        </TabsList>

        <TabsContent value="top-performers" className="space-y-4">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl font-black">Top Performers</CardTitle>
              <CardDescription>Alunos com melhor desempenho</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {topPerformers.length > 0 ? (
                topPerformers.map((student, index) => (
                  <div
                    key={student.id}
                    className="flex items-center gap-4 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-black">
                      {index + 1}
                    </div>
                    <Avatar className="h-12 w-12 border-2 border-primary/20">
                      <AvatarImage src={student.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="bg-primary/10 text-primary font-bold">
                        {student.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-semibold">{student.name}</p>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Dumbbell className="h-3 w-3" />
                          {student.workoutsCompleted} treinos
                        </span>
                      </div>
                    </div>
                    <div className="text-right space-y-2">
                      <div className="text-2xl font-black text-primary">{student.progress}%</div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-muted-foreground py-8">Nenhum aluno cadastrado ainda</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recent" className="space-y-4">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl font-black">Atividade Recente</CardTitle>
              <CardDescription>Últimos treinos completados pelos alunos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentProgress.length > 0 ? (
                recentProgress.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center gap-4 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                  >
                    <Avatar className="h-12 w-12 border-2 border-primary/20">
                      <AvatarImage src={activity.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="bg-primary/10 text-primary font-bold">
                        {activity.student.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-semibold">{activity.student}</p>
                      <p className="text-sm text-muted-foreground">{activity.workout}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                        <Calendar className="h-3 w-3" />
                        {activity.date}
                      </p>
                    </div>
                    <div className="text-right space-y-2">
                      <div className="flex items-center gap-2">
                        {activity.trend === "up" ? (
                          <TrendingUp className="h-4 w-4 text-primary" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-destructive" />
                        )}
                        <span className="text-2xl font-black">{activity.performance}%</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-muted-foreground py-8">Nenhuma atividade recente</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="weekly" className="space-y-4">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl font-black">Visão Semanal</CardTitle>
              <CardDescription>Taxa de conclusão de treinos por dia da semana</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {weeklyStats.map((stat) => (
                <div key={stat.day} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">{stat.day}</span>
                    <span className="text-sm text-muted-foreground">
                      {stat.completed}/{stat.total} treinos
                    </span>
                  </div>
                  <Progress value={(stat.completed / stat.total) * 100} className="h-3" />
                  <div className="text-right">
                    <span className="text-xs font-semibold text-primary">
                      {Math.round((stat.completed / stat.total) * 100)}%
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
