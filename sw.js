/* Simple precache + cache-first — GitHub Pages compatible */
var CACHE_NAME = 'istqb-flashcards-v1';
var ASSETS = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './manifest.json'
];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(ASSETS);
    }).then(function () {
      return self.skipWaiting();
    })
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      var tasks = [];
      for (var i = 0; i < keys.length; i++) {
        if (keys[i] !== CACHE_NAME) tasks.push(caches.delete(keys[i]));
      }
      return Promise.all(tasks);
    }).then(function () {
      return self.clients.claim();
    })
  );
});

self.addEventListener('fetch', function (event) {
  var req = event.request;

  event.respondWith(
    caches.match(req).then(function (cached) {
      if (cached) return cached;

      return fetch(req).then(function (res) {
        // on met en cache seulement les requêtes GET "ok"
        if (req.method === 'GET' && res && res.status === 200) {
          var copy = res.clone();
          caches.open(CACHE_NAME).then(function (cache) {
            cache.put(req, copy);
          });
        }
        return res;
      }).catch(function () {
        // fallback navigation
        if (req.mode === 'navigate') {
          return caches.match('./index.html');
        }
        return cached;
      });
    })
  );
});
