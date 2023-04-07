import { ArrowUpwardOutlined } from "@mui/icons-material";
import { styled } from "@mui/material";

const RotatableArrowUpward = styled(ArrowUpwardOutlined)(({ theme, open }) => ({
  transition: theme.transitions.create("transform", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && { transform: "rotate(180deg)" }),
}));

export default RotatableArrowUpward;
