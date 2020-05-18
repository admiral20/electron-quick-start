// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
const fs = require('fs');

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