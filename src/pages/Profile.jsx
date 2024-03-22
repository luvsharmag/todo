import React from "react";
import { useAuth } from "../Context/AuthContext";
import Loaderr from "../components/Loaderr";
import { useTask } from "../Context/TasksContext";

export default function Profile() {
  const { user, loading } = useAuth();
  const {tasks} = useTask();
  console.log(tasks);
  return loading ? (
    <Loaderr />
  ) : (
    <div>
      <h1>{user?.name}</h1>
      <p>{user?.email}</p>
    </div>
  );
}
