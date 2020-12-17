import React from 'react'
import { Link } from "react-router-dom";

function NotFound() {
    return (
        <>
        <h3 style={{textAlign: "center"}}>Page not found!!</h3>
        <button className="back-button" style={{width: "90vw", marginLeft: "5vw"}}>
            <Link to={'/'} className="" >
            Back
            </Link>
        </button>
        </>
    )
}

export default NotFound
