"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StudentProfileHeader } from "@/components/student-profile/student-profile-header"
import { StudentStatsOverview } from "@/components/student-profile/student-stats-overview"
import { StudentActiveWorkouts } from "@/components/student-profile/student-active-workouts"
import { StudentEvolutionCharts } from "@/components/student-profile/student-evolution-charts"
import { StudentProgressPhotos } from "@/components/student-profile/student-progress-photos"
import { getStudentFullProfile } from "@/lib/actions/student-details"

export default function StudentProfilePage() {
  const params = useParams()
  const [student, setStudent] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadStudent() {
      try {
        const data = await getStudentFullProfile(params.id as string)
        setStudent(data)
      } catch (error) {
        console.error("Error loading student:", error)
      } finally {
        setLoading(false)
      }
    }
    loadStudent()
  }, [params.id])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!student) {
    return (
      <div className="text-center py-12">
        <p className="text-lg font-semibold">Aluno não encontrado</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <StudentProfileHeader student={student} />
      <StudentStatsOverview stats={student.stats} />

      <Tabs defaultValue="workouts" className="space-y-6">
        <TabsList>
          <TabsTrigger value="workouts">Treinos</TabsTrigger>
          <TabsTrigger value="evolution">Evolução</TabsTrigger>
          <TabsTrigger value="photos">Fotos</TabsTrigger>
        </TabsList>

        <TabsContent value="workouts">
          <StudentActiveWorkouts studentId={params.id as string} />
        </TabsContent>

        <TabsContent value="evolution">
          <StudentEvolutionCharts studentId={params.id as string} />
        </TabsContent>

        <TabsContent value="photos">
          <StudentProgressPhotos studentId={params.id as string} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
