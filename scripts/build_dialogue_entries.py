#!/usr/bin/env python3
"""Turn the full OCR page library into searchable dialogue/method entries."""
from __future__ import annotations
import argparse, json, re
from difflib import SequenceMatcher
from pathlib import Path

ENTRY_RE = re.compile(r"(?m)^\s*(\d{1,3})\s*[.、．]\s*")
ANSWER_RE = re.compile(r"(?m)^\s*(?:(?:回|答|名|辐|辅|同|加|El|Fl|EB|AR|WAR|BA)\s*[:：]|(?:话术|思路\s*\d*|示例|可以说|你可以说|你可以客气的说)\s*[:：]?)\s*")
QUESTION_RE = re.compile(r"[?？]|怎么|如何|什么|怎样|怎办|回复")
SECTION_BOUNDARY_RE = re.compile(
    r"\n(?=(?:思路\s*\d+|场[景合]\s*\d+|第[一二三四五六七八九十]+种)\s*[:：])"
)
RECOVERED_QUESTIONS = {
    (16,44): "别人夸：你很优秀，怎么接？", (17,48): "领导夸你，怎么接？",
    (18,52): "别人问你是一个人吗？怎么接？", (19,57): "女生问：你觉得我胖吗？怎么接？",
    (21,7): "有人说你很有才华，怎么接？", (31,1): "比如你的领导喜欢运动（踢足球、打乒乓球），怎么夸？",
    (33,2): "逛街买西服，怎么夸店主？", (168,2): "你作为家属或者朋友陪客吃饭，怎么说？",
}
RECOVERED_ANSWERS = {
    (14,31): "心意和红包，我选较贵重的收下啦。", (14,34): "如果沉默是金的话，看来你已经发财了。",
    (16,44): "近朱者赤嘛，和你在一起，怎么能不潜移默化呢。", (17,48): "火车跑得快，全靠车头带。有您这么优秀的领导带头，我一定会加倍努力。",
    (18,52): "我怕我半个人呀，会吓死你。", (19,56): "有的人见了一面，就心生爱慕、相见恨晚；有的人哪怕在一起一辈子，也不见得了解对方。", (19,57): "该胖的地方胖，该瘦的地方瘦。",
    (20,61): "我这身高还不是为了凸显你的高度吗？", (20,64): "感谢领导的精准扶贫，距离买房又近了一步。",
    (21,65): "突然感觉周围都暗了，原来是你的红包在发光。", (21,7): "彼此彼此，你不光有才华，而且还很低调呢。", (21,69): "你的颜值胜于才华。",
    (22,70): "年龄只是个数字，我还年轻着呢。", (22,71): "不多不少，刚好够花。", (22,72): "跟重要的人聊天，当然要字字斟酌，慎之又慎。",
    (24,81): "还好我不无聊，有喜欢的人陪我聊天。", (24,82): "领导，您有什么安排吗？", (24,83): "领导您客气了，您先忙，有问题随时喊我。",
    (31,1): "领导，您身体真好哇，一看就经常锻炼！我一运动就累得喘不上气，您跟没事儿一样，太厉害了。\n\n您工作那么忙，还能坚持锻炼，真挺了不起的。", (33,2): "老板娘，你们家的生意肯定是这里最好的。这个商场我经常来，你是这楼里我见过最漂亮的一个老板娘。",
    (38,6): "嗨，一砖砌不成墙，一木竖不成梁，还是团队的功劳，更重要的是领导您带队有方。\n\n船载千斤，掌舵一人。没有张总您的指导，我哪有您说的这么好啊，谢谢张总多年的栽培。", (41,2): "谢谢您的认可。活动前我们领导就再三强调，一定要把活动办漂亮。所有细节我专门安排人去盯，如果您之后还有需求，随时跟我联系就好，别客气。",
    (46,6): "感谢领导对我的信任和栽培。没有您的信任和指导，我也不可能成长这么快。感谢领导给我这个大舞台，我希望今后在您的带领下持续进步。", (61,22): "老板，我很认同您的想法，我先按您的指示执行。老板问意见大概率是走个过场，不要直接提反对意见。",
    (98,4): "这是我该做的事情，小小心意，就是单独表达一下我对您的敬意。\n\n领导，我没有别的意思，主要是最近半年您帮助我太多了，我不知道该怎么表达这份心情，您就收下吧，下不为例了。",
    (113,3): "可以用“环境法”：抓住当下共同的环境和事物，按“事实＋感受＋询问意见”展开。例如在活动中问：“好久不见，你也在这儿啊。我好久没参加这样的活动了，这次感觉办得不错，你是不是经常参加？”", (145,19): "不要说自己表现最不好。不管实际表现如何，都应先说清自己对团队的贡献。如果必须评价他人，就事论事，以谁对团队协作的贡献较少为标准，不做人身评价。",
    (168,2): "刘总，经常听我们家老张提到您，早就想请您吃个饭了。感谢您一路以来对他的栽培和照顾。\n\n我也跟老张说了，以后一定要多支持您的工作。",
}
EXCERPT_KEYS = {(87,1), (87,2)}
CURATED_ENTRIES = {
    35: {
        "question": "有人夸你：颜值真高，怎么接？",
        "answer": "我就喜欢你这么一本正经地说大实话。",
    },
    49: {
        "question": "有人称赞你的气质时，怎么接？",
        "answer": "谢谢夸奖，跟你相比不值一提。",
    },
    78: {
        "question": "对方说他长得不好看，怎么接？",
        "answer": "请尊重我的审美，你是怀疑我眼光不好？",
    },
    100: {
        "question": "如果对方说：“我儿子除了学习好什么都不会，就喜欢宅家里打游戏”，怎么夸？",
        "answer": "哎呀，这个电竞也是很好的运动，现在国家都承认的。",
    },
    103: {
        "question": "夸女性皮肤，怎么夸？",
        "answer": "你皮肤真好，昨天加班大家都熬那么晚，你连一颗痘都不冒，黑眼圈也没有。",
    },
    110: {
        "question": "有的领导看起来年轻，比如头发都在，身材也保养得很好，没有大肚腩，怎么夸？",
        "answer": "领导，您看起来好年轻呀，走路都还在带风的！",
    },
    119: {
        "question": "对方说：“你今天穿得真好看啊”，怎么接？",
        "answer": "就还好吧，谢谢谢谢，真的吗？我一直觉得你审美超级好。",
    },
    120: {
        "question": "万能反夸话术示例：",
        "answer": "谢谢啊，你嘴这么甜，以后肯定发大财。",
        "contentType": "excerpt",
        "formula": "原书示例 · 非问答条目",
    },
    140: {
        "question": "客户夸你，怎么接？",
        "answer": "客户夸你时，重点不是单纯反夸，而是让对方知道你对他的重视，再把这份重视上升到公司和领导。",
        "contentType": "method",
        "formula": "表达重视 · 上升公司与领导",
    },
    143: {
        "question": "长辈夸你，怎么接？",
        "answer": "先接住长辈的夸奖，再把优点归因于家人或长辈，顺势反夸对方。",
        "contentType": "method",
        "formula": "接住夸奖 · 归功长辈 · 顺势反夸",
    },
    144: {
        "question": "姨妈说：“咱们家姑娘越来越漂亮了”，怎么接？",
        "answer": "姨妈，咱们家基因好，你看您跟我妈都那么漂亮，我遗传得好。",
    },
    211: {
        "question": "如何漂亮回击阴阳怪气？",
        "answer": "思路一：打开格局。用更高的姿态、更宽容的方式，向下兼容对方的无知和傲慢，让对方知道他说话很没礼貌，但你不与他计较。\n\n例如对方催婚时，可以说：“你不了解情况啊，不过没关系。”",
        "contentType": "method",
        "formula": "打开格局 · 降位打击",
    },
    239: {
        "question": "送礼怎么说，让人更舒服？",
        "answer": "可以用六种思路：\n\n1. 找借口：说礼物是给对方家人的，例如“这不是给您的，是给孩子的”。\n\n2. 说礼物是朋友送的：“我朋友是酒厂代理商，送了我几箱，我家没人喝，您帮我品品这酒怎么样。”\n\n3. 借用对方的特质：送适合对方的东西，并说明为什么只有对方用着合适。\n\n4. 请对方帮忙：“朋友刚开始做水果，请您尝尝，好的话帮他们宣传宣传。”\n\n5. 利用从众心理：说这是网上很火或旅游时发现的当地特色，带来请对方尝尝。\n\n6. 给下次使用找理由：“这些东西您留着，我过几天还要来吃，不然我还得从家里带过来。”",
        "contentType": "method",
        "formula": "找理由 · 降低对方收礼压力",
    },
    245: {
        "question": "如何高情商安慰别人？",
        "answer": "有效安慰可以分为四步：\n\n第一步，学会倾听。不加评判地认真听对方倾诉，让情绪能够安全地释放。\n\n第二步，陪着他。面对突发变故时，告诉他：“我们在一起，你并不是一个人，不要害怕。”\n\n第三步，抱抱他。可以根据关系远近，握手、拥抱或拍拍肩膀，并说：“太难受的话就哭出来吧，没关系的，我会陪着你。”\n\n第四步，为他做点什么。在对方无助时提供实际帮助；即使能力有限，倒一杯热水也比只停留在口头上更有效。",
        "contentType": "method",
        "formula": "倾听 · 陪伴 · 肢体安慰 · 实际行动",
    },
    249: {
        "question": "求人办事话术（谦虚请教型）：",
        "answer": "这隔行如隔山啊，我确实是外行，您才是内行。您看这条路成不成都无所谓，也别太为难。主要我个人想法比较片面，您是专业的，眼光独到，请您多多点拨一下这事儿啊。",
        "contentType": "excerpt",
        "formula": "原书示例 · 谦虚请教型",
    },
    295: {
        "question": "你做东请领导或同事吃饭，怎么说？",
        "answer": "今天很荣幸能和各位领导同事在这里聚一聚，我平时啊，毛毛躁躁的，有什么做得不妥的地方，希望大家多多包涵。今后呢，有需要我的地方，请大家尽管开口。",
    },
    298: {
        "question": "你请朋友同事吃饭，怎么说？",
        "answer": "这不平时大家忙吗，难得有时间聚一聚，假期了就大家放松一下，都是自己人啊，该吃吃该喝喝，千万别跟我客气。",
    },
    364: {
        "question": "敬领导话术示例：",
        "answer": "老大，我敬你一杯，这1年以来，感谢你对我的照顾和帮助，在你的带领下，我真的学到很多东西，这杯酒，我干了，你随意。",
        "contentType": "excerpt",
        "formula": "原书示例 · 敬领导",
    },
    373: {
        "question": "敬同事话术示例：",
        "answer": "独木难成林，我们的成功离不开大家的团结协作，有你们在工作上的努力，哪里会有干不成的事儿！",
        "contentType": "excerpt",
        "formula": "原书示例 · 敬同事",
    },
    388: {
        "question": "敬领导话术示例：",
        "answer": "王总，这次见你，我发现您气色更好了，刚才小跑上楼连气都不带喘的，是不是天天在健身啊？这杯酒我敬您，希望您身体永远倍儿棒。",
        "contentType": "excerpt",
        "formula": "原书示例 · 敬领导",
    },
    393: {
        "question": "领导敬下属话术示例：",
        "answer": "小张啊，这两年你进步真的很大，希望你能够百尺竿头更进一步，从优秀变得更优秀。",
        "contentType": "excerpt",
        "formula": "原书示例 · 敬下属",
    },
    449: {
        "question": "新年祝福文案：",
        "answer": "奋斗中辞别旧岁，憧憬中迎来新年。",
        "contentType": "excerpt",
        "formula": "原书示例 · 新年祝福",
    },
}
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

