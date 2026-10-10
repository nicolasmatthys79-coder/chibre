"use strict";
const CACHE="chibre-v3.27-20261010";
const FILES=["./","./index.html","./comment-ca-marche.html","./i18n.js?v=3.27","./manifest.webmanifest","./icon-192.png","./icon-512.png"];
self.addEventListener("install",event=>{
 event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES)).then(()=>self.skipWaiting()));
});
self.addEventListener("activate",event=>{
 event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE&&(key.startsWith("chibre")||key.startsWith("Chibre"))).map(key=>caches.delete(key)))).then(()=>self.clients.claim()));
});
function navigationKey(url){
 const base=new URL("./",self.location.href);
 if(url.pathname===base.pathname||url.pathname===new URL("index.html",base).pathname)return new URL("index.html",base).href;
 if(url.pathname===new URL("comment-ca-marche.html",base).pathname)return new URL("comment-ca-marche.html",base).href;
 return url.origin+url.pathname;
}
self.addEventListener("fetch",event=>{
 const url=new URL(event.request.url);
 if(event.request.method!=="GET"||url.origin!==self.location.origin)return;
 if(event.request.mode==="navigate"){
  const key=navigationKey(url);
  event.respondWith((async()=>{
   try{
    const response=await fetch(event.request);
    if(response.ok){const copy=response.clone();event.waitUntil(caches.open(CACHE).then(cache=>cache.put(key,copy)));return response;}
    return (await caches.match(key))||response;
   }catch(error){
    return (await caches.match(key))||new Response("Offline",{status:503,headers:{"Content-Type":"text/plain;charset=utf-8"}});
   }
  })());return;
 }
 event.respondWith((async()=>{
  const cached=await caches.match(event.request);
  if(cached)return cached;
  const response=await fetch(event.request);
  if(response.ok){const copy=response.clone();event.waitUntil(caches.open(CACHE).then(cache=>cache.put(event.request,copy)));}
  return response;
 })());
});
