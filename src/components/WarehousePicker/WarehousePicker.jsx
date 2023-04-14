import { FormControl, MenuItem, Select } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { setSelectedWarehouse } from "../../redux/reducers/settingsSlice";
import { settingsState } from "../../redux/store";

const WarehousePicker = (props) => {
  const dispatch = useDispatch();
  const { selectedWarehouse, warehouses } = useSelector(settingsState);

  const handleChange = (event) => {
    dispatch(setSelectedWarehouse(event.target.value));
  };

  const renderWarehouses = () =>
    warehouses.length > 0 ? (
      warehouses.map((warehouse) => (
        <MenuItem key={warehouse} value="ATL">
          ATL
        </MenuItem>
      ))
    ) : (
      <MenuItem value="Choose Warehouse">Choose Warehouse</MenuItem>
    );

  return (
    <FormControl {...props}>
      <Select
        color="primary"
        size="small"
        value={selectedWarehouse}
        onChange={handleChange}
        sx={{ minWidth: 200 }}
      >
        {renderWarehouses()}
      </Select>
    </FormControl>
  );
};

export default WarehousePicker;
