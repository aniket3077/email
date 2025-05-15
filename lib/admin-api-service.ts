// API Service for Admin Panel
// This file contains all API calls to the backend for admin functionality

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Base API URL - replace with your actual backend URL when connecting via Postman
const API_BASE_URL = process.env.NEXT_PUBLIC_ADMIN_API_URL || 'http://localhost:5000/api';

// Helper function to handle API errors
async function handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    return {
      success: false,
      error: errorData?.message || `Error: ${response.status} ${response.statusText}`
    };
  }

  try {
    const data = await response.json();
    return {
      success: true,
      data
    };
  } catch (error) {
    return {
      success: false,
      error: 'Error parsing response data'
    };
  }
}

// Common headers for all requests
function getHeaders(token?: string): HeadersInit {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
}

// Authentication API
export const adminAuthApi = {
  login: async (email: string, password: string): Promise<ApiResponse<any>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/auth/login`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ email, password }),
      });

      return handleResponse(response);
    } catch (error) {
      return {
        success: false,
        error: (error as Error).message
      };
    }
  },

  validateAdminToken: async (token: string): Promise<ApiResponse<any>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/auth/validate`, {
        headers: getHeaders(token),
      });

      return handleResponse(response);
    } catch (error) {
      return {
        success: false,
        error: (error as Error).message
      };
    }
  },
};

// Users API
export const adminUsersApi = {
  getAllUsers: async (token: string): Promise<ApiResponse<any[]>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/users`, {
        headers: getHeaders(token),
      });

      return handleResponse(response);
    } catch (error) {
      return {
        success: false,
        error: (error as Error).message
      };
    }
  },

  getUserById: async (userId: string, token: string): Promise<ApiResponse<any>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/users/${userId}`, {
        headers: getHeaders(token),
      });

      return handleResponse(response);
    } catch (error) {
      return {
        success: false,
        error: (error as Error).message
      };
    }
  },

  createUser: async (userData: any, token: string): Promise<ApiResponse<any>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/users`, {
        method: 'POST',
        headers: getHeaders(token),
        body: JSON.stringify(userData),
      });

      return handleResponse(response);
    } catch (error) {
      return {
        success: false,
        error: (error as Error).message
      };
    }
  },

  updateUser: async (userId: string, userData: any, token: string): Promise<ApiResponse<any>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/users/${userId}`, {
        method: 'PUT',
        headers: getHeaders(token),
        body: JSON.stringify(userData),
      });

      return handleResponse(response);
    } catch (error) {
      return {
        success: false,
        error: (error as Error).message
      };
    }
  },

  deleteUser: async (userId: string, token: string): Promise<ApiResponse<any>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/users/${userId}`, {
        method: 'DELETE',
        headers: getHeaders(token),
      });

      return handleResponse(response);
    } catch (error) {
      return {
        success: false,
        error: (error as Error).message
      };
    }
  },
};

// Email Lists API
export const adminEmailListsApi = {
  getAllLists: async (token: string): Promise<ApiResponse<any[]>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/email-lists`, {
        headers: getHeaders(token),
      });

      return handleResponse(response);
    } catch (error) {
      return {
        success: false,
        error: (error as Error).message
      };
    }
  },

  getListById: async (listId: string, token: string): Promise<ApiResponse<any>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/email-lists/${listId}`, {
        headers: getHeaders(token),
      });

      return handleResponse(response);
    } catch (error) {
      return {
        success: false,
        error: (error as Error).message
      };
    }
  },

  createList: async (listData: any, token: string): Promise<ApiResponse<any>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/email-lists`, {
        method: 'POST',
        headers: getHeaders(token),
        body: JSON.stringify(listData),
      });

      return handleResponse(response);
    } catch (error) {
      return {
        success: false,
        error: (error as Error).message
      };
    }
  },

  updateList: async (listId: string, listData: any, token: string): Promise<ApiResponse<any>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/email-lists/${listId}`, {
        method: 'PUT',
        headers: getHeaders(token),
        body: JSON.stringify(listData),
      });

      return handleResponse(response);
    } catch (error) {
      return {
        success: false,
        error: (error as Error).message
      };
    }
  },

  deleteList: async (listId: string, token: string): Promise<ApiResponse<any>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/email-lists/${listId}`, {
        method: 'DELETE',
        headers: getHeaders(token),
      });

      return handleResponse(response);
    } catch (error) {
      return {
        success: false,
        error: (error as Error).message
      };
    }
  },
};

