import { CalculateOutlined, SaveOutlined } from "@mui/icons-material";
import { Grid, IconButton, TableCell, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import SquareButton from "../../components-styled/SquareButton/SquareButton";
import StyledTableRow from "../../components-styled/StyledTableRow/StyledTableRow";
import columns from "../../constants/lpn-date-table-columns";
import { getDateFromPicker } from "../../functions/date";
import { openNotification } from "../../redux/reducers/settingsSlice";
import usePostAdjustOne from "../../hooks/usePostAdjustOne";
import { formatRow } from "../../functions/format";
import { settingsState } from "../../redux/store";

const LPNDateTableRow = ({
  unsavedRowsRef,
  row,
  index,
  onRowUpdate,
  saveAllCounter,
}) => {
  const dispatch = useDispatch();
  const { selectedWarehouse } = useSelector(settingsState);
  const { postAdjustOne } = usePostAdjustOne();
  const [manufactureDate, setManufactureDate] = useState(
    row.manufacturedDate || null
  );
  const [expirationDate, setExpirationDate] = useState(row.expirationDate || null);
  const [consumptionPriorityDate, setConsumptionPriorityDate] = useState(
    row.consumptionPriorityDate || null
  );
  const [isMftdDateChanged, setIsMftdDateChanged] = useState(false);
  const [isExpiredDateChanged, setIsExpiredDateChanged] = useState(false);
  const [isCPDChanged, setIsCPDChanged] = useState(false);
  const [isChanged, setIsChanged] = useState(false);

  const handleManufactureDateChange = (value) => {
    if (!value) {
      setManufactureDate(null);
      if (row.manufacturedDate) {
        setIsChanged(true);
        setIsMftdDateChanged(true);
      }
      return;
    }

    const date = getDateFromPicker(value);

    if (date !== manufactureDate) {
      setIsMftdDateChanged(true);
      setIsChanged(true);
      setManufactureDate(date);
    }
  };

  const handleExpirationDateChange = (value) => {
    if (!value) {
      setExpirationDate(null);
      if (row.expirationDate) {
        setIsChanged(true);
        setIsExpiredDateChanged(true);
      }
      return;
    }

    const date = getDateFromPicker(value);

    if (date !== expirationDate) {
      setIsExpiredDateChanged(true);
      setIsChanged(true);
      setExpirationDate(date);
    }
  };

  const handlePriortyDateChange = (value) => {
    if (!value) {
      setConsumptionPriorityDate(null);
      if (row.consumptionPriorityDate) {
        setIsChanged(true);
        setIsCPDChanged(true);
      }
      return;
    }

    const date = typeof value === "string" ? value : getDateFromPicker(value);

    if (date !== consumptionPriorityDate) {
      setIsCPDChanged(true);
      setIsChanged(true);
      setConsumptionPriorityDate(date);
    }
  };

  const handleDateCalculation = () => {
    if (row.vintageTier === 3 || row.vintageTier == 2) {
      const vintageDate = `${row.vintageYear}-01-01`;

      if (consumptionPriorityDate !== vintageDate) {
        handlePriortyDateChange(vintageDate);
      }
    } else if (expirationDate && row.trackExpiryDate) {
      if (consumptionPriorityDate !== expirationDate) {
        handlePriortyDateChange(expirationDate);
      }
    } else if (manufactureDate && row.trackManufacturingDate) {
      if (consumptionPriorityDate !== manufactureDate) {
        handlePriortyDateChange(manufactureDate);
      }
    } else {
      dispatch(
        openNotification({ title: "Error", message: "No Manufacturing or Expiration date to calculate Consumption Priority Date!" })
      );
    }
  };

  const handlePostAdjustOne = () => {
    postAdjustOne(
      {
        lpnSingleAdjustRequest: formatRow(
          row,
          isMftdDateChanged,
          isExpiredDateChanged,
          isCPDChanged,
          manufactureDate,
          expirationDate,
          consumptionPriorityDate,
          selectedWarehouse
        ),
        location: selectedWarehouse,
      },
      ({ isSuccess, sourceContainerId, message }) => {
        setIsChanged(false);
        dispatch(
          openNotification({
            title: "Details",
            message: [
              {
                message: `${sourceContainerId} ${
                  isSuccess ? "Saved successfully!" : message
                }`,
                isSuccess,
                status: isSuccess ? "Success" : "Error",
              },
            ],
          })
        );

        if (isSuccess) {
          onRowUpdate(index);
        }
      }
    );
  };

  const handleSave = () => {
    if (isChanged) {
      handlePostAdjustOne();
    } else {
      dispatch(
        openNotification({ title: "Error", message: "There is nothing to save!" })
      );
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
                    value={consumptionPriorityDate}
                    inputFormat="MM/DD/YYYY"
                    onChange={handlePriortyDateChange}
                    renderInput={(params) => <TextField size="small" {...params} />}
                  />
                </Grid>
              </Grid>
            );
          case column.isSave:
            return (
              <SquareButton
                variant="contained"
                color="primary"
                onClick={handleSave}
                sx={{
                  mr: 1,
                  backgroundColor: "#fff",
                  ["&:hover"]: {
                    backgroundColor: "primary.main",
                    color: "#fff",
                    [".MuiSvgIcon-root"]: {
                      color: "#fff",
                    },
                  },
                }}
              >
                <SaveOutlined color="primary" />
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

  useEffect(() => {
    if (isChanged) {
      unsavedRowsRef.current[index] = formatRow(
        row,
        isMftdDateChanged,
        isExpiredDateChanged,
        isCPDChanged,
        manufactureDate,
        expirationDate,
        consumptionPriorityDate,
        selectedWarehouse
      );
    }
  }, [
    expirationDate,
    manufactureDate,
    consumptionPriorityDate,
    isCPDChanged,
    isMftdDateChanged,
    isExpiredDateChanged,
    isChanged,
  ]);

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
