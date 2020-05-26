const fs = require('fs');
const { ipcRenderer, shell } = require('electron');
const { dialog, globalShortcut, Menu, MenuItem, getCurrentWindow, BrowserView, screen } = require('electron').remote;

// 当前页面注册热键
(()=> {
    globalShortcut.register('ctrl + q', () => {
        console.log('ctrl + q 注册热键');
    });
})()

// RendererProcessInfo
function getRendererProcessInfo () {    
    console.log(require('electron'));
    console.log('RendererProcessInfo:', process, 'processNums:', Object.entries(process).length);
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
        fileShow.innerHTML = content;
    }
});

// 坑
drop.addEventListener('dragover', e => {
    e.preventDefault();
})

// webview
const wb = document.getElementById('wb');

wb.addEventListener('did-start-loading', () => {
    console.log('webwiev 开始加载');
});

wb.addEventListener('did-stop-loading', () => {
    console.log('webwiev 加载完毕');
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

let windowArr = [];


// 菜单测试
function menuTest () {
    let newWindow = window.open('./menu/index.html');
    windowArr.push(newWindow);
};

// 第三方库测试
function openNewWindowOfOther () {
    let newOtherWindow = window.open('./command/index.html');
    windowArr.push(newOtherWindow);
};

// 浏览器里打开新窗口
function openNewWindowInBrowser () {
    shell.openExternal('https:baidu.com/');
};

// close 所有新窗口
function closeNewWindow() {
    windowArr.length && windowArr.forEach((item => {
        item.close();
    }));
    windowArr = [];
};

// 发送消息给子窗口
function sendMessage () {
    windowArr.length && windowArr.forEach((item => {
        item.postMessage({
            message: '这是来自父窗口的问候'
        })
    }))
};


// 用于接受 窗口传递回来的消息；
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
        ],
    }).then(res => {
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

// 渲染进程接收消息；
ipcRenderer.on('send-message-to-renderer', (event, arg) => {
    console.log(event, arg, 'event, arg');
})

// // 渲染进程发送消息给主进程；
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
    let templateArr = template.slice(0, template.length - 2);
    templateArr.push({ label: 'haha' }, { label: 'hehe' });
    let menu = Menu.buildFromTemplate(templateArr);
    menu.popup();
};

// 本窗口打开cctv
function openCCTV () {
    const { loadURL } =  getCurrentWindow();
    loadURL('http://www.cctv.com')
};

// 新窗口打开cctv
function openNewCCTV () {
    window.open('http://www.cctv.com')
};

// 全局添加右键事件
window.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    let menu = Menu.buildFromTemplate(template);
    menu.popup({ window: getCurrentWindow() })
}, false)