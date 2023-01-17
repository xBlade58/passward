const {app, BrowserWindow, ipcMain} = require('electron')
const url = require("url");
const path = require("path");
const fs = require("fs");
const util = require("util");
const readFile  = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)

let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      contextIsolation: false, //https://stackoverflow.com/questions/61021885/electron-window-require-is-not-a-function-even-with-nodeintegration-set-to-true
      nodeIntegration: true,
      //preload: path.join(__dirname, './src/app/preload.js')

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

app.on('ready', () => {
  //ipcMain.handle('storage:savePassword', handleSavePassword)
  createWindow()
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  if (mainWindow === null) createWindow()
})

//TODO: refactor to use invoke()
ipcMain.on( 'storage:savePassword', (event, obj) => {
  if(obj){
    var passwords = fs.readFileSync('storage.json')
    var jsArr = JSON.parse(passwords)
    jsArr.push(obj)

    fs.writeFileSync('storage.json', JSON.stringify(jsArr, null, 4), function(err){
      if (err) {
        console.error(err);
        return "failed"
      }
    })
    event.reply('storage:passwordSaved')
  }
})

ipcMain.on( 'storage:fetchAll', (event) => {
  var creds = fs.readFileSync('storage.json')
  var jsArr = JSON.parse(creds);
  event.returnValue = jsArr;
})

ipcMain.handle('storage:fetchById', async (event, id) => {
  var creds = await readFile('storage.json')
  var jsArr = JSON.parse(creds);
  const result = jsArr.filter(obj => obj.id == id)
  if(result.length == 1) {
    return result[0].password;
  }else {
    console.log("Not such Credential")
  }
})

ipcMain.handle('storage:editById', async (event, updatedData) => {
  var creds = await readFile('storage.json')
  var jsArr = JSON.parse(creds);

  for(var i = 0; i < jsArr.length; i){
    if(jsArr[i].id === updatedData.id){
      jsArr[i] = updatedData
      break
    }
  }
  console.log("Updated array")
  console.log(jsArr)

  const n = await writeFile('storage.json', JSON.stringify(jsArr, null, 4), function (err){
    if(err) throw err
  })
})


