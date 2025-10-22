"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Save } from "lucide-react"

interface AssessmentFormProps {
  onSubmit: (data: any) => void
  loading?: boolean
}

export function AssessmentForm({ onSubmit, loading }: AssessmentFormProps) {
  const [data, setData] = useState({
    weight_kg: "",
    body_fat_percentage: "",
    chest_cm: "",
    waist_cm: "",
    hips_cm: "",
    bicep_left_cm: "",
    bicep_right_cm: "",
    thigh_left_cm: "",
    thigh_right_cm: "",
    notes: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      ...data,
      weight_kg: parseFloat(data.weight_kg),
      body_fat_percentage: parseFloat(data.body_fat_percentage),
      chest_cm: parseFloat(data.chest_cm),
      waist_cm: parseFloat(data.waist_cm),
      hips_cm: parseFloat(data.hips_cm),
      bicep_left_cm: parseFloat(data.bicep_left_cm),
      bicep_right_cm: parseFloat(data.bicep_right_cm),
      thigh_left_cm: parseFloat(data.thigh_left_cm),
      thigh_right_cm: parseFloat(data.thigh_right_cm)
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Dados Antropométricos</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="weight">Peso (kg) *</Label>
            <Input
              id="weight"
              type="number"
              step="0.1"
              required
              value={data.weight_kg}
              onChange={(e) => setData({ ...data, weight_kg: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bodyfat">% Gordura Corporal</Label>
            <Input
              id="bodyfat"
              type="number"
              step="0.1"
              value={data.body_fat_percentage}
              onChange={(e) => setData({ ...data, body_fat_percentage: e.target.value })}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Medidas Corporais (cm)</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="chest">Peito</Label>
            <Input
              id="chest"
              type="number"
              step="0.1"
              value={data.chest_cm}
              onChange={(e) => setData({ ...data, chest_cm: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="waist">Cintura</Label>
            <Input
              id="waist"
              type="number"
              step="0.1"
              value={data.waist_cm}
              onChange={(e) => setData({ ...data, waist_cm: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="hips">Quadril</Label>
            <Input
              id="hips"
              type="number"
              step="0.1"
              value={data.hips_cm}
              onChange={(e) => setData({ ...data, hips_cm: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bicep_left">Bíceps Esquerdo</Label>
            <Input
              id="bicep_left"
              type="number"
              step="0.1"
              value={data.bicep_left_cm}
              onChange={(e) => setData({ ...data, bicep_left_cm: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bicep_right">Bíceps Direito</Label>
            <Input
              id="bicep_right"
              type="number"
              step="0.1"
              value={data.bicep_right_cm}
              onChange={(e) => setData({ ...data, bicep_right_cm: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="thigh_left">Coxa Esquerda</Label>
            <Input
              id="thigh_left"
              type="number"
              step="0.1"
              value={data.thigh_left_cm}
              onChange={(e) => setData({ ...data, thigh_left_cm: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="thigh_right">Coxa Direita</Label>
            <Input
              id="thigh_right"
              type="number"
              step="0.1"
              value={data.thigh_right_cm}
              onChange={(e) => setData({ ...data, thigh_right_cm: e.target.value })}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Observações</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={data.notes}
            onChange={(e) => setData({ ...data, notes: e.target.value })}
            placeholder="Observações gerais, objetivos, restrições..."
            rows={4}
          />
        </CardContent>
      </Card>

      <Button type="submit" size="lg" className="w-full" disabled={loading}>
        <Save className="h-4 w-4 mr-2" />
        {loading ? "Salvando..." : "Salvar Avaliação"}
      </Button>
    </form>
  )
}
