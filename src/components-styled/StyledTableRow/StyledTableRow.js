import { styled, TableRow } from "@mui/material";

import { selectColor } from "../../styles/styles";

const StyledTableRow = styled(TableRow)(({ theme, change }) => ({
  ...(change
    ? { backgroundColor: selectColor }
    : {
        "&:nth-of-type(odd)": {
          backgroundColor: theme.palette.action.hover,
        },
      }),
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default StyledTableRow;
