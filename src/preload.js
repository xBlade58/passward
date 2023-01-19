const { contextBridge, ipcRenderer } = window.require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  loadCredentials: () => ipcRenderer.invoke('storage:fetchAll'),
  loadPasswordById: (id) => ipcRenderer.invoke('storage:fetchPasswordById', id),
  saveCredential: (data) => ipcRenderer.invoke('storage:saveCredential', data),
  editCredential: (toUpdate) => ipcRenderer.invoke('storage:editCredential', toUpdate)
  
})
