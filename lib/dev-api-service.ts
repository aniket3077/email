/**
 * Development API Service for Email Verification Platform
 * Uses local verification algorithm instead of making actual API calls
 */

import { verifyEmails as localVerifyEmails } from './email-verification';

// Mock API responses and delays
const simulateApiDelay = (ms = 800) => new Promise(resolve => setTimeout(resolve, ms));

// Generate a random ID for verification requests
const generateVerificationId = () => {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  return `dev-${timestamp}-${random}`;
};

// Store verification results in memory for development
const verificationStore = new Map();

// Development API service
export const devApiService = {
  // Auth endpoints with mock responses
  auth: {
    login: async (email: string, password: string) => {
      await simulateApiDelay();
      
      // Simple validation - accept any login with valid email format
      if (!email.includes('@') || password.length < 6) {
        throw { status: 401, statusText: 'Unauthorized', data: { message: 'Invalid credentials' } };
      }
      
      // Demo user for testing
      return {
        user: {
          id: 'dev-user-123',
          name: 'Dev User',
          email,
          credits: 1000,
          role: email.includes('admin') ? 'admin' : 'user',
        },
        token: 'dev-token-' + Date.now(),
      };
    },

    register: async (name: string, email: string, password: string) => {
      await simulateApiDelay(1200);
      
      if (!email.includes('@') || password.length < 6) {
        throw { 
          status: 400, 
          statusText: 'Bad Request', 
          data: { message: 'Invalid email or password too short' } 
        };
      }
      
      return {
        user: {
          id: 'dev-user-' + Date.now(),
          name,
          email,
          credits: 500, // Free credits for new users
          role: 'user',
        },
        token: 'dev-token-' + Date.now(),
      };
    },

    forgotPassword: async (email: string) => {
      await simulateApiDelay();
      
      // Always return success for development
      return { success: true, message: 'Password reset link sent' };
    },
  },

  // User endpoints
  user: {
    getProfile: async (token: string) => {
      await simulateApiDelay();
      
      // Extract user ID from token (demo purposes)
      const isAdmin = token.includes('admin');
      
      return {
        id: 'dev-user-123',
        name: isAdmin ? 'Admin User' : 'Dev User',
        email: isAdmin ? 'admin@example.com' : 'user@example.com',
        credits: isAdmin ? 10000 : 1000,
        role: isAdmin ? 'admin' : 'user',
        subscription: isAdmin ? 'enterprise' : 'basic',
        verifications: 57,
        created_at: '2023-01-15T00:00:00Z',
      };
    },

    updateProfile: async (token: string, profileData: any) => {
      await simulateApiDelay();
      
      return {
        ...profileData,
        id: 'dev-user-123',
        updated_at: new Date().toISOString(),
      };
    },
  },

  // Email verification endpoints
  verification: {
    verifyEmails: async (token: string, emails: string[]) => {
      await simulateApiDelay(emails.length * 50); // Simulate processing time per email
      
      // Use our local verification algorithm
      const { summary, results } = localVerifyEmails(emails);
      
      // Create a verification record with random ID
      const verificationId = generateVerificationId();
      
      // Store for retrieval later
      verificationStore.set(verificationId, {
        id: verificationId,
        results,
        summary,
        created_at: new Date().toISOString(),
        status: 'completed',
      });
      
      // Return immediate summary with ID for retrieving full results
      return {
        id: verificationId,
        ...summary,
      };
    },

    verifyFile: async (token: string, file: File) => {
      // Read the file content and extract emails
      const text = await file.text();
      let emails: string[] = [];
      
      // Simple parsing for CSV or TXT files
      if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
        // Basic CSV parsing - split by newlines and commas
        emails = text
          .split(/[\r\n]+/)
          .map(line => line.split(','))
          .flat()
          .filter(email => email.trim())
          .map(email => email.trim());
      } else {
        // For plain text, just split by whitespace or commas
        emails = text.split(/[\s,]+/).filter(Boolean);
      }
      
      // Simulate longer processing time for files
      await simulateApiDelay(1500);
      
      // Use the same verification logic as verifyEmails
      const { summary, results } = localVerifyEmails(emails);
      
      const verificationId = generateVerificationId();
      verificationStore.set(verificationId, {
        id: verificationId,
        results,
        summary,
        created_at: new Date().toISOString(),
        status: 'completed',
        filename: file.name,
      });
      
      return {
        id: verificationId,
        ...summary,
      };
    },

    getVerificationResults: async (token: string, verificationId: string) => {
      await simulateApiDelay();
      
      const verification = verificationStore.get(verificationId);
      
      if (!verification) {
        throw { status: 404, statusText: 'Not Found', data: { message: 'Verification not found' } };
      }
      
      return verification;
    },

    getAllVerifications: async (token: string, page = 1, limit = 10) => {
      await simulateApiDelay();
      
      // Convert the Map values to an array and sort by creation date
      const verifications = Array.from(verificationStore.values())
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      
      // Paginate the results
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      const paginatedVerifications = verifications.slice(startIndex, endIndex);
      
      return {
        verifications: paginatedVerifications,
        pagination: {
          total: verifications.length,
          page,
          limit,
          pages: Math.ceil(verifications.length / limit),
        },
      };
    },
  },

  // Credits endpoints
  credits: {
    getBalance: async (token: string) => {
      await simulateApiDelay();
      
      const isAdmin = token.includes('admin');
      
      return {
        credits: isAdmin ? 10000 : 1000,
        last_updated: new Date().toISOString(),
      };
    },

    purchaseCredits: async (token: string, amount: number, paymentMethod: string) => {
      await simulateApiDelay(1500);
      
      return {
        transaction_id: 'dev-tx-' + Date.now(),
        credits_added: amount,
        total_credits: 1000 + amount,
        status: 'success',
        payment_method: paymentMethod,
        date: new Date().toISOString(),
      };
    },

    getTransactionHistory: async (token: string, page = 1, limit = 10) => {
      await simulateApiDelay();
      
      // Generate mock transactions
      const transactions = Array.from({ length: 25 }, (_, i) => ({
        id: `dev-tx-${i}`,
        amount: Math.floor(Math.random() * 5) * 500,
        type: i % 3 === 0 ? 'purchase' : 'usage',
        status: 'completed',
        date: new Date(Date.now() - i * 86400000).toISOString(),
      }));
      
      // Paginate the results
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      
      return {
        transactions: transactions.slice(startIndex, endIndex),
        pagination: {
          total: transactions.length,
          page,
          limit,
          pages: Math.ceil(transactions.length / limit),
        },
      };
    },

    getSubscriptionDetails: async (token: string) => {
      await simulateApiDelay();
      
      const isAdmin = token.includes('admin');
      
      return {
        plan: isAdmin ? 'enterprise' : 'basic',
        status: 'active',
        next_billing_date: new Date(Date.now() + 30 * 86400000).toISOString(),
        price: isAdmin ? 2499 : 499,
        credits_per_month: isAdmin ? 10000 : 1000,
        auto_renew: true,
      };
    },

    cancelSubscription: async (token: string) => {
      await simulateApiDelay(1000);
      
      return {
        success: true,
        message: 'Subscription cancelled successfully',
        end_date: new Date(Date.now() + 30 * 86400000).toISOString(),
      };
    },
  },
}; 