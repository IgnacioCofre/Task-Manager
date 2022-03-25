import React, { useState } from "react";
import { Link } from 'react-router-dom'
import axios from "axios";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const urlBase = 'http://localhost:3000';

export default function CreateTask () {
    
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
        //console.log(newTask);
        //funcion que maneje errores
        axios.post(`${urlBase}/tasks`,newTask)
    }

    // agregar mensaje de guardado
    return (
        <div>
            <h1>Crear nueava tarea</h1>
            <form className='search-form' onSubmit={submitHandler}>
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
                    <label htmlFor='iscompleted'>Completada:</label>
                    <input 
                        type="checkbox" 
                        name="completed"
                        checked={newTask.completed} 
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
                    <input type="submit" value="Submit" />
                </div>
            </form>
            <Link to='/' className='btn btn-primary'>Volver a página principal</Link>
        </div>
    )
}