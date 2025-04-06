import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

// Import File style Client
import "./assets/css/styles.css";

// Import File style Admin
import "./assets/admin/css/bootstrap.min.css";
import "./assets/admin/css/bootstrap-icons.css";
import "./assets/admin/css/apexcharts.css";
import "./assets/admin/css/main.css";

// Import config taiwindcss
import "./assets/config/tailwind.css"

// linh
import "./assets/admin/js/jquery.min.js";
import "./assets/admin/js/bootstrap.bundle.min.js";
import "./assets/admin/js/apexcharts.min.js";



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
