const { contextBridge, ipcRenderer } = require("electron");

// contextBridge.exposeInMainWorld("versions", {
//   ping: () => ipcRenderer.invoke("ping"),
// we can also expose variables, not just functions
// });

const os = require("os");
const path = require("path");
contextBridge.exposeInMainWorld("os", {
  homedir: () => os.homedir(),
});

contextBridge.exposeInMainWorld("path", {
  join: (...args) => path.join(...args),
});

console.log("Preload baby!");

// contextBridge.exposeInMainWorld('versions', {
//   node: () => process.versions.node,
//   chrome: () => process.versions.chrome,
//   electron: () => process.versions.electron,
//   platform: () => process.platform,
// });

// contextBridge.exposeInMainWorld('os', {
//   homedir: () => process.versions.node,
// });
