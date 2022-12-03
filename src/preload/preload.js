console.log("Preload baby!");


const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('versions-api', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  cwd: () => process.cwd(),
});