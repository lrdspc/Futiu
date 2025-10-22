# 📦 Exemplos de Uso dos Componentes

## 🆕 Novos Componentes Implementados

### 1. ProgressPhotoComparison

Componente para upload e comparação de fotos de progresso.

```tsx
import { ProgressPhotoComparison } from "@/components/progress-photo-comparison"

export default function ProgressPage() {
  return (
    <div>
      <ProgressPhotoComparison />
    </div>
  )
}
```

**Funcionalidades:**
- Upload de fotos
- Modo comparação lado a lado
- Seleção de 2 fotos
- Visualização de data e peso
- Galeria organizada

---

### 2. MotivationalMessages

Sistema de mensagens motivacionais para personal trainers.

```tsx
import { MotivationalMessages } from "@/components/motivational-messages"

export default function TrainerDashboard() {
  return (
    <div>
      <MotivationalMessages />
    </div>
  )
}
```

**Funcionalidades:**
- Templates rápidos
- Seleção de aluno
- Tipos: texto, vídeo, imagem
- Envio instantâneo

---

### 3. WorkoutRealtimeAdjust

Ajuste de treinos em tempo real.

```tsx
import { WorkoutRealtimeAdjust } from "@/components/workout-realtime-adjust"

export default function TrainerDashboard() {
  return (
    <div>
      <WorkoutRealtimeAdjust 
        workoutId="workout-123" 
        studentId="student-456" 
      />
    </div>
  )
}
```

**Props:**
- `workoutId`: ID do treino
- `studentId`: ID do aluno

**Funcionalidades:**
- Ajustar séries, reps, descanso
- Adicionar observações
- Histórico de ajustes
- Notificação automática

---

### 4. SyncStatus

Indicador de status de sincronização offline.

```tsx
import { SyncStatus } from "@/components/sync-status"

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <SyncStatus />
      </body>
    </html>
  )
}
```

**Estados:**
- 🔴 Offline
- 🔄 Sincronizando
- ✅ Sincronizado (oculto)
- Mostra quantidade de itens pendentes

---

### 5. NotificationPrompt

Prompt elegante para solicitar permissão de notificações.

```tsx
import { NotificationPrompt } from "@/components/notification-prompt"

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <NotificationPrompt />
      </body>
    </html>
  )
}
```

**Comportamento:**
- Aparece após 3 segundos
- Apenas se notificações não foram configuradas
- Pode ser dispensado
- Salva preferência no localStorage

---

## 🔧 Serviços e Hooks

### NotificationService

Serviço para gerenciar notificações push.

```tsx
import { notificationService } from "@/lib/notifications"

// Solicitar permissão
await notificationService.requestPermission()

// Enviar notificação customizada
await notificationService.sendNotification({
  title: "Título",
  body: "Mensagem",
  icon: "/icon.png",
  tag: "unique-tag"
})

// Notificações predefinidas
await notificationService.notifyWorkoutReminder("Treino A")
await notificationService.notifyMotivationalMessage("Você consegue!", "Personal")
await notificationService.notifyWorkoutCompleted("Treino A")
await notificationService.notifyAchievementUnlocked("10 Treinos")
await notificationService.notifyNewMessage("Personal", "Ótimo trabalho!")
await notificationService.notifyWorkoutAdjusted("Treino A")
```

---

### OfflineSyncService

Serviço para sincronização offline.

```tsx
import { offlineSyncService } from "@/lib/offline-sync"

// Adicionar à fila de sincronização
offlineSyncService.addToQueue({
  type: "workout",
  action: "create",
  data: workoutData
})

// Métodos auxiliares
await offlineSyncService.saveWorkoutOffline(workoutData)
await offlineSyncService.updateProgressOffline(progressData)
await offlineSyncService.sendMessageOffline(messageData)
await offlineSyncService.uploadPhotoOffline(photoData)

// Verificar status
const status = offlineSyncService.getQueueStatus()
// { pending: 3, isOnline: true, isSyncing: false }

// Processar fila manualmente
await offlineSyncService.processQueue()

// Limpar fila
offlineSyncService.clearQueue()
```

---

### useNotifications Hook

Hook para usar notificações em componentes.

```tsx
import { useNotifications } from "@/hooks/use-notifications"

export default function MyComponent() {
  const {
    permission,
    isSupported,
    requestPermission,
    sendNotification,
    notifyWorkoutReminder,
    notifyMotivationalMessage,
    notifyWorkoutCompleted,
    notifyAchievementUnlocked,
    notifyNewMessage,
    notifyWorkoutAdjusted
  } = useNotifications()

  const handleNotify = async () => {
    if (permission !== "granted") {
      await requestPermission()
    }
    
    await sendNotification("Título", "Mensagem")
  }

  return (
    <div>
      {isSupported && permission === "default" && (
        <button onClick={requestPermission}>
          Ativar Notificações
        </button>
      )}
    </div>
  )
}
```

---

## 🎯 Exemplos de Integração

### Exemplo 1: Completar Treino com Notificações

