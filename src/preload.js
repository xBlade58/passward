const { contextBridge, ipcRenderer } = window.require('electron')
//import { contextBridge, ipcRenderer } from 'electron';


contextBridge.exposeInMainWorld('electronAPI', {
  saveCredential: () => ipcRenderer.invoke('storage:saveCredential')
})
