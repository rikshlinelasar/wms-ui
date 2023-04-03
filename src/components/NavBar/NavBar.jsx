import { Menu } from "@mui/icons-material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { logoutUser } from "../../redux/reducers/settingsSlice";
import { settingsState } from "../../redux/store";
import AppDrawer from "../AppDrawer/AppDrawer";

const NavBar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(settingsState);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);

  const handleClose = () => setIsOpen(false);

  const handleLogout = () => dispatch(logoutUser());

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleOpen}
            sx={{ mr: 2 }}
          >
            <Menu />
          </IconButton>
          {user ? (
            <Button
              color="inherit"
              onClick={handleLogout}
              sx={{ marginLeft: "auto" }}
            >
              Logout
            </Button>
          ) : null}
        </Toolbar>
      </AppBar>
      <AppDrawer open={isOpen} onOpen={handleOpen} onClose={handleClose} />
    </Box>
  );
};

export default NavBar;
