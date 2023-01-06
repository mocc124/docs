import head from "./config/headConfig"

module.exports = {
  // 这里需要和 github 仓库保持一致
  base: "/docs/",
  // SEO优化
  // title: '',
  description: "博客、文档、笔记",
  head,
  themeConfig: {
    logo: '/assets/img/logo.png',
    lastUpdated: '最后一次更新',
    nav: [
      {text: '入门前端开发', items: [
          { text: '计算机网络', link: '' },
          { text: '浏览器原理', link: '' },
          { text: 'HTML/CSS/JavaScript', link: 'https://developer.mozilla.org/zh-CN/' },
          { text: 'ES6', link: '' },
          { text: 'CSS3', link: '' },
          { text: 'RegExp', link: '' },
          { text: 'Git', link: '/Broad/git/' },
          { text: 'Echarts', link: '/Broad/Echarts/' },
        ]
      },
      {text: '前端进阶内容', items:[
          { text: '设计模式', link: '' },
          { text: 'JS module', link: '/Broad/module/' },
          { text: 'Vue', link: '/Broad/vue/' },
          { text: 'React', link: '' },
          { text: 'Axios', link: '' },
          { text: 'Less/Sass', link: '' },
          { text: 'Webpack', link: '' },
          { text: 'uni-app', link: '' },
          { text: 'TypeScript', link: '/Broad/ts/' },
          { text: 'Node.js', link: '' },
        ]
      },
      {text: '前端扩展知识', link: '' },
      {text: '其它', items: [
          { text: '关于此项目', link: '/aboutThis/' },
          { text: '挖坑', link: '' },
          { text: '填坑', link: '' },
          { text: '杀手还是忍者', link: '/jsReview/' },
        ]
      },
      { text: '推荐资源/工具 🔗', link: '/Amway/' },
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
