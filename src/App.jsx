import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import { AuthProvider, useAuth } from "./Context/AuthContext";
import Logout from "./pages/Logout";
import { TaskProvider } from "./Context/TasksContext";


export default function App() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/");
  }, []);
  return (
    <>
      <AuthProvider>
        <Header />
        <TaskProvider>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </TaskProvider>
        <Toaster />
      </AuthProvider>
    </>
  );
}
