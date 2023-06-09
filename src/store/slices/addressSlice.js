import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  setAddress: false,
  location: {},
  address: {},
};
export const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    setAddress: (state, { payload }) => {
      const { address, location } = payload;
      state.setAddress = true;
      state.address = address;
      state.location = location;
    },
    setOnlyAddress: (state, { payload }) => {
        state.address = payload
    },
    removeAddress: (state) => {
      state.setAddress = false;
      (state.address = {}), (state.location = {});
    },
  },
});
export const { setAddress,setOnlyAddress, removeAddress } = addressSlice.actions;
