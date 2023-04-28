import { useDispatch } from "react-redux";

import { APPLICATIONS_API } from "../constants/api";
import axios from "../constants/axios";
import { turnOffLoader, turnOnLoader } from "../redux/reducers/booleanSlice";

const useGetApplications = (originalAppsRef, setApps) => {
  const dispatch = useDispatch();

  const getApplications = () => {
    dispatch(turnOnLoader());
    axios
      .get(APPLICATIONS_API)
      .then((res) => {
        originalAppsRef.current = res.data;
        setApps(res.data);
      })
      .catch((e) => console.log(e))
      .finally(() => dispatch(turnOffLoader()));
  };

  return { getApplications };
};

export default useGetApplications;
