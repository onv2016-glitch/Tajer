const V='tajer-v2',CORE=['./','index.html','manifest.json','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>Promise.allSettled(CORE.map(u=>c.add(u)))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
const put=(r,res)=>{if(res&&(res.ok||res.type=='opaque')){const cp=res.clone();caches.open(V).then(c=>c.put(r,cp))}return res};
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!='GET')return;const u=new URL(r.url);
 if(u.origin==location.origin)e.respondWith(fetch(r).then(res=>put(r,res)).catch(()=>caches.match(r).then(m=>m||caches.match('index.html'))));
 else if(u.hostname=='cdnjs.cloudflare.com')e.respondWith(caches.match(r).then(m=>m||fetch(r).then(res=>put(r,res))));
});
