const stations = [
  {
    id: 1, slug: 'ruijin', name: '瑞金', title: '瑞金<br>出发', date: '1934年10月', place: '江西瑞金', spirit: '坚定理想', seal: '启程', position: ['20%', '88%'],
    archive: '1934年10月，中央红军主力从江西瑞金等地出发，开始战略转移。前方道路漫长而未知，但队伍依然向着共同目标前进。',
    explain: '出发意味着暂时离开熟悉的地方，也意味着为理想作出选择。真正的坚定，不是看不到困难，而是知道困难存在，仍然愿意承担责任。',
    think: '当一个长期目标遇到困难时，什么能够帮助你继续坚持？',
    chainTitle: '一次艰难出发<br>为什么仍要坚持？',
    chain: [['背景','革命根据地面临严峻形势'],['困难','原有道路难以继续'],['选择','进行战略转移'],['行动','中央红军踏上征途'],['结果','开启两万五千里长征']],
    keywords: [
      ['坚定理想','认准值得追求的目标，即使面对困难，也不轻易放弃。','为长期目标制定计划，每天坚持完成一小步。'],
      ['责任担当','在集体需要时，主动承担属于自己的责任。','小组合作中不逃避任务，认真完成自己的部分。']
    ]
  },
  {
    id: 2, slug: 'zunyi', name: '遵义', title: '遵义<br>会议', date: '1935年1月', place: '贵州遵义', spirit: '实事求是', seal: '转折', position: ['28%', '64%'],
    archive: '1935年1月，中共中央政治局在贵州遵义召开扩大会议。会议集中解决了当时具有决定意义的军事和组织问题，中国革命由此迎来重要转折。',
    explain: '大家没有回避已经出现的问题，而是根据真实情况总结经验、调整方向。坚持目标，不等于坚持错误的方法。',
    think: '当原来的学习方法效果不好时，你会继续照旧，还是分析原因并调整？',
    chainTitle: '一次重要转折<br>是怎样发生的？',
    chain: [['背景','第五次反“围剿”失利'],['困难','长征初期损失严重'],['选择','召开会议，总结经验'],['改变','调整军事领导和方向'],['结果','中国革命实现重要转折']],
    keywords: [
      ['实事求是','从实际情况出发，发现问题、分析问题，并勇于调整不合适的方法。','做题连续出错时，先查找原因，再改变学习方法。'],
      ['独立自主','立足自己的实际情况，依靠自身力量作出判断、解决问题。','听取建议，也要经过自己的思考再作决定。']
    ]
  },
  {
    id: 3, slug: 'chishui', name: '赤水', title: '四渡<br>赤水', date: '1935年1月至3月', place: '川黔滇边境', spirit: '机智勇敢', seal: '巧渡', position: ['53%', '48%'],
    archive: '中央红军在川黔滇边境地区多次往返穿插，四次渡过赤水河，灵活调动敌军，创造了以少胜多、变被动为主动的经典战例。',
    explain: '勇敢并不是只会向前冲。看清形势、灵活改变路线，同样是一种勇气和智慧。',
    think: '计划突然发生变化时，怎样调整才能离目标更近？',
    chainTitle: '灵活改变路线<br>怎样赢得主动？',
    chain: [['背景','敌军重兵围堵'],['困难','正面突破风险很大'],['判断','观察敌情变化'],['行动','多次机动渡过赤水'],['结果','跳出包围赢得主动']],
    keywords: [
      ['机动灵活','目标不变，但能根据实际情况及时调整办法。','遇到难题时尝试画图、列表或换一种思路。'],
      ['沉着判断','越是紧急，越要冷静分析信息再行动。','考试遇到难题，先稳定情绪再判断解题顺序。']
    ]
  },
  {
    id: 4, slug: 'luding', name: '泸定', title: '飞夺<br>泸定桥', date: '1935年5月', place: '四川泸定', spirit: '不怕牺牲', seal: '勇进', position: ['77%', '34%'],
    archive: '1935年5月，红军向大渡河上的泸定桥急速前进。突击队员冒着危险攀踏铁索、突破阻击，为部队打开了前进通道。',
    explain: '关键时刻，总有人愿意为了共同目标站出来。勇气不是不害怕，而是明白责任之后依然选择行动。',
    think: '集体遇到困难时，你能主动承担哪一项任务？',
    chainTitle: '一道险峻关口<br>如何被突破？',
    chain: [['背景','队伍急需渡过大渡河'],['困难','桥面受损且有阻击'],['选择','组织突击队强攻'],['行动','攀踏铁索向前冲锋'],['结果','打开继续前进的通道']],
    keywords: [
      ['英勇无畏','面对危险和困难，依然为了目标勇敢行动。','遇到不会的问题，敢于承认并主动请教。'],
      ['集体担当','在集体最需要的时刻承担责任、相互配合。','班级活动中主动完成困难但必要的工作。']
    ]
  },
  {
    id: 5, slug: 'snowland', name: '雪山草地', title: '雪山<br>草地', date: '1935年6月至8月', place: '川西北地区', spirit: '艰苦奋斗', seal: '坚韧', position: ['58%', '18%'],
    archive: '红军翻越空气稀薄、气候严寒的雪山，又穿越人迹罕至、补给困难的茫茫草地，经受了自然环境和物资匮乏的严峻考验。',
    explain: '有些困难不能绕开，只能一步一步走过去。互相帮助、合理分配物资和坚持行动，最终汇成了穿越困境的力量。',
    think: '面对一项很难、很慢的任务，怎样让自己不半途而废？',
    chainTitle: '极端自然环境中<br>靠什么坚持？',
    chain: [['背景','必须继续向北前进'],['困难','严寒缺氧、补给不足'],['选择','互相扶持继续行军'],['行动','节约物资克服险阻'],['结果','以顽强意志走出困境']],
    keywords: [
      ['艰苦奋斗','条件越艰苦，越依靠行动和毅力克服困难。','把大任务拆成小目标，按计划逐步完成。'],
      ['互助友爱','困难中彼此关心、互相支持，共同前进。','发现同伴掉队时，主动询问并提供帮助。']
    ]
  },
  {
    id: 6, slug: 'huining', name: '会宁', title: '会宁<br>会师', date: '1936年10月', place: '甘肃会宁', spirit: '团结胜利', seal: '会师', position: ['76%', '4%'],
    archive: '1936年10月，红军三大主力在甘肃会宁地区胜利会师，标志着长征胜利结束。历经艰难险阻，不同队伍终于汇聚在一起。',
    explain: '长征的胜利不是一个人的胜利。共同理想、彼此支持和团结协作，让分散的力量最终汇成强大的力量。',
    think: '团队成员想法不同时，怎样找到共同目标并继续合作？',
    chainTitle: '跨越万水千山<br>为何终能会师？',
    chain: [['背景','多支红军分别进行长征'],['困难','路途遥远且险阻重重'],['信念','坚持共同革命理想'],['行动','各路队伍相互策应'],['结果','三大主力胜利会师']],
    keywords: [
      ['团结协作','围绕共同目标互相配合，让每个人的力量汇聚起来。','小组任务先明确分工，再及时互相补位。'],
      ['胜利信念','相信目标值得坚持，并用持续行动接近它。','长期学习中关注每天的进步，不因一次失败放弃。']
    ]
  }
];

