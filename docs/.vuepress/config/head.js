module.exports =  [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'author',content: 'junnian' }],
    ['meta', {
        name: 'keywords',
        content: '博客,前端,CSS,JavaScript,HTML,Vue,TypeScript,ES6,VuePress,'
    }],
    ['link', { rel: 'manifast', href: '/manifast.json' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['link', { rel: 'apple-touch-icon', href: '/icons/192x192.png' }],
    ['link', { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#3eaf7c' }],
    ['meta', { name: 'msapplication-TileImage', content: '/icons/144x144.png' }],
    ['meta', { name: 'msapplication-TileColor', content: '#000000' }],
    // 百度分析
    [
        'script', {}, `
        var _hmt = _hmt || [];
        (function() {
          var hm = document.createElement("script");
          hm.src = "https://hm.baidu.com/hm.js?3a26ca38a06d9b26d6b15f8ae08bac13";
          var s = document.getElementsByTagName("script")[0]; 
          s.parentNode.insertBefore(hm, s);
        })();
        </script>        
        `
    ],
]