const head = require("./config/head");
const plugins = require("./config/plugins");
const nav = require("./config/nav");

module.exports = {
  // 这里需要和 github 仓库保持一致
  base: "/docs/",
  // SEO优化
  // title: '',
  description: "博客、文档、笔记",
  head ,
  themeConfig: {
    logo: '/assets/img/logo.png',
    lastUpdated: '最后一次更新',
    nav,
    sidebar: 'auto'
  },
  // 依赖
  plugins,
}
