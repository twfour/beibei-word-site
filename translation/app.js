const exercises = [
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

const storageKey = "beibei-translation-20261103-v2";
let saved = {};
try { saved = JSON.parse(localStorage.getItem(storageKey) || "{}") || {}; } catch (error) { saved = {}; }
const state = {
  index: Math.min(Number(saved.index) || 0, exercises.length - 1),
  mode: saved.mode === "write" ? "write" : "learn",
  answers: saved.answers || {},
  learned: saved.learned || {},
  ratings: saved.ratings || {}
};

const elements = {
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
  if (event.target === elements.input) return;
  if (event.key === "ArrowLeft") goTo(state.index - 1);
  if (event.key === "ArrowRight") goTo(state.index + 1);
});

render();
