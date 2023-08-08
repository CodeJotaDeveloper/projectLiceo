import React from 'react'
import { Link } from "react-router-dom"

export const ItemSidebar = ({ label, path, icon }) => {
    return (<Link to={path}>
        <button className='box'>
            <spam className="material-symbols-outlined">{icon}</spam>
            <h4>{label}</h4>
        </button>
    </Link>

    )

}

