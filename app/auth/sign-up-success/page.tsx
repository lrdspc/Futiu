import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function SignUpSuccessPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 p-6">
      <div className="w-full max-w-sm">
        <Card className="border-gray-800 bg-gray-900/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-white">Cadastro realizado!</CardTitle>
            <CardDescription className="text-gray-400">Verifique seu email para confirmar</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-300 mb-4">
              Você se cadastrou com sucesso. Por favor, verifique seu email para confirmar sua conta antes de fazer
              login.
            </p>
            <Button asChild className="w-full bg-gradient-to-r from-cyan-500 to-blue-500">
              <Link href="/auth/login">Ir para Login</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
