#!/usr/bin/env python3
"""Build the App Inventor 2019 hybrid project from the current web version."""

from __future__ import annotations

import argparse
import re
import shutil
import zipfile
from pathlib import Path


APP_DIR = Path(__file__).resolve().parent
WEB_DIR = APP_DIR.parent
PROJECT_DIR = APP_DIR / "ChangZhengArchive"
ASSET_DIR = PROJECT_DIR / "assets"
OUTPUT_AIA = APP_DIR / "ChangZhengArchive.aia"

CSS_SOURCES = [
    "styles.css",
    "route-markers.css",
    "progress-feedback.css",
    "data-poster.css",
    "reward-atlas.css",
    "spirit-clues.css",
]

CSS_VALUES = {
    "paper": "#f4ecd9",
    "paper-light": "#fffaf0",
    "ink": "#24342d",
    "muted": "#6f756d",
    "red": "#a52d29",
    "red-dark": "#70201e",
    "green": "#314b3c",
    "gold": "#c2a064",
    "line": "rgba(52,61,48,.17)",
    "shadow": "0 18px 55px rgba(59,43,25,.14)",
    "x": "0",
    "y": "0",
}


def read(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def write(path: Path, content: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content, encoding="utf-8", newline="\n")


def build_compat_css() -> str:
    css = "\n".join(read(WEB_DIR / name) for name in CSS_SOURCES)
    for name, value in CSS_VALUES.items():
        css = css.replace(f"var(--{name})", value)
    unresolved = sorted(set(re.findall(r"var\(--([a-z-]+)\)", css)))
    if unresolved:
        raise RuntimeError(f"Unresolved CSS variables: {', '.join(unresolved)}")
    return css


def build_compat_html(polyfills: str, compat_script: str) -> str:
    html = read(WEB_DIR / "index.html")
    html = re.sub(
        r'(?:\s*<link rel="stylesheet" href="[^"]+">)+',
        '\n  <link rel="stylesheet" href="styles.compat.css">\n  <link rel="stylesheet" href="legacy.css">',
        html,
        count=1,
    )
    html = re.sub(r'\s*<script type="module" src="app\.js"></script>', '', html)
    html = re.sub(r'\s*<script nomodule src="vendor/polyfills\.min\.js"></script>', '', html)
    html = re.sub(r'\s*<script nomodule src="app\.compat\.js"></script>', '', html)
    error_guard = """<script>
window.onerror=function(message,source,line){var notice=document.createElement('div');notice.style.cssText='position:fixed;z-index:999;left:8px;right:8px;bottom:84px;padding:10px;background:#70201e;color:#fff;font:12px/1.5 sans-serif';notice.innerHTML='兼容脚本错误：'+message+'（阶段：'+(window.__compatStage||'启动')+'，第 '+line+' 行）';document.body.appendChild(notice);};
</script>"""
    scripts = (
        error_guard
        + '\n<script>window.__compatStage="兼容补丁";\n'
        + polyfills
        + "\n</script>\n<script>window.__compatStage=\"应用功能\";\n"
        + compat_script
        + '\n</script>\n<script>window.__compatStage="已完成";</script>'
    )
    return html.replace("</body>", scripts + "\n</body>")


def sync_assets(compat_script_path: Path) -> None:
    compat_script = read(compat_script_path)
    polyfills = read(WEB_DIR / "vendor" / "polyfills.min.js")
    write(WEB_DIR / "app.compat.js", compat_script)
    write(ASSET_DIR / "styles.compat.css", build_compat_css())
    write(ASSET_DIR / "index.html", build_compat_html(polyfills, compat_script))
    write(ASSET_DIR / "app.compat.js", compat_script)

    for filename in ["app.js", "legacy.css", "icon.svg", "manifest.webmanifest"]:
        shutil.copy2(WEB_DIR / filename, ASSET_DIR / filename)
    for filename in CSS_SOURCES:
        shutil.copy2(WEB_DIR / filename, ASSET_DIR / filename)

    shutil.copy2(WEB_DIR / "fonts" / "archive-serif.woff", ASSET_DIR / "archive-serif.woff")
    shutil.copy2(WEB_DIR / "fonts" / "archive-serif.woff2", ASSET_DIR / "archive-serif.woff2")
    shutil.copytree(WEB_DIR / "fonts", ASSET_DIR / "fonts", dirs_exist_ok=True)
    shutil.copytree(WEB_DIR / "vendor", ASSET_DIR / "vendor", dirs_exist_ok=True)
    shutil.copy2(WEB_DIR / "vendor" / "polyfills.min.js", ASSET_DIR / "polyfills.min.js")


def package_aia() -> None:
    required = {
        "youngandroidproject/project.properties",
        "src/appinventor/ai_test/ChangZhengArchive/Screen1.scm",
        "src/appinventor/ai_test/ChangZhengArchive/Screen1.bky",
        "assets/index.html",
        "assets/styles.compat.css",
        "assets/app.compat.js",
    }
    temp_output = OUTPUT_AIA.with_suffix(".aia.tmp")
    with zipfile.ZipFile(temp_output, "w", zipfile.ZIP_DEFLATED) as archive:
        for path in sorted(PROJECT_DIR.rglob("*")):
            if path.is_file() and path.name != ".DS_Store":
                archive.write(path, path.relative_to(PROJECT_DIR).as_posix())
    with zipfile.ZipFile(temp_output) as archive:
        names = set(archive.namelist())
        missing = required - names
        if missing:
            raise RuntimeError(f"AIA is missing: {', '.join(sorted(missing))}")
        if archive.testzip() is not None:
            raise RuntimeError("AIA zip integrity check failed")
    temp_output.replace(OUTPUT_AIA)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--compat-script", type=Path, required=True)
    args = parser.parse_args()
    sync_assets(args.compat_script)
    package_aia()
    print(f"Built {OUTPUT_AIA}")


if __name__ == "__main__":
    main()
