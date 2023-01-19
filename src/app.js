const {app, BrowserWindow, ipcMain} = require('electron')
const { encrypt, decrypt } = require('../passwardcrypto');
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
      nodeIntegration: true,
      preload: path.join(__dirname, './preload.js'),
    }
  })

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, `../dist/pass-ward/index.html`),
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
  ipcMain.handle('storage:fetchAll', handleFetchAll);
  ipcMain.handle('storage:fetchPasswordById', handlePasswordById);
  ipcMain.handle('storage:saveCredential', handleSaveCredential);
  ipcMain.handle('storage:editCredential', handleEditCredential);
  createWindow()
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  if (mainWindow === null) createWindow()
})

async function handleSaveCredential(event, obj) {
  if(obj){
    obj.password = encrypt(obj.password)
    var credentials = await readFile('storage.json')
    var jsArr = JSON.parse(credentials)
    jsArr.push(obj)

    const p =  writeFile('storage.json', JSON.stringify(jsArr, null, 4), function (err) {
      if(err) console.err(err)
    })

  }
}

async function handleFetchAll(){
  const creds =  await readFile('storage.json')
  const jsArr = JSON.parse(creds)
  return jsArr;
}

async function handlePasswordById(event, id) {
  var creds = await readFile('storage.json')
  var jsArr = JSON.parse(creds);
  const result = jsArr.filter(obj => obj.id == id)
  if(result.length == 1) {
    return decrypt(result[0].password)
  }else {
    console.log("Not such Credential")
  }
}

async function handleEditCredential(event, updatedData) {
  var creds = await readFile('storage.json')
  var jsArr = JSON.parse(creds);
  for(var i = 0; i < jsArr.length; i++){
    if(jsArr[i].id === updatedData.id){
      updatedData.password = encrypt(updatedData.password)
      jsArr[i] = updatedData
      console.log("found to edit: " + updatedData.id)
      break
    }
  }
  const p = writeFile('storage.json', JSON.stringify(jsArr, null, 4), function (err){
    if(err) throw err
  })
}


