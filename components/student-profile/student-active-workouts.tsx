"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dumbbell, Clock, Eye } from "lucide-react"
import { getStudentWorkouts } from "@/lib/actions/student-details"

interface StudentActiveWorkoutsProps {
  studentId: string
}

export function StudentActiveWorkouts({ studentId }: StudentActiveWorkoutsProps) {
  const [workouts, setWorkouts] = useState<any[]>([])

  useEffect(() => {
    async function load() {
      const data = await getStudentWorkouts(studentId)
      setWorkouts(data)
    }
    load()
  }, [studentId])

  if (workouts.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center text-muted-foreground">
          <p>Nenhum treino ativo</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {workouts.map((workout) => (
        <Card key={workout.id}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-lg">{workout.name}</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">{workout.description}</p>
              </div>
              <Badge>{workout.workout_type}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1">
                <Dumbbell className="h-4 w-4 text-muted-foreground" />
                {workout.exercise_count || 0} exercícios
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4 text-muted-foreground" />
                {workout.estimated_duration_minutes} min
              </span>
            </div>
            <Button variant="outline" size="sm" className="w-full">
              <Eye className="h-4 w-4 mr-2" />
              Ver Detalhes
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
