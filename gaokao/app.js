(function () {
  "use strict";

  const searchInput = document.querySelector("[data-essay-search]");
  const issueCards = Array.from(document.querySelectorAll(".issue-card"));
  const visibleCount = document.querySelector("[data-visible-count]");
  const emptyResult = document.querySelector("[data-empty-result]");

  if (searchInput && issueCards.length) {
    const filterIssues = function () {
      const query = searchInput.value.trim().toLocaleLowerCase("zh-CN");
      let count = 0;

      issueCards.forEach(function (card) {
        const matches = !query || (card.dataset.search || "").toLocaleLowerCase("zh-CN").includes(query);
        card.hidden = !matches;
        if (matches) count += 1;
      });

      if (visibleCount) visibleCount.textContent = String(count);
      if (emptyResult) emptyResult.hidden = count !== 0;
    };

    searchInput.addEventListener("input", filterIssues);
    searchInput.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && searchInput.value) {
        searchInput.value = "";
        filterIssues();
      }
    });
  }

  const articleSelect = document.querySelector("[data-article-select]");
  if (articleSelect) {
    articleSelect.addEventListener("change", function () {
      window.location.assign(articleSelect.value);
    });
  }

  const modeButtons = Array.from(document.querySelectorAll("[data-view-mode]"));
  const sectionLinks = Array.from(document.querySelectorAll("[data-nav-section]"));
  const sections = Array.from(document.querySelectorAll(".training-section"));
  const essayLink = document.querySelector(".essay-copy-link");
  const progressBars = Array.from(document.querySelectorAll(".reading-progress span, .toc-progress span"));
  let currentMode = document.body.dataset.view || "full";

  const setActiveLink = function (sectionId) {
    sectionLinks.forEach(function (link) {
      link.classList.toggle("is-active", link.dataset.navSection === sectionId);
    });
    if (essayLink) essayLink.classList.toggle("is-active", currentMode === "essay");
  };

  const updateProgress = function () {
    const scrollable = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
    const percent = Math.min(100, Math.max(0, (window.scrollY / scrollable) * 100));
    progressBars.forEach(function (bar) {
      bar.style.width = percent.toFixed(2) + "%";
    });
  };

  const applyMode = function (mode, remember) {
    currentMode = mode === "essay" ? "essay" : "full";
    document.body.dataset.view = currentMode;
    modeButtons.forEach(function (button) {
      button.setAttribute("aria-pressed", String(button.dataset.viewMode === currentMode));
    });
    setActiveLink(currentMode === "essay" ? "final-essay-copy" : sections[0]?.id || "");
    if (remember) {
      try {
        window.localStorage.setItem("gaokao-view", currentMode);
      } catch (_error) {
        // The reading mode still works when storage is unavailable.
      }
    }
    window.requestAnimationFrame(updateProgress);
  };

  if (modeButtons.length) {
    let savedMode = "full";
    try {
      savedMode = window.localStorage.getItem("gaokao-view") || "full";
    } catch (_error) {
      savedMode = "full";
    }
    applyMode(savedMode, false);

    modeButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        applyMode(button.dataset.viewMode, true);
        window.scrollTo({ top: document.querySelector(".reader-shell")?.offsetTop || 0, behavior: "smooth" });
      });
    });
  }

  if (sections.length && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        if (currentMode !== "full") return;
        const visible = entries
          .filter(function (entry) { return entry.isIntersecting; })
          .sort(function (a, b) { return a.boundingClientRect.top - b.boundingClientRect.top; });
        if (visible[0]) setActiveLink(visible[0].target.id);
      },
      { rootMargin: "-12% 0px -70% 0px", threshold: [0, 0.05] }
    );
    sections.forEach(function (section) { observer.observe(section); });
  }

  if (progressBars.length) {
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
  }

  document.querySelectorAll("[data-back-top]").forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });
})();
