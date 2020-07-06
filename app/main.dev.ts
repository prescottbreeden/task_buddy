/* eslint global-require: off, no-console: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `yarn build` or `yarn build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import { app, BrowserWindow, globalShortcut, shell, ipcMain, IpcMainEvent } from 'electron';
import { autoUpdater } from 'electron-updater';
import csv from 'csv-parser';
import fs from 'fs';
import log from 'electron-log';
import MenuBuilder from './menu';
// import DataStorage from './DataStorage';

export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}
// ===========================================================================
//                            Windows
// ===========================================================================

let mainWindow: BrowserWindow | null = null;

// ===========================================================================
//                            Settings
// ===========================================================================
if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (
  process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_PROD === 'true'
) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

  return Promise.all(
    extensions.map((name) => installer.default(installer[name], forceDownload))
  ).catch(console.log);
};

const setAppIcon = () => {
  return process.platform === 'darwin' ?
    path.join(__dirname, '../resources/icon.icns') : 
    path.join(__dirname, '../resources/icon.png');
}


// ===========================================================================
//                              Main Window
// ===========================================================================
const createWindow = async () => {
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    await installExtensions();
  }


  mainWindow = new BrowserWindow({
    icon: setAppIcon(),
    title: 'My Task Buddy',
    show: false,
    maximizable: true,
    webPreferences:
      (process.env.NODE_ENV === 'development' ||
        process.env.E2E_BUILD === 'true') &&
      process.env.ERB_SECURE !== 'true'
        ? {
            nodeIntegration: true,
            backgroundThrottling: false,
            // devTools: false,
          }
        : {
            preload: path.join(__dirname, 'dist/renderer.prod.js'),
            backgroundThrottling: false,
            devTools: false,
          },
  });

  mainWindow.loadURL(`file://${__dirname}/app.html`).catch(console.log);

  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
      mainWindow.focus();
      mainWindow.maximize();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  mainWindow.webContents.on('will-navigate', (e: any, url: string) => {
    if (url != mainWindow?.webContents.getURL()) {
      e.preventDefault();
      shell.openExternal(url);
    }
  });

  mainWindow.on('focus', () => {
    globalShortcut.register('CommandOrControl+F', function () {
      if (mainWindow && mainWindow.webContents) {
        mainWindow.webContents.send('on-find', '')
      }
    })
  })
  mainWindow.on('blur', () => {
    globalShortcut.unregister('CommandOrControl+F')
  })

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  // new AppUpdater();
};

// ===========================================================================
//                                App Listeners
// ===========================================================================
app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
  globalShortcut.unregister('CommandOrControl+F')
});

app.on('ready', createWindow);

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow();
});

ipcMain.on('file:upload', (event: IpcMainEvent, file: string) => {
  event.preventDefault();
  const results: any[] = [];
  fs.createReadStream(file)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      mainWindow?.webContents.send('file:parsed', results);
    });
});

