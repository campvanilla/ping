const swVersion = '0.0.4';
const cacheName = `ping-${swVersion}`;
const filesToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/images/192x192.png',
  '/images/512x512.png',
  '/app.js',
];

const poller = () => {
  return fetch('https://sendback-api.now.sh/status-code/200')
}

self.addEventListener('install', (event) => {
  console.log(`[${swVersion}] [service worker] Installed`);

  event.waitUntil(
    caches
    .open(cacheName)
    .then(function (cache) {
      console.log(`[${swVersion}] [service worker] Caching resources`)
      return cache.addAll(filesToCache)
    })
    .then(function() {
      return self.skipWaiting();
    })
  );
});

self.addEventListener('activate', (event) => {
  console.log(`[${swVersion}] [service worker] Activated`)
  console.log(`[${swVersion}] [service worker] Clearing older caches`);

  event.waitUntil(
    caches
    .keys()
    .then(function(keyList) {
      return Promise.all(keyList.map((key) => {
        if (key !== cacheName) {
          return caches.delete(key);
        }
      }));
    })
  )

  return self.clients.claim();
});

self.addEventListener('fetch', function (event) {
  console.log(`[${swVersion}] [service worker] Restoring from cache`)

  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('sync', function (event) {
  if (event.tag == 'poller') {
    event.waitUntil(
      poller()
      .then(() => {
        self.registration.showNotification("You are back online!");
        return Promise.resolve();
      })
      .catch(() => {
        console.log('Ping!');
        return Promise.reject()
      })
    );
  }
});
