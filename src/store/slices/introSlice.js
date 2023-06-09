import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  introShown: false,
};
export const introSlice = createSlice({
  name: "intro",
  initialState,
  reducers: {
    introFn: (state) => {
      state.introShown = true;
    },
  },
});
export const { introFn } = introSlice.actions;
