const november4Exercises = [
  {
    chinese: "美国中期选举将影响未来几年的政治。",
    answer: "The US midterm elections will shape politics for the next few years.",
    core: "shape politics",
    meaning: "影响政治格局",
    keywords: "美国中期选举 the US midterm elections · 影响 shape · 未来几年 the next few years",
    frame: "The US midterm elections will ...",
    note: "will 后使用动词原形 shape；shape 在这里不是“形状”，而是“影响、塑造”。",
    source: "The results are set to ripple across American politics to the 2028 presidential election and beyond."
  },
  {
    chinese: "许多选民担心生活成本上升和战争带来的影响。",
    answer: "Many voters are worried about rising living costs and the effects of war.",
    core: "be worried about",
    meaning: "担心……",
    keywords: "许多选民 many voters · 担心 be worried about · 生活成本 living costs · 战争的影响 the effects of war",
    frame: "Many voters are worried about ...",
    note: "be worried about 后接名词；rising 放在 living costs 前表示“不断上升的”。",
    source: "Voters [are] disillusioned by record diesel prices, the rising cost of living and the disruption caused by the war on Iran."
  },
  {
    chinese: "民主党希望重新控制众议院，甚至拿下参议院。",
    answer: "The Democrats hope to take back the House and even win the Senate.",
    core: "take back",
    meaning: "重新夺回",
    keywords: "民主党 the Democrats · 希望 hope to · 重新控制 take back · 众议院 the House · 参议院 the Senate",
    frame: "The Democrats hope to take back ...",
    note: "hope to 后接动词原形；take back the House 表示“重新夺回众议院控制权”。",
    source: "The party could take back not just the House but, on a good night, the Senate too."
  },
  {
    chinese: "如果共和党失去国会，特朗普的权力将受到更多限制。",
    answer: "If the Republicans lose Congress, Trump's power will face more limits.",
    core: "face more limits",
    meaning: "面临更多限制",
    keywords: "如果 if · 共和党 the Republicans · 失去国会 lose Congress · 权力 power · 更多限制 more limits",
    frame: "If the Republicans lose Congress, Trump's power will ...",
    note: "if 从句用一般现在时 lose，主句用 will face 表示可能产生的结果。",
    source: "This is intensified when their party loses control of Congress."
  },
  {
    chinese: "这次选举也会影响民主党在2028年选择谁竞选总统。",
    answer: "The election will also affect who the Democrats choose for president in 2028.",
    core: "affect who ... choose",
    meaning: "影响……选择谁",
    keywords: "这次选举 the election · 影响 affect · 民主党 the Democrats · 选择谁 who ... choose · 竞选总统 for president",
    frame: "The election will also affect who ...",
    note: "who the Democrats choose 是一个完整的小句，整体作 affect 的宾语。",
    source: "The early dynamics of the race to choose a Democratic presidential nominee for 2028 will be set by key races."
  },
  {
    chinese: "如果共和党失败，党内可能出现更大的分歧。",
    answer: "If the Republicans lose, the party may face greater divisions.",
    core: "face divisions",
    meaning: "面临分歧",
    keywords: "如果 if · 共和党失败 the Republicans lose · 党内 the party · 可能 may · 更大的分歧 greater divisions",
    frame: "If the Republicans lose, the party may ...",
    note: "may 后接动词原形 face；division 在这里表示党内的“分歧、分裂”。",
    source: "The party would be engulfed in a 'civil war' over its future from the day after election day."
  }
];