const views = [...document.querySelectorAll('.view')];
const navButtons = [...document.querySelectorAll('.bottom-nav button')];
const legacyProgress = Number(localStorage.getItem('sparkProgress') || 0);
const state = {
  unlocked: Math.min(6, Math.max(1, Number(localStorage.getItem('sparkUnlocked') || legacyProgress || 1))),
  completed: JSON.parse(localStorage.getItem('sparkCompleted') || '[]'),
  currentStation: Math.min(6, Math.max(1, Number(localStorage.getItem('sparkCurrentStation') || 1))),
  favorites: JSON.parse(localStorage.getItem('sparkFavorites') || '[]'),
  reflection: localStorage.getItem('sparkReflection') || '',
};

function persistJourney() {
  localStorage.setItem('sparkUnlocked', state.unlocked);
  localStorage.setItem('sparkCompleted', JSON.stringify(state.completed));
  localStorage.setItem('sparkCurrentStation', state.currentStation);
  localStorage.removeItem('sparkProgress');
}

function showView(id) {
  views.forEach(view => view.classList.toggle('is-active', view.id === id));
  const navId = id === 'station' ? 'route' : id;
  navButtons.forEach(button => button.classList.toggle('is-active', button.dataset.go === navId));
  window.scrollTo({top: 0, behavior: 'smooth'});
}

