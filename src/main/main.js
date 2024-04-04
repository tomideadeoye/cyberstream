import { app, BrowserWindow } from "electron";

const createWindow = () => {
  let mainWindow = new BrowserWindow({});

  mainWindow.loadURL("https://cyberstream.vercel.app/");
  mainWindow.on("closed", () => (mainWindow = null));

  if (!app.isPackaged) {
    mainWindow.webContents.openDevTools();
  }

  win.on("close", () => app.quit());
};
app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
