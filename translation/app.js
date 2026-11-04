const exercises = [
  {
    level: 1,
    chinese: "特朗普的贸易战现在已经很少出现在新闻头条上。",
    keywords: "贸易战 trade wars · 新闻头条 news headlines · 很少 rarely",
    frame: "Trump's trade wars rarely ... now.",
    answer: "Trump's trade wars rarely appear in the news headlines now.",
    note: "频率副词 rarely 放在实义动词 appear 前面；这里用一般现在时描述当前状况。",
    source: "Donald Trump's trade wars have largely fallen off the headlines."
  },
  {
    level: 1,
    chinese: "表面的平静可能会误导我们。",
    keywords: "表面的平静 the calm on the surface · 误导 mislead",
    frame: "The calm on the surface may ...",
    answer: "The calm on the surface may mislead us.",
    note: "情态动词 may 后使用动词原形 mislead；us 作动词的宾语。",
    source: "The sense of calm is misleading."
  },
  {
    level: 1,
    chinese: "中国和美国都在为下一轮竞争做准备。",
    keywords: "两者都 both · 为……做准备 prepare for · 下一轮 the next round",
    frame: "China and the United States are both ...",
    answer: "China and the United States are both preparing for the next round of competition.",
    note: "be preparing for 表示“正在为……做准备”；both 通常放在 be 动词之后。",
    source: "They are both focused on gaining the upper hand in what seems like an inevitable next round."
  },
  {
    level: 2,
    chinese: "两国都希望让自己的供应链更加安全。",
    keywords: "两国 both countries · 供应链 supply chains · 更加安全 safer",
    frame: "Both countries want to make ...",
    answer: "Both countries want to make their own supply chains safer.",
    note: "make + 宾语 + 形容词表示“使……变得……”，所以 safer 放在 supply chains 后。",
    source: "China and the US are focusing on ensuring the resilience of the international supply chains on which they rely."
  },
  {
    level: 2,
    chinese: "稀土对许多高科技产品非常重要。",
    keywords: "稀土 rare earths · 对……重要 be important for · 高科技产品 high-tech products",
    frame: "Rare earths are ...",
    answer: "Rare earths are very important for many high-tech products.",
    note: "rare earths 在这里表示一类矿产，使用复数；high-tech 作复合形容词修饰 products。",
    source: "Critical minerals ... are essential to high-tech industries for civilian and military uses."
  },
  {
    level: 2,
    chinese: "美国正在投资新的采矿和加工项目。",
    keywords: "投资 invest in · 采矿 mining · 加工 processing · 项目 projects",
    frame: "The United States is investing in ...",
    answer: "The United States is investing in new mining and processing projects.",
    note: "invest in 是固定搭配；mining 和 processing 在这里共同修饰 projects。",
    source: "The Trump administration is pouring hundreds of millions into projects to mine and process rare earths."
  },
  {
    level: 3,
    chinese: "如果两国不能合作，经济冲突可能会变得更加严重。",
    keywords: "如果 if · 合作 work together · 经济冲突 economic conflict · 严重 serious",
    frame: "If the two countries cannot ..., the economic conflict may ...",
    answer: "If the two countries cannot work together, the economic conflict may become more serious.",
    note: "真实条件句中，if 从句用一般现在时，主句可使用 may 表示可能性。",
    source: "One hopes there is a path to a peaceful entente."
  },
  {
    level: 3,
    chinese: "贸易曾经让各国相互依赖，但现在这种依赖有时被看作一种弱点。",
    keywords: "曾经 once · 相互依赖 depend on one another · 被看作 be seen as · 弱点 weakness",
    frame: "Trade once made countries ..., but now this dependence is sometimes ...",
    answer: "Trade once made countries depend on one another, but now this dependence is sometimes seen as a weakness.",
    note: "make 后接不带 to 的动词原形 depend；is seen as 是被动语态，表示“被看作”。",
    source: "Trade, once the economic glue meant to promote peace through interdependence, is becoming the battlefield."
  }
];

const storageKey = "beibei-translation-20261103-v1";
const saved = JSON.parse(localStorage.getItem(storageKey) || "{}") || {};
const state = {
  index: Math.min(Number(saved.index) || 0, exercises.length - 1),
  answers: saved.answers || {},
  ratings: saved.ratings || {}
};

const elements = {
  card: document.querySelector("#exercise-card"),
  number: document.querySelector("#question-number"),
  level: document.querySelector("#level-badge"),
  prompt: document.querySelector("#chinese-prompt"),
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
  reset: document.querySelector("#reset-progress")
};

let hintLevel = 0;

function save() {
  localStorage.setItem(storageKey, JSON.stringify(state));
}

function completedCount() {
  return Object.values(state.ratings).filter(value => value === "done").length;
}

function updateProgress() {
  const complete = completedCount();
  elements.progressText.textContent = `${complete} / ${exercises.length}`;
  elements.progressBar.style.width = `${complete / exercises.length * 100}%`;
}

function buildDots() {
  elements.dots.replaceChildren();
  exercises.forEach((exercise, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.setAttribute("aria-label", `第 ${index + 1} 题`);
    if (index === state.index) button.classList.add("current");
    if (state.ratings[index] === "done") button.classList.add("done");
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
  hintLevel = 0;
  elements.number.textContent = `QUESTION ${String(state.index + 1).padStart(2, "0")}`;
  elements.level.textContent = ["基础", "进阶", "挑战"][exercise.level - 1];
  elements.level.className = `level-badge level-${exercise.level}`;
  elements.prompt.textContent = exercise.chinese;
  elements.input.value = state.answers[state.index] || "";
  elements.modelAnswer.textContent = exercise.answer;
  elements.answerNote.textContent = exercise.note;
  elements.sourceLine.textContent = exercise.source;
  elements.hintBox.hidden = true;
  elements.answerPanel.hidden = true;
  elements.showAnswer.textContent = "核对答案";
  elements.hintOne.setAttribute("aria-pressed", "false");
  elements.hintTwo.setAttribute("aria-pressed", "false");
  elements.previous.disabled = state.index === 0;
  elements.next.disabled = state.index === exercises.length - 1;
  document.querySelectorAll("[data-rating]").forEach(button => {
    button.classList.toggle("selected", state.ratings[state.index] === button.dataset.rating);
  });
  buildDots();
  updateProgress();
  elements.card.scrollTop = 0;
}

function goTo(index) {
  state.answers[state.index] = elements.input.value.trim();
  state.index = Math.max(0, Math.min(index, exercises.length - 1));
  save();
  render();
}

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
    render();
    if (button.dataset.rating === "done" && state.index < exercises.length - 1) {
      window.setTimeout(() => goTo(state.index + 1), 180);
    }
  });
});

elements.reset.addEventListener("click", () => {
  if (!window.confirm("确定清除这套练习的答案和完成进度吗？")) return;
  state.index = 0;
  state.answers = {};
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
