import { AppBar, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import React from "react";
import { Link } from "react-router-dom";

import logo from "../../assets/images/logo.png";
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
        <img src={logo} style={{ width: 50, height: 50 }} />
      </Link>
      <Link to="/">
        <Typography
          variant="h2"
          color="primary"
          sx={(theme) => ({
            ml: 1,
            mb: 1,
            [theme.breakpoints.down("sm")]: {
              fontSize: "18px",
            },
          })}
        >
          Warehouse Management
        </Typography>
      </Link>
      <Button
        color="primary"
        sx={{ marginLeft: "auto", textTransform: "none", fontWeight: "600" }}
      >
        Sign Out
      </Button>
    </AppBar>
  </Box>
);

export default NavBar;
