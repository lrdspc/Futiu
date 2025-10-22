"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Send, Sparkles, Video, Image as ImageIcon } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const motivationalTemplates = [
  "💪 Você está arrasando! Continue assim!",
  "🔥 Mais um treino concluído! Orgulho de você!",
  "⚡ Sua dedicação está fazendo a diferença!",
  "🎯 Foco total! Você está no caminho certo!",
  "🏆 Cada dia mais forte! Parabéns!",
  "✨ Sua evolução é inspiradora!",
]

export function MotivationalMessages() {
  const [message, setMessage] = useState("")
  const [selectedStudent, setSelectedStudent] = useState("")
  const [messageType, setMessageType] = useState<"text" | "video" | "image">("text")

  const students = [
    { id: "1", name: "João Silva" },
    { id: "2", name: "Maria Santos" },
    { id: "3", name: "Pedro Costa" },
  ]

  const handleSend = () => {
    if (!message || !selectedStudent) return
    // Send message logic here
    console.log("Sending:", { message, selectedStudent, messageType })
    setMessage("")
  }

  const useTemplate = (template: string) => {
    setMessage(template)
  }

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-accent" />
          Mensagens Motivacionais
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Aluno</label>
          <Select value={selectedStudent} onValueChange={setSelectedStudent}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione um aluno" />
            </SelectTrigger>
            <SelectContent>
              {students.map((student) => (
                <SelectItem key={student.id} value={student.id}>
                  {student.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Tipo de Mensagem</label>
          <div className="flex gap-2">
            <Button
              variant={messageType === "text" ? "default" : "outline"}
              size="sm"
              onClick={() => setMessageType("text")}
            >
              <Send className="h-4 w-4 mr-2" />
              Texto
            </Button>
            <Button
              variant={messageType === "video" ? "default" : "outline"}
              size="sm"
              onClick={() => setMessageType("video")}
            >
              <Video className="h-4 w-4 mr-2" />
              Vídeo
            </Button>
            <Button
              variant={messageType === "image" ? "default" : "outline"}
              size="sm"
              onClick={() => setMessageType("image")}
            >
              <ImageIcon className="h-4 w-4 mr-2" />
              Imagem
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Templates Rápidos</label>
          <div className="flex flex-wrap gap-2">
            {motivationalTemplates.map((template, idx) => (
              <Badge
                key={idx}
                variant="outline"
                className="cursor-pointer hover:bg-accent/10 hover:border-accent transition-colors"
                onClick={() => useTemplate(template)}
              >
                {template}
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Mensagem</label>
          <Textarea
            placeholder="Digite sua mensagem motivacional..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
          />
        </div>

        <Button
          onClick={handleSend}
          disabled={!message || !selectedStudent}
          className="w-full bg-accent hover:bg-accent/90"
        >
          <Send className="h-4 w-4 mr-2" />
          Enviar Mensagem
        </Button>
      </CardContent>
    </Card>
  )
}
