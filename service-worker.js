var dataCacheName = 'Money-1';
var cacheName = 'Money-Management';
var filesToCache = [
  '/',
  '/index.html',
  '/script/beauty.js',
  '/script/app.js',
  '/script/jquery-3.2.1.min.js',
  '/script/materialize.min.js',
  '/script/style.js',
  '/style/materialize.min.css',
  '/style/style.css'
];

self.addEventListener('install', function(e) {
  // console.log("[serviceWorker] install");
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      // console.log("[serviceWorker] caching app shell");
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(e) {
  // console.log("[serviceWorker] activate");
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName && key !== dataCacheName) {
          // console.log("[serviceWorker] removing old cache", key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  // console.log("[serviceWorker] fetch", e.request.url);
  var dataUrl = self.location.origin;
  if (e.request.url.indexOf(dataUrl) > -1) {
    e.respondWith(
      caches.open(dataCacheName).then(function(cache) {
        return fetch(e.request).then(function(response) {
          cache.put(e.request.url, response.clone());
          return response;
        });
      })
    );
  } else {
    e.respondWith(
      caches.match(e.request).then(function(response) {
        return response || fetch(e.request);
      })
    );
  }
});