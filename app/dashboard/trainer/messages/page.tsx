import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, MessageSquare } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export default async function MessagesPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: students } = await supabase
    .from("student_profiles")
    .select(`
      id,
      users!inner(id, full_name, email, avatar_url)
    `)
    .eq("personal_trainer_id", user.id)

  const studentsList = students || []

  const conversationsWithMessages = await Promise.all(
    studentsList.map(async (student) => {
      const { data: messages } = await supabase
        .from("messages")
        .select("*")
        .or(
          `and(sender_id.eq.${user.id},recipient_id.eq.${student.id}),and(sender_id.eq.${student.id},recipient_id.eq.${user.id})`,
        )
        .order("created_at", { ascending: false })
        .limit(1)

      const lastMessage = messages?.[0]
      const { count: unreadCount } = await supabase
        .from("messages")
        .select("*", { count: "exact", head: true })
        .eq("sender_id", student.id)
        .eq("recipient_id", user.id)
        .is("read_at", null)

      return {
        id: student.id,
        student: {
          name: (student.users as any)?.full_name || "Sem nome",
          avatar: (student.users as any)?.avatar_url,
        },
        lastMessage: lastMessage?.content || "Sem mensagens",
        timestamp: lastMessage
          ? new Date(lastMessage.created_at).toLocaleTimeString("pt-BR", {
              hour: "2-digit",
              minute: "2-digit",
            })
          : "",
        unread: unreadCount || 0,
      }
    }),
  )

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-black tracking-tight">Mensagens</h2>
        <p className="text-muted-foreground">Converse com seus alunos</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 h-[calc(100vh-16rem)]">
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm lg:col-span-1">
          <CardHeader>
            <CardTitle>Conversas</CardTitle>
            <div className="relative mt-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Buscar alunos..." className="pl-10" />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[calc(100vh-24rem)]">
              <div className="space-y-1 p-4 pt-0">
                {conversationsWithMessages.length > 0 ? (
                  conversationsWithMessages.map((conv) => (
                    <a
                      key={conv.id}
                      href={`/dashboard/trainer/messages/${conv.id}`}
                      className="w-full flex items-center gap-3 p-3 rounded-lg transition-colors hover:bg-muted/50 block"
                    >
                      <Avatar className="h-10 w-10 border-2 border-primary/20">
                        <AvatarImage src={conv.student.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-primary/10 text-primary font-bold">
                          {conv.student.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 text-left min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-semibold text-sm truncate">{conv.student.name}</p>
                          <span className="text-xs text-muted-foreground">{conv.timestamp}</span>
                        </div>
                        <p className="text-xs text-muted-foreground truncate">{conv.lastMessage}</p>
                      </div>
                      {conv.unread > 0 && (
                        <Badge className="bg-primary text-primary-foreground h-5 w-5 p-0 flex items-center justify-center rounded-full">
                          {conv.unread}
                        </Badge>
                      )}
                    </a>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>Nenhum aluno cadastrado</p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm lg:col-span-2">
          <CardContent className="flex flex-col items-center justify-center h-full">
            <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-lg font-semibold mb-2">Selecione uma conversa</p>
            <p className="text-sm text-muted-foreground">Escolha um aluno para começar a conversar</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
