# 🚀 Plano de Implementação - Personal & Aluno

## 📌 VISÃO GERAL

Este documento detalha o plano de implementação das funcionalidades faltantes, priorizando as features core que completam a experiência do usuário.

---

## 🎯 SPRINT 1 - CORE ESSENCIAL (Prioridade MÁXIMA)

### 1️⃣ WORKOUT BUILDER (Montagem de Treino)

**Objetivo:** Permitir que o Personal crie treinos completos e atribua aos alunos

#### Páginas a criar:
```
app/dashboard/trainer/workouts/builder/page.tsx
app/dashboard/trainer/workouts/[id]/edit/page.tsx
```

#### Componentes a criar:
```typescript
// components/workout-builder/workout-builder-form.tsx
- Formulário principal com nome, descrição, tipo
- Seleção de aluno(s) para atribuir
- Seleção de dias da semana
- Estimativa de duração

// components/workout-builder/exercise-selector.tsx
- Lista de exercícios com busca e filtros
- Drag and drop para adicionar ao treino
- Preview do exercício

// components/workout-builder/exercise-list-builder.tsx
- Lista ordenável de exercícios adicionados
- Inputs para séries, reps, descanso
- Campo de observações por exercício
- Botão de remover

// components/workout-builder/workout-preview.tsx
- Visualização de como o aluno verá o treino
- Resumo: total de exercícios, duração estimada
```

#### Actions a criar:
```typescript
// lib/actions/workout-builder.ts
- createWorkout(data)
- updateWorkout(id, data)
- deleteWorkout(id)
- duplicateWorkout(id)
- saveAsTemplate(id)
- assignWorkoutToStudents(workoutId, studentIds)
```

#### Fluxo:
1. Personal clica em "Criar Treino"
2. Preenche informações básicas
3. Adiciona exercícios da biblioteca (drag-drop ou clique)
4. Configura séries/reps/descanso para cada exercício
5. Adiciona observações
6. Seleciona aluno(s) para atribuir
7. Pré-visualiza
8. Salva e envia notificação aos alunos

---

### 2️⃣ WORKOUT EXECUTION (Execução de Treino)

**Objetivo:** Interface imersiva para o aluno executar o treino

#### Páginas a criar:
```
app/dashboard/student/workouts/[id]/execute/page.tsx
```

#### Componentes a criar:
```typescript
// components/workout-execution/workout-execution-container.tsx
- Container principal com estado do treino
- Controle de navegação entre exercícios
- Gerenciamento de progresso

// components/workout-execution/exercise-card-fullscreen.tsx
- Tela fullscreen por exercício
- GIF/vídeo demonstrativo
- Nome, grupo muscular, dicas
- Séries, reps, descanso
- Checkboxes para marcar séries
- Inputs para registrar carga e reps reais

// components/workout-execution/rest-timer.tsx
- Timer de descanso com countdown
- Notificação sonora/vibração ao terminar
- Botão para pular descanso
- Animação circular de progresso

// components/workout-execution/workout-progress-bar.tsx
- Barra de progresso geral do treino
- Indicador de exercício atual
- Tempo decorrido

// components/workout-execution/workout-completion-screen.tsx
- Tela de parabéns com animação
- Resumo do treino (tempo, exercícios, carga total)
- Avaliação de dificuldade (1-5)
- Campo de feedback opcional
- Botão "Finalizar"
```

#### Actions a criar:
```typescript
// lib/actions/workout-sessions.ts
- startWorkoutSession(workoutId)
- updateExerciseLog(sessionId, exerciseId, setData)
- completeWorkoutSession(sessionId, feedback)
- getWorkoutSessionHistory(workoutId)
```

#### Fluxo:
1. Aluno clica em "Iniciar Treino"
2. Tela fullscreen com primeiro exercício
3. Vê GIF/vídeo, instruções, séries/reps
4. Marca cada série como concluída
5. Registra carga e reps reais (opcional)
6. Timer de descanso automático
7. Navega para próximo exercício
8. Ao final, tela de conclusão com feedback
9. Salva sessão no banco
10. Notifica personal

