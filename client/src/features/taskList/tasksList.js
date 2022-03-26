import React, { useEffect } from "react";
import { setTasks, loadingTasks } from "../taskList/stateSlice";
import { useSelector, useDispatch } from 'react-redux';
import { orderTasksBy } from "../../functions/orderTasks";

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
            .then(res => dispatch(setTasks(res.data.sort(orderTasksBy("creationDate")))))
            .catch(error => console.log(error));
    }, [dispatch]);
    
    const taksArray = tasksValue.map((task, idx) => (
        <Task key = {idx} task = {task} pos = {idx} />
    )
    
);

    return (
        <div >
            <ControlBar/>
            <div className="task-container">
                {loading ? <h1>Cargando Tareas...</h1> :
                taksArray === {} ? <h1>No hay tareas, disfruta tu día libre :D</h1> : taksArray}
            </div>
        </div>
    )
}