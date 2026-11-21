const CACHE_NAME = "rsvk-silver-shell-v1";
const BASE = "/rsvk-silver-store/";
const SHELL = [BASE, BASE+"index.html", BASE+"manifest.json", BASE+"icons/icon-192.png", BASE+"icons/icon-512.png"];
self.addEventListener("install", e => e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())));
self.addEventListener("activate", e => e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k.startsWith("rsvk-silver-shell-") && k !== CACHE_NAME).map(k => caches.delete(k)))).then(() => self.clients.claim())));
self.addEventListener("fetch", e => {
  const req=e.request, url=new URL(req.url);
  if(req.method!=="GET" || url.origin!==self.location.origin) return;
  if(req.mode==="navigate" || url.pathname===BASE || url.pathname===BASE+"index.html") {
    e.respondWith(fetch(req).then(res=>{const copy=res.clone();caches.open(CACHE_NAME).then(c=>c.put(req,copy));return res;}).catch(()=>caches.match(req).then(c=>c||caches.match(BASE))));
  } else if(url.pathname.startsWith(BASE)) {
    e.respondWith(caches.match(req).then(c=>c||fetch(req).then(res=>{if(res.ok){const copy=res.clone();caches.open(CACHE_NAME).then(cache=>cache.put(req,copy));}return res;})));
  }
});
