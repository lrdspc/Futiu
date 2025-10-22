"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function getConversations() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("Not authenticated")
  }

  const { data: userData } = await supabase.from("users").select("user_type").eq("id", user.id).single()

  if (!userData) return []

  // Get all messages where user is sender or recipient
  const { data: messages } = await supabase
    .from("messages")
    .select(`
      *,
      sender:users!messages_sender_id_fkey(id, full_name, avatar_url),
      recipient:users!messages_recipient_id_fkey(id, full_name, avatar_url)
    `)
    .or(`sender_id.eq.${user.id},recipient_id.eq.${user.id}`)
    .order("created_at", { ascending: false })

  if (!messages) return []

  // Group messages by conversation partner
  const conversationsMap = new Map()

  messages.forEach((message) => {
    const partnerId = message.sender_id === user.id ? message.recipient_id : message.sender_id
    const partner = message.sender_id === user.id ? message.recipient : message.sender

    if (!conversationsMap.has(partnerId)) {
      conversationsMap.set(partnerId, {
        id: partnerId,
        partner,
        lastMessage: message.content,
        timestamp: message.created_at,
        unread: message.recipient_id === user.id && !message.read_at ? 1 : 0,
      })
    } else {
      const existing = conversationsMap.get(partnerId)
      if (message.recipient_id === user.id && !message.read_at) {
        existing.unread += 1
      }
    }
  })

  return Array.from(conversationsMap.values())
}

export async function getMessages(partnerId: string) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("Not authenticated")
  }

  const { data: messages } = await supabase
    .from("messages")
    .select(`
      *,
      sender:users!messages_sender_id_fkey(id, full_name, avatar_url)
    `)
    .or(
      `and(sender_id.eq.${user.id},recipient_id.eq.${partnerId}),and(sender_id.eq.${partnerId},recipient_id.eq.${user.id})`,
    )
    .order("created_at", { ascending: true })

  // Mark messages as read
  await supabase
    .from("messages")
    .update({ read_at: new Date().toISOString() })
    .eq("recipient_id", user.id)
    .eq("sender_id", partnerId)
    .is("read_at", null)

  return messages || []
}

export async function sendMessage(recipientId: string, content: string) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("Not authenticated")
  }

  const { data, error } = await supabase
    .from("messages")
    .insert({
      sender_id: user.id,
      recipient_id: recipientId,
      content,
    })
    .select()
    .single()

  if (error) throw error

  revalidatePath("/dashboard/trainer/messages")
  revalidatePath("/dashboard/student/messages")

  return data
}

export async function getTrainerStudents() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("Not authenticated")
  }

  const { data: students } = await supabase
    .from("student_profiles")
    .select(`
      id,
      users!inner(id, full_name, email, avatar_url)
    `)
    .eq("personal_trainer_id", user.id)

  return students || []
}

export async function getStudentTrainer() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("Not authenticated")
  }

  const { data: studentProfile } = await supabase
    .from("student_profiles")
    .select(`
      personal_trainer_id,
      trainer:users!student_profiles_personal_trainer_id_fkey(id, full_name, email, avatar_url)
    `)
    .eq("id", user.id)
    .single()

  return studentProfile?.trainer || null
}
