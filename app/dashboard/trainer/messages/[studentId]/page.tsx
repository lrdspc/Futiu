import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { ChatInterface } from "@/components/chat-interface"

export default async function StudentChatPage({ params }: { params: Promise<{ studentId: string }> }) {
  const { studentId } = await params
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: student } = await supabase
    .from("users")
    .select("id, full_name, avatar_url")
    .eq("id", studentId)
    .single()

  if (!student) {
    redirect("/dashboard/trainer/messages")
  }

  const { data: messages } = await supabase
    .from("messages")
    .select(`
      *,
      sender:users!messages_sender_id_fkey(id, full_name)
    `)
    .or(
      `and(sender_id.eq.${user.id},recipient_id.eq.${studentId}),and(sender_id.eq.${studentId},recipient_id.eq.${user.id})`,
    )
    .order("created_at", { ascending: true })

  // Mark messages as read
  await supabase
    .from("messages")
    .update({ read_at: new Date().toISOString() })
    .eq("recipient_id", user.id)
    .eq("sender_id", studentId)
    .is("read_at", null)

  return (
    <ChatInterface
      currentUserId={user.id}
      partnerId={studentId}
      partnerName={student.full_name || "Aluno"}
      partnerAvatar={student.avatar_url}
      initialMessages={messages || []}
      userType="trainer"
    />
  )
}
