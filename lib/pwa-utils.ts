export function isPWA(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(display-mode: standalone)').matches ||
    (window.navigator as any).standalone === true ||
    document.referrer.includes('android-app://')
}

export function isInstallable(): boolean {
  if (typeof window === 'undefined') return false
  return 'BeforeInstallPromptEvent' in window
}

export async function shareContent(data: ShareData): Promise<boolean> {
  if (typeof navigator === 'undefined' || !navigator.share) return false
  
  try {
    await navigator.share(data)
    return true
  } catch (error) {
    if ((error as Error).name !== 'AbortError') {
      console.error('Share failed:', error)
    }
    return false
  }
}

export async function requestPersistentStorage(): Promise<boolean> {
  if (typeof navigator === 'undefined' || !navigator.storage?.persist) return false
  
  try {
    const isPersisted = await navigator.storage.persist()
    return isPersisted
  } catch (error) {
    console.error('Persistent storage request failed:', error)
    return false
  }
}

export async function getStorageEstimate(): Promise<StorageEstimate | null> {
  if (typeof navigator === 'undefined' || !navigator.storage?.estimate) return null
  
  try {
    return await navigator.storage.estimate()
  } catch (error) {
    console.error('Storage estimate failed:', error)
    return null
  }
}

export function addToHomeScreen(deferredPrompt: any): Promise<boolean> {
  return new Promise((resolve) => {
    if (!deferredPrompt) {
      resolve(false)
      return
    }

    deferredPrompt.prompt()
    deferredPrompt.userChoice.then((choiceResult: any) => {
      resolve(choiceResult.outcome === 'accepted')
    })
  })
}

export function detectPWADisplayMode(): 'browser' | 'standalone' | 'minimal-ui' | 'fullscreen' {
  if (typeof window === 'undefined') return 'browser'
  
  if (window.matchMedia('(display-mode: fullscreen)').matches) return 'fullscreen'
  if (window.matchMedia('(display-mode: standalone)').matches) return 'standalone'
  if (window.matchMedia('(display-mode: minimal-ui)').matches) return 'minimal-ui'
  return 'browser'
}

export async function checkForUpdates(): Promise<boolean> {
  if (typeof navigator === 'undefined' || !navigator.serviceWorker) return false
  
  try {
    const registration = await navigator.serviceWorker.getRegistration()
    if (!registration) return false
    
    await registration.update()
    return true
  } catch (error) {
    console.error('Update check failed:', error)
    return false
  }
}
