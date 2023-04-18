import { useDispatch } from "react-redux";

import { ADJUST_ALL_API } from "../constants/api";
import axios from "../constants/axios";
import { turnOffAppLoader, turnOnAppLoader } from "../redux/reducers/settingsSlice";

const usePostAdjustAll = () => {
  const dispatch = useDispatch();

  const postAdjustAll = (row) => {
    dispatch(turnOnAppLoader());
    axios
      .post(ADJUST_ALL_API, row)
      .then((res) => {
        console.log(res.data);
      })
      .catch((e) => console.log(e))
      .finally(() => dispatch(turnOffAppLoader()));
  };

  return { postAdjustAll };
};

export default usePostAdjustAll;
