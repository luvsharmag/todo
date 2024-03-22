import axios from "axios";
import React from "react";
import { server } from "../main";
import toast from "react-hot-toast";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const { isAuth, setIsAuthenticated,loading,setLoading } = useAuth();
  const navigate = useNavigate();
  async function logoutHandler() {
    try {
      setLoading(true)
      const { data } = await axios.get(`${server}/users/logout`, {
        withCredentials: true,
      });
      
      toast.success(data.message);
      setIsAuthenticated(false);
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthenticated(true);
      setLoading(false);
    }
  }
  if(!isAuth){
    navigate("/login");
  }
  return (
    <div className="logout">
      <section>
        <button onClick={logoutHandler} disabled={loading}>logout</button>
      </section>
    </div>
  );
}
