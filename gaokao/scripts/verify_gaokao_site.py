#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit


SITE_ROOT = Path(__file__).resolve().parents[1]
REQUIRED_SECTION_IDS = {
    "prompt",
    "stage-1",
    "stage-2",
    "stage-3",
    "stage-4",
    "stage-5",
    "stage-6",
    "stage-7",
    "scorecard",
}


class PageParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.ids: set[str] = set()
        self.references: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        values = dict(attrs)
        if values.get("id"):
            self.ids.add(values["id"] or "")
        for attribute in ("href", "src"):
            value = values.get(attribute)
            if value:
                self.references.append(value)


def local_target(page: Path, reference: str) -> Path | None:
    parts = urlsplit(reference)
    if parts.scheme or parts.netloc or reference.startswith(("#", "mailto:", "tel:")):
        return None
    path = unquote(parts.path)
    if not path:
        return None
    target = (page.parent / path).resolve()
    if path.endswith("/"):
        target = target / "index.html"
    return target


def inspect_page(page: Path) -> tuple[PageParser, str]:
    text = page.read_text(encoding="utf-8")
    parser = PageParser()
    parser.feed(text)
    return parser, text


def verify(expected_count: int | None) -> list[str]:
    errors: list[str] = []
    manifest_path = SITE_ROOT / "manifest.json"
    required_assets = [
        SITE_ROOT / "index.html",
        SITE_ROOT / "styles.css",
        SITE_ROOT / "app.js",
        SITE_ROOT / "assets" / "gaokao-desk.jpg",
        manifest_path,
    ]
    for asset in required_assets:
        if not asset.is_file() or asset.stat().st_size == 0:
            errors.append(f"Missing or empty asset: {asset.relative_to(SITE_ROOT)}")

    if errors or not manifest_path.exists():
        return errors

    manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
    articles = manifest.get("articles", [])
    if manifest.get("count") != len(articles):
        errors.append("Manifest count does not match its article list.")
    if expected_count is not None and len(articles) != expected_count:
        errors.append(f"Expected {expected_count} articles, found {len(articles)}.")

    pages = [SITE_ROOT / "index.html"]
    for article in articles:
        page = SITE_ROOT / article.get("path", "")
        pages.append(page)
        if not page.is_file():
            errors.append(f"Missing article: {page.relative_to(SITE_ROOT)}")
            continue
        parser, text = inspect_page(page)
        missing_sections = REQUIRED_SECTION_IDS - parser.ids
        if missing_sections:
            errors.append(
                f"{page.name} is missing sections: {', '.join(sorted(missing_sections))}"
            )
        if "[[" in text or "]]" in text:
            errors.append(f"Unresolved Obsidian wikilink in {page.name}.")

    for page in pages:
        if not page.is_file():
            continue
        parser, _ = inspect_page(page)
        for reference in parser.references:
            target = local_target(page, reference)
            if target is not None and not target.exists():
                errors.append(
                    f"Broken local reference in {page.relative_to(SITE_ROOT)}: {reference}"
                )

    return errors


def main() -> None:
    parser = argparse.ArgumentParser(description="Verify the generated Gaokao writing site.")
    parser.add_argument("--expected-count", type=int)
    args = parser.parse_args()
    errors = verify(args.expected_count)
    if errors:
        for error in errors:
            print(f"ERROR: {error}", file=sys.stderr)
        raise SystemExit(1)
    manifest = json.loads((SITE_ROOT / "manifest.json").read_text(encoding="utf-8"))
    print(f"Verified {manifest['count']} articles and all local links.")


if __name__ == "__main__":
    main()
