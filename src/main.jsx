import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles/app.scss";
import { BrowserRouter } from "react-router-dom";


export const server = "https://node-js-todo-0sqe.onrender.com/api/v1";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>      
        <App />
    </BrowserRouter>
  </React.StrictMode>
);
