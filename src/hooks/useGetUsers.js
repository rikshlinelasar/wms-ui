import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { turnOffLoader, turnOnLoader } from "../redux/reducers/settingsSlice";
import { settingsState } from "../redux/store";
import { USERS_API } from "../utilities/constants/api";
import axios from "../utilities/constants/axios";
import dummyUsers from "../utilities/dummy-data/users";

const useGetUsers = () => {
  const dispatch = useDispatch();
  const { selectedWarehouse } = useSelector(settingsState);
  const [users, setUsers] = useState(dummyUsers);

  const getUsers = () => {
    dispatch(turnOnLoader("isAppLoading"));
    axios
      .get(`${USERS_API}/${selectedWarehouse}`)
      .then((res) => setUsers(res.data))
      .catch((e) => console.log(e))
      .finally(() => dispatch(turnOffLoader("isAppLoading")));
  };

  return { users, getUsers, selectedWarehouse };
};

export default useGetUsers;
