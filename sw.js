const CACHE_NAME = "current-budget-shell-v58";
const APP_SCOPE = self.registration.scope;
const APP_ROOT = new URL("./", APP_SCOPE);
const APP_FILES = [
  new URL("./", APP_ROOT).href,
  new URL("index.html", APP_ROOT).href,
  new URL("manifest.webmanifest", APP_ROOT).href,
  new URL("current.svg", APP_ROOT).href,
  new URL("apple-touch-icon.png", APP_ROOT).href,
  new URL("icon-192.png", APP_ROOT).href,
  new URL("icon-512.png", APP_ROOT).href
];

self.addEventListener("install", event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    // The HTML contains the app's CSS and JavaScript, so caching it is the
    // essential step for a complete offline launch.
    await Promise.all(APP_FILES.map(async url => {
      try {
        const response = await fetch(url, { cache: "reload" });
        if (response.ok) await cache.put(url, response);
      } catch (_) {
        // Keep installing if a non-essential icon/manifest cannot be fetched.
      }
    }));
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys
      .filter(key => key.startsWith("current-budget-shell-") && key !== CACHE_NAME)
      .map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", event => {
  const request = event.request;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    event.respondWith((async () => {
      try {
        const response = await fetch(request);
        if (response && response.ok) {
          const cache = await caches.open(CACHE_NAME);
          await cache.put(request, response.clone());
          // Keep the root entry point available as an offline fallback.
          await cache.put(new URL("./", APP_ROOT).href, response.clone());
          await cache.put(new URL("index.html", APP_ROOT).href, response.clone());
        }
        return response;
      } catch (_) {
        const cached = await caches.match(request, { ignoreSearch: true })
          || await caches.match(new URL("index.html", APP_ROOT).href)
          || await caches.match(new URL("./", APP_ROOT).href);
        if (cached) return cached;
        return new Response("<h1>Offline</h1><p>Open this planner once while online to prepare offline access.</p>", {
          status: 503, headers: { "Content-Type": "text/html; charset=utf-8" }
        });
      }
    })());
    return;
  }

  // Cache-first for same-origin app assets; refresh the cache on a miss.
  event.respondWith((async () => {
    const cached = await caches.match(request, { ignoreSearch: true });
    if (cached) return cached;
    const response = await fetch(request);
    if (response && response.ok) {
      const cache = await caches.open(CACHE_NAME);
      await cache.put(request, response.clone());
    }
    return response;
  })());
});