// Coupons API
export const adminCouponsApi = {
  getAllCoupons: async (token: string): Promise<ApiResponse<any[]>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/coupons`, {
        headers: getHeaders(token),
      });

      return handleResponse(response);
    } catch (error) {
      return {
        success: false,
        error: (error as Error).message
      };
    }
  },

  getCouponById: async (couponId: string, token: string): Promise<ApiResponse<any>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/coupons/${couponId}`, {
        headers: getHeaders(token),
      });

      return handleResponse(response);
    } catch (error) {
      return {
        success: false,
        error: (error as Error).message
      };
    }
  },

  createCoupon: async (couponData: any, token: string): Promise<ApiResponse<any>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/coupons`, {
        method: 'POST',
        headers: getHeaders(token),
        body: JSON.stringify(couponData),
      });

      return handleResponse(response);
    } catch (error) {
      return {
        success: false,
        error: (error as Error).message
      };
    }
  },

  updateCoupon: async (couponId: string, couponData: any, token: string): Promise<ApiResponse<any>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/coupons/${couponId}`, {
        method: 'PUT',
        headers: getHeaders(token),
        body: JSON.stringify(couponData),
      });

      return handleResponse(response);
    } catch (error) {
      return {
        success: false,
        error: (error as Error).message
      };
    }
  },

  deleteCoupon: async (couponId: string, token: string): Promise<ApiResponse<any>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/coupons/${couponId}`, {
        method: 'DELETE',
        headers: getHeaders(token),
      });

      return handleResponse(response);
    } catch (error) {
      return {
        success: false,
        error: (error as Error).message
      };
    }
  },
};

// Credits and Subscription Management API
export const adminCreditsApi = {
  getAllTransactions: async (token: string): Promise<ApiResponse<any[]>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/credits/transactions`, {
        headers: getHeaders(token),
      });

      return handleResponse(response);
    } catch (error) {
      return {
        success: false,
        error: (error as Error).message
      };
    }
  },

  addCreditsToUser: async (userId: string, amount: number, token: string): Promise<ApiResponse<any>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/credits/add`, {
        method: 'POST',
        headers: getHeaders(token),
        body: JSON.stringify({ userId, amount }),
      });

      return handleResponse(response);
    } catch (error) {
      return {
        success: false,
        error: (error as Error).message
      };
    }
  },

  getAllSubscriptions: async (token: string): Promise<ApiResponse<any[]>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/subscriptions`, {
        headers: getHeaders(token),
      });

      return handleResponse(response);
    } catch (error) {
      return {
        success: false,
        error: (error as Error).message
      };
    }
  },
  
  updateSubscription: async (subscriptionId: string, subscriptionData: any, token: string): Promise<ApiResponse<any>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/subscriptions/${subscriptionId}`, {
        method: 'PUT',
        headers: getHeaders(token),
        body: JSON.stringify(subscriptionData),
      });

      return handleResponse(response);
    } catch (error) {
      return {
        success: false,
        error: (error as Error).message
      };
    }
  },
};

// Analytics API
export const adminAnalyticsApi = {
  getDashboardStats: async (token: string): Promise<ApiResponse<any>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/analytics/dashboard`, {
        headers: getHeaders(token),
      });

      return handleResponse(response);
    } catch (error) {
      return {
        success: false,
        error: (error as Error).message
      };
    }
  },

  getUserStats: async (token: string): Promise<ApiResponse<any>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/analytics/users`, {
        headers: getHeaders(token),
      });

      return handleResponse(response);
    } catch (error) {
      return {
        success: false,
        error: (error as Error).message
      };
    }
  },

  getVerificationStats: async (token: string): Promise<ApiResponse<any>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/analytics/verifications`, {
        headers: getHeaders(token),
      });

      return handleResponse(response);
    } catch (error) {
      return {
        success: false,
        error: (error as Error).message
      };
    }
  },
  
  getRevenueStats: async (period: string, token: string): Promise<ApiResponse<any>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/analytics/revenue?period=${period}`, {
        headers: getHeaders(token),
      });

      return handleResponse(response);
    } catch (error) {
      return {
        success: false,
        error: (error as Error).message
      };
    }
  },
}; 