document.querySelectorAll('[data-go]').forEach(button => button.addEventListener('click', () => showView(button.dataset.go)));

function renderRoute() {
  const route = document.querySelector('#routeStations');
  route.innerHTML = stations.map(station => {
    const unlocked = station.id <= state.unlocked;
    const completed = state.completed.includes(station.id);
    const current = station.id === state.currentStation;
    const label = unlocked ? `${station.date.replace('年','.') .replace('月','')} · ${station.spirit}` : `${station.spirit} · 待解锁`;
    return `<button class="station ${unlocked ? 'open' : 'locked'} ${completed ? 'completed' : ''} ${current ? 'current' : ''}" style="--x:${station.position[0]};--y:${station.position[1]}" data-station="${station.id}" aria-label="${station.name}${unlocked ? '' : '，尚未解锁'}"><i>${completed ? '✓' : String(station.id).padStart(2,'0')}</i><div><strong>${station.name}</strong><small>${label}</small></div></button>`;
  }).join('');
  route.querySelectorAll('.station').forEach(button => button.addEventListener('click', () => openStation(Number(button.dataset.station))));
  const current = stations[state.currentStation - 1];
  document.querySelector('#routeNoteTitle').textContent = state.completed.length === 6 ? '长征路线已完成' : `当前研学 · 第 ${String(current.id).padStart(2,'0')} 站`;
  document.querySelector('#routeNoteText').textContent = state.completed.length === 6 ? '六站研学全部完成，你可以返回任意站点复习。' : `继续前往${current.name}。完成本站研学后，下一站将自动点亮。`;
}

function openStation(id) {
  if (id > state.unlocked) return toast(`请先完成第 ${id - 1} 站`);
  state.currentStation = id;
  persistJourney();
  renderStation(stations[id - 1]);
  renderRoute();
  showView('station');
}

function renderStation(station) {
  document.querySelector('#stationIndex').textContent = `STATION ${String(station.id).padStart(2,'0')} / 06`;
  document.querySelector('#stationMeta').textContent = `${station.date} · ${station.place}`;
  document.querySelector('#stationTitle').innerHTML = station.title;
  document.querySelector('#stationSeal').textContent = station.seal;
  document.querySelector('#stationArchive').textContent = station.archive;
  document.querySelector('#stationExplain').textContent = station.explain;
  document.querySelector('#stationThink').textContent = station.think;
  document.querySelector('#chainTitle').innerHTML = station.chainTitle;
  document.querySelector('#causalChain').innerHTML = station.chain.map((item, index) => `${index ? '<span>↓</span>' : ''}<div class="${index === station.chain.length - 1 ? 'result' : ''}"><i>${item[0]}</i><p>${item[1]}</p></div>`).join('');
  document.querySelector('#keywordCards').innerHTML = station.keywords.map((word, index) => `
    <article class="keyword-card ${index ? 'alt' : ''}">
      <div class="keyword-no">0${index + 1}</div><small>LONG MARCH SPIRIT</small><h3>${word[0]}</h3>
      <p>${word[1]}</p><div class="keyword-example"><b>在今天</b>${word[2]}</div>
      <button class="collect-button" data-card="${word[0]}">＋ 收进星火档案</button>
    </article>`).join('');
  bindCollectionButtons();
  document.querySelector('#taskTitle').textContent = state.completed.includes(station.id) ? `${station.name}站已经完成` : `确认完成${station.name}站研学`;
  document.querySelector('#taskCopy').textContent = state.completed.includes(station.id) ? `你已经点亮“${station.spirit}”这份精神力量，可以随时返回复习。` : '本轮先验证完整的解锁与续学流程。专属互动任务将在后续迭代中加入。';
  const completeButton = document.querySelector('#completeStation');
  completeButton.disabled = state.completed.includes(station.id);
  completeButton.textContent = state.completed.includes(station.id) ? '✓ 本站已完成' : station.id === 6 ? '完成最后一站' : '完成本站研学并点亮下一站';
  document.querySelector('#taskFeedback').textContent = '';
  activatePanel('facts');
}

