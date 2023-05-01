import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import React from "react";
import { useSelector } from "react-redux";

import { settingsState } from "../../redux/store";

const AppLoader = () => {
  const { isAppLoading, isLoading } = useSelector(settingsState);

  return (
    <Backdrop
      aria-label="Application loader"
      data-testid="application-loader"
      unmountOnExit
      sx={{ color: "primary.main", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={isAppLoading || isLoading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default AppLoader;
