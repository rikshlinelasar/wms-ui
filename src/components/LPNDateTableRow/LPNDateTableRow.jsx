import { Functions, SaveOutlined } from "@mui/icons-material";
import { Button, Grid, IconButton, TableCell, TableRow } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import React, { useState } from "react";

import columns from "../../constants/columns";

const LPNDateTableRow = ({ row }) => {
  const [priorityDate, setPriorityDate] = useState("");

  const renderColumns = () =>
    columns.map((column) => {
      const value = row[column.id];
      const renderChildren = (() => {
        switch (true) {
          case column.format && typeof value === "number":
            return column.format(value);
          case column.isDate && Boolean(value):
            return (
              <DatePicker
                inputFormat="MM/DD/YYYY"
                defaultValue={value ? dayjs(value) : undefined}
              />
            );
          case column.isPriorityDate:
            return (
              <Grid container alignItems="center">
                <Grid item xs={2}>
                  <IconButton sx={{ p: 0 }}>
                    <Functions />
                  </IconButton>
                </Grid>
                <Grid item xs={10}>
                  <DatePicker
                    inputFormat="MM/DD/YYYY"
                    defaultValue={value ? dayjs(value) : undefined}
                  />
                </Grid>
              </Grid>
            );
          case column.isSave:
            return (
              <Button variant="contained" endIcon={<SaveOutlined />}>
                Save
              </Button>
            );
          default:
            return value;
        }
      })();

      return (
        <TableCell key={column.id} align={column.align} sx={{ p: 1 }}>
          {renderChildren}
        </TableCell>
      );
    });

  return (
    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
      {renderColumns()}
    </TableRow>
  );
};

LPNDateTableRow.propTypes = {
  row: PropTypes.object.isRequired,
};

export default LPNDateTableRow;
