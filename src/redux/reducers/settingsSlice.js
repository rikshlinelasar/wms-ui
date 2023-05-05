import { createSlice } from "@reduxjs/toolkit";

export const INITIAL_SELECTED_WAREHOUSE = "Choose Warehouse";

const initialState = {
  notification: {
    isOpen: false,
    title: "",
    mainMessage: null,
    message: null,
  },
  selectedWarehouse: INITIAL_SELECTED_WAREHOUSE,
  warehouses: [],
  isAppLoading: false,
  isLoading: false,
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    openNotification(state, { payload }) {
      state.notification.isOpen = true;
      state.notification.title = payload.title || "";
      state.notification.message = payload.message || "";
      state.notification.mainMessage = payload.mainMessage || "";
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
    turnOnLoader(state, { payload }) {
      state[payload] = true;
    },
    turnOffLoader(state, { payload }) {
      state[payload] = false;
    },
  },
});

export const {
  openNotification,
  closeNotification,
  setSelectedWarehouse,
  setWarehouses,
  setApplications,
  turnOnLoader,
  turnOffLoader,
} = settingsSlice.actions;

export const settingsReducer = settingsSlice.reducer;

export default settingsReducer;
