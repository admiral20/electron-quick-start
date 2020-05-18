// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron')
const path = require('path')



function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    // frame: false, // 控制边框
    backgroundColor: '#C7EDCC',
    webPreferences: { // 网页功能的设置
      nodeIntegration: true, // 需要 事先设置为 true ，才可以获取 process 和  使用 require;
      preload: path.join(__dirname, 'preload.js'),
      webviewTag: true,
    }
  })
  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // process.xxx = mainWindow.webContents.browserWindowOptions;
  // Open the DevTools.
  mainWindow.webContents.openDevTools()
  
  mainWindow.webContents.on('did-finish-load', function() {
      console.log('did-finish-load')
  }) 
  
  mainWindow.webContents.on('dom-ready', function() {
      console.log('dom-ready')
  })

  // 事件: 'move'
  // 窗口移动到新位置时触发
  mainWindow.on('move', (e) => {
    console.log('move', e);
  })
  
  // 注意: 在 macOS 上，此事件是moved的别名.

  //   事件: 'moved' macOS
  // 当窗口移动到新位置时触发一次
  mainWindow.on('moved', (e) => {
    console.log('moved', e);
  })
  
  // 事件: 'enter-full-screen'
  mainWindow.on('enter-full-screen', (e) => {
    console.log('enter-full-screen', e);
  })



  
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()
  
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  console.log('window-all-closed', 'a');
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('quit', function () {
  console.log('quit', 'b')
})
  
app.on('before-quit', function () {
  console.log('before-quit', 'c')
})

app.on('will-quit', function () {
  console.log('will-quit', 'd')
})

// 执行顺序 a c d b
app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
