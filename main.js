const {app,BrowserWindow,Menu,ipcMain} = require("electron");
const path = require('path');
const isDev = require("electron-is-dev");
const Store = require("electron-store");
const menuTemplate = require("./src/util/menuTemplate");
const AppWindow = require('./src/AppWindow');
new Store();
let mainWindow,settingsWindow;
// monitor mainwindow open
app.on("ready",()=>{
    const urlLocation = isDev ? "http:localhost:3000" :"urlReal";
    // mainWindow.loadURL(urlLocation);
    mainWindow = new AppWindow({
        width:1440,
        height:765
    },urlLocation);
    mainWindow.on('closed',()=>{
        mainWindow = null
    })
    const menu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(menu);
    ipcMain.on('open-settings-window',()=>{
        console.log('hah')
        const settingsFileLocation = `file://${path.join(__dirname,'./src/settings/settings.html')}`;
        settingsWindow = new AppWindow({
            width:500,
            height:400,
            parent:mainWindow
        },settingsFileLocation);
        settingsWindow.on('closed',()=>{
            settingsWindow = null
        })
    })
})