function completeCurrentStation() {
  const id = state.currentStation;
  if (!state.completed.includes(id)) state.completed.push(id);
  state.completed.sort((a,b) => a - b);
  if (id < stations.length) {
    state.unlocked = Math.max(state.unlocked, id + 1);
    state.currentStation = id + 1;
  }
  persistJourney();
  updateJourneyUI();
  renderStation(stations[id - 1]);
  document.querySelector('#taskFeedback').textContent = id === 6 ? '六站研学全部完成！长征路上的六份精神力量已经汇入你的星火档案。' : `${stations[id - 1].name}站已完成，第 ${id + 1} 站“${stations[id].name}”已经点亮。`;
  toast(id === 6 ? '六站长征路全部完成' : `已点亮${stations[id].name}站`);
}

document.querySelector('#completeStation').addEventListener('click', completeCurrentStation);

function activatePanel(id) {
  document.querySelectorAll('.reading-tabs button').forEach(tab => tab.classList.toggle('is-active', tab.dataset.panel === id));
  document.querySelectorAll('.reading-panel').forEach(panel => panel.classList.toggle('is-active', panel.id === id));
}
document.querySelectorAll('.reading-tabs button').forEach(tab => tab.addEventListener('click', () => activatePanel(tab.dataset.panel)));

function updateJourneyUI() {
  const completedCount = state.completed.length;
  document.querySelector('#progressText').textContent = `${completedCount} / 6 站完成`;
  document.querySelector('#progressBar').style.width = `${completedCount / 6 * 100}%`;
  const current = stations[state.currentStation - 1];
  const continueButton = document.querySelector('#continueButton');
  continueButton.innerHTML = completedCount === 6 ? '回看长征路线 <span>→</span>' : `${completedCount ? '继续' : '从'}${current.name}${completedCount ? '研学' : '出发'} <span>→</span>`;
  continueButton.onclick = () => completedCount === 6 ? showView('route') : openStation(current.id);
  renderRoute();
}

function bindCollectionButtons() {
  document.querySelectorAll('.collect-button').forEach(button => {
    const selected = state.favorites.includes(button.dataset.card);
    button.classList.toggle('is-collected', selected);
    button.textContent = selected ? '✓ 已收入星火档案' : '＋ 收进星火档案';
    button.addEventListener('click', () => {
      const card = button.dataset.card;
      if (!state.favorites.includes(card)) {
        state.favorites.push(card);
        localStorage.setItem('sparkFavorites', JSON.stringify(state.favorites));
        toast(`“${card}”已收入档案`);
      }
      button.classList.add('is-collected');
      button.textContent = '✓ 已收入星火档案';
      renderFavorites();
    });
  });
}

function renderFavorites() {
  document.querySelector('#favoriteSummary').textContent = `已收藏 ${state.favorites.length} 张`;
  document.querySelector('#collectionEmpty').hidden = state.favorites.length > 0;
  document.querySelector('#collectionList').innerHTML = state.favorites.map((item, index) => `<article class="saved-card"><div><span>SPARK CARD ${String(index + 1).padStart(2,'0')}</span><strong>${item}</strong></div><b>✦</b></article>`).join('');
}

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

persistJourney();
updateJourneyUI();
renderFavorites();
renderQuestion();
renderStation(stations[state.currentStation - 1]);
