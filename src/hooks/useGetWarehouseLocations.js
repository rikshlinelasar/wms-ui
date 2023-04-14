import { useDispatch } from "react-redux";

import { WAREHOUSE_LOCATIONS_API } from "../constants/api";
import axios from "../constants/axios";
import {
  setWarehouses,
  turnOffAppLoader,
  turnOnAppLoader,
} from "../redux/reducers/settingsSlice";

const useGetWarehouseLocations = () => {
  const dispatch = useDispatch();

  const getWarehouseLocations = () => {
    dispatch(turnOnAppLoader());
    axios
      .get(WAREHOUSE_LOCATIONS_API)
      .then((locations) => {
        console.log(locations);
        dispatch(setWarehouses(locations));
      })
      .catch((e) => console.log(e))
      .finally(() => dispatch(turnOffAppLoader()));
  };

  return { getWarehouseLocations };
};

export default useGetWarehouseLocations;
