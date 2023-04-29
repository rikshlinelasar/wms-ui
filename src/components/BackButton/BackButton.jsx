import { ArrowBackIosNew } from "@mui/icons-material";
import { Chip } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

const BackButton = ({ sx, ...props }) => (
  <Link to="/" data-testid="navigate-home">
    <Chip
      icon={<ArrowBackIosNew fontSize="inherit" />}
      label="Go back to Main List"
      sx={{ ...sx, backgroundColor: "transparent", cursor: "pointer" }}
      {...props}
    />
  </Link>
);

BackButton.propTypes = {
  sx: PropTypes.object,
};

export default BackButton;
