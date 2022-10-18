import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { ThemeProvider } from "@mui/material/styles";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import ReactDOM from "react-dom";
import "./style/index.scss";
import moment from "moment";
import "moment/locale/ru";
import App from "./App";
import getTheme from "./theme";

moment.locale("ru");

ReactDOM.render(
  <Provider store={store}>
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <ThemeProvider theme={getTheme("dark")}>
        <App />
      </ThemeProvider>
    </LocalizationProvider>
  </Provider>,
  document.getElementById("root")
);