const november3Exercises = [
  {
    chinese: "中美贸易战表面上暂时平静下来了。",
    answer: "The trade war between China and the US looks quieter now.",
    core: "look quieter",
    meaning: "看起来平静一些",
    keywords: "贸易战 the trade war · 中美 between China and the US · 平静一些 quieter",
    frame: "The trade war between ... looks ...",
    note: "look 后面接形容词 quieter，表示“看起来更加平静”。",
    source: "Donald Trump's trade wars have largely fallen off the headlines."
  },
  {
    chinese: "但是，两国正在围绕技术和供应链展开更大的竞争。",
    answer: "However, both countries are competing over technology and supply chains.",
    core: "compete over",
    meaning: "围绕……展开竞争",
    keywords: "但是 however · 两国 both countries · 技术 technology · 供应链 supply chains",
    frame: "However, both countries are competing ...",
    note: "compete over 表示“围绕某事展开竞争”；and 连接两个并列对象。",
    source: "The world is marching toward an economic war of potentially epic proportions."
  },
  {
    chinese: "美国正在限制中国获得先进芯片和制造设备。",
    answer: "The US is limiting China's access to advanced chips and machines.",
    core: "limit access to",
    meaning: "限制获得……的途径",
    keywords: "限制 limit · 中国获得…… China's access to · 先进芯片 advanced chips · 设备 machines",
    frame: "The US is limiting China's access to ...",
    note: "access to 是固定搭配，to 后面直接接名词，不用动词原形。",
    source: "It is doubling down on efforts to limit China's access to frontier semiconductors."
  },
  {
    chinese: "中国正利用自己在关键矿产和稀土方面的优势作出回应。",
    answer: "China is responding with its strength in critical minerals and rare earths.",
    core: "respond with",
    meaning: "用……作出回应",
    keywords: "作出回应 respond · 优势 strength · 关键矿产 critical minerals · 稀土 rare earths",
    frame: "China is responding with its strength in ...",
    note: "respond with 表示“以某种方式或手段回应”；its 指 China 的。",
    source: "China is leveraging its overwhelming dominance over the supply of critical minerals."
  },
  {
    chinese: "如果稀土供应中断，美国和欧洲可能损失很多钱。",
    answer: "Without rare-earth supplies, the US and Europe could lose a lot of money.",
    core: "without supplies",
    meaning: "没有供应",
    keywords: "没有 without · 稀土供应 rare-earth supplies · 可能 could · 损失很多钱 lose a lot of money",
    frame: "Without rare-earth supplies, the US and Europe could ...",
    note: "without 后接名词；could 在这里表示一种可能发生的结果。",
    source: "It could cost their economies about $1.5tn per year."
  },
  {
    chinese: "作者希望两国能够合作，避免经济冲突变成真正的战争。",
    answer: "The writer hopes the two countries can work together and avoid a real war.",
    core: "work together",
    meaning: "共同合作",
    keywords: "作者 the writer · 希望 hope · 合作 work together · 避免 avoid · 真正的战争 a real war",
    frame: "The writer hopes the two countries can ... and avoid ...",
    note: "hope 后接完整句子；work together 和 avoid a real war 由 and 并列。",
    source: "One hopes there is a path to a peaceful entente."
  }
];

const issues = [
  {
    date: "20261104",
    displayDate: "2026.11.04",
    title: "中期选举，<br>三重影响",
    optionTitle: "中期选举，三重影响",
    summary: "用6句话顺着文章逻辑，先了解这篇文章讲了什么，再把这些意思写成英文。",
    storageKey: "beibei-translation-20261104-v1",
    exercises: november4Exercises
  },
  {
    date: "20261103",
    displayDate: "2026.11.03",
    title: "表面休战，<br>暗地“卡脖子”",
    optionTitle: "表面休战，暗地“卡脖子”",
    summary: "用6句话顺着文章逻辑，先了解这篇文章讲了什么，再把这些意思写成英文。",
    storageKey: "beibei-translation-20261103-v2",
    exercises: november3Exercises
  }
];

const dateFromUrl = new URLSearchParams(window.location.search).get("date");
const rememberedDate = localStorage.getItem("beibei-translation-current-date");
let currentIssue = issues.find(issue => issue.date === dateFromUrl)
  || issues.find(issue => issue.date === rememberedDate)
  || issues[0];
let exercises = currentIssue.exercises;
let storageKey = currentIssue.storageKey;

function loadState() {
  let saved = {};
  try { saved = JSON.parse(localStorage.getItem(storageKey) || "{}") || {}; } catch (error) { saved = {}; }
  return {
    index: Math.min(Number(saved.index) || 0, exercises.length - 1),
    mode: saved.mode === "write" ? "write" : "learn",
    answers: saved.answers || {},
    learned: saved.learned || {},
    ratings: saved.ratings || {}
  };
}

let state = loadState();

