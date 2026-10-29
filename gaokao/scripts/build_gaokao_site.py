#!/usr/bin/env python3
from __future__ import annotations

import argparse
import html
import json
import os
import re
from dataclasses import dataclass
from datetime import datetime
from pathlib import Path
from statistics import mean


SITE_ROOT = Path(__file__).resolve().parents[1]
DEFAULT_SOURCE = Path(
    os.environ.get(
        "GAOKAO_SOURCE_DIR",
        "/Users/apple/Documents/Knowledge Hub/10-Education/High School/Chinese/真题库/作文真题/每日高考作文训练",
    )
)

SECTION_IDS = {
    "原题 / 今日主题": "prompt",
    "Stage 1：审题": "stage-1",
    "Stage 2：资料包": "stage-2",
    "Stage 3：初稿提纲": "stage-3",
    "Stage 4：提纲核对与修改": "stage-4",
    "Stage 5：全文": "stage-5",
    "Stage 6：阅卷评分": "stage-6",
    "Stage 6：第一稿阅卷评分": "stage-6",
    "Stage 7：修改记录": "stage-7",
    "Stage 7：按意见修改": "stage-7",
    "最终成绩单": "scorecard",
}

SECTION_SHORT = {
    "prompt": "原题",
    "stage-1": "审题",
    "stage-2": "资料",
    "stage-3": "提纲",
    "stage-4": "核对",
    "stage-5": "全文",
    "stage-6": "评分",
    "stage-7": "修改",
    "scorecard": "成绩",
}


@dataclass
class Section:
    title: str
    section_id: str
    lines: list[str]


@dataclass
class Essay:
    source: Path
    date: str
    topic: str
    score: int
    status: str
    sections: list[Section]
    thesis: str
    essay_title: str
    essay_lines: list[str]
    essay_chars: int

    @property
    def slug(self) -> str:
        return self.date

    @property
    def article_path(self) -> str:
        return f"articles/{self.slug}.html"


def parse_frontmatter(text: str) -> tuple[dict[str, str], str]:
    lines = text.splitlines()
    if not lines or lines[0].strip() != "---":
        return {}, text

    end = None
    for index in range(1, len(lines)):
        if lines[index].strip() == "---":
            end = index
            break
    if end is None:
        return {}, text

    data: dict[str, str] = {}
    for line in lines[1:end]:
        if ":" not in line or line.startswith((" ", "\t")):
            continue
        key, value = line.split(":", 1)
        data[key.strip()] = value.strip().strip('"').strip("'")
    return data, "\n".join(lines[end + 1 :])


def split_sections(body: str) -> list[Section]:
    sections: list[Section] = []
    title: str | None = None
    section_lines: list[str] = []

    for line in body.splitlines():
        match = re.match(r"^##\s+(.+?)\s*$", line)
        if match:
            if title is not None:
                sections.append(
                    Section(title, section_id_for_title(title), section_lines)
                )
            title = match.group(1).strip()
            section_lines = []
        elif title is not None:
            section_lines.append(line)

    if title is not None:
        sections.append(Section(title, section_id_for_title(title), section_lines))
    return sections


def section_id_for_title(title: str) -> str:
    if title in SECTION_IDS:
        return SECTION_IDS[title]
    stage = re.match(r"^Stage\s*([1-7])\s*[:：]", title, re.IGNORECASE)
    if stage:
        return f"stage-{stage.group(1)}"
    return slugify(title)


def slugify(value: str) -> str:
    value = re.sub(r"[^0-9A-Za-z\u4e00-\u9fff]+", "-", value).strip("-")
    return value.lower() or "section"


def strip_markdown(value: str) -> str:
    value = re.sub(r"\[\[[^\]|]+\|([^\]]+)\]\]", r"\1", value)
    value = re.sub(r"\[\[([^\]]+)\]\]", r"\1", value)
    value = re.sub(r"\[([^\]]+)\]\([^\)]+\)", r"\1", value)
    value = re.sub(r"[*_`>#|]", "", value)
    return re.sub(r"\s+", " ", value).strip()


