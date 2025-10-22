"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth"
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Users, Dumbbell, TrendingUp, MessageSquare, Settings, LogOut, Home } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Loader2 } from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/dashboard/trainer", icon: Home },
  { name: "Alunos", href: "/dashboard/trainer/students", icon: Users },
  { name: "Treinos", href: "/dashboard/trainer/workouts", icon: Dumbbell },
  { name: "Exercícios", href: "/dashboard/trainer/exercises", icon: Dumbbell },
  { name: "Progresso", href: "/dashboard/trainer/progress", icon: TrendingUp },
  { name: "Mensagens", href: "/dashboard/trainer/messages", icon: MessageSquare },
  { name: "Configurações", href: "/dashboard/trainer/settings", icon: Settings },
]

export default function TrainerLayout({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, logout } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!isAuthenticated || user?.type !== "personal") {
      router.push("/")
    }
  }, [isAuthenticated, user, router])

  if (!user || user.type !== "personal") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="border-b border-border/50 p-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border-2 border-primary">
              <AvatarImage src={user.avatar || "/placeholder.svg"} />
              <AvatarFallback className="bg-primary/10 text-primary font-bold">{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm truncate">{user.name}</p>
              <p className="text-xs text-muted-foreground">Personal Trainer</p>
            </div>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarMenu>
            {navigation.map((item) => (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton asChild isActive={pathname === item.href}>
                  <Link href={item.href}>
                    <item.icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>

        <SidebarFooter className="border-t border-border/50 p-2">
          <Button variant="ghost" className="w-full justify-start" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Sair
          </Button>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b border-border/50 bg-card/30 backdrop-blur-sm px-6">
          <SidebarTrigger />
          <div className="flex-1">
            <h1 className="text-xl font-black">
              {navigation.find((item) => item.href === pathname)?.name || "Dashboard"}
            </h1>
          </div>
        </header>
        <main className="flex-1 p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
