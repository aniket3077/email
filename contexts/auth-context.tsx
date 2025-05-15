"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { activeApiService } from "@/lib/api-config"

// Import the proper API service instead of using a mock
// const apiService = {
//   auth: {
//     login: async (email: string, password: string) => {
//       // Simulate API call
//       await new Promise((resolve) => setTimeout(resolve, 1000))
//       return {
//         token: "mock-token-12345",
//         user: {
//           id: "1",
//           name: "John Doe",
//           email,
//           credits: 1250,
//           role: "user",
//           token: "mock-token-12345",
//           company: "",
//           phone: "",
//           address: "",
//           city: "",
//           country: "",
//           postalCode: "",
//           vatNumber: "",
//         },
//       }
//     },
//     register: async (name: string, email: string, password: string) => {
//       // Simulate API call
//       await new Promise((resolve) => setTimeout(resolve, 1000))
//       return {
//         token: "mock-token-12345",
//         user: {
//           id: "1",
//           name,
//           email,
//           credits: 100,
//           role: "user",
//           token: "mock-token-12345",
//           company: "",
//           phone: "",
//           address: "",
//           city: "",
//           country: "",
//           postalCode: "",
//           vatNumber: "",
//         },
//       }
//     },
//   },
//   user: {
//     getProfile: async (token: string) => {
//       // Simulate API call
//       await new Promise((resolve) => setTimeout(resolve, 1000))
//       return {
//         id: "1",
//         name: "John Doe",
//         email: "john@example.com",
//         credits: 1250,
//         role: "user",
//         token,
//         company: "",
//         phone: "",
//         address: "",
//         city: "",
//         country: "",
//         postalCode: "",
//         vatNumber: "",
//       }
//     },
//   },
// }

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
            const userData = await activeApiService.user.getProfile(storedData.token)
            setUser(userData)
            setToken(storedData.token)
            
            // Check if the user was on the admin page before refresh
            const currentPath = window.location.pathname;
            if (userData.role === 'admin' && currentPath.startsWith('/admin')) {
              // If we're already on an admin page and the user is an admin, stay there
              // Do nothing - let the current admin page handle the rendering
            } else if (currentPath === '/login') {
              // If we're on the login page but already authenticated
              if (userData.role === 'admin') {
                router.push('/admin');
              } else {
                router.push('/dashboard');
              }
            }
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
      const response = await activeApiService.auth.login(email, password)
      
      // Check if response has user data
      if (!response || !response.user) {
        throw new Error("Invalid response from authentication service");
      }
      
      // Ensure the user object has a properly set role and token
      const userData = {
        ...response.user,
        role: response.user.role || 'user', // Default to 'user' if role is missing
        token: response.token // Make sure token is also in the user object
      };
      
      setToken(response.token)
      setUser(userData)
      
      // Store the auth data with the explicit role
      storeAuthData({ 
        user: userData, 
        token: response.token 
      })
      
      // Redirect based on user role
      if (userData.role === 'admin') {
        router.push("/admin")
      } else {
        router.push("/dashboard")
      }
    } catch (error: any) {
      console.error("Login failed:", error)
      // Check for specific error types and format them appropriately
      if (error.status) {
        // This is a formatted API error
        throw error;
      } else if (error.message) {
        // This is a regular Error object
        throw {
          status: 500,
          message: error.message,
          data: { message: error.message }
        };
      } else {
        // This is an unknown error format
        throw {
          status: 500,
          message: "An unexpected error occurred during login",
          data: { message: "An unexpected error occurred during login" }
        };
      }
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true)
    try {
      const response = await activeApiService.auth.register(name, email, password)
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
