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

生成器从下载目录读取 `*笔记讲义*.pdf`，并更新首页、每日页面、样式、交互脚本和清单文件。

已知 PDF 解析失败模式与防回归要求见 [`docs/PARSER_GUARDRAILS.md`](docs/PARSER_GUARDRAILS.md)。
