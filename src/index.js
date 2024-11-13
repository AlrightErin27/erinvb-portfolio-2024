import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "cesium/Build/Cesium/Widgets/widgets.css";

// Setting Cesium static files path
window.CESIUM_BASE_URL = process.env.REACT_APP_CESIUM_BASE_URL;

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
