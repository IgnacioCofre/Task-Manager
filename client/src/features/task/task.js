import React, { useState } from "react";
import getDateFormat from "../../functions/dateFormat";
import { Link } from 'react-router-dom'

export default function Task (props) {
    const { id, completed, title, expirationDate, creationDate } = props.task;
    const [ checkState, setCheckState ] = useState(false);
    
    function changeCheckState () {
        console.log("check function");
        setCheckState(checkState => !checkState);
    }

    return (
        <div>
            <label>
                <input type="checkbox" checked={checkState} onChange={changeCheckState}/>
            </label>
            <p>{title}</p>
            <p>Fecha de creación: {getDateFormat(new Date(creationDate))}</p>
            <p>Fecha de vencimiento: {getDateFormat(new Date(expirationDate))}</p>
            {
                completed ? <p>Completed</p> : <p>Not Completed</p>
            }
            <Link to={`/editTask/${id}`} className='btn btn-primary'>
                Editar Tarea
            </Link>
        </div>
    )
}