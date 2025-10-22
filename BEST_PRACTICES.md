# 📋 Boas Práticas - Personal & Aluno

## 🎯 Desenvolvimento

### 1. TypeScript
```typescript
// ✅ BOM - Tipos explícitos
interface WorkoutProps {
  id: string
  name: string
  exercises: Exercise[]
}

// ❌ EVITAR - any
const data: any = fetchData()
```

### 2. Componentes
```typescript
// ✅ BOM - Componente focado e reutilizável
export function WorkoutCard({ workout }: { workout: Workout }) {
  return <Card>...</Card>
}

// ❌ EVITAR - Componente muito grande
export function MegaComponent() {
  // 500 linhas de código...
}
```

### 3. Hooks
```typescript
// ✅ BOM - Custom hook reutilizável
export function useWorkout(id: string) {
  const [workout, setWorkout] = useState<Workout | null>(null)
  // lógica...
  return { workout, loading, error }
}

// ❌ EVITAR - Lógica duplicada em componentes
```

### 4. Performance
```typescript
// ✅ BOM - Memoização apropriada
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(data)
}, [data])

// ✅ BOM - Callback memoizado
const handleClick = useCallback(() => {
  doSomething(id)
}, [id])

// ❌ EVITAR - Re-renders desnecessários
```

## 🔒 Segurança

### 1. Validação de Dados
```typescript
// ✅ BOM - Validar com Zod
import { workoutSchema } from '@/lib/validation'

const result = workoutSchema.safeParse(data)
if (!result.success) {
  throw new Error('Invalid data')
}

// ❌ EVITAR - Confiar em dados não validados
```

### 2. Sanitização
```typescript
// ✅ BOM - Sanitizar inputs
const sanitizedInput = input.trim().slice(0, 100)

// ❌ EVITAR - Usar input direto do usuário
```

### 3. Autenticação
```typescript
// ✅ BOM - Verificar autenticação
const { data: { user } } = await supabase.auth.getUser()
if (!user) redirect('/auth/login')

// ❌ EVITAR - Assumir que usuário está autenticado
```

## 📱 UX/UI

### 1. Loading States
```typescript
// ✅ BOM - Mostrar loading
if (loading) return <LoadingSpinner />
if (error) return <ErrorMessage error={error} />
return <Content data={data} />

// ❌ EVITAR - Tela em branco durante loading
```

### 2. Error Handling
```typescript
// ✅ BOM - Tratar erros gracefully
try {
  await saveWorkout(data)
  toast({ title: 'Sucesso!' })
} catch (error) {
  toast({ title: 'Erro', description: error.message })
}

// ❌ EVITAR - Deixar erros sem tratamento
```

### 3. Acessibilidade
```tsx
// ✅ BOM - ARIA labels
<button aria-label="Fechar modal" onClick={onClose}>
  <X />
</button>

// ❌ EVITAR - Botões sem labels
<button onClick={onClose}><X /></button>
```

## 🎨 Estilo

### 1. Tailwind CSS
```tsx
// ✅ BOM - Classes organizadas
<div className="flex items-center gap-4 p-4 rounded-lg bg-card">

// ❌ EVITAR - Classes desorganizadas
<div className="p-4 flex bg-card gap-4 rounded-lg items-center">
```

### 2. Componentes UI
```tsx
// ✅ BOM - Usar componentes do design system
import { Button } from '@/components/ui/button'
<Button variant="default">Salvar</Button>

// ❌ EVITAR - Criar botões customizados
<button className="...">Salvar</button>
```

## 🧪 Testes

### 1. Testes Unitários
```typescript
// ✅ BOM - Testar comportamento
it('should add exercise to workout', () => {
  const { result } = renderHook(() => useWorkout())
  act(() => result.current.addExercise(exercise))
  expect(result.current.exercises).toHaveLength(1)
})

// ❌ EVITAR - Testar implementação
```

### 2. Testes de Integração
```typescript
// ✅ BOM - Testar fluxo completo
it('should complete workout flow', async () => {
  render(<WorkoutPage />)
  await userEvent.click(screen.getByText('Iniciar'))
  await userEvent.click(screen.getByText('Finalizar'))
  expect(screen.getByText('Concluído')).toBeInTheDocument()
})
```

## 📊 Performance

### 1. Imagens
```tsx
// ✅ BOM - Usar Next Image
import Image from 'next/image'
<Image src="/photo.jpg" alt="Progress" width={400} height={300} />

// ❌ EVITAR - Tag img direta
<img src="/photo.jpg" alt="Progress" />
```

### 2. Lazy Loading
```typescript
// ✅ BOM - Dynamic import
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <LoadingSpinner />
})

// ❌ EVITAR - Import estático de componentes pesados
```

## 🔄 Estado

### 1. Estado Local vs Global
```typescript
// ✅ BOM - Estado local para UI
const [isOpen, setIsOpen] = useState(false)

// ✅ BOM - Estado global para dados compartilhados
const { user } = useAuth()

// ❌ EVITAR - Estado global para tudo
```

### 2. Sincronização
```typescript
// ✅ BOM - Usar offline sync service
await offlineSyncService.saveWorkoutOffline(data)

// ❌ EVITAR - Perder dados quando offline
```

## 📝 Documentação

### 1. Comentários
```typescript
// ✅ BOM - Comentar lógica complexa
// Calcula o tempo total do treino baseado em séries e descanso
const totalTime = exercises.reduce((acc, ex) => {
  return acc + (ex.sets * 60) + (ex.sets * parseRest(ex.rest))
}, 0)

// ❌ EVITAR - Comentários óbvios
// Incrementa contador
counter++
```

### 2. JSDoc
```typescript
// ✅ BOM - Documentar funções públicas
/**
 * Cria um novo treino para o aluno
 * @param studentId - ID do aluno
 * @param workout - Dados do treino
 * @returns Promise com o treino criado
 */
export async function createWorkout(
  studentId: string,
  workout: WorkoutInput
): Promise<Workout> {
  // implementação
}
```

## 🚀 Deploy

### 1. Variáveis de Ambiente
```bash
# ✅ BOM - Usar .env.example
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key

# ❌ EVITAR - Commitar .env
```

### 2. Build
```bash
# ✅ BOM - Testar build localmente
pnpm build
pnpm start

# ✅ BOM - Verificar type errors
pnpm type-check
```

## 🔍 Debugging

### 1. Console Logs
```typescript
// ✅ BOM - Logs estruturados
console.log('[WorkoutService] Creating workout:', { studentId, workoutName })

// ❌ EVITAR - Logs genéricos
console.log('creating')
```

### 2. Error Messages
```typescript
// ✅ BOM - Mensagens descritivas
throw new Error(`Failed to create workout for student ${studentId}: ${error.message}`)

// ❌ EVITAR - Mensagens genéricas
throw new Error('Error')
```

## 📱 Mobile

### 1. Touch Targets
```tsx
// ✅ BOM - Área de toque adequada (min 44x44px)
<button className="min-h-11 min-w-11 p-3">

// ❌ EVITAR - Botões muito pequenos
<button className="p-1">
```

### 2. Responsividade
```tsx
// ✅ BOM - Mobile-first
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

// ❌ EVITAR - Desktop-only
<div className="grid grid-cols-3">
```

---

**Siga estas práticas para manter o código limpo e profissional! ✨**
