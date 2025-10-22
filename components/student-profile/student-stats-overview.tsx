"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dumbbell, TrendingUp, Target, Calendar } from "lucide-react"

interface StudentStatsOverviewProps {
  stats: any
}

export function StudentStatsOverview({ stats }: StudentStatsOverviewProps) {
  const data = [
    {
      label: "Treinos Completados",
      value: stats?.workouts_completed || 0,
      icon: Dumbbell,
      color: "text-primary"
    },
    {
      label: "Taxa de Adesão",
      value: `${stats?.adherence_rate || 0}%`,
      icon: Target,
      color: "text-accent"
    },
    {
      label: "Evolução de Peso",
      value: `${stats?.weight_change > 0 ? '+' : ''}${stats?.weight_change || 0}kg`,
      icon: TrendingUp,
      color: "text-secondary"
    },
    {
      label: "Última Avaliação",
      value: stats?.last_assessment || "Nunca",
      icon: Calendar,
      color: "text-chart-4"
    }
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {data.map((item, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-semibold text-muted-foreground">
              {item.label}
            </CardTitle>
            <item.icon className={`h-5 w-5 ${item.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black">{item.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
