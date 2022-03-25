import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { setTasks, loadingTasks } from "../taskList/stateSlice";
import { useSelector, useDispatch } from 'react-redux';
import { orderByCreationDate } from '../../functions/orderTasks';

export default function ControlBar () {
    
    const dispatch = useDispatch();
    const tasksValue = useSelector((state) => state.Tasks.value);

    const [ orderTasks, setOrderTasks ] = useState("creationDate");

    const orderTaskBy = async( orderBy ) => {
        dispatch(loadingTasks);
        var newOrderTasks = await tasksValue.map(task => task);
        newOrderTasks = await newOrderTasks.sort(orderByCreationDate(orderBy));
        dispatch(setTasks(newOrderTasks));
        console.log(newOrderTasks)
        console.log("end")
    }

    const handleChange = (event) => {
        const { value } = event.target;
        setOrderTasks(value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if ( orderTasks === "creationDate" || orderTasks === "expirationDate" ) {
            orderTaskBy(orderTasks);
        } else if (orderTasks === "currentState") {
            console.log("order by current state");
        } else {
            orderTaskBy("creationDate")
        }
    }

    return (
        <div>
            <Link to='createTask/' className='btn btn-primary'>+ Crear nueva tarea</Link>
            <form onSubmit={handleSubmit}>
                <label>Ordenar tareas por:
                    <select value={orderTasks} onChange={handleChange} >
                        <option value="creationDate">Fecha creación</option>
                        <option value="expirationDate">Fecha vencimiento</option>
                        <option value="currentState">Estado de tarea</option>
                    </select>
                </label>
                <input type="submit" value="Submit" />
            </form>
        </div>
        
    )
}
