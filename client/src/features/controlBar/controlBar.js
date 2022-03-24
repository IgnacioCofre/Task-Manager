import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { setTasks, loadingTasks } from "../taskList/stateSlice";
import { useSelector, useDispatch } from 'react-redux';
import { orderByCreationDate } from '../../functions/orderTasks';

export default function ControlBar () {
    
    const dispatch = useDispatch();
    const tasksValue = useSelector((state) => state.Tasks.value);

    const orderByCreation = async() => {
        dispatch(loadingTasks);
        var auxList = await tasksValue.map(task => task);
        auxList = await auxList.sort(orderByCreationDate("creationDate"));
        dispatch(setTasks(auxList));
        console.log(auxList)
        console.log("end")
    }

    return (
        <div>
            <Link to='createTask/' className='btn btn-primary'>+ Crear nueva tarea</Link>
            <button onClick={orderByCreation}>Ordenar por fecha de creación</button>
        </div>
        
    )
}
