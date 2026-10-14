# App Inventor 迁移清单

## 当前进度（2026-10-14）

- [x] 第一步：最新版网页内容、界面、兼容脚本和兼容样式已同步至 AIA Assets
- [x] 重新生成 `ChangZhengArchive.aia` 并通过 ZIP 结构与完整性检查
- [ ] 在 AppInventorDesktop2019 中实际导入并用模拟器逐页检查
- [ ] 第二步：TinyDB 因2019版原生积木兼容问题暂缓，主版本先不使用 TinyDB
- [x] 完成站点后自动归档该站两条精神线索
- [x] 第三步：六站档案、四个阅读面板和顺序导航已同步至 AIA
- [x] 六个站点封面序号按当前站点动态显示
- [x] 第四步：六种站点任务已完成2019模拟器触控与输入兼容加固
- [x] 任务操作说明、星级规则、空值检查和成功/失败反馈已统一
- [x] 第五步：知识挑战、错题复习、精神收藏、精神行囊和最终奖章已完成联动
- [x] 星火全章需同时满足六站完成、六站辨析、四枚核心章、挑战80分和三条精神行囊

## 页面对应

- Screen1：首页、底部导航、首次引导
- RouteScreen：长征全景、六站路线和锁定状态
- StationScreen：四个阅读面板和动态站点内容
- QuizScreen：随机10题、错题集合、最高分
- ArchiveScreen：任务星级、徽章、挑战奖章、收藏、精神行囊
- SettingsScreen：声音、说明和清除记录

## 数据结构

- 用列表保存六站内容和30道题
- 第二步已用 TinyDB 保存 unlocked、completed、currentStation 和 favorites；题库、行囊等数据留待后续步骤迁移
- 用 Clock 实现泸定桥倒计时和盖章动画时序
- 用 Notifier 实现提示、确认清除和错误反馈

## 迁移顺序

1. 先搭建六个页面和统一颜色、字号。
2. 完成 TinyDB 进度与导航。
3. 迁移六站内容和四个阅读面板。
4. 逐个重做六种任务，不同时迁移。
5. 迁移题库、收藏、行囊和纪念卡。
6. 在 AI2 Companion 模拟器调试。
7. 导出 APK 实机测试，再保存最终 AIA。

## 注意

Web Service Worker、CSS动画和 localStorage 不能直接变成 App Inventor 组件，必须用 Blocks、TinyDB、Clock 和 Arrangement 重新实现。不要把网页简单套入 WebViewer 后冒充原生 AIA 作品。
