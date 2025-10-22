"use client"

import { createClient } from "@/lib/supabase/client"
import type { User } from "@supabase/supabase-js"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export type UserType = "personal" | "student" | "aluno"

export interface AppUser {
  id: string
  name: string
  email: string
  type: UserType
  avatar?: string
}

/**
 * Custom hook for handling user authentication.
 *
 * This hook manages the user's authentication state, fetches user data from Supabase,
 * and provides methods for logging out. It listens for authentication changes and
 * updates the component state accordingly.
 *
 * @returns An object containing the user's authentication status and data.
 */
export function useAuth() {
  const [user, setUser] = useState<AppUser | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        fetchUserData(session.user)
      } else {
        setIsLoading(false)
      }
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        fetchUserData(session.user)
      } else {
        setUser(null)
        setIsAuthenticated(false)
        setIsLoading(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const fetchUserData = async (authUser: User) => {
    try {
      const { data: userData } = await supabase.from("users").select("*").eq("id", authUser.id).single()

      if (userData) {
        setUser({
          id: userData.id,
          name: userData.full_name || authUser.email?.split("@")[0] || "User",
          email: authUser.email!,
          type: userData.user_type as UserType,
          avatar: userData.avatar_url,
        })
        setIsAuthenticated(true)
      }
    } catch (error) {
      console.error("Error fetching user data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setIsAuthenticated(false)
    router.push("/")
  }

  return {
    /**
     * An object containing the current user's data.
     * @type {AppUser | null}
     */
    user,
    /**
     * A boolean indicating whether the user is authenticated.
     * @type {boolean}
     */
    isAuthenticated,
    /**
     * A boolean indicating whether the authentication status is being loaded.
     * @type {boolean}
     */
    isLoading,
    /**
     * A function to log the user out.
     * @type {() => Promise<void>}
     */
    logout,
  }
}
