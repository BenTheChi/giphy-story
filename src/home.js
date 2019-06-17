'use strict'
const {remote, ipcRenderer} = require('electron')
const BrowserWindow = remote.BrowserWindow
const path = require('path')
const axios = require('axios')

const loadBtn = document.getElementById('loadBtn')
const createBtn = document.getElementById('createBtn')
const randomBtn = document.getElementById('randomBtn')
const homeGif = document.getElementById('home-gif')

axios.get('http://api.giphy.com/v1/gifs/random?api_key=G5mb3AgMEZjKJQoTTsZWoAbC841cxpzw')
.then((response) => {
    homeGif.setAttribute("src", response.data.data.embed_url)
})
.catch((error) => {
    homeGif.setAttribute("src", "https://giphy.com/embed/Rkis28kMJd1aE")
    console.log(error)
})


loadBtn.addEventListener('click', (event) => {
    const loadPath = path.join('file://', __dirname, 'load.html')
    let win = new BrowserWindow({
        alwaysOnTop: true,
        width: 600,
        height: 300,
        webPreferences: {
          nodeIntegration: true
      }
    })
    win.webContents.openDevTools()

    win.on('close', () => {
        win = null;
    })
    win.loadURL(loadPath)
    win.show()
})

createBtn.addEventListener('click', (event) => {
    const createPath = path.join('file://', __dirname, 'create.html')
    let win = new BrowserWindow({
        alwaysOnTop: true,
        width: 600,
        height:700,
        webPreferences: {
          nodeIntegration: true
      }
    })
    // win.webContents.openDevTools()
    win.webContents.openDevTools()

    win.on('close', () => {
        win = null;
    })
    win.loadURL(createPath)
    win.show()
})

randomBtn.addEventListener('click', (event) => {
    const loadPath = path.join('file://', __dirname, 'story.html')
    remote.getCurrentWindow().loadURL(loadPath)
})

// ipcRenderer.on('story-home',(event, story) => {
//     const loadPath = path.join('file://', __dirname, 'story.html')
//     remote.getCurrentWindow().loadURL(loadPath)
//     ipcRenderer.send('story',story)
// })