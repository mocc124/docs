# Vuex

1. 我们为什么需要 Vuex？或者说它能带来什么？

Vue 组件一般是使用“单向数据流”理念，包含以下几个部分：

- state，驱动应用的数据源；
- view，以声明方式将 state 映射到视图；
- actions，响应在 view 上的用户输入导致的 state 变化。

但是，当我们的应用遇到多个组件共享状态时，单向数据流的简洁性很容易被破坏：如多个视图依赖于同一状态或者来自不同视图的行为需要变更同一状态。
这时常规的 props 传参对于兄弟组件间的状态传递无能为力，而采用父子组件直接引用或者通过事件来变更和同步状态的多份拷贝模式非常脆弱，通常会导致维护艰难。

Vuex 借鉴了 Flux (opens new window)、Redux (opens new window)和 The Elm Architecture (opens new window)的思想，通过一个全局单例模式管理共享状态，通过定义和隔离状态管理中的各种概念并通过强制规则维持视图和状态间的独立性，我们的代码将会变得更结构化且易维护。

![Vuex](https://v3.vuex.vuejs.org/vuex.png)

2. 什么时间选择使用 Vuex？

Vuex 一般被用在大型单页应用上，如果应用足够简单，那么可以使用[Store 模式](https://v2.cn.vuejs.org/v2/guide/state-management.html#%E7%AE%80%E5%8D%95%E7%8A%B6%E6%80%81%E7%AE%A1%E7%90%86%E8%B5%B7%E6%AD%A5%E4%BD%BF%E7%94%A8)就足够了。

3. 参考资料

[Vuex 中文文档](https://v3.vuex.vuejs.org/zh/)、
[Scrimba 上的 Vuex 课程](https://scrimba.com/learn/vuex)、
[Pinia|新一代 Vue 状态管理工具](https://pinia.web3doc.top/)

## 1. 基本使用

Vuex 依赖 Promise，如果需要兼容性，则可以使用一个 polyfill 的库，例如 [es6-promise](https://github.com/stefanpenner/es6-promise)。
参考[Vuex Promise](https://v3.vuex.vuejs.org/zh/installation.html#promise)

第一步：安装 Vuex（省略，详见文档）
第二步：配置使用
📂 router/index.js
```js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let store = new Vuex.Store({
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    modules: {}
})

export default store;
```
第三步：直接使用 Vuex（不推荐）
📂 xxx.vue
```vue
<script >
import store from "@/store/index";

export default {
  computed: {
    count() {
      return store.state.count // 通过 store.state 来获取状态对象
    }
  },
  methods: {
    increment() {
      store.commit('increment') // 通过 store.commit 方法触发状态变更
    }
  }
}
</script>
```
第四步：将Vuex注册到Vue实例对象上（推荐，可省略第三步）
📂 main.js
```js
import Vue from 'vue'
import App from './App.vue'
import store from '@/store/index'


new Vue({
    store,
    render: h => h(App)
}).$mount('#app')
```
通过第四步的方式，可以在全部组件中使用 this.$store 的方式访问/修改共享状态。
需要注意的是，不要直接修改 store.state.xxx ，而是通过提交 mutation 的方式。因为我们想要更明确地追踪到状态的变化，而且还可以实现保存快照、调试功能等。

## 2. Vuex 核心理念
### State
Vuex使用了单一状态树的思想来管理状态，单一状态树指每个应用将仅仅包含一个 store 实例，它包含了全部的应用层级状态并作为一个“唯一数据源（SSOT）”。
单一状态树的好处是能够让我们最直接的方式找到某个状态的片段，之后的维护也比较简单。

状态的读取
由于 Vuex 的状态存储是响应式的，从 store 实例中读取状态最简单的方法就是在计算属性中返回某个状态（第三步）， 每当 store.state.count 变化的时候, 都会重新求取计算属性，并且触发更新相关联的 DOM。
然而，这种模式导致组件依赖全局状态单例。在模块化的构建系统中，在每个需要使用 state 的组件中需要频繁地导入，并且在测试组件时需要模拟状态。

更加推荐将状态从根组件“注入”到每一个子组件中（需调用 `Vue.use(Vuex)`）的方式（第四步），通过在根实例中注册 store 选项，该 store 实例会注入到根组件下的所有子组件中，且子组件能通过 this.$store 访问。

当一个组件需要获取多个状态的时候，将这些状态都声明为计算属性会有些重复和冗余。 Vuex提供了 **mapState** 辅助函数帮助生成计算属性。
```js
// 在单独构建的版本中辅助函数为 Vuex.mapState
import { mapState } from 'vuex'

export default {
    // ...
    computed: mapState({
        count: state => state.count,
        // 传字符串参数 'count' 等同于 `state => state.count`
        countAlias: 'count',
        // 为了能够使用 `this` 获取局部状态，必须使用常规函数
        countPlusLocalState (state) {
            return state.count + this.localCount
        }
    })
}
```
我们也可以给 mapState 传一个字符串数组，前提是当映射的计算属性的名称与 state 的子节点名称相同。
```js
computed: mapState([
// 映射 this.count 为 store.state.count
'count'
])
```
上面的两种方式占用了整个computed计算属性，当组件自生有计算属性时，我们不能采用上面的方式。
mapState 函数返回的是一个对象，我们可以使用展开运算符可以将它与局部计算属性混合使用。
```js
export default {
    computed: {
        // 使用对象展开运算符将此对象混入到外部对象中
        ...mapState({})
    }
}
```

### Getters
现实的业务中，不仅是要读取/提交状态，有时候我们还需要从 state 中派生出一些状态，例如对列表进行过滤并计数，当然恶魔可以封装一个函数来读取state状态后再处理这些状态属性。

但是如果有多个组件需要用到此属性，我们要么复制这个函数，或者抽取到一个共享函数然后在多处导入它。这两种方式都不是很优雅！、

Vuex 允许我们在 store 中定义“getter”（可以认为是 store 的计算属性）。就像计算属性一样，getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。

📂 store/index.js
```js
const store = new Vuex.Store({
    state: {
        todos: [
            { id: 1, text: '...', done: true },
            { id: 2, text: '...', done: false }
        ]
    },
    getters: {
        // Getter 接受 state 作为其第一个参数：
        doneTodos: state => {
            return state.todos.filter(todo => todo.done)
        }
    }
})
```
Getter 会暴露为 store.getters 对象，可以以属性的形式访问这些值，如`this.$store.getters.doneTodo`。

不仅如此，Getter 也可以接受其他 getter 作为第二个参数：
```js
getters: {
  // ...
  doneTodosCount: (state, getters) => {
    return getters.doneTodos.length
  }
}
```

上面是属性访问的方式，当需要给 getters 传参时，可以通过让 getter 返回一个函数,如下：
```js
getters: {
  // ...
  getTodoById: (state) => (id) => {
    return state.todos.find(todo => todo.id === id)
  }
}
```
访问时需要携带参数访问:`store.getters.getTodoById(2)`。

注意：当 getter 在通过方法访问时，每次都会进行调用，而不会缓存结果。

mapGetters 辅助函数会将 store 中的 getter 映射到局部计算属性：
```js
import { mapGetters } from 'vuex'

export default {
  // ...  
  computed: {
  // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters([
      'doneTodosCount',
      'anotherGetter',
      // ...
    ])
  }
}
```
也可以使用对象形式，随便将一个 getter 属性另取一个名字：
```js
export default {
    // ...
    computed: {
        ...mapGetters({
            doneCount: 'doneTodosCount'
        })
    }
}
```

### Mutations
更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。
Vuex 中的 mutation 非常类似于事件：每个 mutation 都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler)。
这个回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数：
```js
const store = new Vuex.Store({
  state: {
    count: 1
  },
  mutations: {
    increment (state) {
      // 变更状态
      state.count++
    }
  }
})
```
但改变状态不能直接调用一个 mutation handler。这个选项更像是事件注册：“当触发一个类型为 increment 的 mutation 时，调用此函数。
”要唤醒一个 mutation handler，你需要以相应的 type 调用 store.commit 方法：`store.commit('increment')`

当调用store.commit方法时传入额外参数，即 mutation 的 载荷（payload），一般来说载荷应该是一个对象，这样可以包含多个字段并且记录的 mutation 会更易读：

📂 store/index.js
```js
// ...
export default new Vuex.store({
    // ...
    mutations: {
        increment (state, payload) {
            state.count += payload.amount
        }
    }
})
```
📂 xxx.vue
```js
store.commit('increment', {
  amount: 10
})
```
mutation 提交风格还有另一种方式，直接使用包含 type 属性的对象，

```js
store.commit({
  type: 'increment',
  amount: 10
})
```
当使用对象风格的提交方式，整个对象都作为载荷传给 mutation 函数，因此 handler 保持不变：
```js
export default new Vuex.store({
    // ...
    mutations: {
        increment (state, payload) {
            state.count += payload.amount
        }
    }
})
```


既然 Vuex 的 store 中的状态是响应式的，那么当我们变更状态时，监视状态的 Vue 组件也会自动更新。
这也意味着 Vuex 中的 mutation 也需要与使用 Vue 一样遵守一些注意事项：

1. 最好提前在你的 store 中初始化好所有所需属性。

2. 当需要在对象上添加新属性时，你应该

    - 使用 Vue.set(obj, key, value), 或者
    - 以新对象替换老对象。如，利用对象展开运算符这样写：`state.obj = { ...state.obj, newProp: 123 }`
3. mutation 必须是同步函数,mutation 中混合异步调用会导致程序混乱，调试困难。如果确实需要异步操作请参考 [Action](https://v3.vuex.vuejs.org/zh/guide/actions.html#%E5%88%86%E5%8F%91-action)。

提交 mutation 的方式除了 `this.$store.commit('xxx') `提交 mutation，或者使用 mapMutations 辅助函数将组件中的 methods 映射为 store.commit 调用（需要在根节点注入 store）。
```js
import { mapMutations } from 'vuex'

export default {
  // ...
  methods: {
    ...mapMutations([
      'increment', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`

      // `mapMutations` 也支持载荷：
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
    ]),
    ...mapMutations({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
    })
  }
}
```

### Actions
上面说 mutation 必须是个同步函数，这是因为调用了包含异步回调的 mutation 来改变状态，我们不知道什么时候回调会被执行？
```js
store.commit('increment')
// 任何由 "increment" 导致的状态变更都应该在此刻完成。
```
如果确实需要异步操作，我们不应该使用 Mutation，推荐使用 Action，Action 类似于 mutation，不同在于：

- Action 提交的是 mutation，而不是直接变更状态。
- Action 可以包含任意异步操作。

Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象，因此可以调用 context.commit 提交一个 mutation，
或者通过 context.state 和 context.getters 来获取 state 和 getters。

```js
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  },
  actions: {
     incrementAsync ({ commit }) {
        setTimeout(() => {
           commit('increment')
        }, 1000)
     }
  }
})
```
实践中，我们会经常用到参数解构来简化代码（特别是我们需要调用 commit 很多次的时候）：
```js
const store = new Vuex.Store({
   state: {
      count: 0
   },
   mutations: {
      increment (state) {
         state.count++
      }
   },
   actions: {
      incrementAsync ({ commit }) {
         setTimeout(() => {
            commit('increment')
         }, 1000)
      }
   }
})
```
Action 通过 store.dispatch 方法触发：`store.dispatch('increment')`,

Actions 支持同样的载荷方式和对象方式进行分发：
```js
// 以载荷形式分发
store.dispatch('incrementAsync', {
  amount: 10
})

