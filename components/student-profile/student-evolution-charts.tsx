"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { getStudentMeasurements } from "@/lib/actions/student-details"

interface StudentEvolutionChartsProps {
  studentId: string
}

export function StudentEvolutionCharts({ studentId }: StudentEvolutionChartsProps) {
  const [measurements, setMeasurements] = useState<any[]>([])

  useEffect(() => {
    async function load() {
      const data = await getStudentMeasurements(studentId)
      setMeasurements(data)
    }
    load()
  }, [studentId])

  const weightData = measurements.map(m => ({
    date: new Date(m.measured_at).toLocaleDateString('pt-BR', { month: 'short', day: 'numeric' }),
    weight: m.weight_kg
  }))

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Evolução de Peso</CardTitle>
        </CardHeader>
        <CardContent>
          {weightData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weightData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="weight" stroke="hsl(var(--primary))" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-muted-foreground">
              Sem dados de medições
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Última Medição</CardTitle>
          </CardHeader>
          <CardContent>
            {measurements[0] ? (
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Peso:</span>
                  <span className="font-semibold">{measurements[0].weight_kg} kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">% Gordura:</span>
                  <span className="font-semibold">{measurements[0].body_fat_percentage}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Peito:</span>
                  <span className="font-semibold">{measurements[0].chest_cm} cm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Cintura:</span>
                  <span className="font-semibold">{measurements[0].waist_cm} cm</span>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground">Sem medições registradas</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Progresso</CardTitle>
          </CardHeader>
          <CardContent>
            {measurements.length >= 2 ? (
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Peso:</span>
                  <span className={`font-semibold ${measurements[0].weight_kg < measurements[measurements.length - 1].weight_kg ? 'text-green-500' : 'text-red-500'}`}>
                    {(measurements[0].weight_kg - measurements[measurements.length - 1].weight_kg).toFixed(1)} kg
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Gordura:</span>
                  <span className={`font-semibold ${measurements[0].body_fat_percentage < measurements[measurements.length - 1].body_fat_percentage ? 'text-green-500' : 'text-red-500'}`}>
                    {(measurements[0].body_fat_percentage - measurements[measurements.length - 1].body_fat_percentage).toFixed(1)}%
                  </span>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground">Necessário pelo menos 2 medições</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
