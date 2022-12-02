const path = require("path");
const { app, BrowserWindow, Menu } = require("electron");

// const isDev = process.env.NODE_ENV !== 'production';
const isDev = false;
// const isDev = false;

const isMac = process.platform === "darwin";

// ^ CREATE MAIN WINDOW
function CreateMainWindow() {
  const mainWindow = new BrowserWindow({
    title: "Image Resize",
    minWidth: isDev ? 1000 : 500,
    minHeight: 600,
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

// ^ CREATE ABOUT WINDOW
function CreateAboutWindow() {
  const aboutWindow = new BrowserWindow({
    title: "About Image Resize",
    width: 300,
    height: 300,
    resizable: false,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, "./preload/about_preload.js"),
    },
  });

  aboutWindow.loadFile(path.join(__dirname, "./renderer/screens/about.html"));
}

app.whenReady().then(() => {
  CreateMainWindow();
  // Implement custom menu
  const mainMenu = Menu.buildFromTemplate(customMenuTemplate);
  Menu.setApplicationMenu(mainMenu);

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



// & TEMPO MENU TEMPLATE
const customMenuTemplate = [
  ...isMac ? [{
    label: app.name,
    submenu: [
      {
        label: "About",
        click: CreateAboutWindow
      }
    ]
  }] : [

  ],
  {
    label: "File",
    submenu: [
      {
        label: "Quit",
        click: () => {
          app.quit()
        },
        accelerator: "CmdorCtrl+W"
      }
    ]
  },
  // ROLES
  {
    role: 'editMenu'
  },
  ...!isMac ? [{
    label: 'Help',
    submenu: [{
      label: "About",
      click: CreateAboutWindow
    }]
  }] : []
]