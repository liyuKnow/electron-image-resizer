console.log("Preload baby!");

const { contextBridge } = require('electron');

const os = require('os');
const path = require('path');

contextBridge.exposeInMainWorld('os', {
  homedir: () => os.homedir(),
});

contextBridge.exposeInMainWorld('path', {
  join: (...args) => path.join(...args)
});







// contextBridge.exposeInMainWorld('versions', {
//   node: () => process.versions.node,
//   chrome: () => process.versions.chrome,
//   electron: () => process.versions.electron,
//   platform: () => process.platform,
// });


// contextBridge.exposeInMainWorld('os', {
//   homedir: () => process.versions.node,
// });