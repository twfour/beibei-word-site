# App Inventor 迁移工程

## 当前结果

`ChangZhengArchive.aia` 是基于组委会2019模板（YaVersion 186）制作的混合迁移工程。2026-10-14 已完成第一步全量资源同步：

- 原生 App Inventor `Screen1`
- 原生 `WebViewer` 组件
- HTML、CSS、JavaScript 和图标全部打包在 AIA 的 assets 中
- 当前调试包的 `HomeUrl` 使用旧版 AI 伴侣路径 `file:///sdcard/AppInventor/assets/index.html`，适配赛事提供的 2019 离线模拟器
- 正式编译 APK 前，需在设计界面把 WebViewer1 的首页网址改为 `file:///android_asset/index.html`
- 学习进度仍由 WebView 的本地存储保存
- 中文正文使用随包提供的 Noto Serif CJK SC 用字子集，使网页、模拟器和 APK 的字形尽量一致；字体采用 SIL Open Font License 1.1，许可证见 `assets/fonts/OFL.txt`
- 2019 模拟器使用经 Babel 转换的 `app.compat.js` 与 `polyfills.min.js`，兼容旧 WebView；现代浏览器继续运行原始 `app.js`
- AIA 内的运行资源另复制到 assets 顶层，避免旧版 Companion 无法同步子目录文件
- AIA 使用 `styles.compat.css`，其中红、绿、米白、金色和边框等 CSS 变量均已展开为实际色值，适配不支持 CSS 自定义属性的旧 WebView
- 已同步最新版首页、路线、六站档案、进阶任务、精神线索、精神辨析、精神行囊和最终奖章界面
- 已把 `route-markers.css`、`data-poster.css`、`reward-atlas.css`、`spirit-clues.css` 等新增样式合并进旧 WebView 兼容样式
- 本步骤同步的是 AIA 内置网页资源；TinyDB 和原生积木逻辑将在后续步骤实现

## 重新构建

先使用 Babel 将 `app.js` 转换为 ES5 兼容脚本，再执行：

```bash
python3 build_aia.py --compat-script /tmp/changzheng-app.compat.js
```

构建脚本会同步资源、生成内联兼容页面、重新打包 AIA，并检查必需文件和 ZIP 完整性。

## 必须验证

1. 在 AppInventorDesktop2019 中导入 `ChangZhengArchive.aia`。
2. 若提示 WebViewer 版本不兼容，记录完整提示。
3. 用 AI2 Companion 测试首页、路线、任务、题库、收藏和重启后的进度。
4. 导出 APK 并在安卓手机测试本地资源路径。

当前 AIA SHA-256：`604a4f378e9c3b3aa258f527667f7e53cc2bc21df06a88e03639d486fcae7460`

## 后续原生化

第一版优先确保完整功能迁移和离线运行。通过指定版本导入验证后，再逐步用 VerticalArrangement、Label、Button、TinyDB、Clock 等组件替换 WebViewer 内的关键页面与逻辑。
