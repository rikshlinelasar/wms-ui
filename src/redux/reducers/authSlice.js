import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

import axios from "../../utilities/constants/axios";
import { TOKEN_COOKIE } from "../../utilities/constants/cookies";

const initialState = {
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser(state, { payload }) {
      Cookies.set(TOKEN_COOKIE, payload.token, { expires: 10 });
      axios.defaults.headers.common.Authorization = `Bearer ${payload.token}`;
      state.user = payload;
    },
    logoutUser(state) {
      Cookies.remove(TOKEN_COOKIE);
      axios.defaults.headers.common.Authorization = undefined;
      state.user = null;
    },
  },
});

export const { loginUser, logoutUser } = authSlice.actions;

export const authReducer = authSlice.reducer;

export default authReducer;