```tsx
import { useNotifications } from "@/hooks/use-notifications"
import { offlineSyncService } from "@/lib/offline-sync"
import { useToast } from "@/hooks/use-toast"

export default function WorkoutPage() {
  const { notifyWorkoutCompleted, notifyAchievementUnlocked } = useNotifications()
  const { toast } = useToast()

  const handleCompleteWorkout = async () => {
    // Salvar offline
    await offlineSyncService.saveWorkoutOffline({
      workoutId: "123",
      completedAt: new Date().toISOString(),
      exercises: exerciseData
    })

    // Toast de sucesso
    toast({
      title: "🎉 Treino Concluído!",
      description: "Parabéns pelo esforço!"
    })

    // Notificação
    await notifyWorkoutCompleted("Treino A")

    // Verificar conquistas
    const totalWorkouts = 10
    if (totalWorkouts === 10) {
      await notifyAchievementUnlocked("10 Treinos Completados")
    }
  }

  return (
    <button onClick={handleCompleteWorkout}>
      Finalizar Treino
    </button>
  )
}
```

---

### Exemplo 2: Enviar Mensagem Motivacional

```tsx
import { MotivationalMessages } from "@/components/motivational-messages"
import { useNotifications } from "@/hooks/use-notifications"

export default function TrainerDashboard() {
  const { notifyMotivationalMessage } = useNotifications()

  const handleSendMessage = async (studentId: string, message: string) => {
    // Enviar para backend
    await sendMessageToBackend(studentId, message)

    // Notificar aluno
    await notifyMotivationalMessage(message, "Seu Personal")
  }

  return (
    <div>
      <MotivationalMessages />
    </div>
  )
}
```

---

### Exemplo 3: Ajustar Treino em Tempo Real

```tsx
import { WorkoutRealtimeAdjust } from "@/components/workout-realtime-adjust"
import { useNotifications } from "@/hooks/use-notifications"

export default function TrainerDashboard() {
  const { notifyWorkoutAdjusted } = useNotifications()

  const handleAdjustWorkout = async (workoutId: string, adjustments: any) => {
    // Salvar ajustes no backend
    await saveAdjustments(workoutId, adjustments)

    // Notificar aluno
    await notifyWorkoutAdjusted("Treino A")
  }

  return (
    <div>
      <WorkoutRealtimeAdjust 
        workoutId="123" 
        studentId="456"
      />
    </div>
  )
}
```

---

### Exemplo 4: Upload de Foto com Sincronização

```tsx
import { ProgressPhotoComparison } from "@/components/progress-photo-comparison"
import { offlineSyncService } from "@/lib/offline-sync"

export default function ProgressPage() {
  const handlePhotoUpload = async (file: File) => {
    // Converter para base64 ou URL
    const photoData = {
      file: file,
      date: new Date().toISOString(),
      weight: 75
    }

    // Adicionar à fila de sincronização
    await offlineSyncService.uploadPhotoOffline(photoData)
  }

  return (
    <div>
      <ProgressPhotoComparison />
    </div>
  )
}
```

---

## 🎨 Customização

### Personalizar Cores das Notificações

```tsx
// Em globals.css
:root {
  --notification-success: oklch(0.68 0.24 145);
  --notification-info: oklch(0.75 0.25 195);
  --notification-warning: oklch(0.7 0.2 85);
}
```

### Personalizar Templates de Mensagens

```tsx
// Em motivational-messages.tsx
const motivationalTemplates = [
  "💪 Sua mensagem customizada!",
  "🔥 Outra mensagem!",
  // Adicione mais...
]
```

### Personalizar Tempo de Sincronização

```tsx
// Em offline-sync.ts
const SYNC_INTERVAL = 5000 // 5 segundos
const MAX_RETRIES = 5 // 5 tentativas
```

---

## 📱 Testando Funcionalidades

### Testar Modo Offline
1. Abra DevTools (F12)
2. Vá para Network tab
3. Selecione "Offline"
4. Execute ações na plataforma
5. Volte para "Online"
6. Observe sincronização automática

### Testar Notificações
1. Abra em HTTPS ou localhost
2. Permita notificações quando solicitado
3. Complete um treino
4. Observe notificação do sistema

### Testar Comparação de Fotos
1. Vá para Progresso → Fotos
2. Faça upload de 2+ fotos
3. Clique em "Comparar"
4. Selecione 2 fotos
5. Visualize comparação lado a lado

---

## 🚀 Próximas Melhorias Sugeridas

1. **Integração Backend**
   - Conectar todos os componentes ao Supabase
   - Real-time subscriptions
   - Storage para fotos

2. **Service Worker**
   - Cache avançado
   - Background sync
   - Push notifications nativas

3. **Analytics**
   - Tracking de eventos
   - Métricas de uso
   - Relatórios

4. **Testes**
   - Unit tests para serviços
   - Integration tests para componentes
   - E2E tests para fluxos principais

---

**Documentação completa e atualizada! 🎉**
