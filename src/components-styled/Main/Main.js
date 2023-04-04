import { styled } from "@mui/material";

import { drawerWidth } from "../../styles/styles";

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, isOpen }) => ({
    flexGrow: 1,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth - 30}px`,
    ...(isOpen && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

export default Main;
