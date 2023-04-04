import { IconButton, styled } from "@mui/material";

import { drawerWidth } from "../../styles/styles";

const DrawerIconButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, isOpen }) => ({
  position: "fixed",
  bottom: 0,
  margin: 5,
  transition: theme.transitions.create(["margin", "transform"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),

  ...(isOpen && {
    transition: theme.transitions.create(["margin", "transform"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    transform: "rotate(180deg)",
    marginLeft: `${drawerWidth + 5}px`,
  }),
}));

export default DrawerIconButton;
