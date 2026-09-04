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
ANALYSIS_HEADINGS = ("长难句分析", "中英文互译")
POST_READING_HEADINGS = (*ANALYSIS_HEADINGS, "文章结构", "课后作业")
POS_PATTERN = r"(?:n|v|adj|adv|phr|conj|exclamation)(?:\.,\s*(?:n|v|adj|adv|phr|conj|exclamation))*"


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
    "20260630": {
        "background": (
            "这篇文章把中美人工智能竞争放在日常生活、国家战略和地缘政治三个层面来观察。"
            "美国舆论常把 AI 竞赛理解为谁先创造出超级智能，关注芯片、算力、人才和尖端模型。"
            "文章中的中国视角则更强调“人工智能作为基础设施”：它不是一个遥远的神话目标，而是被嵌入外卖、交通、教育、医疗、城市治理和供应链中的实用系统。"
        ),
        "overview": (
            "文章先用作者在中国生活中的 AI 场景开篇：幼儿园照片识别、外卖系统、刷脸进站和无人驾驶出租车。"
            "随后，作者对比中美两种 AI 路线：美国追求最强大的超级智能，中国则在严格监管下推动 A.I.+，把 AI 扩散到公共服务和产业体系。"
            "后半部分进一步说明，中国希望用 AI 改善农村教育、医疗、养老、极端天气应对和绿色能源转型，同时把整套 AI 管理方案输出到全球市场。"
            "文章的核心判断是：美国也许会率先发射“超级智能飞船”，但中国可能先把 AI 变成地球上可运行的基础设施。"
        ),
        "pet": (
            "The article compares the way China and the United States think about artificial intelligence. In the United States, many leaders believe the country must win the AI race against China. They often focus on chips, talent, power grids and the dream of building superintelligence. "
            "The writer says China is moving in a different direction. In China, AI is already part of daily life. It helps identify children in school photos, supports food delivery, and appears in trains, taxis and city systems. This can feel uncomfortable because it includes surveillance, but it is also convenient. "
            "China’s strategy is called A.I.+. It treats AI like infrastructure. The government wants cheap and useful AI tools to spread through public services. AI may help rural students learn, help doctors diagnose diseases, support elderly care, predict extreme weather and improve green energy systems. "
            "The article also says China can export this approach. Instead of selling only one product, China may sell whole systems: energy, transport, telecoms, surveillance and AI management. Other countries may buy these solutions because they are practical and good enough. "
            "The main message is that America may still build the most powerful AI first. But China may use AI more deeply in ordinary life, hospitals, schools and roads. This difference matters for the future of global power."
        ),
    },
    "20260902": {
        "background": (
            "这篇文章把蒂姆·库克卸任苹果 CEO 放在“创始人之后，公司如何继续伟大”的问题中观察。"
            "乔布斯代表产品神话、个人魅力和颠覆性创新，而库克代表供应链、运营、资本回报和政治谈判能力。"
            "文章要学生先意识到：一家科技公司的长期成功不只靠天才产品，也靠可复制的系统、稳定的管理和穿越政治风险的能力。"
        ),
        "overview": (
            "文章开头承认库克长期活在乔布斯阴影下，没有黑色高领衫、传奇气质和英雄叙事。"
            "随后作者反转这一常见看法：库克任内苹果市值增长十倍，营收和利润增长四倍，并成为全球资本主义中的超级巨头。"
            "中段通过道格拉斯飞机、宝丽来和数字设备公司等案例说明，很多创始人离开后企业都会衰落，库克让苹果避开了这种命运。"
            "后半部分强调库克的真正能力在于运营、供应链、谈判和制度化管理，尤其是在关税压力下保护苹果核心业务。"
            "结尾认为，苹果能从乔布斯式直觉转向可传承的商业系统，正是库克更深层的成就。"
        ),
        "pet": (
            "The article says that many people still see Steve Jobs as the hero of Apple. Jobs had a strong personal style, big ideas and a dramatic life story. Tim Cook never had the same image. He looked quieter and less exciting. "
            "However, the writer argues that Cook may have been the real genius at Apple. During his time as CEO, Apple’s market value grew ten times. Its revenue and profits also grew strongly. Cook did not only sell old products. He turned Apple into one of the most powerful companies in the world. "
            "The article compares Apple with other famous companies. Some companies were successful when their founders were in charge, but they became weaker after the founders left. This shows that keeping a company strong after a great founder is very difficult. "
            "Cook’s strengths were different from Jobs’s. He understood operations, supply chains and negotiation. He also handled political pressure, including high tariffs from the Trump administration. Instead of fighting loudly, he made promises to invest in the United States and protected Apple’s business. "
            "The main message is that a company needs more than one visionary leader. It also needs systems that can continue for many years. Jobs made Apple famous. Cook helped make Apple last."
        ),
    },
    "20260903": {
        "background": (
            "这篇文章围绕美国国防部长皮特·赫格塞思执掌五角大楼后的争议展开。"
            "赫格塞思曾是电视主持人，军事和国防政策履历有限，却因对特朗普的忠诚获得重用。"
            "文章要求读者先理解一个核心背景：国防部不是普通行政部门，它牵涉军队战备、联盟体系、国会政治、地区战争和全球战略；"
            "一旦领导者把个人忠诚置于专业能力之上，组织失灵就可能迅速变成国家安全风险。"
        ),
        "overview": (
            "文章开头把任命赫格塞思称为一场“豪赌”，指出他正在以忠诚度为标准清洗军官和文职高官，陆军部长丹·德里斯科尔也因此辞职。"
            "随后作者批评赫格塞思缺乏管理庞大国防体系所需的专业能力，并在特朗普对伊朗动武问题上迎合“快速胜利”的幻想。"
            "中段进一步列举五角大楼的乱象：军方警告伊朗行动无法无限期维持、国防部暗中招募网络红人、战略资源被中东战事牵扯。"
            "结尾把赫格塞思塑造成只会保住职位、却无法真正领导军队的人，认为美国军队和民众正在为这种无能付出代价。"
        ),
        "pet": (
            "The article says that choosing Pete Hegseth as U.S. secretary of defense was a very risky decision. Hegseth used to be a television host and did not have much experience in national security or defense policy. The writer says he got the job mainly because he was loyal to Donald Trump. "
            "After taking office, Hegseth began removing officers and civilian officials from the Pentagon. The article says these people were not removed because they were bad at their jobs. They were removed because Hegseth thought they were not loyal enough to him. One important official, Army Secretary Dan Driscoll, resigned after disagreements with him. "
            "The writer argues that the Defense Department is a huge and complicated organization. A good defense secretary must understand the defense industry, alliances, Congress and military planning. Hegseth, in the writer’s view, does not understand these things well enough. "
            "The article also criticizes his support for Trump’s attack on Iran. Other senior officials warned that the war could cause serious problems, but Hegseth supported the idea of a quick victory. Later, the U.S. military had trouble keeping up with the conflict. "
            "The main message is that loyalty is not enough for such an important job. If a leader cares more about personal loyalty than professional advice, the army and the country may pay a serious price."
        ),
    },
    "20260904": {
        "background": (
            "这篇文章围绕“成功人士是否真的靠单打独斗”展开。作者安吉拉·达克沃思以自己和母亲在海上遇险的经历开场，"
            "把“求助”从软弱、依赖或丢脸的行为，重新解释为一种关键能力。文章也借用了美国文化中常见的 rugged individualism，"
            "也就是“强悍个人主义”背景：许多人习惯把成功讲成个人意志、天赋和坚持的胜利，却忽略背后的教练、同事、助理、家人和救援者。"
        ),
        "overview": (
            "文章先讲作者和 86 岁母亲在大西洋浮潜时被海流冲走，真正救命的不是独自对抗洋流，而是及时呼救和接受专业救援。"
            "随后作者把这一经验转向个人成长和职业成功：在生死危机中人们懂得求助，但在学习、工作和事业中，很多人反而把求助视为羞耻。"
            "中段通过尼古拉·坦根、柯南·奥布莱恩、史蒂芬·柯维等例子说明，高成就者往往会把成功归功于一群支持者。"
            "文章的核心观点是：真正厉害的人并不是不需要帮助，而是知道何时、如何向合适的人求助，并愿意承认自己站在很多人的支持之上。"
        ),
        "pet": (
            "The article begins with a dangerous story. The writer and her 86-year-old mother were snorkeling near Miami when the ocean current carried them away from the boat. Her mother breathed in water and lost consciousness. The writer tried hard to pull her mother back, but she could not fight the sea alone. "
            "Then she changed her plan. She kept her mother’s head above water and shouted for help. Rescuers came and saved them. This experience taught her that asking for help can be a smart and brave action. "
            "The writer then talks about success in ordinary life. Many people in America admire strong individualism. They like stories about one person working hard and winning alone. But the writer says this story is often false. Successful people usually have many people behind them. "
            "She gives examples of leaders, writers and speakers who depended on assistants, colleagues, teachers and friends. These helpers may not be famous, but their work is very important. "
            "The main message is simple: strong people do not do everything alone. They know when they need help, and they are not afraid to ask for it. If we want to grow, we should learn to build good support around us."
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
    value = re.sub(r"(?:-\s*)?\d+\s*-\s*视频号：贝贝外刊\s*公众号：一起贝英语", " ", value)
    value = re.sub(r"(?<=[a-z])\s+\d{1,2}\s*-\s+(?=[a-z])", " ", value)
    value = re.sub(r"视频号：贝贝外刊|公众号：一起贝英语", " ", value)
    value = re.sub(r"扫码听音频|领课程资料", " ", value)
    value = re.sub(r"\s+", " ", value)
    return value.strip()


def lesson_body(raw: str) -> str:
    stop_positions = [raw.find(marker) for marker in POST_READING_HEADINGS]
    stop_positions = [position for position in stop_positions if position >= 0]
    body = raw[:min(stop_positions)] if stop_positions else raw
    return re.sub(
        r"背景补充[:：]?.*?(?=Para\.\s*\d+|长难句分析|中英文互译|文章结构|课后作业|$)",
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
    rf"({POS_PATTERN})\.\s*/([^/]{{1,90}})/\s*"
    r"(.*?)(?=\s+[A-Za-z][A-Za-z’' /-]{1,52}?\s+"
    rf"{POS_PATTERN}\.\s*/|\s+Para\.\s*\d+|"
    r"\s+长难句分析|\s+中英文互译|\s+文章结构|\s+课后作业|$)",
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
        "example": "The ayatollah issued a statement on the political crisis. 这位阿亚图拉就这场政治危机发表了声明。",
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
    "grocery": {
        "definition": "食品杂货；日用品（通常用复数 groceries）",
        "definition_en": "food and other everyday items sold in a supermarket or grocery store",
        "example": "I need to buy some groceries after work. 我下班后需要买些食品杂货。 · Grocery prices have risen sharply this year. 食品杂货价格今年大幅上涨。",
    },
    "terror": {
        "definition": "惊恐；恐惧；惊骇",
        "definition_en": "a feeling of extreme fear",
        "example": "A feeling of sheer/pure terror. 胆战心惊。 · Her eyes were wild with terror. 她的眼睛里充满了恐惧。",
    },
    "embed": {
        "definition": "把……牢牢地嵌入（或插入、埋入）",
        "definition_en": "to fix something firmly into a substance or solid object",
        "example": "An operation to remove glass that was embedded in his leg. 取出扎入他腿部玻璃的手术。 · The bullet embedded itself in the wall. 子弹射进了墙里。",
    },
    "subsidy": {
        "definition": "补贴；补助金；津贴",
        "definition_en": "money paid by a government or an organization to reduce costs so prices can be kept low",
        "example": "Agricultural subsidies. 农业补贴。 · To reduce the level of subsidy. 降低补贴标准。",
    },
    "triumph": {
        "definition": "巨大成功；重大成就；伟大胜利；凯旋",
        "definition_en": "a great success, achievement or victory; the feeling of joy from success",
        "example": "One of the greatest triumphs of modern science. 现代科学最重大的成就之一。 · The winning team returned home in triumph. 球队凯旋而归。",
    },
    "practically": {
        "definition": "几乎；实际上；实际地",
        "definition_en": "almost, but not completely or exactly; in a practical way",
        "example": "He had known the old man practically all his life. 他几乎从小就认识那位老人。 · The course is more practically based. 这门课程更注重实际。",
    },
    "dodge": {
        "definition": "闪开；躲开；避开",
        "definition_en": "to move quickly to avoid someone or something; to avoid a problem",
        "example": "He ran across the road, dodging the traffic. 他躲开来往车辆跑过马路。 · Apple helped dodge the tariffs. 苹果帮助避开了关税。",
    },
    "subunit": {
        "definition": "子单位；分支机构；组成部分",
        "definition_en": "a smaller unit that forms part of a larger organization, system, or structure",
        "example": "Each subunit operates independently but reports to the main office. 每个子单位独立运营，但向总部汇报。",
    },
    "careen": {
        "definition": "失控地疾驶；向前猛冲",
        "definition_en": "to rush forward in an uncontrollable way",
        "example": "He stood to one side as they careened past him. 他们在他身边猛冲而过，他赶紧让到一边。",
    },
    "casualty": {
        "definition": "死伤者；受害者",
        "definition_en": "a person injured or killed in war or an accident; a person or thing that suffers because of an event",
        "example": "Troops fired on the demonstrators causing many casualties. 军队向示威的人群开火，造成不少伤亡。",
    },
    "mechanic": {
        "definition": "运作方式",
        "definition_en": "the way in which a process, system, or activity works or is done",
        "example": "What are the mechanics of this new process? 这一新工序的运作方式是什么？",
    },
    "fantasy": {
        "definition": "幻想；想象",
        "definition_en": "a pleasant situation that you imagine but that is unlikely to happen",
        "example": "His childhood fantasies about becoming a famous football player. 他儿时想成为著名足球运动员的幻想。",
    },
    "dysfunction": {
        "definition": "异常；机能障碍；功能不良",
        "definition_en": "abnormal behaviour or relationships; a physical problem in which part of the body does not work properly",
        "example": "His severe emotional dysfunction was very clearly apparent. 他情绪的严重异常是显而易见的。",
    },
    "reorientation": {
        "definition": "重新定位；重新调整方向；重新规划",
        "definition_en": "the process of changing the direction, focus, or priorities of something",
        "example": "The company is undergoing a major reorientation of its business strategy. 这家公司正在对其经营战略进行重大调整。",
    },
    "strain": {
        "definition": "压力；重负；重压之下出现的问题或担忧",
        "definition_en": "pressure on someone or something because there is too much to do or manage",
        "example": "Their marriage is under great strain at the moment. 眼下他们的婚姻关系非常紧张。",
    },
    "strip": {
        "definition": "剥离；除去；剥夺",
        "definition_en": "to remove something that covers something; to take something away",
        "example": "After Mike left for work I stripped the beds and vacuumed the carpets. 迈克去上班后，我揭下了床罩并吸了地毯。",
    },
    "pay the price": {
        "definition": "付出代价；承担后果",
        "definition_en": "to suffer the negative consequences of something, especially something done in the past",
        "example": "The company is now paying the price for years of poor management. 这家公司如今正在为多年的糟糕管理付出代价。",
    },
    "off-track": {
        "definition": "偏离轨道的；脱离正轨地；进展不顺的",
        "definition_en": "not making progress in the expected or correct way; no longer following the planned course",
        "example": "The project has gone off-track due to budget problems. 由于预算问题，这个项目已经偏离了原定计划。",
    },
    "grasp": {
        "definition": "抓紧；理解；领会",
        "definition_en": "to take a firm hold of something; to understand something completely",
        "example": "He grasped my hand and shook it warmly. 他热情地抓住我的手握了起来。",
    },
    "hard-line": {
        "definition": "强硬的；坚定的；不妥协的",
        "definition_en": "having very fixed beliefs and being unlikely or unwilling to change them",
        "example": "A hard-line conservative. 坚定的保守派。",
    },
    "banish": {
        "definition": "放逐；驱逐；赶走；消除",
        "definition_en": "to order someone to leave a place as a punishment; to make someone or something go away",
        "example": "He was banished to Australia, where he died five years later. 他被流放到澳大利亚，五年后在那里去世。",
    },
    "kremlin": {
        "definition": "克里姆林宫；俄罗斯中央政府",
        "definition_en": "the government buildings in Moscow; the central government of Russia",
        "example": "A two-hour meeting in the Kremlin. 一场在克里姆林宫召开的两小时会议。",
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


def strip_leading_paragraph_translation(definition: str) -> str:
    """Drop a paragraph translation accidentally mixed into a dictionary definition.

    Some PDFs extract text in visual rather than reading order. A vocabulary heading
    can therefore be followed by the previous paragraph's Chinese translation, then
    by the real English+Chinese dictionary definition. In other cases the paragraph
    translation lands in the middle of a Chinese gloss.
    """
    if not suspicious_definition(definition):
        return definition
    match = re.search(
        r"(?:^|[。！？][”’\"']?\s+)([A-Za-z][^。！？•]{8,220}[\u4e00-\u9fff][^。！？•]{0,80})\s*$",
        definition,
    )
    if match:
        return match.group(1).strip()
    stripped = re.sub(
        r"(?<=[\u4e00-\u9fff；;])\s+[\u4e00-\u9fff][^•]{40,}[。！？]\s+(?=[\u4e00-\u9fff])",
        "",
        definition,
    )
    stripped = re.sub(r"(?<=[\u4e00-\u9fff])\s+(?=[\u4e00-\u9fff])", "", stripped)
    return stripped.strip()


def strip_embedded_paragraph_translation_from_example(example: str) -> str:
    """Keep the first real bilingual example when a paragraph translation follows it."""
    if not suspicious_example(example):
        return example
    match = re.match(r"(.{20,180}?[\u4e00-\u9fff][。！？])\s+[\u4e00-\u9fff].*", example)
    return match.group(1).strip() if match else example


def split_definition_languages(definition: str) -> tuple[str, str]:
    """Split English and Chinese glosses without dropping Chinese parentheses."""
    han = re.search(r"[\u4e00-\u9fff]", definition)
    if not han:
        return definition, ""
    chinese_start = han.start()
    if chinese_start > 0 and definition[chinese_start - 1] in "（(":
        chinese_start -= 1
    chinese = definition[chinese_start:].strip()
    english_definition = definition[:chinese_start].strip()
    return chinese, english_definition


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
        definition = strip_leading_paragraph_translation(body.split("•", 1)[0].strip())
        chinese, english_definition = split_definition_languages(definition)
        example = ""
        if "•" in body:
            example = strip_embedded_paragraph_translation_from_example(
                body.split("•", 1)[1].split("•", 1)[0].strip()
            )
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
            "背景补充", "长难句分析", "中英文互译", "文章结构", "课后作业", "固定搭配", "语法点",
            "主句", "从句", "主语", "谓语", "宾语", "后置定语", "句式拆解",
        )):
            continue
        if re.search(r"\bPara\.\s*\d+", line):
            continue
        if re.match(r"^\d+[.、]\s*", line):
            continue
        if re.search(r"^[\u4e00-\u9fff]{2,12}\s*[（(][A-Za-z .+-]+[）)]\s*[A-Za-z]", line):
            continue
        if len(line) > 520 and len(re.findall(r"\s\d+[.、]\s*", line)) >= 2:
            continue
        if line.count("•") >= 2:
            continue
        candidates.append((han_count, line))
    return [value for _, value in candidates]


def recover_english_after_leading_translation(value: str) -> str:
    """Some handouts put the Chinese translation before the English paragraph."""
    if not re.match(r"^[\u4e00-\u9fff]", value):
        return value
    for candidate in re.finditer(r"\b[A-Z][A-Za-z0-9$%’'(),;:\-–—\s]{20,}[.!?]", value):
        tail = value[candidate.start():].strip()
        if len(re.findall(r"[\u4e00-\u9fff]", tail[:260])) <= 8:
            return tail
    return value


def extract_paragraphs(raw: str) -> list[dict[str, str]]:
    full_raw = raw
    raw = lesson_body(raw)
    matches = list(re.finditer(r"Para\.\s*(\d+)", raw))
    originals: list[dict[str, str]] = []
    for index, match in enumerate(matches):
        end = matches[index + 1].start() if index + 1 < len(matches) else len(raw)
        segment = raw[match.end():end]
        for marker in ("背景补充", *POST_READING_HEADINGS):
            marker_pos = segment.find(marker)
            if marker_pos >= 0:
                segment = segment[:marker_pos]
        vocab = VOCAB_PATTERN.search(clean_text(segment))
        english_source = clean_text(segment)
        if vocab:
            english_source = english_source[:vocab.start()]
        english_source = recover_english_after_leading_translation(english_source)
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
        for marker in POST_READING_HEADINGS
    ]
    stop_positions = [position for position in stop_positions if position >= 0]
    if stop_positions:
        translation_source = translation_source[:min(stop_positions)]
    translations = translation_candidates(translation_source)
    if len(translations) < len(originals):
        analysis_start = next(
            (position for position in (full_raw.find(marker) for marker in ANALYSIS_HEADINGS) if position >= 0),
            -1,
        )
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


def vocabulary_aliases(term: str) -> set[str]:
    """Return conservative surface forms that should point to one vocab item.

    The PDF vocabulary usually lists the base form, while the article often uses
    inflected forms such as appointees/circumlocutions/banished/careening.  Keep
    this intentionally small so we do not turn unrelated words into tooltips.
    """
    normalized = re.sub(r"\s+", " ", term.strip())
    lower = normalized.lower()
    aliases = {lower}
    if "-" in lower:
        aliases.add(lower.replace("-", ""))
        aliases.add(lower.replace("-", " "))
    if " " in lower or "/" in lower or "..." in lower:
        return aliases
    if len(lower) < 4:
        return aliases
    aliases.add(f"{lower}s")
    if lower.endswith(("s", "sh", "ch", "x", "z")):
        aliases.add(f"{lower}es")
    if lower.endswith("y") and len(lower) > 4 and lower[-2] not in "aeiou":
        aliases.add(f"{lower[:-1]}ies")
        aliases.add(f"{lower[:-1]}ied")
    elif lower.endswith("e"):
        aliases.add(f"{lower}d")
        aliases.add(f"{lower[:-1]}ing")
    else:
        aliases.add(f"{lower}ed")
        aliases.add(f"{lower}ing")
    if re.search(r"[^aeiou][aeiou][^aeiouwxy]$", lower):
        aliases.add(f"{lower}{lower[-1]}ed")
        aliases.add(f"{lower}{lower[-1]}ing")
    return aliases


def annotate_original(value: str, vocabulary: list[dict[str, str]], seen_terms: set[str]) -> str:
    lookup: dict[str, dict[str, str]] = {}
    terms: list[str] = []
    for item in vocabulary:
        term = item["term"].strip()
        if len(term) < 3 or any(token in term for token in ("/", "...")):
            continue
        for alias in vocabulary_aliases(term):
            lookup.setdefault(alias, item)
            terms.append(alias)
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
                starts = [
                    (position, heading)
                    for heading in ANALYSIS_HEADINGS
                    for position in [text.find(heading)]
                    if position >= 0
                ]
                if not starts:
                    continue
                start, heading = min(starts)
                collecting = True
                text = text[start + len(heading):]
            stop_positions = [position for position in (text.find("文章结构"), text.find("课后作业")) if position >= 0]
            should_stop = bool(stop_positions)
            if should_stop:
                text = text[:min(stop_positions)]
            page_sections.append(clean_analysis_layout(text))
            if should_stop:
                break
    section = clean_analysis_layout("\n\n".join(page_sections))
    markers = [
        marker
        for marker in re.finditer(r"(?m)^(\d+)\.\s+([A-Z].*)$", section)
        if "【" not in marker.group(2) and not re.search(r"[\u4e00-\u9fff]", marker.group(2))
    ]
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
    is_book_mode = True
    body_class = "reader-page eagle-style book-mode"
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
        <div class="original"><div class="label">ORIGINAL</div><p>{annotate_original(paragraph['original'], article.vocabulary, seen_terms)}</p></div>
        <div class="translation"><div class="label">译文</div><p>{html.escape(paragraph['translation'])}</p></div>
      </article>""")
    paragraph_html = "".join(paragraph_rows)

    vocab_cards = [f"""
      <article class="vocab-card"
        data-search="{html.escape((v['term'] + ' ' + v['definition']).lower())}"
        data-word-key="{html.escape(v['term'].lower())}" data-term="{html.escape(v['term'])}"
        data-phonetic="{html.escape(v['phonetic'])}" data-pos="{html.escape(v['pos'])}"
        data-definition="{html.escape(v['definition'])}" data-definition-en="{html.escape(v['definition_en'])}"
        data-example="{html.escape(v['example'])}" data-issue="{article.date}">
        <div class="vocab-head"><div><h3>{html.escape(v['term'])}</h3><span>{html.escape(v['phonetic'])} · {html.escape(v['pos'])}.</span></div><div class="vocab-actions"><button class="favorite-word" type="button" aria-label="收藏 {html.escape(v['term'])}" aria-pressed="false">♡</button></div></div>
        <p class="definition">{html.escape(v['definition'])}</p>
        {f'<p class="definition-en">{html.escape(v["definition_en"])}</p>' if v['definition_en'] else ''}
        {f'<p class="example">{html.escape(v["example"])}</p>' if v['example'] else ''}
      </article>""" for v in article.vocabulary]
    vocab_html = "".join(vocab_cards)

    analysis_cards = [f"""
      <article class="analysis-card">
        <div class="analysis-index">SENTENCE {a['number']}</div>
        <blockquote>{html.escape(a['sentence'])}</blockquote>
        <div class="analysis-body">{analysis_blocks(a['analysis'])}</div>
      </article>""" for a in article.analyses]
    analysis_html = "".join(analysis_cards)

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
    reading_direction = "横向滑动阅读，一段一页。" if is_book_mode else "左右对照阅读，保留文章论证节奏。"
    reading_content = (
        f'<div class="reading-carousel" aria-label="原文与译文横向阅读">{paragraph_html}</div>'
        if is_book_mode else paragraph_html
    )
    reading_html = (
        f'<section id="reading"><div class="section-heading"><div><span>01</span><h2>原文与翻译</h2></div><p>{reading_direction}</p></div>{reading_content}</section>'
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
    main_class = "reader-main"
    if is_book_mode:
        main_class = "reader-main book-main"
        book_toc_links = ['<a href="#introduction">封面导入</a>']
        book_pages = []
        if display.get("introduction", True):
            book_pages.append(f"""
      <section class="book-page book-cover book-intro-page reading-introduction" id="introduction">
        <div class="book-page-kicker">OPENING 01 / 02</div>
        <div class="introduction-grid">
          <article class="intro-card overview-card">
            <div class="intro-label"><span>01</span> ROADMAP / 内容简介</div>
            {intro_paragraph_html(guide['overview'], sentences_per_paragraph=1)}
          </article>
        </div>
      </section>""")
            if guide.get("pet"):
                book_pages.append(f"""
      <section class="book-page book-cover book-intro-page reading-introduction" id="introduction-pet">
        <div class="book-page-kicker">OPENING 02 / 02</div>
        <div class="introduction-grid">
{pet_html}
        </div>
      </section>""")
        if display.get("reading", True):
            book_toc_links.append('<a href="#reading">段落翻页</a>')
            for index, row in enumerate(paragraph_rows, start=1):
                book_pages.append(f"""
      <section class="book-page book-reading-page" id="reading{'-' + str(index) if index > 1 else ''}">
        <div class="book-page-kicker">PARAGRAPH {index:02d} / {len(paragraph_rows):02d}</div>
        {row}
      </section>""")
        if display.get("vocabulary", True):
            book_toc_links.append('<a href="#vocabulary">词汇卡片</a>')
            for page_index, card in enumerate(vocab_cards, start=1):
                grid_id = ' id="vocab-grid"' if page_index == 1 else ""
                book_pages.append(f"""
      <section class="book-page book-vocab-page" id="vocabulary{'-' + str(page_index) if page_index > 1 else ''}">
        <div class="book-page-kicker">VOCABULARY {page_index:02d} / {len(vocab_cards):02d}</div>
        <div class="vocab-grid"{grid_id}>{card}</div>
      </section>""")
        if display.get("analysis", True):
            book_toc_links.append('<a href="#analysis">长难句</a>')
            analysis_chunks = analysis_cards or ['<p class="empty-note">本期未识别到长难句分析。</p>']
            for page_index, card in enumerate(analysis_chunks, start=1):
                book_pages.append(f"""
      <section class="book-page book-analysis-page" id="analysis{'-' + str(page_index) if page_index > 1 else ''}">
        <div class="book-page-kicker">SENTENCE STUDY {page_index:02d} / {len(analysis_chunks):02d}</div>
        <div class="analysis-list">{card}</div>
      </section>""")
        toc_html = "".join(book_toc_links)
        introduction_html = ""
        reading_html = ""
        vocabulary_html = ""
        sentence_html = "".join(book_pages)
    return f"""<!doctype html>
<html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>{html.escape(article.title)} · 贝贝外刊</title><link rel="stylesheet" href="../styles.css"></head>
<body class="{body_class}" data-issue="{article.date}">
  <header class="reader-header">
    <nav><a class="brand" href="../index.html">← BEIBEI ARCHIVE</a><h1 class="reader-nav-title">{html.escape(article.title)}</h1><div class="nav-tools"><button class="favorites-open" type="button">我的收藏 <span id="favorite-count">0</span></button><select id="issue-switch" aria-label="切换日期">{issue_options}</select></div></nav>
    <div class="reader-hero"><div><div class="date-block"><strong>{article.date[6:]}</strong><span>{article.date[4:6]} / {article.date[:4]}</span></div></div><div><div class="eyebrow">DAILY FOREIGN PRESS · ISSUE {article.date}</div><h1>{html.escape(article.title)}</h1><div class="reader-meta"><span>{article.pages} 页</span><span>{len(article.paragraphs)} 段原文</span><span>{len(article.vocabulary)} 个词条</span><span>{len(article.analyses)} 组长难句</span></div></div></div>
  </header>
  <div class="reader-shell">
    <aside class="reader-toc"><div class="toc-title">ON THIS PAGE</div>{toc_html}<div class="progress"><span id="progress-bar"></span></div></aside>
    <main class="{main_class}">
{introduction_html}
{reading_html}
{vocabulary_html}
{sentence_html}
    </main>
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
.nav-tools{display:flex;align-items:center;gap:10px}.favorites-open{border:1px solid var(--ink);background:var(--white);padding:9px 12px;font:800 11px "Courier New",monospace;letter-spacing:.05em;cursor:pointer}.favorites-open span{display:inline-grid;place-items:center;min-width:20px;height:20px;margin-left:5px;background:var(--red);color:white}.vocab-head{display:flex;justify-content:space-between;align-items:start;gap:14px}.favorite-word{flex:0 0 auto;width:38px;height:38px;border:1px solid var(--ink);background:transparent;color:var(--red);font:26px/1 serif;cursor:pointer}.favorite-word[aria-pressed="true"]{background:var(--red);color:white}.definition-en{font-size:15px;line-height:1.72;color:#46534a}.example{font-size:13px;line-height:1.6}.favorites-modal[hidden]{display:none}.favorites-modal{position:fixed;z-index:100;inset:0;display:grid;background:rgba(17,23,19,.72);backdrop-filter:blur(8px)}.favorites-head{display:flex;justify-content:space-between;gap:24px;align-items:start;border-bottom:2px solid var(--ink);padding-bottom:18px}.favorites-head span{color:var(--red);font:800 11px/1.2 "Courier New",monospace;letter-spacing:.13em}.favorites-head h2{font-size:clamp(28px,4vw,46px);margin:8px 0 0}.favorites-close{flex:0 0 auto;width:44px;height:44px;border:1px solid var(--ink);background:transparent;color:var(--ink);font:32px/1 "Iowan Old Style",serif;cursor:pointer}.favorites-close:hover,.favorites-close:focus-visible{background:var(--ink);color:white;outline:0}.favorites-modal{place-items:stretch end;padding:0}.favorites-panel{width:min(620px,100%);height:100%;overflow:auto;background:var(--paper);padding:clamp(24px,5vw,48px);box-shadow:-16px 0 0 var(--red);animation:drawer-in .22s ease}.favorites-list{display:grid;gap:12px;margin-top:24px}.favorite-item{display:grid;grid-template-columns:1fr auto;gap:14px;align-items:center;background:white;border:1px solid var(--line);padding:18px}.favorite-item h3{font-size:22px;margin:0}.favorite-item p{margin:7px 0 0;color:var(--muted);line-height:1.5}.favorite-remove{width:34px;height:34px;border:1px solid var(--ink);background:transparent;cursor:pointer}.favorites-empty{padding:42px 20px;text-align:center;border:1px dashed var(--line);color:var(--muted)}.modal-open{overflow:hidden}@keyframes drawer-in{from{transform:translateX(30px);opacity:.7}to{transform:translateX(0);opacity:1}}@media(max-width:680px){.reader-header nav{align-items:stretch}.nav-tools{display:grid;grid-template-columns:1fr}.favorites-open{width:100%}.word-tooltip{position:fixed;left:20px;right:20px;bottom:20px;width:auto;max-width:none}.favorites-panel{box-shadow:none}}
.vocab-actions{display:flex;gap:6px}.analysis-source-block{margin:0;padding:16px 0;border-top:1px solid var(--line);font-size:16px;line-height:1.85;white-space:pre-line}.analysis-source-block:first-child{border-top:0;padding-top:0}.reading-carousel{display:contents}
.reading-introduction{position:relative}.introduction-heading{border-bottom-color:var(--red)}.introduction-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}.intro-card{position:relative;min-height:250px;padding:28px 30px;border:1px solid var(--ink);background:var(--white);overflow:hidden}.intro-card::after{content:"";position:absolute;right:-28px;bottom:-28px;width:110px;height:110px;border:1px solid rgba(17,23,19,.13);border-radius:50%}.intro-label{display:flex;align-items:center;gap:9px;color:var(--muted);font:800 10px/1.2 "Courier New",monospace;letter-spacing:.1em}.intro-label span{display:inline-grid;width:25px;height:25px;place-items:center;border-radius:50%;background:var(--ink);color:white}.intro-card h3{font-size:clamp(25px,3vw,37px);line-height:1.1;margin:22px 0 14px}.intro-copy{position:relative;z-index:1;display:grid;gap:12px}.intro-copy p{font-size:17px;line-height:1.9;margin:0}.background-card{background:#fff9e9;box-shadow:7px 7px 0 #efc95d}.overview-card{background:#edf4f0;box-shadow:7px 7px 0 #87aa9d}.pet-card{grid-column:1/-1;display:grid;grid-template-columns:150px 1fr;gap:0;padding:0;background:var(--white);color:var(--ink);border-color:var(--ink);box-shadow:7px 7px 0 #b8c1b9}.pet-card::after{width:240px;height:240px;right:-70px;bottom:-100px;border-color:rgba(17,23,19,.1)}.pet-side{position:relative;z-index:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:30px 20px;border-right:1px solid var(--line);background:#eef1ec;font-family:"Courier New",monospace}.pet-side span{color:var(--red);font-size:31px;font-weight:900;letter-spacing:.08em}.pet-side strong{color:var(--ink);font:400 76px/.9 "Iowan Old Style",serif}.pet-side small{margin-top:16px;text-align:center;color:var(--muted);font-size:9px;line-height:1.4;letter-spacing:.12em}.pet-copy{position:relative;z-index:1;padding:34px 38px}.pet-copy .intro-label{color:var(--muted)}.pet-copy .intro-label span{background:var(--ink);color:white}.pet-copy h3{max-width:700px;color:var(--ink)}.pet-copy .intro-copy{max-width:900px;gap:14px;margin-top:22px}.pet-copy .intro-copy p{color:#46534a;font-family:"Iowan Old Style",Georgia,serif;font-size:18px;line-height:1.9}.pet-note{margin-top:24px;padding-top:14px;border-top:1px solid var(--line);color:var(--muted);font:700 10px/1.5 "Courier New",monospace;letter-spacing:.07em}.reader-main .reading-introduction{margin-bottom:90px}@media(max-width:760px){.introduction-grid{grid-template-columns:1fr}.intro-card{min-height:0;padding:24px 22px}.pet-card{grid-column:auto;grid-template-columns:1fr}.pet-side{align-items:flex-start;border-right:0;border-bottom:1px solid var(--line);padding:20px 24px}.pet-side strong{font-size:54px}.pet-side small{margin-top:7px;text-align:left}.pet-copy{padding:25px 22px}.pet-copy .intro-copy p{font-size:17px;line-height:1.82}}
.reader-page.eagle-style{--paper:#faf6ee;--white:#fffdf8;--ink:#1f2a24;--muted:#6f756d;--line:#e2d6c3;--red:#b45a34;--green:#496f5c;--head:#f4eadc;--shadow:0 24px 80px rgba(63,49,32,.1);background:radial-gradient(circle at 12% 4%,rgba(180,90,52,.1),transparent 25rem),linear-gradient(180deg,#fbf4e8 0%,#faf6ee 34%,#fffdf8 100%);font-family:Georgia,"Times New Roman","Noto Serif SC","Songti SC",serif}.reader-page.eagle-style::before{content:"";position:fixed;inset:0;z-index:-1;pointer-events:none;background-image:linear-gradient(rgba(31,42,36,.035) 1px,transparent 1px);background-size:100% 34px}.reader-page.eagle-style .reader-header{max-width:1120px;margin:26px auto 0;padding:24px clamp(22px,5vw,62px) 78px;border:1px solid var(--line);border-radius:34px;background:linear-gradient(135deg,#fffaf1 0%,#f4eadc 100%);box-shadow:var(--shadow)}.reader-page.eagle-style nav{font-family:Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;letter-spacing:.02em;text-transform:none}.reader-page.eagle-style .brand{padding:9px 14px;border:1px solid var(--line);border-radius:999px;background:rgba(255,253,248,.72)}.reader-page.eagle-style .favorites-open,.reader-page.eagle-style .reader-header nav select{border:1px solid var(--line);border-radius:999px;background:rgba(255,253,248,.78);box-shadow:none;font-family:Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;letter-spacing:0}.reader-page.eagle-style .reader-hero{grid-template-columns:1fr;gap:26px;max-width:880px;margin:0 auto;padding-top:84px;text-align:center}.reader-page.eagle-style .reader-hero>div:first-child{order:2}.reader-page.eagle-style .date-block{display:inline-grid;grid-template-columns:auto auto;align-items:center;gap:12px;padding:9px 16px;border:1px solid var(--line);border-radius:999px;background:rgba(255,253,248,.75)}.reader-page.eagle-style .date-block strong{font-size:24px;line-height:1;color:var(--red)}.reader-page.eagle-style .date-block span{font-family:Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;font-size:12px;color:var(--muted)}.reader-page.eagle-style .eyebrow{font-family:Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;font-size:12px;letter-spacing:.18em;color:var(--red)}.reader-page.eagle-style .reader-hero h1{margin:18px auto 28px;max-width:900px;font-size:clamp(40px,6vw,86px);line-height:1.05;font-weight:500;letter-spacing:-.045em;color:#223027}.reader-page.eagle-style .reader-meta{justify-content:center}.reader-page.eagle-style .reader-meta span{border:1px solid var(--line);border-radius:999px;background:#fffdf8;color:var(--muted);font-family:Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;font-weight:600}.reader-page.eagle-style .reader-shell{max-width:1180px;grid-template-columns:160px minmax(0,820px);justify-content:center;gap:48px;padding-top:64px}.reader-page.eagle-style .reader-toc{font-family:Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;font-size:13px;font-weight:600}.reader-page.eagle-style .reader-toc .toc-title{border-bottom:1px solid var(--line);color:#9b6149;letter-spacing:.16em}.reader-page.eagle-style .reader-toc a{border-radius:999px;padding:9px 12px}.reader-page.eagle-style .reader-toc a:hover{background:#fff2df;color:var(--red)}.reader-page.eagle-style .progress{border-radius:999px;background:#eadbc7}.reader-page.eagle-style .reader-main section{margin-bottom:74px}.reader-page.eagle-style .section-heading{display:block;border-bottom:0;margin-bottom:22px;padding-bottom:0;text-align:center}.reader-page.eagle-style .section-heading>div{justify-content:center;gap:10px}.reader-page.eagle-style .section-heading span{font-family:Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:var(--red)}.reader-page.eagle-style .section-heading h2{font-size:clamp(30px,4vw,46px);font-weight:500;letter-spacing:-.03em}.reader-page.eagle-style .section-heading>p{max-width:none;margin:9px auto 0;text-align:center;font-size:15px}.reader-page.eagle-style .introduction-heading{border-bottom:0}.reader-page.eagle-style .introduction-grid{grid-template-columns:1fr;gap:18px}.reader-page.eagle-style .intro-card,.reader-page.eagle-style .pet-card{border:1px solid var(--line);border-radius:28px;background:#fffdf8;box-shadow:0 18px 55px rgba(63,49,32,.08);overflow:hidden}.reader-page.eagle-style .intro-card{min-height:0;padding:34px 38px}.reader-page.eagle-style .intro-card::after{display:none}.reader-page.eagle-style .intro-label{font-family:Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:#9b6149;letter-spacing:.12em}.reader-page.eagle-style .intro-label span{background:#f1dfc8;color:var(--red)}.reader-page.eagle-style .intro-card h3{margin-top:18px;font-size:clamp(28px,4vw,45px);font-weight:500;letter-spacing:-.035em}.reader-page.eagle-style .intro-copy p{font-size:18px;line-height:1.95;color:#34423a}.reader-page.eagle-style .pet-card{display:block;padding:34px 38px}.reader-page.eagle-style .pet-side{display:none}.reader-page.eagle-style .pet-copy{padding:0}.reader-page.eagle-style .pet-copy .intro-copy{max-width:none;margin-top:18px}.reader-page.eagle-style .pet-copy .intro-copy p{font-size:19px;line-height:1.9;color:#34423a}.reader-page.eagle-style .pet-note{border-top:1px solid var(--line);font-family:Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:var(--muted)}.reader-page.eagle-style .parallel-row{grid-template-columns:64px minmax(0,1fr);margin-bottom:18px;border:1px solid var(--line);border-radius:26px;background:#fffdf8;box-shadow:0 16px 48px rgba(63,49,32,.06);overflow:hidden}.reader-page.eagle-style .para-no{grid-row:1/3;padding:28px 16px;background:#f3e4d0;color:var(--red);font-family:Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;text-align:center}.reader-page.eagle-style .original,.reader-page.eagle-style .translation{grid-column:2;padding:30px 34px}.reader-page.eagle-style .original{border-right:0;border-bottom:1px solid var(--line)}.reader-page.eagle-style .translation{background:#fcf7ef}.reader-page.eagle-style .label,.reader-page.eagle-style .analysis-index{font-family:Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;letter-spacing:.16em;color:#9b6149}.reader-page.eagle-style .original p,.reader-page.eagle-style .translation p{font-size:19px;line-height:2;margin-top:14px;color:#29352f}.reader-page.eagle-style .translation p{color:#4c564f}.reader-page.eagle-style .word-tip{text-decoration-color:#d08a62;text-underline-offset:5px}.reader-page.eagle-style .word-tooltip{border-radius:16px;background:#223027;box-shadow:0 14px 30px rgba(31,42,36,.18);font-family:Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}.reader-page.eagle-style .vocab-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}.reader-page.eagle-style .vocab-card{border:1px solid var(--line);border-radius:24px;background:#fffdf8;box-shadow:0 14px 42px rgba(63,49,32,.06);min-height:220px}.reader-page.eagle-style .vocab-card:hover{border-color:#d4b997;transform:translateY(-3px);box-shadow:0 20px 52px rgba(63,49,32,.11)}.reader-page.eagle-style .vocab-head h3{font-size:26px;font-weight:500;letter-spacing:-.02em}.reader-page.eagle-style .vocab-head span,.reader-page.eagle-style .definition-en,.reader-page.eagle-style .example,.reader-page.eagle-style .vocab-search{font-family:Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}.reader-page.eagle-style .favorite-word{border-color:var(--line);border-radius:999px;background:#fbf2e5}.reader-page.eagle-style .analysis-card{border:1px solid var(--line);border-radius:28px;background:#fffdf8;box-shadow:0 18px 55px rgba(63,49,32,.08);padding:34px 38px}.reader-page.eagle-style .analysis-card blockquote{border-left:0;padding-left:0;font-size:24px;line-height:1.7;color:#29352f}.reader-page.eagle-style .analysis-source-block{border-top:1px solid var(--line);font-size:16px;line-height:1.9;color:#405047}.reader-page.eagle-style footer{border-top:1px solid var(--line);font-family:Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}@media(max-width:960px){.reader-page.eagle-style .reader-header{margin:0;border-left:0;border-right:0;border-radius:0}.reader-page.eagle-style .reader-shell{grid-template-columns:1fr;max-width:900px}.reader-page.eagle-style .reader-toc{display:flex}.reader-page.eagle-style .reader-toc a{background:#fffdf8}.reader-page.eagle-style .vocab-grid{grid-template-columns:1fr}}@media(max-width:680px){.reader-page.eagle-style .reader-hero{text-align:left}.reader-page.eagle-style .reader-meta{justify-content:flex-start}.reader-page.eagle-style .section-heading{text-align:left}.reader-page.eagle-style .section-heading>div{justify-content:flex-start}.reader-page.eagle-style .section-heading>p{text-align:left}.reader-page.eagle-style .intro-card,.reader-page.eagle-style .pet-card{padding:26px 22px;border-radius:22px}.reader-page.eagle-style .parallel-row{grid-template-columns:46px minmax(0,1fr);border-radius:20px}.reader-page.eagle-style .original,.reader-page.eagle-style .translation{padding:24px 22px}.reader-page.eagle-style .original p,.reader-page.eagle-style .translation p{font-size:17px;line-height:1.9}.reader-page.eagle-style .analysis-card{padding:26px 22px;border-radius:22px}}
@media (min-width:900px){.reader-page.eagle-style .reader-header{width:calc(100vw - 32px);margin:16px auto 0;padding:18px 30px 48px;border-radius:26px}.reader-page.eagle-style nav{gap:14px}.reader-page.eagle-style .reader-header nav select{max-width:310px}.reader-page.eagle-style .reader-hero{max-width:760px;padding-top:48px;gap:18px}.reader-page.eagle-style .reader-hero h1{font-size:clamp(42px,5.2vw,58px);line-height:1.08;margin:12px auto 18px;letter-spacing:-.035em}.reader-page.eagle-style .reader-meta span{padding:5px 8px;font-size:10px}.reader-page.eagle-style .reader-shell{max-width:100vw;grid-template-columns:112px minmax(0,1fr);gap:22px;padding:34px 18px 78px}.reader-page.eagle-style .reader-toc{top:14px;font-size:12px;gap:4px}.reader-page.eagle-style .reader-toc .toc-title{font-size:10px;margin-bottom:6px}.reader-page.eagle-style .reader-toc a{padding:8px 9px}.reader-page.eagle-style .reader-main{min-width:0}.reader-page.eagle-style .reader-main section{margin-bottom:54px}.reader-page.eagle-style .section-heading{margin-bottom:16px}.reader-page.eagle-style #reading .section-heading::after{content:"横向滑动阅读 · 一段一页";display:inline-flex;margin-top:10px;padding:6px 12px;border:1px solid var(--line);border-radius:999px;background:#fffdf8;color:#9b6149;font:600 12px/1 Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}.reader-page.eagle-style .section-heading h2{font-size:34px}.reader-page.eagle-style .section-heading>p{font-size:13px;margin-top:5px}.reader-page.eagle-style .intro-card,.reader-page.eagle-style .pet-card{border-radius:22px;padding:24px 28px}.reader-page.eagle-style .intro-card h3{font-size:32px;margin:12px 0 10px}.reader-page.eagle-style .intro-copy p,.reader-page.eagle-style .pet-copy .intro-copy p{font-size:16px;line-height:1.72}.reader-page.eagle-style .reading-carousel{display:grid;grid-auto-flow:column;grid-auto-columns:100%;gap:18px;overflow-x:auto;overscroll-behavior-x:contain;scroll-snap-type:x mandatory;scroll-padding-inline:0;padding:4px 2px 22px;-webkit-overflow-scrolling:touch}.reader-page.eagle-style .reading-carousel::-webkit-scrollbar{height:10px}.reader-page.eagle-style .reading-carousel::-webkit-scrollbar-track{background:#eadbc7;border-radius:999px}.reader-page.eagle-style .reading-carousel::-webkit-scrollbar-thumb{background:#c77b52;border:2px solid #eadbc7;border-radius:999px}.reader-page.eagle-style .parallel-row{scroll-snap-align:start;scroll-snap-stop:always;grid-template-columns:46px minmax(0,1fr) minmax(0,1fr);min-height:calc(100vh - 198px);max-height:610px;margin-bottom:0;border-radius:22px}.reader-page.eagle-style .para-no{grid-row:1;padding:20px 8px}.reader-page.eagle-style .original,.reader-page.eagle-style .translation{grid-row:1;grid-column:auto;padding:24px 24px;overflow:auto}.reader-page.eagle-style .original{border-right:1px solid var(--line);border-bottom:0}.reader-page.eagle-style .translation{background:#fcf7ef}.reader-page.eagle-style .original p,.reader-page.eagle-style .translation p{font-size:17px;line-height:1.78;margin-top:10px}.reader-page.eagle-style .vocab-grid{grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}.reader-page.eagle-style .vocab-card{min-height:195px;padding:17px;border-radius:20px}.reader-page.eagle-style .vocab-head h3{font-size:22px}.reader-page.eagle-style .definition{font-size:14px}.reader-page.eagle-style .definition-en,.reader-page.eagle-style .example{font-size:12px;line-height:1.45}.reader-page.eagle-style .analysis-card{border-radius:22px;padding:26px 30px}.reader-page.eagle-style .analysis-card blockquote{font-size:20px;line-height:1.58}.reader-page.eagle-style .analysis-source-block{font-size:14px;line-height:1.72}}
@media (min-width:900px){.reader-page.book-mode{height:100vh;overflow:hidden}.reader-page.book-mode .reader-header{position:fixed;z-index:30;top:14px;left:16px;right:16px;width:auto;max-width:none;height:148px;margin:0;padding:16px 24px;border-radius:26px}.reader-page.book-mode .reader-header nav{height:34px}.reader-page.book-mode .reader-hero{display:grid;grid-template-columns:auto minmax(0,1fr);align-items:end;gap:18px;max-width:none;padding-top:16px;text-align:left}.reader-page.book-mode .reader-hero>div:first-child{order:0}.reader-page.book-mode .date-block{grid-template-columns:1fr;padding:8px 14px}.reader-page.book-mode .reader-hero h1{font-size:clamp(26px,3.2vw,44px);line-height:1.05;margin:6px 0 10px;max-width:980px}.reader-page.book-mode .reader-meta{justify-content:flex-start}.reader-page.book-mode .reader-shell{height:100vh;max-width:100vw;grid-template-columns:118px minmax(0,1fr);gap:18px;padding:176px 18px 18px}.reader-page.book-mode .reader-toc{top:176px;height:calc(100vh - 194px);align-content:start;padding:12px;border:1px solid var(--line);border-radius:20px;background:rgba(255,253,248,.7);backdrop-filter:blur(10px)}.reader-page.book-mode .reader-toc a{padding:9px 8px}.reader-page.book-mode .progress{display:block;margin-top:auto}.reader-page.book-mode .reader-main.book-main{display:grid;grid-auto-flow:column;grid-auto-columns:calc(100vw - 174px);gap:20px;height:calc(100vh - 194px);overflow-x:auto;overflow-y:hidden;scroll-snap-type:x mandatory;overscroll-behavior-x:contain;scroll-padding-inline:0;padding:0 2px 14px;-webkit-overflow-scrolling:touch}.reader-page.book-mode .book-main::-webkit-scrollbar{height:11px}.reader-page.book-mode .book-main::-webkit-scrollbar-track{background:#eadbc7;border-radius:999px}.reader-page.book-mode .book-main::-webkit-scrollbar-thumb{background:#c77b52;border:2px solid #eadbc7;border-radius:999px}.reader-page.book-mode .book-page{scroll-snap-align:start;scroll-snap-stop:always;height:100%;margin:0;padding:24px 28px;overflow:auto;border:1px solid var(--line);border-radius:28px;background:rgba(255,253,248,.92);box-shadow:0 18px 55px rgba(63,49,32,.08)}.reader-page.book-mode .book-page-kicker{margin-bottom:12px;color:#9b6149;font:700 12px/1 Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;letter-spacing:.16em}.reader-page.book-mode .book-page .section-heading{position:sticky;top:0;z-index:3;margin:-24px -28px 18px;padding:18px 28px 12px;background:linear-gradient(180deg,#fffdf8 74%,rgba(255,253,248,.86));border-bottom:1px solid var(--line);text-align:left}.reader-page.book-mode .book-page .section-heading>div{justify-content:flex-start}.reader-page.book-mode .book-page .section-heading>p{text-align:left}.reader-page.book-mode #reading .section-heading::after{content:none}.reader-page.book-mode .book-cover .introduction-grid{grid-template-columns:repeat(3,minmax(0,1fr));align-items:stretch}.reader-page.book-mode .book-cover .intro-card,.reader-page.book-mode .book-cover .pet-card{padding:22px;border-radius:22px}.reader-page.book-mode .book-cover .pet-card{display:block}.reader-page.book-mode .book-cover .intro-card h3{font-size:28px}.reader-page.book-mode .book-cover .intro-copy p,.reader-page.book-mode .book-cover .pet-copy .intro-copy p{font-size:15px;line-height:1.68}.reader-page.book-mode .book-reading-page{padding:0;overflow:hidden}.reader-page.book-mode .book-reading-page .book-page-kicker{position:absolute;z-index:5;margin:18px 0 0 72px;padding:7px 12px;border:1px solid var(--line);border-radius:999px;background:#fffdf8}.reader-page.book-mode .book-reading-page .parallel-row{height:100%;min-height:0;max-height:none;border:0;border-radius:0;box-shadow:none;grid-template-columns:56px minmax(0,1fr);grid-template-rows:minmax(0,1fr) minmax(0,1fr)}.reader-page.book-mode .book-reading-page .para-no{display:flex;align-items:center;justify-content:center;grid-row:1/3;height:100%;padding:0 10px}.reader-page.book-mode .book-reading-page .original,.reader-page.book-mode .book-reading-page .translation{grid-column:2;height:100%;padding:58px 42px 28px;overflow:auto}.reader-page.book-mode .book-reading-page .original{border-right:0;border-bottom:1px solid var(--line)}.reader-page.book-mode .book-reading-page .translation{background:#fcf7ef}.reader-page.book-mode .book-reading-page .original p,.reader-page.book-mode .book-reading-page .translation p{font-size:clamp(18px,1.45vw,23px);line-height:1.82}.reader-page.book-mode .book-vocab-page{display:grid;grid-template-rows:auto minmax(0,1fr);overflow:hidden}.reader-page.book-mode .book-vocab-page .vocab-grid{display:grid;grid-template-columns:minmax(0,1fr);height:100%;align-items:stretch}.reader-page.book-mode .book-vocab-page .vocab-card{display:flex;flex-direction:column;justify-content:center;min-height:0;height:100%;padding:clamp(34px,5vw,70px);border-radius:26px}.reader-page.book-mode .book-vocab-page .vocab-head h3{font-size:clamp(52px,7vw,104px);letter-spacing:-.045em}.reader-page.book-mode .book-vocab-page .vocab-head span{font-size:clamp(16px,1.5vw,22px);margin-top:14px}.reader-page.book-mode .book-vocab-page .definition{font-size:clamp(26px,2.7vw,42px);line-height:1.38;margin:28px 0 12px}.reader-page.book-mode .book-vocab-page .definition-en{font-size:clamp(18px,1.65vw,25px);line-height:1.55;color:#435349}.reader-page.book-mode .book-vocab-page .example{margin-top:26px;padding-top:20px;font-size:clamp(15px,1.3vw,20px);line-height:1.65}.reader-page.book-mode .book-vocab-page .favorite-word{width:48px;height:48px}.reader-page.book-mode .book-analysis-page .analysis-card{box-shadow:none;border:0;padding:6px 0;background:transparent}.reader-page.book-mode .book-analysis-page .analysis-card blockquote{font-size:clamp(20px,1.7vw,26px)}}
@media (min-width:900px){.reader-page.book-mode .reader-header{height:164px}.reader-page.book-mode .reader-hero{align-items:center;padding-top:12px}.reader-page.book-mode .reader-hero h1{max-width:1120px;font-size:clamp(22px,2.35vw,34px);line-height:1.13;letter-spacing:-.025em;margin:4px 0 8px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}.reader-page.book-mode .eyebrow{font-size:10px}.reader-page.book-mode .date-block strong{font-size:20px}.reader-page.book-mode .date-block span{font-size:10px}.reader-page.book-mode .reader-shell{padding-top:192px}.reader-page.book-mode .reader-toc{top:192px;height:calc(100vh - 210px)}.reader-page.book-mode .reader-main.book-main{height:calc(100vh - 210px)}}
@media (min-width:900px){.reader-page.book-mode .book-reading-page .parallel-row{grid-template-columns:56px minmax(0,1fr) minmax(0,1fr);grid-template-rows:minmax(0,1fr)}.reader-page.book-mode .book-reading-page .original{grid-column:2;grid-row:1!important;border-right:1px solid var(--line);border-bottom:0}.reader-page.book-mode .book-reading-page .translation{grid-column:3;grid-row:1!important}}
@media (min-width:900px){.reader-page.book-mode .book-intro-page .introduction-grid{grid-template-columns:minmax(0,1fr);height:calc(100% - 34px)}.reader-page.book-mode .book-intro-page .intro-card,.reader-page.book-mode .book-intro-page .pet-card{height:100%;display:flex;flex-direction:column;justify-content:center;padding:clamp(36px,5vw,78px)}.reader-page.book-mode .book-intro-page .intro-card h3{font-size:clamp(42px,5vw,72px)}.reader-page.book-mode .book-intro-page .intro-copy p,.reader-page.book-mode .book-intro-page .pet-copy .intro-copy p{font-size:clamp(20px,2vw,30px);line-height:1.78}.reader-page.book-mode .book-intro-page .pet-copy{padding:0}.reader-page.book-mode .book-intro-page .pet-side{display:none}}
@media (min-width:900px){.reader-page.book-mode .book-intro-page{overflow:hidden}.reader-page.book-mode .book-intro-page .introduction-grid{height:calc(100% - 30px)}.reader-page.book-mode .book-intro-page .intro-card,.reader-page.book-mode .book-intro-page .pet-card{justify-content:flex-start;padding:28px 36px;overflow:auto}.reader-page.book-mode .book-intro-page .intro-card h3{font-size:clamp(30px,3.2vw,46px);margin:10px 0 18px}.reader-page.book-mode .book-intro-page .intro-copy,.reader-page.book-mode .book-intro-page .pet-copy .intro-copy{gap:10px}.reader-page.book-mode .book-intro-page .intro-copy p,.reader-page.book-mode .book-intro-page .pet-copy .intro-copy p{font-size:clamp(16px,1.35vw,20px);line-height:1.7}.reader-page.book-mode .book-intro-page .pet-note{margin-top:14px;padding-top:10px}.reader-page.book-mode .book-intro-page .intro-label{font-size:9px}}
@media (min-width:900px){.reader-page.book-mode .reader-header{position:relative;top:auto;left:auto;right:auto;height:68px;margin:10px 16px 0;padding:9px 16px;border-radius:18px}.reader-page.book-mode .reader-header nav{height:28px}.reader-page.book-mode .reader-hero{display:block;padding-top:3px}.reader-page.book-mode .reader-hero>div:first-child,.reader-page.book-mode .reader-hero .eyebrow,.reader-page.book-mode .reader-meta{display:none}.reader-page.book-mode .reader-hero h1{max-width:none;margin:0;font-size:clamp(16px,1.55vw,22px);line-height:1.15;white-space:nowrap;text-overflow:ellipsis;display:block;overflow:hidden}.reader-page.book-mode .reader-shell{height:calc(100vh - 78px);padding:10px 18px 14px}.reader-page.book-mode .reader-toc{position:relative;top:auto;height:100%}.reader-page.book-mode .reader-main.book-main{height:100%}}
.archive-hero h1{font-size:clamp(56px,8vw,116px);line-height:.94}
@media (min-width:900px){.reader-page.book-mode .book-reading-page .original,.reader-page.book-mode .book-reading-page .translation{min-width:0;overflow-x:hidden;overflow-y:auto;overflow-wrap:anywhere;word-break:normal}.reader-page.book-mode .book-reading-page .original p,.reader-page.book-mode .book-reading-page .translation p{max-width:100%;overflow-wrap:anywhere}.reader-page.book-mode .book-reading-page .word-tip{overflow-wrap:anywhere}.reader-page.book-mode .book-reading-page .word-tooltip{max-width:min(280px,calc(100vw - 80px))}}
@media (min-width:900px){.reader-page.book-mode .reader-header{display:grid;grid-template-columns:auto minmax(0,1fr) auto;align-items:center;gap:14px;height:56px;padding:8px 14px}.reader-page.book-mode .reader-header nav{display:contents}.reader-page.book-mode .reader-header .brand{grid-column:1;white-space:nowrap}.reader-page.book-mode .reader-header .nav-tools{grid-column:3;min-width:0}.reader-page.book-mode .reader-hero{display:contents}.reader-page.book-mode .reader-hero>div:first-child,.reader-page.book-mode .reader-hero .eyebrow,.reader-page.book-mode .reader-meta{display:none}.reader-page.book-mode .reader-hero>div:last-child{display:contents}.reader-page.book-mode .reader-hero h1{grid-column:2;max-width:none;margin:0;font-size:clamp(15px,1.45vw,20px);line-height:1.18;white-space:nowrap;text-overflow:ellipsis;display:block;overflow:hidden;text-align:left}.reader-page.book-mode .reader-shell{height:calc(100vh - 66px);padding-top:10px}.reader-page.book-mode .reader-toc,.reader-page.book-mode .reader-main.book-main{height:100%}}
.reader-nav-title{display:none}
@media (min-width:900px){.reader-page.book-mode .reader-header{display:block;height:56px;padding:8px 14px}.reader-page.book-mode .reader-header nav{display:grid;grid-template-columns:auto minmax(0,1fr) auto;align-items:center;gap:14px;height:100%;width:100%}.reader-page.book-mode .reader-header .brand{grid-column:1;white-space:nowrap;align-self:center}.reader-page.book-mode .reader-nav-title{display:block;grid-column:2;min-width:0;margin:0;color:#223027;font:600 clamp(15px,1.45vw,20px)/1.18 Inter,-apple-system,BlinkMacSystemFont,"Segoe UI","Noto Serif SC",sans-serif;letter-spacing:-.02em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;align-self:center}.reader-page.book-mode .reader-header .nav-tools{grid-column:3;min-width:0;align-self:center}.reader-page.book-mode .reader-hero{display:none}.reader-page.book-mode .reader-shell{height:calc(100vh - 66px);padding-top:10px}.reader-page.book-mode .reader-toc,.reader-page.book-mode .reader-main.book-main{height:100%}}
.vocab-card,.reader-page.book-mode .book-vocab-page .vocab-card,.favorite-item-main{cursor:default}
.word-tooltip-floating{position:fixed;z-index:1000;width:min(320px,calc(100vw - 28px));padding:12px 14px;border-radius:16px;background:#223027;color:white;font:13px/1.55 Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;box-shadow:0 14px 30px rgba(31,42,36,.22);pointer-events:none;opacity:0;transform:translateY(5px);transition:opacity .12s ease,transform .12s ease}
.word-tooltip-floating.is-visible{opacity:1;transform:translateY(0)}
"""


APP_JS = r"""
const switcher=document.querySelector('#issue-switch');
if(switcher){switcher.addEventListener('change',()=>location.href=switcher.value)}
const search=document.querySelector('#vocab-search');
if(search){search.addEventListener('input',()=>{const query=search.value.trim().toLowerCase();document.querySelectorAll('.vocab-card').forEach(card=>{card.hidden=!card.dataset.search.includes(query)})})}
const progress=document.querySelector('#progress-bar');
const bookMain=document.querySelector('.book-main');
if(progress&&bookMain){
  const syncBookProgress=()=>{const max=bookMain.scrollWidth-bookMain.clientWidth;progress.style.width=`${max?bookMain.scrollLeft/max*100:0}%`};
  bookMain.addEventListener('scroll',syncBookProgress,{passive:true});syncBookProgress();
  const scrollBookToHash=(hash,behavior='smooth')=>{
    if(!hash)return false;
    const target=document.querySelector(hash);
    if(!target||!bookMain.contains(target))return false;
    bookMain.scrollTo({left:target.offsetLeft,behavior});
    window.scrollTo({top:0,left:0,behavior:'auto'});
    syncBookProgress();
    return true;
  };
  document.querySelectorAll('.reader-toc a[href^="#"]').forEach(link=>{
    link.addEventListener('click',event=>{
      if(scrollBookToHash(link.hash)){
        event.preventDefault();
        history.replaceState(null,'',link.hash);
      }
    });
  });
  if(location.hash){setTimeout(()=>scrollBookToHash(location.hash,'auto'),0)}
  document.addEventListener('keydown',event=>{
    if(event.key==='ArrowRight'){bookMain.scrollBy({left:bookMain.clientWidth,behavior:'smooth'})}
    if(event.key==='ArrowLeft'){bookMain.scrollBy({left:-bookMain.clientWidth,behavior:'smooth'})}
  });
}else if(progress){addEventListener('scroll',()=>{const max=document.documentElement.scrollHeight-innerHeight;progress.style.width=`${max?scrollY/max*100:0}%`},{passive:true})}

const floatingTooltip=document.createElement('div');
floatingTooltip.className='word-tooltip-floating';
floatingTooltip.setAttribute('role','tooltip');
document.body.append(floatingTooltip);
let activeWordTip=null;
function hideFloatingTooltip(){floatingTooltip.classList.remove('is-visible');activeWordTip=null}
function showFloatingTooltip(tip){
  const tooltip=tip.querySelector('.word-tooltip');
  if(!tooltip)return;
  activeWordTip=tip;
  floatingTooltip.textContent=tooltip.textContent.trim();
  floatingTooltip.classList.add('is-visible');
  const tipRect=tip.getBoundingClientRect();
  const tooltipRect=floatingTooltip.getBoundingClientRect();
  const gap=10;
  let left=tipRect.left+tipRect.width/2-tooltipRect.width/2;
  left=Math.max(14,Math.min(left,window.innerWidth-tooltipRect.width-14));
  let top=tipRect.top-tooltipRect.height-gap;
  if(top<14){top=tipRect.bottom+gap}
  if(top+tooltipRect.height>window.innerHeight-14){top=window.innerHeight-tooltipRect.height-14}
  floatingTooltip.style.left=`${left}px`;
  floatingTooltip.style.top=`${top}px`;
}
document.querySelectorAll('.word-tip').forEach(tip=>{
  tip.addEventListener('mouseenter',()=>showFloatingTooltip(tip));
  tip.addEventListener('mouseleave',hideFloatingTooltip);
  tip.addEventListener('focus',()=>showFloatingTooltip(tip));
  tip.addEventListener('blur',hideFloatingTooltip);
});
['scroll','resize'].forEach(type=>{
  window.addEventListener(type,()=>{if(activeWordTip)showFloatingTooltip(activeWordTip)},{passive:true,capture:true});
});

const favoriteStorageKey='beibei-favorites-v1';
let favorites={};
try{favorites=JSON.parse(localStorage.getItem(favoriteStorageKey)||'{}')||{}}catch(error){favorites={}}
const favoritesModal=document.querySelector('#favorites-modal');
const favoriteCount=document.querySelector('#favorite-count');
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

document.querySelectorAll('.vocab-card').forEach(card=>{
  card.querySelector('.favorite-word').addEventListener('click',event=>{event.stopPropagation();toggleFavorite(card)});
});

function renderFavorites(){
  const list=document.querySelector('#favorites-list');if(!list)return;list.replaceChildren();
  const words=Object.values(favorites).sort((a,b)=>a.term.localeCompare(b.term));
  if(!words.length){const empty=document.createElement('p');empty.className='favorites-empty';empty.textContent='还没有收藏单词。点击词卡右上角的爱心即可加入。';list.append(empty);return}
  words.forEach(word=>{
    const item=document.createElement('article');item.className='favorite-item';
    const main=document.createElement('div');main.className='favorite-item-main';
    const title=document.createElement('h3');title.textContent=word.term;const definition=document.createElement('p');definition.textContent=word.definition;main.append(title,definition);
    const remove=document.createElement('button');remove.className='favorite-remove';remove.type='button';remove.textContent='×';remove.setAttribute('aria-label',`取消收藏 ${word.term}`);
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
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&favoritesModal&&!favoritesModal.hidden){closeFavoritesModal()}});
syncFavoriteButtons();renderFavorites();
"""


if __name__ == "__main__":
    main()
