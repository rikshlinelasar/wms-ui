import { CalculateOutlined, SaveOutlined } from "@mui/icons-material";
import { Grid, IconButton, TableCell, TableRow, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import PropTypes from "prop-types";
import React, { useState } from "react";

import columns from "../../constants/columns";

const LPNDateTableRow = ({ row }) => {
  const [manufactureDate, setManufactureDate] = useState(
    row["manufacturedDate"] || null
  );
  const [expirationDate, setExpirationDate] = useState(
    row["expirationDate"] || null
  );
  const [priorityDate, setPriorityDate] = useState(null);

  const handleFormatDate = (date) => {
    const newDate = date.split("-");

    return `${newDate[1]}/${newDate[2]}/${newDate[0]}`;
  };

  const handleDateCalculation = () => {
    if (expirationDate) {
      setPriorityDate(handleFormatDate(expirationDate));
    } else if (manufactureDate) {
      setPriorityDate(handleFormatDate(manufactureDate));
    }
  };

  const renderColumns = () =>
    columns.map((column) => {
      const value = row[column.id];
      const renderChildren = (() => {
        switch (true) {
          case column.format && typeof value === "number":
            return column.format(value);
          case column.isManufactureDate:
            if (!row.manufacturingDate) {
              break;
            }

            return (
              <DatePicker
                value={manufactureDate}
                inputFormat="MM/DD/YYYY"
                onChange={(value) => setManufactureDate(value)}
                renderInput={(params) => <TextField size="small" {...params} />}
              />
            );
          case column.isExpirationDate:
            if (!row.expiryDate) {
              break;
            }
            return (
              <DatePicker
                value={expirationDate}
                inputFormat="MM/DD/YYYY"
                onChange={(value) => setExpirationDate(value)}
                renderInput={(params) => <TextField size="small" {...params} />}
              />
            );
          case column.isPriorityDate:
            return (
              <Grid container alignItems="center">
                <Grid item xs={2}>
                  <IconButton sx={{ p: 0 }} onClick={handleDateCalculation}>
                    <CalculateOutlined />
                  </IconButton>
                </Grid>
                <Grid item xs={10}>
                  <DatePicker
                    value={priorityDate}
                    inputFormat="MM/DD/YYYY"
                    onChange={(value) => setPriorityDate(value)}
                    renderInput={(params) => <TextField size="small" {...params} />}
                  />
                </Grid>
              </Grid>
            );
          case column.isSave:
            return (
              <IconButton color="primary">
                <SaveOutlined />
              </IconButton>
            );
          default:
            return value;
        }
      })();

      return (
        <TableCell
          key={column.id}
          align={column.align}
          sx={{ p: 0.5, pl: 1, pr: 1 }}
        >
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
