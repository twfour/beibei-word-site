#!/usr/bin/env python3
"""Structural regression checks for generated Beibei pages."""
from __future__ import annotations

import json
import re
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]


def fail(message: str) -> None:
    raise AssertionError(message)


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
        originals = len(re.findall(r'class="original zoomable-paragraph"', page))
        translations = len(re.findall(r'class="translation zoomable-paragraph"', page))
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
        for example in re.findall(r'<p class="example">(.*?)</p>', page, flags=re.S):
            plain = re.sub(r"<[^>]+>", "", example)
            han_count = len(re.findall(r"[\u4e00-\u9fff]", plain))
            sentence_count = len(re.findall(r"[。！？]", plain))
            if han_count > 55 or (len(plain) > 180 and sentence_count >= 2):
                fail(f"{date}: suspicious vocabulary example crossed a paragraph boundary")

    print(json.dumps({"status": "ok", "issues": len(manifest), "pages": sorted(actual_pages)}, ensure_ascii=False))


if __name__ == "__main__":
    try:
        main()
    except (AssertionError, OSError, ValueError, KeyError) as error:
        print(f"verification failed: {error}", file=sys.stderr)
        raise SystemExit(1)
