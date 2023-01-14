//import { Password } from "./create-credential-view/Password"
//import { ipcRenderer, contextBridge } from "electron"
const { contextBridge, ipcRenderer } = window.require('electron')


contextBridge.exposeInMainWorld('electronAPI', {
  savePassword: (data: string) => ipcRenderer.invoke('storage:savePassword', data)
})
