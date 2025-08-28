const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  getAppDataPath: () => ipcRenderer.invoke('get-app-data-path'),
  getProjects: () => ipcRenderer.invoke('get-projects'),
});