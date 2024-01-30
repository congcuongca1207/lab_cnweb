import { useState } from "react"
import "./style.css"

function UserProfile(props) {
    return <div>
        <img className={props.active ? "user-image active" : "user-image"} src={props.image} alt="" />
        <p>{props.name}</p>
    </div>
}

export default UserProfile