const elements = {
  issuePicker: document.querySelector("#issue-picker"),
  issueLabel: document.querySelector("#issue-label"),
  issueTitle: document.querySelector("#issue-title"),
  issueSummary: document.querySelector("#issue-summary"),
  card: document.querySelector("#exercise-card"),
  number: document.querySelector("#question-number"),
  badge: document.querySelector("#level-badge"),
  promptLabel: document.querySelector("#prompt-label"),
  prompt: document.querySelector("#chinese-prompt"),
  studyPanel: document.querySelector("#study-panel"),
  studyAnswerWrap: document.querySelector("#study-answer-wrap"),
  studyAnswer: document.querySelector("#study-answer"),
  corePhrase: document.querySelector("#core-phrase"),
  phraseMeaning: document.querySelector("#phrase-meaning"),
  coverAnswer: document.querySelector("#cover-answer"),
  markLearned: document.querySelector("#mark-learned"),
  writePanel: document.querySelector("#write-panel"),
  input: document.querySelector("#student-answer"),
  hintOne: document.querySelector("#hint-one"),
  hintTwo: document.querySelector("#hint-two"),
  hintBox: document.querySelector("#hint-box"),
  showAnswer: document.querySelector("#show-answer"),
  answerPanel: document.querySelector("#answer-panel"),
  modelAnswer: document.querySelector("#model-answer"),
  answerNote: document.querySelector("#answer-note"),
  sourceLine: document.querySelector("#source-line"),
  previous: document.querySelector("#previous"),
  next: document.querySelector("#next"),
  dots: document.querySelector("#question-dots"),
  progressText: document.querySelector("#progress-text"),
  progressBar: document.querySelector("#progress-bar"),
  reset: document.querySelector("#reset-progress"),
  modeButtons: [...document.querySelectorAll("[data-mode]")]
};

let hintLevel = 0;

function save() {
  localStorage.setItem(storageKey, JSON.stringify(state));
}

function buildIssuePicker() {
  elements.issuePicker.replaceChildren();
  issues.forEach(issue => {
    const option = document.createElement("option");
    option.value = issue.date;
    option.textContent = `${issue.displayDate} · ${issue.optionTitle}`;
    elements.issuePicker.append(option);
  });
}

function showIssue(issue, updateUrl = true) {
  save();
  currentIssue = issue;
  exercises = issue.exercises;
  storageKey = issue.storageKey;
  state = loadState();
  localStorage.setItem("beibei-translation-current-date", issue.date);
  elements.issuePicker.value = issue.date;
  elements.issueLabel.textContent = `本期来源 · ${issue.displayDate}`;
  elements.issueTitle.innerHTML = issue.title;
  elements.issueSummary.textContent = issue.summary;
  if (updateUrl) {
    const url = new URL(window.location.href);
    url.searchParams.set("date", issue.date);
    window.history.replaceState({}, "", url);
  }
  render();
}

function completedCount() {
  const collection = state.mode === "learn" ? state.learned : state.ratings;
  return exercises.filter((exercise, index) => state.mode === "learn" ? collection[index] : collection[index] === "done").length;
}

function updateProgress() {
  const complete = completedCount();
  const action = state.mode === "learn" ? "已学" : "会写";
  elements.progressText.textContent = `${action} ${complete} / ${exercises.length}`;
  elements.progressBar.style.width = `${complete / exercises.length * 100}%`;
}

function buildDots() {
  elements.dots.replaceChildren();
  exercises.forEach((exercise, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.setAttribute("aria-label", `第 ${index + 1} 句`);
    if (index === state.index) button.classList.add("current");
    const complete = state.mode === "learn" ? state.learned[index] : state.ratings[index] === "done";
    if (complete) button.classList.add("done");
    button.addEventListener("click", () => goTo(index));
    elements.dots.append(button);
  });
}

function setHint(level) {
  hintLevel = hintLevel === level ? 0 : level;
  const exercise = exercises[state.index];
  elements.hintOne.setAttribute("aria-pressed", String(hintLevel === 1));
  elements.hintTwo.setAttribute("aria-pressed", String(hintLevel === 2));
  elements.hintBox.hidden = hintLevel === 0;
  if (hintLevel === 1) elements.hintBox.textContent = exercise.keywords;
  if (hintLevel === 2) elements.hintBox.textContent = exercise.frame;
}

