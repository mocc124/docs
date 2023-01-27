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
新增了setup函数和Setup 语法糖模式 

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

npm run dev命令执行的过程：
npm run dev ---> package.json/scripts/dev ---> vite ---> bin（软链接）-->node modules/.bin/vite（跨平台兼容） --> npm install -g（全局包）--> 环境变量 --> Error

## 第四章：模板语法和 vue 指令
### script的三种书写风格：
1. Vue3 依然支持 Vue2 option API 的书写风格：
    ```vue
    <script >
    export default  {
      data() { return {} },
      methods:{ fun() {} }
    }
    </script>
    ```
2. setup 函数模式（注意：局部变量、函数必须return，才能被模板字符串解析）
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
3. setup 语法糖模式（不用手动return）
    ```vue
    <script setup lang="ts">
      const a:number = 1;
    </script>
    ```
### 模板语法
模板语法支持简单运算、三元表达、API方法等，示例如下
```vue
<template>
  <div class="container">
    {{ arr.reduce((a,b)=> a+b,0) }}
  </div>
</template>
<script setup lang="ts">
  const arr:number[] = [1,2,3,4,5];
</script>
```

### Vue指令
v-bind: ，绑定元素prop、style、class，语法糖可以使用:替换v-bind:
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
注意：只有使用ref或reactive所包裹起来的值才是响应式的。
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

