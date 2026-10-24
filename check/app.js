const STORAGE_KEY = 'beibei-observation-records-v1';
const form = document.querySelector('#observation-form');
const recordsEl = document.querySelector('#records');
const scoreEl = document.querySelector('#score');
const confidence = document.querySelector('#confidence');
const confidenceOutput = document.querySelector('#confidence-output');

const escapeHTML = (value) => String(value).replace(/[&<>'"]/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));
const getRecords = () => JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
const saveRecords = records => localStorage.setItem(STORAGE_KEY, JSON.stringify(records));

function render() {
  const records = getRecords();
  const verified = records.filter(item => item.result);
  const points = verified.reduce((sum, item) => sum + ({correct: 1, partial: .5, wrong: 0}[item.result] || 0), 0);
  scoreEl.textContent = verified.length ? `已验证 ${verified.length} 次 · 得分 ${points}/${verified.length}` : '尚无已验证记录';
  if (!records.length) {
    recordsEl.innerHTML = '<div class="empty">还没有记录。下一次产生“我觉得”时，就从事实开始写。</div>';
    return;
  }
  recordsEl.innerHTML = records.map(item => `
    <article class="record">
      <div class="record-date">${escapeHTML(item.created)}<br>${escapeHTML(item.confidence)}%</div>
      <div><h4>${escapeHTML(item.scene)}</h4><p><strong>事实：</strong>${escapeHTML(item.fact)}</p><p><strong>假设：</strong>${escapeHTML(item.a)} / ${escapeHTML(item.b)}</p><p><strong>预测：</strong>${escapeHTML(item.prediction)}（${escapeHTML(item.deadline)} 前）</p>${item.result ? `<p><strong>验证：</strong>${{correct:'正确',partial:'部分正确',wrong:'错误'}[item.result]}</p>` : ''}</div>
      <div class="record-actions" data-id="${item.id}">
        <button data-result="correct">正确</button><button class="partial" data-result="partial">部分</button><button class="partial" data-result="wrong">错误</button><button class="partial" data-delete>删除</button>
      </div>
    </article>`).join('');
}

confidence.addEventListener('input', () => confidenceOutput.textContent = `${confidence.value}%`);
form.addEventListener('reset', () => setTimeout(() => confidenceOutput.textContent = '40%', 0));
form.addEventListener('submit', event => {
  event.preventDefault();
  const records = getRecords();
  records.unshift({
    id: Date.now(), created: new Intl.DateTimeFormat('zh-CN',{month:'2-digit',day:'2-digit'}).format(new Date()),
    scene: document.querySelector('#scene').value.trim(), fact: document.querySelector('#fact').value.trim(),
    a: document.querySelector('#hypothesis-a').value.trim(), b: document.querySelector('#hypothesis-b').value.trim(),
    prediction: document.querySelector('#prediction').value.trim(), deadline: document.querySelector('#deadline').value,
    confidence: confidence.value, result: null
  });
  saveRecords(records); form.reset(); confidenceOutput.textContent = '40%'; render();
});
recordsEl.addEventListener('click', event => {
  const actions = event.target.closest('.record-actions'); if (!actions || event.target.tagName !== 'BUTTON') return;
  let records = getRecords(); const id = Number(actions.dataset.id);
  if (event.target.hasAttribute('data-delete')) records = records.filter(item => item.id !== id);
  else records = records.map(item => item.id === id ? {...item, result: event.target.dataset.result} : item);
  saveRecords(records); render();
});
document.querySelector('#clear-all').addEventListener('click', () => {
  if (getRecords().length && confirm('确定清除全部本地观察记录吗？')) { localStorage.removeItem(STORAGE_KEY); render(); }
});
render();
