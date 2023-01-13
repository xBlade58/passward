const {app, BrowserWindow, ipcMain} = require('electron')
    const url = require("url");
    const path = require("path");
    const fs = require("fs");

    let mainWindow

    function createWindow () {
      mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
          contextIsolation: false, //https://stackoverflow.com/questions/61021885/electron-window-require-is-not-a-function-even-with-nodeintegration-set-to-true
          nodeIntegration: true
        }
      })

      mainWindow.loadURL(
        url.format({
          pathname: path.join(__dirname, `/dist/pass-ward/index.html`),
          protocol: "file:",
          slashes: true
        })
      );
      // Open the DevTools.
      mainWindow.webContents.openDevTools()

      mainWindow.on('closed', function () {
        mainWindow = null
      })
    }

    app.on('ready', createWindow)

    app.on('window-all-closed', function () {
      if (process.platform !== 'darwin') app.quit()
    })

    app.on('activate', function () {
      if (mainWindow === null) createWindow()
    })

    ipcMain.on( 'openFile', (title) => {
      fs.readFile('test-json.json', 'utf8', function (err, data){
        mainWindow.webContents.send("openFileResponse", data)
      })
    })

    ipcMain.on( 'savePassword', (event, obj) => {
      if(obj){
        fs.writeFile('test-json.json', JSON.stringify(obj), function(err){
          if (err) {
            console.error(err);
          }
        })
      }
    })
