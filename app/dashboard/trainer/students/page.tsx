"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Mail, Phone, Calendar, TrendingUp, Dumbbell, Users } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

interface Student {
  id: string
  name: string
  email: string
  phone: string
  avatar: string
  joinDate: string
  workoutsCompleted: number
  progress: number
  status: "active" | "inactive"
}

export default function StudentsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [students] = useState<Student[]>([
    {
      id: "1",
      name: "João Silva",
      email: "joao@email.com",
      phone: "(11) 98765-4321",
      avatar: "/student-studying.png",
      joinDate: "Jan 2025",
      workoutsCompleted: 45,
      progress: 85,
      status: "active",
    },
    {
      id: "2",
      name: "Maria Santos",
      email: "maria@email.com",
      phone: "(11) 98765-4322",
      avatar: "/diverse-student-studying.png",
      joinDate: "Fev 2025",
      workoutsCompleted: 38,
      progress: 92,
      status: "active",
    },
    {
      id: "3",
      name: "Pedro Costa",
      email: "pedro@email.com",
      phone: "(11) 98765-4323",
      avatar: "/diverse-students-studying.png",
      joinDate: "Mar 2025",
      workoutsCompleted: 22,
      progress: 78,
      status: "active",
    },
    {
      id: "4",
      name: "Ana Oliveira",
      email: "ana@email.com",
      phone: "(11) 98765-4324",
      avatar: "/placeholder.svg",
      joinDate: "Dez 2024",
      workoutsCompleted: 67,
      progress: 95,
      status: "active",
    },
  ])

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black tracking-tight">Alunos</h2>
          <p className="text-muted-foreground">Gerencie seus alunos e acompanhe o progresso</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Aluno
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar Novo Aluno</DialogTitle>
              <DialogDescription>Preencha os dados do novo aluno</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome Completo</Label>
                <Input id="name" placeholder="João Silva" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="joao@email.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input id="phone" placeholder="(11) 98765-4321" />
              </div>
              <Button className="w-full">Adicionar Aluno</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar alunos por nome ou email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredStudents.map((student) => (
          <Card
            key={student.id}
            className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 hover:scale-[1.02]"
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12 border-2 border-primary/20">
                    <AvatarImage src={student.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="bg-primary/10 text-primary font-bold">
                      {student.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{student.name}</CardTitle>
                    <CardDescription className="flex items-center gap-1 text-xs">
                      <Calendar className="h-3 w-3" />
                      Desde {student.joinDate}
                    </CardDescription>
                  </div>
                </div>
                <Badge variant={student.status === "active" ? "default" : "secondary"}>
                  {student.status === "active" ? "Ativo" : "Inativo"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  {student.email}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  {student.phone}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/50">
                <div className="space-y-1">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Dumbbell className="h-3 w-3" />
                    Treinos
                  </div>
                  <p className="text-2xl font-black">{student.workoutsCompleted}</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <TrendingUp className="h-3 w-3" />
                    Progresso
                  </div>
                  <p className="text-2xl font-black text-primary">{student.progress}%</p>
                </div>
              </div>

              <Button className="w-full bg-transparent" variant="outline">
                Ver Detalhes
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredStudents.length === 0 && (
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Users className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-lg font-semibold mb-2">Nenhum aluno encontrado</p>
            <p className="text-sm text-muted-foreground">Tente ajustar sua busca</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
