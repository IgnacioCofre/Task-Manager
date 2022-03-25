import React, {useEffect, useState} from "react";
import { useParams, Link } from 'react-router-dom';
import axios from "axios";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const urlBase = 'http://localhost:3000';

export default function EditTask () {
    
    const { id } = useParams();
    const [ updatedTask, setUpdatedTask ] = useState({
        title: "",
        expirationDate: new Date(),
        completed: false
    })

    useEffect(() => {
        const getTask = async () => {
            axios.get(`${urlBase}/tasks/${id}`)
                .then(res => {
                    console.log(res.data);
                    if(res.data !== {}) {
                        setUpdatedTask({
                            title: res.data.title,
                            expirationDate: new Date(res.data.expirationDate),
                            completed: res.data.completed,
                        })
                    }
                })
                .catch(error => console.log(error));
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
        console.log(updatedTask);
        //funcion que maneje errores
        axios.patch(`${urlBase}/tasks/${id}`,updatedTask)
    }

    //caso en que la tarea no exista
    // agregar mensaje de guardado
    return (
        <div>
            <h1>Editar tarea { id } </h1>
            <form className='search-form' onSubmit={submitHandler}>
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
                    <label htmlFor='iscompleted'>Completada:</label>
                    <input 
                        type="checkbox" 
                        name="completed"
                        checked={updatedTask.completed} 
                        onChange={changeHandler}
                    >
                    </input>
                    <DatePicker selected={updatedTask.expirationDate} onChange={date => 
                        setUpdatedTask(updatedTask => {
                            return {
                                ...updatedTask,
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