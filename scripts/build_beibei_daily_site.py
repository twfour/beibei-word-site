#!/usr/bin/env python3
from __future__ import annotations

import hashlib
import html
import json
import re
import time
import argparse
from dataclasses import dataclass
from dataclasses import asdict
from pathlib import Path

import pdfplumber
from pypdf import PdfReader


SOURCE_DIR = Path("/Users/apple/Downloads/贝贝外刊")
OUTPUT_DIR = Path(__file__).resolve().parents[1]
SITE_CONFIG_PATH = OUTPUT_DIR / "site_config.json"
CACHE_DIR = OUTPUT_DIR / ".beibei-cache" / "articles"


@dataclass
class Article:
    date: str
    title: str
    filename: str
    pages: int
    words: int
    paragraphs: list[dict[str, str]]
    vocabulary: list[dict[str, str]]
    analyses: list[dict[str, str]]
    source_digest: str = ""


ARTICLE_GUIDES: dict[str, dict[str, str]] = {
    "20260611": {
        "background": (
            "埃隆·马斯克已经凭借特斯拉、SpaceX 和社交平台 X 成为全球最富有、也最具公共影响力的企业家之一。"
            "文章以 SpaceX 可能进行首次公开募股为背景，设想他的个人财富进一步跨入“万亿美元”量级。"
            "这不只是商业新闻：当一位私人企业家同时掌握巨额资本、传播平台、政府合同和政治捐款能力时，"
            "财富与民主权力之间的界线就成为值得讨论的问题。"
        ),
        "overview": (
            "文章从马斯克关于“金钱买不到幸福”的帖子写起，先用研究说明财富与幸福感、生活控制感之间的关系，"
            "再把焦点从他的个人心理转向公共生活。作者通过数字比较解释一万亿美元究竟有多大，并回顾富豪通过"
            "政治捐款、超级政治行动委员会、商业交易和社交平台影响国内外政治的方式。文章的核心观点是："
            "真正需要警惕的并非一个人有多富，而是如此集中的资源可能带来不受选举约束、也难以问责的政治影响力。"
        ),
        "pet": (
            "Elon Musk is already one of the richest people in the world. According to the article, a possible SpaceX IPO could make him the first trillionaire. "
            "At first, the writer talks about money and happiness. Musk once joked online that money could not make him happy. However, a study found that rich people often feel happier because they have more control over their lives. "
            "The article then asks a more important question: what could so much money do to democracy? A trillion dollars is difficult to imagine. It could give one person great power over companies, the media and politics. "
            "Very rich people can give large amounts of money to political groups. They can also use their businesses and online platforms to influence public debate. Musk has already taken part in political discussions in the United States and other countries. "
            "The writer is not mainly worried about Musk’s private life. The main concern is that one unelected person may have more influence than millions of ordinary voters. The article argues that extreme wealth needs public attention because money can become political power."
        ),
    },
    "20260612": {
        "background": (
            "文章发表于唐纳德·特朗普迎来 80 岁生日之际。高龄领导人的体力、判断力和工作方式一直是美国政治中的敏感议题，"
            "特朗普则长期用少睡、密集发帖和高强度公开活动塑造“精力旺盛”的形象。与此同时，美国独立 250 周年相关活动"
            "把终极格斗冠军赛带到白宫草坪，使年龄、力量、媒体表演与总统形象被放进同一个新闻场景。"
        ),
        "overview": (
            "文章先描写白宫工作人员为配合特朗普的作息而轮班，以及团队每天查看 Truth Social 深夜帖文和舆论后果的工作。"
            "随后，作者围绕“他是在拒绝服老，还是确实需要休息”展开讨论，并把白宫 UFC 赛事视为一种精心设计的力量展示。"
            "文章一方面承认特朗普的活力、政治直觉和舞台控制力，另一方面也追问持续制造冲突、缺乏休息和拒绝年龄限制"
            "是否会给决策带来风险。全文借 80 岁生日观察一种独特的政治品牌：把不按年龄行事本身变成优势。"
        ),
        "pet": (
            "Donald Trump is turning 80, but he does not want people to see him as old. He sleeps very little and often posts on Truth Social late at night. Because of this, White House staff work in shifts. Every morning, his team checks his messages and thinks about the problems they may cause. "
            "Some people see Trump’s energy as a strength. He can work for long hours, speak to supporters and stay at the centre of the news. Others wonder if a president of his age needs more rest. They also worry that quick online posts can create political trouble. "
            "For his birthday week, a UFC event is planned on the White House lawn. The fight is part of America’s 250th birthday celebrations, but it also sends a clear message about strength. Trump wants to show that age has not made him weak. "
            "The article compares this image with the usual idea of how an 80-year-old should behave. Trump’s refusal to act his age may help his political brand. However, the same behaviour can also raise questions about good judgement, health and responsible leadership."
        ),
    },
    "20260618": {
        "background": (
            "伊朗队赴美国参加世界杯时，体育赛事正与紧张的美伊关系、战争阴影和旅行限制重叠。文章所述背景中，"
            "部分伊朗代表团成员未能取得美国签证，球队也因安全考虑把训练基地从亚利桑那州改到墨西哥蒂华纳。"
            "因此，伊朗队每次赴洛杉矶比赛都要面对额外的飞行、入境检查和恢复时间压力；对球员和在美伊朗社群而言，"
            "比赛也承载了远超比分的政治与身份意义。"
        ),
        "overview": (
            "文章以伊朗队 2 比 2 战平新西兰后的采访开场。前锋迈赫迪·塔雷米没有回避媒体，而是公开抱怨签证、通勤、"
            "安全和缺乏支持等现实困难。报道随后把视线从球场扩展到洛杉矶的伊朗侨民：有人支持国家队，有人把球队视为"
            "伊朗政权的象征，也有人试图把足球与政治分开。文章通过球员、官员、球迷和抗议者的不同声音说明，"
            "这场世界杯之旅既是体育竞赛，也是战争、移民身份、国家认同与外交关系交织的公共事件。"
        ),
        "pet": (
            "Iran began its World Cup in the United States with a 2–2 draw against New Zealand. After the game, Iranian striker Mehdi Taremi wanted to talk about more than football. He said the situation was a disaster for his team. "
            "The United States had strict travel rules for Iranians, and eleven members of Iran’s football group could not get visas. The team first planned to train in Arizona, but it moved its base to Tijuana in Mexico because of safety worries. Before the match, the players flew to Los Angeles. The journey and immigration checks took a long time. They had to return to Mexico soon after the game, so they had less time to rest. "
            "The match was also emotional for Iranian people living in Los Angeles. Many came to support the team, while some protesters said the team represented the Iranian government. Other fans wanted to keep football separate from politics. "
            "For Iran, this World Cup is not only about winning matches. The players must deal with travel problems, political tension and pressure from different groups. Their experience shows how war and international relations can affect sport."
        ),
    },
    "20260626": {
        "background": (
            "生成式人工智能快速发展后，很多学生曾被建议“学编程”以增强就业竞争力。如今形势出现反转："
            "程序员开始担心被 AI 取代，而大型 AI 实验室反而大量招聘哲学家。原因在于，先进模型不只需要更强的代码能力，"
            "还要处理真理、谦逊、伦理边界、规则选择、责任和风险权衡等问题；这些恰好是哲学长期训练人思考的领域。"
        ),
        "overview": (
            "文章以“为什么大型 AI 实验室疯狂招聘哲学家”为主线，先指出哲学专业毕业生的就业表现甚至优于计算机专业，"
            "再解释哲学能为 AI 研究带来的几类能力：用苏格拉底式提问减少模型迎合用户、用“知道自己无知”的谦逊降低幻觉和过度自信、"
            "用宪政主义和伦理学框架约束模型行为。后半部分比较义务论与后果主义在 AI 宪章、自动驾驶和武器系统中的作用，"
            "最后提出担忧：如果道德判断越来越多交给机器，人类自身的判断能力会不会退化。"
        ),
        "pet": (
            "Many people once told arts and humanities students to learn coding if they wanted good jobs. The article says this advice may now look less certain. As AI becomes stronger, many programmers are worried that machines may take their work. At the same time, big AI companies are hiring many philosophers. "
            "Philosophy can help AI researchers because AI creates difficult questions. One example is the Socratic method. It uses careful questions to find problems in an idea. AI models trained in this way may be less eager to please people and more willing to search for the truth. "
            "Another useful idea is humility. Socrates said that he was wise because he knew he did not know everything. If AI models can learn this kind of humility, they may make fewer false claims and become less overconfident. "
            "Philosophy is also important for AI safety. Developers need rules to stop models from behaving badly. Some rules come from deontology, which says some actions are always wrong. Other systems use consequentialism, which compares costs and benefits. "
            "The article ends with a warning. If machines make more moral decisions for us, people may become less able to make their own judgments. In the age of AI, philosophers may have more work than ever."
        ),
    },
    "20260629": {
        "background": (
            "这篇文章讨论美国大学教育中的一个尖锐问题：不少大学生进入高校后，基础读写和计算能力并没有达到大学学习应有的水平。"
            "疫情造成的学习损失、标准化考试要求下降、大学招生压力、成绩膨胀和 AI 作弊等因素叠加，使“顶尖高校是否还守得住学术标准”成为公共议题。"
            "文章也把美国与新加坡、英国、密西西比州等改革案例作比较，提醒读者不要把教育公平简单理解为降低门槛。"
        ),
        "overview": (
            "文章先从大学教师长期抱怨学生水平下降写起，但很快指出这次并不只是主观感受：OECD 测试显示，美国相当一部分大学生的读写或计算能力接近儿童水平。"
            "随后，作者分析原因，包括疫情冲击、入学门槛降低、SAT 等考试被取消，以及大学为招满学生而放松要求。"
            "后半部分提出三条解决方向：中小学阶段恢复扎实标准，大学重新坚持入学与考核要求，并为年轻人提供更多大学之外的学习路径。"
            "文章的核心观点是：真正的机会平等不是把学生推上更高台阶，而是先给他们攀登所需的能力。"
        ),
        "pet": (
            "The article says that many university teachers in America are worried about their students’ basic skills. Some maths teachers must send first-year students to extra classes before real university work can begin. Some humanities teachers say students now find texts difficult that students ten years ago could understand easily. "
            "Tests by the OECD show a serious problem. About one in seven American college students reads no better than a typical ten-year-old. For maths skills, the number is almost one in five. The best students are still very strong, but more students are arriving at university without the skills they need. "
            "The article gives several reasons. The pandemic hurt schooling, but standards were already falling before Covid-19. Many universities also made entry easier and stopped requiring tests such as the SAT. Some people wanted fairer admissions, while some universities needed enough students. "
            "The writer says the cost is high. Universities spend time teaching basic material again, so they have less time to help excellent students. Weak students may drop out, and universities may lower standards even more. AI cheating may make this problem worse. "
            "The article suggests three solutions. Schools should keep stronger standards. Universities should bring back serious tests and control grade inflation. Governments should also offer more paths besides university, such as apprenticeships. The main message is that education should give everyone a real chance, but lowering standards without teaching skills helps nobody."
        ),
    },
}


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as source:
        for chunk in iter(lambda: source.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def discover_note_pdfs() -> tuple[list[tuple[Path, str]], list[dict[str, str]]]:
    """Return one source per date and report byte-identical duplicate files.

    A date with different PDF contents is treated as an explicit conflict.  The
    old implementation silently let the last filename win, which could replace
    a published issue with an unrelated revision.
    """
    by_date: dict[str, tuple[Path, str]] = {}
    digest_owner: dict[str, Path] = {}
    duplicates: list[dict[str, str]] = []
    for path in sorted(SOURCE_DIR.glob("*笔记讲义*.pdf")):
        date_match = re.search(r"(20\d{6})", path.name)
        if not date_match:
            continue
        date = date_match.group(1)
        digest = sha256(path)
        if digest in digest_owner:
            duplicates.append({"file": path.name, "same_as": digest_owner[digest].name})
            continue
        digest_owner[digest] = path
        if date in by_date and by_date[date][1] != digest:
            previous = by_date[date][0]
            raise ValueError(
                f"Conflicting PDFs for {date}: {previous.name!r} and {path.name!r}. "
                "Keep one authoritative version or rename the intended issue date."
            )
        by_date[date] = (path, digest)
    return [by_date[key] for key in sorted(by_date)], duplicates


def load_site_config() -> dict:
    defaults = {
        "display": {
            "introduction": True,
            "reading": True,
            "vocabulary": True,
            "analysis": True,
        },
        "article_guides": {},
    }
    if not SITE_CONFIG_PATH.exists():
        return defaults
    configured = json.loads(SITE_CONFIG_PATH.read_text(encoding="utf-8"))
    defaults["display"].update(configured.get("display", {}))
    defaults["article_guides"].update(configured.get("article_guides", {}))
    return defaults


def clean_text(value: str) -> str:
    value = value.replace("\x00", " ")
    value = re.sub(r"-\s*\d+\s*-\s*视频号：贝贝外刊\s*公众号：一起贝英语", " ", value)
    value = re.sub(r"视频号：贝贝外刊|公众号：一起贝英语", " ", value)
    value = re.sub(r"扫码听音频|领课程资料", " ", value)
    value = re.sub(r"\s+", " ", value)
    return value.strip()


def lesson_body(raw: str) -> str:
    stop_positions = [raw.find(marker) for marker in ("长难句分析", "文章结构", "课后作业")]
    stop_positions = [position for position in stop_positions if position >= 0]
    body = raw[:min(stop_positions)] if stop_positions else raw
    return re.sub(
        r"背景补充[:：]?.*?(?=Para\.\s*\d+|长难句分析|文章结构|课后作业|$)",
        " ",
        body,
        flags=re.S,
    )


def title_from_path(path: Path) -> str:
    title = path.stem
    title = re.sub(r"^\d{8}-?", "", title)
    title = re.sub(r"^\d{8}", "", title)
    title = re.sub(r"^【笔记讲义】", "", title)
    return title.strip("- _,")


VOCAB_PATTERN = re.compile(
    r"\b([A-Za-z][A-Za-z’' /-]{1,52}?)\s+"
    r"(n|v|adj|adv|phr|conj|exclamation)\.\s*/([^/]{1,90})/\s*"
    r"(.*?)(?=\s+[A-Za-z][A-Za-z’' /-]{1,52}?\s+"
    r"(?:n|v|adj|adv|phr|conj|exclamation)\.\s*/|\s+Para\.\s*\d+|"
    r"\s+长难句分析|\s+文章结构|\s+课后作业|$)",
    re.S,
)


# Some PDF pages place the paragraph translation between a vocabulary heading
# and its dictionary definition. Keep small, source-verified corrections here
# so the generated tooltip never mistakes that paragraph for the word meaning.
VOCAB_CORRECTIONS: dict[str, dict[str, str]] = {
    "contentment": {
        "definition": "满意；满足；知足感",
        "definition_en": "a feeling of happiness or satisfaction",
        "example": "He has found contentment at last. 他最终得到了满足。 · A sigh of contentment. 满足地舒一口气。",
    },
    "obscene": {
        "definition": "淫秽的、猥亵的、下流的；（数量等）大得惊人的、骇人听闻的",
        "definition_en": "sexually offensive; extremely large in a way that is unacceptable or offensive",
    },
    "collateral": {
        "definition": "附属的；附加的；附带的",
        "definition_en": "connected with something else, but additional to it and less important",
    },
    "congresswoman": {
        "definition": "美国国会女议员（尤指众议院议员）",
        "definition_en": "a female member of the U.S. Congress, especially the House of Representatives",
    },
    "stretch": {
        "definition": "延伸；绵延",
        "definition_en": "to spread over an area of land",
    },
    "ayatollah": {
        "definition": "阿亚图拉（伊朗伊斯兰教什叶派宗教领袖）",
        "definition_en": "a religious leader of Shiite Muslims in Iran",
    },
    "emblem": {
        "definition": "（代表国家或组织的）徽章、标记、图案；象征、标志",
        "definition_en": "a design or picture that represents a country or an organization; a symbol of an idea or principle",
    },
    "symptom": {
        "example": "flu symptoms 流感症状",
    },
    "unsubstantiated": {
        "example": "an unsubstantiated claim/rumour 未经证实的说法、传言",
    },
    "teetotal": {
        "example": "He's strictly teetotal. 他绝对是滴酒不沾。",
    },
    "situation room": {
        "example": "Top officials met in the White House situation room. 高层官员在白宫战情室会面。",
    },
    "immigrate": {
        "example": "A Russian-born professor had immigrated to the United States. 一位生于俄罗斯、后来移居美国的教授。",
    },
    "philosophise": {
        "example": "He spent the evening philosophising on the meaning of life. 他整个晚上大谈人生的意义。",
    },
    "feign": {
        "definition": "佯作；假装；装作",
        "definition_en": "to make other people think that you have a feeling, attitude, or physical condition, although this is not true",
    },
    "overconfidence": {
        "definition": "过度自信；盲目自信",
        "definition_en": "excessive confidence in oneself or one's abilities; confidence that is greater than is justified",
        "example": "Overconfidence can lead to poor decisions. 过度自信可能导致错误决策。 · Investors should be wary of overconfidence in rising markets. 投资者应警惕牛市中的盲目自信。",
    },
    "discourage": {
        "definition": "阻拦；阻止；劝阻",
        "definition_en": "to try to prevent something or prevent somebody from doing something, especially by making it difficult or showing that you do not approve",
        "example": "A campaign to discourage smoking among teenagers. 劝阻青少年吸烟的运动。 · I leave a light on when I'm out to discourage burglars. 我出门时开着灯以防夜盗闯入。",
    },
    "prohibit": {
        "definition": "（尤指以法令）禁止",
        "definition_en": "to stop something from being done or used, especially by law",
        "example": "A law prohibiting the sale of alcohol. 禁止售酒的法令。",
    },
    "foreseeable": {
        "definition": "可预料的；可预见的；可预知的",
        "definition_en": "that you can predict will happen; that can be foreseen",
        "example": "Foreseeable risks/consequences. 可预料的危险/后果。",
    },
    "variable": {
        "definition": "多变的；易变的；变化无常的",
        "definition_en": "often changing; likely to change",
        "example": "Variable temperatures. 变化不定的气温。 · The acting is of variable quality. 表演时好时坏。",
    },
    "literate": {
        "definition": "能读会写的",
        "definition_en": "able to read and write",
        "example": "Over one-quarter of the adult population are not fully literate. 四分之一以上的成年人是半文盲。",
    },
    "numerical": {
        "definition": "数字的；用数字表示的",
        "definition_en": "relating to numbers; expressed in numbers",
        "example": "Numerical data. 数字数据。 · The results are expressed in descending numerical order. 结果按数字降序列出。",
    },
    "slide": {
        "definition": "降低；跌落；衰落",
        "definition_en": "a change to a lower or worse condition",
        "example": "A downward slide in the price of oil. 石油价格的下跌。 · The team's slide down the table. 球队排名的下降。",
    },
    "radical": {
        "definition": "根本的；彻底的；完全的",
        "definition_en": "concerning the most basic and important parts of something; thorough and complete",
        "example": "The need for radical changes in education. 对教育进行彻底变革的需要。 · Demands for radical reform of the law. 彻底改变法律的要求。",
    },
    "apprentice": {
        "definition": "学徒；徒弟",
        "definition_en": "a young person who works for an employer for a fixed period of time in order to learn the skills needed in their job",
        "example": "An apprentice electrician/chef. 电工/厨师学徒。",
    },
    "tier": {
        "definition": "级；阶；层；阶层；等级",
        "definition_en": "a row or layer; one of several levels in an organization or system",
        "example": "A wedding cake with three tiers. 三层的结婚蛋糕。 · The seating is arranged in tiers. 座位是一级级排列的。",
    },
}


def suspicious_definition(value: str) -> bool:
    """Reject paragraph translations accidentally captured as word meanings."""
    han_count = len(re.findall(r"[\u4e00-\u9fff]", value))
    sentence_count = len(re.findall(r"[。！？]", value))
    return han_count > 80 or (len(value) > 140 and sentence_count >= 2)


def suspicious_example(value: str) -> bool:
    """Reject article translations accidentally captured as vocabulary examples."""
    han_count = len(re.findall(r"[\u4e00-\u9fff]", value))
    sentence_count = len(re.findall(r"[。！？]", value))
    return han_count > 55 or (len(value) > 180 and sentence_count >= 2)


def extract_vocabulary(text: str) -> list[dict[str, str]]:
    normalized = clean_text(lesson_body(text))
    items: list[dict[str, str]] = []
    seen: set[str] = set()
    for match in VOCAB_PATTERN.finditer(normalized):
        term = re.sub(r"\s+", " ", match.group(1)).strip()
        key = term.lower()
        if key in seen or key.startswith(("page ", "para ")) or len(term) < 2:
            continue
        seen.add(key)
        body = match.group(4).strip()
        definition = body.split("•", 1)[0].strip()
        han = re.search(r"[\u4e00-\u9fff]", definition)
        chinese = definition[han.start():] if han else definition
        english_definition = definition[:han.start()].strip() if han else ""
        example = ""
        if "•" in body:
            example = body.split("•", 1)[1].split("•", 1)[0].strip()
        item = {
            "term": term,
            "pos": match.group(2),
            "phonetic": f"/{match.group(3).strip()}/",
            "definition": chinese[:180],
            "definition_en": english_definition[:220],
            "example": example[:280],
        }
        item.update(VOCAB_CORRECTIONS.get(key, {}))
        if suspicious_definition(item["definition"]):
            raise ValueError(
                f"Suspicious vocabulary definition for {term!r}; "
                "the PDF paragraph translation may have crossed the vocabulary boundary"
            )
        if suspicious_example(item["example"]):
            raise ValueError(
                f"Suspicious vocabulary example for {term!r}; "
                "the PDF paragraph translation may have crossed the vocabulary boundary"
            )
        items.append(item)
    return items


def translation_candidates(segment: str) -> list[str]:
    candidates: list[tuple[int, str]] = []
    for line in segment.splitlines():
        line = clean_text(line)
        han_count = len(re.findall(r"[\u4e00-\u9fff]", line))
        if han_count < 35:
            continue
        if any(token in line for token in (
            "背景补充", "长难句分析", "文章结构", "课后作业", "固定搭配", "语法点",
            "主句", "从句", "主语", "谓语", "宾语", "后置定语", "句式拆解",
        )):
            continue
        if line.count("•") >= 2:
            continue
        candidates.append((han_count, line))
    return [value for _, value in candidates]


def extract_paragraphs(raw: str) -> list[dict[str, str]]:
    full_raw = raw
    raw = lesson_body(raw)
    matches = list(re.finditer(r"Para\.\s*(\d+)", raw))
    originals: list[dict[str, str]] = []
    for index, match in enumerate(matches):
        end = matches[index + 1].start() if index + 1 < len(matches) else len(raw)
        segment = raw[match.end():end]
        for marker in ("背景补充", "长难句分析", "文章结构", "课后作业"):
            marker_pos = segment.find(marker)
            if marker_pos >= 0:
                segment = segment[:marker_pos]
        vocab = VOCAB_PATTERN.search(clean_text(segment))
        english_source = clean_text(segment)
        if vocab:
            english_source = english_source[:vocab.start()]
        first_han = re.search(r"[\u4e00-\u9fff]", english_source)
        if first_han:
            english_source = english_source[:first_han.start()]
        english_source = re.sub(r"^\W+", "", english_source).strip()
        if not english_source:
            continue
        originals.append({
            "number": match.group(1),
            "original": english_source[:2600],
        })
    translation_source = full_raw
    first_para = re.search(r"Para\.\s*1", translation_source)
    if first_para:
        translation_source = translation_source[first_para.start():]
    stop_positions = [
        translation_source.find(marker)
        for marker in ("长难句分析", "文章结构", "课后作业")
    ]
    stop_positions = [position for position in stop_positions if position >= 0]
    if stop_positions:
        translation_source = translation_source[:min(stop_positions)]
    translations = translation_candidates(translation_source)
    if len(translations) < len(originals):
        analysis_start = full_raw.find("长难句分析")
        if analysis_start >= 0:
            analysis_end = full_raw.find("主句翻译", analysis_start)
            if analysis_end < 0:
                analysis_end = full_raw.find("文章结构", analysis_start)
            prefix = full_raw[analysis_start:analysis_end if analysis_end >= 0 else len(full_raw)]
            for candidate in translation_candidates(prefix):
                if candidate not in translations:
                    translations.append(candidate)
    paragraphs: list[dict[str, str]] = []
    for index, item in enumerate(originals):
        translation = translations[index] if index < len(translations) else "本段译文未能从 PDF 中可靠识别，暂不展示推测内容。"
        paragraphs.append({
            "number": item["number"],
            "original": item["original"],
            "translation": translation[:2600],
        })
    return paragraphs


def analysis_blocks(value: str) -> str:
    # Blank lines come from the source PDF layout and define the handout's own
    # visual groups. Preserve line breaks inside each group verbatim.
    blocks = [block.strip() for block in re.split(r"\n\s*\n", value) if block.strip()]
    return "".join(f'<p class="analysis-source-block">{html.escape(block)}</p>' for block in blocks)


def annotate_original(value: str, vocabulary: list[dict[str, str]], seen_terms: set[str]) -> str:
    lookup: dict[str, dict[str, str]] = {}
    terms: list[str] = []
    for item in vocabulary:
        term = item["term"].strip()
        if len(term) < 3 or any(token in term for token in ("/", "...")):
            continue
        lookup[term.lower()] = item
        terms.append(term)
    if not terms:
        return html.escape(value)
    pattern = re.compile(
        r"(?<![A-Za-z])(" + "|".join(re.escape(term) for term in sorted(terms, key=len, reverse=True)) + r")(?![A-Za-z])",
        re.I,
    )
    output: list[str] = []
    cursor = 0
    for match in pattern.finditer(value):
        output.append(html.escape(value[cursor:match.start()]))
        item = lookup.get(match.group(0).lower())
        item_key = item["term"].lower() if item else ""
        if not item or item_key in seen_terms:
            output.append(html.escape(match.group(0)))
        else:
            seen_terms.add(item_key)
            tooltip = f"{item['term']} {item['phonetic']} · {item['definition']}"
            output.append(
                f'<span class="word-tip" tabindex="0">{html.escape(match.group(0))}'
                f'<span class="word-tooltip">{html.escape(tooltip)}</span></span>'
            )
        cursor = match.end()
    output.append(html.escape(value[cursor:]))
    return "".join(output)


def clean_analysis_layout(text: str) -> str:
    lines: list[str] = []
    for raw_line in text.splitlines():
        line = re.sub(r"[ \t]{2,}", " ", raw_line.strip())
        if re.search(r"视频号：\s*贝贝外刊|公众号：\s*一起贝英语", line):
            continue
        if re.fullmatch(r"-\s*\d+\s*-", line):
            continue
        lines.append(line)
    cleaned = "\n".join(lines)
    cleaned = re.sub(r"\n{3,}", "\n\n", cleaned)
    return cleaned.strip()


ANALYSIS_BODY_START = re.compile(
    r"^(?:"
    r"1[.、]\s*"
    r"|第[一二三四五六七八九十]+部分\s*[:：]"
    r"|主句(?:部分)?\s*[:：]"
    r"|整体(?:结构|分析)\s*[:：]"
    r")"
)


def extract_analyses(path: Path) -> list[dict[str, str]]:
    page_sections: list[str] = []
    collecting = False
    with pdfplumber.open(path) as pdf:
        for page in pdf.pages:
            text = page.extract_text(layout=True) or ""
            if not collecting:
                start = text.find("长难句分析")
                if start < 0:
                    continue
                collecting = True
                text = text[start + len("长难句分析"):]
            stop_positions = [position for position in (text.find("文章结构"), text.find("课后作业")) if position >= 0]
            should_stop = bool(stop_positions)
            if should_stop:
                text = text[:min(stop_positions)]
            page_sections.append(clean_analysis_layout(text))
            if should_stop:
                break
    section = clean_analysis_layout("\n\n".join(page_sections))
    markers = list(re.finditer(r"(?m)^(\d+)\.\s+([A-Z].*)$", section))
    results: list[dict[str, str]] = []
    for index, marker in enumerate(markers):
        chunk_end = markers[index + 1].start() if index + 1 < len(markers) else len(section)
        chunk = section[marker.start():chunk_end].strip()
        lines = chunk.splitlines()
        analysis_start = next(
            (
                line_index
                for line_index, line in enumerate(lines[1:], 1)
                if ANALYSIS_BODY_START.match(line.strip())
            ),
            len(lines),
        )
        sentence_lines = [re.sub(r"^\d+\.\s*", "", lines[0]).strip()]
        sentence_lines.extend(line.strip() for line in lines[1:analysis_start] if line.strip())
        sentence = " ".join(sentence_lines)[:1800]
        analysis = "\n".join(lines[analysis_start:]).strip()
        if not analysis or len(sentence) > 1200:
            raise ValueError(
                f"Could not split sentence {marker.group(1)} from its analysis in {path.name}; "
                "the handout may use an unrecognized analysis heading"
            )
        results.append({
            "number": marker.group(1),
            "sentence": sentence,
            "analysis": analysis[:9000],
        })
    return results[:4]


def read_article(path: Path, digest: str | None = None) -> Article:
    reader = PdfReader(str(path))
    pages = [(page.extract_text() or "").replace("\x00", " ") for page in reader.pages]
    raw = "\n".join(pages)
    date = re.search(r"(20\d{6})", path.name).group(1)
    return Article(
        date=date,
        title=title_from_path(path),
        filename=path.name,
        pages=len(reader.pages),
        words=len(clean_text(raw).split()),
        paragraphs=extract_paragraphs(raw),
        vocabulary=extract_vocabulary(raw),
        analyses=extract_analyses(path),
        source_digest=digest or sha256(path),
    )


def cached_article(path: Path, digest: str, force: bool = False) -> tuple[Article, bool]:
    """Load an unchanged parsed issue from cache; return (article, was_reused)."""
    CACHE_DIR.mkdir(parents=True, exist_ok=True)
    cache_path = CACHE_DIR / f"{digest}.json"
    if cache_path.exists() and not force:
        payload = json.loads(cache_path.read_text(encoding="utf-8"))
        article = Article(**payload)
        # Preserve the currently selected source filename when duplicate copies
        # have identical bytes but different names.
        article.filename = path.name
        return article, True
    article = read_article(path, digest)
    cache_path.write_text(
        json.dumps(asdict(article), ensure_ascii=False, indent=2), encoding="utf-8"
    )
    return article, False


def date_label(date: str) -> str:
    return f"{date[:4]}.{date[4:6]}.{date[6:]}"


def write_assets() -> None:
    (OUTPUT_DIR / "days").mkdir(parents=True, exist_ok=True)
    (OUTPUT_DIR / "styles.css").write_text(STYLES, encoding="utf-8")
    (OUTPUT_DIR / "app.js").write_text(APP_JS, encoding="utf-8")


def index_html(articles: list[Article]) -> str:
    cards = []
    for article in reversed(articles):
        preview = article.paragraphs[0]["translation"] if article.paragraphs else "外刊精读讲义"
        cards.append(f"""
        <a class="issue-card" href="days/{article.date}.html">
          <div class="issue-date"><span>{article.date[6:]}</span>{article.date[4:6]} / {article.date[:4]}</div>
          <div class="issue-copy">
            <div class="eyebrow">ISSUE {article.date} · {article.pages} PAGES</div>
            <h2>{html.escape(article.title)}</h2>
            <p>{html.escape(preview[:150])}</p>
            <div class="issue-meta"><span>{len(article.paragraphs)} 段原文</span><span>{len(article.vocabulary)} 个词条</span><span>{len(article.analyses)} 组长难句</span></div>
          </div>
          <span class="issue-arrow" aria-hidden="true">↗</span>
        </a>""")
    return f"""<!doctype html>
<html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>贝贝外刊 · 每日精读档案</title><link rel="stylesheet" href="styles.css"></head>
<body class="archive-page">
  <header class="archive-hero">
    <nav><a class="brand" href="index.html">BEIBEI / 贝贝外刊</a><span>DAILY READING ARCHIVE</span></nav>
    <div class="hero-grid"><div><div class="kicker">外刊不只背单词</div><h1>每日精读<br><em>档案馆</em></h1></div><p class="hero-note">按日期整理原文、中文翻译、难点词汇与长难句结构。每一篇都是一份可回看的阅读档案。</p></div>
    <div class="archive-stats"><span><b>{len(articles)}</b> 期讲义</span><span><b>{sum(len(a.vocabulary) for a in articles)}</b> 个词条</span><span><b>{sum(len(a.paragraphs) for a in articles)}</b> 段精读</span></div>
  </header>
  <main class="archive-main"><div class="section-line"><span>ISSUES / 时间轴</span><span>最新在前</span></div>{''.join(cards)}</main>
  <footer>BEIBEI FOREIGN PRESS NOTES · GENERATED FROM 笔记讲义 PDF</footer>
</body></html>"""


def split_intro_paragraphs(value: str, sentences_per_paragraph: int = 2) -> list[str]:
    value = re.sub(r"\s+", " ", value).strip()
    if not value:
        return []
    explicit = [item.strip() for item in re.split(r"\n\s*\n", value) if item.strip()]
    if len(explicit) > 1:
        return explicit
    uses_cjk_sentence_marks = bool(re.search(r"[。！？]", value))
    if uses_cjk_sentence_marks:
        sentences = re.findall(r"[^。！？]+[。！？]?", value)
    else:
        sentences = re.split(r"(?<=[.!?])\s+(?=[A-Z])", value)
    sentences = [sentence.strip() for sentence in sentences if sentence.strip()]
    if not sentences:
        return [value]
    paragraphs: list[str] = []
    separator = "" if uses_cjk_sentence_marks else " "
    for index in range(0, len(sentences), sentences_per_paragraph):
        paragraphs.append(separator.join(sentences[index:index + sentences_per_paragraph]).strip())
    return paragraphs


def intro_paragraph_html(value: str, *, lang: str | None = None, sentences_per_paragraph: int = 2) -> str:
    lang_attr = f' lang="{html.escape(lang)}"' if lang else ""
    paragraphs = "".join(
        f"<p>{html.escape(paragraph)}</p>"
        for paragraph in split_intro_paragraphs(value, sentences_per_paragraph)
    )
    return f'<div class="intro-copy"{lang_attr}>{paragraphs}</div>'


def daily_html(article: Article, all_articles: list[Article], config: dict) -> str:
    display = config["display"]
    guide = ARTICLE_GUIDES.get(article.date, {
        "background": "本期文章的背景介绍正在整理中。",
        "overview": (
            article.paragraphs[0]["translation"][:360]
            if article.paragraphs else "本期文章内容简介正在整理中。"
        ),
        "pet": "",
    })
    guide = {**guide, **config.get("article_guides", {}).get(article.date, {})}
    pet_html = ""
    if guide.get("pet"):
        pet_html = f"""
          <article class="intro-card pet-card">
            <div class="pet-side"><span>PET</span><strong>B1</strong><small>ADAPTED READING</small></div>
            <div class="pet-copy"><div class="intro-label"><span>03</span> EASIER ENGLISH / 简明改写</div>{intro_paragraph_html(guide['pet'], lang='en', sentences_per_paragraph=2)}<div class="pet-note">基于原文核心信息改写 · 使用 PET / CEFR B1 难度的常用词与较短句式</div></div>
          </article>"""
    introduction_html = f"""
      <section class="reading-introduction" id="introduction">
        <div class="section-heading introduction-heading"><div><span>00</span><h2>阅读导入</h2></div><p>先建立语境，再进入原文。</p></div>
        <div class="introduction-grid">
          <article class="intro-card background-card">
            <div class="intro-label"><span>01</span> CONTEXT / 背景介绍</div>
            <h3>读前先知道</h3>
            {intro_paragraph_html(guide['background'], sentences_per_paragraph=1)}
          </article>
          <article class="intro-card overview-card">
            <div class="intro-label"><span>02</span> ROADMAP / 内容简介</div>
            <h3>文章会讲什么</h3>
            {intro_paragraph_html(guide['overview'], sentences_per_paragraph=1)}
          </article>
{pet_html}
        </div>
      </section>"""
    if not display.get("introduction", True):
        introduction_html = ""
    seen_terms: set[str] = set()
    paragraph_rows: list[str] = []
    for paragraph in article.paragraphs:
        paragraph_rows.append(f"""
      <article class="parallel-row" id="para-{paragraph['number']}">
        <div class="para-no">{int(paragraph['number']):02d}</div>
        <div class="original zoomable-paragraph" tabindex="0" role="button" aria-label="放大查看第 {paragraph['number']} 段原文"><div class="label">ORIGINAL</div><p>{annotate_original(paragraph['original'], article.vocabulary, seen_terms)}</p></div>
        <div class="translation zoomable-paragraph" tabindex="0" role="button" aria-label="放大查看第 {paragraph['number']} 段译文"><div class="label">译文</div><p>{html.escape(paragraph['translation'])}</p></div>
      </article>""")
    paragraph_html = "".join(paragraph_rows)

    vocab_html = "".join(f"""
      <article class="vocab-card"
        data-search="{html.escape((v['term'] + ' ' + v['definition']).lower())}"
        data-word-key="{html.escape(v['term'].lower())}" data-term="{html.escape(v['term'])}"
        data-phonetic="{html.escape(v['phonetic'])}" data-pos="{html.escape(v['pos'])}"
        data-definition="{html.escape(v['definition'])}" data-definition-en="{html.escape(v['definition_en'])}"
        data-example="{html.escape(v['example'])}" data-issue="{article.date}">
        <div class="vocab-head"><div><h3>{html.escape(v['term'])}</h3><span>{html.escape(v['phonetic'])} · {html.escape(v['pos'])}.</span></div><div class="vocab-actions"><button class="favorite-word" type="button" aria-label="收藏 {html.escape(v['term'])}" aria-pressed="false">♡</button><button class="expand-word" type="button" aria-label="放大查看 {html.escape(v['term'])}">↗</button></div></div>
        <p class="definition">{html.escape(v['definition'])}</p>
        {f'<p class="definition-en">{html.escape(v["definition_en"])}</p>' if v['definition_en'] else ''}
        {f'<p class="example">{html.escape(v["example"])}</p>' if v['example'] else ''}
      </article>""" for v in article.vocabulary)

    analysis_html = "".join(f"""
      <article class="analysis-card">
        <div class="analysis-index">SENTENCE {a['number']}</div>
        <blockquote>{html.escape(a['sentence'])}</blockquote>
        <div class="analysis-body">{analysis_blocks(a['analysis'])}</div>
      </article>""" for a in article.analyses)

    issue_options = "".join(
        f'<option value="{item.date}.html" {"selected" if item.date == article.date else ""}>{date_label(item.date)} · {html.escape(item.title[:24])}</option>'
        for item in reversed(all_articles)
    )
    section_specs = [
        ("introduction", "00 阅读导入"),
        ("reading", "01 原文与翻译"),
        ("vocabulary", "02 单词解释"),
        ("analysis", "03 长难句分析"),
    ]
    toc_html = "".join(
        f'<a href="#{key}">{label}</a>'
        for key, label in section_specs if display.get(key, True)
    )
    reading_html = (
        f'<section id="reading"><div class="section-heading"><div><span>01</span><h2>原文与翻译</h2></div><p>左右对照阅读，保留文章论证节奏。</p></div>{paragraph_html}</section>'
        if display.get("reading", True) else ""
    )
    vocabulary_html = (
        f'<section id="vocabulary"><div class="section-heading"><div><span>02</span><h2>单词解释</h2></div><label class="vocab-search">SEARCH <input id="vocab-search" placeholder="输入单词或中文释义"></label></div><div class="vocab-grid" id="vocab-grid">{vocab_html}</div></section>'
        if display.get("vocabulary", True) else ""
    )
    rendered_analysis = analysis_html or '<p class="empty-note">本期未识别到长难句分析。</p>'
    sentence_html = (
        f'<section id="analysis"><div class="section-heading"><div><span>03</span><h2>长难句分析</h2></div><p>从主干到修饰层级，拆开再读。</p></div><div class="analysis-list">{rendered_analysis}</div></section>'
        if display.get("analysis", True) else ""
    )
    return f"""<!doctype html>
<html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>{html.escape(article.title)} · 贝贝外刊</title><link rel="stylesheet" href="../styles.css"></head>
<body class="reader-page" data-issue="{article.date}">
  <header class="reader-header">
    <nav><a class="brand" href="../index.html">← BEIBEI ARCHIVE</a><div class="nav-tools"><button class="favorites-open" type="button">我的收藏 <span id="favorite-count">0</span></button><select id="issue-switch" aria-label="切换日期">{issue_options}</select></div></nav>
    <div class="reader-hero"><div><div class="date-block"><strong>{article.date[6:]}</strong><span>{article.date[4:6]} / {article.date[:4]}</span></div></div><div><div class="eyebrow">DAILY FOREIGN PRESS · ISSUE {article.date}</div><h1>{html.escape(article.title)}</h1><div class="reader-meta"><span>{article.pages} 页</span><span>{len(article.paragraphs)} 段原文</span><span>{len(article.vocabulary)} 个词条</span><span>{len(article.analyses)} 组长难句</span></div></div></div>
  </header>
  <div class="reader-shell">
    <aside class="reader-toc"><div class="toc-title">ON THIS PAGE</div>{toc_html}<div class="progress"><span id="progress-bar"></span></div></aside>
    <main class="reader-main">
{introduction_html}
{reading_html}
{vocabulary_html}
{sentence_html}
    </main>
  </div>
  <div class="reading-modal" id="reading-modal" role="dialog" aria-modal="true" aria-labelledby="reading-modal-title" hidden>
    <article class="reading-modal-card">
      <div class="reading-modal-head"><div><span id="reading-modal-kicker">PARAGRAPH</span><h2 id="reading-modal-title">放大阅读</h2></div><button class="reading-modal-close" type="button" aria-label="关闭放大阅读">×</button></div>
      <p id="reading-modal-content"></p>
    </article>
  </div>
  <div class="word-modal" id="word-modal" role="dialog" aria-modal="true" aria-labelledby="word-modal-title" hidden>
    <article class="word-modal-card">
      <div class="word-modal-head"><div><span id="word-modal-meta">VOCABULARY</span><h2 id="word-modal-title"></h2></div><button class="word-modal-close" type="button" aria-label="关闭单词详情">×</button></div>
      <p class="word-modal-definition" id="word-modal-definition"></p><p class="word-modal-english" id="word-modal-english"></p><p class="word-modal-example" id="word-modal-example"></p>
    </article>
  </div>
  <div class="favorites-modal" id="favorites-modal" role="dialog" aria-modal="true" aria-labelledby="favorites-title" hidden>
    <section class="favorites-panel"><div class="favorites-head"><div><span>PERSONAL WORD BANK</span><h2 id="favorites-title">我的收藏</h2></div><button class="favorites-close" type="button" aria-label="关闭我的收藏">×</button></div><div class="favorites-list" id="favorites-list"></div></section>
  </div>
  <footer>{html.escape(article.filename)}</footer><script src="../app.js"></script>
</body></html>"""


def build(force: bool = False) -> tuple[list[Article], dict]:
    sources, duplicates = discover_note_pdfs()
    articles: list[Article] = []
    reused = 0
    for path, digest in sources:
        article, was_reused = cached_article(path, digest, force=force)
        articles.append(article)
        reused += int(was_reused)
    config = load_site_config()
    write_assets()
    (OUTPUT_DIR / "index.html").write_text(index_html(articles), encoding="utf-8")
    for article in articles:
        (OUTPUT_DIR / "days" / f"{article.date}.html").write_text(
            daily_html(article, articles, config), encoding="utf-8"
        )
    expected_pages = {f"{article.date}.html" for article in articles}
    for stale_page in (OUTPUT_DIR / "days").glob("20??????.html"):
        if stale_page.name not in expected_pages:
            stale_page.unlink()
    manifest = [
        {"date": a.date, "title": a.title, "filename": a.filename,
         "sha256": a.source_digest, "pages": a.pages,
         "paragraphs": len(a.paragraphs), "vocabulary": len(a.vocabulary),
         "analyses": len(a.analyses)}
        for a in articles
    ]
    (OUTPUT_DIR / "manifest.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")
    report = {
        "issues": len(articles),
        "parsed": len(articles) - reused,
        "reused": reused,
        "duplicates_ignored": duplicates,
    }
    return articles, report


def source_snapshot() -> tuple[tuple[str, int, int], ...]:
    files = tuple(
        (str(path), path.stat().st_size, path.stat().st_mtime_ns)
        for path in sorted(SOURCE_DIR.glob("*笔记讲义*.pdf"))
    )
    if SITE_CONFIG_PATH.exists():
        stat = SITE_CONFIG_PATH.stat()
        files += ((str(SITE_CONFIG_PATH), stat.st_size, stat.st_mtime_ns),)
    return files


def print_result(articles: list[Article], report: dict) -> None:
    print(json.dumps({
        **report,
        "articles": [
            {"date": article.date, "title": article.title,
             "paragraphs": len(article.paragraphs),
             "vocabulary": len(article.vocabulary),
             "analyses": len(article.analyses)}
            for article in articles
        ],
    }, ensure_ascii=False, indent=2))


def main() -> None:
    parser = argparse.ArgumentParser(description="增量生成并可持续监控贝贝外刊网页")
    parser.add_argument("--force", action="store_true", help="忽略解析缓存并全量重建")
    parser.add_argument("--watch", action="store_true", help="持续监控下载目录中的新讲义")
    parser.add_argument("--interval", type=float, default=15.0, help="监控轮询秒数（默认 15）")
    args = parser.parse_args()
    articles, report = build(force=args.force)
    print_result(articles, report)
    if not args.watch:
        return
    print(f"Watching {SOURCE_DIR} every {args.interval:g}s; press Ctrl-C to stop.", flush=True)
    last_built = source_snapshot()
    pending: tuple[tuple[str, int, int], ...] | None = None
    while True:
        time.sleep(max(args.interval, 1.0))
        current = source_snapshot()
        if current == last_built:
            pending = None
            continue
        # Require the same changed snapshot twice so a PDF still being copied is
        # never parsed halfway through.
        if pending != current:
            pending = current
            continue
        try:
            articles, report = build()
            print_result(articles, report)
            last_built = current
            pending = None
        except Exception as error:
            print(f"Update failed: {error}", flush=True)


STYLES = r"""
:root{--paper:#f4f5f1;--white:#fff;--ink:#111713;--muted:#647067;--line:#c9d0c9;--red:#e3422b;--green:#164b3b;--head:#e8ede9;--lime:#d8ff5e;--blue:#dcecff;--shadow:0 18px 60px rgba(17,23,19,.1)}*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:var(--paper);color:var(--ink);font-family:"Iowan Old Style","Noto Serif SC","Songti SC",serif}a{color:inherit;text-decoration:none}nav{display:flex;align-items:center;justify-content:space-between;gap:24px;font-family:"Courier New",monospace;font-size:12px;font-weight:700;letter-spacing:.08em}.brand{font-weight:900}.archive-hero,.reader-header{background:var(--head);color:var(--ink);border-bottom:1px solid var(--line);padding:24px max(24px,calc((100vw - 1240px)/2)) 42px}.hero-grid{display:grid;grid-template-columns:1.35fr .65fr;gap:60px;align-items:end;padding:80px 0 55px}.kicker,.eyebrow,.label,.toc-title,.analysis-index{font:800 11px/1.2 "Courier New",monospace;letter-spacing:.13em;text-transform:uppercase}.archive-hero h1{font-size:clamp(64px,9vw,132px);line-height:.78;letter-spacing:0;margin:18px 0 0}.archive-hero h1 em{color:var(--red);font-weight:400}.hero-note{max-width:420px;font-size:20px;line-height:1.7;color:var(--muted);margin:0}.archive-stats{display:flex;gap:12px;flex-wrap:wrap;border-top:1px solid var(--line);padding-top:18px}.archive-stats span{border:1px solid var(--line);padding:10px 14px;font:700 12px "Courier New",monospace}.archive-stats b{color:var(--red);font-size:18px}.archive-main{max-width:1240px;margin:0 auto;padding:56px 24px 90px}.section-line{display:flex;justify-content:space-between;border-bottom:2px solid var(--ink);padding-bottom:10px;margin-bottom:18px;font:800 11px "Courier New",monospace;letter-spacing:.1em}.issue-card{display:grid;grid-template-columns:145px 1fr 46px;gap:32px;align-items:center;padding:30px 10px;border-bottom:1px solid var(--line);transition:.25s ease}.issue-card:hover{background:var(--white);padding-left:22px;box-shadow:var(--shadow)}.issue-date{font:700 13px "Courier New",monospace;color:var(--muted)}.issue-date span{display:block;font:900 64px/1 "Iowan Old Style",serif;color:var(--red)}.issue-copy h2{font-size:clamp(26px,3vw,42px);line-height:1.14;margin:7px 0 10px;max-width:900px}.issue-copy p{color:var(--muted);line-height:1.7;margin:0;max-width:800px}.issue-meta{display:flex;gap:8px;flex-wrap:wrap;margin-top:16px}.issue-meta span,.reader-meta span{padding:6px 9px;background:#e4e8e3;font:700 11px "Courier New",monospace}.issue-arrow{font-size:30px}.reader-header nav select{background:var(--white);color:var(--ink);border:1px solid var(--line);padding:9px 12px;max-width:390px}.reader-hero{display:grid;grid-template-columns:170px 1fr;gap:38px;align-items:end;padding-top:65px}.date-block strong{display:block;font-size:96px;line-height:.8;color:var(--red)}.date-block span{font:700 13px "Courier New",monospace;color:var(--muted)}.reader-hero h1{font-size:clamp(38px,5.2vw,75px);line-height:1.04;margin:12px 0 22px;max-width:980px}.reader-meta{display:flex;gap:8px;flex-wrap:wrap}.reader-meta span{background:var(--white);color:var(--ink);border:1px solid var(--line)}.reader-shell{max-width:1320px;margin:0 auto;display:grid;grid-template-columns:190px minmax(0,1fr);gap:46px;padding:54px 24px 100px}.reader-toc{position:sticky;top:24px;align-self:start;display:grid;gap:5px;font:700 13px "Courier New",monospace}.reader-toc .toc-title{border-bottom:2px solid var(--ink);padding-bottom:10px;margin-bottom:10px}.reader-toc a{padding:10px 0;color:var(--muted)}.reader-toc a:hover{color:var(--red)}.progress{height:3px;background:#d7ddd7;margin-top:16px}.progress span{display:block;width:0;height:100%;background:var(--red)}.reader-main{min-width:0}.reader-main section{scroll-margin-top:24px;margin-bottom:100px}.section-heading{display:flex;align-items:end;justify-content:space-between;gap:30px;border-bottom:3px solid var(--ink);padding-bottom:14px;margin-bottom:24px}.section-heading>div{display:flex;align-items:baseline;gap:14px}.section-heading span{font:900 13px "Courier New",monospace;color:var(--red)}.section-heading h2{font-size:38px;margin:0}.section-heading>p{max-width:330px;color:var(--muted);margin:0;text-align:right}.parallel-row{display:grid;grid-template-columns:54px 1fr 1fr;border-bottom:1px solid var(--line);background:rgba(255,255,255,.45)}.parallel-row:nth-child(odd){background:var(--white)}.para-no{padding:24px 12px;font:900 13px "Courier New",monospace;color:var(--red)}.original,.translation{padding:24px 26px}.original{border-right:1px solid var(--line)}.original p,.translation p{font-size:17px;line-height:1.85;margin:12px 0 0}.translation{background:rgba(220,236,255,.25)}.word-tip{position:relative;text-decoration:underline;text-decoration-color:var(--red);text-decoration-thickness:1.5px;text-underline-offset:4px;cursor:help}.word-tooltip{position:absolute;z-index:20;left:0;bottom:calc(100% + 9px);width:280px;max-width:70vw;padding:12px 14px;background:var(--ink);color:white;font:13px/1.55 "Courier New",monospace;box-shadow:6px 6px 0 var(--red);opacity:0;visibility:hidden;transform:translateY(5px);transition:.16s ease;pointer-events:none}.word-tip:hover .word-tooltip,.word-tip:focus .word-tooltip{opacity:1;visibility:visible;transform:translateY(0)}.label{color:var(--muted)}.vocab-search{font:800 11px "Courier New",monospace;letter-spacing:.1em}.vocab-search input{display:block;margin-top:7px;width:min(300px,75vw);padding:11px 12px;border:1px solid var(--ink);background:white;font:14px "Courier New",monospace}.vocab-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}.vocab-card{background:var(--white);border:1px solid var(--line);padding:20px;min-height:230px;transition:.2s ease}.vocab-card:hover{border-color:var(--ink);transform:translateY(-3px);box-shadow:8px 8px 0 var(--ink)}.vocab-card.known{background:#ecffd0}.vocab-head{display:flex;justify-content:space-between;gap:12px}.vocab-head h3{font-size:24px;line-height:1.05;margin:0}.vocab-head span{display:block;color:var(--muted);font:12px "Courier New",monospace;margin-top:7px}.mark-word{width:32px;height:32px;border:1px solid var(--ink);background:transparent;cursor:pointer}.known .mark-word{background:var(--green);color:white}.definition{font-weight:700;line-height:1.5}.definition-en,.example{font-size:13px;line-height:1.55;color:var(--muted)}.example{border-top:1px dashed var(--line);padding-top:10px}.analysis-list{display:grid;gap:18px}.analysis-card{background:var(--white);color:var(--ink);padding:30px 34px;border:2px solid var(--ink);box-shadow:10px 10px 0 var(--red)}.analysis-index{color:var(--red)}.analysis-card blockquote{font-size:22px;line-height:1.55;margin:14px 0 20px;padding-left:20px;border-left:4px solid var(--red)}.analysis-body{color:var(--ink);line-height:1.75;font-size:15px}.analysis-step{margin:0;padding:12px 0;border-top:1px solid var(--line)}.analysis-step:first-child{border-top:0}.empty-note{padding:30px;border:1px dashed var(--line)}footer{padding:24px;text-align:center;border-top:1px solid var(--line);font:11px "Courier New",monospace;color:var(--muted)}@media(max-width:960px){.hero-grid{grid-template-columns:1fr;padding-top:55px}.reader-shell{grid-template-columns:1fr}.reader-toc{position:relative;top:0;display:flex;flex-wrap:wrap;border-bottom:1px solid var(--line);padding-bottom:16px}.reader-toc .toc-title,.progress{display:none}.vocab-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:680px){.reader-header nav{flex-direction:column;align-items:stretch}.reader-header nav select{width:100%;max-width:100%}.archive-hero h1{font-size:62px}.hero-note{font-size:17px}.issue-card{grid-template-columns:76px 1fr;gap:16px}.issue-date span{font-size:42px}.issue-arrow{display:none}.reader-hero{grid-template-columns:1fr;padding-top:45px}.date-block strong{font-size:64px}.parallel-row{grid-template-columns:38px 1fr}.original,.translation{grid-column:2;padding:20px}.original{border-right:0;border-bottom:1px dashed var(--line)}.para-no{grid-row:1/3}.vocab-grid{grid-template-columns:1fr}.section-heading{align-items:start;flex-direction:column}.section-heading>p{text-align:left}.analysis-card{padding:24px 20px;box-shadow:6px 6px 0 var(--red)}}
.nav-tools{display:flex;align-items:center;gap:10px}.favorites-open{border:1px solid var(--ink);background:var(--white);padding:9px 12px;font:800 11px "Courier New",monospace;letter-spacing:.05em;cursor:pointer}.favorites-open span{display:inline-grid;place-items:center;min-width:20px;height:20px;margin-left:5px;background:var(--red);color:white}.vocab-head{display:flex;justify-content:space-between;align-items:start;gap:14px}.favorite-word{flex:0 0 auto;width:38px;height:38px;border:1px solid var(--ink);background:transparent;color:var(--red);font:26px/1 serif;cursor:pointer}.favorite-word[aria-pressed="true"]{background:var(--red);color:white}.definition-en{font-size:15px;line-height:1.72;color:#46534a}.example{font-size:13px;line-height:1.6}.vocab-card{cursor:zoom-in}.vocab-card:focus-visible{outline:3px solid var(--red);outline-offset:3px}.zoomable-paragraph{position:relative;cursor:zoom-in;transition:background-color .18s ease,box-shadow .18s ease}.zoomable-paragraph::after{content:"↗ 放大";position:absolute;right:14px;top:12px;opacity:0;color:var(--red);font:800 10px/1 "Courier New",monospace;letter-spacing:.08em;transition:opacity .18s ease}.zoomable-paragraph:hover,.zoomable-paragraph:focus-visible{background:#fffaf1;box-shadow:inset 0 0 0 2px var(--red);outline:0}.zoomable-paragraph:hover::after,.zoomable-paragraph:focus-visible::after{opacity:1}.reading-modal[hidden],.word-modal[hidden],.favorites-modal[hidden]{display:none}.reading-modal,.word-modal,.favorites-modal{position:fixed;z-index:100;inset:0;display:grid;place-items:center;padding:28px;background:rgba(17,23,19,.72);backdrop-filter:blur(8px);animation:modal-fade .18s ease}.reading-modal-card,.word-modal-card{width:min(900px,100%);max-height:min(82vh,820px);overflow:auto;background:#fffdf7;border:2px solid var(--ink);box-shadow:14px 14px 0 var(--red);padding:clamp(26px,5vw,58px);animation:modal-rise .22s ease}.reading-modal-head,.word-modal-head,.favorites-head{display:flex;justify-content:space-between;gap:24px;align-items:start;border-bottom:2px solid var(--ink);padding-bottom:18px}.reading-modal-head span,.word-modal-head span,.favorites-head span{color:var(--red);font:800 11px/1.2 "Courier New",monospace;letter-spacing:.13em}.reading-modal-head h2,.word-modal-head h2,.favorites-head h2{font-size:clamp(28px,4vw,46px);margin:8px 0 0}.reading-modal-close,.word-modal-close,.favorites-close{flex:0 0 auto;width:44px;height:44px;border:1px solid var(--ink);background:transparent;color:var(--ink);font:32px/1 "Iowan Old Style",serif;cursor:pointer}.reading-modal-close:hover,.reading-modal-close:focus-visible,.word-modal-close:hover,.word-modal-close:focus-visible,.favorites-close:hover,.favorites-close:focus-visible{background:var(--ink);color:white;outline:0}.reading-modal-card>p{font-size:clamp(20px,2.3vw,28px);line-height:1.9;margin:30px 0 0;white-space:pre-wrap}.word-modal-definition{font-size:clamp(24px,3vw,36px);font-weight:700;line-height:1.5;margin:30px 0 0}.word-modal-english{font-size:clamp(18px,2vw,24px);line-height:1.75;color:#46534a}.word-modal-example{border-top:1px dashed var(--line);padding-top:20px;font-size:17px;line-height:1.7;color:var(--muted)}.favorites-modal{place-items:stretch end;padding:0}.favorites-panel{width:min(620px,100%);height:100%;overflow:auto;background:var(--paper);padding:clamp(24px,5vw,48px);box-shadow:-16px 0 0 var(--red);animation:drawer-in .22s ease}.favorites-list{display:grid;gap:12px;margin-top:24px}.favorite-item{display:grid;grid-template-columns:1fr auto;gap:14px;align-items:center;background:white;border:1px solid var(--line);padding:18px}.favorite-item-main{cursor:zoom-in}.favorite-item h3{font-size:22px;margin:0}.favorite-item p{margin:7px 0 0;color:var(--muted);line-height:1.5}.favorite-remove{width:34px;height:34px;border:1px solid var(--ink);background:transparent;cursor:pointer}.favorites-empty{padding:42px 20px;text-align:center;border:1px dashed var(--line);color:var(--muted)}.modal-open{overflow:hidden}@keyframes modal-fade{from{opacity:0}to{opacity:1}}@keyframes modal-rise{from{transform:translateY(14px);opacity:.6}to{transform:translateY(0);opacity:1}}@keyframes drawer-in{from{transform:translateX(30px);opacity:.7}to{transform:translateX(0);opacity:1}}@media(max-width:680px){.reader-header nav{align-items:stretch}.nav-tools{display:grid;grid-template-columns:1fr}.favorites-open{width:100%}.word-tooltip{position:fixed;left:20px;right:20px;bottom:20px;width:auto;max-width:none}.zoomable-paragraph::after{opacity:.7}.reading-modal,.word-modal{padding:14px}.reading-modal-card,.word-modal-card{max-height:88vh;padding:24px;box-shadow:7px 7px 0 var(--red)}.reading-modal-card>p{font-size:20px;line-height:1.8}.favorites-panel{box-shadow:none}}
.vocab-actions{display:flex;gap:6px}.expand-word{flex:0 0 auto;width:38px;height:38px;border:1px solid var(--ink);background:transparent;color:var(--ink);font:18px/1 "Courier New",monospace;cursor:pointer}.expand-word:hover,.expand-word:focus-visible{background:var(--ink);color:white;outline:0}.analysis-source-block{margin:0;padding:16px 0;border-top:1px solid var(--line);font-size:16px;line-height:1.85;white-space:pre-line}.analysis-source-block:first-child{border-top:0;padding-top:0}
.reading-introduction{position:relative}.introduction-heading{border-bottom-color:var(--red)}.introduction-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}.intro-card{position:relative;min-height:250px;padding:28px 30px;border:1px solid var(--ink);background:var(--white);overflow:hidden}.intro-card::after{content:"";position:absolute;right:-28px;bottom:-28px;width:110px;height:110px;border:1px solid rgba(17,23,19,.13);border-radius:50%}.intro-label{display:flex;align-items:center;gap:9px;color:var(--muted);font:800 10px/1.2 "Courier New",monospace;letter-spacing:.1em}.intro-label span{display:inline-grid;width:25px;height:25px;place-items:center;border-radius:50%;background:var(--ink);color:white}.intro-card h3{font-size:clamp(25px,3vw,37px);line-height:1.1;margin:22px 0 14px}.intro-copy{position:relative;z-index:1;display:grid;gap:12px}.intro-copy p{font-size:17px;line-height:1.9;margin:0}.background-card{background:#fff9e9;box-shadow:7px 7px 0 #efc95d}.overview-card{background:#edf4f0;box-shadow:7px 7px 0 #87aa9d}.pet-card{grid-column:1/-1;display:grid;grid-template-columns:150px 1fr;gap:0;padding:0;background:var(--white);color:var(--ink);border-color:var(--ink);box-shadow:7px 7px 0 #b8c1b9}.pet-card::after{width:240px;height:240px;right:-70px;bottom:-100px;border-color:rgba(17,23,19,.1)}.pet-side{position:relative;z-index:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:30px 20px;border-right:1px solid var(--line);background:#eef1ec;font-family:"Courier New",monospace}.pet-side span{color:var(--red);font-size:31px;font-weight:900;letter-spacing:.08em}.pet-side strong{color:var(--ink);font:400 76px/.9 "Iowan Old Style",serif}.pet-side small{margin-top:16px;text-align:center;color:var(--muted);font-size:9px;line-height:1.4;letter-spacing:.12em}.pet-copy{position:relative;z-index:1;padding:34px 38px}.pet-copy .intro-label{color:var(--muted)}.pet-copy .intro-label span{background:var(--ink);color:white}.pet-copy h3{max-width:700px;color:var(--ink)}.pet-copy .intro-copy{max-width:900px;gap:14px;margin-top:22px}.pet-copy .intro-copy p{color:#46534a;font-family:"Iowan Old Style",Georgia,serif;font-size:18px;line-height:1.9}.pet-note{margin-top:24px;padding-top:14px;border-top:1px solid var(--line);color:var(--muted);font:700 10px/1.5 "Courier New",monospace;letter-spacing:.07em}.reader-main .reading-introduction{margin-bottom:90px}@media(max-width:760px){.introduction-grid{grid-template-columns:1fr}.intro-card{min-height:0;padding:24px 22px}.pet-card{grid-column:auto;grid-template-columns:1fr}.pet-side{align-items:flex-start;border-right:0;border-bottom:1px solid var(--line);padding:20px 24px}.pet-side strong{font-size:54px}.pet-side small{margin-top:7px;text-align:left}.pet-copy{padding:25px 22px}.pet-copy .intro-copy p{font-size:17px;line-height:1.82}}
"""


APP_JS = r"""
const switcher=document.querySelector('#issue-switch');
if(switcher){switcher.addEventListener('change',()=>location.href=switcher.value)}
const search=document.querySelector('#vocab-search');
if(search){search.addEventListener('input',()=>{const query=search.value.trim().toLowerCase();document.querySelectorAll('.vocab-card').forEach(card=>{card.hidden=!card.dataset.search.includes(query)})})}
const progress=document.querySelector('#progress-bar');
if(progress){addEventListener('scroll',()=>{const max=document.documentElement.scrollHeight-innerHeight;progress.style.width=`${max?scrollY/max*100:0}%`},{passive:true})}

const readingModal=document.querySelector('#reading-modal');
if(readingModal){
  const modalTitle=readingModal.querySelector('#reading-modal-title');
  const modalKicker=readingModal.querySelector('#reading-modal-kicker');
  const modalContent=readingModal.querySelector('#reading-modal-content');
  const closeButton=readingModal.querySelector('.reading-modal-close');
  let returnFocus=null;
  function closeReadingModal(){readingModal.hidden=true;document.body.classList.remove('modal-open');if(returnFocus){returnFocus.focus()}}
  function openReadingModal(source){
    const paragraph=source.closest('.parallel-row');
    const number=paragraph?.querySelector('.para-no')?.textContent.trim()||'';
    const label=source.querySelector('.label')?.textContent.trim()||'段落';
    const copy=source.querySelector('p').cloneNode(true);
    copy.querySelectorAll('.word-tooltip').forEach(node=>node.remove());
    modalKicker.textContent=`PARAGRAPH ${number}`;
    modalTitle.textContent=label==='ORIGINAL'?'英文原文':'中文译文';
    modalContent.textContent=copy.textContent.trim();
    returnFocus=source;readingModal.hidden=false;document.body.classList.add('modal-open');closeButton.focus();
  }
  document.querySelectorAll('.zoomable-paragraph').forEach(source=>{
    source.addEventListener('click',event=>{if(!event.target.closest('.word-tip'))openReadingModal(source)});
    source.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();openReadingModal(source)}});
  });
  closeButton.addEventListener('click',closeReadingModal);
  readingModal.addEventListener('click',event=>{if(event.target===readingModal)closeReadingModal()});
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!readingModal.hidden)closeReadingModal()});
}

const favoriteStorageKey='beibei-favorites-v1';
let favorites={};
try{favorites=JSON.parse(localStorage.getItem(favoriteStorageKey)||'{}')||{}}catch(error){favorites={}}
const wordModal=document.querySelector('#word-modal');
const favoritesModal=document.querySelector('#favorites-modal');
const favoriteCount=document.querySelector('#favorite-count');
let wordReturnFocus=null;
let favoritesReturnFocus=null;

function wordFromCard(card){return {key:card.dataset.wordKey,term:card.dataset.term,phonetic:card.dataset.phonetic,pos:card.dataset.pos,definition:card.dataset.definition,definitionEn:card.dataset.definitionEn,example:card.dataset.example,issue:card.dataset.issue}}
function saveFavorites(){localStorage.setItem(favoriteStorageKey,JSON.stringify(favorites));syncFavoriteButtons();renderFavorites()}
function syncFavoriteButtons(){
  if(favoriteCount){favoriteCount.textContent=Object.keys(favorites).length}
  document.querySelectorAll('.favorite-word').forEach(button=>{
    const key=button.closest('.vocab-card').dataset.wordKey;
    const selected=Boolean(favorites[key]);
    button.setAttribute('aria-pressed',String(selected));button.textContent=selected?'♥':'♡';
    button.setAttribute('aria-label',`${selected?'取消收藏':'收藏'} ${button.closest('.vocab-card').dataset.term}`);
  });
}
function toggleFavorite(card){const word=wordFromCard(card);if(favorites[word.key]){delete favorites[word.key]}else{favorites[word.key]=word}saveFavorites()}

function closeWordModal(){if(!wordModal)return;wordModal.hidden=true;document.body.classList.remove('modal-open');if(wordReturnFocus){wordReturnFocus.focus()}}
function openWordModal(word,source){
  if(!wordModal)return;wordReturnFocus=source||null;
  wordModal.querySelector('#word-modal-title').textContent=word.term;
  wordModal.querySelector('#word-modal-meta').textContent=`${word.phonetic} · ${word.pos}. · ISSUE ${word.issue}`;
  wordModal.querySelector('#word-modal-definition').textContent=word.definition;
  wordModal.querySelector('#word-modal-english').textContent=word.definitionEn;
  const example=wordModal.querySelector('#word-modal-example');example.textContent=word.example;example.hidden=!word.example;
  wordModal.hidden=false;document.body.classList.add('modal-open');wordModal.querySelector('.word-modal-close').focus();
}

document.querySelectorAll('.vocab-card').forEach(card=>{
  card.addEventListener('click',event=>{if(!event.target.closest('.vocab-actions'))openWordModal(wordFromCard(card),card)});
  card.querySelector('.favorite-word').addEventListener('click',event=>{event.stopPropagation();toggleFavorite(card)});
  card.querySelector('.expand-word').addEventListener('click',event=>{event.stopPropagation();openWordModal(wordFromCard(card),event.currentTarget)});
});
if(wordModal){
  wordModal.querySelector('.word-modal-close').addEventListener('click',closeWordModal);
  wordModal.addEventListener('click',event=>{if(event.target===wordModal)closeWordModal()});
}

function renderFavorites(){
  const list=document.querySelector('#favorites-list');if(!list)return;list.replaceChildren();
  const words=Object.values(favorites).sort((a,b)=>a.term.localeCompare(b.term));
  if(!words.length){const empty=document.createElement('p');empty.className='favorites-empty';empty.textContent='还没有收藏单词。点击词卡右上角的爱心即可加入。';list.append(empty);return}
  words.forEach(word=>{
    const item=document.createElement('article');item.className='favorite-item';
    const main=document.createElement('div');main.className='favorite-item-main';main.tabIndex=0;main.setAttribute('role','button');main.setAttribute('aria-label',`放大查看 ${word.term}`);
    const title=document.createElement('h3');title.textContent=word.term;const definition=document.createElement('p');definition.textContent=word.definition;main.append(title,definition);
    const remove=document.createElement('button');remove.className='favorite-remove';remove.type='button';remove.textContent='×';remove.setAttribute('aria-label',`取消收藏 ${word.term}`);
    function openFavoriteWord(){favoritesModal.hidden=true;openWordModal(word,favoritesOpen)}
    main.addEventListener('click',openFavoriteWord);main.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();openFavoriteWord()}});
    remove.addEventListener('click',()=>{delete favorites[word.key];saveFavorites()});item.append(main,remove);list.append(item);
  });
}
function closeFavoritesModal(){if(!favoritesModal)return;favoritesModal.hidden=true;document.body.classList.remove('modal-open');if(favoritesReturnFocus){favoritesReturnFocus.focus()}}
const favoritesOpen=document.querySelector('.favorites-open');
if(favoritesModal&&favoritesOpen){
  favoritesOpen.addEventListener('click',()=>{favoritesReturnFocus=favoritesOpen;renderFavorites();favoritesModal.hidden=false;document.body.classList.add('modal-open');favoritesModal.querySelector('.favorites-close').focus()});
  favoritesModal.querySelector('.favorites-close').addEventListener('click',closeFavoritesModal);
  favoritesModal.addEventListener('click',event=>{if(event.target===favoritesModal)closeFavoritesModal()});
}
document.addEventListener('keydown',event=>{if(event.key==='Escape'){if(wordModal&&!wordModal.hidden){closeWordModal()}else if(favoritesModal&&!favoritesModal.hidden){closeFavoritesModal()}}});
syncFavoriteButtons();renderFavorites();
"""


if __name__ == "__main__":
    main()
