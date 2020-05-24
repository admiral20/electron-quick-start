const fs = require('fs');
const { ipcRenderer, shell } = require('electron');
const { remote } = require('electron');
const { dialog, globalShortcut, Menu, MenuItem, getCurrentWindow, BrowserView } = require('electron').remote

function getDom (dom) {
    return document.getElementById(dom);
};

// mainprocess
function getProcessInfo () {
    console.log('mianProcess:', process);
};



// FileObject
const drop = document.getElementsByClassName('drapFile')[0];
const fileShow = document.getElementsByClassName('fileShow')[0];


drop.addEventListener('drop', e => {
    // 坑
    e.preventDefault();
    const file = e.dataTransfer.files;
    if (file && file.length) {
        const path = file[0].path;
        // 读文件操作：
        const content = fs.readFileSync(path).toString();
        console.log('content:', content);
        fileShow.innerHTML = content;
    }
});


// 坑
drop.addEventListener('dragover', e => {
    e.preventDefault();
})




// webview
const wb = getDom('wb');

wb.addEventListener('did-start-loading', () => {
    console.log('000 webwiev 开始加载');
});

wb.addEventListener('did-stop-loading', () => {
    console.log('111 webwiev 加载完毕');
    wb.insertCSS(`
        #su {
            background: red !important;
        }
    `)
});

wb.addEventListener('dom-ready', () => {
    console.log('dom-ready');
    // 开启 webview 调试工具
    // wb.openDevTools();
})

// windowopen
// 事件传递处理
function openNewWindow () {
    newWindow = window.open('./windowopen/index.html', 'test');
    newWindow.postMessage('这是来自父窗口的问候', '*'),
        console.log(newWindow, 'newWindow');
};

// 第三方库测试
function openNewWindowOfOther () {
    newWindow = window.open('./webBroserView/index.html', 'test');
};

// 浏览器里打开新窗口
function openNewWindowInBrowser () {
    shell.openExternal('https:baidu.com/');
};

// close新窗口
function closeNewWindow() {
    newWindow.close();
};

function sendMessage () {
    newWindow.postMessage('这是来自父窗口的问候', '*'),
    console.log(newWindow, 'toChild');
};

let newWindow = undefined;


// 用于接受 子窗口传递回来的消息；
window.addEventListener('message', (e) => {
    console.log(e, 'e');
})


// 打开文件
function opendialog () {
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
};

// 保存文件
function savedialog () {
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
};

// Message
function showMessageDialog () {
    dialog.showMessageBox({
        // type String(可选) - 可以为 "none", "info", "error", "question" 或者 "warning".在 Windows 上, "question" 与"info"显示相同的图标, 除非你使用了 "icon" 选项设置图标。 在 macOS 上, "warning" 和 "error" 显示相同的警告图标
        type: 'warning',
        title: '自定义title',
        message: '确定要删除当前数据么？',
        buttons: ['ok', 'cancel'],
    }).then(res => {
        console.log(res);
    })
};

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


// 菜单 Menu  MenuItem
const template = [
    {
        label: '刷新',
        role: 'reload',
    },
    {
        label: '111111111',
        click: () => {
            console.log(1111111);
        },
        submenu: [
            {
                label: '1-1',
                type: 'checkbox',
                checked: true,
                click: () => {
                    console.log('1 - 1');
                }
            },
            {
                label: '1-2',
                type: 'radio',
                checked: false,
                click: function () {
                    console.log('1 - 2');
                }
            }
        ]
    },
    new MenuItem({
        label: '222222',
        type: 'normal',
        click: () => {
            console.log(2222);
        }
    }),
];

function openMenu () {
    let menu = Menu.buildFromTemplate(template);
    console.log(887, template, menu);
    menu.popup();
};

// 全局添加右键事件
window.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    let menu = Menu.buildFromTemplate(template);
    menu.popup({ window: getCurrentWindow() })
}, false)