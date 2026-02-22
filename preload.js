const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  saveItem: (item) => ipcRenderer.invoke('save-item', item),
  getItems: () => ipcRenderer.invoke('get-items'),
  updateItem: (item) => ipcRenderer.invoke('update-item', item),
  deleteItem: (id) => ipcRenderer.invoke('delete-item', id),
  minimizeWindow: () => ipcRenderer.invoke('minimize-window'),
  maximizeWindow: () => ipcRenderer.invoke('maximize-window'),
  closeWindow: () => ipcRenderer.invoke('close-window')
});
