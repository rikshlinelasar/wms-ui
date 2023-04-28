import { Fade } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import * as React from "react";
import { useSelector } from "react-redux";

import { booleanState } from "../../redux/store";

const AppLoader = () => {
  const { isAppLoading, isLoading } = useSelector(booleanState);

  return (
    <Fade
      in={isAppLoading || isLoading}
      style={{ position: "fixed", width: "100%", height: "100%" }}
    >
      <Backdrop
        sx={{ color: "primary.main", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Fade>
  );
};

export default AppLoader;
