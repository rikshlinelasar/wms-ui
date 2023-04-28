import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "./authSlice";
import settingsReducer from "./settingsSlice";
import booleanReducer from "./booleanSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["settingsReducer", "authReducer"],
};

const reducers = combineReducers({
  settingsReducer,
  authReducer,
  booleanReducer,
});

export const persistedReducer = persistReducer(persistConfig, reducers);
