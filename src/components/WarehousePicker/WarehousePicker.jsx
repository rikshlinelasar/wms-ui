import { Button, FormControl, Grid, MenuItem, Typography } from "@mui/material";
import React, { useState } from "react";

import StyledSelect from "../../components-styled/StyledSelect/StyledSelect";

const WarehousePicker = () => {
  const [firstSelect, setFirstSelect] = useState("ATL");
  const [secondSelect, setSecondSelect] = useState("TGE UI");

  const handleFirstChange = (event) => {
    setFirstSelect(event.target.value);
  };

  const handleSecondChange = (event) => {
    setSecondSelect(event.target.value);
  };

  return (
    <Grid container alignItems="center" pl={1} mb={1}>
      <Typography fontWeight="500" color="primary">
        Choose the Warehouse:
      </Typography>
      <FormControl sx={{ ml: 1, mr: 1 }}>
        <StyledSelect
          color="primary"
          size="small"
          value={firstSelect}
          onChange={handleFirstChange}
        >
          <MenuItem value="ATL">ATL</MenuItem>
        </StyledSelect>
      </FormControl>
      <FormControl>
        <StyledSelect
          size="small"
          value={secondSelect}
          onChange={handleSecondChange}
        >
          <MenuItem value="TGE UI">TGE UI</MenuItem>
        </StyledSelect>
      </FormControl>
      <Button variant="contained" sx={{ ml: 2 }}>
        Submit
      </Button>
    </Grid>
  );
};

export default WarehousePicker;
