import { Metadata } from 'next'
import { WifiOff } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Offline',
  description: 'Você está offline',
}

export default function OfflinePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <WifiOff className="h-24 w-24 text-muted-foreground mb-8" />
      <h1 className="text-4xl font-bold mb-4">Você está offline</h1>
      <p className="text-muted-foreground text-center mb-8 max-w-md">
        Parece que você perdeu a conexão com a internet. Verifique sua conexão e tente novamente.
      </p>
      <Button onClick={() => window.location.reload()}>
        Tentar novamente
      </Button>
    </div>
  )
}
