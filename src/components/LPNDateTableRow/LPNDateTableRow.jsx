import { CalculateOutlined, SaveOutlined } from "@mui/icons-material";
import { Grid, IconButton, TableCell, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import SquareButton from "../../components-styled/SquareButton/SquareButton";
import StyledTableRow from "../../components-styled/StyledTableRow/StyledTableRow";
import columns from "../../constants/lpn-date-table-columns";
import { getDateFromPicker } from "../../functions/date";
import { openNotification } from "../../redux/reducers/settingsSlice";

const LPNDateTableRow = ({
  unsavedRowsRef,
  row,
  index,
  onRowUpdate,
  saveAllCounter,
}) => {
  const dispatch = useDispatch();
  const [manufactureDate, setManufactureDate] = useState(
    row.manufacturedDate || null
  );
  const [expirationDate, setExpirationDate] = useState(row.expirationDate || null);
  const [priorityDate, setPriorityDate] = useState(
    row.consumptionPriorityDate || null
  );
  const [isChanged, setIsChanged] = useState(false);

  const handleUnsavedRow = (property, value) => {
    const temp = { ...(unsavedRowsRef.current[index] || row) };
    temp[property] = value;
    unsavedRowsRef.current[index] = temp;
  };

  const handleManufactureDateChange = (value) => {
    const date = getDateFromPicker(value);

    if (date !== manufactureDate) {
      setIsChanged(true);
      setManufactureDate(date);
      handleUnsavedRow("manufacturedDate", date);
    }
  };

  const handleExpirationDateChange = (value) => {
    const date = getDateFromPicker(value);

    if (date !== expirationDate) {
      setIsChanged(true);
      setExpirationDate(date);
      handleUnsavedRow("expirationDate", date);
    }
  };

  const handlePriortyDateChange = (value) => {
    const date = typeof value === "string" ? value : getDateFromPicker(value);

    if (date !== priorityDate) {
      setIsChanged(true);
      setPriorityDate(date);
      handleUnsavedRow("consumptionPriorityDate", date);
    }
  };

  const handleDateCalculation = () => {
    if (row.vintageTier === 3 || row.vintageTier == 2) {
      const vintageDate = `${row.vintageYear}-1-1`;

      if (priorityDate !== vintageDate) {
        handlePriortyDateChange(vintageDate);
      }
    } else if (expirationDate && row.expirationDate) {
      if (priorityDate !== expirationDate) {
        handlePriortyDateChange(expirationDate);
      }
    } else if (manufactureDate && row.manufacturedDate) {
      if (priorityDate !== manufactureDate) {
        handlePriortyDateChange(manufactureDate);
      }
    }
  };

  const handleSave = () => {
    if (isChanged) {
      setIsChanged(false);
      dispatch(openNotification({ message: "Saved successfully!" }));
      row.expirationDate = expirationDate;
      row.manufactureDate = manufactureDate;
      row.consumptionPriorityDate = priorityDate;
      onRowUpdate(row, index);
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
            if (!row.trackManufacturingDate) {
              break;
            }

            return (
              <DatePicker
                value={manufactureDate}
                inputFormat="MM/DD/YYYY"
                onChange={handleManufactureDateChange}
                renderInput={(params) => <TextField size="small" {...params} />}
              />
            );
          case column.isExpirationDate:
            if (!row.trackExpiryDate) {
              break;
            }
            return (
              <DatePicker
                value={expirationDate}
                inputFormat="MM/DD/YYYY"
                onChange={handleExpirationDateChange}
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
                    onChange={handlePriortyDateChange}
                    renderInput={(params) => <TextField size="small" {...params} />}
                  />
                </Grid>
              </Grid>
            );
          case column.isSave:
            return (
              <SquareButton variant="contained" color="primary" onClick={handleSave}>
                <SaveOutlined />
              </SquareButton>
            );
          default:
            return value;
        }
      })();

      return (
        <TableCell
          key={column.id}
          align={column.align}
          sx={{ p: 0.5, pl: 1, pr: 1, ...column.sx }}
        >
          {renderChildren}
        </TableCell>
      );
    });

  useEffect(() => {
    setIsChanged(false);
  }, [saveAllCounter]);

  return (
    <StyledTableRow
      hover={!isChanged}
      change={isChanged}
      role="checkbox"
      tabIndex={-1}
      key={row.code}
    >
      {renderColumns()}
    </StyledTableRow>
  );
};

LPNDateTableRow.propTypes = {
  row: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  onRowUpdate: PropTypes.func.isRequired,
  unsavedRowsRef: PropTypes.object.isRequired,
  saveAllCounter: PropTypes.number.isRequired,
};

export default LPNDateTableRow;
