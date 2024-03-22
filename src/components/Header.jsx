import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

export default function Header() {
  const { isAuth ,loading} = useAuth();
  console.log(isAuth);
  return (
    <nav className="header">
      <div>
        <h2>Todo App.</h2>
      </div>
      <article>
        <Link to={"/"}>Home</Link>
        <Link to={"/profile"}>Profile</Link>

        {isAuth ? (
          <Link to={"/logout"}>logout</Link>
        ) : (
          <>
            <Link to={"/login"}>Login</Link>
            <Link to={"/Register"}>Register</Link>
          </>
        )}
      </article>
    </nav>
  );
}
