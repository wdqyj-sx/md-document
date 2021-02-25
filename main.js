const {app,BrowserWindow} = require("electron");
const isDev = require("electron-is-dev");
const Store = require("electron-store");
new Store();
let mainWindow;
// monitor mainwindow open
app.on("ready",()=>{
    //create window
    mainWindow = new BrowserWindow({
        width:1440,
        height:765,
        webPreferences:{
            nodeIntegration:true,
            enableRemoteModule:true 
        }
    })
    // open debug
    mainWindow.webContents.openDevTools();
    const urlLocation = isDev ? "http:localhost:3000" :"urlReal";
    mainWindow.loadURL(urlLocation);

})