const exercises = [
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

const storageKey = "beibei-translation-20261104-v1";
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
