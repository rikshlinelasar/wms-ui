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
    toggleDrawer(state) {
      state.isDrawerOpen = !state.isDrawerOpen;
    },
  },
});

export const { openDrawer, closeDrawer, toggleDrawer } = settingsSlice.actions;

export const settingsReducer = settingsSlice.reducer;

export default settingsReducer;
