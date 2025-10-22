"use client"

import { useEffect, useState } from "react"
import { notificationService } from "@/lib/notifications"

export function useNotifications() {
  const [permission, setPermission] = useState<NotificationPermission>("default")
  const [isSupported, setIsSupported] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined" && "Notification" in window) {
      setIsSupported(true)
      setPermission(Notification.permission)
    }
  }, [])

  const requestPermission = async () => {
    const granted = await notificationService.requestPermission()
    if (granted) {
      setPermission("granted")
    }
    return granted
  }

  const sendNotification = async (title: string, body: string, options?: any) => {
    await notificationService.sendNotification({
      title,
      body,
      ...options,
    })
  }

  return {
    permission,
    isSupported,
    requestPermission,
    sendNotification,
    notifyWorkoutReminder: notificationService.notifyWorkoutReminder.bind(notificationService),
    notifyMotivationalMessage: notificationService.notifyMotivationalMessage.bind(notificationService),
    notifyWorkoutCompleted: notificationService.notifyWorkoutCompleted.bind(notificationService),
    notifyAchievementUnlocked: notificationService.notifyAchievementUnlocked.bind(notificationService),
    notifyNewMessage: notificationService.notifyNewMessage.bind(notificationService),
    notifyWorkoutAdjusted: notificationService.notifyWorkoutAdjusted.bind(notificationService),
  }
}
