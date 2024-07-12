import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
const hoponBaseUrl = 'https://hoponcar-production.up.railway.app/api/v1/';
export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({baseUrl: hoponBaseUrl}),
  endpoints: builder => ({
    registerUser: builder.mutation({
      query: userData => ({
        url: 'user/register-user',
        method: 'POST',
        body: userData,
      }),
    }),
    loginUser: builder.mutation({
      query: loginData => ({
        url: 'user/login-user',
        method: 'POST',
        body: loginData,
      }),
    }),
    verifyOtp: builder.mutation({
      query: otpData => ({
        url: 'user/verify-otp',
        method: 'POST',
        body: otpData,
      }),
    }),
    resendOtp: builder.mutation({
      query: otpData => ({
        url: 'user/reset-otp',
        method: 'POST',
        body: otpData,
      }),
    }),
    forgetPassword: builder.mutation({
      query: phone => ({
        url: 'user/forget-password-passenger',
        method: 'POST',
        body: phone,
      }),
    }),
    resetPassword: builder.mutation({
      query: phone => ({
        url: 'user/reset-password',
        method: 'POST',
        body: phone,
      }),
    }),
    verifyresent: builder.mutation({
      query: userData => ({
        url: 'user/resend-otp',
        method: 'POST',
        body: userData,
      }),
    }),

    createBooking: builder.mutation({
      query: userData => ({
        url: 'bookings/create-booking',
        method: 'POST',
        body: userData,
      }),
    }),
  }),
});
export const {
  useRegisterUserMutation,
  useResendOtpMutation,
  useLoginUserMutation,
  useVerifyOtpMutation,
  useForgetPasswordMutation,
  useResetPassMutation,
  useVerifyresentMutation,
  useCreateBookingMutation,
} = userApi;

// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// const hoponBaseUrl = 'https://hoponcar-production.up.railway.app/api/v1/';

// export const userApi = createApi({
//   reducerPath: 'userApi',
//   baseQuery: fetchBaseQuery({ baseUrl: hoponBaseUrl }),
//   endpoints: (builder) => ({
//     registerUser: builder.mutation({
//       query: (userData) => ({
//         url: 'user/register-user',
//         method: 'POST',
//         body: userData,
//       }),
//     }),
//     loginUser: builder.mutation({
//       query: (loginData) => ({
//         url: 'user/login-user',
//         method: 'POST',
//         body: loginData,
//       }),
//     }),
//     verifyOtp: builder.mutation({
//       query: (otpData) => ({
//         url: 'user/verify-otp',
//         method: 'POST',
//         body: otpData,
//       }),
//   }),
// });

// export const { useRegisterUserMutation, useLoginUserMutation,useVerifyOtpMutation } = userApi;
