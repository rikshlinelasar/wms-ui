import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notification: {
    isOpen: false,
    title: "",
    message: null,
  },
  selectedWarehouse: "Choose Warehouse",
  warehouses: [],
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    openNotification(state, { payload }) {
      state.notification.isOpen = true;
      state.notification.title = payload.title || "";
      state.notification.message = payload.message || "";
    },
    closeNotification(state) {
      state.notification.isOpen = false;
    },
    setSelectedWarehouse(state, { payload }) {
      state.selectedWarehouse = payload;
    },
    setWarehouses(state, { payload }) {
      state.warehouses = payload;
    },
  },
});

export const {
  openNotification,
  closeNotification,
  setSelectedWarehouse,
  setWarehouses,
  setApplications,
} = settingsSlice.actions;

export const settingsReducer = settingsSlice.reducer;

export default settingsReducer;