def table_value(lines: list[str], key: str) -> str:
    for line in lines:
        if not line.lstrip().startswith("|"):
            continue
        cells = [cell.strip() for cell in line.strip().strip("|").split("|")]
        if cells and strip_markdown(cells[0]) == key and len(cells) > 1:
            return strip_markdown(cells[1])
    return ""


def find_final_essay(sections: list[Section]) -> tuple[str, list[str]]:
    stage_seven = next((s for s in sections if s.section_id == "stage-7"), None)
    if stage_seven:
        marker = next(
            (
                index
                for index, line in enumerate(stage_seven.lines)
                if re.match(r"^###\s+最终定稿\s*$", line)
            ),
            None,
        )
        if marker is not None:
            title = "最终定稿"
            start = marker + 1
            while start < len(stage_seven.lines) and not stage_seven.lines[start].strip():
                start += 1
            if start < len(stage_seven.lines):
                heading = re.match(r"^#{3,4}\s+(.+?)\s*$", stage_seven.lines[start])
                if heading:
                    title = heading.group(1).strip()
                    start += 1
            end = len(stage_seven.lines)
            for index in range(start, len(stage_seven.lines)):
                if re.match(r"^###\s+", stage_seven.lines[index]):
                    end = index
                    break
            return title, trim_blank_lines(stage_seven.lines[start:end])

    stage_five = next((s for s in sections if s.section_id == "stage-5"), None)
    if not stage_five:
        return "高考作文", []

    lines = trim_blank_lines(stage_five.lines)
    title = "高考作文"
    if lines:
        heading = re.match(r"^###\s+(.+?)\s*$", lines[0])
        if heading:
            title = heading.group(1).strip()
            lines = trim_blank_lines(lines[1:])
    return title, lines


def trim_blank_lines(lines: list[str]) -> list[str]:
    start = 0
    end = len(lines)
    while start < end and not lines[start].strip():
        start += 1
    while end > start and not lines[end - 1].strip():
        end -= 1
    return lines[start:end]


def count_chars(lines: list[str]) -> int:
    plain = strip_markdown("".join(lines))
    return len(re.sub(r"\s+", "", plain))


def load_essay(path: Path) -> Essay | None:
    data, body = parse_frontmatter(path.read_text(encoding="utf-8"))
    if data.get("type") != "gaokao-writing-practice":
        return None
    if not re.fullmatch(r"\d{4}-\d{2}-\d{2}", data.get("date", "")):
        return None
    score_text = data.get("final_score", "")
    if not score_text.isdigit():
        return None

    sections = split_sections(body)
    stage_one = next((s for s in sections if s.section_id == "stage-1"), None)
    thesis = table_value(stage_one.lines, "最佳立意") if stage_one else ""
    essay_title, essay_lines = find_final_essay(sections)
    return Essay(
        source=path,
        date=data["date"],
        topic=data.get("topic") or path.stem,
        score=int(score_text),
        status=data.get("status", ""),
        sections=sections,
        thesis=thesis,
        essay_title=essay_title,
        essay_lines=essay_lines,
        essay_chars=count_chars(essay_lines),
    )


def inline_markdown(value: str) -> str:
    escaped = html.escape(value.strip())
    escaped = re.sub(
        r"\[\[[^\]|]+\|([^\]]+)\]\]",
        r'<span class="vault-link">\1</span>',
        escaped,
    )
    escaped = re.sub(
        r"\[\[([^\]]+)\]\]",
        lambda match: f'<span class="vault-link">{match.group(1).split("/")[-1]}</span>',
        escaped,
    )
    escaped = re.sub(
        r"\[([^\]]+)\]\((https?://[^\s\)]+)\)",
        r'<a href="\2" target="_blank" rel="noopener noreferrer">\1<span aria-hidden="true"> ↗</span></a>',
        escaped,
    )
    escaped = re.sub(r"`([^`]+)`", r"<code>\1</code>", escaped)
    escaped = re.sub(r"\*\*([^*]+)\*\*", r"<strong>\1</strong>", escaped)
    escaped = re.sub(r"(?<!\*)\*([^*]+)\*(?!\*)", r"<em>\1</em>", escaped)
    return escaped


