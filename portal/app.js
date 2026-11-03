(function () {
  "use strict";

  var projects = window.QINYIBIN_PROJECTS || [];
  var grid = document.getElementById("project-grid");
  var filters = document.getElementById("project-filters");
  var search = document.getElementById("project-search");
  var empty = document.getElementById("empty-state");
  var activeCategory = "全部";

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function searchableText(project) {
    return [project.name, project.category, project.domain, project.description]
      .concat(project.subprojects.map(function (item) { return item[0]; }))
      .join(" ")
      .toLowerCase();
  }

  function renderFilters() {
    var categories = ["全部"].concat(Array.from(new Set(projects.map(function (item) {
      return item.category;
    }))));

    filters.innerHTML = categories.map(function (category) {
      return '<button class="filter-button" type="button" data-category="' +
        escapeHtml(category) + '" aria-pressed="' + (category === activeCategory) + '">' +
        escapeHtml(category) + '</button>';
    }).join("");
  }

  function renderProjects() {
    var query = search.value.trim().toLowerCase();
    var visible = projects.filter(function (project) {
      var categoryMatch = activeCategory === "全部" || project.category === activeCategory;
      return categoryMatch && (!query || searchableText(project).includes(query));
    });

    grid.innerHTML = visible.map(function (project) {
      var links = project.subprojects.map(function (item) {
        return '<a class="subproject-link" href="' + escapeHtml(item[1]) + '">' +
          escapeHtml(item[0]) + '</a>';
      }).join("");

      return '<article class="project-card" style="--accent:' + escapeHtml(project.color) + '">' +
        '<div class="card-top"><span class="subject-mark">' + escapeHtml(project.mark) + '</span>' +
        '<span class="project-count">' + (project.subprojects.length ? project.subprojects.length + " 个子项目" : "独立项目") + '</span></div>' +
        '<h3><a href="' + escapeHtml(project.url) + '">' + escapeHtml(project.name) + '</a></h3>' +
        '<p class="project-domain">' + escapeHtml(project.domain) + '</p>' +
        '<p class="project-description">' + escapeHtml(project.description) + '</p>' +
        (links ? '<div class="subprojects">' + links + '</div>' : '') +
        '</article>';
    }).join("");

    empty.hidden = visible.length !== 0;
  }

  filters.addEventListener("click", function (event) {
    var button = event.target.closest("button[data-category]");
    if (!button) return;
    activeCategory = button.dataset.category;
    renderFilters();
    renderProjects();
  });

  search.addEventListener("input", renderProjects);

  var childCount = projects.reduce(function (total, project) {
    return total + project.subprojects.length;
  }, 0);
  document.getElementById("project-summary").textContent =
    projects.length + " 个学习站点 · " + childCount + " 个子项目";
  document.getElementById("footer-year").textContent = new Date().getFullYear();

  renderFilters();
  renderProjects();

  var appVersion = document.querySelector('meta[name="application-version"]').content;
  var updateStatus = document.getElementById("update-status");
  var updateInProgress = false;

  function showUpdateStatus(message) {
    updateStatus.textContent = message;
    updateStatus.hidden = false;
  }

  function reloadForUpdate() {
    if (updateInProgress) return;
    updateInProgress = true;
    showUpdateStatus("已发现新版本，正在更新…");
    window.setTimeout(function () {
      var url = new URL(window.location.href);
      url.searchParams.set("updated", Date.now());
      window.location.replace(url.toString());
    }, 180);
  }

  function checkAppVersion() {
    fetch("/version.json?check=" + Date.now(), { cache: "no-store" })
      .then(function (response) { return response.ok ? response.json() : null; })
      .then(function (data) {
        if (data && data.version && data.version !== appVersion) reloadForUpdate();
      })
      .catch(function () { /* Offline: the service worker supplies the last usable shell. */ });
  }

  if ("serviceWorker" in navigator) {
    var refreshing = false;
    var hadController = Boolean(navigator.serviceWorker.controller);
    navigator.serviceWorker.addEventListener("controllerchange", function () {
      if (!hadController) {
        hadController = true;
        return;
      }
      if (refreshing) return;
      refreshing = true;
      reloadForUpdate();
    });

    window.addEventListener("load", function () {
      navigator.serviceWorker.register("/sw.js?v=20261101-1", { scope: "/" })
        .then(function (registration) {
          registration.update();
          if (registration.waiting) registration.waiting.postMessage({ type: "SKIP_WAITING" });
          registration.addEventListener("updatefound", function () {
            var worker = registration.installing;
            if (!worker) return;
            worker.addEventListener("statechange", function () {
              if (worker.state === "installed" && navigator.serviceWorker.controller) {
                worker.postMessage({ type: "SKIP_WAITING" });
              }
            });
          });
        })
        .catch(function () { /* The portal remains fully usable without installation support. */ });
    });
  }

  window.addEventListener("pageshow", checkAppVersion);
  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "visible") checkAppVersion();
  });
}());
