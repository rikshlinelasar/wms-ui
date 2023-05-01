import { useDispatch, useSelector } from "react-redux";

import { turnOffLoader, turnOnLoader } from "../redux/reducers/settingsSlice";
import { settingsState } from "../redux/store";
import { LPN_DATE_CHECK_API } from "../utilities/constants/api";
import axios from "../utilities/constants/axios";

const useGetLPNData = (filteredRowsRef, originalRowsRef, setRows) => {
  const dispatch = useDispatch();
  const { selectedWarehouse } = useSelector(settingsState);

  const getLPNData = () => {
    dispatch(turnOnLoader("isAppLoading"));
    axios
      .get(`${LPN_DATE_CHECK_API}/${selectedWarehouse}`)
      .then((res) => {
        filteredRowsRef.current = res.data;
        originalRowsRef.current = res.data;
        setRows(res.data);
      })
      .catch((e) => console.log(e))
      .finally(() => dispatch(turnOffLoader("isAppLoading")));
  };

  return { getLPNData };
};

export default useGetLPNData;
