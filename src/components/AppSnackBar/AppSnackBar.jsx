import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { closeSnackBar } from "../../redux/reducers/settingsSlice";
import { settingsState } from "../../redux/store";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AppSnackBar = () => {
  const dispatch = useDispatch();
  const {
    snackBar: { isOpen, severity, message, duration },
  } = useSelector(settingsState);

  const handleClose = () => dispatch(closeSnackBar());

  return (
    <Snackbar
      open={isOpen}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      autoHideDuration={duration}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default AppSnackBar;
