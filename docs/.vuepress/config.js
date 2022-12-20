
module.exports = {
  // 这里需要和 github 仓库保持一致
  base:"/docs/",
  title: 'junnain Blog',
  description: "这是 junnian 的博客，记录他的生活。",
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', {
      name: 'author',
      content: 'junnian'
    }],
    ['meta', {
      name: 'keywords',
      content: 'VuePress,博客,个人,前端,CSS,JavaSscript,HTML,Vue,TypeScript,ES6'
    }],
    ['link', { rel: 'manifest', href: '/manifast.json' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['link', { rel: 'apple-touch-icon', href: '/icons/192x192.png' }],
    ['link', { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#3eaf7c' }],
    ['meta', { name: 'msapplication-TileImage', content: '/icons/144x144.png' }],
    ['meta', { name: 'msapplication-TileColor', content: '#000000' }]
  ],
  themeConfig: {
    logo: '/assets/img/logo.png',
    lastUpdated: '最后一次更新',
    nav: [
      { text: '关于本项目', link: '/aboutThis/' },
      { text: 'Github', link: 'https://github.com/mocc124/docs' },
      {
        text: '资源推荐', items: [
          {
            text: "官方文档",
            items: [
              { text: 'MDN', link: 'https://developer.mozilla.org/zh-CN/' },
              { text: '现代JavaScript', link: 'https://zh.javascript.info/' },
            ]
          },
          {
            text: "个人博客",
            items: [
              { text: '小满zs', link: 'https://blog.csdn.net/qq1195566313' },
              { text: '飞跃高山与大洋的鱼', link: 'https://docs.shanyuhai.top/' },
            ]
          }
        ]
      },
    ]
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
    '@vuepress/google-analytics':{
        'ga': 'G-G8EXPN97LJ' // 跟踪索引
    }
 }
}
