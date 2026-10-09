const views = [...document.querySelectorAll('.view')];
const navButtons = [...document.querySelectorAll('.bottom-nav button')];
const state = {
  progress: Number(localStorage.getItem('sparkProgress') || 1),
  favorites: JSON.parse(localStorage.getItem('sparkFavorites') || '[]'),
  reflection: localStorage.getItem('sparkReflection') || '',
};

function showView(id) {
  views.forEach(view => view.classList.toggle('is-active', view.id === id));
  const navId = id === 'station' ? 'route' : id;
  navButtons.forEach(button => button.classList.toggle('is-active', button.dataset.go === navId));
  window.scrollTo({top: 0, behavior: 'smooth'});
}

document.querySelectorAll('[data-go]').forEach(button => {
  button.addEventListener('click', () => showView(button.dataset.go));
});

document.querySelectorAll('.station').forEach(station => {
  station.addEventListener('click', () => {
    if (station.classList.contains('locked')) return toast('完成前一站任务后解锁');
    showView('station');
  });
});

document.querySelectorAll('.reading-tabs button').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.reading-tabs button').forEach(item => item.classList.toggle('is-active', item === tab));
    document.querySelectorAll('.reading-panel').forEach(panel => panel.classList.toggle('is-active', panel.id === tab.dataset.panel));
  });
});

document.querySelectorAll('.options button').forEach(option => {
  option.addEventListener('click', () => {
    const correct = option.dataset.correct === 'true';
    document.querySelectorAll('.options button').forEach(item => item.disabled = true);
    option.classList.add(correct ? 'correct' : 'wrong');
    const feedback = document.querySelector('#taskFeedback');
    if (correct) {
      feedback.textContent = '回答正确！尊重实际、总结经验、及时调整，正是遵义会议给予我们的启示。下一站已点亮。';
      state.progress = Math.max(state.progress, 2);
      localStorage.setItem('sparkProgress', state.progress);
      updateProgress();
    } else {
      feedback.textContent = '再想一想：坚持理想并不意味着拒绝纠正方法。';
    }
  });
});

function updateProgress() {
  document.querySelector('#progressText').textContent = `${state.progress} / 6 站`;
  document.querySelector('#progressBar').style.width = `${state.progress / 6 * 100}%`;
  if (state.progress >= 2) {
    const third = document.querySelector('[data-station="3"]');
    third.classList.remove('locked');
    third.querySelector('small').textContent = '1935.03 · 机智勇敢';
  }
}

function renderFavorites() {
  document.querySelector('#favoriteSummary').textContent = `已收藏 ${state.favorites.length} 张`;
  document.querySelector('#collectionEmpty').hidden = state.favorites.length > 0;
  document.querySelector('#collectionList').innerHTML = state.favorites.map((item, index) =>
    `<article class="saved-card"><div><span>SPARK CARD 0${index + 1}</span><strong>${item}</strong></div><b>✦</b></article>`
  ).join('');
  document.querySelectorAll('.collect-button').forEach(button => {
    const selected = state.favorites.includes(button.dataset.card);
    button.classList.toggle('is-collected', selected);
    button.textContent = selected ? '✓ 已收入星火档案' : '＋ 收进星火档案';
  });
}

document.querySelectorAll('.collect-button').forEach(button => {
  button.addEventListener('click', () => {
    const card = button.dataset.card;
    if (!state.favorites.includes(card)) {
      state.favorites.push(card);
      localStorage.setItem('sparkFavorites', JSON.stringify(state.favorites));
      toast(`“${card}”已收入档案`);
    }
    renderFavorites();
  });
});

const questions = [
  {q:'遵义会议体现得最突出的精神是什么？', a:['盲目坚持','实事求是','等待帮助'], correct:1, e:'遵义会议根据实际情况总结经验、纠正错误，体现了实事求是。'},
  {q:'面对已经证明不合适的方法，正确做法是什么？', a:['分析原因并调整','为了面子继续','把问题藏起来'], correct:0, e:'坚定目标与及时调整方法并不矛盾。'},
  {q:'遵义会议为什么被称为重要转折？', a:['改变了行军服装','解决了关键领导和军事问题','增加了物资'], correct:1, e:'会议集中解决了当时具有决定意义的军事和组织问题。'}
];
let quizIndex = 0;
let score = 0;
function renderQuestion() {
  const item = questions[quizIndex];
  document.querySelector('#questionNo').textContent = quizIndex + 1;
  document.querySelector('#question').textContent = item.q;
  document.querySelector('#quizExplain').textContent = '';
  document.querySelector('#nextQuestion').hidden = true;
  document.querySelector('#quizOptions').innerHTML = item.a.map((answer, index) => `<button data-index="${index}">${String.fromCharCode(65 + index)}. ${answer}</button>`).join('');
  document.querySelectorAll('#quizOptions button').forEach(button => button.addEventListener('click', answerQuestion));
}
function answerQuestion(event) {
  const selected = Number(event.currentTarget.dataset.index);
  const item = questions[quizIndex];
  document.querySelectorAll('#quizOptions button').forEach(button => button.disabled = true);
  event.currentTarget.classList.add(selected === item.correct ? 'correct' : 'wrong');
  if (selected !== item.correct) document.querySelector(`#quizOptions button[data-index="${item.correct}"]`).classList.add('correct');
  if (selected === item.correct) score += 10;
  document.querySelector('#score').textContent = score;
  document.querySelector('#quizExplain').textContent = item.e;
  document.querySelector('#nextQuestion').hidden = false;
  document.querySelector('#nextQuestion').innerHTML = quizIndex === questions.length - 1 ? '查看结果 <span>→</span>' : '下一题 <span>→</span>';
}
document.querySelector('#nextQuestion').addEventListener('click', () => {
  if (quizIndex < questions.length - 1) { quizIndex += 1; renderQuestion(); }
  else { toast(`挑战完成：${score} / 30 分`); quizIndex = 0; score = 0; document.querySelector('#score').textContent = 0; renderQuestion(); }
});

const reflection = document.querySelector('#reflection');
reflection.value = state.reflection;
document.querySelector('#saveReflection').addEventListener('click', () => {
  state.reflection = reflection.value.trim();
  localStorage.setItem('sparkReflection', state.reflection);
  document.querySelector('#saveHint').textContent = state.reflection ? '已装入档案' : '已清空';
  toast(state.reflection ? '感悟已保存' : '感悟已清空');
});

let toastTimer;
function toast(message) {
  const node = document.querySelector('#toast');
  node.textContent = message;
  node.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => node.classList.remove('show'), 1800);
}

document.querySelector('#soundButton').addEventListener('click', event => {
  event.currentTarget.classList.toggle('muted');
  event.currentTarget.textContent = event.currentTarget.classList.contains('muted') ? '静' : '声';
  toast(event.currentTarget.classList.contains('muted') ? '声音已关闭' : '声音已开启（原型未配音）');
});

updateProgress();
renderFavorites();
renderQuestion();
