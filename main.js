// Modules to control application life and create native browser window
const { app, BrowserWindow, globalShortcut, ipcMain, Menu } = require('electron')
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
  });

  // 主进程主动访问渲染进程
  setTimeout(() => {
    mainWindow.webContents.send('send-message-to-renderer', "wossssssssssssssssssssssssssss!!!!!")
  }, 5000);

  // const template = [
  //   { label: '自定义第一个按钮' },
  //   { label: '自定义第二个按钮' },
  //   { role: 'undo' },
  //   { type: 'separator' },
  //   { label: '自定义第3个按钮' },
  //   { label: '自定义第4个按钮' },
  // ];
  // setTimeout(() => {
  //   // menu 菜单对象
  //   let menu = Menu.buildFromTemplate(template)
  //   // 将菜单添加到 application 头部
  //   // Menu.setApplicationMenu(menu);
  //   // 跟随鼠标弹出菜单
  //   menu.popup();
  // }, 0)
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
   
  createWindow();
  
  // 注册快捷键
  globalShortcut.register('CommandOrControl+O', () => {
    console.log('CommandOrControl+O is pressed');
  })
  
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  console.log('window-all-closed', 'a');

  // 清理注册的所有的快捷键；
  globalShortcut.unregisterAll();
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


// ipcMain 主进程到渲染进程的异步通信
ipcMain.on('send-message-to-main', (event, arg) => {
  console.log('主进程收到的数据是:',arg) // prints "ping"
  event.reply('send-message-to-renderer', '这是来自于主进程的问候')
})


// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
