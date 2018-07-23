const {app, BrowserWindow, ipcMain} = require('electron');
const {autoUpdater} = require("electron-updater");
let win; // this will store the window object

//For Titlebar
const ElectronTitlebarWindows = require('electron-titlebar-windows');
	
function sendStatusToWindow(text) {
  win.webContents.send('message', text);
}

// creates the default window
function createDefaultWindow() {
    win = new BrowserWindow({
	width: 900,
	height: 680,
    minWidth: 800,
    minHeight: 600,
	frame: true,
    backgroundColor: '#fafafa',
    //show: false,
    icon: __dirname + '/assets/img/icon.ico'
	});

    win.loadURL(`file://${__dirname}/index.html`);
    win.on('closed', () => app.quit());
	
	ipcMain.on('electron-msg', (event, arg) => {
    console.log('main-> ' + arg);
    win.webContents.send('electron-msg', arg);
	});
  
  return win;
}

// when the app is loaded create a BrowserWindow and check for updates
app.on('ready', function() {
  createDefaultWindow()
  autoUpdater.checkForUpdates();
  
  //electangular ipc
  ipcMain.on('electron-msg', (event, msg) => {
    //handle incoming message here
    console.log(msg);

    //message can be an Object
    /* if (msg.username == 'dude') {
      console.log(msg.access_level);
    } */
  });
  
});

// when the update has been downloaded and is ready to be installed, notify the BrowserWindow
autoUpdater.on('update-downloaded', (info) => {
    win.webContents.send('updateReady')
});

// when the update is available and is ready to be downloaded, notify the BrowserWindow
autoUpdater.on('update-available', (info) => {
    win.webContents.send('updateAvailable')
});

// when update downloading, show process
autoUpdater.on('download-progress', (progressObj) => {
  let log_message = "Download speed: " + progressObj.bytesPerSecond;
  log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
  log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
  sendStatusToWindow(log_message);
})

// when the update is not available and nothing to be downloaded, notify the BrowserWindow
autoUpdater.on('update-not-available', (info) => {
    win.webContents.send('updateNotAvailable')
});

// when receiving a quitAndInstall signal, quit and install the new version ;)
ipcMain.on("quitAndInstall", (event, arg) => {
    autoUpdater.quitAndInstall();
})