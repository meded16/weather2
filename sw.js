const CACHE_NAME = 'weather-app-v1';
const urlsToCache = [
  './',
  './index.html',
  './style.css',
  './main.js',
  './79bec98b-cc45-4cfa-9eae-8403901c3dee.jpg',   // твой фон
  // добавь иконки, если они локальные
  // 'https://cdn... твои иконки погоды можно кэшировать тоже
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Если есть в кэше → отдаём из кэша
        if (response) {
          return response;
        }
        // Иначе идём в сеть
        return fetch(event.request);
      })
  );
});