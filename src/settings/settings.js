const {remote,dialog} = require('electron');
const Store = require('electron-store');

const strogelocation = new Store({name:'strogelocation'});
const $ = (id) => {
    return document.getElementById(id);
}

document.addEventListener('DOMContentLoaded',()=>{
    let stroge = strogelocation.get('strogelocation');
   
    if(stroge) {
        $('savedFileLocation').value = stroge
    }
    $('select-new-location').addEventListener('click',()=>{
        remote.dialog.showOpenDialog({
            title:'请选择文件',
            properties:['openDirectory']
        }).then((obj) => {
            if(Array.isArray(obj.filePaths)){
                strogelocation.set('strogelocation',obj.filePaths[0]);
                $('savedFileLocation').value = obj.filePaths[0];
            }
        })
    })
})