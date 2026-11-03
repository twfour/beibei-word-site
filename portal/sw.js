"use strict";

const CACHE_NAME = "qinyibin-portal-2026.11.03.1";
const APP_SHELL = [
  "/",
  "/index.html",
  "/styles.css?v=20261103-1",
  "/app.js?v=20261103-1",
  "/projects.js?v=20261103-1",
  "/manifest.webmanifest?v=20261102-1",
  "/assets/favicon.svg",
  "/assets/apple-touch-icon.png?v=20261101-1",
  "/assets/icon-192.png?v=20261101-1",
  "/assets/icon-512.png?v=20261101-1",
  "/assets/study-desk.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((names) => Promise.all(names.filter((name) => name !== CACHE_NAME).map((name) => caches.delete(name))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") self.skipWaiting();
});

async function networkFirst(request, cacheKey) {
  const cache = await caches.open(CACHE_NAME);
  try {
    const response = await fetch(request, { cache: "no-store" });
    if (response.ok) await cache.put(cacheKey || request, response.clone());
    return response;
  } catch (error) {
    return (await cache.match(cacheKey || request, { ignoreSearch: true })) || (await cache.match("/index.html"));
  }
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request, { ignoreSearch: true });
  const update = fetch(request).then((response) => {
    if (response.ok) cache.put(request, response.clone());
    return response;
  }).catch(() => cached);
  return cached || update;
}

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET" || new URL(event.request.url).origin !== self.location.origin) return;
  const url = new URL(event.request.url);
  if (url.pathname === "/version.json") return;
  const freshPaths = ["/", "/index.html", "/styles.css", "/app.js", "/projects.js", "/manifest.webmanifest"];
  if (event.request.mode === "navigate" || freshPaths.includes(url.pathname)) {
    const cacheKey = event.request.mode === "navigate" ? "/index.html" : url.pathname;
    event.respondWith(networkFirst(event.request, cacheKey));
  } else {
    event.respondWith(staleWhileRevalidate(event.request));
  }
});
