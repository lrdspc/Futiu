"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth, type UserType } from "@/lib/auth"
import { useToast } from "@/hooks/use-toast"
import { Dumbbell, User, Lock, Loader2 } from "lucide-react"

interface LoginFormProps {
  userType: UserType
}

/**
 * A login form component for both personal trainers and students.
 *
 * This component displays a login form with email and password fields. It handles the
 * authentication process, displays loading and error states, and redirects the user to
 * the dashboard upon successful login.
 *
 * @param {LoginFormProps} props - The props for the component.
 * @returns {JSX.Element} The login form component.
 */
export function LoginForm({ userType }: LoginFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const success = await login(email, password, userType)

      if (success) {
        toast({
          title: "Login realizado!",
          description: `Bem-vindo de volta!`,
        })
        router.push("/dashboard")
      } else {
        toast({
          title: "Erro no login",
          description: "Email ou senha incorretos",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Algo deu errado. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md border-2 border-primary/20 bg-card/50 backdrop-blur-sm">
      <CardHeader className="space-y-3 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 animate-pulse-glow">
          <Dumbbell className="h-8 w-8 text-primary" />
        </div>
        <CardTitle className="text-3xl font-black tracking-tight">
          {userType === "personal" ? "Personal Trainer" : "Aluno"}
        </CardTitle>
        <CardDescription className="text-base">
          {userType === "personal" ? "Gerencie seus alunos e treinos" : "Acesse seus treinos e evolução"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-semibold">
              Email
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 h-12 bg-muted/50 border-border/50 focus:border-primary transition-colors"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-semibold">
              Senha
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 h-12 bg-muted/50 border-border/50 focus:border-primary transition-colors"
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-12 text-base font-bold bg-primary hover:bg-primary/90 transition-all duration-300 hover:scale-[1.02]"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Entrando...
              </>
            ) : (
              "Entrar"
            )}
          </Button>

          <p className="text-center text-sm text-muted-foreground mt-4">Demo: {userType}@demo.com / demo123</p>
        </form>
      </CardContent>
    </Card>
  )
}
