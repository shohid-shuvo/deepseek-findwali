// src/services/otp.service.ts
import axiosInstance from '@/utils/axiosInstance'

export const OTPService = {
  verifyOTP: async (otp: string) => {
    return await axiosInstance.post('/OTPVerification/otp-verification', { otp })
  },
  resendEmailOTP: async () => {
    return await axiosInstance.post('/OTPVerification/send-email-otp')
  },
  resendMobileOTP: async () => {
    return await axiosInstance.post('/OTPVerification/send-mobile-otp')
  },
  checkVerificationStatus: async () => {
    return await axiosInstance.get('/OTPVerification/email-or-mobile-isverified')
  }
}