def normalized_match_text(text: str) -> str:
    return re.sub(r"[^\w\u4e00-\u9fff]", "", text).lower()

def refine_from_text_layer(items: list[dict], text_layer_path: Path) -> None:
    """Replace noisy OCR with the PDF's clean text layer without changing site IDs."""
    clean_doc = json.loads(text_layer_path.read_text(encoding="utf-8"))
    pages = {page["page"]: page["text"] for page in clean_doc["pages"]}
    candidates: dict[tuple[int, int], list[tuple[str, str]]] = {}
    page_candidates: dict[int, list[tuple[str, str]]] = {}

    def following_text(page_no: int) -> str:
        """Collect cross-page continuation until the next numbered entry."""
        chunks = []
        for next_page in range(page_no + 1, max(pages, default=page_no) + 1):
            text = re.sub(r"^\s*\d{1,3}\s*\n", "", pages.get(next_page, ""))
            next_match = ENTRY_RE.search(text)
            chunks.append(text[:next_match.start()] if next_match else text)
            if next_match:
                break
        return "\n".join(chunks)

    for page_no, text in pages.items():
        matches = list(ENTRY_RE.finditer(text))
        continuation = following_text(page_no)
        for index, match in enumerate(matches):
            end = matches[index + 1].start() if index + 1 < len(matches) else len(text)
            block = text[match.end():end]
            base_question, _ = split_block(block)
            cross_page_question = bool(QUESTION_RE.search(base_question)) or (
                page_no, int(match.group(1))
            ) == (43, 3)
            if index == len(matches) - 1 and continuation.strip() and cross_page_question:
                block += "\n" + continuation
            boundaries = []
            for found in SECTION_BOUNDARY_RE.finditer(block):
                if found.start() <= 60:
                    continue
                prefix = block[:found.start()]
                marker = block[found.start():found.start() + 24]
                same_series_started = (
                    marker.lstrip().startswith("思路") and bool(re.search(r"思路\s*1\s*[:：]", prefix))
                ) or (
                    marker.lstrip().startswith("场") and bool(re.search(r"场[景合]\s*1\s*[:：]", prefix))
                ) or (
                    marker.lstrip().startswith("第") and bool(re.search(r"第一种\s*[:：]", prefix))
                )
                if not same_series_started:
                    boundaries.append(found)
            if boundaries:
                block = block[:boundaries[0].start()]
            pair = split_block(block)
            candidates.setdefault((page_no, int(match.group(1))), []).append(pair)
            page_candidates.setdefault(page_no, []).append(pair)

    for item in items:
        key = (item.get("sourcePage"), item.get("sourceNumber"))
        options = candidates.get(key, [])
        current = normalized_match_text(item["question"] + item["answer"])
        score = lambda pair: SequenceMatcher(
            None, current, normalized_match_text(pair[0] + pair[1])
        ).ratio()
        if not options or max(map(score, options), default=0) < 0.35:
            options = page_candidates.get(item.get("sourcePage"), [])
        if not options:
            continue
        question, answer = max(options, key=score)
        if len(question) < 4:
            continue
        is_question = bool(QUESTION_RE.search(question))
        if answer:
            recompose_fragment = (
                not is_question
                and (
                    question.rstrip().endswith(("，", ",", "、"))
                    or (
                        len(question) > 35
                        and not re.search(r"[。！？?!：:]$", question.rstrip())
                    )
                )
            )
            if not is_question and ((item.get("sourcePage") or 0) >= 178 or recompose_fragment):
                item.update(
                    question=f"原书{item['label']}话术示例：",
                    answer=compact(question + "\n" + answer),
                    contentType="excerpt",
                    formula="原书示例 · 非问答条目",
                )
            else:
                item.update(question=question, answer=answer)
                item["contentType"] = "dialogue" if is_question else "method"
        elif not is_question:
            item.update(
                question=f"原书{item['label']}示例：",
                answer=question,
                contentType="excerpt",
                formula="原书示例 · 非问答条目",
            )
    for item in items:
        item["question"] = re.sub(r"\n\s*\d{1,3}\s*$", "", item["question"]).strip()
        item["answer"] = re.sub(r"\n\s*\d{1,3}\s*$", "", item["answer"]).strip()
        if item["answer"].startswith("本条为原书"):
            original = item["question"]
            item.update(
                question=f"原书{item['label']}示例：",
                answer=original,
                contentType="excerpt",
                formula="原书示例 · 非问答条目",
            )

