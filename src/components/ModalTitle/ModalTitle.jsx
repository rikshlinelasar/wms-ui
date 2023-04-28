import React from "react";
import PropTypes from "prop-types";
import { DialogTitle, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";

const ModalTitle = ({ title, onClose, sx, ...props }) => (
  <DialogTitle
    {...props}
    sx={{ m: 0, p: 2, minHeight: 50, color: "primary.main", ...sx }}
  >
    {title}
    <IconButton
      aria-label="close"
      onClick={onClose}
      sx={{
        position: "absolute",
        right: 8,
        top: 8,
        color: (theme) => theme.palette.grey[500],
      }}
    >
      <Close />
    </IconButton>
  </DialogTitle>
);

ModalTitle.propTypes = {
  title: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  sx: PropTypes.object,
};

export default ModalTitle;
