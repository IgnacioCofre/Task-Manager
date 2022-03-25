import React from "react";
import getDateFormat from "../../functions/dateFormat";
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { updateIsDeletedTask } from '../taskList/stateSlice'

export default function Task (props) {
    
    const { id, completed, title, expirationDate, creationDate} = props.task;
    const indexState  = props.pos;
    
    const today = new Date();
    const overdueTask = (new Date(expirationDate) < today) ? true : false; 
    
    const checkState = useSelector(state => state.Tasks.value[indexState].isDeleted);
    //console.log(`${id} ${checkState}`);
    const dispatch = useDispatch();

    function changeCheckState (event) {
        //console.log("check function");
        dispatch(updateIsDeletedTask(indexState));
    }

    return (
        <div>
            <label>
                <input type="checkbox" name="checkbox" checked={checkState} onChange={changeCheckState}/>
            </label>
            <p>{title}</p>
            <p>Fecha de creación: {getDateFormat(new Date(creationDate))}</p>
            <p>Fecha de vencimiento: {getDateFormat(new Date(expirationDate))}</p>
            {
                completed ? <p>Completada</p> : 
                overdueTask ? <p>Atrasada</p> : <p>Por completar</p>
            }
            <Link to={`/editTask/${id}`} className='btn btn-primary'>
                Editar Tarea
            </Link>
        </div>
    )
}