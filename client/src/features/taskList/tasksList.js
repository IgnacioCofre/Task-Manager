import React, { useEffect } from "react";
import { setTasks, loadingTasks } from "../taskList/stateSlice";
import { useSelector, useDispatch } from 'react-redux';

import Task from "../task/task";
import ControlBar from "../controlBar/controlBar";
import axios from "axios";

const urlBase = 'http://localhost:3000';

export default function TasksList () {

    const dispatch = useDispatch();
    const tasksValue = useSelector((state) => state.Tasks.value);
    const loading = useSelector((state) => state.Tasks.loading);

    useEffect(() => {
        console.log("get data from server")
        dispatch(loadingTasks);
        axios.get(`${urlBase}/tasks`)
            .then(res => dispatch(setTasks(res.data)))
            .catch(error => console.log(error));
    }, [dispatch]);
    
    const taksArray = tasksValue.map((task, idx) => (
        task.idDeleted ? null : <Task key={idx} task= {task} />
    )
    
);

    return (
        <div>
            <ControlBar/>
            {loading ? <h1>Loading Tasks...</h1> : taksArray}
        </div>
    )
}