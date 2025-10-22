'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeftRight } from 'lucide-react'

interface ProgressPhoto {
  id: string
  url: string
  date: string
}

interface ProgressPhotoComparisonProps {
  photos: ProgressPhoto[]
}

export function ProgressPhotoComparison({ photos }: ProgressPhotoComparisonProps) {
  if (photos.length < 2) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ArrowLeftRight className="h-5 w-5" />
            Comparação de Fotos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Adicione pelo menos 2 fotos para ver a comparação
          </p>
        </CardContent>
      </Card>
    )
  }

  const firstPhoto = photos[0]
  const lastPhoto = photos[photos.length - 1]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ArrowLeftRight className="h-5 w-5" />
          Comparação de Progresso
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <h4 className="font-medium">Antes</h4>
            <div className="aspect-square rounded-lg overflow-hidden bg-muted">
              <img
                src={firstPhoto.url}
                alt="Foto inicial"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-sm text-muted-foreground">{firstPhoto.date}</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium">Depois</h4>
            <div className="aspect-square rounded-lg overflow-hidden bg-muted">
              <img
                src={lastPhoto.url}
                alt="Foto atual"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-sm text-muted-foreground">{lastPhoto.date}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}