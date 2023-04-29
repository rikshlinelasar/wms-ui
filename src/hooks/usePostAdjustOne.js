import { useDispatch } from "react-redux";

import { ADJUST_ONE_API } from "../utilities/constants/api";
import axios from "../utilities/constants/axios";
import { turnOffAppLoader, turnOnAppLoader } from "../redux/reducers/booleanSlice";

const usePostAdjustOne = () => {
  const dispatch = useDispatch();

  const postAdjustOne = (row, onSuccess) => {
    dispatch(turnOnAppLoader());
    axios
      .post(ADJUST_ONE_API, row)
      .then((res) => {
        console.log(res.data);
        if (onSuccess) {
          onSuccess(res.data);
        }
      })
      .catch((e) => console.log(e))
      .finally(() => dispatch(turnOffAppLoader()));
  };

  return { postAdjustOne };
};

export default usePostAdjustOne;
