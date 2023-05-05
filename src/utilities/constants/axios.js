import axiosInstance from "axios";
import Cookies from "js-cookie";

import { BASE_URL } from "./api";
import { TOKEN_COOKIE } from "./cookies";

const axios = axiosInstance.create({
  baseURL: BASE_URL,
  timeout: 60000,
});

(() => {
  axios.defaults.baseURL = BASE_URL;
  const token = Cookies.get(TOKEN_COOKIE);

  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
})();

export default axios;
