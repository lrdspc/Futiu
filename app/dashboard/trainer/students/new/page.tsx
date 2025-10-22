"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createStudent } from "@/lib/actions/create-student"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, UserPlus, Loader2 } from "lucide-react"
import Link from "next/link"

/**
 * Página para Personal Trainer cadastrar novos alunos
 */
export default function NewStudentPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(null)

    const formData = new FormData(e.currentTarget)

    const data = {
      email: formData.get("email") as string,
      full_name: formData.get("full_name") as string,
      date_of_birth: formData.get("date_of_birth") as string,
      gender: formData.get("gender") as string,
      height_cm: formData.get("height_cm") ? Number(formData.get("height_cm")) : undefined,
      current_weight_kg: formData.get("current_weight_kg")
        ? Number(formData.get("current_weight_kg"))
        : undefined,
      goal_weight_kg: formData.get("goal_weight_kg") ? Number(formData.get("goal_weight_kg")) : undefined,
      fitness_goal: formData.get("fitness_goal") as string,
      medical_notes: formData.get("medical_notes") as string,
    }

    try {
      const result = await createStudent(data)

      if (result.error) {
        setError(result.error.message)
      } else {
        setSuccess(result.data?.message || "Aluno criado com sucesso!")
        // Redirecionar após 2 segundos
        setTimeout(() => {
          router.push("/dashboard/trainer/students")
        }, 2000)
      }
    } catch (err: any) {
      setError(err.message || "Erro ao criar aluno")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-6">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/dashboard/trainer/students">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar para Alunos
          </Link>
        </Button>

        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
            <UserPlus className="h-6 w-6 text-cyan-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Cadastrar Novo Aluno</h1>
            <p className="text-gray-400">Preencha os dados do aluno para enviar o convite</p>
          </div>
        </div>
      </div>

      <Card className="border-gray-800 bg-gray-900/50 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-white">Informações do Aluno</CardTitle>
          <CardDescription className="text-gray-400">
            Um email será enviado para o aluno com instruções para definir a senha
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Dados Básicos */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Dados Básicos</h3>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="full_name" className="text-gray-300">
                    Nome Completo *
                  </Label>
                  <Input
                    id="full_name"
                    name="full_name"
                    type="text"
                    required
                    placeholder="João Silva"
                    className="border-gray-700 bg-gray-800/50 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-300">
                    Email *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="joao@email.com"
                    className="border-gray-700 bg-gray-800/50 text-white"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="date_of_birth" className="text-gray-300">
                    Data de Nascimento
                  </Label>
                  <Input
                    id="date_of_birth"
                    name="date_of_birth"
                    type="date"
                    className="border-gray-700 bg-gray-800/50 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gender" className="text-gray-300">
                    Gênero
                  </Label>
                  <Select name="gender">
                    <SelectTrigger className="border-gray-700 bg-gray-800/50 text-white">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Masculino</SelectItem>
                      <SelectItem value="female">Feminino</SelectItem>
                      <SelectItem value="other">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Medidas Físicas */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Medidas Físicas</h3>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="height_cm" className="text-gray-300">
                    Altura (cm)
                  </Label>
                  <Input
                    id="height_cm"
                    name="height_cm"
                    type="number"
                    step="0.01"
                    placeholder="175"
                    className="border-gray-700 bg-gray-800/50 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="current_weight_kg" className="text-gray-300">
                    Peso Atual (kg)
                  </Label>
                  <Input
                    id="current_weight_kg"
                    name="current_weight_kg"
                    type="number"
                    step="0.01"
                    placeholder="80"
                    className="border-gray-700 bg-gray-800/50 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="goal_weight_kg" className="text-gray-300">
                    Peso Meta (kg)
                  </Label>
                  <Input
                    id="goal_weight_kg"
                    name="goal_weight_kg"
                    type="number"
                    step="0.01"
                    placeholder="75"
                    className="border-gray-700 bg-gray-800/50 text-white"
                  />
                </div>
              </div>
            </div>

            {/* Objetivos e Observações */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Objetivos e Observações</h3>

              <div className="space-y-2">
                <Label htmlFor="fitness_goal" className="text-gray-300">
                  Objetivo de Fitness
                </Label>
                <Input
                  id="fitness_goal"
                  name="fitness_goal"
                  type="text"
                  placeholder="Ex: Perder peso, ganhar massa muscular, melhorar condicionamento"
                  className="border-gray-700 bg-gray-800/50 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="medical_notes" className="text-gray-300">
                  Observações Médicas
                </Label>
                <Textarea
                  id="medical_notes"
                  name="medical_notes"
                  placeholder="Lesões, restrições, medicações, etc."
                  rows={4}
                  className="border-gray-700 bg-gray-800/50 text-white resize-none"
                />
              </div>
            </div>

            {/* Mensagens de erro/sucesso */}
            {error && (
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/50">
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}

            {success && (
              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/50">
                <p className="text-sm text-green-400">{success}</p>
              </div>
            )}

            {/* Botões */}
            <div className="flex gap-4 justify-end pt-4">
              <Button type="button" variant="outline" asChild disabled={isLoading}>
                <Link href="/dashboard/trainer/students">Cancelar</Link>
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Criando...
                  </>
                ) : (
                  <>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Criar Aluno e Enviar Convite
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

