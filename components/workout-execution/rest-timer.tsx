"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { X, SkipForward } from "lucide-react"

interface RestTimerProps {
  seconds: number
  onComplete: () => void
  onSkip: () => void
}

export function RestTimer({ seconds, onComplete, onSkip }: RestTimerProps) {
  const [remaining, setRemaining] = useState(seconds)

  useEffect(() => {
    if (remaining <= 0) {
      onComplete()
      return
    }

    const timer = setInterval(() => {
      setRemaining(r => r - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [remaining, onComplete])

  const progress = ((seconds - remaining) / seconds) * 100

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center">
      <Card className="p-8 max-w-sm w-full mx-4 text-center space-y-6">
        <div className="relative w-48 h-48 mx-auto">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="96"
              cy="96"
              r="88"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-muted"
            />
            <circle
              cx="96"
              cy="96"
              r="88"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 88}`}
              strokeDashoffset={`${2 * Math.PI * 88 * (1 - progress / 100)}`}
              className="text-accent transition-all duration-1000"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div>
              <p className="text-6xl font-black">{remaining}</p>
              <p className="text-sm text-muted-foreground">segundos</p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-1">Descanso</h3>
          <p className="text-sm text-muted-foreground">Prepare-se para a próxima série</p>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={onSkip} className="flex-1">
            <SkipForward className="h-4 w-4 mr-2" />
            Pular
          </Button>
          <Button variant="ghost" onClick={onComplete}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </Card>
    </div>
  )
}
