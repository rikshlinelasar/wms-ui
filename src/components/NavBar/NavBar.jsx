import { Menu } from "@mui/icons-material";
import { AppBar, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import React from "react";
import { Link } from "react-router-dom";

import { appBarHeight } from "../../styles/styles";

const NavBar = () => (
  <Box sx={{ flexGrow: 1, height: appBarHeight }}>
    <AppBar
      position="static"
      color="transparent"
      sx={{
        boxShadow: "none",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        pl: 5,
        pr: 5,
        pt: 1,
        pb: 1,
      }}
    >
      <Link to="/">
        <IconButton
          size="large"
          edge="start"
          color="black"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <Menu />
        </IconButton>
      </Link>
      <Link to="/">
        <Typography
          variant="h2"
          color="primary"
          sx={(theme) => ({
            [theme.breakpoints.down("sm")]: {
              fontSize: "18px",
            },
          })}
        >
          Warehouse Management
        </Typography>
      </Link>
      <Button color="primary" sx={{ marginLeft: "auto", textTransform: "none" }}>
        Sign Out
      </Button>
    </AppBar>
  </Box>
);

export default NavBar;
