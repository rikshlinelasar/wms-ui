import { Grid, ListItemButton, Typography } from "@mui/material";
import PropTypes from "prop-types";
import React, { createElement, useMemo } from "react";
import { useLocation, useNavigate } from "react-router";

const DrawerItem = ({ to, label, icon }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isSelected = useMemo(
    () => to === location.pathname,
    [to, location.pathname]
  );

  const handleNavigate = () => {
    navigate(to);
  };

  return (
    <ListItemButton
      color="primary.main"
      onClick={handleNavigate}
      sx={{
        mt: 2,
        ...(isSelected && {
          backgroundColor: "primary.main",
          ["&:hover"]: { backgroundColor: "primary.main" },
        }),
      }}
    >
      <Grid container direction="column" alignItems="center">
        {icon
          ? createElement(icon, {
              sx: {
                ...(isSelected && {
                  color: "white",
                }),
              },
            })
          : null}
        <Typography p={1} color={isSelected && "white"}>
          {label}
        </Typography>
      </Grid>
    </ListItemButton>
  );
};

DrawerItem.propTypes = {
  to: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  icon: PropTypes.func,
};

export default DrawerItem;
