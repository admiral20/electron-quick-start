## electron 介绍

# 由 github 开发  可以用 html css JavaScript 构建 桌面应用程序的 开源库

# chromium 和 node 合并到同一个运行时的环境， 最终可以把程序打包，可以再 mac 、 linux、windows 上运行。

# 2013 Atom   2014 开源 

# html css JavaScript 外部套用的一个壳子

-- 平时构建桌面应用程序：
windows:  c++  c#

mac：     swift  Object-c

linux：   c++

** 特点：
/*
* 1. 上手简单
* 2. 跨平台 一套代码多次打包、可复用
* 3. 更新方便
*/

**桌面应用常运的软件： vscode atom


## hello world


## electron 调试

# 渲染进程: 用户看到的 web 界面、 包含 html  css  js  （可以有多个）

-- debug  view - Toggle Develop Tools

# 主进程: package.json 中指定的 主脚本（main.js）  （只能有一个）

-- debug 需要指定 端口号 

启动时候可以定义 端口

--inspect=[port]

** chrome 中 debug

   -- chrome://inspect
      configure 添加指定的端口
      重启项目
      source 断点



# 主进程 和 渲染进程可以交互的


# remote
在渲染进程中使用主进程模块。

# api

## app 进程：主进程
--控制你的应用程序的事件生命周期。
--常用事件：
   ready：  electron 初始化完毕 会触发
   window-all-closed： 所有窗口被关闭 会触发  
   before-quit
   will-quit
   quit

##  webContents
渲染以及控制 web 页面
进程：主进程

did-finish-load 导航完成时候触发，选项卡的选装其停止旋转并指派 onload 事件
dom-ready 一个框架中的文本加载完成后触发该事件


合理的使用生命周期， 初始化的时候 读取数据，关闭窗口时候 保存数据


## process 
平时的网页开发过程中，不用关心 进程， 因为是 浏览器控制， js 是一个单线程语言，所以不需要关心

nodejs 需要关心 进程和线程  进程里有 系统及的 属性 方法  process // api

process 获取用户信息， 不同内存 不同系统， 用来分析问题， 解决问题的;

main.js  中需要添加 nodeIntegration: true,  才可以获取 process 之内的属性;


## File
客户端程序 对 需要与文件系统打交道; 利用 node 模块，实现 文件上传实时预览;
https://www.electronjs.org/docs/api/file-object

## Webview
比 iframe 强大;
-- nodeintegration:  Boolean  默认关闭;  webview 中的访客页（guest page）将具有Node集成, 并且可以使用像 require 和 process 这样的node APIs 去访问低层系统资源。

-- preload: 加载外部文件，可改变 dom、 新增事件;


-- insertCSS: 注入 css 文件

## windowopen
-- 新窗口打开 本地页面  外部链接
-- 窗口之间通信， 通信监听

## BrowserWindow  主进程
-- new BrowserWindow 返回的实例对象 控制当前窗口 close();

## Dialog
-- 主进程 const { dialog } = require('electron');
-- 渲染进程 const { dialog } = require('electron').remote;


## 系统快捷键
-- 主进程 const { globalShortcut } = require('electron');
-- 渲染进程 const { globalShortcut } = require('electron').remote;

globalShortcut.register(accelerator, callback)
globalShortcut.registerAll(accelerators, callback)

globalShortcut.unregister(accelerator);
globalShortcut.unregisterAll()

globalShortcut.isRegistered(accelerator)


## ipcMain
1、从主进程到渲染进程的异步通信。 (被动接收)

ipcMain.on('send-message-main', (event, arg) => {
  console.log(arg) // prints "ping"
  event.reply('send-message-renderer', 'pong')
})

2、 主动发动
new BrowserWindow.webContents.send('send-message-renderer', "主动给渲染进程发送消息")

## ipcRenderer 
1、从渲染进程到主进程的异步通信。
ipcRenderer.send('send-message-main', 'ping')

ipcMain.on('send-message-renderer', (event, arg) => {
  console.log(arg) // prints "pong"
})

## Menu MenuItem
顶部菜单配置, 页面菜单配置, 渲染进程菜单
let menu = Menu.buildFromTemplate(template) // template 数组, 返回菜单的实例;

// 弹出菜单
menu.popup(); 

// 将菜单实例添加到当前应用上
Menu.setApplicationMenu(menu)

## 高级框架集成
vue 脚手架 
vue init simulatedgreg/elevtron-vue electron-vue-start

命令行窗口设置代理 set http_proxy=http://127.0.0.1:1080


## 打包
** electron-packager
** electron-build

