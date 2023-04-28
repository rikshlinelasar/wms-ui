import { useDispatch } from "react-redux";

import { WAREHOUSE_LOCATIONS_API } from "../constants/api";
import axios from "../constants/axios";
import { turnOffAppLoader, turnOnAppLoader } from "../redux/reducers/booleanSlice";
import {
  setSelectedWarehouse,
  setWarehouses,
} from "../redux/reducers/settingsSlice";

const useGetWarehouseLocations = () => {
  const dispatch = useDispatch();

  const getWarehouseLocations = () => {
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
