# Vue2 中的数据传参总结

## 父子组件

### props / $emit

父传子：通过 props（标签属性的形式） ，子传父：通过$emit（自定义事件的形式）
Parent.vue

```vue
<template>
  <ChildrenVue :data="data" @earn="add" @invest="reset"></ChildrenVue>
</template>

<script>
import ChildrenVue from "@/components/Children.vue";

export default {
  name: "App",
  components: {
    ChildrenVue,
  },
  data() {
    return {
      data: Number(String(Math.random()).split(".")[1].slice(0, 6)),
    };
  },
  methods: {
    add({ value }) {
      if (!value) return;
      this.assets += Number(value);
    },
    reset({ value }) {
      if (!value) return;
      this.assets = Number(value);
    },
  },
};
</script>
```

ChildrenVue

```vue
<template>
  <span>可支配资产:{{ this.$props.assets }}</span>
  <button style="padding: 3px 0; margin:0 3px;" @click="invest()">-</button>
  <button style="padding: 3px 0; margin:0 3px;" @click="earn">+</button>
</template>

<script>
export default {
  name: "ChildrenVue",
  data() {
    return {
      value: 200,
    };
  },
  props: {
    assets: {
      type: Number,
    },
  },
  methods: {
    earn() {
      this.$emit("earn", { origin: "Children", value: this.value });
    },
    invest(value = 1000) {
      this.$emit("invest", { origin: "Children", value });
    },
  },
};
</script>
```

$emit的另一种形式:
子组件传参 `this.$emit("add:value",1000)`，父组件接收 `<ChildrenVue @invest:value="obj => this.data=value"/>`值，
如果父组件中需要绑定某个值与子组件$emit事件的值为同步状态，还有一种语法糖形式，即`<ChildrenVue :value.sync="data"/>`

补充 v-model 进行组件间双向绑定:
[v-model 指令](https://cn.vuejs.org/guide/components/v-model.html)是 v-bind 和 v-on 的语法糖形式，所以我们也可以进行组件间的双向数据绑定：

```vue
<template>
  <!-- 显式绑定， -->
  <!--  <ChildrenVue :value="value" @input="newVal=>{value = newVal}"/> -->
  <!-- v-model ，效果与上面是等价的 -->
  <ChildrenVue v-model="value" />
</template>
<script>
export default {
  data() {
    return { value: "" };
  },
};
</script>
```

```js
// 接收值是必须为 value
props: ["value"];
// 传递值是必须为 input
this.$emit("input", 100);
```

### ref

父组件拿子组件的属性/方法：通过 ref,ref 作为 dom 属性，会拿到这个 dom 节点，而作为组件属性，则拿到的是整个组件实例，就可以进一步拿到子组件的数据。

## 祖孙组件

### $parent 和 $children

祖孙组件之间传递参数可以通过$emit和props的形式逐级传递，但是这种方式产生了很多冗余代码，
优化方式之一就是[$parent](https://cn.vuejs.org/api/component-instance.html#parent)，它可以获取到当前组件的父元素，

祖组件传递自定义事件给父组件

```vue
<parent :value="value" @input="(val) => {}" />
```

孙组件通过$parent 拿到祖组件传递给父组件的自定义事件

```js
this.$parent.$emit("input", this.value);
```

与之相反的是 [$children](https://v2.cn.vuejs.org/v2/api/#vm-children) 可以获取当前实例的直接子组件。

### provide / inject（依赖注入）

Element 框架中大量使用此 api

[provide / inject](https://cn.vuejs.org/guide/components/provide-inject.html)，
它允许祖先组件向其所有后代组件注入一个依赖，后代组件可以向自身实例注入依赖拿到数据。

## 不规则组件通信

注意：$dispatch 和 $broadcast（Vue 2.0 已弃用，知道即可）

### eventBus

常用的有 eventBus，全局事件总线则是将 eventBus 挂载到了 Vue.prototype 上（简单场景还可以直接使用$root），
各个组件通过 $emit注册事件、$on 监听事件、$off 卸载事件。

```js
const eventBus = new Vue();
export default {
  eventBus,
};
```

A.vue

```js
import { eventBus } from "./eventBus";

// 注册事件
eventBus.$emit("change", (data = 100));
```

B.vue

```js
import { eventBus } from "./eventBus";

// 监听事件
eventBus.$on("change", (data) => {});
// 移除事件
eventBus.$off("change");
```

### mixins

[混入 -mixin](https://cn.vuejs.org/api/options-composition.html#inject)
提供了一种非常灵活的方式，来分发 Vue 组件中的可复用变量、方法、生命周期钩子等。

### VueX

[Vuex链接](./Vuex/README.md)

### Pina
