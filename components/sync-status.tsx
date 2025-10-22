"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Wifi, WifiOff, RefreshCw, CheckCircle2 } from "lucide-react"
import { offlineSyncService } from "@/lib/offline-sync"

export function SyncStatus() {
  const [status, setStatus] = useState({
    pending: 0,
    isOnline: true,
    isSyncing: false,
  })

  useEffect(() => {
    const updateStatus = () => {
      setStatus(offlineSyncService.getQueueStatus())
    }

    updateStatus()
    const interval = setInterval(updateStatus, 2000)

    return () => clearInterval(interval)
  }, [])

  if (status.isOnline && status.pending === 0 && !status.isSyncing) {
    return null // Don't show when everything is synced
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-slide-up">
      <Badge
        variant={status.isOnline ? "default" : "destructive"}
        className="px-4 py-2 text-sm font-medium shadow-lg"
      >
        {!status.isOnline && (
          <>
            <WifiOff className="h-4 w-4 mr-2" />
            Modo Offline
          </>
        )}
        {status.isOnline && status.isSyncing && (
          <>
            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            Sincronizando...
          </>
        )}
        {status.isOnline && !status.isSyncing && status.pending > 0 && (
          <>
            <RefreshCw className="h-4 w-4 mr-2" />
            {status.pending} pendente{status.pending > 1 ? "s" : ""}
          </>
        )}
      </Badge>
    </div>
  )
}
