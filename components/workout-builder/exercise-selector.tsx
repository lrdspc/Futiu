"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Plus } from "lucide-react"
import { exerciseDatabase } from "@/lib/exercises"
import { ScrollArea } from "@/components/ui/scroll-area"

interface ExerciseSelectorProps {
  onSelect: (exercise: any) => void
}

export function ExerciseSelector({ onSelect }: ExerciseSelectorProps) {
  const [search, setSearch] = useState("")

  const filtered = exerciseDatabase.filter(ex =>
    ex.name.toLowerCase().includes(search.toLowerCase()) ||
    ex.muscleGroups.some(m => m.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <Card className="sticky top-6">
      <CardHeader>
        <CardTitle className="text-lg">Adicionar Exercícios</CardTitle>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar exercícios..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px] pr-4">
          <div className="space-y-2">
            {filtered.map((exercise) => (
              <div
                key={exercise.id}
                className="p-3 rounded-lg border border-border/50 hover:border-primary/50 transition-colors"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex-1">
                    <p className="font-semibold text-sm leading-tight">{exercise.name}</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {exercise.muscleGroups.slice(0, 2).map((muscle, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {muscle}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-8 w-8 p-0"
                    onClick={() => onSelect(exercise)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