def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("ocr", type=Path); parser.add_argument("reviewed", type=Path); parser.add_argument("output", type=Path)
    parser.add_argument("--text-layer", type=Path)
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
            recovery_key=(page["page"],local_number)
            question=RECOVERED_QUESTIONS.get(recovery_key,question)
            answer=RECOVERED_ANSWERS.get(recovery_key,answer)
            if recovery_key in EXCERPT_KEYS:
                answer="本条为原书“万能回怼话术”清单中的独立示例，无另外回答。"
            if len(question) < 4: continue
            category, label = classify(question + "\n" + answer)
            is_excerpt=recovery_key in EXCERPT_KEYS
            is_question=bool(QUESTION_RE.search(question))
            if is_excerpt:
                formula="原书示例 · 非问答条目"
                content_type="excerpt"
            elif not answer and not is_question:
                answer="本条为原书中的示例或清单内容，无独立回答。"
                formula="原书示例 · 非问答条目"
                content_type="excerpt"
            else:
                answer=answer or "本条 OCR 暂未识别出完整回答。"
                formula="OCR 二次精修 · 待人工校订"
                content_type="dialogue" if is_question else "method"
            items.append({"id":next_id,"category":category,"label":label,"question":question,"answer":answer,"formula":formula,"reviewStatus":"ocr","confidence":page.get("confidence"),"sourcePage":page["page"],"sourceNumber":local_number,"contentType":content_type})
            next_id += 1
    if args.text_layer:
        refine_from_text_layer(items, args.text_layer)
    for item in items:
        if item["id"] in CURATED_ENTRIES:
            item.update(CURATED_ENTRIES[item["id"]])
    result = {"title":reviewed_doc["title"],"version":"full-ocr-v1","reviewed_count":len(reviewed),"ocr_count":len(items)-len(reviewed),"total_count":len(items),"items":items}
    args.output.write_text(json.dumps(result,ensure_ascii=False,indent=2),encoding="utf-8")

if __name__ == "__main__": main()
