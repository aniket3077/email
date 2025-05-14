"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"

// Mock API service for now
const apiService = {
  auth: {
    login: async (email: string, password: string) => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      return {
        token: "mock-token-12345",
        user: {
          id: "1",
          name: "John Doe",
          email,
          credits: 1250,
          role: "user",
          token: "mock-token-12345",
          company: "",
          phone: "",
          address: "",
          city: "",
          country: "",
          postalCode: "",
          vatNumber: "",
        },
      }
    },
    register: async (name: string, email: string, password: string) => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      return {
        token: "mock-token-12345",
        user: {
          id: "1",
          name,
          email,
          credits: 100,
          role: "user",
          token: "mock-token-12345",
          company: "",
          phone: "",
          address: "",
          city: "",
          country: "",
          postalCode: "",
          vatNumber: "",
        },
      }
    },
  },
  user: {
    getProfile: async (token: string) => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      return {
        id: "1",
        name: "John Doe",
        email: "john@example.com",
        credits: 1250,
        role: "user",
        token,
        company: "",
        phone: "",
        address: "",
        city: "",
        country: "",
        postalCode: "",
        vatNumber: "",
      }
    },
  },
}

interface User {
  id: string
  name: string
  email: string
  credits: number
  role: string
  token: string
  company?: string
  phone?: string
  address?: string
  city?: string
  country?: string
  postalCode?: string
  vatNumber?: string
  photoUrl?: string
}

interface AuthContextType {
  user: User | null
  token: string | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  updateUser: (userData: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Helper function to get stored auth data
const getStoredAuthData = () => {
  if (typeof window === "undefined") return null
  const storedData = localStorage.getItem("auth_data")
  if (!storedData) return null
  try {
    return JSON.parse(storedData)
  } catch {
    return null
  }
}

// Helper function to store auth data
const storeAuthData = (data: { user: User; token: string } | null) => {
  if (typeof window === "undefined") return
  if (data) {
    localStorage.setItem("auth_data", JSON.stringify(data))
  } else {
    localStorage.removeItem("auth_data")
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Check if user is logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedData = getStoredAuthData()
        if (storedData) {
          // Verify token validity with backend
          try {
            const userData = await apiService.user.getProfile(storedData.token)
            setUser(userData)
            setToken(storedData.token)
          } catch (error) {
            // If token is invalid, clear stored data
            console.error("Invalid token:", error)
            storeAuthData(null)
            setUser(null)
            setToken(null)
          }
        }
      } catch (error) {
        console.error("Failed to restore auth state:", error)
        storeAuthData(null)
        setUser(null)
        setToken(null)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      const response = await apiService.auth.login(email, password)
      setToken(response.token)
      setUser(response.user)
      storeAuthData({ user: response.user, token: response.token })
      router.push("/dashboard")
    } catch (error) {
      console.error("Login failed:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true)
    try {
      const response = await apiService.auth.register(name, email, password)
      setToken(response.token)
      setUser(response.user)
      storeAuthData({ user: response.user, token: response.token })
      router.push("/dashboard")
    } catch (error) {
      console.error("Registration failed:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    storeAuthData(null)
    router.push("/login")
  }

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData }
      setUser(updatedUser)
      storeAuthData({ user: updatedUser, token: token || "" })
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
