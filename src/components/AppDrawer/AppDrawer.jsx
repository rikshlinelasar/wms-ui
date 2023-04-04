import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import PropTypes from "prop-types";
import React from "react";
import { useNavigate } from "react-router";

const AppDrawer = (props) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/lpn-date-check");
    props.onClose();
  };

  return (
    <SwipeableDrawer {...props}>
      <List>
        <ListItemButton>
          <ListItemText onClick={handleNavigate}>LPN Date Check</ListItemText>
        </ListItemButton>
      </List>
    </SwipeableDrawer>
  );
};

AppDrawer.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default AppDrawer;
