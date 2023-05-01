import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "./authSlice";
import settingsReducer from "./settingsSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["authReducer"],
};

const reducers = combineReducers({
  settingsReducer,
  authReducer,
});

export const persistedReducer = persistReducer(persistConfig, reducers);
