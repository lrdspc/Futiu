"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { sendMessage } from "@/lib/actions/messages"
import { useRouter } from "next/navigation"

interface Message {
  id: string
  sender_id: string
  recipient_id: string
  content: string
  created_at: string
  sender: {
    id: string
    full_name: string | null
  }
}

interface ChatInterfaceProps {
  currentUserId: string
  partnerId: string
  partnerName: string
  partnerAvatar: string | null
  initialMessages: Message[]
  userType: "trainer" | "student"
}

/**
 * A chat interface component for messaging between users.
 *
 * This component provides a complete chat interface, including a message display area,
 * an input field for sending messages, and user information for the chat partner. It
 * handles sending messages and refreshing the chat view.
 *
 * @param {object} props - The props for the component.
 * @param {string} props.currentUserId - The ID of the current user.
 * @param {string} props.partnerId - The ID of the chat partner.
 * @param {string} props.partnerName - The name of the chat partner.
 * @param {string | null} props.partnerAvatar - The avatar URL of the chat partner.
 * @param {Message[]} props.initialMessages - An array of initial messages to display.
 * @param {"trainer" | "student"} props.userType - The type of the current user.
 * @returns {JSX.Element} The chat interface component.
 */
export function ChatInterface({
  currentUserId,
  partnerId,
  partnerName,
  partnerAvatar,
  initialMessages,
  userType,
}: ChatInterfaceProps) {
  const [messageInput, setMessageInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSendMessage = async () => {
    if (messageInput.trim() && !isLoading) {
      setIsLoading(true)
      try {
        await sendMessage(partnerId, messageInput)
        setMessageInput("")
        router.refresh()
      } catch (error) {
        console.error("Error sending message:", error)
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-black text-balance">Mensagens</h2>
        <p className="text-muted-foreground">
          {userType === "student" ? "Converse com seu personal trainer" : "Converse com seu aluno"}
        </p>
      </div>

      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader className="border-b border-border/50">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border-2 border-primary/20">
              <AvatarImage src={partnerAvatar || "/placeholder.svg"} />
              <AvatarFallback className="bg-primary/10 text-primary font-bold">{partnerName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">{partnerName}</CardTitle>
              <CardDescription className="text-xs">
                {userType === "student" ? "Personal Trainer" : "Aluno"}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[calc(100vh-24rem)] p-4">
            <div className="space-y-4">
              {initialMessages.length > 0 ? (
                initialMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender_id === currentUserId ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg p-3 ${
                        message.sender_id === currentUserId
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-foreground"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p
                        className={`text-xs mt-1 ${
                          message.sender_id === currentUserId ? "text-primary-foreground/70" : "text-muted-foreground"
                        }`}
                      >
                        {new Date(message.created_at).toLocaleTimeString("pt-BR", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Nenhuma mensagem ainda. Comece a conversa!</p>
                </div>
              )}
            </div>
          </ScrollArea>
          <div className="border-t border-border/50 p-4">
            <div className="flex gap-2">
              <Input
                placeholder="Digite sua mensagem..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSendMessage()}
                disabled={isLoading}
              />
              <Button onClick={handleSendMessage} disabled={isLoading} className="bg-primary hover:bg-primary/90">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
