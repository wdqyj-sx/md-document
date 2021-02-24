import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import defaultFiles from "../util/defaultFiles";


const Btn = ({btnSty,text,icon,btnClick}) =>{
    return (
        <button type="button" className={btnSty} onClick = {btnClick}>
            <span className="mr-2">{text}</span>
            <span ><FontAwesomeIcon icon={icon}></FontAwesomeIcon></span>
        </button>
    )

}

export default Btn;