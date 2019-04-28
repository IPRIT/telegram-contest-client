importScripts('/dist/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/dist/014fa65038ff41180130.js",
    "revision": "e1cc18fa76bf95fea8082d0eb55a4ac8"
  },
  {
    "url": "/dist/022b83f130642160989f.js",
    "revision": "41b156ca3e2553b95dc7b15d03075ec6"
  },
  {
    "url": "/dist/0a07c28ca5dcf4d1aee8.js",
    "revision": "feeba17b9a3f7eb2bb179c928349744e"
  },
  {
    "url": "/dist/1c4162a3ba4c9a5dcbcc.js",
    "revision": "c810ac62e557235c667749420e49038b"
  },
  {
    "url": "/dist/22e0c5e25211d5cab0ec.js",
    "revision": "eb362a3ab78754368e6b5acbecc36f78"
  },
  {
    "url": "/dist/2c2e755557a56dc1cfda.js",
    "revision": "9636cf5bb81fe4943d1db7f3ff43cd68"
  },
  {
    "url": "/dist/2d30ee34abc0594b46a1.js",
    "revision": "dd7b442e5efd995c24bc2569ba3ae10c"
  },
  {
    "url": "/dist/502da29361749ba55f50.js",
    "revision": "5fd20f44c1e4c086848d2182cc071cfb"
  },
  {
    "url": "/dist/5d435c41c63d2219cb07.js",
    "revision": "d27919bee9e4458cc7d61aaba4f2d449"
  },
  {
    "url": "/dist/d1dd89722be71db48c6a.js",
    "revision": "aec566a739d5f6a2cf8268296d8d4dda"
  },
  {
    "url": "/dist/e2db778757a2d26a5996.js",
    "revision": "fcce52fe6fc52eadb447cad6d1683972"
  },
  {
    "url": "/dist/e40fd1fcdf0f1f489605.js",
    "revision": "505f4edf93b79f168dcab7a614812f53"
  },
  {
    "url": "/dist/e63c5e15c07184dfddad.js",
    "revision": "5a5c921d0eb5e558ce8f5fd96aa1bf60"
  },
  {
    "url": "/dist/efbc69a7674c7e613ebe.js",
    "revision": "b4bed9acfb86fdc6612007d720e5f0e6"
  },
  {
    "url": "/dist/f0e4416b893747dcc4d2.js",
    "revision": "bbbe9f007df84efd25e7dede85b0e03a"
  },
  {
    "url": "/dist/fb26770dd00206c41a69.js",
    "revision": "4ff674b5d86b75fd3cd25843f14f33ec"
  }
], {
  "cacheId": "cache:javascript-future",
  "directoryIndex": "/",
  "cleanUrls": false
})

workbox.clientsClaim()
workbox.skipWaiting()

workbox.routing.registerRoute(new RegExp('/dist/.*'), workbox.strategies.cacheFirst({}), 'GET')

workbox.routing.registerRoute(new RegExp('/.*'), workbox.strategies.networkFirst({}), 'GET')
