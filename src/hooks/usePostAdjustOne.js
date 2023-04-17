import { useDispatch } from "react-redux";

import { ADJUST_ALL_API } from "../constants/api";
import axios from "../constants/axios";
import { turnOffAppLoader, turnOnAppLoader } from "../redux/reducers/settingsSlice";

const usePostAdjustOne = () => {
  const dispatch = useDispatch();

  const postAdjustOne = (row, onSuccess) => {
    dispatch(turnOnAppLoader());
    axios
      .post(ADJUST_ALL_API, row)
      .then((res) => {
        console.log(res.data);
        if (onSuccess) {
          onSuccess();
        }
      })
      .catch((e) => console.log(e))
      .finally(() => dispatch(turnOffAppLoader()));
  };

  return { postAdjustOne };
};

export default usePostAdjustOne;
