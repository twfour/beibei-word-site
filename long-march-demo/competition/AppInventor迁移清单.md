# App Inventor 迁移清单

## 页面对应

- Screen1：首页、底部导航、首次引导
- RouteScreen：长征全景、六站路线和锁定状态
- StationScreen：四个阅读面板和动态站点内容
- QuizScreen：随机10题、错题集合、最高分
- ArchiveScreen：徽章、收藏、精神行囊、行动计划
- SettingsScreen：声音、说明和清除记录

## 数据结构

- 用列表保存六站内容和30道题
- 用 TinyDB 保存 unlocked、completed、currentStation、favorites、wrongQuestions、spiritKit、reflection
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
