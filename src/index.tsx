import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Provider } from "react-redux";
import { registerLicense } from "@syncfusion/ej2-base";
import { SnackbarProvider } from "notistack";
import { App } from "./App";
import { store } from "./app/store";
import { Test } from "./components/Test";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorker from "./serviceWorker";

registerLicense("ORg4AjUWIQA/Gnt2VVhhQlFac1pJWnxIf0x0RWFbb1p6dlNMZV5BNQtUQF1hS35Vd0djXXpXcnZVTmBc");

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <SnackbarProvider> */}
      <App />
      {/* <Test /> */}
      {/* </SnackbarProvider> */}
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
