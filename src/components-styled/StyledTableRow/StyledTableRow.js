import { colors, styled, TableRow } from "@mui/material";

const StyledTableRow = styled(TableRow)(({ theme, change }) => ({
  ...(change
    ? { backgroundColor: colors.orange[100] }
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