function render() {
  const exercise = exercises[state.index];
  const learning = state.mode === "learn";
  hintLevel = 0;
  elements.number.textContent = `${learning ? "LEARN" : "WRITE"} ${String(state.index + 1).padStart(2, "0")}`;
  elements.badge.textContent = `文章大意 ${state.index + 1} / ${exercises.length}`;
  elements.promptLabel.textContent = learning ? "先读懂中文" : "只看中文，试着写";
  elements.prompt.textContent = exercise.chinese;
  elements.studyAnswer.textContent = exercise.answer;
  elements.corePhrase.textContent = exercise.core;
  elements.phraseMeaning.textContent = exercise.meaning;
  elements.input.value = state.answers[state.index] || "";
  elements.modelAnswer.textContent = exercise.answer;
  elements.answerNote.textContent = exercise.note;
  elements.sourceLine.textContent = exercise.source;
  elements.studyPanel.hidden = !learning;
  elements.writePanel.hidden = learning;
  elements.studyAnswerWrap.classList.remove("covered");
  elements.coverAnswer.textContent = "遮住英文试着说";
  elements.markLearned.textContent = state.learned[state.index] ? "这句已经学过 ✓" : "我读了两遍，记住了 ✓";
  elements.markLearned.classList.toggle("is-learned", Boolean(state.learned[state.index]));
  elements.hintBox.hidden = true;
  elements.answerPanel.hidden = true;
  elements.showAnswer.textContent = "核对答案";
  elements.hintOne.setAttribute("aria-pressed", "false");
  elements.hintTwo.setAttribute("aria-pressed", "false");
  elements.previous.disabled = state.index === 0;
  elements.next.disabled = state.index === exercises.length - 1;
  elements.modeButtons.forEach(button => button.classList.toggle("active", button.dataset.mode === state.mode));
  document.querySelectorAll("[data-rating]").forEach(button => {
    button.classList.toggle("selected", state.ratings[state.index] === button.dataset.rating);
  });
  buildDots();
  updateProgress();
  elements.card.scrollTop = 0;
}

function goTo(index) {
  if (state.mode === "write") state.answers[state.index] = elements.input.value.trim();
  state.index = Math.max(0, Math.min(index, exercises.length - 1));
  save();
  render();
}

function setMode(mode) {
  if (state.mode === "write") state.answers[state.index] = elements.input.value.trim();
  state.mode = mode;
  state.index = 0;
  save();
  render();
}

elements.modeButtons.forEach(button => button.addEventListener("click", () => setMode(button.dataset.mode)));
elements.issuePicker.addEventListener("change", () => {
  const issue = issues.find(item => item.date === elements.issuePicker.value);
  if (issue) showIssue(issue);
});
elements.studyAnswerWrap.addEventListener("click", () => {
  if (!elements.studyAnswerWrap.classList.contains("covered")) return;
  elements.studyAnswerWrap.classList.remove("covered");
  elements.coverAnswer.textContent = "遮住英文试着说";
});
elements.coverAnswer.addEventListener("click", () => {
  const covered = elements.studyAnswerWrap.classList.toggle("covered");
  elements.coverAnswer.textContent = covered ? "重新显示英文" : "遮住英文试着说";
});
elements.markLearned.addEventListener("click", () => {
  state.learned[state.index] = true;
  save();
  if (state.index < exercises.length - 1) goTo(state.index + 1);
  else render();
});
elements.input.addEventListener("input", () => {
  state.answers[state.index] = elements.input.value;
  save();
});
elements.hintOne.addEventListener("click", () => setHint(1));
elements.hintTwo.addEventListener("click", () => setHint(2));
elements.showAnswer.addEventListener("click", () => {
  elements.answerPanel.hidden = !elements.answerPanel.hidden;
  elements.showAnswer.textContent = elements.answerPanel.hidden ? "核对答案" : "收起答案";
  if (!elements.answerPanel.hidden) elements.answerPanel.scrollIntoView({ block: "nearest", behavior: "smooth" });
});
elements.previous.addEventListener("click", () => goTo(state.index - 1));
elements.next.addEventListener("click", () => goTo(state.index + 1));

document.querySelectorAll("[data-rating]").forEach(button => {
  button.addEventListener("click", () => {
    state.ratings[state.index] = button.dataset.rating;
    save();
    if (button.dataset.rating === "done" && state.index < exercises.length - 1) goTo(state.index + 1);
    else render();
  });
});

elements.reset.addEventListener("click", () => {
  if (!window.confirm("确定清除这套练习的学习和默写进度吗？")) return;
  state.index = 0;
  state.mode = "learn";
  state.answers = {};
  state.learned = {};
  state.ratings = {};
  save();
  render();
});

document.addEventListener("keydown", event => {
  if (event.target === elements.input || event.target === elements.issuePicker) return;
  if (event.key === "ArrowLeft") goTo(state.index - 1);
  if (event.key === "ArrowRight") goTo(state.index + 1);
});

buildIssuePicker();
showIssue(currentIssue, false);
