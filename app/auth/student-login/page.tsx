"use client"

import type React from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Dumbbell } from "lucide-react"

/**
 * Página de login para alunos
 * 
 * Alunos não podem se cadastrar - apenas fazer login com credenciais
 * fornecidas pelo Personal Trainer
 */
export default function StudentLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      
      if (error) throw error

      // Verificar se é realmente um aluno
      const { data: userData } = await supabase
        .from("users")
        .select("user_type")
        .eq("id", data.user.id)
        .single()

      if (userData?.user_type !== "student") {
        await supabase.auth.signOut()
        throw new Error("Esta área é exclusiva para alunos. Personal Trainers devem usar o login específico.")
      }

      router.push("/dashboard/student")
      router.refresh()
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "Erro ao fazer login")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 p-6">
      {/* Botão Login Personal no canto superior direito */}
      <div className="absolute top-6 right-6">
        <Button
          asChild
          variant="outline"
          className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-500"
        >
          <Link href="/auth/personal-login">Login Personal</Link>
        </Button>
      </div>

      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 mb-4">
            <Dumbbell className="h-8 w-8 text-cyan-400" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Personal & Aluno
          </h1>
          <p className="text-sm text-gray-500 mt-2">Área do Aluno</p>
        </div>

        <Card className="border-gray-800 bg-gray-900/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-white">Login</CardTitle>
            <CardDescription className="text-gray-400">
              Entre com as credenciais fornecidas pelo seu Personal Trainer
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email" className="text-gray-300">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-gray-700 bg-gray-800/50 text-white"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password" className="text-gray-300">
                    Senha
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border-gray-700 bg-gray-800/50 text-white"
                  />
                </div>
                {error && (
                  <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/50">
                    <p className="text-sm text-red-400">{error}</p>
                  </div>
                )}
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                  disabled={isLoading}
                >
                  {isLoading ? "Entrando..." : "Entrar"}
                </Button>
              </div>
              <div className="mt-6 p-4 rounded-lg bg-cyan-500/5 border border-cyan-500/20">
                <p className="text-xs text-gray-400 text-center">
                  <strong className="text-cyan-400">Não tem uma conta?</strong>
                  <br />
                  Solicite ao seu Personal Trainer que crie uma conta para você.
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

