export const APP_CONFIG = {
  name: 'Personal & Aluno',
  description: 'Plataforma completa para personal trainers e alunos',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
} as const

export const SYNC_CONFIG = {
  maxRetries: 3,
  retryDelay: 1000,
  queueStorageKey: 'offline_sync_queue',
} as const

export const NOTIFICATION_CONFIG = {
  promptDelay: 3000,
  storageKey: 'notification_prompt_seen',
} as const

export const CACHE_KEYS = {
  workouts: 'workouts',
  exercises: 'exercises',
  progress: 'progress',
  messages: 'messages',
} as const
