// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseURL from "../../utils/baseURL";

// initialize an empty api service that we'll inject endpoints into later as needed
export const appApi = createApi({
  baseQuery: fetchBaseQuery({
    reducerPath: "appApi",
    baseUrl: baseURL,
    headers: {
      "Content-Type": "multipart/form-data",
      "Content-type": "application/json; charset=UTF-8",
      "Content-Type": "image/png",
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
    deleteUser: builder.mutation({
      query: (id) => {
        return {
          url: `/auth/delete_contractor/${id}`,
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
          method: "DELETE",
          validateStatus: (response, result) =>
            response.status === 200 && !result.isError, // Our tricky API always returns a 200, but sets an `isError` property when there is an error.
        };
      },
    }),
    getJobs: builder.query({
      query: () => {
        return {
          url: "/job/get_jobs?page=1&limit=100&search=",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
          method: "GET",
        };
      },
    }),
    getContractorJob: builder.query({
      query: (body) => {
        console.log("url=====>");
        return {
          url: `/job/get_contractor_jobs?user=${body}`,
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
          method: "GET",
        };
      },
    }),
    sendProposal: builder.mutation({
      query: (body) => {
        return {
          url: "/proposal/add_proposal",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
          method: "POST",
          body,
        };
      },
    }),
    getSubmittedProposal: builder.query({
      query: () => {
        return {
          url: "/proposal/get_contractor_submitted_proposals",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
          method: "GET",
        };
      },
    }),
    getSelectedProposal: builder.query({
      query: () => {
        return {
          url: "/proposal/get_contractor_selected_proposals",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
          method: "GET",
        };
      },
    }),
    getOneProposal: builder.query({
      query: (body) => {
        return {
          url: `/proposal/get_one_proposal/${body}`,
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
          method: "GET",
        };
      },
    }),
    myChatRecord: builder.query({
      query: ({ id, search }) => {
        return {
          url: `/chat/get_my_chats?id=${id}&search=${search}&role=pro`,
          method: "GET",
          validateStatus: (response, result) =>
            response.status === 200 && !result.isError, // Our tricky API always returns a 200, but sets an `isError` property when there is an error.
        };
      },
    }),
    myArchiveChat: builder.query({
      query: ({ id, search }) => {
        return {
          url: `/chat/get_my_archive_chats?id=${id}&search=${search}&role=pro`,
          method: "GET",
          validateStatus: (response, result) =>
            response.status === 200 && !result.isError, // Our tricky API always returns a 200, but sets an `isError` property when there is an error.
        };
      },
    }),
    sendMessage: builder.mutation({
      query: (body) => {
        return {
          url: "/chat/send_message",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
          method: "POST",
          body,
        };
      },
    }),
    getMessages: builder.query({
      query: (body) => {
        return {
          url: `/chat/get_messages?chat=${body}`,
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
          method: "GET",
        };
      },
    }),
    deleteChat: builder.mutation({
      query: (id) => {
        return {
          url: `/chat/delete_chat/${id}`,
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
          method: "DELETE",
        };
      },
    }),
    checkBalance: builder.query({
      query: () => {
        return {
          url: "/balance/get_current_balance",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
          method: "GET",
        };
      },
    }),
    sendWithdrawRequest: builder.mutation({
      query: (body) => {
        return {
          url: "/balance/add_withdraw_request",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
          method: "POST",
          body,
        };
      },
    }),
    getWithdrawHistory: builder.query({
      query: ({ start_date, end_date, contractor }) => {
        return {
          url: `/balance/get_withdraw_lists?page=1&limit=25&search=&start_date=${start_date}&end_date=${end_date}&contractor=${contractor}&isDisbursed=`,
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
          method: "GET",
        };
      },
    }),
  }),
});
export const {
  useDeleteUserMutation,
  useGetJobsQuery,
  useSendProposalMutation,
  useGetSubmittedProposalQuery,
  useGetSelectedProposalQuery,
  useMyChatRecordQuery,
  useSendMessageMutation,
  useGetMessagesQuery,
  useGetOneProposalQuery,
  useGetContractorJobQuery,
  useDeleteChatMutation,
  useCheckBalanceQuery,
  useSendWithdrawRequestMutation,
  useGetWithdrawHistoryQuery,
  useMyArchiveChatQuery
} = appApi;
