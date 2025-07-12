const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  // File operations
  selectFiles: () => ipcRenderer.invoke('select-files'),
  showSaveDialog: (options) => ipcRenderer.invoke('show-save-dialog', options),
  showMessageBox: (options) => ipcRenderer.invoke('show-message-box', options),
  
  // App info
  getAppVersion: () => ipcRenderer.invoke('get-app-version'),
  
  // Event listeners
  onFilesSelected: (callback) => ipcRenderer.on('files-selected', callback),
  onNewUpload: (callback) => ipcRenderer.on('new-upload', callback),
  
  // Remove listeners
  removeAllListeners: (channel) => ipcRenderer.removeAllListeners(channel),
  
  // Platform info
  platform: process.platform,
  
  // Path utilities
  path: {
    join: (...args) => require('path').join(...args),
    basename: (path) => require('path').basename(path),
    extname: (path) => require('path').extname(path),
    dirname: (path) => require('path').dirname(path)
  }
});

// Expose a limited set of Node.js APIs
contextBridge.exposeInMainWorld('nodeAPI', {
  // File system operations (limited)
  readFile: (filePath) => {
    const fs = require('fs');
    return fs.promises.readFile(filePath);
  },
  
  // Get file stats
  getFileStats: (filePath) => {
    const fs = require('fs');
    return fs.promises.stat(filePath);
  }
});