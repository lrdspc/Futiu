"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Trophy, Star } from "lucide-react"

interface WorkoutCompletionScreenProps {
  onComplete: (feedback: { rating: number; notes: string }) => void
}

export function WorkoutCompletionScreen({ onComplete }: WorkoutCompletionScreenProps) {
  const [rating, setRating] = useState("3")
  const [notes, setNotes] = useState("")

  const handleSubmit = () => {
    onComplete({ rating: parseInt(rating), notes })
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-accent/20 to-background flex items-center justify-center z-50 p-4">
      <div className="max-w-md w-full space-y-6 text-center">
        <div className="space-y-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 rounded-full bg-accent/20 animate-ping"></div>
            </div>
            <Trophy className="h-24 w-24 text-accent mx-auto relative z-10" />
          </div>
          
          <div>
            <h1 className="text-4xl font-black mb-2">Parabéns! 🎉</h1>
            <p className="text-lg text-muted-foreground">Você arrasou no treino de hoje!</p>
          </div>
        </div>

        <div className="space-y-4 text-left bg-card/50 backdrop-blur-sm p-6 rounded-lg border border-border/50">
          <div className="space-y-3">
            <Label>Como foi o treino?</Label>
            <RadioGroup value={rating} onValueChange={setRating}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="1" id="r1" />
                <Label htmlFor="r1" className="flex items-center gap-1 cursor-pointer">
                  <Star className="h-4 w-4" /> Muito Fácil
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="2" id="r2" />
                <Label htmlFor="r2" className="flex items-center gap-1 cursor-pointer">
                  <Star className="h-4 w-4" /> Fácil
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="3" id="r3" />
                <Label htmlFor="r3" className="flex items-center gap-1 cursor-pointer">
                  <Star className="h-4 w-4" /> Moderado
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="4" id="r4" />
                <Label htmlFor="r4" className="flex items-center gap-1 cursor-pointer">
                  <Star className="h-4 w-4" /> Difícil
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="5" id="r5" />
                <Label htmlFor="r5" className="flex items-center gap-1 cursor-pointer">
                  <Star className="h-4 w-4" /> Muito Difícil
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label>Observações (opcional)</Label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Como você se sentiu? Alguma dificuldade?"
              rows={3}
            />
          </div>
        </div>

        <Button onClick={handleSubmit} size="lg" className="w-full bg-accent hover:bg-accent/90">
          Finalizar Treino
        </Button>
      </div>
    </div>
  )
}
