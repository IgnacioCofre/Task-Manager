import React from "react";
import getDateFormat from "../../functions/dateFormat"
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav className="navbar">            
            <Link to={`/`} className="navbar-name">
                <h1>Cosas por hacer</h1>
            </Link>
            <h2 className="navbar-today">Hoy : {getDateFormat(new Date())}</h2>
        </nav>
    )
}