// 以对象形式分发
store.dispatch({
  type: 'incrementAsync',
  amount: 10
})
```
这是一个购物车的实例：
📂 mutation-types.js
```js
const CHECKOUT_REQUEST = "CHECKOUT_REQUEST"
const CHECKOUT_SUCCESS = "CHECKOUT_SUCCESS"
const CHECKOUT_FAILURE = "CHECKOUT_FAILURE"

export {CHECKOUT_REQUEST,CHECKOUT_SUCCESS,CHECKOUT_FAILURE}
```
📂 store/index.js
```js
// ...

export default new Vuex.store({
   state: {},
   mutations: {
      [CHECKOUT_REQUEST]() {/*...*/},
      [CHECKOUT_SUCCESS]() {/*...*/},
      [CHECKOUT_FAILURE](cardItems) {/*...*/},
   },
   actions: {
      checkout ({ commit, state }, products) {
         // 把当前购物车的物品备份起来
         const savedCartItems = [...state.cart.added]
         // 发出结账请求，然后乐观地清空购物车
         commit(types.CHECKOUT_REQUEST)
         // 购物 API 接受一个成功回调和一个失败回调
         shop.buyProducts(
                 products,
                 // 成功操作
                 () => commit(types.CHECKOUT_SUCCESS),
                 // 失败操作
                 () => commit(types.CHECKOUT_FAILURE, savedCartItems)
         )
      }
   }
})
```
在组件中可以使用 this.$store.dispatch('xxx') 分发 action，但Vuex 也提供了辅助函数将组件的 methods 映射为 store.dispatch 调用（需要先在根节点注入 store）：
```js
import { mapActions } from 'vuex'

