import React, {useEffect, useState} from "react";
import { useParams, Link } from 'react-router-dom';
import axios from "axios";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const urlBase = 'http://localhost:3000';

export default function EditTask () {
    
    const { id } = useParams();
    const [ taskNotFound, setTaskNotFound ] = useState(false);
    const [ taskSaveSuccess, setTaskSaveSuccess] = useState(false);
    const [ updatedTask, setUpdatedTask ] = useState({
        title: "",
        expirationDate: new Date(),
        completed: false
    })

    useEffect(() => {
        const getTask = async () => {
            axios.get(`${urlBase}/tasks/${id}`)
                .then(res => {
                    //console.log(res.data);
                    if(res.data !== {}) {
                        setUpdatedTask({
                            title: res.data.title,
                            expirationDate: new Date(res.data.expirationDate),
                            completed: res.data.completed,
                        })
                    }
                })
                .catch(error => {
                    console.log(error)
                    setTaskNotFound(true);
                });
        }
        getTask();
    }, [id]);

    const changeHandler = (event) => {
        const { name, value, type } = event.target;
        setUpdatedTask((updatedTask) => {
            return {...updatedTask, [name]: type === "checkbox" ? !updatedTask.completed : value }
        });
    }

    const submitHandler = (event) => {
        event.preventDefault();
        //console.log(updatedTask);
        //funcion que maneje errores
        axios.patch(`${urlBase}/tasks/${id}`,updatedTask)
            .then(setTaskSaveSuccess(true))
            .catch(error => console.log(error));
    }

    //caso en que la tarea no exista
    if (taskNotFound) {
        return (
            <div className="create-task-container">
                <div className="create-task-title">
                    <h1 >Tarea no encontrada</h1>
                </div>
                <button className='btn-back-home'>
                    <Link to='/'>Volver a página principal</Link>
                </button>
            </div>
        )
    }

    return (
        <div className="create-task-container">
            <div className="create-task-title">
                <h1>Editar tarea: { id } </h1>
            </div>
            
            
            <form className='create-task-form' onSubmit={submitHandler}>
                <div className='form-control'>
                    <label htmlFor='name'>Descripción:</label>
                    <input 
                        type='text'
                        id='title'
                        name='title'
                        value={updatedTask.title}
                        onChange={changeHandler}
                    >
                    </input>
                    
                    <label htmlFor='expirationDate'>Fecha de expiración: </label>
                    <DatePicker name="expirationDate" selected={updatedTask.expirationDate} onChange={date => 
                        setUpdatedTask(updatedTask => {
                            return {
                                ...updatedTask,
                                expirationDate:date
                            }
                        })
                        } 
                    />
                    <label htmlFor='iscompleted'>Completada:</label>
                    <input 
                        type="checkbox" 
                        name="completed"
                        checked={updatedTask.completed} 
                        onChange={changeHandler}
                    >
                    </input>
                    
                    <input className="create-task-btn" type="submit" value="Guardar cambios" />

                    <div className="create-task-title">
                        {taskSaveSuccess ? <span>Tarea guardada</span>: null}
                    </div>
                </div>
            </form> 
            <button className='btn-back-home'>
                <Link to='/'>Volver a página principal</Link>
            </button>
        </div>
    )
}