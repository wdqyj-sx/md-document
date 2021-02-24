import FilesSearch from "./component/filesSearch";
import FilesList from "./component/fileList";
import defaultFiles from "./util/defaultFiles";
import { toOBJ, toARR } from "./util/helper";
import TabList from "./component/tabList";
import React, { useState, useEffect } from "react";
import SimpleMDE from "react-simplemde-editor";
import Btn from "./component/Btn";
import { faPlus, faFileImport } from "@fortawesome/free-solid-svg-icons";
import "easymde/dist/easymde.min.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const Store = window.require("electron-store");
new Store();

function App() {
  const [files, setFiles] = useState(toOBJ(defaultFiles));
  const [activeId, setActiveId] = useState("1");
  const [openFilesID, setOpenFilesID] = useState([]);
  const [unsaveId, setunsaveId] = useState([]);
  const [searchFiles,setSearchFiles] = useState(defaultFiles);
  const activeFile = files[activeId];
  const arrFiles = toARR(files);
  const openFiles = openFilesID.map(id =>{
    return files[id];
  })
  // tablist select id
  const selectTabId = (id) => {
    setActiveId(id);
  };
  const deleteTabId = (id) => {
    let newFilesID = openFilesID.filter((item) => {
      return item !== id;
    });
    if(id === activeId){
     
      if(newFilesID.length>0) {
        console.log('hah')
        let newId = newFilesID[0];
        setActiveId(newId);
      } 
      else {
        setActiveId("");
      }
    }

    // console.log(newFiles);

    setOpenFilesID(newFilesID);
  };
  const changeListTitle = (id, value) => {
    console.log(id,value)
    let newFiles = files[id];
    console.log(newFiles);
    newFiles.title = value;
    setFiles({
      ...files,
      [id]: newFiles,
    });

  };
  const deleteListFile = (id) => {
    delete files[id];
    setFiles(files);
    console.log(files);
    console.log(arrFiles);
  }
  const addTab = (id) => {
    console.log(id);
    console.log(!openFilesID.includes(id));
    if(!openFilesID.includes(id)){
      openFilesID.push(id);
      setOpenFilesID(openFilesID);
      console.log(openFilesID);
     
    }
    setActiveId(id);
   
  }
  const editContent = (value) =>{
    console.log(unsaveId);
    if(!unsaveId.includes(activeId)){
      unsaveId.push(activeId);
      setunsaveId(unsaveId);
    }
  }
  const searchContent = (value) =>{
    console.log(value);
    let newfiles = arrFiles.filter(item => {
      return item.title.includes(value);
    })
    setSearchFiles(newfiles);
    console.log(searchFiles);
  }
  const createFile = () => {
      let newId = 0;
      let newFile = {
        id:newId,
        title:'',
        body:'##请输入内容',
        createdAt:new Date().getTime(),
        isEdit:true,
      };
      setFiles({
        ...files,
        [newId]:newFile
      })
      console.log('hha');
      console.log(files);
  }
  return (
    <div className="App row mx-0">
      <div className="col-3 px-0 left-panel">
        <FilesSearch
          title="我的云文档"
          startSearch={(value) => {
            console.log(value)
            searchContent(value);
          }}
        ></FilesSearch>
        <FilesList
          files={searchFiles.length<arrFiles.length?searchFiles:arrFiles}
          changeTitle={(id, value) => {
            changeListTitle(id, value);
          }}
          deleteFile={(id) => {
            deleteListFile(id);
          }}
          listClick = {(id)=>{addTab(id)}}
        ></FilesList>
        <div className=" row button-group btn-wrap mx-0">
          <Btn btnSty={"btn btn-primary col"} text={"新建"} icon={faPlus} btnClick = {()=>{createFile()
          }}></Btn>
          <Btn
            btnSty={"btn btn-success col"}
            text={"导入"}
            icon={faFileImport}
          ></Btn>
        </div>
      </div>
      <div className="col-9 px-0">
        <TabList
          openFiles={openFiles}
          activeId={activeId}
          editId={unsaveId}
          selectActive={(id) => {
            selectTabId(id);
          }}
          deleteTab={(id) => {
            deleteTabId(id);
          }}
        ></TabList>
        <SimpleMDE key={activeFile && activeId} value={activeFile && activeFile.body} onChange = {(value)=>{
          editContent(value)
        }}></SimpleMDE>
      </div>
    </div>
  );
}

export default App;
