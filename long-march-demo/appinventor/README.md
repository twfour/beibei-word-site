# App Inventor 迁移工程

## 当前结果

`ChangZhengArchive.aia` 是基于组委会2019模板（YaVersion 186）制作的混合迁移工程。2026-10-14 已完成第二步进度持久化：

- 原生 App Inventor `Screen1`
- 原生 `WebViewer` 组件
- HTML、CSS、JavaScript 和图标全部打包在 AIA 的 assets 中
- 当前调试包的 `HomeUrl` 使用旧版 AI 伴侣路径 `file:///sdcard/AppInventor/assets/index.html`，适配赛事提供的 2019 离线模拟器
- 正式编译 APK 前，需在设计界面把 WebViewer1 的首页网址改为 `file:///android_asset/index.html`
- 已增加原生 `TinyDB1`，用 `sparkJourneyJson` 保存已完成站点、解锁进度、当前站点和已获得的精神线索
- 网页与原生积木通过 `WebViewString` 双向同步；每次进度变化即写入 TinyDB，重启后由 TinyDB 恢复
- 完成站点时，该站的两条精神线索会自动归档，不再依赖额外点击收藏
- 保留网页本地存储作为运行期缓存，TinyDB 作为 App 重启后的持久存储
- 中文正文使用随包提供的 Noto Serif CJK SC 用字子集，使网页、模拟器和 APK 的字形尽量一致；字体采用 SIL Open Font License 1.1，许可证见 `assets/fonts/OFL.txt`
- 2019 模拟器使用经 Babel 转换的 `app.compat.js` 与 `polyfills.min.js`，兼容旧 WebView；现代浏览器继续运行原始 `app.js`
- AIA 内的运行资源另复制到 assets 顶层，避免旧版 Companion 无法同步子目录文件
- AIA 使用 `styles.compat.css`，其中红、绿、米白、金色和边框等 CSS 变量均已展开为实际色值，适配不支持 CSS 自定义属性的旧 WebView
- 已同步最新版首页、路线、六站档案、进阶任务、精神线索、精神辨析、精神行囊和最终奖章界面
- 已把 `route-markers.css`、`data-poster.css`、`reward-atlas.css`、`spirit-clues.css` 等新增样式合并进旧 WebView 兼容样式
- “清除记录”会同时清除网页进度和 TinyDB 中的 `sparkJourneyJson`

## 重新构建

先使用 Babel 将 `app.js` 转换为 ES5 兼容脚本，再执行：

```bash
python3 build_aia.py --compat-script /tmp/changzheng-app.compat.js
```

构建脚本会同步资源、生成内联兼容页面、重新打包 AIA，并检查必需文件和 ZIP 完整性。

## 必须验证

1. 在 AppInventorDesktop2019 中导入 `ChangZhengArchive.aia`。
2. 若提示 WebViewer 版本不兼容，记录完整提示。
3. 完成一站任务，确认该站两条精神线索自动归档，然后完全关闭并重启 App，确认站点、线索和当前位置保留。
4. 执行“清除记录”，再次重启 App，确认 TinyDB 中的进度也已清除。
5. 导出 APK 并在安卓手机测试本地资源路径。

当前 AIA SHA-256：`6f1224f2ebd2f9846b304f1434c99fabcf29eb5a71711b1333c49e4f48efb033`

## 后续原生化

第一版优先确保完整功能迁移和离线运行。通过指定版本导入验证后，再逐步用 VerticalArrangement、Label、Button、TinyDB、Clock 等组件替换 WebViewer 内的关键页面与逻辑。
