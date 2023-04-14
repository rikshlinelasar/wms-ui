import { StarBorder } from "@mui/icons-material";
import { Button, Card, Grid, IconButton, Typography } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import { useNavigate } from "react-router";

const HomeMenuItem = ({ to, label, description, ...props }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(to);
  };

  return (
    <Grid item {...props}>
      <Card sx={{ p: 2 }}>
        <Typography variant="h4" fontWeight="600">
          {label}
        </Typography>
        <Grid item p={1} />
        <Typography variant="p" fontWeight="400">
          {description}
        </Typography>
        <Grid item p={1} />
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Button variant="contained" onClick={handleNavigate}>
              View and Manage
            </Button>
          </Grid>
          <Grid item>
            <IconButton>
              <StarBorder />
            </IconButton>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
};

HomeMenuItem.propTypes = {
  to: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default HomeMenuItem;
