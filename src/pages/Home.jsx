import React, { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContext";

import axios from "axios";
import { server } from "../main";
import toast from "react-hot-toast";
import { useTask } from "../Context/TasksContext";
import Task from "../components/Task";

export default function Home() {
  // const { Navigate } = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const {
    isAuth,
    setUser,
    setIsAuthenticated,
    setMessage,
    setLoading,
    loading,
  } = useAuth();
  const [taskLoading, setTaskLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [refresh,setRefresh] = useState(false);
  useEffect(() => {
    function getProfile() {
      setLoading(true);
      axios
        .get(`${server}/users/profile`, {
          withCredentials: true,
        })
        .then((res) => {
          const user = res.data.data.user;
          setUser(user);
          setIsAuthenticated(true);
        })
        .catch((error) => {
          // console.log(error);
          toast.error(error.response.data.message);
          setIsAuthenticated(false);
        });
      setLoading(false);
    }
    getProfile();
  }, []);
  //add a task
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setTaskLoading(true);
      const { data } = await axios.post(
        `${server}/task/newTask`,
        {
          title,
          description,
          isCompleted: false,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setTaskLoading(false);      
      toast.success("added successfully");
      setTitle("");
      setDescription("");
      setRefresh((prev)=>!prev);
    } catch (error) {
      toast.error(error.response.data.message);
      setTaskLoading(false);    
    }
  };
  //render all task

  useEffect(() => {
    async function getAllTask() {
      try {
        const res = await axios.get(`${server}/task/getAllTask`, {
          withCredentials: true,
        });
        const tasks = res.data.data.tasks;
        console.log(tasks);
        setTasks(tasks);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
    getAllTask();
  }, [refresh]);
  const updateHandler = async (id) => {
    try {
      const data = await axios.put(`${server}/task/${id}`,{},{withCredentials:true});      
      toast.success(data.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
    setRefresh((prev)=>!prev)
  };
  const deleteHandler = async(id) => {
    try {
      const data = await axios.delete(`${server}/task/${id}`,{withCredentials:true});
      toast.success(data.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
    setRefresh((prev)=>!prev)
  };

  return (
    <div className="container">
      <div className="login">
        <section>
          <form onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="Title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="text"
              placeholder="Description"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button type="submit" disabled={taskLoading}>
              ADD TASK
            </button>
          </form>
        </section>
      </div>
      <section className="todosContainer">
        {tasks?.map((task) => (
          <Task
            key={task._id}
            title={task.title}
            description={task.description}
            isCompleted={task.isCompleted}
            updateHandler={updateHandler}
            deleteHandler={deleteHandler}
            id={task._id}
          />
        ))}
      </section>
    </div>
  );
}
