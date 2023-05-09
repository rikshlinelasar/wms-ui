import { useDispatch, useSelector } from "react-redux";

import {
  openNotification,
  turnOffLoader,
  turnOnLoader,
} from "../redux/reducers/settingsSlice";
import { settingsState } from "../redux/store";
import {
  ADD_TASK_GROUPS_API,
  REMOVE_TASK_GROUPS_API,
} from "../utilities/constants/api";
import axios from "../utilities/constants/axios";
import en from "../utilities/json/en.json";

const usePostUpdateTaskGroups = () => {
  const dispatch = useDispatch();
  const { selectedWarehouse } = useSelector(settingsState);

  const postUpdateTaskGroups = (users, taskGroups, isRemove) => {
    dispatch(turnOnLoader("isAppLoading"));
    axios
      .post(isRemove ? REMOVE_TASK_GROUPS_API : ADD_TASK_GROUPS_API, {
        taskGroupUserRequest: {
          users,
          taskGroups,
        },
        location: selectedWarehouse,
      })
      .then(({ data }) => {
        const report = [];

        data.failedTaskAssignments?.forEach(({ userId, taskGroupId, message }) => {
          report.push({
            message,
            isSuccess: false,
            status: `Error in user ${userId} and task group ${taskGroupId}`,
          });
        });

        const mainMessage = {
          isSuccess: data.isSuccess,
          message: data.statusMessage,
          status: data.isSuccess ? en.success : en.error,
        };

        dispatch(
          openNotification({ title: en.report, message: report, mainMessage })
        );
      })
      .catch((e) => console.log(e))
      .finally(() => dispatch(turnOffLoader("isAppLoading")));
  };

  return { postUpdateTaskGroups };
};

export default usePostUpdateTaskGroups;
