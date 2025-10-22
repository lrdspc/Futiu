"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bell, X } from "lucide-react"
import { useNotifications } from "@/hooks/use-notifications"

export function NotificationPrompt() {
  const [show, setShow] = useState(false)
  const { permission, isSupported, requestPermission } = useNotifications()

  useEffect(() => {
    // Show prompt if notifications are supported and not yet granted/denied
    if (isSupported && permission === "default") {
      const hasSeenPrompt = localStorage.getItem("notification_prompt_seen")
      if (!hasSeenPrompt) {
        setTimeout(() => setShow(true), 3000) // Show after 3 seconds
      }
    }
  }, [isSupported, permission])

  const handleEnable = async () => {
    const granted = await requestPermission()
    if (granted) {
      localStorage.setItem("notification_prompt_seen", "true")
      setShow(false)
    }
  }

  const handleDismiss = () => {
    localStorage.setItem("notification_prompt_seen", "true")
    setShow(false)
  }

  if (!show || !isSupported || permission !== "default") {
    return null
  }

  return (
    <div className="fixed bottom-20 right-4 z-50 max-w-sm animate-slide-up">
      <Card className="border-2 border-accent/20 bg-gradient-to-br from-accent/10 to-transparent backdrop-blur-lg shadow-2xl">
        <CardHeader className="relative pb-3">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 h-6 w-6"
            onClick={handleDismiss}
          >
            <X className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-accent/10">
              <Bell className="h-5 w-5 text-accent" />
            </div>
            <div>
              <CardTitle className="text-lg">Ative as Notificações</CardTitle>
              <CardDescription className="text-xs">Receba lembretes de treinos e mensagens</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3 pt-0">
          <p className="text-sm text-muted-foreground">
            Fique por dentro dos seus treinos, conquistas e mensagens do seu personal trainer.
          </p>
          <div className="flex gap-2">
            <Button onClick={handleEnable} className="flex-1 bg-accent hover:bg-accent/90">
              Ativar
            </Button>
            <Button onClick={handleDismiss} variant="outline" className="flex-1">
              Agora não
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
