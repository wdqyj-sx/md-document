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
import { v4 as uuidv4 } from "uuid";
import fileHelper from "./util/fileHelper";
const { join,basename,extname,dirname } = window.require("path");
const { remote, ipcRenderer } = window.require("electron");
const Store = window.require("electron-store");
const recordStroge = new Store();


function App() {
  const [files, setFiles] = useState(recordStroge.get('record')||{});
  const [activeId, setActiveId] = useState();
  const [openFilesID, setOpenFilesID] = useState([]);
  const [unsaveId, setunsaveId] = useState([]);
  const [searchFiles, setSearchFiles] = useState([]);
  const activeFile = files[activeId];
  const arrFiles = toARR(files);
  const localStroge = remote.app.getPath("documents");
  const openFiles = openFilesID.map((id) => {
    return files[id];
  });
  const setRecord = (setfiles) =>{
    let strogeData = toARR(setfiles).reduce((map,item)=>{
       let {id,path,title,createdAt} = item;
        map[id] = {
          id,
          path,
          title,
          createdAt
        }
        return map;
    },{})

    recordStroge.set('record',strogeData);
  }
  // tablist select id
  const selectTabId = (id) => {
    setActiveId(id);
  };
  const deleteTabId = (id) => {
    if (!openFilesID.includes(id)) {
      return;
    }
    let newFilesID = openFilesID.filter((item) => {
      return item !== id;
    });
    if (id === activeId) {
      if (newFilesID.length > 0) {
        console.log("hah");
        let newId = newFilesID[0];
        setActiveId(newId);
      } else {
        setActiveId("");
      }
    }

    // console.log(newFiles);

    setOpenFilesID(newFilesID);
  };
  const changeListTitle = (id, value) => {
    
    if(!value) {
      return;
    }
    let  newPath =files[id].isEdit ? join(localStroge, `${value}.md`):join(dirname(files[id].path), `${value}.md`);
    let newFiles = {
      ...files[id],
      title:value,
      isEdit:false,
      path:newPath
    }
    let nowFiles = {
      ...files,
      [id]:newFiles
    }
   
      if (files[id].isEdit) { 
        fileHelper.writeFiles(newPath,newFiles.body).then(() => {
       
          setFiles(nowFiles);
          setRecord(nowFiles);
         
        });
      }else {
        fileHelper.renameFiles(files[id].path,newPath).then(()=>{
          setFiles(nowFiles);
          setRecord(nowFiles);
         
        })
      }
    
   
  };
  const deleteListFile = (id) => {
    delete files[id];
    setFiles({ ...files });
    setRecord(files);
    deleteTabId(id);
   
  };
  const addTab = (id) => {
    if (!openFilesID.includes(id)) {
      openFilesID.push(id);
      if(!files[id].isRead){
      
        fileHelper.readFiles(files[id].path).then(value=>{
          let newfile = {
            ...files[id],
            body:value,
            isRead:true
          }
          setFiles({
            ...files,
            [id]:newfile
          })
        })
      }
      setOpenFilesID(openFilesID);
    }
    setActiveId(id);
  };
  const editContent = (value) => {
  
    if (!unsaveId.includes(activeId)) {
      unsaveId.push(activeId);
      setunsaveId(unsaveId);
     
    }
    let newfile = files[activeId];
    newfile = {
      ...newfile,
      body:value
    }
    setFiles({
      ...files,
      [activeId]:newfile
    })
  };
  const searchContent = (value) => {
    console.log(value);
    let newfiles = arrFiles.filter((item) => {
      return item.title.includes(value);
    });
    setSearchFiles(newfiles);
    console.log(searchFiles);
  };
  const createFile = () => {
    let newId = uuidv4();
    let hasfile = arrFiles.filter((item) => {
      return item.isEdit;
    });
    if (!hasfile.length > 0) {
      let newFile = {
        id: newId,
        title: "",
        body: "##请输入内容",
        createdAt: new Date().getTime(),
        isEdit: true,
      };
      setFiles({
        ...files,
        [newId]: newFile,
      });
    }
  };
  const importFiles = () => {
   
    remote.dialog.showOpenDialog({
      title:'请选择 markdown文件',
      defaultFiles:localStroge,
      filters:[{name:'Markdown',extensions:['md']}],
      properties:['multiSelections']
    }).then((obj)=>{
    
      if(Array.isArray(obj.filePaths)){
        console.log('hah')
        const filterPaths = obj.filePaths.filter(item => {
          const alreadyAdded = Object.values(files).find(file => {
            return file.path === item
          })
          return !alreadyAdded;
        })
       const filterFiles =  filterPaths.map(path => {
      
         return {
           id: uuidv4(),
           isEdit:false,
           title:basename(path,extname(path)),
           path,
          
         }
       })
      
       setFiles({
         ...files,
         ...toOBJ(filterFiles)
       })
       setRecord({
        ...files,
        ...toOBJ(filterFiles)
       })
       if(filterFiles.length>0){
         remote.dialog.showMessageBox({
           type:'info',
           message:`成功导入了${filterFiles.length}个文件`
         })
       }
      }
    })
  }
  return (
    <div className="App row mx-0">
      <div className="col-3 px-0 left-panel">
        <FilesSearch
          title="我的云文档"
          startSearch={(value) => {
            console.log(value);
            searchContent(value);
          }}
        ></FilesSearch>
        <FilesList
          files={
            searchFiles.length > 0 && searchFiles.length < arrFiles.length
              ? searchFiles
              : arrFiles
          }
          changeTitle={(id, value) => {
            changeListTitle(id, value);
          }}
          deleteFile={(id) => {
            deleteListFile(id);
          }}
          listClick={(id) => {
            addTab(id);
          }}
        ></FilesList>
        <div className=" row button-group btn-wrap mx-0">
          <Btn
            btnSty={"btn btn-primary col"}
            text={"新建"}
            icon={faPlus}
            btnClick={() => {
              createFile();
            }}
          ></Btn>
          <Btn
            btnSty={"btn btn-success col"}
            text={"导入"}
            icon={faFileImport} 
           btnClick={importFiles}
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
        <SimpleMDE
          key={activeFile && activeId}
          value={activeFile && activeFile.body}
          onChange={(value) => {
            editContent(value);
          }}
        ></SimpleMDE>
      </div>
    </div>
  );
}

export default App;
