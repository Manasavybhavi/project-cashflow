const CACHE_NAME = "cashfit-cache-v1";
const FILES_TO_CACHE = [
  "/",
  "/index.html",
  "/404.html",
  "/challenges.html",
  "/dashboard.html",
  "/history.html",
  "/public-ledger.html",
  "/verifier.html",
  "/workout.html",
  "/logo.png",
  "/manifest.json",
  "/1.avif",
  "/2.avif",
  "/3.avif",
  "/4.avif",
  "/5.avif",
  "/6.avif",
  "/lp1.avif",
  "/lp2.avif",
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log("Pre-caching app shell");
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(
        keyList.map(key => {
          if (key !== CACHE_NAME) {
            console.log("Removing old cache", key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});