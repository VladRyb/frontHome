import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./redux/store";

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <Suspense fallback={<div>Loading... </div>}>
        <App />
      </Suspense>
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);
