import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notification: {
    isOpen: false,
    severity: "success",
    message: null,
  },
  isAppLoading: false,
  selectedWarehouse: "Choose Warehouse",
  warehouses: [],
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    openNotification(state, { payload }) {
      state.notification.isOpen = true;
      state.notification.severity = payload.severity || "success";
      state.notification.message = payload.message;
    },
    closeNotification(state) {
      state.notification.isOpen = false;
    },
    turnOnAppLoader(state) {
      state.isAppLoading = true;
    },
    turnOffAppLoader(state) {
      state.isAppLoading = false;
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
  openNotification,
  closeNotification,
  turnOnAppLoader,
  turnOffAppLoader,
  setSelectedWarehouse,
  setWarehouses,
} = settingsSlice.actions;

export const settingsReducer = settingsSlice.reducer;

export default settingsReducer;
