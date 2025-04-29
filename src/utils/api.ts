import axiosInstance from './axiosInstance';

// Generic API request handler
export const apiRequest = async (method: 'get' | 'post' | 'put' | 'delete', endpoint: string, data?: any) => {
  const response = await axiosInstance({
    method,
    url: endpoint,
    data,
  });
  return response.data;
};

export const checkEmailExists = async (email: string) => {
  return await apiRequest('get', `/Auth/check-email?email=${encodeURIComponent(email)}`);
};

// Authentication APIs
export const login = async (data: any) => await apiRequest('post', '/Auth/login', data);
// export const register = async (data: any) => await apiRequest('post', '/Auth/register', data);
export const register = async (data: any) => {
  const payload = {
    fullName: data.fullName,
    gender: data.gender,
    email: data.email,
    mobile: data.mobile,
    password: data.password,
    dateOfBirth: data.dateOfBirth || null,
    address: data.address || null
  };
  return await apiRequest('post', '/Auth/register', payload);
};
export const forgotPassword = async (data: { email: string }) => {
  return await axiosInstance.post('/Auth/forgot-password', data);
};
export const changePassword = async (data: any) => await apiRequest('post', '/Auth/change-password', data);
export const googleLogin = async () => await apiRequest('get', '/Auth/google-login');
export const googleResponse = async () => await apiRequest('get', '/Auth/google-response');
export const getUserList = async () => await apiRequest('get', '/Auth/user-list');

// BioData APIs
interface GeneralInfoData {
  name: string;
  age: number;
  address: string;
  // Add other fields as required
}

export const addOrUpdateGeneralInfo = async (data: GeneralInfoData) => await apiRequest('post', '/BioData/add-update-general-info', data);
export const addOrUpdateFamilyInfo = async (data: any) => await apiRequest('post', '/BioData/add-update-family-info', data);

// OTP Verification APIs
export const sendMobileOtp = async (data: any) => await apiRequest('post', '/OTPVerification/send-mobile-otp', data);
export const verifyOtp = async (data: { emailOrMobileNumber: string, otp: string }) => {
  return await apiRequest('post', '/OTPVerification/otp-verification', data)
};

export const checkVerificationStatus = async () => await apiRequest('get', '/OTPVerification/email-or-mobile-isverified');


// src/utils/api.ts
export const sendEmailOtp = async (email: string) => {
  try {
    // Send email as query parameter with empty body
    const response = await axiosInstance.post(
      `/OTPVerification/send-email-otp?Email=${encodeURIComponent(email)}`,
      {} // Empty body
    );
    
    if (response.data.success || response.data.message === "OTP Sent Successfully") {
      return {
        success: true,
        message: response.data.message,
        email: email
      };
    }
    throw new Error(response.data.message || "Failed to send OTP");
  } catch (error: any) {
    console.error('OTP error:', error.response?.data || error.message);
    throw error;
  }
};



