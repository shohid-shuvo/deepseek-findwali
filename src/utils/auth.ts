// // src/utils/auth.ts
// const AUTH_TOKEN_KEY = 'findwali_auth_token';

// // Get token from storage
// export const getAuthToken = (): string | null => {
//   if (typeof window !== 'undefined') {
//     return localStorage.getItem(AUTH_TOKEN_KEY);
//   }
//   return null;
// };

// // Store token in storage
// export const storeAuthToken = (token: string): void => {
//   if (typeof window !== 'undefined') {
//     localStorage.setItem(AUTH_TOKEN_KEY, token);
//   }
// };

// // Remove token from storage
// export const clearAuthToken = (): void => {
//   if (typeof window !== 'undefined') {
//     localStorage.removeItem(AUTH_TOKEN_KEY);
//   }
// };

// // Check if token exists and is valid
// export const isAuthenticated = (): boolean => {
//   const token = getAuthToken();
//   return !!token; // Add proper token validation if needed
// };

// src/utils/auth.ts
const AUTH_TOKEN_KEY = 'findwali_auth_token';
type StorageType = 'session' | 'local';

// Get token from sessionStorage
export const getAuthToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return sessionStorage.getItem(AUTH_TOKEN_KEY);
  }
  return null;
};

// Store token in sessionStorage
export const storeAuthToken = (token: string, type: StorageType = 'session'): void => {
  if (typeof window !== 'undefined') {
    const storage = type === 'session' ? sessionStorage : localStorage;
    storage.setItem(AUTH_TOKEN_KEY, token);
  }
};

// Remove token from sessionStorage
export const clearAuthToken = (): void => {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem(AUTH_TOKEN_KEY);
  }
};

// Check if token exists
export const isAuthenticated = (): boolean => {
  return !!getAuthToken();
};