export default {
  // ...
  methods: {
    ...mapActions([
      'increment', // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`

      // `mapActions` 也支持载荷：
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.dispatch('incrementBy', amount)`
    ]),
    ...mapActions({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
    })
  }
}
```
Action 通常被用来处理异步任务，而一般我们需要在A异步任务执行后，处理B异步任务等等，
因此 store.dispatch 被设计可以处理被触发的 action 的处理函数返回的 Promise，并且 store.dispatch 仍旧返回 Promise：

📂 store/index.js
```js
export default new Vuex.store({
   // ...
   actions: {
      actionA ({ commit }) {
         return new Promise((resolve, reject) => {
            setTimeout(() => {
               commit('someMutation')
               resolve()
            }, 1000)
         })
      },
      actionB ({ dispatch, commit }) {
         return dispatch('actionA').then(() => {
            commit('someOtherMutation')
         })
      }
   }
})
```
📂 xxx.vue
```js
store.dispatch('actionB').then(() => {
  // ...
})
```
当然，也可以利用 async / await，我们可以如下组合 action：
```js
// 假设 getData() 和 getOtherData() 返回的是 Promise

export default new Vuex.store({
   mutations:{
      gotData(callback) {
          callback()
      },
      gotOtherData(callback) {
         callback()
      }
   },
   actions: {
      async actionA ({ commit }) {
         commit('gotData', await getData())
      },
      async actionB ({ dispatch, commit }) {
         await dispatch('actionA') // 等待 actionA 完成
         commit('gotOtherData', await getOtherData())
      }
   }
})
```

### Modules

由于使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，store 对象就有可能变得相当臃肿。

为了解决以上问题，Vuex 允许我们将 store 分割成模块（module）。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块——从上至下进行同样方式的分割：

```js
const moduleA = {
  state: () => ({ ... }),
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const moduleB = {
  state: () => ({ ... }),
  mutations: { ... },
  actions: { ... }
}

const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})

store.state.a // -> moduleA 的状态
store.state.b // -> moduleB 的状态
```
模块内部的 mutation 和 getter，接收的第一个参数是模块的局部状态对象（context.state）。
对于模块内部的 action/getter，局部状态通过 context.state 暴露出来，根节点状态则为 context.rootState：
```js
const moduleA = {
  state: () => ({
    count: 0
  }),
  mutations: {
    increment (state) {
      // 这里的 `state` 对象是模块的局部状态
      state.count++
    }
  },
  getters: {
    doubleCount (state) {
      return state.count * 2
    }, 
    // 注意：这里的根节点状态会作为第三个参数暴露出来，而不是参数解构出来的
    sumWithRootCount (state, getters, rootState) {
       return state.count + rootState.count
    }
  },
  actions: {
     incrementIfOddOnRootSum ({ state, commit, rootState }) {
        if ((state.count + rootState.count) % 2 === 1) {
           commit('increment')
        }
     }
   },
}
```

默认情况下，模块内部的 action、mutation 和 getter 是注册在全局命名空间。
可以通过添加 `namespaced: true` 的方式使其成为带命名空间的模块。
启用了命名空间的 getter 和 action 会收到局部化的 getter，dispatch 和 commit。
当模块被注册后，它的所有 getter、action 及 mutation 都会自动根据模块注册的路径调整命名。
📂 store/modules/myPage.js
```js
export default{
   state: {
      firstname: "Monica",
      lastname: "Geller",
      age:23
   },
   getters: {
      fullName(state) {
          return state.firstname+state.lastname
      }
   },
   mutations:{
       ageIncrement(state,value=1) {
           
       }
   },
   actions:{
       asyncAgeIncrement(state,value=1) {
           setTimeout(()=>{
              state.age += value
           },1000)
       }
   },
}
```
📂 store/modules/posts.js
```js
export default{
   namespaced: true,
   state: { /*...*/ },
   getters: {
      popular () { /*...*/ } // -> getters['account/posts/popular']
   }
}
```
📂 store/modules/account.js
```js
import myPage from "./modules/myPage.js"
import posts from "./modules/posts.js"

export default {
   namespaced: true,

   // 模块内容（module assets）
   state: () => ({ /*...*/ }), // 模块内的状态已经是嵌套的了，使用 `namespaced` 属性不会对其产生影响
   getters: {
      isAdmin () { /*...*/ } // -> getters['account/isAdmin']
   },
   actions: {
      login () { /*...*/ } // -> dispatch('account/login')
   },
   mutations: {
      login () { /*...*/ } // -> commit('account/login')
   },

   // 嵌套模块
   modules: {
      myPage, // 继承父模块的命名空间
      posts,// 进一步嵌套命名空间
   }
}
```
📂 store/index.js
```js
import account from "./modules/account.js"

const store = new Vuex.Store({
  modules: {
    account,
  }
})
```
📂 xxx.vue
```vue
<script>
import {mapState,mapActions,mapGetters,mapMutations} from 'vuex'

export default  {
   computed:{
     ...mapState('myPage',['name','age']),
     ...mapGetters('myPage',['fullName'])
   }, 
   methods:{
      ...mapMutations('myPage',[ageIncrement]),
      ...mapActions('myPage',[asyncAgeIncrement]),
   }
}
</script>
```
直接获取数据：
- state ：`$store.state.模块名.state属性名`
- getter: `$store.getters['模块名/getter属性名']`
- mutation：`$store.commit('模块名/mutation名') `
- action：`$store.dispatch('模块名/action名')`

如果你希望在带命名空间的模块内访问全局内容，rootState 和 rootGetters 会作为第三和第四参数传入 getter，也会通过 context 对象的属性传入 action。
```js
export default {
    getters:{
       someGetter (state, getters, rootState, rootGetters) {}
    },
   actions:{
      someAction({ dispatch, commit, getters, rootGetters }) {}
   }
}
```

若需要在带命名空间的模块注册全局 action，可以直接使用 this.$store. ，你可添加 root: true，并将这个 action 的定义放在函数 handler 中。
```js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
   actions: {
      someOtherAction ({dispatch}) {
         dispatch('someAction')
      }
   },
   modules: {
      foo: {
         namespaced: true,
         actions: {
            someAction: {
               root: true,  // 必须为 true 才能注册到全局
               handler (namespacedContext, payload) { // namespacedContext 就是 action 中的 Context 参数
               }
            }
         }
      }
   }
})
```

当使用 mapState、mapGetters、mapActions 和 mapMutations 辅助函数绑定带命名空间的模块时，写起来可能比较繁琐，如下：
```vue
<script >
export default  {
   computed: {
      ...mapState({
         a: state => state.some.nested.module.a,
         b: state => state.some.nested.module.b
      }),
      ...mapGetters([
         'some/nested/module/someGetter', // -> this['some/nested/module/someGetter']
         'some/nested/module/someOtherGetter', // -> this['some/nested/module/someOtherGetter']
      ])
   },
   methods: {
      ...mapActions([
         'some/nested/module/foo', // -> this['some/nested/module/foo']()
         'some/nested/module/bar' // -> this['some/nested/module/bar']()
      ])
   }
}
</script>
```
有一种简化写法：将模块的空间名称字符串作为第一个参数传递给上述函数，这样所有绑定都会自动将该模块作为上下文。
```vue
<script >
export default  {
   computed: {
      ...mapState('some/nested/module', {
         a: state => state.a,
         b: state => state.b
      }),
      ...mapGetters('some/nested/module', [
         'someGetter', // -> this.someGetter
         'someOtherGetter', // -> this.someOtherGetter
      ])
   },
   methods: {
      ...mapActions('some/nested/module', [
         'foo', // -> this.foo()
         'bar' // -> this.bar()
      ])
   }
}
</script>
```
还有一种办法是通过使用 createNamespacedHelpers 创建基于某个命名空间辅助函数。
它返回一个对象，对象里有新的绑定在给定命名空间值上的组件绑定辅助函数：
```js
import { createNamespacedHelpers } from 'vuex'

const { mapState, mapActions } = createNamespacedHelpers('some/nested/module')

export default {
  computed: {
    // 在 `some/nested/module` 中查找
    ...mapState({
      a: state => state.a,
      b: state => state.b
    })
  },
  methods: {
    // 在 `some/nested/module` 中查找
    ...mapActions([
      'foo',
      'bar'
    ])
  }
}
```

