'use strict';
const { app, BrowserWindow, Menu, ipcMain, ipcRenderer } = require('electron')
const shell = require('electron').shell
const path = require('path')
var win

require('electron-reload')(__dirname);

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      nodeIntegration: true
  }
  })

  win.loadFile('src/home.html')

  win.webContents.openDevTools()

  // Emitted when the window is closed.
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

// Quit when all windows are closed.
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

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

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