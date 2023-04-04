import "./App.css";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";

import LoginForm from "./components/LoginForm/LoginForm";
import Home from "./pages/Home/Home";
import LPNDateCheck from "./pages/LPNDateCheck/LPNDateCheck";
import { persistor, store } from "./redux/store";
import theme from "./styles/theme";

const App = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Router>
            <Routes>
              <Route exact path="/" Component={Home} />
              <Route path="/login" Component={LoginForm} />
              <Route path="/lpn-date-check" Component={LPNDateCheck} />
            </Routes>
          </Router>
        </LocalizationProvider>
      </ThemeProvider>
    </PersistGate>
  </Provider>
);

export default App;
