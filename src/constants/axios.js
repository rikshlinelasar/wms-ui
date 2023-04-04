import axiosInstance from "axios";
import Cookies from "js-cookie";

import { DEVELOPMENT_API } from "./api";
import { TOKEN_COOKIE } from "./cookies";

const axios = axiosInstance.create({
  baseURL: DEVELOPMENT_API,
  timeout: 5000,
});

(async () => {
  axios.defaults.baseURL = DEVELOPMENT_API;
  const token = Cookies.get(TOKEN_COOKIE);

  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
})();

export default axios;
