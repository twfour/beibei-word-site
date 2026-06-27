# 贝贝外刊每日精读

把 `/Users/apple/Downloads/贝贝外刊` 中持续更新的 PDF 讲义增量整理为按日期组织的中英对照学习网站。

网站包含时间轴首页和每日详情页。详情页仅展示英文原文、对应中文译文、重点词汇与长难句分析；支持段落放大、词卡放大、搜索和“我的收藏”。

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/twfour/beibei-word-site)

## Render

- Service type: Web Service
- Runtime: Python
- Build command: `python3 --version`
- Start command: `python3 -B server.py`
- Health check: `/api/health`

## 当前内容

- 2026-06-11：马斯克、SpaceX IPO 与极端财富的政治影响
- 2026-06-12：特朗普 80 岁、白宫作息与强人形象
- 2026-06-18：伊朗队赴美参赛的签证与旅行困局

## 重新生成

```bash
python3 scripts/build_beibei_daily_site.py
```

生成器从下载目录读取 `*笔记讲义*.pdf`，并更新首页、每日页面、样式、交互脚本和清单文件。解析结果按 PDF 的 SHA-256 缓存在 `.beibei-cache/`：再次运行只解析新增或内容发生变化的讲义，已有讲义直接复用缓存。同内容的重复副本会忽略；同日期但内容不同的 PDF 会停止更新并要求人工确认，避免静默覆盖。

持续监控下载目录：

```bash
python3 scripts/build_beibei_daily_site.py --watch
```

监控器会等待文件连续两次扫描保持稳定后再导入，避免读取尚未下载完整的 PDF。可用 `--interval 30` 调整扫描间隔，用 `--force` 忽略缓存并全量重建。

macOS 自动启动配置保存在 `automation/com.beibei.daily-site-watcher.plist`。安装到 `~/Library/LaunchAgents/` 后，它会在登录时启动并持续监控；日志写入 `.beibei-cache/automation.log`。监控器也会观察 `site_config.json`，需求配置改变后会自动重新生成页面。

## 按需求改变页面内容

编辑 `site_config.json` 中的 `display` 即可统一显示或隐藏阅读导入、原文与译文、词汇、长难句模块。`article_guides` 可按日期覆盖阅读导入内容，例如：

```json
{
  "display": {"introduction": true, "reading": true, "vocabulary": true, "analysis": true},
  "article_guides": {
    "20260620": {"background": "……", "overview": "……", "pet": "……"}
  }
}
```

未配置新日期时，页面仍会自动生成，内容简介使用可靠识别到的首段译文；不会把未经改写的英文冒充 PET / CEFR B1 内容。配置补齐 `pet` 后才显示简明改写卡片。

## 验证

```bash
python3 scripts/verify_generated_site.py
```

验证器检查日期去重、首页链接、页面清单、模块显隐、原文译文数量、词条与长难句数量、空分析和缺失译文。修改生成器后应使用 `--force` 重建，再运行验证器。

已知 PDF 解析失败模式与防回归要求见 [`docs/PARSER_GUARDRAILS.md`](docs/PARSER_GUARDRAILS.md)。
