"use client"

interface SyncQueueItem {
  id: string
  type: "workout" | "progress" | "message" | "photo"
  action: "create" | "update" | "delete"
  data: any
  timestamp: number
  retries: number
}

import { SYNC_CONFIG } from './constants'

export class OfflineSyncService {
  private static instance: OfflineSyncService
  private syncQueue: SyncQueueItem[] = []
  private isOnline: boolean = true
  private isSyncing: boolean = false
  private readonly STORAGE_KEY = SYNC_CONFIG.queueStorageKey
  private readonly MAX_RETRIES = SYNC_CONFIG.maxRetries

  private constructor() {
    if (typeof window !== "undefined") {
      this.isOnline = navigator.onLine
      this.loadQueue()
      this.setupEventListeners()
    }
  }

  static getInstance(): OfflineSyncService {
    if (!OfflineSyncService.instance) {
      OfflineSyncService.instance = new OfflineSyncService()
    }
    return OfflineSyncService.instance
  }

  private setupEventListeners(): void {
    window.addEventListener("online", () => {
      this.isOnline = true
      console.log("🟢 Online - Starting sync...")
      this.processQueue()
    })

    window.addEventListener("offline", () => {
      this.isOnline = false
      console.log("🔴 Offline - Queueing operations...")
    })
  }

  private loadQueue(): void {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY)
      if (stored) {
        this.syncQueue = JSON.parse(stored)
      }
    } catch (error) {
      console.error("Failed to load sync queue:", error)
    }
  }

  private saveQueue(): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.syncQueue))
    } catch (error) {
      console.error("Failed to save sync queue:", error)
    }
  }

  addToQueue(item: Omit<SyncQueueItem, "id" | "timestamp" | "retries">): void {
    const queueItem: SyncQueueItem = {
      ...item,
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now(),
      retries: 0,
    }

    this.syncQueue.push(queueItem)
    this.saveQueue()

    if (this.isOnline) {
      this.processQueue()
    }
  }

  async processQueue(): Promise<void> {
    if (this.isSyncing || !this.isOnline || this.syncQueue.length === 0) {
      return
    }

    this.isSyncing = true

    while (this.syncQueue.length > 0 && this.isOnline) {
      const item = this.syncQueue[0]

      try {
        await this.syncItem(item)
        this.syncQueue.shift() // Remove successful item
        this.saveQueue()
      } catch (error) {
        console.error("Sync failed for item:", item, error)
        item.retries++

        if (item.retries >= this.MAX_RETRIES) {
          console.error("Max retries reached, removing item:", item)
          this.syncQueue.shift()
        } else {
          // Move to end of queue for retry
          this.syncQueue.shift()
          this.syncQueue.push(item)
        }
        this.saveQueue()
        break // Stop processing on error
      }
    }

    this.isSyncing = false
  }

  private async syncItem(item: SyncQueueItem): Promise<void> {
    // Simulate API call - replace with actual API calls
    console.log("Syncing item:", item)

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.1) { // 90% success rate for simulation
          resolve()
        } else {
          reject(new Error("Sync failed"))
        }
      }, 500)
    })
  }

  getQueueStatus(): { pending: number; isOnline: boolean; isSyncing: boolean } {
    return {
      pending: this.syncQueue.length,
      isOnline: this.isOnline,
      isSyncing: this.isSyncing,
    }
  }

  clearQueue(): void {
    this.syncQueue = []
    this.saveQueue()
  }

  // Helper methods for common operations
  async saveWorkoutOffline(workoutData: any): Promise<void> {
    this.addToQueue({
      type: "workout",
      action: "create",
      data: workoutData,
    })
  }

  async updateProgressOffline(progressData: any): Promise<void> {
    this.addToQueue({
      type: "progress",
      action: "update",
      data: progressData,
    })
  }

  async sendMessageOffline(messageData: any): Promise<void> {
    this.addToQueue({
      type: "message",
      action: "create",
      data: messageData,
    })
  }

  async uploadPhotoOffline(photoData: any): Promise<void> {
    this.addToQueue({
      type: "photo",
      action: "create",
      data: photoData,
    })
  }
}

export const offlineSyncService = OfflineSyncService.getInstance()
