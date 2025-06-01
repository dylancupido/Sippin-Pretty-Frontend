import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

// Import styles in the correct order
import 'bootstrap/dist/css/bootstrap.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./index.css";

// Import Bootstrap JS (optional, only if you need JS components)
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Make sure we're importing from App.jsx, not App.js
import App from "./App.jsx";

// Use createRoot API
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
