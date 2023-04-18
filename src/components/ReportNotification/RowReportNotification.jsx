import { CheckCircleOutline, ErrorOutline } from "@mui/icons-material";
import { Divider, Grid, Typography } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

const RowReportNotification = ({ isSuccess, status, message }) => {
  return (
    <Grid container direction="column" mt={1}>
      <Grid container alignItems="center" gap={2}>
        <Typography
          fontWeight="500"
          color={isSuccess ? "success.main" : "error.main"}
        >
          {status}
        </Typography>
        {isSuccess ? (
          <CheckCircleOutline color="success" />
        ) : (
          <ErrorOutline color="error" />
        )}
      </Grid>
      <Typography mt={1} ml={1}>
        {message}
      </Typography>
      <Divider />
    </Grid>
  );
};

RowReportNotification.propTypes = {
  isSuccess: PropTypes.bool,
  status: PropTypes.string.isRequired,
  message: PropTypes.string,
};

export default RowReportNotification;
