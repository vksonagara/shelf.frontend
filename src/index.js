import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./styles/font.css";
import "./styles/global.css";
import store from "./redux/store";
import { interceptor } from "./api";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./styles/tailwind.css";

interceptor(store);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
