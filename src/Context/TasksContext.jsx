import {createContext, useContext, useState } from "react";

const TasksContext = createContext();

export const TaskProvider=({children})=>{
    const {tasks,setTasks} = useState([]);
    const {taskLoading,setTaskLoading} = useState(false);

    return (
        <TasksContext.Provider value={{tasks,setTasks, setTaskLoading,
            taskLoading}}>
            {children}
        </TasksContext.Provider>
    )
};

export const useTask = ()=>{
    const context = useContext(TasksContext);
    return context;
};