(function () {
  'use strict';
  var data = null;
  var cards = [];
  var queue = [];
  var cursor = 0;
  var revealed = false;
  var weakFirst = false;
  var activeUnit = '';
  var storageKey = 'history-outline-progress-v1';
  var progress = loadProgress();
  var focus = document.getElementById('focus-practice');
  var browser = document.getElementById('outline-browser');
  var status = document.getElementById('outline-status');
  var unitNav = document.getElementById('outline-units');

  function escapeHtml(value) {
    return String(value || '').replace(/[&<>"']/g, function (char) {
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[char];
    });
  }

  function loadProgress() {
    try { return JSON.parse(localStorage.getItem(storageKey)) || {}; } catch (_) { return {}; }
  }

  function saveProgress() {
    localStorage.setItem(storageKey, JSON.stringify(progress));
  }

  function hasHidden(segments) {
    return (segments || []).some(function (part) { return part.hidden; });
  }

  function blankFor(text) {
    var length = Math.max(2, Math.min(10, String(text).replace(/\s/g, '').length));
    return new Array(length + 1).join('＿');
  }

  function renderSegments(segments, showAnswer, clickable) {
    return (segments || []).map(function (part) {
      if (!part.hidden) return escapeHtml(part.text);
      if (showAnswer) return '<mark class="memory-answer">' + escapeHtml(part.text) + '</mark>';
      if (clickable) return '<button type="button" class="memory-blank" data-answer="' + escapeHtml(part.text) + '" aria-label="点击揭晓背诵内容">' + blankFor(part.text) + '</button>';
      return '<span class="memory-blank static">' + blankFor(part.text) + '</span>';
    }).join('');
  }

  function buildCards() {
    cards = [];
    var current = null;
    var currentUnit = '';
    var currentLesson = '';
    function finishCurrent() {
      if (current && current.hasMemory) cards.push(current);
      current = null;
    }
    function itemHasHidden(item) {
      if (hasHidden(item.segments)) return true;
      return (item.rows || []).some(function (row) { return row.some(hasHidden); });
    }
    function itemText(item) {
      return (item.segments || []).map(function (part) { return part.text; }).join('').trim();
    }
    data.items.forEach(function (item) {
      if (item.kind === 'unit') { finishCurrent(); currentUnit = item.unit || itemText(item); return; }
      if (item.kind === 'lesson') { finishCurrent(); currentLesson = item.lesson || itemText(item); return; }
      var text = itemText(item);
      var isFirstLevel = /^\s*(?:\d{1,2}\s*[.、．]|[一二三四五六七八九十]+、)/.test(text);
      if (isFirstLevel) {
        finishCurrent();
        var headingOnly = !itemHasHidden(item);
        var number = (text.match(/^\s*(\d{1,2})/) || [null, ''])[1];
        current = {
          id: 'group-' + item.id,
          unit: item.unit || currentUnit,
          lesson: item.lesson || currentLesson,
          title: headingOnly ? text.replace(/[\s★]+$/g, '') : ('第 ' + (number || '当前') + ' 项'),
          items: [],
          hasMemory: false
        };
        if (headingOnly) return;
      }
      if (!current) return;
      current.items.push(item);
      current.hasMemory = current.hasMemory || itemHasHidden(item);
    });
    finishCurrent();
    if (!activeUnit && cards.length) activeUnit = cards[0].unit;
    renderUnits();
    rebuildQueue();
  }

  function renderUnits() {
    var units = Array.from(new Set(cards.map(function (card) { return card.unit; })));
    unitNav.innerHTML = units.map(function (unit, index) {
      var shortName = (unit.match(/^第[^单元]*单元/) || [unit])[0];
      var count = cards.filter(function (card) { return card.unit === unit; }).length;
      return '<button type="button" data-unit-index="' + index + '" data-unit="' + escapeHtml(unit) + '" aria-pressed="' + (unit === activeUnit) + '"><strong>' + escapeHtml(shortName) + '</strong><span>' + count + ' 页</span></button>';
    }).join('');
  }

  function rebuildQueue() {
    var currentId = queue[cursor] && queue[cursor].id;
    queue = cards.filter(function (card) { return card.unit === activeUnit; });
    if (weakFirst) {
      queue.sort(function (a, b) {
        var ar = progress[a.id] ? progress[a.id].rating : 0;
        var br = progress[b.id] ? progress[b.id].rating : 0;
        return ar - br;
      });
    }
    cursor = Math.max(0, queue.findIndex(function (card) { return card.id === currentId; }));
    if (cursor < 0) cursor = 0;
    revealed = false;
    renderFocus();
  }

  function renderStatus() {
    var counts = {1:0,2:0,3:0};
    Object.keys(progress).forEach(function (id) {
      if (progress[id] && counts[progress[id].rating] !== undefined) counts[progress[id].rating]++;
    });
    status.innerHTML = '<span><b>' + queue.length + '</b> 个一级知识点</span><span class="bad">不会 ' + counts[1] + '</span><span class="fuzzy">模糊 ' + counts[2] + '</span><span class="good">会了 ' + counts[3] + '</span>';
  }

  function renderCardItem(item, showAnswer) {
    if (item.kind === 'table') {
      return '<div class="recall-table-wrap"><table class="recall-table"><tbody>' + item.rows.map(function (row) {
        return '<tr>' + row.map(function (cell) { return '<td>' + renderSegments(cell, showAnswer, false) + '</td>'; }).join('') + '</tr>';
      }).join('') + '</tbody></table></div>';
    }
    return '<p class="recall-block">' + renderSegments(item.segments, showAnswer, false) + '</p>';
  }

  function renderFocus() {
    renderStatus();
    if (!queue.length) { focus.innerHTML = '<p class="empty">没有可背诵的红字内容。</p>'; return; }
    var card = queue[cursor % queue.length];
    var score = progress[card.id] && progress[card.id].rating;
    focus.innerHTML = '<article class="recall-card ' + (revealed ? 'is-revealed' : '') + '">' +
      '<div class="recall-meta"><span>' + escapeHtml(card.unit || '七上历史') + '</span><b>' + (cursor + 1) + ' / ' + queue.length + '</b></div>' +
      '<p class="recall-lesson">' + escapeHtml(card.lesson || '知识点背诵') + '</p>' +
      '<h3 class="recall-title">' + escapeHtml(card.title) + '</h3>' +
      '<div class="recall-prompt">' + card.items.map(function (item) { return renderCardItem(item, revealed); }).join('') + '</div>' +
      (!revealed ? '<button id="reveal-answer" class="reveal-button" type="button">想好后，揭晓答案 <kbd>Space</kbd></button>' :
        '<div class="rating"><p>刚才能完整说出来吗？</p><button data-rating="1" type="button">1 · 不会</button><button data-rating="2" type="button">2 · 模糊</button><button data-rating="3" type="button">3 · 会了</button></div>') +
      (score ? '<p class="last-score">上次自评：' + ({1:'不会',2:'模糊',3:'会了'}[score]) + '</p>' : '') +
      '<div class="card-nav"><button id="prev-card" type="button">← 上一条</button><button id="next-card" type="button">下一条 →</button></div>' +
      '</article>';
  }

  function move(step) {
    if (!queue.length) return;
    cursor = (cursor + step + queue.length) % queue.length;
    revealed = false;
    renderFocus();
  }

  function renderBrowser() {
    browser.innerHTML = data.items.map(function (item) {
      if (item.kind === 'unit') return '<h2 class="outline-unit">' + renderSegments(item.segments, true, false) + '</h2>';
      if (item.kind === 'lesson') return '<h3 class="outline-lesson">' + renderSegments(item.segments, true, false) + '</h3>';
      if (item.kind === 'table') {
        return '<div class="outline-table-wrap"><table class="outline-table"><tbody>' + item.rows.map(function (row) {
          return '<tr>' + row.map(function (cell) { return '<td>' + renderSegments(cell, false, true) + '</td>'; }).join('') + '</tr>';
        }).join('') + '</tbody></table></div>';
      }
      return '<p class="outline-line ' + (item.kind === 'recall' ? 'has-memory' : '') + '">' + renderSegments(item.segments, false, true) + '</p>';
    }).join('');
  }

  document.querySelector('.mode-tabs').addEventListener('click', function (event) {
    var button = event.target.closest('button[data-view]');
    if (!button) return;
    document.querySelectorAll('.mode-tabs button').forEach(function (item) { item.classList.toggle('active', item === button); });
    document.getElementById('qa-view').hidden = button.dataset.view !== 'qa-view';
    document.getElementById('outline-view').hidden = button.dataset.view !== 'outline-view';
    if (button.dataset.view === 'outline-view') renderFocus();
  });

  document.querySelector('.outline-modes').addEventListener('click', function (event) {
    var button = event.target.closest('button[data-outline-mode]');
    if (!button) return;
    document.querySelectorAll('.outline-modes button').forEach(function (item) { item.classList.toggle('active', item === button); });
    var browsing = button.dataset.outlineMode === 'browse';
    focus.hidden = browsing;
    browser.hidden = !browsing;
  });

  document.getElementById('weak-first').addEventListener('click', function (event) {
    weakFirst = !weakFirst;
    event.currentTarget.classList.toggle('active', weakFirst);
    event.currentTarget.textContent = weakFirst ? '正在优先复习不会的' : '优先复习不会的';
    rebuildQueue();
  });

  unitNav.addEventListener('click', function (event) {
    var button = event.target.closest('button[data-unit]');
    if (!button || button.dataset.unit === activeUnit) return;
    activeUnit = button.dataset.unit;
    cursor = 0;
    revealed = false;
    renderUnits();
    rebuildQueue();
  });

  focus.addEventListener('click', function (event) {
    if (event.target.closest('#reveal-answer')) { revealed = true; renderFocus(); return; }
    if (event.target.closest('#prev-card')) { move(-1); return; }
    if (event.target.closest('#next-card')) { move(1); return; }
    var rating = event.target.closest('[data-rating]');
    if (rating) {
      var card = queue[cursor % queue.length];
      progress[card.id] = {rating:Number(rating.dataset.rating), seen:Date.now()};
      saveProgress();
      move(1);
    }
  });

  browser.addEventListener('click', function (event) {
    var blank = event.target.closest('.memory-blank[data-answer]');
    if (!blank) return;
    blank.outerHTML = '<mark class="memory-answer">' + escapeHtml(blank.dataset.answer) + '</mark>';
  });

  document.addEventListener('keydown', function (event) {
    if (document.getElementById('outline-view').hidden || focus.hidden) return;
    if (event.code === 'Space' && !revealed && event.target.tagName !== 'INPUT') { event.preventDefault(); revealed = true; renderFocus(); }
    if (revealed && ['1','2','3'].includes(event.key)) {
      var card = queue[cursor % queue.length];
      progress[card.id] = {rating:Number(event.key), seen:Date.now()};
      saveProgress(); move(1);
    }
  });

  fetch('outline.json').then(function (response) {
    if (!response.ok) throw new Error(response.status);
    return response.json();
  }).then(function (result) {
    data = result;
    buildCards();
    renderBrowser();
  }).catch(function () {
    focus.innerHTML = '<p class="empty">背诵提纲加载失败，请刷新页面重试。</p>';
  });
}());
