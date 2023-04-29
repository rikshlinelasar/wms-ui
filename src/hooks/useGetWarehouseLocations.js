import { useDispatch } from "react-redux";

import { turnOffLoader, turnOnLoader } from "../redux/reducers/booleanSlice";
import {
  setSelectedWarehouse,
  setWarehouses,
} from "../redux/reducers/settingsSlice";
import { WAREHOUSE_LOCATIONS_API } from "../utilities/constants/api";
import axios from "../utilities/constants/axios";

const useGetWarehouseLocations = () => {
  const dispatch = useDispatch();

  const getWarehouseLocations = () => {
    dispatch(turnOnLoader());
    axios
      .get(WAREHOUSE_LOCATIONS_API)
      .then((res) => {
        dispatch(setWarehouses(res.data));
        dispatch(setSelectedWarehouse(res.data[0].warehouseShortName));
      })
      .catch((e) => console.log(e))
      .finally(() => dispatch(turnOffLoader()));
  };

  return { getWarehouseLocations };
};

export default useGetWarehouseLocations;
