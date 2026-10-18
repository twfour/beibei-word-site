#!/usr/bin/env python3
"""Build a compact, reviewable OCR library from Tesseract page outputs."""

from __future__ import annotations

import argparse
import csv
import json
from datetime import datetime, timezone
from pathlib import Path


def confidence_for(tsv_path: Path) -> float | None:
    if not tsv_path.exists():
        return None
    values: list[float] = []
    with tsv_path.open(encoding="utf-8", errors="replace") as handle:
        for row in csv.DictReader(handle, delimiter="\t"):
            text = (row.get("text") or "").strip()
            try:
                confidence = float(row.get("conf") or -1)
            except ValueError:
                continue
            if text and confidence >= 0:
                values.append(confidence)
    return round(sum(values) / len(values), 1) if values else None


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("input", type=Path, help="Folder containing page-NNN.txt/tsv files")
    parser.add_argument("output", type=Path)
    args = parser.parse_args()

    pages = []
    for text_path in sorted(args.input.glob("page-*.txt")):
        page_number = int(text_path.stem.rsplit("-", 1)[1])
        text = text_path.read_text(encoding="utf-8", errors="replace").strip()
        pages.append(
            {
                "page": page_number,
                "text": text,
                "confidence": confidence_for(text_path.with_suffix(".tsv")),
                "status": "ocr" if text else "empty",
            }
        )

    result = {
        "title": "高情商话术实战速成宝典（红皮书）",
        "language": "zh-CN",
        "engine": "tesseract chi_sim+eng psm-6",
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "page_count": len(pages),
        "non_empty_pages": sum(bool(page["text"]) for page in pages),
        "pages": pages,
    }
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding="utf-8")


if __name__ == "__main__":
    main()
