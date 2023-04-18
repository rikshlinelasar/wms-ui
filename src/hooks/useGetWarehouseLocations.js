import { useDispatch, useSelector } from "react-redux";

import { WAREHOUSE_LOCATIONS_API } from "../constants/api";
import axios from "../constants/axios";
import {
  setSelectedWarehouse,
  setWarehouses,
  turnOffAppLoader,
  turnOnAppLoader,
} from "../redux/reducers/settingsSlice";
import { settingsState } from "../redux/store";

const useGetWarehouseLocations = () => {
  const dispatch = useDispatch();
  const { isAppLoading } = useSelector(settingsState);

  const getWarehouseLocations = () => {
    if (isAppLoading) {
      return;
    }
    dispatch(turnOnAppLoader());
    axios
      .get(WAREHOUSE_LOCATIONS_API)
      .then((res) => {
        dispatch(setWarehouses(res.data));
        dispatch(setSelectedWarehouse(res.data[0].warehouseShortName));
      })
      .catch((e) => console.log(e))
      .finally(() => dispatch(turnOffAppLoader()));
  };

  return { getWarehouseLocations };
};

export default useGetWarehouseLocations;
