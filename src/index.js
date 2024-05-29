const { app, BrowserWindow } = require('electron');
const path = require('node:path');
const os = require('os-utils');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 1600,
    height: 800,
    icon: __dirname + "/images.png",
    webPreferences:{
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true
    }
  });
  
  mainWindow.loadFile(path.join(__dirname,"index.html"));
  //mainWindow.webContents.openDevTools();

  setInterval(() => {
    os.cpuUsage(function(v) {
      //console.log("CPU Usage (%): " + (v * 100).toFixed(2));
      mainWindow.webContents.send("cpu", (v * 100).toFixed(2));
  
      //console.log("Mem Usage (%): " + (os.freememPercentage() * 100).toFixed(2));
      mainWindow.webContents.send("mem", (os.freememPercentage() * 100).toFixed(2));
  
      //console.log("Total Mem (GB): " + (os.totalmem() / 1024).toFixed(2));
      mainWindow.webContents.send("total-mem", (os.totalmem() / 1024).toFixed(2));
  
      //console.log("Platform: " + os.platform());
      mainWindow.webContents.send("platform", os.platform());
    }); 
  }, 1000);   
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
