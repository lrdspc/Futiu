import { Card, CardContent } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { ChatInterface } from "@/components/chat-interface"

export default async function StudentMessagesPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: studentProfile } = await supabase
    .from("student_profiles")
    .select(`
      personal_trainer_id,
      trainer:users!student_profiles_personal_trainer_id_fkey(id, full_name, email, avatar_url)
    `)
    .eq("id", user.id)
    .single()

  if (!studentProfile?.trainer) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-black text-balance">Mensagens</h2>
          <p className="text-muted-foreground">Converse com seu personal trainer</p>
        </div>
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground">Você ainda não tem um personal trainer atribuído</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const trainerId = studentProfile.personal_trainer_id

  const { data: messagesData } = await supabase
    .from("messages")
    .select(`
      *,
      sender:users!messages_sender_id_fkey(id, full_name)
    `)
    .or(
      `and(sender_id.eq.${user.id},recipient_id.eq.${trainerId}),and(sender_id.eq.${trainerId},recipient_id.eq.${user.id})`,
    )
    .order("created_at", { ascending: true })

  const messages = messagesData || []

  // Mark messages as read
  await supabase
    .from("messages")
    .update({ read_at: new Date().toISOString() })
    .eq("recipient_id", user.id)
    .eq("sender_id", trainerId)
    .is("read_at", null)

  return (
    <ChatInterface
      currentUserId={user.id}
      partnerId={trainerId}
      partnerName={(studentProfile.trainer as any)?.full_name || "Personal Trainer"}
      partnerAvatar={(studentProfile.trainer as any)?.avatar_url}
      initialMessages={messages}
      userType="student"
    />
  )
}
