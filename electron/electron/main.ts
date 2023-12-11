/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use strict';

const { app, ipcMain, BrowserWindow } = require('electron');

import path from 'node:path'

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js
// 

process.env.DIST = path.join(__dirname, '../dist')
process.env.PUBLIC = app.isPackaged ? process.env.DIST : path.join(process.env.DIST, '../public')

const gotTheLock = app.requestSingleInstanceLock();


let win: typeof BrowserWindow | null

if (!gotTheLock) {
  app.quit();
} else {
  app.on('second-instance', () => {
    if (win) {
      if (win.isMinimized()) win.restore()
      win.focus()
    }
  })
  // Create myWindow, load the rest of the app, etc...
  // app.on('ready', () => {
  //   createWindow()
  // })
  app.whenReady().then(createWindow)
}

function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.PUBLIC, 'electron-vite.svg'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      webSecurity: false
    },
    width: 1366,
    height: 768,
    autoHideMenuBar: true,
    frame: true
  })

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })

  //win.webContents.openDevTools();

  win.maximize();

  // Emitted when the window is closed.
  win.on('closed', () => {
    win = null
  })

  // win.loadURL("http://localhost:4000")

  win.loadURL("http://localhost:5174")

}

app.on('window-all-closed', () => {
  app.quit()
})

// app.whenReady().then(createWindow)

const printOptions = {
  silent: true,
  printBackground: true,
  color: false,
  margin: {
    marginType: 0,
  },
  landscape: false,
  pagesPerSheet: 1,
  collate: true,
  copies: 2,
  header: 'Page header',
  footer: 'Page footer',
};

//handle print
ipcMain.handle('printToElectron', (_event: any, url: any, copy: number) => {

  function print() {
    const win = new BrowserWindow({ show: false });
    win.loadURL(url);
    win.webContents.on('did-finish-load', () => {
      win.webContents.print(printOptions, (success: any, failureReason: any) => {
        console.log('Print Initiated in Main...');
        if (!success) console.log(failureReason);
        win.close();
      });
    });
    return 'shown print dialog';
  }

  if(copy < 2){
    print();
  }else{
    print();print();
  }
});