---

### 3️⃣ STUDENT PROFILE (Perfil Detalhado do Aluno)

**Objetivo:** Visão 360° do aluno para o Personal

#### Páginas a criar:
```
app/dashboard/trainer/students/[id]/page.tsx
```

#### Componentes a criar:
```typescript
// components/student-profile/student-profile-header.tsx
- Foto, nome, dados básicos
- Status (ativo/inativo)
- Data de início
- Botões de ação rápida

// components/student-profile/student-stats-overview.tsx
- Cards com métricas principais
- Treinos completados
- Taxa de adesão
- Evolução de peso
- Última avaliação

// components/student-profile/student-active-workouts.tsx
- Lista de treinos ativos
- Progresso de cada treino
- Botão para criar novo treino

// components/student-profile/student-evolution-charts.tsx
- Gráfico de peso ao longo do tempo
- Gráfico de medidas corporais
- Gráfico de frequência de treinos

// components/student-profile/student-progress-photos.tsx
- Galeria de fotos de progresso
- Botão para comparar fotos
- Timeline de fotos

// components/student-profile/student-timeline.tsx
- Linha do tempo com eventos:
  - Avaliações físicas
  - Treinos completados
  - Mensagens trocadas
  - Conquistas desbloqueadas
```

#### Actions a criar:
```typescript
// lib/actions/student-details.ts
- getStudentFullProfile(studentId)
- getStudentStats(studentId)
- getStudentWorkoutHistory(studentId)
- getStudentMeasurements(studentId)
- getStudentProgressPhotos(studentId)
- getStudentTimeline(studentId)
```

#### Fluxo:
1. Personal clica em um aluno
2. Vê header com foto e dados básicos
3. Vê cards com estatísticas principais
4. Navega pelas abas:
   - Visão Geral
   - Treinos
   - Evolução
   - Fotos
   - Mensagens
5. Pode realizar ações:
   - Editar dados
   - Nova avaliação
   - Criar treino
   - Enviar mensagem

---

### 4️⃣ PHYSICAL ASSESSMENT (Avaliação Física)

**Objetivo:** Sistema completo de avaliação física

#### Páginas a criar:
```
app/dashboard/trainer/students/[id]/assessment/page.tsx
app/dashboard/trainer/students/[id]/assessment/history/page.tsx
```

#### Componentes a criar:
```typescript
// components/assessment/assessment-form.tsx
- Formulário em etapas (wizard)
- Etapa 1: Dados antropométricos
  - Peso, altura, IMC (calculado)
- Etapa 2: Composição corporal
  - % gordura, massa magra, massa gorda
- Etapa 3: Medidas corporais
  - Peito, cintura, quadril, braços, pernas
- Etapa 4: Avaliação postural
  - Checkboxes para desvios posturais
- Etapa 5: Fotos
  - Upload de 3 fotos (frente, lado, costas)
- Etapa 6: Observações
  - Campo de texto livre

// components/assessment/assessment-history.tsx
- Lista de avaliações anteriores
- Comparação entre avaliações
- Gráficos de evolução

// components/assessment/assessment-comparison.tsx
- Comparação lado a lado de 2 avaliações
- Destaque de mudanças (verde/vermelho)
- Fotos antes/depois
```

#### Actions a criar:
```typescript
// lib/actions/assessments.ts
- createAssessment(studentId, data)
- getStudentAssessments(studentId)
- getAssessmentById(assessmentId)
- compareAssessments(assessmentId1, assessmentId2)
- uploadAssessmentPhotos(assessmentId, photos)
```

#### Fluxo:
1. Personal acessa perfil do aluno
2. Clica em "Nova Avaliação"
3. Preenche formulário em etapas
4. Faz upload de fotos
5. Revisa dados
6. Salva avaliação
7. Aluno recebe notificação
8. Pode comparar com avaliações anteriores

---

## 🎯 SPRINT 2 - FUNCIONALIDADES DE SUPORTE

