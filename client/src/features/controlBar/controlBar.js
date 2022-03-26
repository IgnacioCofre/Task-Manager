import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { setTasks, loadingTasks } from "../taskList/stateSlice";
import { useSelector, useDispatch } from 'react-redux';
import { orderTasksBy } from '../../functions/orderTasks';

import axios from "axios";
const urlBase = 'http://localhost:3000';

export default function ControlBar () {
    
    const dispatch = useDispatch();
    const tasksValue = useSelector((state) => state.Tasks.value);

    const [ orderTasks, setOrderTasks ] = useState("creationDate");

    const updateOrderTaskBy = async( orderBy ) => {
        dispatch(loadingTasks);
        var newOrderTasks = Array.from(tasksValue);
        newOrderTasks = newOrderTasks.sort(orderTasksBy(orderBy));
        dispatch(setTasks(newOrderTasks));
        //console.log(newOrderTasks)
    }

    const handleChange = (event) => {
        const { value } = event.target;
        setOrderTasks(value);
        updateOrderTaskBy(value);
    }

    const updateIsDeleted = async () => {
        //console.log("press botton")
        //console.log(tasksValue);
        dispatch(loadingTasks);
        let jobs =  [Promise];
        tasksValue.forEach(task => {
            const { id, isDeleted } = task;
            if (isDeleted) {
                //console.log(`task: ${id} ${isDeleted}`);
                const deleteTask = axios.delete(`${urlBase}/tasks/${id}`);
                jobs.push(deleteTask);
            }
        });
        
        await Promise.all(jobs);

        axios.get(`${urlBase}/tasks`)
            .then(res => {
                //console.log("end for");
                //console.log(res.data);
                dispatch(setTasks(res.data))
            })
            .catch(error => console.log(error))
    }

    return (
        <div className="bar-control">
            <button onClick={updateIsDeleted} className="btn-liberate">Liberar tareas seleccionadas</button>
            <button className="btn-create-task">
                <Link to='createTask/'>+ Crear nueva tarea</Link>
            </button>
            <div className="order-selector">
                <label className="order-selector-label">Ordenar tareas por:</label>
                <select value={orderTasks} onChange={handleChange} >
                    <option value="creationDate">Fecha creación</option>
                    <option value="expirationDate">Fecha vencimiento</option>
                    <option value="currentState">Estado de tarea</option>
                </select>
            </div>
            
        </div>
        
    )
}
