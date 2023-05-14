import { ThemeProvider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";

import {
  LPN_DATE_CHECK_ROUTE,
  TASK_GROUP_ROUTE,
} from "./utilities/constants/routes";
import HomePage from "./pages/HomePage/HomePage";
import LPNDateCheckPage from "./pages/LPNDateCheckPage/LPNDateCheckPage";
import TaskGroupPage from "./pages/TaskGroupPage/TaskGroupPage";
import { persistor, store } from "./redux/store";
import theme from "./styles/theme";

const App = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Router>
            <Routes>
              <Route exact path="/" Component={HomePage} />
              <Route path={LPN_DATE_CHECK_ROUTE} Component={LPNDateCheckPage} />
              <Route path={TASK_GROUP_ROUTE} Component={TaskGroupPage} />
            </Routes>
          </Router>
        </LocalizationProvider>
      </ThemeProvider>
    </PersistGate>
  </Provider>
);

export default App;
