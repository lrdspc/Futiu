"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/lib/auth"
import { Camera, Bell, Lock, User, Target } from "lucide-react"
import { useState } from "react"
import { updateUserProfile, updateStudentProfile } from "@/lib/actions/auth"
import { toast } from "sonner"

export default function StudentSettingsPage() {
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [fullName, setFullName] = useState(user?.name || "")
  const [goalWeight, setGoalWeight] = useState("")
  const [height, setHeight] = useState("")
  const [fitnessGoal, setFitnessGoal] = useState("")

  const handleSaveProfile = async () => {
    setIsLoading(true)
    try {
      await updateUserProfile({ full_name: fullName })
      await updateStudentProfile({
        goal_weight_kg: goalWeight ? Number.parseFloat(goalWeight) : undefined,
        height_cm: height ? Number.parseFloat(height) : undefined,
        fitness_goal: fitnessGoal || undefined,
      })
      toast.success("Perfil atualizado com sucesso!")
    } catch (error) {
      toast.error("Erro ao atualizar perfil")
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-black text-balance">Configurações</h2>
        <p className="text-muted-foreground">Gerencie suas preferências e informações</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Perfil
            </CardTitle>
            <CardDescription>Atualize suas informações pessoais</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20 border-2 border-accent">
                <AvatarImage src={user?.avatar || "/placeholder.svg"} />
                <AvatarFallback className="bg-accent/10 text-accent font-bold text-2xl">
                  {user?.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <Button variant="outline">
                <Camera className="h-4 w-4 mr-2" />
                Alterar Foto
              </Button>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome Completo</Label>
                <Input id="name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={user?.email} disabled />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input id="phone" type="tel" placeholder="(00) 00000-0000" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="height">Altura (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  placeholder="175"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                />
              </div>
            </div>

            <Button className="w-full bg-accent hover:bg-accent/90" onClick={handleSaveProfile} disabled={isLoading}>
              {isLoading ? "Salvando..." : "Salvar Alterações"}
            </Button>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Metas
            </CardTitle>
            <CardDescription>Defina seus objetivos de treino</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="goal-weight">Peso Alvo (kg)</Label>
              <Input
                id="goal-weight"
                type="number"
                placeholder="75"
                value={goalWeight}
                onChange={(e) => setGoalWeight(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="weekly-workouts">Treinos por Semana</Label>
              <Input id="weekly-workouts" type="number" placeholder="5" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="workout-duration">Duração do Treino (min)</Label>
              <Input id="workout-duration" type="number" placeholder="60" />
            </div>

            <Separator />

            <div className="space-y-2">
              <Label>Objetivo Principal</Label>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant={fitnessGoal === "Perder Peso" ? "default" : "outline"}
                  className="justify-start"
                  onClick={() => setFitnessGoal("Perder Peso")}
                >
                  Perder Peso
                </Button>
                <Button
                  variant={fitnessGoal === "Ganhar Massa" ? "default" : "outline"}
                  className="justify-start"
                  onClick={() => setFitnessGoal("Ganhar Massa")}
                >
                  Ganhar Massa
                </Button>
                <Button
                  variant={fitnessGoal === "Definição" ? "default" : "outline"}
                  className="justify-start"
                  onClick={() => setFitnessGoal("Definição")}
                >
                  Definição
                </Button>
                <Button
                  variant={fitnessGoal === "Resistência" ? "default" : "outline"}
                  className="justify-start"
                  onClick={() => setFitnessGoal("Resistência")}
                >
                  Resistência
                </Button>
              </div>
            </div>

            <Button className="w-full bg-accent hover:bg-accent/90" onClick={handleSaveProfile} disabled={isLoading}>
              {isLoading ? "Salvando..." : "Atualizar Metas"}
            </Button>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notificações
            </CardTitle>
            <CardDescription>Gerencie suas preferências de notificação</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Lembretes de Treino</Label>
                <p className="text-sm text-muted-foreground">Receba lembretes para treinar</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Mensagens do Personal</Label>
                <p className="text-sm text-muted-foreground">Notificações de novas mensagens</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Conquistas</Label>
                <p className="text-sm text-muted-foreground">Notificações de novas conquistas</p>
              </div>
              <Switch />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Relatórios Semanais</Label>
                <p className="text-sm text-muted-foreground">Resumo semanal do seu progresso</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Segurança
            </CardTitle>
            <CardDescription>Atualize sua senha e configurações de segurança</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Senha Atual</Label>
              <Input id="current-password" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">Nova Senha</Label>
              <Input id="new-password" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
              <Input id="confirm-password" type="password" />
            </div>

            <Button className="w-full bg-accent hover:bg-accent/90" onClick={handleSaveProfile} disabled={isLoading}>
              {isLoading ? "Salvando..." : "Alterar Senha"}
            </Button>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Autenticação em Dois Fatores</Label>
                <p className="text-sm text-muted-foreground">Adicione uma camada extra de segurança</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
