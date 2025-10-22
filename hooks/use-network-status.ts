'use client'

import { useState, useEffect } from 'react'

export function useNetworkStatus() {
  const [isOnline, setIsOnline] = useState(true)
  const [effectiveType, setEffectiveType] = useState<string>('4g')

  useEffect(() => {
    setIsOnline(navigator.onLine)

    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection
    if (connection) {
      setEffectiveType(connection.effectiveType || '4g')
    }

    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)
    const handleConnectionChange = () => {
      if (connection) {
        setEffectiveType(connection.effectiveType || '4g')
      }
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    connection?.addEventListener('change', handleConnectionChange)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
      connection?.removeEventListener('change', handleConnectionChange)
    }
  }, [])

  return { isOnline, effectiveType }
}
