import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Typography from "@mui/material/Typography";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { closeNotification } from "../../redux/reducers/settingsSlice";
import { settingsState } from "../../redux/store";
import ModalTitle from "../ModalTitle/ModalTitle";
import RowReportNotification from "../ReportNotification/RowReportNotification";

const NotificationModal = () => {
  const dispatch = useDispatch();
  const {
    notification: { isOpen, title, message },
  } = useSelector(settingsState);

  const handleClose = () => dispatch(closeNotification());

  const renderMessages = () =>
    message
      ? message.map((report, i) => (
          <RowReportNotification
            key={i}
            isSuccess={report.isSuccess}
            status={report.status}
            message={report.message}
            disableBorderBottom={i === message.length - 1 || message.length === 1}
          />
        ))
      : null;

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="notification-modal"
      data-testid="notification-modal"
      open={isOpen}
    >
      <ModalTitle title={title} onClose={handleClose} />
      <DialogContent dividers sx={{ maxHeight: 300, minWidth: 300 }}>
        {typeof message === "string" ? (
          <Typography gutterBottom>{message}</Typography>
        ) : (
          renderMessages()
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

export default NotificationModal;
