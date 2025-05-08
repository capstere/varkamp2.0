const CACHE = 'femkamp-v1';
const ASSETS = ['/', '/bundle.js', '/styles.css', '/assets/correct.mp3', '/assets/wrong.mp3', '/assets/p3-chorus-rev.mp3'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
});
self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});