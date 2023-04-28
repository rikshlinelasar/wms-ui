import PropTypes from "prop-types";
import React, { Fragment } from "react";

import BackButton from "../BackButton/BackButton";
import RouteChip from "../RouteChip/RouteChip";

const Breadcrumbs = ({ label, icon, sx }) => (
  <Fragment>
    <RouteChip icon={icon} label={label} sx={sx} />
    <BackButton sx={{ ml: 2 }} />
  </Fragment>
);

Breadcrumbs.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired,
  sx: PropTypes.object,
};

export default Breadcrumbs;
