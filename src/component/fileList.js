import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMarkdown } from "@fortawesome/free-brands-svg-icons";
import { faEdit ,faTrash,faWindowClose} from "@fortawesome/free-solid-svg-icons";
import useContentMenu from "../hook/useContentMenu";
import {findParent} from "../util/helper";
const { remote } = window.require("electron");
const {Menu,MenuItem} = remote;
const FilesList = ({ files, changeTitle, deleteFile ,listClick}) => {
  const [activeId, setActiveId] = useState(false);
  const [value,setValue] = useState("");
  // shortcut key
  useEffect(() => {
      const handle = (e)=>{
         
            if(e.keyCode===13&&activeId){
                changeTitle(activeId,value)
                setValue("")
                setActiveId(false);
            }
            else if(e.keyCode===27&&activeId){
                cancelEdit(activeId);
                
            }
      }
      document.addEventListener("keyup",handle);
      return () => {
          document.removeEventListener("keyup",handle);
      };
  });
  useEffect(() => {
     let newfiles = files.filter(item => {
         return item.isEdit;
     })
     if(newfiles.length>0){
         setActiveId(newfiles[0].id);
     }
  }, [files]);

 
  let contextNode = useContentMenu(
    [
        {
                    label:'更改',
                    click: ()=>{
                        // console.log('更改')
                        // console.log(contextNode.current)
                        let newNode = findParent(contextNode.current,'li-item');
                       
                        if(newNode){
                          clickEdit(newNode.dataset.id,newNode.dataset.title);
                        }
                    }
        },
        {
                    label:'删除',
                    click: ()=>{
                        let newNode = findParent(contextNode.current,'li-item');
                       
                        if(newNode){
                           
                            deleteFile(newNode.dataset.id);
                        }
                    }
                }
    ],'.li-wrap'
  )
  //click editButton
  const clickEdit = (id,title)=>{
      setValue(title)
      setActiveId(id);
  }
  // cancel editButton 
  const cancelEdit = (id) =>{
      setActiveId(false);
      setValue("");
      let newfile = files.filter(item => {
        return  item.isEdit;
      })
      if(newfile.length>0) {
          deleteFile(id);
      }
  }
  // delete file
 
  return (
    <ul className="list-group list-group-flush  li-wrap">
        {
            files.map(item=>{
                if(activeId!==item.id&&!item.isEdit){
                    return  <li className="list-group-item d-flex align-items-center px-1 li-item" key={item.id} 
                    data-id={item.id}
                    data-title = {item.title}
                    >
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
                        <li className="list-group-item d-flex align-items-center px-1 li-item" key={item.id}  data-id={item.id}
                        data-title = {item.title}>
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
  files: PropTypes.array,
  changeTitle: PropTypes.func,
  deleteFile: PropTypes.func,
  listClick:PropTypes.func
};

FilesList.defaultProps = {
  files: {},
};

export default FilesList;
