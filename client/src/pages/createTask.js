import React, { useState } from "react";
import { Link } from 'react-router-dom'
import axios from "axios";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const urlBase = 'http://localhost:3000';

export default function CreateTask () {
    
    const [ taskSaveSuccess, setTaskSaveSuccess ] = useState(false);
    const [ newTask, setNewTask ] = useState({
        title: "",
        creationDate: new Date(),
        expirationDate: new Date(),
        completed: false,
        isDeleted: false,
    })

    const changeHandler = (event) => {
        const { name, value, type } = event.target;
        setNewTask((newTask) => {
            return {...newTask, [name]: type === "checkbox" ? !newTask.completed : value }
        });
    }

    const submitHandler = (event) => {
        event.preventDefault();
        axios.post(`${urlBase}/tasks`,newTask)
            .then(setTaskSaveSuccess(true))
            .catch(error => console.log(error));
    }

    // agregar mensaje de guardado
    return (
        <div className="create-task-container">
            <div className="create-task-title">
                <h1 >Crear nueava tarea</h1>
            </div>

            <form className='create-task-form' onSubmit={submitHandler}>
                <div className='form-control'>
                    <label htmlFor='name'>Descripción:</label>
                    <input 
                        type='text'
                        id='title'
                        name='title'
                        value={newTask.title}
                        onChange={changeHandler}
                    >
                    </input>

                    <label htmlFor='creationDate'>Fecha de creación:</label>
                    <DatePicker selected={newTask.creationDate} name='creationDate'
                    onChange={date => 
                        setNewTask(newTask => {
                            return {
                                ...newTask,
                                creationDate:date
                            }
                        })
                    } 
                    />
                    <label htmlFor='expirationDate'>Fecha de término:</label>
                    <DatePicker selected={newTask.expirationDate} name='expirationDate'
                    onChange={date => 
                        setNewTask(newTask => {
                            return {
                                ...newTask,
                                expirationDate:date
                            }
                        })
                    } 
                    />
                    <label htmlFor='iscompleted'>Completada:</label>
                    <input 
                        type="checkbox" 
                        name="completed"
                        checked={newTask.completed} 
                        onChange={changeHandler}
                    >
                    </input>

                    <input className="create-task-btn" type="submit" value="Guardar tarea" />
                    <div className="create-task-title">
                        {taskSaveSuccess ? <span className="warning-message">Tarea creada</span> : null}
                    </div>
                 
                </div>
            </form>
            <button className='btn-back-home'>
                <Link to='/'>Volver a página principal</Link>
            </button>
            
        </div>
    )
}