### 5️⃣ CHAT SYSTEM (Sistema de Chat)

**Objetivo:** Chat funcional em tempo real

#### Páginas a criar:
```
app/dashboard/trainer/messages/page.tsx
app/dashboard/student/messages/page.tsx
app/dashboard/trainer/messages/[conversationId]/page.tsx
app/dashboard/student/messages/[conversationId]/page.tsx
```

#### Componentes a modificar/criar:
```typescript
// components/chat/conversation-list.tsx
- Lista de conversas
- Preview da última mensagem
- Badge de mensagens não lidas
- Busca de conversas

// components/chat/chat-interface.tsx (modificar existente)
- Interface de mensagens
- Histórico de mensagens
- Input de texto
- Upload de imagem/vídeo
- Indicador de digitação
- Indicador de leitura

// components/chat/message-bubble.tsx
- Bubble de mensagem
- Timestamp
- Status (enviado/lido)
- Suporte a texto/imagem/vídeo
```

#### Actions a criar:
```typescript
// lib/actions/messages.ts (expandir)
- getConversations(userId)
- getMessages(conversationId)
- sendMessage(conversationId, content, type)
- markAsRead(messageId)
- uploadMessageMedia(file)
- subscribeToMessages(conversationId, callback)
```

#### Fluxo:
1. Usuário acessa mensagens
2. Vê lista de conversas
3. Clica em uma conversa
4. Vê histórico de mensagens
5. Envia mensagem (texto/imagem/vídeo)
6. Recebe mensagens em tempo real
7. Notificação de novas mensagens

---

### 6️⃣ PROGRESS TRACKING (Histórico e Evolução)

**Objetivo:** Visualização completa do progresso do aluno

#### Páginas a criar:
```
app/dashboard/student/progress/page.tsx
```

#### Componentes a criar:
```typescript
// components/progress/progress-overview.tsx
- Cards com métricas principais
- Peso atual vs inicial
- Treinos completados
- Carga total levantada

// components/progress/weight-evolution-chart.tsx
- Gráfico de linha com evolução de peso
- Marcadores de avaliações
- Meta de peso

// components/progress/workout-frequency-chart.tsx
- Gráfico de barras com treinos por semana/mês
- Comparação com meta

// components/progress/measurements-history.tsx
- Tabela com histórico de medidas
- Gráficos de evolução por medida
- Comparação com avaliação anterior

// components/progress/progress-photo-gallery.tsx
- Galeria de fotos organizadas por data
- Botão para comparar 2 fotos
- Integração com componente existente
```

#### Actions a criar:
```typescript
// lib/actions/progress.ts (expandir)
- getProgressOverview(userId)
- getWeightHistory(userId)
- getWorkoutFrequency(userId, period)
- getMeasurementsHistory(userId)
- getProgressPhotos(userId)
- uploadProgressPhoto(userId, photo, notes)
```

---

### 7️⃣ ACHIEVEMENTS SYSTEM (Sistema de Conquistas)

**Objetivo:** Gamificação completa

#### Páginas a criar:
```
app/dashboard/student/achievements/page.tsx
```

#### Componentes a criar:
```typescript
// components/achievements/achievement-grid.tsx
- Grid de todas as conquistas
- Desbloqueadas vs bloqueadas
- Progresso de cada conquista

// components/achievements/achievement-card.tsx
- Card de conquista
- Ícone, nome, descrição
- Barra de progresso
- Data de desbloqueio (se aplicável)

// components/achievements/achievement-notification.tsx
- Modal/toast de conquista desbloqueada
- Animação de confete
- Compartilhar conquista
```

#### Lógica de conquistas:
```typescript
// lib/achievements-engine.ts
- checkAchievements(userId)
- Tipos de conquistas:
  - Primeira Semana (5 treinos)
  - Sequência de Fogo (7/14/30 dias consecutivos)
  - Força Crescente (aumento de 5/10/20kg)
  - Maratonista (20/50/100 treinos)
  - Dedicação (3/6/12 meses de treino)
  - Transformação (perda de 5/10/20kg)
  - Etc.
```

