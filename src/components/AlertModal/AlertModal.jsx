import { Button, Grid, Typography } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

import Modal from "../Modal/Modal";

const AlertModal = ({
  actionLabel = "Ok",
  cancelLabel = "Cancel",
  isOpen,
  title,
  children,
  onAction,
  onClose,
  ...props
}) => {
  const handleAction = () => {
    onAction();
    if (onClose) {
      onClose();
    }
  };

  return (
    <Modal
      data-testid="alert-modal"
      isOpen={isOpen}
      title={title}
      onClose={onClose}
      titleProps={{ sx: { pl: 3 } }}
      buttons={
        <Grid container pb={1} pl={2}>
          {onAction ? (
            <Button variant="contained" onClick={handleAction}>
              {actionLabel}
            </Button>
          ) : null}
          {onClose ? (
            <Button
              variant="contained"
              color="gray"
              sx={{ ml: 2 }}
              onClick={onClose}
            >
              {cancelLabel}
            </Button>
          ) : null}
        </Grid>
      }
      {...props}
    >
      <Typography>{children}</Typography>
    </Modal>
  );
};

AlertModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.string,
  actionLabel: PropTypes.string,
  cancelLabel: PropTypes.string,
  children: PropTypes.node,
  onClose: PropTypes.func,
  onAction: PropTypes.func,
};

export default AlertModal;
