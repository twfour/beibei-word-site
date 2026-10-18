#!/usr/bin/env python3
"""Turn the full OCR page library into searchable dialogue/method entries."""
from __future__ import annotations
import argparse, json, re
from pathlib import Path

ENTRY_RE = re.compile(r"(?m)^\s*(\d{1,3})\s*[.、．]\s*")
ANSWER_RE = re.compile(r"(?m)^\s*(?:回|答|话术|可以说|你可以说|你可以客气的说|El|Fl|EB|AR|WAR|BA)\s*[:：]?\s*")
CATEGORIES = [
    ("interview", "面试求职", ("面试", "薪资", "离职", "简历", "竞聘", "岗位")),
    ("dining", "饭局酒局", ("饭局", "敬酒", "喝酒", "酒量", "请客", "饭", "宴")),
    ("work", "职场沟通", ("领导", "老板", "同事", "工作", "公司", "部门", "开会")),
    ("gift", "送礼人情", ("送礼", "礼物", "红包", "中秋", "拜年", "春节")),
    ("comfort", "安慰鼓励", ("安慰", "鼓励", "难过", "烦", "累", "压力")),
    ("praise", "赞美回应", ("夸", "赞美", "好看", "漂亮", "优秀", "气质", "颜值")),
    ("boundary", "边界应对", ("拒绝", "愤怒", "刁难", "嘲讽", "恶意", "阴阳", "回击")),
    ("relationship", "人情往来", ("朋友", "亲戚", "长辈", "女生", "男朋友", "结婚", "感谢")),
    ("social", "聊天应对", ("聊天", "怎么接", "怎么说", "怎么回", "冷场", "微信")),
]

def compact(text: str) -> str:
    text = re.sub(r"[ \t]+", " ", text)
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text.strip(" \n|.")

def classify(text: str) -> tuple[str, str]:
    for key, label, words in CATEGORIES:
        if any(word in text for word in words): return key, label
    return "method", "表达方法"

def split_block(block: str) -> tuple[str, str]:
    block = compact(block)
    found = ANSWER_RE.search(block)
    if found: return compact(block[:found.start()]), compact(block[found.end():])
    parts = [compact(x) for x in re.split(r"\n\s*\n", block) if compact(x)]
    if len(parts) > 1: return parts[0], "\n\n".join(parts[1:])
    lines = [x.strip() for x in block.splitlines() if x.strip()]
    if len(lines) > 1 and len(lines[0]) <= 90: return lines[0], compact("\n".join(lines[1:]))
    return compact(block[:120]), compact(block[120:])

def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("ocr", type=Path); parser.add_argument("reviewed", type=Path); parser.add_argument("output", type=Path)
    args = parser.parse_args()
    ocr = json.loads(args.ocr.read_text(encoding="utf-8"))
    reviewed_doc = json.loads(args.reviewed.read_text(encoding="utf-8"))
    reviewed = reviewed_doc["items"]
    items = [dict(item, reviewStatus="reviewed") for item in reviewed]
    next_id = max(x["id"] for x in items) + 1
    for page in ocr["pages"]:
        if page["page"] <= 7: continue
        matches = list(ENTRY_RE.finditer(page["text"]))
        for index, match in enumerate(matches):
            local_number = int(match.group(1))
            if page["page"] <= 14 and local_number <= 30: continue
            end = matches[index+1].start() if index+1 < len(matches) else len(page["text"])
            question, answer = split_block(page["text"][match.end():end])
            if len(question) < 4: continue
            category, label = classify(question + "\n" + answer)
            items.append({"id":next_id,"category":category,"label":label,"question":question,"answer":answer or "本条 OCR 暂未识别出完整回答。","formula":"OCR 自动整理 · 待后续校订","reviewStatus":"ocr","confidence":page.get("confidence")})
            next_id += 1
    result = {"title":reviewed_doc["title"],"version":"full-ocr-v1","reviewed_count":len(reviewed),"ocr_count":len(items)-len(reviewed),"total_count":len(items),"items":items}
    args.output.write_text(json.dumps(result,ensure_ascii=False,indent=2),encoding="utf-8")

if __name__ == "__main__": main()
