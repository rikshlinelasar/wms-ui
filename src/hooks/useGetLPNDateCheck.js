import { LPN_DATE_CHECK_API } from "../constants/api";
import axios from "../constants/axios";

const useGetLPNDateCheck = () => {
  const getLpnData = () => {
    axios
      .get(LPN_DATE_CHECK_API + "/NEW")
      .then((lpnData) => {
        console.log(lpnData);
      })
      .catch((e) => console.log(e));
  };

  return { getLpnData };
};

export default useGetLPNDateCheck;
