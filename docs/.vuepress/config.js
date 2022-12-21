
module.exports = {
  // 这里需要和 github 仓库保持一致
  base: "/docs/",
  // SEO优化
  title: 'junnain Blog',
  description: "这是 junnian 的博客，记录他的生活。",
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'author',content: 'junnian' }],
    ['meta', {
      name: 'keywords',
      content: 'VuePress,博客,个人,前端,CSS,JavaSscript,HTML,Vue,TypeScript,ES6'
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
  ],
  themeConfig: {
    logo: '/assets/img/logo.png',
    lastUpdated: '最后一次更新',
    nav: [
      { text: 'About this', link: '/aboutThis/' },
      { text: 'Amway', link: '/Amway/' },
      {
        text: 'The path ninja', items: [
          {
            text: "基础",
            items: [
              { text: 'HTML/CSS/JavaScript', link: 'https://developer.mozilla.org/zh-CN/' },
              { text: 'ES6', link: 'https://zh.javascript.info/' },
              { text: '设计模式', link: 'https://zh.javascript.info/' },
              { text: 'CSS3', link: 'https://zh.javascript.info/' },
              { text: 'RegExp', link: 'https://zh.javascript.info/' },
            ]
          },
          {
            text: "进阶",
            items: [
              { text: 'Vue2', link: 'https://blog.csdn.net/qq1195566313' },
              { text: 'Vue3', link: 'https://blog.csdn.net/qq1195566313' },
              { text: 'React', link: 'https://blog.csdn.net/qq1195566313' },
              { text: 'Axios', link: 'https://blog.csdn.net/qq1195566313' },
              { text: 'Less/Sass', link: 'https://blog.csdn.net/qq1195566313' },
              { text: 'Webpack', link: 'https://blog.csdn.net/qq1195566313' },
              { text: 'Git', link: 'https://blog.csdn.net/qq1195566313' },
              { text: 'uni-app', link: 'https://blog.csdn.net/qq1195566313' },
            ]
          },
          {
            text: "深入",
            items: [
              { text: '计算机网络', link: 'https://blog.csdn.net/qq1195566313' },
              { text: '浏览器原理', link: 'https://blog.csdn.net/qq1195566313' },
              { text: 'TypeScript', link: 'https://blog.csdn.net/qq1195566313' },
              { text: 'Node.js', link: 'https://blog.csdn.net/qq1195566313' },
            ]
          }
        ]
      },
      { text: 'Github', link: 'https://github.com/mocc124'},
    ],
    sidebar: 'auto'
  },
  // 依赖
  plugins: {
   '@vuepress/pwa': {
      serviceWorker: true,
      updatePopup: {
        message: "发现了一些新内容.",
        buttonText: "刷新"
      }
    },
    '@vuepress/back-to-top': true,
 }
}
