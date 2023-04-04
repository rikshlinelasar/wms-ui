import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Divider, Drawer, IconButton } from "@mui/material";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import DrawerHeader from "../../components-styled/DrawerHeader/DrawerHeader";
import { closeDrawer, openDrawer } from "../../redux/reducers/settingsSlice";
import { settingsState } from "../../redux/store";
import { drawerWidth } from "../../styles/styles";

const AppDrawer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isDrawerOpen } = useSelector(settingsState);

  const handleNavigate = () => {
    navigate("/lpn-date-check");
    handleClose();
  };

  const handleClose = () => dispatch(closeDrawer());

  const handleOpen = () => dispatch(openDrawer());

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={isDrawerOpen}
      onOpen={handleOpen}
      onClose={handleClose}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <DrawerHeader>
        <IconButton onClick={handleClose}>
          <ChevronLeftIcon />
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        <ListItemButton>
          <ListItemText onClick={handleNavigate}>LPN Date Check</ListItemText>
        </ListItemButton>
      </List>
    </Drawer>
  );
};

export default AppDrawer;
