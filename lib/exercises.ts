/**
 * Represents a single exercise in the database.
 *
 * @interface Exercise
 * @property {string} id - The unique identifier for the exercise.
 * @property {string} name - The name of the exercise.
 * @property {"peito" | "costas" | "pernas" | "ombros" | "bracos" | "abdomen" | "cardio"} category - The category of the exercise.
 * @property {string[]} equipment - The equipment required for the exercise.
 * @property {"iniciante" | "intermediario" | "avancado"} difficulty - The difficulty level of the exercise.
 * @property {string[]} muscleGroups - The primary muscle groups targeted by the exercise.
 * @property {string} description - A brief description of the exercise.
 * @property {string[]} instructions - Step-by-step instructions for performing the exercise.
 * @property {string} [videoUrl] - An optional URL to a video demonstrating the exercise.
 * @property {string} [imageUrl] - An optional URL to an image of the exercise.
 */
export interface Exercise {
  id: string
  name: string
  category: "peito" | "costas" | "pernas" | "ombros" | "bracos" | "abdomen" | "cardio"
  equipment: string[]
  difficulty: "iniciante" | "intermediario" | "avancado"
  muscleGroups: string[]
  description: string
  instructions: string[]
  videoUrl?: string
  imageUrl?: string
}

/**
 * A comprehensive database of exercises.
 *
 * @type {Exercise[]}
 */
export const exerciseDatabase: Exercise[] = [
  // Peito
  {
    id: "ex-001",
    name: "Supino Reto com Barra",
    category: "peito",
    equipment: ["Barra", "Banco"],
    difficulty: "intermediario",
    muscleGroups: ["Peitoral Maior", "Tríceps", "Deltóide Anterior"],
    description: "Exercício fundamental para desenvolvimento do peitoral",
    instructions: [
      "Deite no banco com os pés apoiados no chão",
      "Segure a barra com pegada um pouco mais larga que os ombros",
      "Desça a barra controladamente até o peito",
      "Empurre a barra de volta à posição inicial",
    ],
    imageUrl: "/bench-press.png",
  },
  {
    id: "ex-002",
    name: "Supino Inclinado com Halteres",
    category: "peito",
    equipment: ["Halteres", "Banco Inclinado"],
    difficulty: "intermediario",
    muscleGroups: ["Peitoral Superior", "Deltóide Anterior"],
    description: "Foco no desenvolvimento da porção superior do peitoral",
    instructions: [
      "Ajuste o banco em 30-45 graus",
      "Segure os halteres acima do peito",
      "Desça os halteres controladamente",
      "Empurre de volta à posição inicial",
    ],
    imageUrl: "/incline-dumbbell-press.jpg",
  },
  {
    id: "ex-003",
    name: "Crucifixo com Halteres",
    category: "peito",
    equipment: ["Halteres", "Banco"],
    difficulty: "intermediario",
    muscleGroups: ["Peitoral Maior"],
    description: "Exercício de isolamento para o peitoral",
    instructions: [
      "Deite no banco com halteres acima do peito",
      "Abra os braços em arco até sentir alongamento",
      "Retorne à posição inicial contraindo o peitoral",
    ],
    imageUrl: "/dumbbell-fly.jpg",
  },
  // Costas
  {
    id: "ex-004",
    name: "Barra Fixa",
    category: "costas",
    equipment: ["Barra Fixa"],
    difficulty: "intermediario",
    muscleGroups: ["Grande Dorsal", "Bíceps", "Trapézio"],
    description: "Exercício composto para desenvolvimento das costas",
    instructions: [
      "Segure a barra com pegada pronada",
      "Puxe o corpo até o queixo passar a barra",
      "Desça controladamente até extensão completa",
    ],
    imageUrl: "/person-doing-pull-up.png",
  },
  {
    id: "ex-005",
    name: "Remada Curvada com Barra",
    category: "costas",
    equipment: ["Barra"],
    difficulty: "avancado",
    muscleGroups: ["Grande Dorsal", "Trapézio", "Rombóides"],
    description: "Exercício fundamental para espessura das costas",
    instructions: [
      "Incline o tronco a 45 graus",
      "Puxe a barra em direção ao abdômen",
      "Contraia as escápulas no topo do movimento",
      "Desça controladamente",
    ],
    imageUrl: "/barbell-row.jpg",
  },
  // Pernas
  {
    id: "ex-006",
    name: "Agachamento Livre",
    category: "pernas",
    equipment: ["Barra", "Rack"],
    difficulty: "avancado",
    muscleGroups: ["Quadríceps", "Glúteos", "Posterior"],
    description: "Rei dos exercícios para membros inferiores",
    instructions: [
      "Posicione a barra nas costas",
      "Desça até as coxas ficarem paralelas ao chão",
      "Mantenha o core contraído",
      "Empurre pelos calcanhares para subir",
    ],
    imageUrl: "/barbell-squat.jpg",
  },
  {
    id: "ex-007",
    name: "Leg Press 45°",
    category: "pernas",
    equipment: ["Leg Press"],
    difficulty: "iniciante",
    muscleGroups: ["Quadríceps", "Glúteos"],
    description: "Exercício seguro para desenvolvimento das pernas",
    instructions: [
      "Posicione os pés na plataforma na largura dos ombros",
      "Desça controladamente até 90 graus",
      "Empurre a plataforma de volta",
    ],
    imageUrl: "/leg-press.jpg",
  },
  {
    id: "ex-008",
    name: "Stiff",
    category: "pernas",
    equipment: ["Barra", "Halteres"],
    difficulty: "intermediario",
    muscleGroups: ["Posterior de Coxa", "Glúteos", "Lombar"],
    description: "Exercício para posterior de coxa e glúteos",
    instructions: [
      "Segure a barra com pegada pronada",
      "Desça inclinando o tronco com pernas semi-flexionadas",
      "Sinta o alongamento do posterior",
      "Retorne contraindo glúteos e posterior",
    ],
    imageUrl: "/romanian-deadlift.jpg",
  },
  // Ombros
  {
    id: "ex-009",
    name: "Desenvolvimento com Barra",
    category: "ombros",
    equipment: ["Barra", "Banco"],
    difficulty: "intermediario",
    muscleGroups: ["Deltóide", "Tríceps"],
    description: "Exercício composto para ombros",
    instructions: [
      "Sente com as costas apoiadas",
      "Empurre a barra acima da cabeça",
      "Desça controladamente até a altura do queixo",
    ],
    imageUrl: "/overhead-press.jpg",
  },
  {
    id: "ex-010",
    name: "Elevação Lateral",
    category: "ombros",
    equipment: ["Halteres"],
    difficulty: "iniciante",
    muscleGroups: ["Deltóide Lateral"],
    description: "Isolamento para deltóide lateral",
    instructions: [
      "Segure os halteres ao lado do corpo",
      "Eleve os braços lateralmente até a altura dos ombros",
      "Desça controladamente",
    ],
    imageUrl: "/lateral-raise.jpg",
  },
  // Braços
  {
    id: "ex-011",
    name: "Rosca Direta com Barra",
    category: "bracos",
    equipment: ["Barra"],
    difficulty: "iniciante",
    muscleGroups: ["Bíceps"],
    description: "Exercício clássico para bíceps",
    instructions: [
      "Segure a barra com pegada supinada",
      "Flexione os cotovelos levando a barra ao peito",
      "Mantenha os cotovelos fixos",
      "Desça controladamente",
    ],
    imageUrl: "/barbell-curl.png",
  },
  {
    id: "ex-012",
    name: "Tríceps Testa",
    category: "bracos",
    equipment: ["Barra", "Banco"],
    difficulty: "intermediario",
    muscleGroups: ["Tríceps"],
    description: "Exercício de isolamento para tríceps",
    instructions: [
      "Deite no banco segurando a barra acima da testa",
      "Flexione apenas os cotovelos descendo a barra",
      "Estenda os cotovelos de volta",
    ],
    imageUrl: "/skull-crusher.jpg",
  },
  // Abdômen
  {
    id: "ex-013",
    name: "Abdominal Supra",
    category: "abdomen",
    equipment: ["Peso Corporal"],
    difficulty: "iniciante",
    muscleGroups: ["Reto Abdominal"],
    description: "Exercício básico para abdômen",
    instructions: ["Deite com joelhos flexionados", "Eleve o tronco contraindo o abdômen", "Desça controladamente"],
    imageUrl: "/crunch.jpg",
  },
  {
    id: "ex-014",
    name: "Prancha",
    category: "abdomen",
    equipment: ["Peso Corporal"],
    difficulty: "iniciante",
    muscleGroups: ["Core", "Reto Abdominal"],
    description: "Exercício isométrico para core",
    instructions: [
      "Apoie antebraços e pontas dos pés",
      "Mantenha o corpo alinhado",
      "Contraia o abdômen durante todo o exercício",
    ],
    imageUrl: "/wooden-plank.png",
  },
  // Cardio
  {
    id: "ex-015",
    name: "Esteira - Corrida",
    category: "cardio",
    equipment: ["Esteira"],
    difficulty: "iniciante",
    muscleGroups: ["Sistema Cardiovascular"],
    description: "Exercício aeróbico para condicionamento",
    instructions: [
      "Ajuste velocidade e inclinação conforme condicionamento",
      "Mantenha postura ereta",
      "Respire de forma controlada",
    ],
    imageUrl: "/treadmill-running.png",
  },
]

