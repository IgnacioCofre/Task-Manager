import React from "react";
import getDateFormat from "../../functions/dateFormat"

export default function Navbar() {
    return (
        <nav>
            <h1>Cosas por hacer</h1>
            <h2>Hoy: {getDateFormat(new Date())}</h2>
        </nav>
    )
}