#!/usr/bin/env python3
"""Extract ordinary and red recall text from the supplied history DOCX."""

import argparse
import json
import re
from pathlib import Path

from docx import Document
from docx.oxml.ns import qn

RED_VALUES = {"FF0000", "EE0000", "C00000"}


def run_segments(paragraph_element):
    segments = []
    for run in paragraph_element.iter(qn("w:r")):
        color = run.find(qn("w:rPr"))
        color = color.find(qn("w:color")) if color is not None else None
        value = color.get(qn("w:val"), "").upper() if color is not None else ""
        text = "".join(node.text or "" for node in run.iter(qn("w:t")))
        if run.find(qn("w:tab")) is not None:
            text += "\t"
        if not text:
            continue
        hidden = value in RED_VALUES
        if segments and segments[-1]["hidden"] == hidden:
            segments[-1]["text"] += text
        else:
            segments.append({"text": text, "hidden": hidden})
    return segments


def text_of(segments):
    return "".join(segment["text"] for segment in segments).strip()


def paragraph_item(element, context):
    segments = run_segments(element)
    text = text_of(segments)
    if not text:
        return None
    if re.match(r"^第[一二三四五六七八九十]+单元", text):
        context["unit"] = text
        context["lesson"] = ""
        kind = "unit"
    elif re.match(r"^第\s*\d+\s*课", text):
        context["lesson"] = text
        kind = "lesson"
    else:
        kind = "recall" if any(segment["hidden"] for segment in segments) else "note"
    return {"kind": kind, "unit": context["unit"], "lesson": context["lesson"], "segments": segments}


def table_item(element, context):
    rows = []
    for row in element.findall(qn("w:tr")):
        cells = []
        for cell in row.findall(qn("w:tc")):
            cell_segments = []
            for paragraph in cell.findall(qn("w:p")):
                parts = run_segments(paragraph)
                if cell_segments and parts:
                    cell_segments.append({"text": " / ", "hidden": False})
                cell_segments.extend(parts)
            cells.append(cell_segments)
        rows.append(cells)
    return {"kind": "table", "unit": context["unit"], "lesson": context["lesson"], "rows": rows}


def extract(source):
    document = Document(source)
    context = {"unit": "", "lesson": ""}
    items = []
    for child in document.element.body.iterchildren():
        if child.tag == qn("w:p"):
            item = paragraph_item(child, context)
        elif child.tag == qn("w:tbl"):
            item = table_item(child, context)
        else:
            item = None
        if item:
            item["id"] = len(items) + 1
            items.append(item)
    return {
        "title": "七上历史背诵提纲",
        "source": Path(source).name,
        "redMeans": "需要背诵",
        "items": items,
    }


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("source")
    parser.add_argument("output")
    args = parser.parse_args()
    data = extract(args.source)
    Path(args.output).write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    recall = sum(item["kind"] == "recall" for item in data["items"])
    tables = sum(item["kind"] == "table" for item in data["items"])
    print(f"extracted {len(data['items'])} blocks, {recall} recall paragraphs, {tables} tables")


if __name__ == "__main__":
    main()
