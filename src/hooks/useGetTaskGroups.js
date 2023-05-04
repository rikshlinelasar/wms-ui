import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { turnOffLoader, turnOnLoader } from "../redux/reducers/settingsSlice";
import { settingsState } from "../redux/store";
import { TASK_GROUP_API } from "../utilities/constants/api";
import axios from "../utilities/constants/axios";
import dummyTaskGroups from "../utilities/dummy-data/task-groups";

const useGetTaskGroups = () => {
  const dispatch = useDispatch();
  const { selectedWarehouse } = useSelector(settingsState);
  const [taskGroups, setTaskGroups] = useState(dummyTaskGroups);

  const getTaskGroups = () => {
    dispatch(turnOnLoader("isLoading"));
    axios
      .get(`${TASK_GROUP_API}/${selectedWarehouse}`)
      .then((res) => setTaskGroups(res.data))
      .catch((e) => console.log(e))
      .finally(() => dispatch(turnOffLoader("isLoading")));
  };

  return { taskGroups, getTaskGroups, selectedWarehouse };
};

export default useGetTaskGroups;
