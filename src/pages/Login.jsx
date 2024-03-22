import axios from "axios";
import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { server } from "../main";
import toast from "react-hot-toast";
import { useAuth } from "../Context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isAuth, setIsAuthenticated,setMessage ,setLoading,loading} = useAuth();
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const {data} = await axios.post(
        `${server}/users/login`,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      
      toast.success(data.message);

      setIsAuthenticated(true);
      setMessage(data.message);
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      
      setIsAuthenticated(false);
      setLoading(false);
    }    
  };
  if (isAuth) {
    return <Navigate to="/profile" />;
  }
  return (
    <div className="login">
      <section>
        <form onSubmit={submitHandler}>
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" disabled={loading}>Login</button>
          <h4>Or</h4>
          <Link to="/register">Sign Up</Link>
        </form>
      </section>
    </div>
  );
}
