# 网络请求模块

需要了解 axios、XMLHttpRequest、fetch 请求

## Axios
Axios 是一个基于 promise 网络请求库，作用于node.js 和浏览器中。在服务端它使用原生 node.js http 模块, 而在客户端（浏览器）则使用 XMLHttpRequests。
因为使用简单,包尺寸小且提供了易于扩展的接口被广泛使用。

[Axios 官方地址](https://www.axios-http.cn/)

优点:
- 支持 Promise
- 拦截请求/响应
- 自动转换 JSON 数据
- 客户端支持 XSRF 防御

### get 请求
```js
const axios = require('axios');

// 向给定ID的用户发起请求
axios.get('/user?ID=12345')
  .then(function (response) {})
  .catch(function (error) {})
  .finally(() => alert("END")) // 先触发

// 上述请求也可以按以下方式完成（常用），两者结果是等价的
axios.get('/user', {
    params: { ID: 12345 }
  })
  .then(function (response) {console.log(response);})

// 支持async/await用法
async function getUser() {
  try {
    const response = await axios.get('/user?ID=12345');
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}
```
### Post 请求
```js
axios.post('/user', {
    firstName: 'Fred',
    lastName: 'Flintstone'
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
```
如果需要发起多个并发请求，一般结合 Promise.all 实现
```js
class CreateAxios {
    constructor(url,params) {
        this.url = url
        this.params = params
    }
    requestGet() {
        return Axios.get(this.url,{params:this.params})
    }
}

let get1 = new CreateAxios("/post/data1")
let get2 = new CreateAxios("/post/data2")
let get2 = new CreateAxios("/post/data3")

Promise.all([get1.requestGet(),get2.requestGet(),get3.requestGet()])
    .then(function (results) {
        // ...
    });
```
### axios(config)
除了使用 axios 实例方法外，axios还提供了另外一种解决方案：向 axios 传递相关配置来创建请求，`axios(config)`
```js
// 发起一个post请求
axios({
    method: "post",
    url: "/public/data",
    data: {
        current:1,
        size:10
    }
})

// 在 node.js 用GET请求获取远程图片
axios({
    method: 'get',
    url: 'http://bit.ly/2mTM3nY',
    responseType: 'stream'
})
    .then(function (response) {
        response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
    });
```
具体 config 配置前往[请求配置](https://www.axios-http.cn/docs/req_config)了解。

get请求还有一种极其简单方式：`axios('/docs/user')`即可发送一个 get 请求

### axios.defaults 和 Axios.create

有时候我们项目中的大部分请求都有相同的配置，如请求的协议、主机名、端口号相同，请求头相同，为了避免重复的劳动，我们可以使用 axios.defaults 和 axios.create。

axios.defaults（全局axios默认值） 的使用：
```js
import {axios} from 'axios';

axios.defaults.timeout = 2000;
axios.defaults.headers = {token: 'fsdf778s6g8767xcb'};
axios.defaults.baseURL= 'http://localhost:5000';

axios.get('/public/data',{ // 配置了 axios.defaults，这里的url和config就可以省略一部分内容更加精简
    params:{
        current:1,
        size:10
    }
})
```
axios.create（自定义实例默认值） 的使用：
```js
import {axios} from 'axios';

const GithubAxios= axios.create({
    baseURL: 'https://api.GitHub.com/',
    timeout: 2000,
    headers: {
        'Accept': 'application/vnd.GitHub.v3+json',
    }
})

async function getCounts(username) {
    const response = await GithubAxios.get(`users/${username}`);
    return {
        username,
        name: response.data.name,
        publicReposCount: response.data.public_repos,
        followersCount: response.data.followers
   };
}

getCounts('username').then(
    (res)=>{console.log(res.data)},
    (err)=>{console.error(err)},
)
```

axios.defaults 和 Axios.create的优先级问题？
```js
import axios from "axios"

// 设置全局 axios 超时默认值为2000
axios.defaults.timeout = 2000;

const instance = axios.create();

// 重写库的超时默认值，现在，所有使用此实例的请求都将等待2.5秒，然后才会超时
instance.defaults.timeout = 2500;

// 重写此请求的超时时间，因为该请求需要很长时间
instance.get('/longRequest', {
  timeout: 5000
});
```
配置将会按优先级进行合并。在lib/defaults.js中找到的库默认值 < 实例的 defaults 属性 < 请求的 config 参数。
```js
// 这里的 baseUrl 配置错误，但优先级较低，所以依然可以收到响应
axios.defaults.baseURL = "https://err:5001/"

let MyAxios = axios.create({
  baseURL:"https://reqres.in/",
  timeout:2000,
})

MyAxios.get('api/users',{
  timeout:2000,
  params:{
    page:1
  }
}).then(res=>{
  console.log(res.data)
})
```






### 拦截器


```vue
<script>
import axios from "axios"

export default {
  data(){
    return {
      myRequestInterceptor:null,
      myResponseInterceptor:null
    }
  },
  methods: {
    axiosInit() {
      this.MyAxios = axios.create({
        baseURL:"https://reqres.in/",
        timeout:2000,
      })
    },
    addInterceptor() {
      // 添加请求拦截器
      this.myRequestInterceptor = this.MyAxios.interceptors.request.use(function (config) {
        console.log("准备发送请求",config)
        let newConfig = {...config,params:{page:2}}
        return newConfig;
      }, function (error) {
        // 对请求错误做些什么
        console.log('请求出错')
        return Promise.reject(error);
      });

      // 添加响应拦截器
      this.myResponseInterceptor = this.MyAxios.interceptors.response.use(function (response) {
        console.log("响应成功",response)
        return {data:null};
      }, function (error) {
        // 超出 2xx 范围的状态码都会触发该函数。
        // 对响应错误做点什么
        return Promise.reject(error);
      });
    },
    clearInterceptor() {
      this.MyAxios.interceptors.request.eject(this.myRequestInterceptor);
      this.MyAxios.interceptors.response.eject(this.myResponseInterceptor);
    },
    request() {
      this.MyAxios.get('api/users',{
        timeout:2000,
        params:{
          page:1
        }
      }).then(res=>{
        console.log(res?.data)
      })
    },

  },
  mounted() {
    this.axiosInit()
  }
}
</script>
```