- v-once，添加了此属性的元素只会被渲染一次
- v-memo，Vue3.2新增的内置指令，类似与v-once，大致的作用就是小幅度手动提升一部分性能，一般是配合v-for使，[Vue3.2 新增 v-memo](https://juejin.cn/post/7180973915580137527)

- v-text: ，与{{}}效果相似，
- v-html: ，可以解析html标签，不支持组件

- v-if: ，容器的显示隐藏,将元素变为注释节点，直接控制dom
- v-else-if: ，...
- v-else: ，...
- v-show: ，容器的显示隐藏，比v-if性能更高，只是控制样式display:none

- v-on: ， 绑定事件，语法糖使用@替换v-on:，动态事件`@[event]='xxx'`
  内置修饰符：
- .stop - 阻止冒泡事件
- 更多其它指令见[官网文档 v-on](https://cn.vuejs.org/api/built-in-directives.html#v-on)

## 第五章：虚拟dom和diff算法

虚拟DOM：就是通过js生成的一个AST抽象语法树，这种思路在TS转JS、babel插件中ES6转ES5的过程中，甚至V8引擎在js解析为字节码的过程中也会进行AST转换。

Vue3 AST在线解析:[Vue 3 Template Explorer](https://template-explorer.vuejs.org/)，通过这个网址我们可以看到，使用js描述Dom对象，这种方式不仅方便且节省性能，还可以进行算法优化和节点复用。 

⭐ diff算法源码讲解：[diff算法](https://www.bilibili.com/video/BV1dS4y1y7vd/?p=6&share_source=copy_web&vd_source=461186b903c28eeeb1342b31e0bfe68e&t=216)

## 第六章 Ref
Vue2中通过data函数返回对象实现响应式数据，在Vue3中，只有被 ref 或者 reactive 系列包裹的值才可以做到响应式。
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
let data = ref<D>({type:"xxx",arr:[1,2,3]})// 泛型的方式，简单类型
let click = function () {
  // js中通过.value读写值
  data.value.arr.push(10)
}
</script>
```
ref会返回了一个 ES6 类，他有一个属性value。在取值或者修改时，必须加 .value 的形式读写值。

复杂类型推荐使用 Ref（首字母大写），如下：
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
let data:Ref<D>= ref({type:"xxx",arr:[1,2,3]}) // interface 复杂类型
let click = function () {
  data.value.arr.push(Math.floor(Math.random()*10))
}
</script>
```

其它ref指令
- `import type { isRef } from 'vue'`可以判断是否为ref响应式对象
- `import type { shallowRef } from 'vue'`只能做浅层响应，只到.value层级
- `import type { triggerRef } from 'vue'`强制更新收集的依赖，ref底层会调用这个triggerRef
- ❗ 注意：shallowRef和ref不能混用，因为ref更新时会强势更新shallowRef的视图（ref底层更新是会调用triggerRef，会强制更新收集的依赖）。
- `import type { customRef } from 'vue'`可以创建一个自定义的 ref，并对其依赖项跟踪和更新触发进行显式控制。
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
    ```

ref的另一种用法：被用来获取dom元素，如下：
```vue
<script setup lang="ts">
import { ref,onMounted } from 'vue'

const strBox = ref<HTMLDivElement>() // 常量名和标签ref属性值需一致

onMounted(()=>{
  console.log(strBox.value?.innerText)
})
</script>

<template>
  <div ref="strBox">JavaScript...</div>
</template>
```
⭐ ref源码讲解：[ref源码](https://www.bilibili.com/video/BV1dS4y1y7vd/?p=7&share_source=copy_web&vd_source=461186b903c28eeeb1342b31e0bfe68e&t=986)

## 第七章 Reactive

ref和reactive都是用来创建响应式对象的，两者的区别在于：
1. ref支持所有类型，reactive只支持引用类型（Arr、Object、Map、Set）
2. ref取值赋值都需要以.value的形式  ，reactive可以直接读写值

❗ 注意：reactive 是通过proxy代理的对象，不能被直接赋值，arr类型一般使用方法进行增删改操作（方法1），或将数组作为对象属性包装一层（方法2）

补充：
- `import { readonly } from "vue"`，readonly可以将reactive代理的对象变为只读，无法重新赋值，但是可被原始对象影响，原始对象更改也会readonly对象。
- `import { shallowReactive } from "vue"`，shallowReactive也是响应式浅层的，只到第一层数据，也会被reactive影响，所以不能混用。

❗ 注意：shallowReactive和reactive也是不能混用


Reactive源码[reactive源码讲解](https://www.bilibili.com/video/BV1dS4y1y7vd/?p=8&share_source=copy_web&vd_source=461186b903c28eeeb1342b31e0bfe68e&t=817)

## 第八章：ToRef、ToRefs、ToRaw

ToRef应用场景：可以将对象的某个属性包装成为一个响应式对象提供给外部使用，而不用暴露整个对象。经常将toRef作为函数参数传递，并做到响应式对象视图更新
```vue
<script setup lang='ts'>
import { ref,reactive,toRef,toRefs,toRaw } from 'vue'
const tom = {name:"tom",age:28}
const tomName = toRef(tom,"age")
// toRef 只能修改响应式对象的值，对非响应式视图毫无影响
const changeTom = ()=>{
  tomName.value = Math.floor(Math.random()*100)
}

const jerry = reactive({name:"jerry",age:28})
const JerryAge = toRef(jerry,"age")
// 可以做到响应式更新
const changeJerry = (obj)=>{
  JerryAge.value = Math.floor(Math.random()*100)
}
</script>

<template>
  <h1>{{ tom.name+"--"+tom.age }}</h1>
  <button @click="changeTom">change tom age</button>
  <hr>
  <h1>{{ jerry.name+"--"+jerry.age }}</h1>
  <button @click="changeJerry">change jerry age</button>
</template>
```
理解：相当于解构，但是解构出来的对象是响应式的

⭐ toRefs源码实现非常简单
```ts
const toRefs =<T extends object>(object:T) => {
    const map:any = {}
    for (let key in object) {
        map[key] = toRef(object.key)
    }
    return map
}
```
toRefs一般被用于复杂对象，常搭配对象解构，示例如下：
```vue
<script setup>
import { reactive,toRefs } from 'vue'
const person = reactive({name:"tom",age:18})
let {name,age} = toRefs(person)
let change = ()=>{
  age.value = Math.floor(18+Math.random()*82)
  name.value = Math.random().toString(36).slice(2,)
}
</script>

<template>
  <div>{{ person }}</div>
  <button @click="change">change</button>
</template>
```

toRaw应用场景：将一个对象脱离响应式包装，底层是通过 __v_raw 属性，此属性并不会暴露给开发者使用。

⭐ [toRaw源码讲解](https://www.bilibili.com/video/BV1dS4y1y7vd/?p=9&share_source=copy_web&vd_source=461186b903c28eeeb1342b31e0bfe68e&t=709)

## ⭐ 第八章番外：响应式原理 （未完善）

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

## 第九章 computed计算属性
基本使用：
```vue
<script setup>
import { ref,computed } from 'vue'
let firstName = ref("a")
let lastName= ref("b")
// 1. 函数写法


// 2. 对象写法
const name = computed({
  get(){return `${firstName.value}---${ lastName.value}`},
  set(newVal){
    let [last,first] = newVal.split(" ")
    lastName = ref(last)
    firstName = ref(first)
  },
})
</script>

<template>
  <div>{{ name }}</div>
  <input v-model="firstName" />
  <input v-model="lastName" />
</template>
```

## 第十章 watch 侦听器
```vue
<script setup lang="ts">
import { ref,watch } from 'vue'

let msg = ref("hello")
let msg1 = ref("world")
// 1. 为单个属性添加侦听器
watch(msg,(newVal,oldVal)=>{
  console.log(newVal,oldVal)
})
// 2. 为多个属性添加侦听器（数组形式）
watch([msg,msg1],(newVal,oldVal)=>{
  console.log(newVal,oldVal)
})
</script>
```
### 深度监视，
vue3中需要注意newVal和oldVal是相同的，后面会解释（源码job之后，新旧值是直接赋值）
```vue
<script setup lang="ts">
import { ref,watch } from 'vue'
let data = ref({
  foo: { name:"tom", age:18 }
})
// 深度监视
watch(data,(newVal,oldVal)=>{
  // newVal和oldVal 是相同的！！！
  console.log(newVal,oldVal)
},{
  // active 底层会默认开启
  deep:true,
  immediate:true,
  flush:"pre",// watch回调执行时机：pre 组件更新之前执行; async 同步执行; post 组件更新之后执行
})
</script>
```
### 监视对象的某个属性，而非监视整个对象
```vue
<script setup lang="ts">
import { watch,reactive } from 'vue'
let data = reactive({
  foo:{name:"tom", age:18}
})
// 监视单一属性 官方推荐使用函数返回
watch(()=>data.foo.name,(newVal,oldVal)=>{console.log(newVal,oldVal)})
</script>
```

⭐ 源码讲解[watch 源码](https://www.bilibili.com/video/BV1dS4y1y7vd/?p=12&share_source=copy_web&vd_source=461186b903c28eeeb1342b31e0bfe68e&t=409)

## 第十一章 watchEffect 高级侦听器
```vue
<script setup lang="ts">
import { ref,watchEffect } from 'vue'
let data = ref({
  foo:{name:"tom", age:18}
})
// watchEffect会返回一个停止函数
const stop = watchEffect((oninvalidate)=>{
  // 需要监听的属性直接在回调函数中使用即可，会自动监听，而且是非惰性的，挂载完成后会自动调用
  console.log("data ==>",data.value)
  // oninvalidate 会在更新前被调用，无关oninvalidate函数位置
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

## 第十二章 生命周期
```vue
<script setup lang="ts">
  import { 
    ref,onBeforeMount,onMounted,onBeforeUpdate,onUpdated,
    onBeforeUnmount,onUnmounted,onRenderTracked,onRenderTriggered
  } from 'vue'
  
  // 1. setup 语法糖模式中，beforeCreate created 被屏蔽了(直接在setup函数中可以替代)
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
  const change = ()=>{msg.value = "李四篡位"}
</script>
<Comp/>	
<template>
  <div>{{msg}}</div>
  <button @click="change">change</button>
</template>
```

❗ 注意：nextTick是异步的，生命周期都是同步的，nextTick执行的时候生命周期早就执行过一遍了

⭐ [生命周期源码](https://www.bilibili.com/video/BV1dS4y1y7vd/?p=14&share_source=copy_web&vd_source=461186b903c28eeeb1342b31e0bfe68e&t=665)

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
### 全局组件
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
### 递归组件
见如下，直接使用组件名递归（方式1）
```vue
<template>
<div v-for="item in data" class="tree">
  <input type="checkbox" :checked="item.checked"> <span>{{item.name}}</span>
  <!-- 直接使用组件名当递归组件的名称 -->
  <Tree v-if="item?.children?.length" :data="item?.children"></Tree>
</div>
</template>

<script setup lang="ts">
interface Tree {
  name:String,
  checked:boolean,
  children?:Tree[]
}

defineProps<{
  data:Tree[]
}>()
</script>

<style scoped>
.tree {
  margin-left: 10px;
}
</style>
```
使用script标签递归（方式2）
```vue
<template>
<div v-for="item in data" class="tree">
  <input type="checkbox" :checked="item.checked"> <span>{{item.name}}</span>
  <MyTreeVue v-if="item?.children?.length" :data="item?.children"></MyTreeVue>
</div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
interface Tree {
  name:String,
  checked:boolean,
  children?:Tree[]
}

defineProps<{
  data:Tree[]
}>()
</script>

<!-- vue支持再写一个script标签在递归组件中重命名当前组件 -->
<script lang="ts">
export default  {
  name: "MyTreeVue"
}
</script>

<style scoped>
.tree {
  margin-left: 10px;
}
</style>
```
使用第三方依赖（方式3）
[unplugin-vue-define-options](https://www.npmjs.com/package/unplugin-vue-define-options)

递归组件添加事件,注意阻止事件冒泡和使用$event传递事件源
```vue
<template>
<div v-for="item in data" class="tree">
  <input type="checkbox" :checked="item.checked" @click.stop="clickTap(item,$event)"> <span>{{item.name}}</span>
  <Tree v-if="item?.children?.length" :data="item?.children"></Tree>
</div>
</template>

<script setup lang="ts">
// ...
const clickTap = (item:Tree,e:HTMLInputElement)=>{
  console.log(item,e)
}
</script>

<style scoped>
.tree {
  margin-left: 10px;
}
</style>
```

## 第十六章 动态组件
多个组件使用同一个挂载点，并做到动态切换,下面是一个简单天气组件table切换的案例
```vue
<template>
  <div class="weather">
    <header>
      <div @click="switchCom(item,index)" :class="[active==index?'active':'']" v-for="(item,index) in data" :key="index">{{item.name}}</div>
    </header>
    <section>
       <component :is="comId"></component>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref,reactive } from "vue"
import TodayVue from "./Today.vue"
import TomorrowVue from "./Tomorrow.vue"


let comId = ref(TodayVue)
let active = ref(0)

const data = reactive([
  {
    name:"今天",
    com:TodayVue
  },{
    name:"明天",
    com:TomorrowVue
  },
])

let switchCom = (item:any,index:number)=>{
  comId.value = item.com
  active.value = index
}
</script>

<style scoped lang="less">
@border:#ccc;
.weather {
  display: flex;
  flex-direction: column;
  width: 200px;
  height: 200px;
  border: 1px solid @border;
  border-radius: 8px;
  padding:5px;
  box-shadow: #cccccc 1px 1px;
  cursor: pointer;
  header {
    display: flex;
    justify-content: space-around;
    border-bottom: 1px solid @border;
  }
  section {
    flex: 1 1 auto;
    padding: 5px 2px ;
  }
}
.active {
  background-color: #ADC181;
  color: #3B2121;
}
</style>
```
注意，如果按照上面的做了依然会出现警告，这是因为ref对组件内部也做了proxy代理，这是不必要的，带来了性能浪费。
因此需要shallowRef（代理外面一层）或markRaw（添加__skip__属性，reactive碰到此属性会跳过proxy代理）
```js
import { shallowRef,markRaw } from 'vue'

let comId = shallowRef(TodayVue)

const data = reactive([
    {
        name:"今天",
        com:markRaw(TodayVue)
    },{
        name:"明天",
        com:markRaw(TomorrowVue)
    },
])

// ...
```
第二种方式：类似于 vue2 的书写风格
```js
import AVue from "./Avue.vue"
import BVue from "./Bvue.vue"

const data = reactive([
    {
        name:"今天",
        com:"AVue" // 字符串形式
    },{
        name:"明天",
        com:"BVue"
    },
])

// 类似于Vue2 需要注册
components:{
    AVue, BVue
}
```

源码解析：

component底层会调用_resolveDynamicComponent(component)函数进行动态切换。

_resolveDynamicComponent(component)首先会判断参数是否为string类型，是则调用 resolveAsset，对象类型则直接返回（性能更高）

resolveAsset函数会判断当前type（optionsAPI还是CompositionApi）去做区分--->通过resolve()进行注册,返回一个res（当前要切换的组件）

## 第十七章 插槽slot
使用场景：组件可以被复用但是内部有少量的改动，使用插槽根据需求修改就行了
### 匿名插槽和具名插槽
index.vue
```vue
<template>
<div class="content">
  <MenuVue>
    <template v-slot:left>←</template>
    <template v-slot:right>→</template>
    <template v-slot>匿名插槽被插入了</template>
  </MenuVue>
</div>
</template>
```
menu.vue
```vue
<template>
  <div class="container">
    <header>
      <!-- 具名插槽 -->
      <span><slot name="left"></slot></span>
      <span><slot name="right"></slot></span>
    </header>
    <main>
      <!-- 匿名插槽 -->
      <slot></slot>
    </main>
  </div>
</template>
```
### 作用域插槽
父组件中可以拿到子组件的值
index.vue
```vue
<template>
<div class="content">
  <MenuVue>
    <template v-slot="{slotData,index}">
      作用域插槽{{slotData.name}}插到了第{{index}}位
    </template>
  </MenuVue>
</div>
</template>
```
menu.vue
```vue
<template>
  <main>
    <div v-for="(item,index) in slotData" :key="index">
      <slot :index="index" :slotData="item"></slot>
    </div>
  </main>
</template>

<script setup lang="ts">
const slotData = [
  {name:"A",age:18},
  {name:"B",age:19},
  {name:"C",age:20},
]
</script>
```
语法糖1：可以使用#代替v-slot:，如`<template #left></template>
语法糖2：可以使用#default代替v-slot，如`<template #default={data}></template>
### 动态插槽
动态决定插槽
```vue
<template>
<div class="content">
  <MenuVue>
    <template #[slotName]>
      我在哪儿
    </template>
  </MenuVue>
</div>
</template>

<script steup lang="ts">
import { ref } from "vue"

let slotName = ref('left')
</script>
```

## 第十八章 异步组件、代码分包和 suspense
注意：suspense和telepot是一样的，都是Vue3新增的内置组件，但是需要注意的是 suspense 以后可能会有一些变化。

### 异步组件
应用场景可参考 elementUI 的骨架屏案例，这两者一般是配合使用的。
```vue
<template>
<div class="content">
  <Suspense>
    <template #default>
      <!--   加载完成之后的组件   -->
      <syncVue></syncVue>
    </template>
    <template #fallback>
      <!--   加载中的组件   -->
      <skeletonVue></skeletonVue>
    </template>
  </Suspense>
</div>
</template>

<script setup lang="ts">
import {defineAsyncComponent} from "vue";
import skeletonVue from "./components/skeleton.vue"
// 第一种方式（函数方式，常用）
const syncVue = defineAsyncComponent(()=> import("@/components/sync.vue"))

// 第二种方式（对象形式）
// const syncVue = defineAsyncComponent({
//   loadingComponent:()=> import("@/components/sync.vue"),
//   timeout:,
//   errorComponent:
// })
</script>
```
性能优化之代码分包：凡是通过import函数模式引入的，在打包时都会被拆解，不会被打入主包。

在普通模式下，npm run build 会打包到dist文件夹，assets>>index.xxx.js文件会将所有的东西放到其中，如果这个文件很大，首次加载时白屏时间会非常长。

使用异步组件的方式，异步组件会被拆分出来，在需要时才会被加载。

## 第十九章 传送组件

Teleport 是vue3.0新增的内置组件，可将模板渲染到指定dom节点，不受父级style、v-show限制
Teleport 组件有两个属性to（传送位置，css选择器）和disabled（是否为原位置，布尔值），

Teleport源码：
坐标：runtime-core>>src>>renderer.ts
Teleport经过patch函数的创建--->判断每个类型创建对应节点、元素和组件
如果是Teleport，调用process方法（创建、更新）
process方法调用resolveTarget(n2.props,querySelector)
resolveTarget函数读取props的to属性，通过querySelector读取元素并返回

获取目标移动的dom节点--向目标元素挂载节点--挂载子节点（disable为true，原先位置挂载，false挂载到target位置）

## 第二十章 keep-alive缓存组件
keep-alive内置组件一般被优化用户体验，被包裹的组件会被缓存，常用属性如下：
```vue
<!--A、B组件会被缓存 -->
<keep-alive include="['A','B']">
    <A></A>
    <B></B>
    <C></C>
</keep-alive>

<!--A、B组件不会被缓存 -->
<keep-alive exclude="['A','B']">
    <A></A>
    <B></B>
    <C></C>
</keep-alive>

<!-- 指定缓存组件的最大数量（自动缓存活跃组件） -->
<keep-alive :max="2">
<A></A>
<B></B>
<C></C>
</keep-alive>
```
使用keep-alive之后，会增加两个声明周期钩子：

```vue
<script setup>
// mounted钩子只会走一次
mounted(()=>{
  console.log("初始化")
})

onActivated(()=>{
  console.log("keep-alive初始化")
})

onDeactivated(()=>{
  console.log("keep-alive卸载")
})

// onUnmounted钩子不会被调用，取而代之的是 onDeactivated钩子
onUnmounted(()=>{
  console.log("卸载")
})
</script>
```
源码讲解:[坐标](https://www.bilibili.com/video/BV1dS4y1y7vd/?p=22&share_source=copy_web&vd_source=461186b903c28eeeb1342b31e0bfe68e&t=479)

## 第二十一章
