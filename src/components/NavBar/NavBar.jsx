import { AppBar, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import React from "react";
import { Link } from "react-router-dom";

import logo from "../../assets/images/logo.png";
import { APP_BAR_HEIGHT } from "../../styles/styles";
import en from "../../utilities/json/en.json";
import ElevationScroll from "../ElevationScroll/ElevationScroll";

const NavBar = (props) => (
  <Box sx={{ flexGrow: 1, height: APP_BAR_HEIGHT }}>
    <ElevationScroll>
      <AppBar
        {...props}
        color="inherit"
        sx={{
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
          <img src={logo} alt="logo" style={{ width: 50, height: 50 }} />
        </Link>
        <Link to="/" data-testid="logo-text-link">
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
            {en.title}
          </Typography>
        </Link>
        <Button
          color="primary"
          sx={{
            marginLeft: "auto",
            textTransform: "none",
            fontWeight: "600",
            minWidth: 95,
          }}
        >
          {en.signOut}
        </Button>
      </AppBar>
    </ElevationScroll>
  </Box>
);

export default NavBar;