/**
 * Represents a single exercise within a workout plan.
 *
 * @interface WorkoutExercise
 * @property {string} exerciseId - The ID of the exercise.
 * @property {number} sets - The number of sets to be performed.
 * @property {string} reps - The number of repetitions per set.
 * @property {string} rest - The rest time between sets.
 * @property {string} [notes] - Optional notes for the exercise.
 * @property {number} order - The order of the exercise in the workout.
 */
export interface WorkoutExercise {
  exerciseId: string
  sets: number
  reps: string
  rest: string
  notes?: string
  order: number
}

/**
 * Represents a complete workout plan.
 *
 * @interface Workout
 * @property {string} id - The unique identifier for the workout.
 * @property {string} name - The name of the workout.
 * @property {string} description - A brief description of the workout.
 * @property {string} category - The category of the workout.
 * @property {WorkoutExercise[]} exercises - An array of exercises included in the workout.
 * @property {string} duration - The estimated duration of the workout.
 * @property {"iniciante" | "intermediario" | "avancado"} difficulty - The difficulty level of the workout.
 * @property {string} createdAt - The date the workout was created.
 * @property {string[]} assignedTo - An array of user IDs to whom the workout is assigned.
 */
export interface Workout {
  id: string
  name: string
  description: string
  category: string
  exercises: WorkoutExercise[]
  duration: string
  difficulty: "iniciante" | "intermediario" | "avancado"
  createdAt: string
  assignedTo: string[]
}
