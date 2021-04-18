import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.scss";

import App from "./componants/App";
import { AppSettings } from "./contracts/AppSettings";

const root = document.getElementById("root");
const options: AppSettings = JSON.parse(root.dataset.options);

ReactDOM.render(
  <React.StrictMode>
    <App {...options} />
  </React.StrictMode>,
  root
);
