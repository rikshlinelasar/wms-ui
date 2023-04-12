import { Button, styled } from "@mui/material";

const SquareButton = styled(Button)(({ dimension = 30 }) => ({
  minWidth: dimension,
  minHeight: dimension,
  fontSize: 18,
}));

export default SquareButton;
