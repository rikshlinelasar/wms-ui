import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#550016",
    },
    secondary: {
      main: "#1C0076",
    },
  },
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontFamily: "Open Sans",
          fontWeight: "Regular",
          color: "#1D1D1D",
          fontSize: "14px",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: "Open Sans",
          fontWeight: "Regular",
          color: "#1D1D1D",
        },
        h1: {
          fontSize: "3.375rem",
          fontWeight: "bold",
          textTransform: "uppercase",
          letterSpacing: "-0.01rem",
        },
        h2: {
          fontSize: "1.953rem",
          letterSpacing: "-0.01rem",
          fontWeight: "600",
        },
        h3: {
          fontSize: "1.563rem",
        },
        h4: {
          fontSize: "1.25rem",
        },
      },
    },
  },
});

export default theme;
