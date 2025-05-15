/**
 * API Configuration for Email Verification Platform
 * Controls whether to use the real API or the development version
 */

import { apiService } from './api-service';
import { devApiService } from './dev-api-service';

// Control whether to use development mode API
// Set this to false to use real API endpoints
export const USE_DEV_API = true;

// Export the appropriate API service based on configuration
export const activeApiService = USE_DEV_API ? devApiService : apiService;

// Development login credentials for testing
export const DEV_CREDENTIALS = {
  // Regular user for testing basic features
  user: {
    email: 'test@example.com',
    password: 'test1234'
  },
  // Admin user for testing admin panel
  admin: {
    email: 'admin@example.com',
    password: 'admin1234'
  }
}; 