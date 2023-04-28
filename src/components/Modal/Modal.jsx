import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import PropTypes from "prop-types";
import React from "react";

import ModalTitle from "../ModalTitle/ModalTitle";

const Modal = ({
  isOpen,
  title,
  onClose,
  children,
  buttons,
  titleProps,
  ...props
}) => (
  <Dialog
    onClose={onClose}
    aria-labelledby="notification-modal"
    open={isOpen}
    {...props}
  >
    <ModalTitle title={title} onClose={onClose} {...titleProps} />
    <DialogContent sx={{ maxHeight: 300, minWidth: 300 }}>{children}</DialogContent>
    <DialogActions>{buttons}</DialogActions>
  </Dialog>
);

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  children: PropTypes.node,
  buttons: PropTypes.node,
  titleProps: PropTypes.object,
};

export default Modal;
