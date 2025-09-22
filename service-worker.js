const CACHE_NAME = 'bukusaku-v2';
const urlsToCache = [
  './',
  './index.html',
  './dashboard.html',
  './timeframe.html',
  './daily.html',
  './preposttest.html',
  './prosedur2.html',
  './rostercuti2.html',
  './administrasi.html',
  './manifest.json',
  './icon-152.png',
  './icon-192.png',
  './Alamtri_logo.png',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache).catch(()=>{}))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
    )).then(()=>self.clients.claim())
  );
});
// Cache-first, then network update in background
self.addEventListener('fetch', event => {
  const req = event.request;
  // Only handle GET requests for same-origin HTML/JS/CSS/resources
  if (req.method !== 'GET') return;
  event.respondWith(
    caches.match(req).then(cached => {
      const fetchPromise = fetch(req).then(networkRes => {
        // update cache in background for same-origin requests
        if (networkRes && networkRes.status === 200 && req.url.startsWith(self.location.origin)) {
          caches.open(CACHE_NAME).then(cache => cache.put(req, networkRes.clone()));
        }
        return networkRes.clone();
      }).catch(()=>null);
      // prefer cache if exists, otherwise network (or eventually cached fallback)
      return cached || fetchPromise || new Response('', { status: 504, statusText: 'Offline' });
    })
  );
});
// Optional: allow page to trigger skipWaiting/update via postMessage
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});