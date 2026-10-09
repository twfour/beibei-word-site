# App Inventor 迁移工程

## 当前结果

`ChangZhengArchive.aia` 是基于组委会2019模板（YaVersion 186）制作的第一版混合迁移工程：

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

## 必须验证

1. 在 AppInventorDesktop2019 中导入 `ChangZhengArchive.aia`。
2. 若提示 WebViewer 版本不兼容，记录完整提示。
3. 用 AI2 Companion 测试首页、路线、任务、题库、收藏和重启后的进度。
4. 导出 APK 并在安卓手机测试本地资源路径。

## 后续原生化

第一版优先确保完整功能迁移和离线运行。通过指定版本导入验证后，再逐步用 VerticalArrangement、Label、Button、TinyDB、Clock 等组件替换 WebViewer 内的关键页面与逻辑。
