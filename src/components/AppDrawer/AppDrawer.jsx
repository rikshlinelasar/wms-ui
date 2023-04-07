import { ChevronLeft, DateRangeOutlined, TaskOutlined } from "@mui/icons-material";
import { Divider, Drawer, IconButton, useMediaQuery, useTheme } from "@mui/material";
import List from "@mui/material/List";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import DrawerHeader from "../../components-styled/DrawerHeader/DrawerHeader";
import { LPN_DATE_CHECK_ROUTE, TASK_GROUP_ROUTE } from "../../constants/routes";
import { closeDrawer } from "../../redux/reducers/settingsSlice";
import { settingsState } from "../../redux/store";
import { drawerWidth } from "../../styles/styles";
import DrawerItem from "../DrawerItem/DrawerItem";

const AppDrawer = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isBigScreen = useMediaQuery(theme.breakpoints.up("sm"));
  const { isDrawerOpen } = useSelector(settingsState);

  const handleClose = () => dispatch(closeDrawer());

  return (
    <Drawer
      variant={isBigScreen ? "persistent" : undefined}
      anchor="left"
      open={isDrawerOpen}
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
          <ChevronLeft />
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        <DrawerItem
          to={LPN_DATE_CHECK_ROUTE}
          label="LPN Date Check"
          icon={DateRangeOutlined}
        />
        <DrawerItem to={TASK_GROUP_ROUTE} label="Task Group" icon={TaskOutlined} />
      </List>
    </Drawer>
  );
};

export default AppDrawer;
