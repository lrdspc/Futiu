"use client"

import { Button } from "@/components/ui/button"
import { Dumbbell, Zap, TrendingUp, Users } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      {/* Hero Section */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-6xl space-y-16 animate-slide-up">
          {/* Header */}
          <div className="text-center space-y-6">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 animate-pulse-glow mb-8">
              <Dumbbell className="h-12 w-12 text-cyan-400" />
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight text-balance bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Personal & Aluno
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto text-balance leading-relaxed">
              Plataforma completa para personal trainers e alunos. Treinos personalizados, evolução em tempo real e
              resultados comprovados.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-gray-900/50 backdrop-blur border border-gray-800 rounded-xl p-6 space-y-3 hover:border-cyan-500/50 transition-colors">
              <div className="h-12 w-12 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                <Zap className="h-6 w-6 text-cyan-400" />
              </div>
              <h3 className="text-lg font-bold text-white">Treinos Personalizados</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Crie e acompanhe treinos sob medida para cada aluno com biblioteca completa de exercícios
              </p>
            </div>

            <div className="bg-gray-900/50 backdrop-blur border border-gray-800 rounded-xl p-6 space-y-3 hover:border-blue-500/50 transition-colors">
              <div className="h-12 w-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="text-lg font-bold text-white">Evolução em Tempo Real</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Acompanhe o progresso com gráficos, medidas corporais e fotos comparativas
              </p>
            </div>

            <div className="bg-gray-900/50 backdrop-blur border border-gray-800 rounded-xl p-6 space-y-3 hover:border-purple-500/50 transition-colors">
              <div className="h-12 w-12 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="text-lg font-bold text-white">Comunicação Direta</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Chat integrado para feedback instantâneo e ajustes nos treinos
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold px-10 py-7 text-lg shadow-lg shadow-cyan-500/25"
            >
              <Link href="/auth/login">Entrar Agora</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-2 border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-500 font-bold px-10 py-7 text-lg bg-transparent"
            >
              <Link href="/auth/sign-up">Criar Conta</Link>
            </Button>
          </div>

          {/* Footer Text */}
          <div className="text-center space-y-2">
            <p className="text-sm text-gray-500">Transforme sua jornada fitness com tecnologia e dedicação</p>
            <p className="text-xs text-gray-600">Disponível como PWA - Instale no seu dispositivo</p>
          </div>
        </div>
      </div>
    </div>
  )
}
