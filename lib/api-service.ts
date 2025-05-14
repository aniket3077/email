/**
 * API Service for Email Verification Platform
 * Handles all API requests to the backend
 */

// Base API URL - would come from environment variables in production
const API_BASE_URL = "https://api.emailverify.com/v1"

// API request headers
const getHeaders = (token?: string) => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`
  }

  return headers
}

// Error handling
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw {
      status: response.status,
      statusText: response.statusText,
      data: errorData,
    }
  }

  return response.json()
}

// API endpoints
export const apiService = {
  // Auth endpoints
  auth: {
    login: async (email: string, password: string) => {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({ email, password }),
      })

      return handleResponse(response)
    },

    register: async (name: string, email: string, password: string) => {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({ name, email, password }),
      })

      return handleResponse(response)
    },

    forgotPassword: async (email: string) => {
      const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({ email }),
      })

      return handleResponse(response)
    },
  },

  // User endpoints
  user: {
    getProfile: async (token: string) => {
      const response = await fetch(`${API_BASE_URL}/user/profile`, {
        method: "GET",
        headers: getHeaders(token),
      })

      return handleResponse(response)
    },

    updateProfile: async (token: string, profileData: any) => {
      const response = await fetch(`${API_BASE_URL}/user/profile`, {
        method: "PUT",
        headers: getHeaders(token),
        body: JSON.stringify(profileData),
      })

      return handleResponse(response)
    },
  },

  // Email verification endpoints
  verification: {
    verifyEmails: async (token: string, emails: string[]) => {
      const response = await fetch(`${API_BASE_URL}/verify/emails`, {
        method: "POST",
        headers: getHeaders(token),
        body: JSON.stringify({ emails }),
      })

      if (!response.ok) {
        throw new Error("Failed to verify emails")
      }

      const data = await response.json()
      return {
        id: data.id,
        valid: data.valid || 0,
        invalid: data.invalid || 0,
        risky: data.risky || 0,
        total: emails.length,
      }
    },

    verifyFile: async (token: string, file: File) => {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch(`${API_BASE_URL}/verify/file`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          // Don't set Content-Type here, it will be set automatically with boundary
        },
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Failed to verify file")
      }

      return handleResponse(response)
    },

    getVerificationResults: async (token: string, verificationId: string) => {
      const response = await fetch(`${API_BASE_URL}/verify/results/${verificationId}`, {
        method: "GET",
        headers: getHeaders(token),
      })

      if (!response.ok) {
        throw new Error("Failed to get verification results")
      }

      return handleResponse(response)
    },

    getAllVerifications: async (token: string, page = 1, limit = 10) => {
      const response = await fetch(`${API_BASE_URL}/verify/history?page=${page}&limit=${limit}`, {
        method: "GET",
        headers: getHeaders(token),
      })

      if (!response.ok) {
        throw new Error("Failed to get verification history")
      }

      return handleResponse(response)
    },
  },

  // Credits endpoints
  credits: {
    getBalance: async (token: string) => {
      const response = await fetch(`${API_BASE_URL}/credits/balance`, {
        method: "GET",
        headers: getHeaders(token),
      })

      return handleResponse(response)
    },

    purchaseCredits: async (token: string, amount: number, paymentMethod: string) => {
      const response = await fetch(`${API_BASE_URL}/credits/purchase`, {
        method: "POST",
        headers: getHeaders(token),
        body: JSON.stringify({
          amount,
          paymentMethod,
          currency: "INR",
          type: "subscription",
        }),
      })

      return handleResponse(response)
    },

    getTransactionHistory: async (token: string, page = 1, limit = 10) => {
      const response = await fetch(`${API_BASE_URL}/credits/transactions?page=${page}&limit=${limit}`, {
        method: "GET",
        headers: getHeaders(token),
      })

      return handleResponse(response)
    },

    getSubscriptionDetails: async (token: string) => {
      const response = await fetch(`${API_BASE_URL}/credits/subscription`, {
        method: "GET",
        headers: getHeaders(token),
      })

      return handleResponse(response)
    },

    cancelSubscription: async (token: string) => {
      const response = await fetch(`${API_BASE_URL}/credits/subscription`, {
        method: "DELETE",
        headers: getHeaders(token),
      })

      return handleResponse(response)
    },
  },
}
