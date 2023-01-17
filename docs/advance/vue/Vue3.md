# Vue3+vite+ts+pinia

Vue核心 MVVM
[廖雪峰 MVVM](https://www.liaoxuefeng.com/wiki/1022910821149312/1108898947791072)

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

## 第四章：模板语法和 vue 指令
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
```vue
<template>
  <div class="container">
    <div @click="click">
      <button @[event].stop="click"></button>
    </div>
  </div>
</template>

<script setup lang="ts">
const event = "click";
const click = function () {/* ... */}
</script>
```

v-bind: ，绑定元素prop、style、class，语法糖:使用:替换v-bind:
```vue
<template>
  <div class="container">
    <!-- 动态class-->
    <div :class="[isRed?'red':'blue']" ></div>
    <!-- class动态绑定，绑定style-->
    <div :class="Red" class="main,red" :style="border"></div>
  </div>
</template>

<script setup lang="ts">
const Red:string = "red";
const isRed:boolean = true;
const border = "border:1px solid #ccc"
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

v-model: ，双向绑定
```vue
<template>
  <input type="text" v-model="input">
  <p>content：{{input}}</p>
</template>
<script setup lang="ts">
const input:string = "请输入"
</script>
```
上面是实现不了双向绑定的，只有使用ref或reactive所包裹起来的值才是响应式的
```vue
<script setup lang="ts">
import {ref} from "vue"
const input:string = ref("请输入")
</script>
```

v-for: 遍历,支持嵌套循环，注意key属性的用法
```vue
<template>
  <div v-for="(item,index) in arr" :key="index">
    {{item}}-{{index}}
  </div>
</template>
<script setup lang="ts">
const arr:string[] = ["a","b","c"]
</script>
```

v-once，添加了此属性的元素只会被渲染一次
v-memo，Vue3.2新增的内置指令，类似与v-once，大致的作用就是小幅度手动提升一部分性能，一般是配合v-for使，[Vue3.2 新增 v-memo](https://juejin.cn/post/7180973915580137527)

## 第五章：虚拟dom和diff算法
学习源码可以了解更好的api算法和代码逻辑，可以在开发环境中快速定位问题。而且面试会问这些。

虚拟DOM，就是通过js生成的一个AST抽象语法树，这种思路在TS转JS、babel插件中ES6转ES5的过程中，甚至V8引擎在js解析为字节码的过程中也会进行AST转换，被证明是可行的。

AST在线解析:[Vue 3 Template Explorer](https://template-explorer.vuejs.org/#eyJzcmMiOiI8ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+XHJcbiAgPGRpdiBjbGFzcz1cIm1haW5cIj48L2Rpdj5cclxuICA8ZGl2IGNsYXNzPVwiZm9vdGVyXCI+PC9kaXY+XHJcbjwvZGl2PiIsIm9wdGlvbnMiOnt9fQ==)

通过上面的网址我们可以看到，使用js描述Dom对象是方便且节省性能的，还可以做一些算法优化和节点复用。 
diff算法（源码在Vue/Core/render.ts 1631 line）最显著可以在v-for的key属性被感知。

有key的diff算法：
Vue3 ：前序算法（检查C1、C2的type/key是否相同；不相同，就break）
--->尾序算法（检查C1、C2的type/key是否相同；不相同，就break）
--> patch,对多出来的元素进行新增节点 
---> unmount,对少的元素进行删除
---> 针对特殊的乱序情况，会有最长递增子序列的算法（建立映射关系-建立新在旧节点的位置（有多余的旧节点或新节点不在旧节点中就卸载掉）-乱序清况，就求最长递增子序列算法底层是贪心+二分查找）
--> 当前遍历节点不在子序列，就移动，在子序列就直接跳过。

无key的diff算法：通过for循环重新patch，渲染这个元素-->删除-->新增

![Vue3 diff算法](https://img-blog.csdnimg.cn/1fe57a274d8644bfacf44526e79d57bc.png)

补充：Vue2采用的是双端diff算法（头尾分别比较，然后头尾交叉比较），注意V3只做了头尾比较，省略了交叉比较这一步，优化了v2的diff算法。

## 第六章 Ref

回顾一下Vue2的响应式原理：
```vue
<script >
export  default  {
  data(){
    return {
      // ...
    }
  }
}
</script>
```
在Vue3中，所有被ref或者reactive系列包裹的值才可以做到响应式。
```vue
<template>
  <div>{{data.arr}}</div>
  <button @click="click">click</button>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
type D = {
  type:string,
  arr:number[]
}
let data= ref<D>({type:"xxx",arr:[1,2,3]})// 泛型的方式，类型简单
let click = function () {
  data.value.arr.push(Math.floor(Math.random()*10))
}
</script>
```
复杂类型推荐使用 Ref，如下：
```vue
<template>
  <div>{{data.arr}}</div>
  <button @click="click">click</button>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import type { Ref } from 'vue'
type D = {
  type:string,
  arr:number[]
}
let data:Ref<D>= ref({type:"xxx",arr:[1,2,3]}) // interface 类型复杂
let click = function () {
  data.value.arr.push(Math.floor(Math.random()*10))
}
</script>
```
ref返回了一个 ES6 类，他有一个属性value。在取值或者修改时，必须加.value（固定语法）
`import type { isRef } from 'vue'`可以判断是否为ref对象
`import type { shallowRef } from 'vue'`只能做浅层响应，只到.value层级
`import type { triggerRef } from 'vue'`强制更新收集的依赖，ref底层会调用这个triggerRef

注意：shallowRef和ref不能混用，ref更新时会导致shallowRef的视图也更新（因为ref底层更新是会调用triggerRef，会强制更新收集的依赖）。

`import type { customRef } from 'vue'`可以创建一个自定义的 ref，并对其依赖项跟踪和更新触发进行显式控制。
```vue
<template>
  <div>{{obj}}</div>
  <button @click="click">click</button>
</template>

<script setup lang='ts'>
  import { customRef } from 'vue'
  function myRef<T>(value:T) {
    return customRef((track,triger)=>{
      let timer:any 
      return {
        get(){
          track()// 收集依赖
          return value
        },
        set(newVal){
          clearTimeout(timer);
          timer = setTimeout(()=>{
            value = newVal;
            clearTimeout(timer);
            triger() // 触发依赖
          },500)
        },
      }
    })
  }
  
	let obj = myRef<String>("初始文本")
  
	let click = function () {
  	obj.value = "customRef 更改了"
	}
</script>

<style scoped>
</style>
```

浏览器>>devtools>>启用自定义格式设置工具 可以解决 console打印ref、reactive 需要点两层的问题。

ref也可以被用来获取dom元素,如下：
```vue
<script setup lang="ts">
import { ref,onMounted } from 'vue'

const msg = ref('Hello World!')

const strBox = ref<HTMLDivElement>() // 常量名和标签属性需保持一致

onMounted(()=>{
  console.log(strBox.value?.innerText)
})

</script>

<template>
  <h1>{{ msg }}</h1>
  <input v-model="msg">
  <div ref="strBox">JavaScript...</div>
</template>
```
ref源码位置： packages/reactivity/ref.ts 67 line，ref函数支持函数重载，支持多种函数参数，调用createRef()判断是否为ref对象，是就直接返回，否则通过RefImpl类创建一个ref对象，

RefImpl类接受两个属性(value,isShallow),它的私有属性_value就是将被读取的值，_v_isShallow（）为false调用Toreactive(),判断是否为引用类型，是调用reactive(),不是直接返回值


ref和shallowRef写一块会影响视图更新，因为triggerRef可以强制更新shallowRef的值，Ref和triggerRef底层都是调用triggerRefValue，triggerRefValue又会调用triggerEffects更新依赖，所以会一块将shallowRef的依赖也更新。

## 第七章 Reactive
ref和Reactive区别1：ref支持所有类型，reactive只支持引用类型（Arr、Object、Map、Set）
ref和Reactive区别2：ref取值赋值都需要加.value，reactive可以直接读写值

Reactive包裹的数据是通过proxy代理的对象，不能被直接赋值，只能使用方法增删改数据或者将数组添加到对象中被包装，再通过reactive响应处理

补充：`import { readonly } from "vue"`，readonly可以将reactive代理的对象变为只读，无法重新赋值，但是可被原始对象影响，原始对象更改也会readonly对象。
补充：`import { shallowReactive } from "vue"`，shallowReactive也是响应式浅层的，只到第一层数据，也会被reactive影响，所以不能混用。

Reactive源码：reactive()函数中对参数做了泛型约束，只能传入引用类型的对象，会判断是否为只读，是则直接返回，
否则就调用createReactiveObject()函数,判断参数类型（普通类型-直接返回、对象已经被代理过了-直接返回、缓存中找到-直接返回、白名单-直接返回），最后通过proxy代理
```vue
<script setup lang='ts'>
import { ref,reactive,toRef,toRefs,toRaw } from 'vue'
const tom = {name:"tom",age:28}
const tomName = toRef(tom,"name") 
// toRef 只能修改响应式对象的值，对非响应式视图毫无影响
const changeTom = ()=>{
  tomName.value = "jerry"
  console.log(tom)
}

const jerry = reactive({name:"jerry",age:28}) 
const JerryAge = toRef(jerry,"age")
// 可以做到响应式更新
const changeJerry = (obj)=>{
  JerryAge.value = Math.floor(Math.random()*100)
  console.log(jerry)
}

// 应用场景：toRef多作为函数参数传递，并做到响应式视图更新
</script>

<template>
  <h1>{{ tom }}</h1>
  <button @click="changeTom">change tom age</button>
  <hr>
  <h1>{{ jerry }}</h1>
  <button @click="changeJerry">change jerry age</button>
</template>
```

## 第八章：ToRef、ToRefs、ToRaw

ToRef应用场景：可以将对象的某个属性包装成为一个响应式对象提供给外部使用，而不用暴露整个对象。
理解：相当于解构，但是解构出来的对象是响应式的
```vue
<script setup>
import { ref, reactive,toRef } from 'vue'
const person = reactive({name:"tom",age:18})
let age = toRef(person,"age")
let changeName = ()=>{
  age.value = Math.floor(18+Math.random()*82)
}
</script>

<template>
  <div>{{ person }}</div>
  <button @click="changeName">
    change name
  </button>
</template>
```
toRefs源码
```ts
const toRefs =<T extends object>(object:T) => {
    const map:any = {}
    for (let key in object) {
        map[key] = toRef(object.key)
    }
    return map
}
```
toRefs适用于复杂对象外面包一层,然后再把对象结构出来：
```vue
<script setup>
import { reactive,toRefs } from 'vue'
const person = reactive({name:"tom",age:18})
let {name,age} = toRefs(person)
let changeName = ()=>{
  age.value = Math.floor(18+Math.random()*82)
  name.value = Math.random().toString(36).slice(2,)
}
</script>

<template>
  <div>{{ person }}</div>
  <button @click="changeName">
    change name
  </button>
</template>
```
toRaw应用场景：将一个对象脱离响应式包装，底层是通过 __v_raw 属性，此属性不会暴露给开发者。
源码讲解[链接](https://www.bilibili.com/video/BV1dS4y1y7vd/?p=9&share_source=copy_web&vd_source=461186b903c28eeeb1342b31e0bfe68e&t=709)

## 第八章番外：响应式原理 ⭐（以后补充）

推荐阅读
[Vue.js设计与实现-第二篇 Vue 响应系统]()、
[Vue官网 深入响应式系统](https://cn.vuejs.org/guide/extras/reactivity-in-depth.html)、
[小满视频版讲解](https://www.bilibili.com/video/BV1dS4y1y7vd/?p=10)

基本原理:创建了一个用于存储副作用函数的桶，接着通过proxy代理对象，并设置getter和setter，getter中将副作用函数添加到桶中和setter中拿出副作用桶中的函数执行。
```js
let bucket = new Set()

let data = {msg:"hello"}

data = new Proxy(data,{
    // 拦截读取
    get(target,key){
        // 将副作用函数 effect 添加到存储副作用函数的桶中
        bucket.add(effect)
        // 返回属性值
        return data[key]
    },
    // 拦截设置
    set(target,key,value) {
        target[key] = value
        // 把副作用函数从桶里取出并执行
        bucket.forEach(fn=>fn())
        // 返回 true 代表设置操作成功
        return true
    }
})
```

### 实现 reactive
```ts
export const reactive = <T extends object>(object:T)=>{
    return new Proxy(object,{
        get(target: T, p: string | symbol, receiver: any): any {
            // return target[key]
            // 上面这种方式会出现问题，需要Reflect保证上下文的正确
            return Reflect.get(target,p,receiver)
        },
        set(target: T, p: string | symbol, value: any, receiver: any): boolean {
            // Reflect.set 会返回一个 boolean 值
            return Reflect.set(target,p,value,receiver)
        },
        /*此外还有
        * deleteProperty --- 删除
        * ownKeys -- 遍历属性
        * apply -- 拦截方法
        * */
    })
}
```
### 实现 effect
```js
const user = reactive({name:"xxx",age:18})

effect(()=>{
    document.querySelector("#app").innerText = `${user.name}--${user.age}`
})
```
```ts
let activeEffect 
export const effect = (fn:Function)=>{
    // 闭包
    const _effect = function (){
        activeEffect = _effect
        fn()
    }
    _effect()
}

// 依赖收集
const targetMap = new weakMap()
export const track = (target,key)=>{
    let depsMap = targetMap.get(target)
    if(!depsMap) {
        depsMap = new Map()
        targetMap.set(target,depsMap)
    }
}
```

## 第九章 computed计算属性
基本使用：
```vue
<script setup>
import { ref,computed } from 'vue'
const firstName = ref("a")
const lastName= ref("b")
// 函数写法
const name = computed(()=>{
  return firstName.value+'----'+lastName.value
})

// 对象写法
const all = computed({
  get(){
    return `${firstName.value}---${ lastName.value}`
	},
  set(newVal){
    return firstName.value+'----'+lastName.value
  },
})
</script>

<template>
  <div>{{ name }}</div>
  <div>{{ all }}</div>
  <input v-model="firstName" />
  <input v-model="lastName" />
</template>
```
记账本案例:
```vue
<script setup lang="ts">
import { ref,computed,reactive } from 'vue'
let list = reactive([
  {name:"烟",number:10,price:1},
  {name:"酒",number:13,price:2},
  {name:"糖",number:41,price:10},
  {name:"茶",number:186,price:100},
])

const inorde = (item:object,type:Boolean)=>{
  if(type) {
    item.number++
  }else {
    item.number--
  }
}
const remove = (index:number)=>{
  list.splice(index,1)
}
let $price = computed(()=>{
  return list.reduce((val,item)=>{return val+(item.price*item.number)},0)
})

</script>

<template>
  <table>
    <tr>
    	<td>商品</td>
    	<td>小计</td>
    	<td>数量</td>
      <td>删除</td>
    </tr>
  	<tr v-for="(item,index) in list" :key="index">
    	<td>{{item.name}}</td>
    	<td>{{item.number*item.price}}</td>
    	<td>
        <button @click="inorde(item,false)">-</button>
        {{item.number}}
        <button @click="inorde(item,true)">+</button>
      </td>
      <td><button @click="remove(index)">删除</button></td>
    </tr>
     <tr>
    	<td></td>
    	<td></td>
    	<td>总价:{{$price}}</td>
    </tr>
  </table>
</template>
```

## 第十章 watch 侦听属性
```vue
<script setup lang="ts">
import { ref,watch,reactive } from 'vue'

let msg = ref("hello")
let msg1 = ref("hello")
// 为单个属性添加侦听器
watch(msg,(newVal,oldVal)=>{
  console.log(newVal,oldVal)
})
// 为多个属性添加侦听器（数组形式）
watch([msg,msg1],(newVal,oldVal)=>{
  console.log(newVal,oldVal)
})
</script>

<template>
  <input type="text" v-model="msg"/>
  {{msg}}
  <hr />
  <input type="text" v-model="msg1"/>
  {{msg1}}
</template>
```
深度监视，需要注意newVal和oldVal是相同的，后面会解释（源码job之后，新旧值是直接=赋值）
```vue
<script setup lang="ts">
import { ref,watch,reactive } from 'vue'
let data = ref({
  foo:{
    name:"tom",
    age:18
  }
})
// 深度监视
watch(data,(newVal,oldVal)=>{
  // newVal和oldVal 是相同的！！！
  console.log(newVal,oldVal)
},{
  // active 底层已经做了deep:true,可以不开启
  deep:true,
  immediate:true,
  flush:"pre",// pre 组件更新之前执行; async 同步执行; post 组件更新之后执行
})
</script>

<template>
  <input v-model="data.foo.name"/>
  <input v-model="data.foo.age"/>
</template>
```
监视对象属性
```vue
<script setup lang="ts">
import { watch,reactive } from 'vue'
let data = reactive({
  foo:{
      name:"tom",
      age:18
  }
})
// 监视单一属性官方推荐使用函数返回
watch(()=>data.foo.name,(newVal,oldVal)=>{
  // newVal和oldVal 是相同的！！！
  console.log(newVal,oldVal)
})
</script>

<template>
  <input v-model="data.foo.name"/>
  <input v-model="data.foo.age"/>
</template>
```
源码讲解[链接](https://www.bilibili.com/video/BV1dS4y1y7vd/?p=12&share_source=copy_web&vd_source=461186b903c28eeeb1342b31e0bfe68e&t=409)

watch底层调用了doWatch(source,cb,option),doWatch会做以下几件事
格式化 source，（ref、reactive、array、function），格式化后赋值给了getter函数
ref-->取value赋值给getter
reactive-->traverse（递归）
函数就进行加工-->赋值给 getter，并判断有没有cb，有就执行watch，没有就执行watch effect
如果cb和deep开启了，就进行traverse（递归）深度监听
...

## 第十一章 watchEffect 高级侦听器
```vue
<script setup lang="ts">
import { ref,watch,reactive,watchEffect } from 'vue'
let data = ref({
  foo:{
      name:"tom",
      age:18
  }
})
// watchEffect会返回一个停止函数
const stop = watchEffect((oninvalidate)=>{
  console.log("data---",data)
  // oninvalidate 会在更新前被调用
  oninvalidate(()=>{
    console.log("before")
  })
},{
  // 可以有更多配置项
  flush:"post", // 侦听时机
  // 提供了一个调试函数
  onTrigger(e) {
    debugger
  }
})
</script>

<template>
	<input v-model="data.foo.name"/>
  <input v-model="data.foo.age"/>
  <button @click="stop">停止监听</button>
</template>
```

nextTick是异步的，生命周期都是同步的，nextTick执行的时候生命周期早就执行过一遍了
使用v-show并不会销毁组件，v-show是样式的隐藏，v-if 却是重新渲染

## 第十二章 生命周期
```vue
<script setup lang="ts">
	import { ref,onBeforeMount,onMounted,onBeforeUpdate,onUpdated,onBeforeUnmount,onUnmounted,onRenderTracked,onRenderTriggered} from 'vue'
  
  // 1. setup 语法糖模式中，beforeCreate created 被屏蔽了(setup替代了)
  console.log("setup")
  
  // 2. 创建前
  onBeforeMount(()=>{
    console.log("创建之前")
  })
  // 3. 创建后
  onMounted(()=>{
    console.log("创建之后")
  })
  // 4.更新前
  onBeforeUpdate(()=>{
    console.log("更新之前")
  })
  // 5.更新后
  onUpdated(()=>{
    console.log("更新之后")
  }) 
  // 6. 卸载前
  onBeforeUnmount(()=>{
    console.log("卸载前")
  })
  // 7. 卸载前
  onUnmounted(()=>{
    console.log("卸载后")
  })
  // 两个特殊钩子
  // 8. 收集依赖钩子
  onRenderTracked((e)=>{})
  // 9. 触发依赖钩子
  onRenderTriggered((e)=>{})
  const msg = ref("张三")
  const change = ()=>{
    msg.value = "李四篡位"
  }
  let currnt = true
</script>
<Comp/>	
<template>
	<div>
    {{msg}}
  </div>
  <button @click="change">
    change
  </button>
</template>
```
讲解声明周期[链接](https://www.bilibili.com/video/BV1dS4y1y7vd/?p=14&share_source=copy_web&vd_source=461186b903c28eeeb1342b31e0bfe68e&t=665)

## 第十三章 实操组件和认识 less、scoped

文件结构：
Layout
Content -- index.vue
Header -- index.vue
Menu -- index.vue
index.vue
实现经典两栏后台管理系统框架，文件结构如上

[less 官网](https://less.bootcss.com/)
注意：使用vite构建的项目，不需要安装 less-loader，
最常用的语法:
```html
<div class="content">
    <div class="content-item"></div>
</div>
```
```less
.content {
  display: flex;
  flex-direction: column;
  &-item {
    width: 100%;
    height: 100%;
  }
}
```

scoped 可以实现样式隔离，底层会给元素添加data-v-xxx的属性，此属性不会重复,css样式会添加属性选择器，保证样式的唯一。

## 第十四章 父子组件传参
### 父传子（defineProps）
index.vue 父组件传递参数
```vue
<template>
    <Menu :menuList="menuData"></Menu>
</template>

<script setup lang="ts">
import Menu from  "./Menu/index.vue"

const menuData = [
  {name:"统计概况",code:Math.random().toString(36).slice(2,)},
  {name:"标准库",code:Math.random().toString(36).slice(2,)},
  {name:"我的项目",code:Math.random().toString(36).slice(2,)},
  {name:"系统环境",code:Math.random().toString(36).slice(2,)},
]
</script>
```
Menu 子组件接收参数（js形式）
```vue
<template>
  <ul>
    <li v-for="item in menuList" :key="item.code">
      {{item.name}}
    </li>
  </ul>
</template>

<script setup lang="ts">
const props = defineProps({
  menuList:{
    type:Array,
    default:[{name:"关于我",value:"1"}]
  }
})

// 模板语法中可以直接使用，js中使用需要接收defineProps返回值.的形式
console.log(props.menuList)
</script>
```
Menu 子组件接收参数（ts泛型字面量模式更加简单）
```vue
<template>
  <div class="menu">
    <div class="log">XXX log</div>
    <ul>
      <li v-for="item in menuList" :key="item.code">
        {{item.name}}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
// ts形式（无默认值）
// let props = defineProps<{menuList:object[]}>()
// console.log(props.menuList)

// ts形式（有默认值）,需要使用ts特有的withDefaults设置默认值
let props = withDefaults( defineProps<{title: string,menuList:object[]}>(),{
  title:"xxx Log",
  // 对于复杂类型默认值推荐使用函数返回值
  menuList:()=>[{name:"默认",code:Math.random().toString(36).slice(2,)}]
})
console.log(props.title)
</script>
```

### 子传父（defineEmits）
Menu 子组件传递参数（js形式）
```vue
<template>
<div class="menu">
  <div class="log">
    {{title}}
  </div>
  <ul>
    <li v-for="item in menuList" :key="item.code" @click="send(item.code)">
      {{item.name}}
    </li>
  </ul>
</div>
</template>

<script setup lang="ts">
// 接收父组件参数
let props = withDefaults( defineProps<{title: string,menuList:object[]}>(),{
  title:"xxx Log",
  menuList:()=>[{name:"默认",code:Math.random().toString(36).slice(2,)}]
})

const emits = defineEmits(['on-click'])
// 子组件传值给父组件
const send = (code:string)=>{
  // 这里参数可以传多个，第一个不能省略
  emits("on-click",code,"menu")
}
</script>
```
父组件接收参数
```vue
<template>
  <div class="layout">
    <Menu :menuList="menuData" @on-click="getCode"></Menu>
    <div class="layout-right">
      <Header ></Header>
      <Content></Content>
    </div>
  </div>
</template>

<script setup lang="ts">
import Menu from  "./Menu/index.vue"

const menuData = [
  {name:"统计概况",code:Math.random().toString(36).slice(2,)},
  {name:"标准库",code:Math.random().toString(36).slice(2,)},
  {name:"我的项目",code:Math.random().toString(36).slice(2,)},
  {name:"系统环境",code:Math.random().toString(36).slice(2,)},
]

// 接收子组件参数
const getCode = (...data:any)=>{
  console.log(data)
}
</script>
```
Menu 子组件传递参数（ts形式）
```vue
<template>
<div class="menu">
  <div class="log">
    {{title}}
  </div>
  <ul>
    <li v-for="item in menuList" :key="item.code" @click="send(item.code)">
      {{item.name}}
    </li>
  </ul>
</div>
</template>

<script setup lang="ts">

// 接收父组件参数
let props = withDefaults( defineProps<{title: string,menuList:object[]}>(),{
  title:"xxx Log",
  menuList:()=>[{name:"默认",code:Math.random().toString(36).slice(2,)}]
})

// 子组件传值给父组件（ts形式）
const emit = defineEmits<{
  (e:"on-click",code:string):void
}>()

let send = (code:string)=>{
  emit("on-click",code)
}
</script>
```

### defineExpose 暴露子组件属性或方法
子组件暴露属性/方法
```vue
<script setup lang="ts">
// 3.1 暴露一些子组件的属性或方法给父组件
defineExpose({
  name:"this is menu",
  open:(...current:any)=>{console.log(current.shift())}
})
</script>
```
父组件接收属性并调用方法
```vue
<template>
  <div class="layout">
    <Menu ref="menuCom" :menuList="menuData" @on-click="getCode"></Menu>
  </div>
</template>

<script setup lang="ts">
import { ref,onMounted } from 'vue'
import Menu from  "./Menu/index.vue"

const menuTitle = "xxx LOG"

// 接收子组件暴露的属性和方法
const menuCom = ref<InstanceType<typeof Menu>>()

onMounted(()=>{
  // 访问值
  console.log(menuCom.value?.name)
  // 调用方法
  menuCom.value.open(1,2,3)
})
</script>
```
应用场景:element 的from组件用到了defineExpose传递参数

案例 [封装一个瀑布流插件]()
js实现思路：利用绝对定位，计算每张图片的top、left，先放置第一列数据，并将第一列的高度为维护一个数组，循环在最低高度添加下一张图片。

## 第十五章 全局组件、递归组件和局部组件
在Vue3中组件是开箱即用的，不需要项vue2一样注册，import引入即可使用。
```vue
<template>
<div class="content">
  <Card></Card>
</div>
</template>

<script setup lang="ts">
import Card from "../../components/expame/Card.vue"
</script>
```
全局组件需要在main.js文件中注册，才能在此项目所有组件中使用：
```js
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
// 引入全局组件
import Card from './components/expame/Card.vue'

// 链式调用 注册全局组件并挂载
createApp(App).component('Card',Card).mount('#app')
```
批量注册全局组件可以借鉴[element的循环注册](https://element-plus.org/zh-CN/component/icon.html#%E6%B3%A8%E5%86%8C%E6%89%80%E6%9C%89%E5%9B%BE%E6%A0%87)的方式








