"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Trophy, Target, Flame, Zap, Award, Star, TrendingUp, Calendar } from "lucide-react"

const achievements = [
  {
    id: 1,
    title: "Primeira Semana",
    description: "Complete sua primeira semana de treinos",
    icon: Calendar,
    unlocked: true,
    date: "15 Jan 2025",
    color: "text-accent",
  },
  {
    id: 2,
    title: "Sequência de Fogo",
    description: "Treine 7 dias consecutivos",
    icon: Flame,
    unlocked: true,
    date: "28 Jan 2025",
    color: "text-orange-500",
  },
  {
    id: 3,
    title: "Mestre da Consistência",
    description: "Complete 30 treinos",
    icon: Target,
    unlocked: true,
    date: "10 Mar 2025",
    color: "text-primary",
  },
  {
    id: 4,
    title: "Transformação",
    description: "Perca 5kg",
    icon: TrendingUp,
    unlocked: true,
    date: "05 Abr 2025",
    color: "text-green-500",
  },
  {
    id: 5,
    title: "Velocista",
    description: "Complete um treino em menos de 30 minutos",
    icon: Zap,
    unlocked: false,
    progress: 85,
    color: "text-yellow-500",
  },
  {
    id: 6,
    title: "Campeão",
    description: "Complete 100 treinos",
    icon: Trophy,
    unlocked: false,
    progress: 62,
    color: "text-accent",
  },
  {
    id: 7,
    title: "Estrela Cadente",
    description: "Treine 30 dias consecutivos",
    icon: Star,
    unlocked: false,
    progress: 40,
    color: "text-purple-500",
  },
  {
    id: 8,
    title: "Lenda",
    description: "Alcance todas as suas metas mensais por 6 meses",
    icon: Award,
    unlocked: false,
    progress: 33,
    color: "text-cyan-500",
  },
]

const stats = [
  { label: "Conquistas Desbloqueadas", value: "4/8", icon: Trophy },
  { label: "Dias Consecutivos", value: "12", icon: Flame },
  { label: "Total de Treinos", value: "62", icon: Target },
  { label: "Nível Atual", value: "15", icon: Star },
]

export default function StudentAchievementsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-black text-balance">Conquistas</h2>
        <p className="text-muted-foreground">Desbloqueie medalhas e mostre seu progresso</p>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Conquistas Desbloqueadas</CardTitle>
            <CardDescription>Parabéns por essas conquistas!</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {achievements
              .filter((a) => a.unlocked)
              .map((achievement) => (
                <div
                  key={achievement.id}
                  className="flex items-start gap-4 p-4 rounded-lg border border-border/50 bg-card/50"
                >
                  <div className={`p-3 rounded-full bg-accent/10 ${achievement.color}`}>
                    <achievement.icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold">{achievement.title}</h3>
                      <Badge variant="secondary" className="text-xs">
                        Desbloqueada
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{achievement.description}</p>
                    <p className="text-xs text-muted-foreground mt-2">{achievement.date}</p>
                  </div>
                </div>
              ))}
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Em Progresso</CardTitle>
            <CardDescription>Continue treinando para desbloquear</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {achievements
              .filter((a) => !a.unlocked)
              .map((achievement) => (
                <div key={achievement.id} className="flex items-start gap-4 p-4 rounded-lg border border-border/50">
                  <div className={`p-3 rounded-full bg-muted ${achievement.color} opacity-50`}>
                    <achievement.icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold">{achievement.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{achievement.description}</p>
                    <div className="mt-3 space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Progresso</span>
                        <span className="font-bold">{achievement.progress}%</span>
                      </div>
                      <Progress value={achievement.progress} className="h-2" />
                    </div>
                  </div>
                </div>
              ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
