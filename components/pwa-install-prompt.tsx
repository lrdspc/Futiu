'use client'

import { useState, useEffect } from 'react'
import { Download, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { usePWAInstall } from '@/hooks/use-pwa-install'

export function PWAInstallPrompt() {
  const { isInstallable, promptInstall } = usePWAInstall()
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    const wasDismissed = localStorage.getItem('pwa-install-dismissed')
    if (wasDismissed) setDismissed(true)
  }, [])

  const handleInstall = async () => {
    const installed = await promptInstall()
    if (installed) {
      setDismissed(true)
    }
  }

  const handleDismiss = () => {
    setDismissed(true)
    localStorage.setItem('pwa-install-dismissed', 'true')
  }

  if (!isInstallable || dismissed) return null

  return (
    <Card className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 p-4 shadow-lg z-50 border-primary/20">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Download className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm mb-1">Instalar Personal & Aluno</h3>
          <p className="text-xs text-muted-foreground mb-3">
            Instale o app para acesso rápido e experiência completa offline
          </p>
          <div className="flex gap-2">
            <Button size="sm" onClick={handleInstall} className="flex-1">
              Instalar
            </Button>
            <Button size="sm" variant="ghost" onClick={handleDismiss}>
              Agora não
            </Button>
          </div>
        </div>
        <Button
          size="icon"
          variant="ghost"
          className="flex-shrink-0 h-6 w-6"
          onClick={handleDismiss}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  )
}
