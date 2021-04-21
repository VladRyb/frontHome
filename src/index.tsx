import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./style/index.scss";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#ffffff",
      contrastText: "#ffffff",
      light: "#ffffff",
      dark: "#ffffff",
    },
    text: {
      primary: "#ffffff",
      disabled: "#ffffff",
    },
  },
});

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <React.StrictMode>
        <Suspense fallback={<div>Loading... </div>}>
          <App />
        </Suspense>
      </React.StrictMode>
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);
