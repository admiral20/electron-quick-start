// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
const fs = require('fs');
const { dialog, globalShortcut } = require('electron').remote
const { ipcRenderer } = require('electron');

const buttonDom = document.getElementById('bt');
buttonDom.addEventListener("click", () => {
    console.log(88888888888, process.getCPUUsage());
    console.log(9999999, process.env);
});



// FileObject
// const drop = document.getElementsByClassName('drapFile')[0];
// const fileShow = document.getElementsByClassName('fileShow')[0];

// drop.addEventListener('drop', e => {
//     // 坑
//     e.preventDefault();
//     const file = e.dataTransfer.files;
//     if (file && file.length) {
//         const path = file[0].path;
//         // 读文件操作：
//         const content = fs.readFileSync(path).toString();
//         console.log('content:', content);
//         fileShow.innerHTML = content;
//     }
// });


// // 坑
// drop.addEventListener('dragover', e => {
//     e.preventDefault();
// })


// webview
// const wb = document.getElementById('wb');

// wb.addEventListener('did-start-loading', () => {
//     console.log('000 webwiev 开始加载');
// });

// wb.addEventListener('did-stop-loading', () => {
//     console.log('111 webwiev 加载完毕');
//     wb.insertCSS(`
//         #su {
//             background: red !important;
//         }
//     `)
// });

// wb.addEventListener('dom-ready', () => {
//     console.log('dom-ready');
//     wb.openDevTools();
// })

// windowopen
const openNewWindowBtn = document.getElementById('openNewWindow');
const closeNewWindowBtn = document.getElementById('closeNewWindow');
const sendMessageBtn = document.getElementById('sendMessage');
let newWindow = undefined;

openNewWindowBtn.addEventListener('click', () => {
    newWindow = window.open('./windowopen/index.html', 'test');
    newWindow.postMessage('这是来自父窗口的问候', '*'),
    console.log(newWindow, 'newWindow');
});

sendMessageBtn.addEventListener('click', () => {
    newWindow.postMessage('这是来自父窗口的问候', '*'),
    console.log(newWindow, 'toChild');
});

closeNewWindowBtn.addEventListener('click', () => {
    newWindow.close();
})

// 用于接受 子窗口传递回来的消息；
window.addEventListener('message', (e) => {
    console.log(e, 'e');
})


// 打开文件
const opendialogBtn = document.getElementById('opendialog');
opendialogBtn.addEventListener('click', ()=> {
    dialog.showOpenDialog({
        title: '自定义title',
        buttonLabel: '自定义确定按钮',
        filters: [
            { name: 'json || js', extensions: ['json', 'js'] },
            { name: 'All Files', extensions: ['*'] }
            // { name: 'Images', extensions: ['jpg', 'png', 'gif'] },
            // { name: 'Custom File Type', extensions: ['as'] },
            // { name: 'Movies', extensions: ['mkv', 'avi', 'mp4'] },
        ],
    }).then(res => {
        console.log(res);
    })
});


// 保存文件
const savedialogBtn = document.getElementById('savedialog');
savedialogBtn.addEventListener('click', ()=> {
    dialog.showSaveDialog({
        title: '自定义title',
        buttonLabel: '自定义保存按钮',
        filters: [
            // { name: 'json || js', extensions: ['json', 'js'] },
            { name: 'All Files', extensions: ['*'] }
            // { name: 'Images', extensions: ['jpg', 'png', 'gif'] },
            // { name: 'Custom File Type', extensions: ['as'] },
            // { name: 'Movies', extensions: ['mkv', 'avi', 'mp4'] },
        ],
    }).then(res => {
        // dialog.showMessageBox([browserWindow,]options)
        console.log(res);
        fs.writeFileSync(res.filePath, 'hello world !!!!!!!!');
    })
});


// Message
const showMessageDialogBtn = document.getElementById('showMessageDialog');
showMessageDialogBtn.addEventListener('click', ()=> {
    dialog.showMessageBox({
        // type String(可选) - 可以为 "none", "info", "error", "question" 或者 "warning".在 Windows 上, "question" 与"info"显示相同的图标, 除非你使用了 "icon" 选项设置图标。 在 macOS 上, "warning" 和 "error" 显示相同的警告图标
        type: 'warning',
        title: '自定义title',
        message: '确定要删除当前数据么？',
        buttons: ['ok', 'cancel'],
    }).then(res => {
        console.log(res);
    })
});

// 坑 用不了 20200518
// 注册热键；
globalShortcut.isRegistered('CommandOrControl+G', () => {
    console.log('CommandOrControl+G');
})


// 渲染进程接收消息；
ipcRenderer.on('send-message-to-renderer', (event, arg) => {
    console.log(event, arg, 'event, arg');
})

// 渲染进程发送消息给主进程；
ipcRenderer.send('send-message-to-main', '666666666666666')