import { withTheme } from "@emotion/react";
import { createTheme } from "@mui/material";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
export const muiTheme = createTheme({
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    // ------------------Page Title-----------------
    h1: { fontSize: "28px", fontWeight: "500" },
    // -------------------Page Subtitle-----------------
    subtitle1: { fontSize: "16px", color: " var(--colorsNeutral600)" },

    // -------------------------------Form Title------------
    h3: { fontSize: "22px", fontWeight: "400" },


    h4: { fontSize: "18px", fontWeight: "400" },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily: "Roboto, Arial, sans-serif",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "10px",
          fontWeight: 500,
          // backgroundColor: "#5B6CFF",
          // color: "white"
        },
      },
    },
  },
});
