import { useDispatch, useSelector } from "react-redux";

import { LPN_DATE_CHECK_API } from "../constants/api";
import axios from "../constants/axios";
import { turnOffAppLoader, turnOnAppLoader } from "../redux/reducers/settingsSlice";
import { settingsState } from "../redux/store";

const useGetLPNData = (filteredRowsRef, originalRowsRef, setRows) => {
  const dispatch = useDispatch();
  const { selectedWarehouse, isAppLoading } = useSelector(settingsState);

  const getLPNData = () => {
    if (isAppLoading) {
      return;
    }
    dispatch(turnOnAppLoader());
    axios
      .get(`${LPN_DATE_CHECK_API}/${selectedWarehouse}`)
      .then((res) => {
        filteredRowsRef.current = res.data;
        originalRowsRef.current = res.data;
        setRows(res.data);
      })
      .catch((e) => console.log(e))
      .finally(() => dispatch(turnOffAppLoader()));
  };

  return { getLPNData };
};

export default useGetLPNData;
