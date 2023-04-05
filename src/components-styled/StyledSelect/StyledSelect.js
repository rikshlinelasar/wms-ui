import { Select, styled } from "@mui/material";

const StyledSelect = styled(Select)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  borderColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  "& .MuiSvgIcon-root": {
    color: theme.palette.common.white,
  },
}));

export default StyledSelect;
