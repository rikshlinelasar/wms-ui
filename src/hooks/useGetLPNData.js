import { useDispatch, useSelector } from "react-redux";

import { LPN_DATE_CHECK_API } from "../constants/api";
import axios from "../constants/axios";
import { turnOffAppLoader, turnOnAppLoader } from "../redux/reducers/booleanSlice";
import { settingsState } from "../redux/store";

const useGetLPNData = (filteredRowsRef, originalRowsRef, setRows) => {
  const dispatch = useDispatch();
  const { selectedWarehouse } = useSelector(settingsState);

  const getLPNData = () => {
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
