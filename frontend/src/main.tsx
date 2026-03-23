import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import "./assets/scss/global.scss";
import { ThemeProvider } from "@emotion/react";
import {muiTheme} from "../src/theme/muiTheme"
import { CssBaseline } from "@mui/material";
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <ThemeProvider theme={muiTheme}>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <CssBaseline/>
        <App />
      </Provider>
    </QueryClientProvider>
  </ThemeProvider>,
);
