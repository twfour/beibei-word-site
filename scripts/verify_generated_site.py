#!/usr/bin/env python3
"""Structural regression checks for generated Beibei pages."""
from __future__ import annotations

import json
import html
import re
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]


def fail(message: str) -> None:
    raise AssertionError(message)


def plain_text(fragment: str) -> str:
    return re.sub(r"\s+", " ", html.unescape(re.sub(r"<[^>]+>", "", fragment))).strip()


def brackets_balanced(value: str) -> bool:
    pairs = (("(", ")"), ("（", "）"))
    return all(value.count(left) == value.count(right) for left, right in pairs)


def main() -> None:
    manifest = json.loads((ROOT / "manifest.json").read_text(encoding="utf-8"))
    config = json.loads((ROOT / "site_config.json").read_text(encoding="utf-8"))
    display = config.get("display", {})
    index = (ROOT / "index.html").read_text(encoding="utf-8")
    expected_pages = {f"{item['date']}.html" for item in manifest}
    actual_pages = {path.name for path in (ROOT / "days").glob("20??????.html")}
    if actual_pages != expected_pages:
        fail(f"date pages mismatch: expected {sorted(expected_pages)}, got {sorted(actual_pages)}")
    dates = [item["date"] for item in manifest]
    if dates != sorted(set(dates)):
        fail("manifest dates must be unique and ascending")
    semantic_audit_dates = set(dates[-50:])

    section_ids = {
        "introduction": "introduction",
        "reading": "reading",
        "vocabulary": "vocabulary",
        "analysis": "analysis",
    }
    for item in manifest:
        date = item["date"]
        if not re.fullmatch(r"20\d{6}", date):
            fail(f"invalid issue date: {date!r}")
        if len(item.get("sha256", "")) != 64:
            fail(f"missing source checksum for {date}")
        if f'days/{date}.html' not in index:
            fail(f"homepage does not link to {date}")
        page = (ROOT / "days" / f"{date}.html").read_text(encoding="utf-8")
        originals = len(re.findall(r'class="original"', page))
        translations = len(re.findall(r'class="translation"', page))
        vocab = len(re.findall(r'class="vocab-card"', page))
        analyses = len(re.findall(r'class="analysis-card"', page))
        observed = {
            "paragraphs": originals,
            "vocabulary": vocab,
            "analyses": analyses,
        }
        if originals != translations:
            fail(f"{date}: original/translation count differs")
        for key, count in observed.items():
            expected = item[key] if display.get({"paragraphs": "reading", "vocabulary": "vocabulary", "analyses": "analysis"}[key], True) else 0
            if count != expected:
                fail(f"{date}: {key} expected {expected}, got {count}")
        for key, section_id in section_ids.items():
            present = f'id="{section_id}"' in page
            if present != display.get(key, True):
                fail(f"{date}: section {key} visibility does not match site_config.json")
        if "本段译文未能从 PDF 中可靠识别" in page:
            fail(f"{date}: at least one paragraph has no reliable translation")
        if re.search(r'<div class="analysis-body">\s*</div>', page):
            fail(f"{date}: empty long-sentence analysis")
        for row in re.findall(r'<article class="parallel-row".*?</article>', page, flags=re.S) if date in semantic_audit_dates else ():
            original_match = re.search(r'<div class="original">.*?<p>(.*?)</p>', row, flags=re.S)
            translation_match = re.search(r'<div class="translation">.*?<p>(.*?)</p>', row, flags=re.S)
            if not original_match or not translation_match:
                continue
            original = plain_text(original_match.group(1))
            translation = plain_text(translation_match.group(1))
            han_count = len(re.findall(r"[\u4e00-\u9fff]", translation))
            if len(original) >= 300 and han_count < max(25, int(len(original) * 0.16)):
                fail(f"{date}: suspiciously short paragraph translation")
            if any(label in translation for label in ("词性与定义", "传播距离", "典型产生场景", "核心职能")):
                fail(f"{date}: paragraph translation contains note/table content")
            if re.search(r"\b(?:n|v|adj|adv|prefix|suffix)\.\s*/[^/]{1,40}/", original):
                fail(f"{date}: vocabulary definition leaked into original paragraph")
            if re.search(r"(?:[.!?][”’\"']?\s+(?:4|6)\.|\s《)$", original):
                fail(f"{date}: page marker leaked into original paragraph")
        for example in re.findall(r'<p class="example">(.*?)</p>', page, flags=re.S):
            plain = plain_text(example)
            han_count = len(re.findall(r"[\u4e00-\u9fff]", plain))
            sentence_count = len(re.findall(r"[。！？]", plain))
            if han_count > 55 or (len(plain) > 180 and sentence_count >= 2):
                fail(f"{date}: suspicious vocabulary example crossed a paragraph boundary")
            if date in semantic_audit_dates and re.search(r"\b(?:n|v|adj|adv|phr|suffix|prefix)\.?(?:\s*/[^/]+/|\s+(?:to|if|the)\b)", plain, re.I):
                fail(f"{date}: next vocabulary card leaked into an example")
            if date in semantic_audit_dates and not brackets_balanced(plain):
                fail(f"{date}: unbalanced brackets in vocabulary example")
        for definition in re.findall(r'<p class="definition(?:-en)?">(.*?)</p>', page, flags=re.S) if date in semantic_audit_dates else ():
            plain = plain_text(definition)
            if not brackets_balanced(plain):
                fail(f"{date}: unbalanced brackets in vocabulary definition")

    print(json.dumps({"status": "ok", "issues": len(manifest), "pages": sorted(actual_pages)}, ensure_ascii=False))


if __name__ == "__main__":
    try:
        main()
    except (AssertionError, OSError, ValueError, KeyError) as error:
        print(f"verification failed: {error}", file=sys.stderr)
        raise SystemExit(1)
