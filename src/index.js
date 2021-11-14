import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
// import "./index.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "./styles/style.css";
import "./styles/queries.css";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
