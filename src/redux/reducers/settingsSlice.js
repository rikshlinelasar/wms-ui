import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDrawerOpen: false,
  snackBar: {
    isOpen: false,
    severity: "success",
    message: null,
    duration: 3000,
  },
  selectedWarehouse: null,
  warehouses: [],
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
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
    openSnackBar(state, { payload }) {
      state.snackBar.isOpen = true;
      state.snackBar.severity = payload.severity || "success";
      state.snackBar.message = payload.message;
      state.snackBar.duration = payload.duration || 3000;
    },
    closeSnackBar(state) {
      state.snackBar.isOpen = false;
    },
    setSelectedWarehouse(state, { payload }) {
      state.warehouse = payload;
    },
    setWarehouses(state, { payload }) {
      state.warehouse = payload;
    },
  },
});

export const {
  openDrawer,
  closeDrawer,
  toggleDrawer,
  openSnackBar,
  closeSnackBar,
  setSelectedWarehouse,
  setWarehouses,
} = settingsSlice.actions;

export const settingsReducer = settingsSlice.reducer;

export default settingsReducer;
