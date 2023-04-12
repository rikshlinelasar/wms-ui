import { FormControl, Grid, MenuItem, Typography } from "@mui/material";
import React, { useState } from "react";

import StyledSelect from "../../components-styled/StyledSelect/StyledSelect";

const WarehousePicker = (props) => {
  const [select, setSelect] = useState("ATL");

  const handleChange = (event) => {
    setSelect(event.target.value);
  };

  return (
    <Grid container alignItems="center" {...props}>
      <Typography fontWeight="500" color="primary">
        Choose the Warehouse:
      </Typography>
      <FormControl sx={{ ml: 1, mr: 1 }}>
        <StyledSelect
          color="primary"
          size="small"
          value={select}
          onChange={handleChange}
        >
          <MenuItem value="ATL">ATL</MenuItem>
        </StyledSelect>
      </FormControl>
    </Grid>
  );
};

export default WarehousePicker;
