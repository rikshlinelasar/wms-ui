import { useDispatch } from "react-redux";

import { turnOffAppLoader, turnOnAppLoader } from "../redux/reducers/booleanSlice";
import { APPLICATIONS_API } from "../utilities/constants/api";
import axios from "../utilities/constants/axios";

const useGetApplications = (originalAppsRef, setApps) => {
  const dispatch = useDispatch();

  const getApplications = () => {
    dispatch(turnOnAppLoader());
    axios
      .get(APPLICATIONS_API)
      .then((res) => {
        originalAppsRef.current = res.data;
        setApps(res.data);
      })
      .catch((e) => console.log(e))
      .finally(() => dispatch(turnOffAppLoader()));
  };

  return { getApplications };
};

export default useGetApplications;
