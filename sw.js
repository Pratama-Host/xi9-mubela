/* ================================================================
   sw.js — TKJ XI-9 | Service Worker (PWA Offline Cache)
   Versi 2.1 · Patch 2026
   - Cache offline.html sebagai fallback navigasi
   - Stale-while-revalidate untuk halaman HTML
   ================================================================ */
'use strict';

const CACHE_NAME = 'tkj-cache-v1';
const OFFLINE_FALLBACK = './offline.html';
const NOT_FOUND_PAGE = './404.html';

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll([
        './index.html',
        OFFLINE_FALLBACK,
        NOT_FOUND_PAGE,
        './manifest.json',
        './elemen/audio-player.html',
        './pokok/gaya/dasar.css',
        './pokok/gaya/animasi.css',
        './pokok/gaya/tata-letak.css',
        './pokok/skrip/utama.js',
        './assets/logo/logo-utama.svg'
      ]).catch(err => console.warn('[SW] Precache failed:', err));
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  const { request } = event;
  if (request.method !== 'GET') return;

  // Navigation requests (HTML pages)
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(res => {
          // If 404, serve the custom 404 page
          if (res.status === 404) {
            return caches.match(NOT_FOUND_PAGE);
          }
          // Only cache successful responses
          if (res.status === 200) {
            const clone = res.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(request, clone);
            });
          }
          return res;
        })
        .catch(() => {
          // Network failure - try cache or offline page
          return caches.match(request).then(cached => {
            return cached || caches.match(OFFLINE_FALLBACK);
          });
        })
    );
    return;
  }

  // Non-navigation requests (assets)
  event.respondWith(
    caches.match(request).then(cached => {
      return cached || fetch(request).then(res => {
        if (!res || res.status !== 200) return res;
        
        // Cache assets for future use
        if (request.url.match(/\.(js|css|woff2|png|jpg|svg)$/)) {
            const clone = res.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
        }
        return res;
      }).catch(() => {
          // If asset fails and not in cache, just let it fail or return dummy
      });
    })
  );
});

self.addEventListener('message', event => {
  if (event.data?.type === 'SKIP_WAITING') self.skipWaiting();
});
