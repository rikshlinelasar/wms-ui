import { Chip } from "@mui/material";
import PropTypes from "prop-types";
import React, { createElement } from "react";

const RouteChip = ({ label, icon, sx, ...props }) => (
  <Chip
    color="primary"
    variant="outlined"
    icon={createElement(icon, { fontSize: "small" })}
    label={label}
    sx={{ fontWeight: "500", ...sx }}
    {...props}
  />
);

RouteChip.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired,
  sx: PropTypes.object,
};

export default RouteChip;
