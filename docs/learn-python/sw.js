/* Python Path offline support.
 * - The app's own files: network first (so updates arrive straight away), cache as a fallback.
 * - The Python engine and editor in vendor/: cache first (they never change for a given version).
 * - Fonts from Google: cache first, refreshed in the background.
 * The big Python files are cached the first time the page uses them, so the site works
 * offline from the second visit onwards. */
const VERSION = 'python-path-v1';
const CORE = [
  './', 'index.html', 'style.css', 'app.js', 'lessons.js', 'more.js', 'games.js', 'practice.js',
  'vendor/codemirror/codemirror.js', 'vendor/codemirror/codemirror.css', 'vendor/codemirror/python.js',
  'vendor/codemirror/matchbrackets.js', 'vendor/codemirror/closebrackets.js', 'vendor/codemirror/comment.js',
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(VERSION).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k.startsWith('python-path-') && k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim()));
});

async function cacheFirst(req) {
  const hit = await caches.match(req);
  if (hit) return hit;
  const res = await fetch(req);
  if (res && (res.ok || res.type === 'opaque')) (await caches.open(VERSION)).put(req, res.clone());
  return res;
}

async function networkFirst(req) {
  try {
    const res = await fetch(req);
    if (res && res.ok) (await caches.open(VERSION)).put(req, res.clone());
    return res;
  } catch (err) {
    const hit = await caches.match(req, { ignoreSearch: true });
    if (hit) return hit;
    throw err;
  }
}

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const scope = new URL(self.registration.scope);
  if (url.origin === scope.origin) {
    if (!url.pathname.startsWith(scope.pathname)) return;
    event.respondWith(url.pathname.includes('/vendor/') ? cacheFirst(req) : networkFirst(req));
  } else if (/fonts\.(googleapis|gstatic)\.com$|cdn\.jsdelivr\.net$|cdnjs\.cloudflare\.com$/.test(url.hostname)) {
    event.respondWith(cacheFirst(req));
  }
});
