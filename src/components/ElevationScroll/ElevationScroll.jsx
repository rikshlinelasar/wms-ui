import { useScrollTrigger } from "@mui/material";
import PropTypes from "prop-types";
import { cloneElement } from "react";

const ElevationScroll = ({ scrollElevation = 4, elevation = 0, children }) => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window,
  });

  return cloneElement(children, {
    elevation: trigger ? scrollElevation : elevation,
  });
};

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  elevation: PropTypes.number,
  scrollElevation: PropTypes.number,
};

export default ElevationScroll;