def is_special(line: str) -> bool:
    stripped = line.lstrip()
    return bool(
        re.match(r"^#{3,6}\s+", stripped)
        or stripped.startswith((">", "```", "|"))
        or re.match(r"^(?:[-+*]|\d+[.)])\s+", stripped)
    )


def render_table(lines: list[str]) -> str:
    rows = [
        [inline_markdown(cell.strip()) for cell in line.strip().strip("|").split("|")]
        for line in lines
    ]
    if len(rows) < 2:
        return "".join(f"<p>{inline_markdown(line)}</p>" for line in lines)
    header = rows[0]
    body = rows[2:] if all(re.fullmatch(r":?-{3,}:?", strip_markdown(c)) for c in rows[1]) else rows[1:]
    head_html = "".join(f"<th scope=\"col\">{cell}</th>" for cell in header)
    body_html = "".join(
        "<tr>" + "".join(f"<td>{cell}</td>" for cell in row) + "</tr>"
        for row in body
    )
    return f'<div class="table-wrap"><table><thead><tr>{head_html}</tr></thead><tbody>{body_html}</tbody></table></div>'


def render_markdown(lines: list[str], prose: bool = False) -> str:
    output: list[str] = []
    index = 0
    while index < len(lines):
        line = lines[index]
        stripped = line.strip()
        if not stripped:
            index += 1
            continue

        heading = re.match(r"^(#{3,6})\s+(.+?)\s*$", stripped)
        if heading:
            level = min(len(heading.group(1)), 4)
            output.append(f"<h{level}>{inline_markdown(heading.group(2))}</h{level}>")
            index += 1
            continue

        if stripped.startswith("|"):
            table_lines: list[str] = []
            while index < len(lines) and lines[index].strip().startswith("|"):
                table_lines.append(lines[index].strip())
                index += 1
            output.append(render_table(table_lines))
            continue

        if stripped.startswith(">"):
            quote_lines: list[str] = []
            while index < len(lines) and lines[index].lstrip().startswith(">"):
                quote_lines.append(lines[index].lstrip()[1:].lstrip())
                index += 1
            quote = "<br>".join(inline_markdown(item) for item in quote_lines)
            output.append(f"<blockquote>{quote}</blockquote>")
            continue

        list_match = re.match(r"^(\s*)([-+*]|\d+[.)])\s+(.+)$", line)
        if list_match:
            ordered = bool(re.match(r"\d", list_match.group(2)))
            tag = "ol" if ordered else "ul"
            items: list[str] = []
            while index < len(lines):
                item_match = re.match(r"^(\s*)([-+*]|\d+[.)])\s+(.+)$", lines[index])
                if not item_match:
                    break
                depth = min(len(item_match.group(1).replace("\t", "    ")) // 2, 3)
                items.append(
                    f'<li class="depth-{depth}">{inline_markdown(item_match.group(3))}</li>'
                )
                index += 1
            output.append(f"<{tag}>" + "".join(items) + f"</{tag}>")
            continue

        if stripped.startswith("```"):
            language = stripped[3:].strip()
            code_lines: list[str] = []
            index += 1
            while index < len(lines) and not lines[index].strip().startswith("```"):
                code_lines.append(lines[index])
                index += 1
            index += 1
            output.append(
                f'<pre data-language="{html.escape(language)}"><code>{html.escape(chr(10).join(code_lines))}</code></pre>'
            )
            continue

        paragraph: list[str] = [stripped]
        index += 1
        while index < len(lines) and lines[index].strip() and not is_special(lines[index]):
            paragraph.append(lines[index].strip())
            index += 1
        separator = " " if prose else "<br>" if any(item.endswith("  ") for item in paragraph) else " "
        output.append(f"<p>{separator.join(inline_markdown(item.rstrip()) for item in paragraph)}</p>")

    wrapper = "essay-prose" if prose else "markdown-body"
    return f'<div class="{wrapper}">' + "".join(output) + "</div>"


def section_label(section_id: str) -> str:
    if section_id.startswith("stage-"):
        return section_id.split("-")[-1].zfill(2)
    return "00" if section_id == "prompt" else "08"


def render_section(section: Section) -> str:
    return f"""
      <section class="training-section" id="{html.escape(section.section_id)}" data-section="{html.escape(section.section_id)}">
        <header class="section-heading">
          <div><span>{section_label(section.section_id)}</span><h2>{html.escape(section.title)}</h2></div>
          <p>{html.escape(SECTION_SHORT.get(section.section_id, "训练记录"))}</p>
        </header>
        {render_markdown(section.lines)}
      </section>"""


def render_article(essay: Essay, essays: list[Essay]) -> str:
    current = essays.index(essay)
    newer = essays[current - 1] if current > 0 else None
    older = essays[current + 1] if current + 1 < len(essays) else None
    date = datetime.strptime(essay.date, "%Y-%m-%d")
    options = "".join(
        f'<option value="{item.slug}.html"{" selected" if item.slug == essay.slug else ""}>{item.date} · {html.escape(item.topic)}</option>'
        for item in essays
    )
    nav = "".join(
        f'<a href="#{section.section_id}" data-nav-section="{section.section_id}"><span>{section_label(section.section_id)}</span>{html.escape(SECTION_SHORT.get(section.section_id, section.title))}</a>'
        for section in essay.sections
    )
    sections = "".join(render_section(section) for section in essay.sections)
    previous_link = (
        f'<a class="article-neighbor" href="{newer.slug}.html"><span>上一篇 / 更新</span><b>{html.escape(newer.topic)}</b></a>'
        if newer
        else '<span class="article-neighbor is-empty"></span>'
    )
    next_link = (
        f'<a class="article-neighbor align-right" href="{older.slug}.html"><span>下一篇 / 更早</span><b>{html.escape(older.topic)}</b></a>'
        if older
        else '<span class="article-neighbor is-empty"></span>'
    )

    return f"""<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="description" content="{html.escape(essay.topic)}：高考作文七阶段训练、范文与模拟阅卷评分。">
  <meta property="og:title" content="{html.escape(essay.topic)} · 每日高考作文训练">
  <meta property="og:description" content="审题、资料、提纲、全文、评分与修改，最终得分 {essay.score}/60。">
  <meta property="og:image" content="https://chinese.qinyibin.com/gaokao/assets/gaokao-desk.jpg">
  <meta property="og:url" content="https://chinese.qinyibin.com/gaokao/articles/{essay.slug}.html">
  <title>{html.escape(essay.topic)} · 每日高考作文训练</title>
  <link rel="stylesheet" href="../styles.css">
</head>
<body class="article-page" data-view="full">
  <div class="reading-progress" aria-hidden="true"><span></span></div>
  <header class="article-header">
    <nav class="site-nav">
      <a class="brand" href="../index.html">GAOKAO / 高考作文</a>
      <label class="article-picker"><span class="sr-only">切换训练文章</span><select data-article-select>{options}</select></label>
    </nav>
    <div class="article-hero">
      <div class="date-block"><strong>{date.day:02d}</strong><span>{date.month:02d} / {date.year}</span></div>
      <div class="article-title">
        <div class="eyebrow">DAILY WRITING · SEVEN-STAGE PRACTICE</div>
        <h1>{html.escape(essay.topic)}</h1>
        <p class="final-title">最终成文：《{html.escape(essay.essay_title)}》</p>
        <div class="article-meta"><span>{essay.score} / 60</span><span>{essay.essay_chars} 字</span><span>一类卷</span></div>
      </div>
      <div class="score-seal" aria-label="最终得分 {essay.score} 分"><strong>{essay.score}</strong><span>/ 60</span></div>
    </div>
  </header>

  <div class="reader-shell">
    <aside class="reader-toc" aria-label="文章目录">
      <div class="toc-title">CONTENTS / 目录</div>
      <div class="mode-switch" role="group" aria-label="阅读模式">
        <button type="button" data-view-mode="full" aria-pressed="true">全流程</button>
        <button type="button" data-view-mode="essay" aria-pressed="false">只读范文</button>
      </div>
      <nav class="toc-links">{nav}<a href="#final-essay-copy" class="essay-copy-link"><span>05</span>最终范文</a></nav>
      <div class="toc-progress" aria-hidden="true"><span></span></div>
    </aside>

    <main class="reader-main">
      <section class="essay-only-copy" id="final-essay-copy">
        <header class="section-heading"><div><span>05</span><h2>{html.escape(essay.essay_title)}</h2></div><p>{essay.essay_chars} 字 · {essay.score} 分</p></header>
        {render_markdown(essay.essay_lines, prose=True)}
      </section>
      <div class="full-training">{sections}</div>
      <nav class="article-pagination" aria-label="前后文章">{previous_link}{next_link}</nav>
    </main>
  </div>
  <footer><span>每日高考作文训练</span><span>审 · 立 · 构 · 材 · 语</span><a href="../index.html">返回档案馆 ↑</a></footer>
  <script src="../app.js"></script>
</body>
</html>
"""


def crop(value: str, limit: int = 132) -> str:
    value = re.sub(r"\s+", " ", value).strip()
    return value if len(value) <= limit else value[: limit - 1].rstrip() + "…"


def render_index(essays: list[Essay]) -> str:
    scores = [essay.score for essay in essays]
    total_chars = sum(essay.essay_chars for essay in essays)
    cards = []
    for essay in essays:
        date = datetime.strptime(essay.date, "%Y-%m-%d")
        searchable = html.escape(
            " ".join([essay.topic, essay.essay_title, essay.thesis, essay.date]),
            quote=True,
        )
        cards.append(
            f"""
      <a class="issue-card" href="{essay.article_path}" data-search="{searchable}">
        <div class="issue-date"><span>{date.day:02d}</span>{date.month:02d} / {date.year}</div>
        <div class="issue-copy">
          <div class="eyebrow">ISSUE {essay.date.replace('-', '')} · SCORE {essay.score}/60</div>
          <h2>{html.escape(essay.topic)}</h2>
          <p class="essay-name">《{html.escape(essay.essay_title)}》</p>
          <p>{html.escape(crop(essay.thesis or "从材料出发，完成审题、资料、提纲、成文、评分与修改。"))}</p>
          <div class="issue-meta"><span>七阶段训练</span><span>{essay.essay_chars} 字范文</span><span>一类卷</span></div>
        </div>
        <span class="issue-score"><b>{essay.score}</b><small>/ 60</small></span>
        <span class="issue-arrow" aria-hidden="true">↗</span>
      </a>"""
        )

    latest = essays[0]
    return f"""<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="description" content="每日高考作文七阶段训练档案：审题、资料、提纲、全文、模拟阅卷和精修。">
  <meta property="og:title" content="每日高考作文训练档案馆">
  <meta property="og:description" content="{len(essays)}篇完整训练，平均得分 {mean(scores):.2f}/60。">
  <meta property="og:image" content="https://chinese.qinyibin.com/gaokao/assets/gaokao-desk.jpg">
  <meta property="og:url" content="https://chinese.qinyibin.com/gaokao/">
  <title>每日高考作文训练档案馆</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body class="archive-page">
  <header class="archive-hero">
    <img class="hero-art" src="assets/gaokao-desk.jpg" alt="批改中的高考作文稿纸与红笔">
    <div class="hero-shade" aria-hidden="true"></div>
    <nav class="site-nav"><a class="brand" href="index.html">GAOKAO / 高考作文</a><span>DAILY WRITING ARCHIVE</span></nav>
    <div class="hero-content">
      <div class="kicker">审题不是猜题，写作不是套作</div>
      <h1>每日作文<br><em>训练档案</em></h1>
      <p>从材料到成文，完整保留审题、资料、提纲、核对、全文、阅卷与修改。每一篇都能回看思路怎样一步步变清楚。</p>
    </div>
    <div class="archive-stats">
      <span><b>{len(essays)}</b> 篇训练</span>
      <span><b>{mean(scores):.2f}</b> 平均分</span>
      <span><b>{max(scores)}</b> 最高分</span>
      <span><b>{total_chars:,}</b> 字范文</span>
    </div>
  </header>

  <main class="archive-main">
    <div class="archive-toolbar">
      <div><span class="toolbar-label">ISSUES / 训练档案</span><strong><span data-visible-count>{len(essays)}</span> 篇</strong></div>
      <label class="search-field"><span>搜索主题、标题或立意</span><input type="search" data-essay-search placeholder="输入关键词" autocomplete="off"></label>
    </div>
    <div class="issue-list">{''.join(cards)}</div>
    <div class="empty-result" data-empty-result hidden><strong>没有匹配的训练</strong><p>换一个关键词试试。</p></div>
    <section class="latest-callout">
      <span>LATEST / 最近更新</span>
      <h2>{html.escape(latest.topic)}</h2>
      <p>最终成文《{html.escape(latest.essay_title)}》，模拟阅卷 {latest.score}/60。</p>
      <a href="{latest.article_path}">进入训练全文 <span aria-hidden="true">→</span></a>
    </section>
  </main>
  <footer><span>每日高考作文训练</span><span>内容来自 Knowledge Hub</span><a href="#top" data-back-top>回到顶部 ↑</a></footer>
  <script src="app.js"></script>
</body>
</html>
"""


def write_site(source_dir: Path) -> list[Essay]:
    if not source_dir.exists():
        raise SystemExit(f"Source directory not found: {source_dir}")

    essays = [essay for path in source_dir.glob("*.md") if (essay := load_essay(path))]
    essays.sort(key=lambda item: item.date, reverse=True)
    if not essays:
        raise SystemExit("No completed Gaokao writing notes found.")

    article_dir = SITE_ROOT / "articles"
    article_dir.mkdir(parents=True, exist_ok=True)
    for stale in article_dir.glob("*.html"):
        stale.unlink()

    for essay in essays:
        (article_dir / f"{essay.slug}.html").write_text(
            render_article(essay, essays), encoding="utf-8"
        )
    (SITE_ROOT / "index.html").write_text(render_index(essays), encoding="utf-8")
    manifest = {
        "generated_at": datetime.now().astimezone().isoformat(timespec="seconds"),
        "count": len(essays),
        "average_score": round(mean(essay.score for essay in essays), 2),
        "articles": [
            {
                "date": essay.date,
                "topic": essay.topic,
                "essay_title": essay.essay_title,
                "score": essay.score,
                "chars": essay.essay_chars,
                "path": essay.article_path,
            }
            for essay in essays
        ],
    }
    (SITE_ROOT / "manifest.json").write_text(
        json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )
    return essays


def main() -> None:
    parser = argparse.ArgumentParser(description="Build the Gaokao writing archive site.")
    parser.add_argument("--source", type=Path, default=DEFAULT_SOURCE)
    args = parser.parse_args()
    essays = write_site(args.source.expanduser().resolve())
    print(f"Generated {len(essays)} essays in {SITE_ROOT}")


if __name__ == "__main__":
    main()