#### Actions a criar:
```typescript
// lib/actions/achievements.ts
- getAchievements(userId)
- unlockAchievement(userId, achievementId)
- getAchievementProgress(userId, achievementId)
```

---

## 🎯 SPRINT 3 - ANALYTICS E POLIMENTO

### 8️⃣ TRAINER REPORTS (Relatórios e Analytics)

**Objetivo:** Visão geral de todos os alunos

#### Páginas a criar:
```
app/dashboard/trainer/reports/page.tsx
```

#### Componentes a criar:
```typescript
// components/reports/trainer-overview.tsx
- Métricas gerais
- Total de alunos ativos/inativos
- Taxa de adesão média
- Treinos criados vs completados

// components/reports/student-ranking.tsx
- Ranking de alunos mais ativos
- Ranking de maior evolução
- Alunos com alertas (inativos)

// components/reports/period-comparison.tsx
- Comparação entre períodos
- Gráficos de evolução
- Filtros de data
```

---

### 9️⃣ NOTIFICATION CENTER (Centro de Notificações)

**Objetivo:** Notificações in-app

#### Componentes a criar:
```typescript
// components/notifications/notification-center.tsx
- Ícone de sino no header
- Badge com contador
- Dropdown com lista

// components/notifications/notification-item.tsx
- Item de notificação
- Ícone por tipo
- Timestamp
- Marcar como lida
```

---

### 🔟 SETTINGS & PROFILE (Configurações)

**Objetivo:** Gerenciamento de conta

#### Páginas a modificar:
```
app/dashboard/trainer/settings/page.tsx
app/dashboard/student/settings/page.tsx
```

#### Componentes a criar:
```typescript
// components/settings/profile-settings.tsx
- Editar dados pessoais
- Alterar foto
- Alterar senha

// components/settings/notification-settings.tsx
- Preferências de notificação
- Push, email, SMS

// components/settings/appearance-settings.tsx
- Tema (claro/escuro)
- Idioma
```

---

## 📊 ESTIMATIVA DE TEMPO

### Sprint 1 (Core Essencial)
- Workout Builder: 3-4 dias
- Workout Execution: 3-4 dias
- Student Profile: 2-3 dias
- Physical Assessment: 2-3 dias
**Total: 10-14 dias**

### Sprint 2 (Suporte)
- Chat System: 3-4 dias
- Progress Tracking: 2-3 dias
- Achievements: 2-3 dias
**Total: 7-10 dias**

### Sprint 3 (Analytics)
- Trainer Reports: 2-3 dias
- Notification Center: 1-2 dias
- Settings: 1-2 dias
**Total: 4-7 dias**

**TOTAL GERAL: 21-31 dias (3-4 semanas)**

---

## 🎯 ORDEM DE IMPLEMENTAÇÃO RECOMENDADA

1. **Workout Builder** → Permite criar treinos reais
2. **Workout Execution** → Permite executar treinos reais
3. **Student Profile** → Centraliza informações
4. **Physical Assessment** → Completa o ciclo de acompanhamento
5. **Chat System** → Comunicação essencial
6. **Progress Tracking** → Motivação do aluno
7. **Achievements** → Gamificação
8. **Trainer Reports** → Analytics
9. **Notification Center** → Polimento
10. **Settings** → Polimento final

---

## ✅ CHECKLIST DE IMPLEMENTAÇÃO

### Para cada funcionalidade:
- [ ] Criar páginas necessárias
- [ ] Criar componentes
- [ ] Criar actions do Supabase
- [ ] Testar fluxo completo
- [ ] Adicionar loading states
- [ ] Adicionar error handling
- [ ] Adicionar validações
- [ ] Testar responsividade
- [ ] Adicionar animações
- [ ] Documentar código
- [ ] Atualizar FEATURES.md

---

## 🚀 COMEÇAR AGORA!

**Próximo passo:** Implementar o Workout Builder

Quer que eu comece a implementar? 💪
