import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  setAddress: false,
  location: {},
};
export const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    setAddress: (state, { payload }) => {
      const { location } = payload;
      state.setAddress = true;
      state.location = location;
    },

    removeAddress: (state) => {
      state.setAddress = false;
      state.location = {};
    },
  },
});
export const { setAddress, removeAddress } = addressSlice.actions;
