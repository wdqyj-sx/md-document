import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMarkdown } from "@fortawesome/free-brands-svg-icons";
import { faEdit ,faTrash,faWindowClose} from "@fortawesome/free-solid-svg-icons";

const FilesList = ({ files, changeTitle, deleteFile ,listClick}) => {
  const [activeId, setActiveId] = useState(false);
  const [value,setValue] = useState("")
  // shortcut key
  useEffect(() => {
      const handle = (e)=>{
            if(e.keyCode===13&&activeId){
                console.log(value)
                changeTitle(activeId,value)
                setValue("")
                setActiveId(false);
            }
            else if(e.keyCode===27&&activeId){
                setActiveId(false)
                setValue("")
            }
      }
      document.addEventListener("keyup",handle);
      return () => {
          document.removeEventListener("keyup",handle);
      };
  }, [value]);
  //click editButton
  const clickEdit = (id,title)=>{
      setValue(title)
      setActiveId(id);
  }
  // cancel editButton 
  const cancelEdit = (id) =>{
      setActiveId(false);
      setValue("")
  }
  // delete file
 
  return (
    <ul className="list-group list-group-flush  ">
        {
            files.map(item=>{
                if(activeId!==item.id&&!item.isEdit){
                    return  <li className="list-group-item d-flex align-items-center px-1" key={item.id}>
                    <span className="col-2"> <FontAwesomeIcon icon={faMarkdown}></FontAwesomeIcon></span>
                      <span className="col-7" onClick = { ()=>{listClick(item.id)} }>{item.title}</span> 
                      <span className="d-flex col-3 ">
                          <button type="button" className="icon-button mr-2" onClick={()=>{clickEdit(item.id,item.title)}}>
                              <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
                          </button>
                          <button type="button" className="icon-button" onClick={()=>{deleteFile(item.id)}}>
                              <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                          </button>
                      </span>
                       </li>
                }else {
                    return (
                        <li className="list-group-item d-flex align-items-center px-1" key={item.id}>
                            <input className="form-control col-10" value={value} onChange={e=>{setValue(e.target.value)}}></input>
                            <button type="button" className="icon-button col-2" onClick={()=>{cancelEdit(item.id)}}>
                                <FontAwesomeIcon icon={faWindowClose}></FontAwesomeIcon>
                            </button>
                        </li>
                    )
                }
             
                    
            })
        }
     
    </ul>
  );
};

FilesList.prototype = {
  files: PropTypes.object,
  changeTitle: PropTypes.func,
  deleteFile: PropTypes.func,
  listClick:PropTypes.func
};

FilesList.defaultProps = {
  files: {},
};

export default FilesList;
