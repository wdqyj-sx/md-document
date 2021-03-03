import {useEffect} from "react";
const {ipcRenderer} = window.require('electron');

const useIpcRenderer = (keyCallbackMap) => {
    useEffect(() => {
        Object.keys(keyCallbackMap).forEach(item =>{
            ipcRenderer.on(item,keyCallbackMap[item])
        })        
        return () => {
            Object.keys(keyCallbackMap).forEach(item => {
                ipcRenderer.removeListener(item,keyCallbackMap[item]);
            })
        };
    });
}

export default useIpcRenderer;