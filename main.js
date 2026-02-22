const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 700,
    frame: false,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  mainWindow.loadFile('index.html');
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// 获取应用数据路径
function getAppDataPath() {
  return __dirname;
}

// 保存数据到文件
function saveData(data) {
  const filePath = path.join('data.json');
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// 读取数据
function loadData() {
  const filePath = path.join('data.json');
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
  }
  return { items: [] };
}

// IPC 处理
ipcMain.handle('save-item', (event, item) => {
  const data = loadData();
  data.items.push(item);
  saveData(data);
  return true;
});

ipcMain.handle('get-items', () => {
  return loadData().items;
});

ipcMain.handle('update-item', (event, item) => {
  const data = loadData();
  const index = data.items.findIndex(i => i.id === item.id);
  if (index !== -1) {
    data.items[index] = item;
    saveData(data);
  }
  return true;
});

ipcMain.handle('delete-item', (event, id) => {
  const data = loadData();
  data.items = data.items.filter(item => item.id !== id);
  saveData(data);
  return true;
});

// 窗口控制
ipcMain.handle('minimize-window', () => {
  mainWindow.minimize();
});

ipcMain.handle('maximize-window', () => {
  if (mainWindow.isMaximized()) {
    mainWindow.unmaximize();
  } else {
    mainWindow.maximize();
  }
});

ipcMain.handle('close-window', () => {
  mainWindow.close();
});
