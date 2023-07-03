import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseURL from "../../utils/baseURL";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    headers: {
      "Content-Type": "multipart/form-data",
      "Content-type": "application/json; charset=UTF-8",
      Accept: "application/json, text/plain, */*", // It can be used to overcome cors errors
    },
    prepareHeaders: (headers, { getState }) => {
      const token = getState()?.auth?.tokens?.accessToken;
      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (body) => {
        //console.log({body});
        return {
          url: "/auth/contractor_register",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
          method: "POST",
          body,
        };
      },
    }),
    sendOTP: builder.mutation({
      query: (body) => {
        //console.log({body});
        return {
          url: "verify/send_otp",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
          method: "POST",
          body,
        };
      },
    }),
    verifyOTP: builder.mutation({
      query: (body) => {
        //console.log({body});
        return {
          url: "verify/verify_contractor_otp",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
          method: "POST",
          body,
        };
      },
    }),
    signinUser: builder.mutation({
      query: (body) => {
        //console.log({body});
        return {
          url: "/auth/contractor_login",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
          method: "POST",
          body,
        };
      },
    }),
    userInfo: builder.query({
      query: (body) => {
        return {
          url: "/auth/getContractorByToken",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
          method: "GET",
          body,
          validateStatus: (response, result) =>
            response.status === 200 && !result.isError, // Our tricky API always returns a 200, but sets an `isError` property when there is an error.
        };
      },
    }),
    getAllCategories: builder.query({
      query: () => {
        return {
          url: "/category/get_all_categories",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
          method: "GET",
          validateStatus: (response, result) =>
            response.status === 200 && !result.isError, // Our tricky API always returns a 200, but sets an `isError` property when there is an error.
        };
      },
    }),
    getAllSubCategories: builder.query({
      query: (body) => {
        return {
          url: `category/get_all_sub_categories?category=${body}`,
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
          method: "GET",
          validateStatus: (response, result) =>
            response.status === 200 && !result.isError, // Our tricky API always returns a 200, but sets an `isError` property when there is an error.
        };
      },
    }),
    forgotPasswordSendOTP: builder.mutation({
      query: (body) => {
        ////console.log({body});
        return {
          url: "/verify/send_forgot_password_otp",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
          method: "POST",
          body,
        };
      },
    }),
    forgotPassword: builder.mutation({
      query: (body) => {
        ////console.log({body});
        return {
          url: "/auth/forgot_password",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
          method: "POST",
          body,
        };
      },
    }),
    updateProfile: builder.mutation({
      query: (body) => {
        ////console.log({body});
        return {
          url: "/auth/contractor_update",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
          method: "POST",
          body,
        };
      },
    }),
  }),
});

export const {
  useSignUpMutation,
  useSendOTPMutation,
  useSigninUserMutation,
  useUserInfoQuery,
  useVerifyOTPMutation,
  useGetAllCategoriesQuery,
  useGetAllSubCategoriesQuery,
  useForgotPasswordSendOTPMutation,
  useForgotPasswordMutation,
  useUpdateProfileMutation,
} = authApi;
