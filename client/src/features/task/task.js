import React from "react";
import getDateFormat from "../../functions/dateFormat";
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { updateIsDeletedTask } from '../taskList/stateSlice'

export default function Task (props) {
    
    const { id, completed, title, expirationDate, creationDate} = props.task;
    const indexState  = props.pos;

    const taskStates = {
        "completed": "Completada",
        "toDo": "Por completar",
        "expire": "Atrasada"
    }
    
    const today = new Date();
   
    var taskState = "toDo";
    if (completed) {
        taskState = "completed"
    } else {
        if (new Date(expirationDate) < today) {
            taskState = "expire";
        } else {
            taskState = "toDo";
        }
    }

    const checkState = useSelector(state => state.Tasks.value[indexState].isDeleted);
    //console.log(`${id} ${checkState}`);
    const dispatch = useDispatch();

    function changeCheckState (event) {
        //console.log("check function");
        dispatch(updateIsDeletedTask(indexState));
    }

    return (
        <div className={`task task-${taskState}`}>
            <label className="delete-task-ckeckbox"> Eliminar:
                <input type="checkbox" name="checkbox" checked={checkState} onChange={changeCheckState}/>
            </label>
            <span className="task-title">{title}</span>
            <div className="date-creation">
                <p>Fecha de creación:</p>
                <p>{getDateFormat(new Date(creationDate))}</p>
            </div>
            <div className="date-expire">
                <p>Fecha de vencimiento:</p>
                <p>{getDateFormat(new Date(expirationDate))}</p>
            </div>
            
            <p className="task-state">
            { taskStates[taskState] }
            </p>
            <button className="btn-edit">
                <Link to={`/editTask/${id}`} className='btn btn-primary'>
                    Editar Tarea
                </Link>
            </button>
            
        </div>
    )
}