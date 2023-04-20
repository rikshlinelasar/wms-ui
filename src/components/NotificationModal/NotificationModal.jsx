import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { closeNotification } from "../../redux/reducers/settingsSlice";
import { settingsState } from "../../redux/store";
import RowReportNotification from "../ReportNotification/RowReportNotification";

const NotificationModal = () => {
  const dispatch = useDispatch();
  const {
    notification: { isOpen, title, message },
  } = useSelector(settingsState);

  const handleClose = () => dispatch(closeNotification());

  return (
    <Dialog onClose={handleClose} aria-labelledby="notification-modal" open={isOpen}>
      <DialogTitle sx={{ m: 0, p: 2, minHeight: 50, color: "primary.main" }}>
        {title}
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
      <DialogContent dividers sx={{ maxHeight: 300, minWidth: 300 }}>
        {typeof message === "string" ? (
          <Typography gutterBottom>{message}</Typography>
        ) : (
          message.map((report, i) => (
            <RowReportNotification
              key={i}
              isSuccess={report.isSuccess}
              status={report.status}
              message={report.message}
              disableBorderBottom={i === message.length - 1 || message.length === 1}
            />
          ))
        )}
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose} sx={{ fontWeight: 600 }}>
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
