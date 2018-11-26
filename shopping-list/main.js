const electron = require("electron");
const url = require("url");
const path = require("path");

const { app, BrowserWindow, Menu, ipcMain } = electron;

let mainWindow;
let addWindow;

// Listen for the app to be ready
app.on("ready", () => {
  // Create new Window
  mainWindow = new BrowserWindow({});

  // Load HTML into Window
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "views/mainWindow.html"),
      protocol: "file:",
      slashes: true
    })
  );

  // Quit App when Closed
  mainWindow.on("closed", () => {
    app.quit();
  });

  // Build Menu from Template
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

  // Insert Menu
  Menu.setApplicationMenu(mainMenu);
});

// Handle createAddWindow()
function createAddWindow() {
  // Create new Window
  addWindow = new BrowserWindow({
    width: 300,
    height: 200,
    title: "Add Shopping List Item"
  });

  // Load HTML into Window
  addWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "views/addWindow.html"),
      protocol: "file:",
      slashes: true
    })
  );

  // Garbage Collection Handle
  addWindow.on("closed", () => {
    addWindow = null;
  });
}

// Catch Item Add
ipcMain.on("item:add", (e, item) => {
  mainWindow.webContents.send("item:add", item);
  addWindow.close();
});

// Create Menu Template
const mainMenuTemplate = [
  {
    label: "File",
    submenu: [
      {
        label: "Add Item",
        accelerator: process.platform == "darwin" ? "Command+N" : "Ctrl+N",
        click() {
          createAddWindow();
        }
      },
      {
        label: "Clear Item",
        click() {
          mainWindow.webContents.send("item:clear");
        }
      },
      {
        label: "Quit",
        accelerator: process.platform == "darwin" ? "Command+Q" : "Ctrl+Q",
        click() {
          app.quit();
        }
      }
    ]
  }
];

// If Mac, add empty object to Menu
if (process.platform == "darwin") {
  mainMenuTemplate.unshift({});
}

// Uncomment this line when Packing
// process.env.NODE_ENV = "production";

// Add Developer Tools item if not in production
if (process.env.NODE_ENV !== "production") {
  mainMenuTemplate.push({
    label: "Developer Tools",
    submenu: [
      {
        label: "Toggle DevTools",
        accelerator:
          process.platform == "darwin" ? "Command+Shift+I" : "Ctrl+Shift+I",
        click(itmem, focusedWindow) {
          focusedWindow.toggleDevTools();
        }
      },
      {
        role: "reload"
      }
    ]
  });
}
