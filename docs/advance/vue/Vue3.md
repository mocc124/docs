# Vue3+vite+ts+pinia

Vue核心 MVVM
[廖学峰 MVVM](https://www.liaoxuefeng.com/wiki/1022910821149312/1108898947791072)

## 第一章：简介
MVVM（Model-View-ViewModel）架构

- 『View』：视图层（UI 用户界面）
- 『ViewModel』：业务逻辑层（一切 js 可视为业务逻辑）
- 『Model』：数据层（存储数据及对数据的处理如增删改查）

Vue2与Vue3的区别
![Options API、Composition API](https://img-blog.csdnimg.cn/img_convert/e8ad905d83aaec45451797517ef453aa.png)

Vue3新特性：
- 重写了双向数据绑定
- 提升了 ViewModel 性能瓶颈
- fragments
- 支持TREE-Shaking
- Composition API

### 重写了双向绑定：
vue2 —— 基于Object.defineProperty get和set方法实现，数组的话是重写了原型方法，如 push、pop、splice 等（源码：Observer/index.js）
vue3 —— 基于ES6的Proxy（源码地址：reactive/reactive.ts）     

proxy与Object.defineProperty(obj, prop, desc)方式相比有以下优势：

```js
//丢掉麻烦的备份数据
//省去for in 循环
//可以监听数组变化
//代码更简化
//可以监听动态新增的属性；
//可以监听删除的属性 ；
//可以监听数组的索引和 length 属性（vue2直接修改数组length是监听不到的）
 
let proxyObj = new Proxy(obj,{
    get : function (target,prop) {
        return prop in target ? target[prop] : 0
    },
    set : function (target,prop,value) {
        target[prop] = 888;
    }
})
```
### 优化了VDOM
工具网站：[Vue Template Explorer ](https://vue-next-template-explorer.netlify.app/)

对于动态属性或动态标签，会添加如TEXT、PROPS等标记，对于静态标签会利用 [PatchFlags](https://juejin.cn/post/6968585717924495368)（diff算法底层）做静态标记，对比时不会做全量对比。

### fragments
Vue3 中可以由多个根标签，底层原理时给这些增加了一个虚拟节点，这个虚拟节点不会被渲染。
同时支持TSX和JSX的写法。
同时新增了Suspense teleport  和  多 v-model 用法。

### Vue3 Tree shaking
简单来讲，就是在保持代码运行结果不变的前提下，去除无用的代码

而Vue3源码引入tree shaking特性，将全局 API 进行分块。如果你不使用其某些功能，它们将不会包含在你的基础包中 ，
如` import {watch} from 'vue'`， 除了watch其他的computed 没用到就不会给你打包减少体积，
但在Vue2中，无论我们使用a功能，a,b模块会出现打包在生产代码中。
主要原因是Vue实例在项目中是单例的，捆绑程序无法检测到该对象的哪些属性在代码中被使用到

### Vue 3 Composition Api
Setup 语法糖式编程 

## 第二章：环境配置

安装[Node.js]()环境，安装完成检测：node版本`node -v`和包管理工具检测 `npm -v`

补充:也可以使用[nvm](https://nvm.uihtm.com/)管理node环境,安装完成检测本地node已安装环境：`nvm list`，切换node版本 适用`nvm use 14.19.3`
注意：nvm安装路径不能有中文和空格；已有的node需要卸载后再安装nvm

构建项目
方式1（vite构建）：
```cmd
C:\Users\Mrnianj\Desktop\test>npm init vite@latest
Need to install the following packages:
  create-vite@latest
Ok to proceed? (y) y
npm WARN EBADENGINE Unsupported engine {
npm WARN EBADENGINE   package: 'create-vite@4.0.0',
npm WARN EBADENGINE   required: { node: '^14.18.0 || >=16.0.0' },
npm WARN EBADENGINE   current: { node: 'v15.10.0', npm: '7.5.3' }
npm WARN EBADENGINE }
√ Project name: ... vite-project
√ Select a framework: » Vue
√ Select a variant: » TypeScript

Scaffolding project in C:\Users\Mrnianj\Desktop\test\vite-project...

Done. Now run:

  cd vite-project
  npm install
  npm run dev
```
方式2（vue 脚手架构建,配置项较多）：
```cmd
C:\Users\Mrnianj\Desktop\test>npm init vue@latest
Need to install the following packages:
  create-vue@latest
Ok to proceed? (y) y
npm WARN EBADENGINE Unsupported engine {
npm WARN EBADENGINE   package: 'create-vue@3.5.0',
npm WARN EBADENGINE   required: { node: '^14.18.0 || >=16.0.0' },
npm WARN EBADENGINE   current: { node: 'v15.10.0', npm: '7.5.3' }
npm WARN EBADENGINE }

Vue.js - The Progressive JavaScript Framework

√ Project name: ... vue-project
√ Add TypeScript? ... No / Yes
√ Add JSX Support? ... No / Yes
√ Add Vue Router for Single Page Application development? ... No / Yes
√ Add Pinia for state management? ... No / Yes
√ Add Vitest for Unit Testing? ... No / Yes
√ Add an End-to-End Testing Solution? » Playwright
√ Add ESLint for code quality? ... No / Yes
√ Add Prettier for code formatting? ... No / Yes

Scaffolding project in C:\Users\Mrnianj\Desktop\test\vue-project...

Done. Now run:

  cd vue-project
  npm install
  npm run lint
  npm run dev
```

### Node.js 底层原理
Node.js 主要由 V8、[Libuv](https://github.com/libuv/libuv#) 和第三方库组成：

V8：实现 JS 解析、执行和支持自定义拓展，得益于 V8 支持自定义拓展，才有了 Node.js。
Libuv：跨平台的异步 IO 库，但它提供的功能不仅仅是 IO，还包括进程、线程、信号、定时器、进程间通信，线程池等。
第三方库：异步 DNS 解析（ cares ）、HTTP 解析器（旧版使用 http_parser，新版使用 llhttp）、HTTP2 解析器（ nghttp2 ）、 解压压缩库( zlib )、加密解密库( openssl )等等。

![Node.js 架构](https://img-blog.csdnimg.cn/d3718cc40bd74ad884adb38d07a5b0cb.png)

核心：[Libuv](https://github.com/libuv/libuv)
src/unix/core.c un_run()函数中，
将loop（事件结构循环的结构体）提交到alive中注册任务，如果没有任务就推出，
有任务执行while循环，反复执行event loop的队列

uv_update_time 和 uv_run_time 是执行计时器（steTimeout和setInterval）的event loop（底层是链表加二叉堆），为了区分两种计时器，会有一个repeat判断
过期就会被结束，

uv_run_pending 处理产生fs、IO流等的回调

uv_io_poll 队列处理网络、信号、线程池

uv_run_closing_handles 处理关闭服务器的event loop操作

## 第三章：目录文件结构、FS和VS Code插件
文件结构
public - 静态资源，不会被vite编译
src/assets - 静态资源
src/components - Vue组件
src/App.vue - 全局入口文件
main.ts - 全局ts文件
vite-end.d.ts - .vue 声明文件扩充（ts不认识.vue文件,通过declare module实现）
index.html - vite入口文件，通过ES module的形式（引入之后拦截，去做一些处理）
package.json - 全局依赖、命令等
tsconfig.json - ts配置文件
vite.config.json - vite配置文件（vite基于esbuild进行编译、打包是基于rollup的）

SFC（单文件组件），
- template，只能出现一个，
- style，可以出现多个
- script，setup形式只能出现一个

VS Code插件推荐：
`Vue language Features(volar)`（与vue2的`vetur`冲突）和`TypeScript Vue Plugin(volar)`

npm run dev的全过程：
npm run dev ---> package.json/scripts/dev ---> vite ---> bin（软链接）-->node modules/.bin/vite（跨平台兼容） --> npm install -g（全局包）--> 环境变量 --> Error

## 第三章：模板语法和 vue 指令
三种书写风格：
一、Vue3 依然支持 Vue2 option API 的书写风格：
```vue
<script >
export default  {
  data() {
    return {}
  },
  methods:{
    xx() {}
  }
}
</script>
```
二、setup 函数模式（定义的变量、函数必须手动return出去）
```vue
<script >
export default  {
  setup() {
    const a = 1; 
    return {
      a // setup返回变量a，就可以在模板中直接使用
    }
  }
}
</script>
```
三、setup 语法糖模式
```vue
<script setup lang="ts">
  const a:number = 1;
</script>
```

模板语法支持简单运算、三元表达、API方法等，如下
```vue
<template>
  <div class="container">
    {{ arr.reduce((a,b)=>{return a+b},1) }}
  </div>
</template>
<script setup lang="ts">
  const arr:number[] = [1,2,3,4,5];
</script>
```

Vue指令
v-text: ，与{{}}效果相似，
v-html: ，可以解析html标签，不支持组件

v-if: ，容器的显示隐藏,将元素变为注释节点，直接控制dom
v-else-if: ，...
v-else: ，...
v-show: ，容器的显示隐藏，比v-if性能更高，只是控制样式display:none
 
v-on: ， 绑定事件，语法糖使用@替换v-on:，动态事件`@[event]='xxx'`
内置修饰符：
.stop - 阻止冒泡事件
其它指令见[官网文档 v-on](https://cn.vuejs.org/api/built-in-directives.html#v-on)

v-bind: ，绑定元素prop、style、class，语法糖使用:替换v-bind:
```vue
<template>
  <div class="container">
    <!-- 动态class-->
    <div :class="[isRed?'red':'blue']"></div>
    <!-- 多个class-->
    <div :class="red" class="main"></div>
  </div>
</template>
<script setup lang="ts">
const isRed:boolean = true;
</script>
<style>
.red {
  width: 100px;
  height: 100px;
  background-color: red;
}
.blue {
  width: 100px;
  height: 100px;
  background-color: blue;
}
</style>
```


## 第四章：
## 第五章：
## 第六章：

