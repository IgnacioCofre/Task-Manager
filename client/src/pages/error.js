import React from 'react'
import { Link } from 'react-router-dom'

const Error = () => {
  return (
    <div className="create-task-container">
        <div className="create-task-title">
          <h1>Página no encontrada...</h1>
        </div>
        <button className='btn-back-home'>
          <Link to='/'>Volver a página principal</Link>
        </button>
    </div>
  )
}

export default Error