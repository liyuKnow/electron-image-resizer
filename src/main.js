const path = require("path");
const { app, BrowserWindow } = require("electron");

function CreateMainWindow() {
  const mainWindow = new BrowserWindow({
    title: "Image Resizer",
    width: 500,
    height: 600,
  });
  mainWindow.loadFile(path.join(__dirname, "./renderer/screens/index.html"));
}

app.whenReady().then(() => {
  CreateMainWindow();
});
