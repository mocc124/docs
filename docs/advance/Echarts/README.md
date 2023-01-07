# Vue 中使用 Echarts

地址：[ Apache ECharts ](https://echarts.apache.org/zh/index.html)

## 1. 按需引入

📂 Echats/echarts.js

```js
import Vue from "Vue";
// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from "echarts/core";
// 引入需要的图表，图表后缀都为 Chart
import { BarChart } from "echarts/charts";
// 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
} from "echarts/components";
// 标签自动布局、全局过渡动画等特性
import { LabelLayout, UniversalTransition } from "echarts/features";
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from "echarts/renderers";

// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  BarChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
]);

export default echarts;
```

📂 main.js

```js
import Vue from "vue";
import App from "./App.vue";

// 引入 Echarts 配置项
import echarts from "./Echarts/echarts";

// 将 echarts 挂载到 Vue 实例中，组件中使用 this.$echarts 调用
Vue.prototype.$echarts = echarts;

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
```

## 2. Vue 化 Echarts

Vue 是数据驱动 DOM，但 echarts 不是，我们应该如何解决这个问题？

```vue
<template>
  <div :id="uuid" class="echarts_box"></div>
</template>

<script>
const UUID = `echarts_${Math.random().toString(36).slice(2)}`;

export default {
  name: "Echarts",
  data() {
    return {
      myChart: null,
      lineOption: null,
      uuid: UUID,
      pieData: null,
    };
  },
  methods: {
    echartsInit() {
      // 基于准备好的dom，初始化echarts实例
      this.myChart = this.$echarts.init(document.getElementById(this.uuid));
      // 绘制图表
      this.myChart.setOption(this.option);
    },
    changeData() {
      // 利用定时器模拟数据变化
      setInterval(() => {
        this.pieData = [
          { tit: "A", value: Math.floor(Math.random() * 100) },
          { tit: "B", value: Math.floor(Math.random() * 100) },
          { tit: "C", value: Math.floor(Math.random() * 100) },
          { tit: "D", value: Math.floor(Math.random() * 100) },
          { tit: "E", value: Math.floor(Math.random() * 100) },
        ];
      }, 3000);
    },
  },
  watch: {
    pieData() {
      // 数据变化时，重新渲染
      this.myChart.setOption(this.option);
    },
  },
  mounted() {
    new Promise((res, rej) => {
      this.changeData();
      res();
    })
      .then(() => {
        this.echartsInit();
      })
      .catch(() => {
        throw new Error("err: 数据初始化失败");
      });
  },
  computed: {
    option() {
      return {
        xAxis: {
          type: "category",
          data: this.pieData.map((item) => item.tit),
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: this.pieData.map((item) => item.value),
            type: "line",
            smooth: true,
          },
        ],
      };
    },
  },
};
</script>

<style scoped>
.echarts_box {
  width: 100%;
  height: 300px;
}
</style>
```

## 3. 实现响应式

Echarts 实例 提供了 [resize](https://echarts.apache.org/zh/api.html#echartsInstance.resize) 方法，改变图表尺寸，在容器大小发生改变时需要手动调用。

```js
data() {
  return {
    timer:null,
  }
},
methods:{
  timeout(delay) {
    return setTimeout(() => {
      this.myChart.resize();
    }, delay);
  }
},
mounted() {
  // 监听视口变化，即使渲染图表 此处应做防抖
  window.onresize = () => {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = this.timeout(1000)
    } else {
      this.timer = this.timeout(1000)
    }
  };
},
```
