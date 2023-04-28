import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAppLoading: false,
  isLoading: false,
};

export const booleanSlice = createSlice({
  name: "boolean",
  initialState,
  reducers: {
    turnOnAppLoader(state) {
      state.isAppLoading = true;
    },
    turnOffAppLoader(state) {
      state.isAppLoading = false;
    },
    turnOnLoader(state) {
      state.isLoading = true;
    },
    turnOffLoader(state) {
      state.isLoading = false;
    },
  },
});

export const { turnOnAppLoader, turnOffAppLoader, turnOffLoader, turnOnLoader } =
  booleanSlice.actions;

export const booleanReducer = booleanSlice.reducer;

export default booleanReducer;
