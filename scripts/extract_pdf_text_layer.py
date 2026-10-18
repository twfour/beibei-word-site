#!/usr/bin/env python3
"""Extract the embedded PDF text layer as a page-indexed JSON source."""
from __future__ import annotations

import argparse
import json
from pathlib import Path

from pypdf import PdfReader


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("pdf", type=Path)
    parser.add_argument("output", type=Path)
    args = parser.parse_args()

    reader = PdfReader(args.pdf)
    pages = [
        {
            "page": number,
            "text": page.extract_text() or "",
            "confidence": 1.0,
            "source": "pdf-text-layer",
        }
        for number, page in enumerate(reader.pages, 1)
    ]
    result = {
        "source": args.pdf.name,
        "method": "pypdf-text-layer",
        "pages": pages,
    }
    args.output.write_text(
        json.dumps(result, ensure_ascii=False, indent=2), encoding="utf-8"
    )


if __name__ == "__main__":
    main()
