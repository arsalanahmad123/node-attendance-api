import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Users from "./screens/Users.jsx";
import Navbar from "./screens/Navbar.jsx";
import ViewUser from "./screens/ViewUser.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<ViewUser />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
