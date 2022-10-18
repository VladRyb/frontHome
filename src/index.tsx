import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./style/index.scss";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import "moment/locale/ru";
import moment from "moment";

moment.locale("ru");

ReactDOM.render(
  <Provider store={store}>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <App />
    </LocalizationProvider>
  </Provider>,
  document.getElementById("root")
);
