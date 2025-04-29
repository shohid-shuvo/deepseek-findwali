// import axios from 'axios';

// const axiosInstance = axios.create({
//   baseURL: 'https://findwali.dusrasoftltd.com/api', 
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });


// axiosInstance.interceptors.response.use(
//   response => response,
//   error => {
//     if (error.response) {
//       // Handle duplicate email case (when server returns 400 with specific error)
//       if (error.response.status === 400 && 
//           error.response.data?.errors?.some((e: any) => e.code === 'DuplicateUserName')) {
//         return Promise.reject({
//           // message: 'This email is already registered',
//           code: 'DuplicateUserName',
//           details: error.response.data?.errors
//         });
//       }
//       // Handle other 400 errors
//       else if (error.response.status === 409) {
//         console.error('Validation Error:', error.response.data);
//         return Promise.reject({
//           message: error.response.data?.message || 'Validation failed',
//           details: error.response.data?.errors || {}
//         });
//       }
      
//       // Handle 409 conflicts
//       else if (error.response.status === 400) {
//         return Promise.reject({
//           // message: 'This email is already registered',
//           code: 'DuplicateUserName'
//         });
//       }

//       // Handle OTP specific errors
//       if (error.response.status === 400 && error.response.data?.code === 'InvalidOTP') {
//         return Promise.reject({
//           ...error,
//           message: 'Invalid OTP. Please try again.',
//           isOTPError: true
//         })
//       }
//       // Handle expired OTP
//       if (error.response.status === 400 && error.response.data?.code === 'ExpiredOTP') {
//         return Promise.reject({
//           ...error,
//           message: 'OTP has expired. Please request a new one.',
//           isOTPError: true
//         })
//       }
//     }
//     const token = getAuthToken();
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;

// src/utils/axiosInstance.ts
import axios from 'axios';
import { getAuthToken, clearAuthToken } from './auth'; 
import { jwtDecode } from 'jwt-decode'; 

const axiosInstance = axios.create({
  baseURL: 'https://findwali.dusrasoftltd.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
axiosInstance.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    try {
      const decoded = jwtDecode(token);
      if (decoded.exp && decoded.exp * 1000 < Date.now()) {
        clearAuthToken();
        window.location.href = '/login';
        return Promise.reject(new Error('Token expired'));
      }
      config.headers.Authorization = `Bearer ${token}`;
    } catch (error) {
      clearAuthToken();
      window.location.href = '/login';
      return Promise.reject(error);
    }
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Handle 400 Bad Request (validation errors)
      if (error.response.status === 400) {
        const errorData = error.response.data;
        
        // Handle the specific validation error format you're seeing
        if (errorData.errors && typeof errorData.errors === 'object') {
          const errorMessages = Object.entries(errorData.errors)
            .map(([field, messages]) => {
              if (Array.isArray(messages)) {
                return `${field}: ${messages.join(', ')}`;
              }
              return `${field}: ${messages}`;
            })
            .join('\n');
          
          return Promise.reject({
            message: errorData.title || 'Validation failed',
            details: errorMessages,
            validationErrors: errorData.errors
          });
        }
        
        // Handle other 400 errors
        return Promise.reject({
          message: errorData.title || 'Bad request',
          details: errorData
        });
      }

      // Handle 401 Unauthorized
      if (error.response.status === 401) {
        clearAuthToken();
        window.location.href = '/login';
        return Promise.reject({
          message: 'Session expired. Please login again.'
        });
      }

      // Handle 409 Conflict
      if (error.response.status === 409) {
        console.error('Conflict Error:', error.response.data);
        return Promise.reject({
          message: error.response.data?.message || 'Conflict occurred',
          details: error.response.data
        });
      }
    }

    // Handle network errors or other cases
    return Promise.reject(error);
  }
);

export default axiosInstance;