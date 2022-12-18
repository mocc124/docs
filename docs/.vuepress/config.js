
module.exports = {
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
    }]
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
  }
}
