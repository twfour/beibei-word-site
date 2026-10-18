#!/usr/bin/env python3
"""High-quality OCR pass for the red/black scanned dialogue book."""
from __future__ import annotations
import argparse, csv, json, shutil, subprocess
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime, timezone
from pathlib import Path
from PIL import Image, ImageChops, ImageFilter

def preprocess(source: Path, target: Path) -> None:
    image = Image.open(source).convert("RGB")
    red, green, blue = image.split()
    ink = ImageChops.darker(ImageChops.darker(red, green), blue)
    ink = ink.filter(ImageFilter.MedianFilter(3))
    ink.point(lambda value: 0 if value < 205 else 255, mode="1").save(target)

def run_page(source: Path, text_dir: Path) -> None:
    ink = source.with_name(source.stem + "-ink.png")
    preprocess(source, ink)
    base = text_dir / source.stem
    subprocess.run(["tesseract", str(ink), str(base), "-l", "chi_sim", "--psm", "3", "txt", "tsv"], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    source.unlink(); ink.unlink()

def confidence(tsv: Path) -> float | None:
    values=[]
    with tsv.open(encoding="utf-8", errors="replace") as handle:
        for row in csv.DictReader(handle, delimiter="\t"):
            try: value=float(row.get("conf") or -1)
            except ValueError: continue
            if (row.get("text") or "").strip() and value >= 0: values.append(value)
    return round(sum(values)/len(values),1) if values else None

def main() -> None:
    parser=argparse.ArgumentParser()
    parser.add_argument("pdf", type=Path); parser.add_argument("output", type=Path)
    parser.add_argument("--work", type=Path, default=Path(".ocr-refine/full")); parser.add_argument("--workers", type=int, default=4)
    args=parser.parse_args()
    pages=args.work/"pages"; text=args.work/"text"
    shutil.rmtree(args.work, ignore_errors=True); pages.mkdir(parents=True); text.mkdir(parents=True)
    subprocess.run(["pdftoppm","-jpeg","-jpegopt","quality=95","-r","240",str(args.pdf),str(pages/"page")],check=True)
    sources=sorted(pages.glob("page-*.jpg"))
    with ThreadPoolExecutor(max_workers=args.workers) as pool: list(pool.map(lambda page: run_page(page,text),sources))
    results=[]
    for txt in sorted(text.glob("page-*.txt")):
        number=int(txt.stem.rsplit("-",1)[1]); content=txt.read_text(encoding="utf-8",errors="replace").strip()
        results.append({"page":number,"text":content,"confidence":confidence(txt.with_suffix(".tsv")),"status":"refined" if content else "empty"})
    doc={"title":"高情商话术实战速成宝典（红皮书）","language":"zh-CN","engine":"tesseract chi_sim psm-3, 240dpi min-channel threshold","generated_at":datetime.now(timezone.utc).isoformat(),"page_count":len(results),"non_empty_pages":sum(bool(x["text"]) for x in results),"pages":results}
    args.output.write_text(json.dumps(doc,ensure_ascii=False,indent=2),encoding="utf-8")

if __name__ == "__main__": main()
