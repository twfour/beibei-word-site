#!/usr/bin/env python3
"""Extract junior-Chinese writing prompts and examples from the source DOCX."""

from __future__ import annotations

import json
import re
import sys
import zipfile
from pathlib import Path
from xml.etree import ElementTree as ET


NS = {"w": "http://schemas.openxmlformats.org/wordprocessingml/2006/main"}


def paragraphs(path: Path) -> list[str]:
    with zipfile.ZipFile(path) as archive:
        root = ET.fromstring(archive.read("word/document.xml"))
    lines = []
    for paragraph in root.findall(".//w:body//w:p", NS):
        text = "".join(node.text or "" for node in paragraph.findall(".//w:t", NS))
        text = re.sub(r"\s+", " ", text).strip()
        if text:
            lines.append(text)
    return lines


def split_numbered(lines: list[str]) -> dict[int, list[str]]:
    items: dict[int, list[str]] = {}
    current = None
    for line in lines:
        match = re.match(r"^(\d{1,2})[．.]\s*(.*)$", line)
        if match and 1 <= int(match.group(1)) <= 40:
            current = int(match.group(1))
            items[current] = [match.group(2)] if match.group(2) else []
        elif current is not None:
            items[current].append(line)
    return items


def main() -> None:
    if len(sys.argv) not in (2, 3):
        raise SystemExit("usage: extract_docx.py SOURCE.docx [OUTPUT.json]")
    lines = paragraphs(Path(sys.argv[1]))
    answer_at = next((index for index, line in enumerate(lines) if "答案解析" in line), None)
    if answer_at is None:
        raise SystemExit("答案解析 section not found")
    prompts = split_numbered(lines[:answer_at])
    answers = split_numbered(lines[answer_at + 1 :])
    if set(prompts) != set(range(1, 41)) or set(answers) != set(range(1, 41)):
        raise SystemExit(f"expected 40 prompts/answers, got {len(prompts)}/{len(answers)}")
    records = []
    for number in range(1, 41):
        prompt = "\n".join(prompts[number]).strip()
        answer_lines = answers[number]
        while answer_lines and re.match(r"^【(?:答案|参考例文|参考译文)", answer_lines[0]):
            answer_lines.pop(0)
        records.append({"id": number, "prompt": prompt, "example": "\n".join(answer_lines).strip()})
    rendered = json.dumps(records, ensure_ascii=False, indent=2) + "\n"
    if len(sys.argv) == 3:
        Path(sys.argv[2]).write_text(rendered, encoding="utf-8")
    else:
        sys.stdout.write(rendered)


if __name__ == "__main__":
    main()
