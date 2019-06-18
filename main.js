'use strict';
const { app, BrowserWindow, Menu, ipcMain,  } = require('electron')
const shell = require('electron').shell
const path = require('path')
var win

require('electron-reload')(__dirname);

function createWindow () {
  win = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      nodeIntegration: true
  }
  })

  win.loadFile('src/home.html')
  //win.webContents.openDevTools()

  win.on('closed', () => {
    win = null
  })

  var menu = Menu.buildFromTemplate([
    {
        label: 'Menu',
        submenu: [
            {label: 'Home'},
            {label: 'Quit',
                click(){
                    app.quit()
                }
            }
        ]
    },
    {
        label: 'About',
        submenu: [
            {label: 'See on GitHub',
                click(){
                    shell.openExternal('https://github.com/BenTheChi'); //make it open the website in the default browser       
                }
            },
            {label: 'About App',
                click(){
                    shell.openExternal('https://benchi.blog/'); //make it open the website in the default browser
                }
            },
            {label: 'About Creator',
                click(){
                    shell.openExternal('https://benchi.blog/'); //make it open the website in the default browser
                }
            }
        ]
    }
  ])
  Menu.setApplicationMenu(menu); 
}

app.on('ready', createWindow)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})

ipcMain.on('load-story', (event, story) => {
  const loadPath = path.join('file://', __dirname, 'src/story.html')
  win.loadURL(loadPath)
  .then((event) => {
    win.webContents.send('story', story)
    win.webContents.openDevTools()
  })
  .catch((error) => {
    console.log(error)
  })
})