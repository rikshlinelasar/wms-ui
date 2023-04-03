import axios from "axios";
import Cookies from "js-cookie";

import { DEVELOPMENT_API } from "./api";
import { TOKEN_COOKIE } from "./cookies";

const axiosInstance = axios.create({
  baseURL: DEVELOPMENT_API,
  timeout: 5000,
});

(async () => {
  axiosInstance.defaults.baseURL = DEVELOPMENT_API;
  const token = Cookies.get(TOKEN_COOKIE);

  if (token) {
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
})();

export default axiosInstance;
