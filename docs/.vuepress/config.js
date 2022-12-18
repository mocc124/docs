
module.exports = {
  title: 'junnain Blog',
  themeConfig: {
    logo: '/assets/img/logo.png',
    nav: [
      { text: '关于本项目', link: '/aboutThis/' },
      { text: 'Github', link: 'https://github.com/mocc124/docs' },
      {
        text: '资源推荐', items: [
          {
            text: "官方文档",
            items: [
              { text: 'MDN', link: '/' },
              { text: '现代JavaScript', link: '/' },
            ]
          },
          {
            text: "个人博客",
            items: [
              { text: '小满zs', link: '/' },
              { text: '飞跃高山与大洋的鱼', link: '/' },
            ]
          }
        ]
      },
    ]
  }
}
