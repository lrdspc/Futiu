"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Image as ImageIcon, ArrowLeftRight } from "lucide-react"
import { getStudentProgressPhotos } from "@/lib/actions/student-details"
import { ProgressPhotoComparison } from "@/components/progress-photo-comparison"

interface StudentProgressPhotosProps {
  studentId: string
}

export function StudentProgressPhotos({ studentId }: StudentProgressPhotosProps) {
  const [photos, setPhotos] = useState<any[]>([])
  const [showComparison, setShowComparison] = useState(false)

  useEffect(() => {
    async function load() {
      const data = await getStudentProgressPhotos(studentId)
      setPhotos(data)
    }
    load()
  }, [studentId])

  if (photos.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center text-muted-foreground">
          <ImageIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>Nenhuma foto de progresso</p>
        </CardContent>
      </Card>
    )
  }

  if (showComparison) {
    return (
      <div>
        <Button variant="outline" onClick={() => setShowComparison(false)} className="mb-4">
          Voltar para Galeria
        </Button>
        <ProgressPhotoComparison photos={photos} />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {photos.length >= 2 && (
        <Button onClick={() => setShowComparison(true)} className="w-full">
          <ArrowLeftRight className="h-4 w-4 mr-2" />
          Comparar Fotos
        </Button>
      )}

      <div className="grid gap-4 md:grid-cols-3">
        {photos.map((photo) => (
          <Card key={photo.id}>
            <CardContent className="p-4 space-y-2">
              <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                <img
                  src={photo.photo_url}
                  alt="Foto de progresso"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-sm">
                <p className="font-semibold">
                  {new Date(photo.taken_at).toLocaleDateString()}
                </p>
                {photo.notes && (
                  <p className="text-muted-foreground text-xs mt-1">{photo.notes}</p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
