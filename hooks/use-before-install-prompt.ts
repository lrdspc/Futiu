'use client'

import { useState, useEffect } from 'react'

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export function useBeforeInstallPrompt() {
  const [prompt, setPrompt] = useState<BeforeInstallPromptEvent | null>(null)

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault()
      setPrompt(e as BeforeInstallPromptEvent)
    }

    window.addEventListener('beforeinstallprompt', handler)

    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const promptToInstall = async () => {
    if (!prompt) return false
    
    await prompt.prompt()
    const { outcome } = await prompt.userChoice
    
    if (outcome === 'accepted') {
      setPrompt(null)
    }
    
    return outcome === 'accepted'
  }

  return [prompt, promptToInstall] as const
}
