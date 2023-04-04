import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDrawerOpen: false,
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState: initialState,
  reducers: {
    openDrawer(state) {
      state.isDrawerOpen = true;
    },
    closeDrawer(state) {
      state.isDrawerOpen = false;
    },
  },
});

export const { openDrawer, closeDrawer } = settingsSlice.actions;

export const settingsReducer = settingsSlice.reducer;

export default settingsReducer;
