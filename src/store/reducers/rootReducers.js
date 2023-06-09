import { authApi } from "../services/authApi";
import { combineReducers } from "@reduxjs/toolkit";
import { authSlice } from "../slices/authSlice";
import { appApi } from "../services/appApi";
import { addressSlice } from "../slices/addressSlice";
import { introSlice } from "../slices/introSlice";

export default combineReducers({
  [authSlice.name]: authSlice.reducer,
  [addressSlice.name]: addressSlice.reducer,
  [introSlice.name]: introSlice.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [appApi.reducerPath]: appApi.reducer,
});
