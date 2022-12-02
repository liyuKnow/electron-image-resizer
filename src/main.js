const path = require("path");
const { app, BrowserWindow } = require("electron");

// const isDev = process.env.NODE_ENV !== "development";
const isDev = false;

console.log(isDev);
const isMac = process.platform === "darwin";

function CreateMainWindow() {
  const mainWindow = new BrowserWindow({
    title: "Image Resize",
    width: 500,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "./preload/preload.js"),
    },
  });

  // * isDev
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }
  mainWindow.loadFile(path.join(__dirname, "./renderer/screens/index.html"));
}

app.whenReady().then(() => {
  CreateMainWindow();

  app.on("active", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      CreateMainWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (!isMac) {
    app.quit();
  }
});
