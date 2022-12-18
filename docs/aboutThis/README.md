---
sidebar: auto
---

# myBlog

基于
[VuePress](https://vuepress.vuejs.org/zh/) +[Markdown](https://markdown.com.cn/basic-syntax/) +[YAML](https://ruanyifeng.com/blog/2016/07/yaml.html)
搭建的个人博客

## 一、GitHub 配置 SSH key 流程

需要先创建 github 账户并创建仓库，我的[仓库地址](https://github.com/mocc124/docs)

1. 本地配置

```bash
C:\Users\Mrnianj>ssh-keygen -t rsa -C "mrnianj@hotmail.com" # 邮箱
Generating public/private rsa key pair.
Enter file in which to save the key (C:\Users\Mrnianj/.ssh/id_rsa): # 不设置默认路径存放
Enter passphrase (empty for no passphrase): # 密码可以不设置，直接回车两次
Enter same passphrase again:
Your identification has been saved in C:\Users\Mrnianj/.ssh/id_rsa.
Your public key has been saved in C:\Users\Mrnianj/.ssh/id_rsa.pub.
The key fingerprint is: # 出现如下，表示成功生成 SSH key
SHA256:jEe47/iVCgXdMX5Cu7+mzVsF/cPkTAyogSg9ypdP7CI mrnianj@hotmail.com
The key's randomart image is:
+---[RSA 3072]----+
|    . . . + ..   |
|   . + + = =  o. |
|  . o * o B . .+.|
|   o o O . +  *..|
|    . * S .    =o|
|   E . *   o   ..|
|    . o . o . .  |
|       + o o.o   |
|      ..+ .o=.   |
+----[SHA256]-----+
```

2. 添加 SSH key 到 GitHub

进入默认（配置）路径 `C:\Users\Mrnianj/.ssh/id_rsa.pub` 复制公钥文件内容到 [SSH keys](https://github.com/settings/keys)

3. 测试连接

我这里好像出现了问题，后面遇到问题在解决吧

```bash
C:\Users\Mrnianj>ssh -T git@github.com
   Hi mocc124! You've successfully authenticated, but GitHub does not provide shell access.
```

## 二、创建工程文件

使用 git clone 创建本地工程目录，不在演示。
[VuePress 快速上手](https://vuepress.vuejs.org/zh/guide/getting-started.html)

注意点 1：已经不推荐全局安装 VuePress，
注意点 2：在快速上手中，官方推荐我们添加如下 script：

```js
{
  "scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
  }
}
```

但是上面的有一定的问题：不能热更新，推荐修改后配置如下。

```js
{
  "scripts": {
    "docs:dev": "vuepress dev docs --temp .temp",
    "docs:build": "vuepress build docs"
  }
}
```

届时运行 vuepress 会生成一个临时文件夹 .temp，可以在 .gitignore 中忽略掉该文件夹。

```
# vuepress temp file
.temp
```

## 三、了解目录解构和路由配置

推荐去看[官方文档 目录结构](https://vuepress.vuejs.org/zh/guide/directory-structure.html)

docs 默认为根路由

| 文件的相对路径   | 页面路由地址 |
| ---------------- | ------------ |
| /README.md       | /            |
| /guide/README.md | /guide/      |
| /config.md       | /config.html |

## 四、 导航栏和侧边栏配置（默认主题）

### 导航栏

[导航栏](https://vuepress.vuejs.org/zh/theme/default-theme-config.html#%E5%AF%BC%E8%88%AA%E6%A0%8F)

1. 导航栏配置对象 themeConfig.logo
2. themeConfig.logo 默认居左，资源被放置在公共路径 `docs\.vuepress\public\assets\img\logo.png`,
3. themeConfig.nav 默认居右，配置 target 与 rel 属性将被作为特性被增加到 `<a>` 标签上
4. themeConfig.nav.items 数组配置将被显示为一个下拉列表
5. items 嵌套将在下拉列表中设置分组
6. `themeConfig.navbar:false` 可以禁用所有页面的导航栏（不常用），更多是通过 YAML 来禁用某个指定页面的导航栏

### 侧边栏

侧边栏配置项为 themeConfig.sidebar 。
按照效果来分为两种：导航侧边栏和目录 TOC 侧边栏

导航侧边栏（类似于后台系统常用的侧边导航功能）

1. 配置 themeConfig.sidebar:[] ，参数需要一个包含了多个路由/链接的数组
2. 如果需要侧边栏分组，请参考[侧边栏分组](https://vuepress.vuejs.org/zh/theme/default-theme-config.html#%E4%BE%A7%E8%BE%B9%E6%A0%8F%E5%88%86%E7%BB%84)
3. 配置 themeConfig.sidebar，还可以指定对象形式，类似与路由匹配规则，参考[多个侧边栏](https://vuepress.vuejs.org/zh/theme/default-theme-config.html#%E5%A4%9A%E4%B8%AA%E4%BE%A7%E8%BE%B9%E6%A0%8F),注意：这里配置顺序有要求。

目录 TOC 侧边栏（Markdown 目录结构）

1. 组件内开启侧边目录 TOC
   ```yaml
   ---
   sidebar: auto
   ---
   ```
2. 所有文档启用 `sidebar: 'auto'`

## 五、SEO（不需要可跳过）

[配置文档](https://vuepress.vuejs.org/zh/config/#%E5%9F%BA%E6%9C%AC%E9%85%8D%E7%BD%AE)，常用配置项：

- title
- description
- fauthor[](www.fauthor.io)
- keywords
- favicon

## 六、最后更新时间

[配置文档](https://vuepress.vuejs.org/zh/theme/default-theme-config.html#%E6%9C%80%E5%90%8E%E6%9B%B4%E6%96%B0%E6%97%B6%E9%97%B4)，
默认会跟踪 git 提交时间。

更多自定义需要引入 [moment 库](http://momentjs.cn/)

## 七、部署到 github.io 并自定义域名

[GitHub Pages](https://vuepress.vuejs.org/zh/guide/deploy.html#github-pages)

大致流程：

1. 项目指向 github 仓库，可以使用`git config -l`验证
2. 修改 base，参考、[base 配置](https://vuepress.vuejs.org/zh/config/#base)。默认为`localhost:8080`，因为我的仓库在`https://github.com/mocc124/docs`,所以配置 `base:"/docs/"`，修改之后为`localhost:8080/docs/`
3. 新增部署文件（deploy.sh）,在部署文件就绪之后，我们习惯使用 script 执行，所以需要加一行配置`"deploy": "bash deploy.sh"`。完成之后请注意使用 Git Bash 运行`npm run deploy`。
4. 验证 gh-pages，地址：`https://github.com/<USERNAME>/<REPO>/settings/pages`
5. 设置 website，方便被访问,

下面是自定义域名的大致流程，详情点击：[参考视频](https://www.bilibili.com/video/BV1vb411m7NY)

1. 已购买域名并备案成功
2. 增加 CNAME
3. DNS 解析
4. 改回 base

## 八、启用 PWA