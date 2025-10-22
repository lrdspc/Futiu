const CACHE_VERSION = 'v2'
const CACHE_NAME = `personal-aluno-${CACHE_VERSION}`
const RUNTIME_CACHE = `runtime-${CACHE_VERSION}`
const IMAGE_CACHE = `images-${CACHE_VERSION}`

const PRECACHE_URLS = [
  '/',
  '/manifest.webmanifest',
  '/icon-192.jpg',
  '/icon-512.jpg',
]

const CACHE_STRATEGIES = {
  cacheFirst: ['image', 'font', 'style'],
  networkFirst: ['document', 'script'],
  staleWhileRevalidate: ['fetch']
}

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(key => key.startsWith('personal-aluno-') && key !== CACHE_NAME)
          .map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  )
})

self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  if (request.method !== 'GET') return

  if (url.origin !== location.origin) {
    if (request.destination === 'image') {
      event.respondWith(cacheFirstStrategy(request, IMAGE_CACHE))
    }
    return
  }

  if (request.destination === 'image') {
    event.respondWith(cacheFirstStrategy(request, IMAGE_CACHE))
  } else if (request.destination === 'document') {
    event.respondWith(networkFirstStrategy(request, RUNTIME_CACHE))
  } else {
    event.respondWith(staleWhileRevalidateStrategy(request, RUNTIME_CACHE))
  }
})

async function cacheFirstStrategy(request, cacheName) {
  const cache = await caches.open(cacheName)
  const cached = await cache.match(request)
  if (cached) return cached

  try {
    const response = await fetch(request)
    if (response.ok) cache.put(request, response.clone())
    return response
  } catch (error) {
    return new Response('Offline', { status: 503 })
  }
}

async function networkFirstStrategy(request, cacheName) {
  const cache = await caches.open(cacheName)
  try {
    const response = await fetch(request)
    if (response.ok) cache.put(request, response.clone())
    return response
  } catch (error) {
    const cached = await cache.match(request)
    return cached || new Response('Offline', { status: 503 })
  }
}

async function staleWhileRevalidateStrategy(request, cacheName) {
  const cache = await caches.open(cacheName)
  const cached = await cache.match(request)

  const fetchPromise = fetch(request).then(response => {
    if (response.ok) cache.put(request, response.clone())
    return response
  })

  return cached || fetchPromise
}

self.addEventListener('message', (event) => {
  if (event.data?.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
  if (event.data?.type === 'CACHE_URLS') {
    event.waitUntil(
      caches.open(CACHE_NAME)
        .then(cache => cache.addAll(event.data.urls))
    )
  }
})

self.addEventListener('push', (event) => {
  const data = event.data?.json() ?? {}
  const options = {
    body: data.body || 'Nova notificação',
    icon: '/icon-192.jpg',
    badge: '/icon-192.jpg',
    vibrate: [200, 100, 200],
    data: data.data || {},
    actions: data.actions || [],
    tag: data.tag || 'default',
    requireInteraction: data.requireInteraction || false,
  }

  event.waitUntil(
    self.registration.showNotification(data.title || 'Personal & Aluno', options)
  )
})

self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  
  const urlToOpen = event.notification.data?.url || '/'
  
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then(windowClients => {
        for (const client of windowClients) {
          if (client.url === urlToOpen && 'focus' in client) {
            return client.focus()
          }
        }
        if (clients.openWindow) {
          return clients.openWindow(urlToOpen)
        }
      })
  )
})

self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-workouts') {
    event.waitUntil(syncWorkouts())
  }
})

async function syncWorkouts() {
  const cache = await caches.open('sync-queue')
  const requests = await cache.keys()
  
  return Promise.all(
    requests.map(async (request) => {
      try {
        await fetch(request.clone())
        await cache.delete(request)
      } catch (error) {
        console.error('Sync failed:', error)
      }
    })
  )
}
