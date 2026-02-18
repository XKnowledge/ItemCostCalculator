# ItemCostCalculator

一个基于 Electron 的桌面应用程序，用于计算物品的使用成本。

## 功能特性

- **两种计算模式**
  - **按时间计算**: 根据购买日期和当前/停止使用日期计算日均成本
  - **按次数计算**: 根据使用次数计算单次成本

- **物品管理**
  - 添加新物品（名称、购买日期、购买金额）
  - 编辑使用次数或停止使用时间
  - 删除物品

- **数据持久化**: 数据自动保存到本地 JSON 文件

- **用户界面**
  - 现代化响应式设计（Tailwind CSS）
  - Toast 消息通知
  - 模态框编辑

## 技术栈

- **Electron** - 跨平台桌面应用框架
- **Tailwind CSS** - CSS 框架
- **Font Awesome** - 图标库

## 项目结构

```
ItemCostCalculator/
├── main.js        # Electron 主进程
├── preload.js     # 预加载脚本（IPC 通信）
├── index.html     # 渲染进程（UI 界面）
├── package.json   # 项目配置
├── data.json      # 数据存储文件（运行时生成）
└── README.md      # 项目说明
```

## 安装与运行

### 前置要求

- Node.js (建议 v18+)
- npm 或 yarn

### 安装依赖

```bash
npm install
```

### 开发模式运行

```bash
npm start
```

### 构建应用

```bash
# Windows
npm run build:win

# macOS
npm run build:mac

# Linux
npm run build:linux
```

构建产物将输出到 `release` 目录。

## 使用说明

1. **添加物品**: 在左侧表单填写物品名称、购买日期、购买金额，选择计算类型
2. **按时间计算**: 系统会自动计算从购买日期到当前日期（或设定的停止日期）的日均成本
3. **按次数计算**: 输入使用次数，系统计算单次成本
4. **修改数据**: 点击物品列表中的编辑按钮可修改使用次数或停止时间
5. **删除物品**: 点击删除按钮移除物品

## IPC 通信 API

渲染进程可通过 `window.electronAPI` 调用以下方法：

| 方法 | 参数 | 说明 |
|------|------|------|
| `saveItem(item)` | item 对象 | 保存新物品 |
| `getItems()` | - | 获取所有物品 |
| `updateItem(item)` | item 对象 | 更新物品 |
| `deleteItem(id)` | 物品 ID | 删除物品 |

## 许可证

MIT
