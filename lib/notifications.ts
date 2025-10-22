"use client"

export interface NotificationConfig {
  title: string
  body: string
  icon?: string
  badge?: string
  tag?: string
  data?: any
}

export class NotificationService {
  private static instance: NotificationService
  private permission: NotificationPermission = "default"

  private constructor() {
    if (typeof window !== "undefined" && "Notification" in window) {
      this.permission = Notification.permission
    }
  }

  static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService()
    }
    return NotificationService.instance
  }

  async requestPermission(): Promise<boolean> {
    if (!("Notification" in window)) {
      console.warn("Notifications not supported")
      return false
    }

    if (this.permission === "granted") {
      return true
    }

    const permission = await Notification.requestPermission()
    this.permission = permission
    return permission === "granted"
  }

  async sendNotification(config: NotificationConfig): Promise<void> {
    if (this.permission !== "granted") {
      const granted = await this.requestPermission()
      if (!granted) return
    }

    if ("serviceWorker" in navigator && navigator.serviceWorker.controller) {
      // Use service worker for better offline support
      navigator.serviceWorker.ready.then((registration) => {
        registration.showNotification(config.title, {
          body: config.body,
          icon: config.icon || "/icon-192.jpg",
          badge: config.badge || "/icon-192.jpg",
          tag: config.tag,
          data: config.data,
          vibrate: [200, 100, 200],
        })
      })
    } else {
      // Fallback to regular notification
      new Notification(config.title, {
        body: config.body,
        icon: config.icon || "/icon-192.jpg",
        tag: config.tag,
        data: config.data,
      })
    }
  }

  // Predefined notifications
  async notifyWorkoutReminder(workoutName: string): Promise<void> {
    await this.sendNotification({
      title: "🏋️ Hora do Treino!",
      body: `Seu treino "${workoutName}" está esperando por você!`,
      tag: "workout-reminder",
    })
  }

  async notifyMotivationalMessage(message: string, from: string): Promise<void> {
    await this.sendNotification({
      title: `💪 Mensagem de ${from}`,
      body: message,
      tag: "motivational-message",
    })
  }

  async notifyWorkoutCompleted(workoutName: string): Promise<void> {
    await this.sendNotification({
      title: "🎉 Treino Concluído!",
      body: `Parabéns! Você completou o treino "${workoutName}"`,
      tag: "workout-completed",
    })
  }

  async notifyAchievementUnlocked(achievement: string): Promise<void> {
    await this.sendNotification({
      title: "🏆 Nova Conquista!",
      body: `Você desbloqueou: ${achievement}`,
      tag: "achievement",
    })
  }

  async notifyNewMessage(from: string, preview: string): Promise<void> {
    await this.sendNotification({
      title: `💬 Nova mensagem de ${from}`,
      body: preview,
      tag: "new-message",
    })
  }

  async notifyWorkoutAdjusted(workoutName: string): Promise<void> {
    await this.sendNotification({
      title: "⚡ Treino Ajustado",
      body: `Seu personal ajustou o treino "${workoutName}"`,
      tag: "workout-adjusted",
    })
  }
}

export const notificationService = NotificationService.getInstance()
