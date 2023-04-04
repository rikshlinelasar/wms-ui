import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";

import { persistedReducer } from "./reducers/reducers";

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export const settingsState = (state) => state.settingsReducer;
export const authState = (state) => state.authReducer;
