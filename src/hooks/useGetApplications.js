import { useDispatch } from "react-redux";

import { turnOffLoader, turnOnLoader } from "../redux/reducers/settingsSlice";
import { APPLICATIONS_API } from "../utilities/constants/api";
import axios from "../utilities/constants/axios";

const useGetApplications = (originalAppsRef, setApps) => {
  const dispatch = useDispatch();

  const getApplications = () => {
    dispatch(turnOnLoader("isAppLoading"));
    axios
      .get(APPLICATIONS_API)
      .then((res) => {
        originalAppsRef.current = res.data;
        setApps(res.data);
      })
      .catch((e) => console.log(e))
      .finally(() => dispatch(turnOffLoader("isAppLoading")));
  };

  return { getApplications };
};

export default useGetApplications;
