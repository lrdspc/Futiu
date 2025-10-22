"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { AssessmentForm } from "@/components/assessment/assessment-form"
import { createAssessment } from "@/lib/actions/assessments"
import { useToast } from "@/hooks/use-toast"

export default function AssessmentPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (data: any) => {
    setLoading(true)
    try {
      await createAssessment(params.id as string, data)
      toast({
        title: "Sucesso!",
        description: "Avaliação física salva com sucesso"
      })
      router.push(`/dashboard/trainer/students/${params.id}`)
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao salvar avaliação",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href={`/dashboard/trainer/students/${params.id}`}>
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h2 className="text-3xl font-black">Nova Avaliação Física</h2>
          <p className="text-muted-foreground">Registre as medidas e dados do aluno</p>
        </div>
      </div>

      <AssessmentForm onSubmit={handleSubmit} loading={loading} />
    </div>
  )
}
