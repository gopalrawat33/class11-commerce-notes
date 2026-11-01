const CACHE="commerce-notes-v1";
const FILES=["./","./index.html","./manifest.json","./notes-fallback.json"];
self.addEventListener("install",e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES))));
self.addEventListener("fetch",e=>{
  if(e.request.method!=="GET")return;
  e.respondWith(fetch(e.request).then(response=>{
    if(response.ok && new URL(e.request.url).origin===location.origin){
      const copy=response.clone(); caches.open(CACHE).then(c=>c.put(e.request,copy));
    }
    return response;
  }).catch(()=>caches.match(e.request).then(r=>r||Response.error())));
});