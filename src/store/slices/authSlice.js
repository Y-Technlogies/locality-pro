import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "../services/authApi";

const initialState = {
  isAuthenticated: false,
  userInfo: {},
  tokens: {},
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLogout: (state) => {
      state.isAuthenticated = false;

      state.userInfo = {};
      state.tokens = {};
    },
  },

  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.signinUser.matchFulfilled,

      (state, { payload }) => {
        state.isAuthenticated = true;
        state.tokens = payload;
      }
    );
    builder.addMatcher(
      authApi.endpoints.userInfo.matchFulfilled,
      (state, { payload }) => {

        state.userInfo = payload[0];
      }
    );
  },
});
export const { userLogout } = authSlice.actions;
