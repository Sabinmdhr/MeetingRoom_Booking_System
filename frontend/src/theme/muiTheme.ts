import { createTheme } from "@mui/material";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

export const muiTheme = createTheme({
  palette: {
    primary: {
      main: "#5B6CFF",
    },
    secondary: {
      main: "#3660eb",
    },
    success: {
      main: "#00A63E",
    },
    error: {
      main: "#d32f2f",
    },
    // ochre: {
    //   main: "#E3D026",
    //   light: "#E9DB5D",
    //   dark: "#A29415",
    //   contrastText: "#242105",
    // },
  },

  typography: {
    fontFamily: "Roboto, Arial, sans-serif",

    // Page Titles
    h1: { fontSize: "28px", fontWeight: 500 },
    h2: { fontSize: "25px", fontWeight: 500 },

    // Form / Section Titles
    h3: { fontSize: "18px", fontWeight: 500 },
    h4: { fontSize: "16px", fontWeight: 500 },
    h5: { fontSize: "16px", fontWeight: 400 },

    // Subtitle
    subtitle1: {
      fontSize: "16px",
      color: "var(--colorsNeutral600)",
    },
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily: "Roboto, Arial, sans-serif",
          margin: 0,
          padding: 0,
        },
      },
    },

    MuiButton: {
      defaultProps: {
        variant: "contained",
        color: "primary",
      },
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "10px",
          fontWeight: 500,
          padding: "8px 16px",
        },
      },
    },
  },
});
