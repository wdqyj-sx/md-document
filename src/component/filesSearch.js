import React,{ useState,useEffect,useRef } from "react";
import PropTypes from "prop-types";
import useIpcRenderer from "../hook/useIpcRenderer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch,faTimesCircle } from '@fortawesome/free-solid-svg-icons'

const FilesSearch = ({title,startSearch}) => {
    const [active,setActive] = useState(false);
    const [value,setValue] = useState('');
    const node = useRef(null)
    // close search
    const searchClose = ()=>{
        setValue("")
        setActive(false)
    }
    // begin search
    const searchBegin = ()=>{
        setActive(true)
    }
   
    // set shortcul key
    useEffect(() => {
        const keyHandle = (e) =>{
            if(e.keyCode === 13&& active) {
                startSearch(value);
                setActive(false);
                setValue('');
            }
            else if (e.keyCode === 27 && active) {
                searchClose();
            }
        }
        document.addEventListener('keyup',keyHandle)
        return () => {
            document.removeEventListener('keyup',keyHandle);
        };
    });

    // get focus
    useEffect(() => {
        if(active) {
            node.current.focus()
        }
      
    }, [active]);
    useIpcRenderer({
        'search-file':searchBegin
    })
    return (
        <div className="alert alert-primary d-flex justify-content-between align-items-center mb-0 no-border">
            {
              !active&&
                <>
                    <span>{title}</span>
                    <button type="button" className="icon-button" onClick = {searchBegin} >
                    <FontAwesomeIcon icon={faSearch} ></FontAwesomeIcon>
                    </button>
                </>
        
            }
            {
                  active && 
                  <>
                      <input className="form-control col-10" placeholder="请输入标题搜索" ref={node} value = {value} onChange = {(e)=>{setValue(e.target.value);console.log(value)}}></input>
                      <button type="button" className="icon-button col-2" onClick = {searchClose}>
                        <FontAwesomeIcon icon={faTimesCircle} size="lg">
                        </FontAwesomeIcon>
                      </button>
                  </>
            }
        </div>
    )
}

FilesSearch.prototype = {
    title:PropTypes.string,
    startSearch:PropTypes.func
}

FilesSearch.defaultProps = {
    title:'我的云文档'
}

export default FilesSearch;