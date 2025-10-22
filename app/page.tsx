import { redirect } from "next/navigation"

/**
 * Página inicial - redireciona automaticamente para login de aluno
 */
export default function HomePage() {
  redirect("/auth/student-login")
}

