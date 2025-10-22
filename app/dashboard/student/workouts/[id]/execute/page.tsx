"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { WorkoutExecution } from "@/components/workout-execution/workout-execution"
import { getWorkoutById } from "@/lib/actions/workouts"

export default function ExecuteWorkoutPage() {
  const params = useParams()
  const router = useRouter()
  const [workout, setWorkout] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadWorkout() {
      try {
        const data = await getWorkoutById(params.id as string)
        setWorkout(data)
      } catch (error) {
        console.error("Error loading workout:", error)
      } finally {
        setLoading(false)
      }
    }
    loadWorkout()
  }, [params.id])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando treino...</p>
        </div>
      </div>
    )
  }

  if (!workout) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-lg font-semibold mb-2">Treino não encontrado</p>
          <button onClick={() => router.back()} className="text-primary">
            Voltar
          </button>
        </div>
      </div>
    )
  }

  return <WorkoutExecution workout={workout} />
}
