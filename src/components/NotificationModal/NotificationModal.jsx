import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

import { closeNotification } from "../../redux/reducers/settingsSlice";
import { settingsState } from "../../redux/store";

const NotificationModal = () => {
  const dispatch = useDispatch();
  const {
    notification: { isOpen, severity, message },
  } = useSelector(settingsState);

  const handleClose = () => dispatch(closeNotification());

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={isOpen}
    >
      <DialogTitle sx={{ m: 0, p: 2, textTransform: "capitalize" }}>
        {severity}
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Typography gutterBottom>{message}</Typography>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

NotificationModal.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default NotificationModal;
