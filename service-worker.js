/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "a54eb87d512328e9d6100bf7d40ff7a9"
  },
  {
    "url": "aboutThis/index.html",
    "revision": "e032d7dbafa13b44242c7942397965b5"
  },
  {
    "url": "advance/Echarts/index.html",
    "revision": "2e35f96fc341b54fb57e61cf6d2c5a99"
  },
  {
    "url": "advance/index.html",
    "revision": "69873b21fc7cc5427261628173c65068"
  },
  {
    "url": "advance/ts/index.html",
    "revision": "0d4489a270285e8ad8c4406d0dc1d90e"
  },
  {
    "url": "advance/ts/TypeScript.html",
    "revision": "4e7b569b0166ee2832f3446555449be5"
  },
  {
    "url": "advance/vue/index.html",
    "revision": "423fbe930ce8db8a3afd6efde8f25da9"
  },
  {
    "url": "advance/vue/Vue3.html",
    "revision": "ca6de44f32c8f0d9ee24a151f6445caf"
  },
  {
    "url": "advance/Vuex/index.html",
    "revision": "1c1f7b7475d1e458e2c248436a744062"
  },
  {
    "url": "advance/webEngineer/index.html",
    "revision": "cd2e7b7d5cd511bb1e2affe6daabe22f"
  },
  {
    "url": "Amway/index.html",
    "revision": "d337b61c843d64ed26c58a442a28ae79"
  },
  {
    "url": "assets/css/0.styles.eb613f95.css",
    "revision": "ac39edceac014ddb3293be2df9974aaa"
  },
  {
    "url": "assets/img/logo.png",
    "revision": "d1fed5cb9d0a4c4269c3bcc4d74d9e64"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/img/smoke.png",
    "revision": "a29296dd4dfcb2147b6bf98469b2e17c"
  },
  {
    "url": "assets/js/10.3f10c92c.js",
    "revision": "0385c81b3913a0dcbdeeda8d8a271ccd"
  },
  {
    "url": "assets/js/11.ddf57d2a.js",
    "revision": "3cf4c3924b9bae848c6eb34fe3a34727"
  },
  {
    "url": "assets/js/12.d7b26858.js",
    "revision": "436f894a972ff563341d0cfaae7b6870"
  },
  {
    "url": "assets/js/13.95bfb2cc.js",
    "revision": "086d615b1251c04edf7352bb970f6bf4"
  },
  {
    "url": "assets/js/14.fac931ae.js",
    "revision": "86d4ead18f545bab0af32d1e3ef9520e"
  },
  {
    "url": "assets/js/15.2e13c7c7.js",
    "revision": "0c0c8eef3818d9b614fd4156a65da661"
  },
  {
    "url": "assets/js/16.a253b6d5.js",
    "revision": "b72c15e3eac2343a91d16cb7d1283b63"
  },
  {
    "url": "assets/js/17.76439d3f.js",
    "revision": "04a78811d6ecdaf5cd3de00c092d21df"
  },
  {
    "url": "assets/js/18.45b31205.js",
    "revision": "07797ca4a4a6becf4fec658854f794cf"
  },
  {
    "url": "assets/js/19.03eec98f.js",
    "revision": "56bdbfab6f0c42a8d72e75be769376de"
  },
  {
    "url": "assets/js/2.c2e75043.js",
    "revision": "d02f71c36749dd80b9f0ad6b0ecee8ec"
  },
  {
    "url": "assets/js/20.f2d28766.js",
    "revision": "7cbdbc071075e788c4b0456cdbbbe38e"
  },
  {
    "url": "assets/js/21.c6faef9e.js",
    "revision": "7aa2387991f3d07673eb585cf14924b3"
  },
  {
    "url": "assets/js/22.64ed0a79.js",
    "revision": "432cb333855f8038db3c30b5659278aa"
  },
  {
    "url": "assets/js/23.6c7ac40e.js",
    "revision": "6b389a6f1a28cbe44882e13dd085e82e"
  },
  {
    "url": "assets/js/24.9253a9d7.js",
    "revision": "7338c4ac1d4256d336ffbf335c557f23"
  },
  {
    "url": "assets/js/25.c674132e.js",
    "revision": "d5c04cb58478200f410f64e52480c6b1"
  },
  {
    "url": "assets/js/26.a531193b.js",
    "revision": "58d8766e1633c0154ea0c7651e6c33fa"
  },
  {
    "url": "assets/js/27.c8d59240.js",
    "revision": "aa5066e0969500fa4decb93d74d360bc"
  },
  {
    "url": "assets/js/28.aa9bbb3e.js",
    "revision": "cd5dc0b8e621a86d278ef4723f17eac3"
  },
  {
    "url": "assets/js/29.85b1e681.js",
    "revision": "e94c8667f574ac80337d081a0e07eb87"
  },
  {
    "url": "assets/js/3.a96fac23.js",
    "revision": "a1a616f148cf54657b65ef0e7db356b0"
  },
  {
    "url": "assets/js/30.7a7a6fcc.js",
    "revision": "b45fde023d33911558a7b14f8c04638f"
  },
  {
    "url": "assets/js/31.fa73150e.js",
    "revision": "4189a2a92b982f503e7b7c10fa20bfcd"
  },
  {
    "url": "assets/js/32.94cc72d3.js",
    "revision": "ece7ae39448e8c850689d5f9806e1443"
  },
  {
    "url": "assets/js/33.136d1951.js",
    "revision": "6ce08c9e4ec5a84180b04ba5aee354b2"
  },
  {
    "url": "assets/js/4.8743d42d.js",
    "revision": "12dc412d05360ddd2f73602dff207ba6"
  },
  {
    "url": "assets/js/5.c22f32dd.js",
    "revision": "a72b6c617459860cf444d786d141acfb"
  },
  {
    "url": "assets/js/6.203f027d.js",
    "revision": "09bb94b5e68facf3b6b9a5b1a1fadb1c"
  },
  {
    "url": "assets/js/7.58542634.js",
    "revision": "397657dbf03ce87d5358471dbe59ed7c"
  },
  {
    "url": "assets/js/8.000400a6.js",
    "revision": "c7c5effcd060f3d7ab1f03b85ad68e53"
  },
  {
    "url": "assets/js/9.fe73246e.js",
    "revision": "d1b2aab2059f26ded39e50c334335c15"
  },
  {
    "url": "assets/js/app.c0f8f10d.js",
    "revision": "7f9a5fa79da869ac19939591f7708965"
  },
  {
    "url": "basis/axios/index.html",
    "revision": "a35a65dca3c0dd9965cb356eae1a151d"
  },
  {
    "url": "basis/git/index.html",
    "revision": "1b16852e13c9b2109891dede2b17c07b"
  },
  {
    "url": "basis/Internet/browser.html",
    "revision": "24a07890d98789c63af650c0609d9aef"
  },
  {
    "url": "basis/Internet/http.html",
    "revision": "d6901c19e4eeac8a3f4b45e3e398393b"
  },
  {
    "url": "basis/Internet/index.html",
    "revision": "fe770417d46361eb24fd8e3fe0527f27"
  },
  {
    "url": "basis/module/index.html",
    "revision": "55b701e0e2e4bc16c3d9637faa12f2e5"
  },
  {
    "url": "basis/regexp/index.html",
    "revision": "8801463d6ae6cd29747390763140bdf1"
  },
  {
    "url": "countup/index.html",
    "revision": "cd749a733d265c9a640c03ebdaabe64d"
  },
  {
    "url": "expand/index.html",
    "revision": "3b8c5611510dde80c7806207fdaf8dc3"
  },
  {
    "url": "icons/144x144.png",
    "revision": "a9b85163c4f7eeb77914e8aadc498f12"
  },
  {
    "url": "icons/16x16.png",
    "revision": "df6eee250d8bf429853235501098b66d"
  },
  {
    "url": "icons/192x192.png",
    "revision": "d4fe4e9594dfbf8274a14f9ea3a8beba"
  },
  {
    "url": "icons/32x32.png",
    "revision": "dc56ab478ea47eaae7c5a9d808e1a272"
  },
  {
    "url": "icons/512x512.png",
    "revision": "b9be7b23d6c1b6a32ac6966a6692485a"
  },
  {
    "url": "icons/safari-pinned-tab.svg",
    "revision": "4f47e7c659bfeaa801a7aa077171d0be"
  },
  {
    "url": "index.html",
    "revision": "4f6241be1820256a19c3ad547e9e6b24"
  },
  {
    "url": "other/jsReview/index.html",
    "revision": "b53ead247d9a9e8618babd65a8d86000"
  },
  {
    "url": "other/trap/index.html",
    "revision": "a0d5f508f6c1207a57f4fa581915fc6f"
  },
  {
    "url": "other/unknowJs/index.html",
    "revision": "f0334944dcbfc5b127ccc9a70bbd9602"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
