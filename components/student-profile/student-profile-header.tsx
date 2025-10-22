"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Phone, Calendar, Edit, FileText, Dumbbell, MessageSquare } from "lucide-react"
import Link from "next/link"

interface StudentProfileHeaderProps {
  student: any
}

export function StudentProfileHeader({ student }: StudentProfileHeaderProps) {
  const user = student.user

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <Avatar className="h-24 w-24 border-4 border-primary/20">
            <AvatarImage src={user?.avatar_url} />
            <AvatarFallback className="text-2xl font-bold bg-primary/10 text-primary">
              {user?.full_name?.charAt(0)}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 space-y-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-black">{user?.full_name}</h1>
                <Badge variant={student.status === "active" ? "default" : "secondary"}>
                  {student.status === "active" ? "Ativo" : "Inativo"}
                </Badge>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Mail className="h-4 w-4" />
                  {user?.email}
                </span>
                {student.phone && (
                  <span className="flex items-center gap-1">
                    <Phone className="h-4 w-4" />
                    {student.phone}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Desde {new Date(student.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button size="sm" variant="outline" asChild>
                <Link href={`/dashboard/trainer/students/${student.id}/assessment`}>
                  <FileText className="h-4 w-4 mr-2" />
                  Nova Avaliação
                </Link>
              </Button>
              <Button size="sm" variant="outline" asChild>
                <Link href="/dashboard/trainer/workouts/builder">
                  <Dumbbell className="h-4 w-4 mr-2" />
                  Criar Treino
                </Link>
              </Button>
              <Button size="sm" variant="outline" asChild>
                <Link href="/dashboard/trainer/messages">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Enviar Mensagem
                </Link>
              </Button>
              <Button size="sm" variant="outline">
                <Edit className="h-4 w-4 mr-2" />
                Editar Dados
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
