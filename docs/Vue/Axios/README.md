# 网络请求模块

需要了解 axios、XMLHttpRequest、fetch 请求

## Axios
Axios 是一个基于 promise 网络请求库，作用于node.js 和浏览器中。在服务端它使用原生 node.js http 模块, 而在客户端（浏览器）则使用 XMLHttpRequests。
因为使用简单,包尺寸小且提供了易于扩展的接口被广泛使用。

[Axios 官方地址](https://www.axios-http.cn/)
[TypeScript 从零实现 axios](https://jonesxie.github.io/ts-axios/chapter1/)

优点:
- 支持 Promise
- 拦截请求/响应
- 自动转换 JSON 数据
- 客户端支持 XSRF 防御

### get 请求
```js
const axios = require('Axios');

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
import {axios} from 'Axios';

axios.defaults.timeout = 2000;
axios.defaults.headers = {token: 'fsdf778s6g8767xcb'};
axios.defaults.baseURL= 'http://localhost:5000';

axios.get('/public/data',{ // 配置了 Axios.defaults，这里的url和config就可以省略一部分内容更加精简
    params:{
        current:1,
        size:10
    }
})
```
axios.create（自定义实例默认值） 的使用：
```js
import {axios} from 'Axios';

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
import axios from "Axios"

// 设置全局 Axios 超时默认值为2000
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
自定义响应拦截和请求拦截
```vue
<script>
import axios from "Axios"

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

### 错误处理
关于响应状态，可以查看[文档](https://www.axios-http.cn/docs/res_schema)
```js
this.MyAxios.get('api/users',{
  timeout:1, // 将响应缩短至1ms,必定会响应超时
  params:{
    page:1
  }
}).then(res=>{
  console.log(res?.data)
}).catch(error=>{
  if (error.response) { // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
  } else if (error.request) { // 请求已经成功发起，但没有收到响应
    console.log(error.request);
  } else { // 其它问题
    console.log('Error', error.message);
    // 补充：toJSON 可以获取更多HTTP错误的信息
    console.log(error.toJSON());
  }
  console.log(error.config);
})
```

### 自定义状态边界
正常来说 [HTTP status](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/status) 在 200 和 300 之间是一个合法值，在这个区间之外则创建一个错误。
有些时候我们想自定义这个规则，比如认为 304 也是一个合法的状态码，所以axios 提供了一个配置，允许我们自定义合法状态码规则：
```js
this.MyAxios.get('https://mocc124.github.io/docs/.html',{
  timeout:1000,
  validateStatus: function (status) {
      return status>=200 && status<=500; // 状态码介于200至500，则promise 状态变为resolve状态，均可以被.then处理
  }
}).then((res)=>{
    console.log(res)
}).catch((err)=>{
    console.error(err)
})
```

### 取消请求
axios提供了两种取消请求的方式：
fetch API 方式（AbortController）和 cancel token API（CancelToken），推荐使用第一种方式，因为cancel token API已经准备遗弃了。
下面只介绍fetch API 方式，了解更多请前往[取消请求文档](https://www.axios-http.cn/docs/cancellation)

一般取消请求应用场景：防止重复提交某个请求（也有其它方式解决这个问题，如debounce），思路如下
- 我们需要对所有正在进行中的请求进行缓存。在请求发起前判断缓存列表中该请求是否正在进行，如果有则取消本次请求。
- 在任意请求完成后，需要在缓存列表中删除该次请求，以便可以重新发送该请求

```js
import axios from "Axios";

// 正在进行中的请求列表
let reqList = []

/**
 * 允许某个请求可以继续进行
 * @param {array} reqList 全部请求列表
 * @param {string} url 请求地址
 */
const allowRequest = function (reqList, url) {
    reqList.splice(reqList.indexOf(url),1)
}

const service = axios.create({
    timeout:2000,
    baseURL:"https://reqres.in/",
});

// 请求拦截器
service.interceptors.request.use(
    config => {
        let cancel // 保存取消请求的函数
        // 设置cancelToken对象
        config.cancelToken = new axios.CancelToken(function executor(c) {
            // executor 函数接收一个 cancel 函数作为参数
            cancel = c;
        })
        let {params,url} = config
        url+="?"
        for (const key in params) {
            url += `${key}=${params[key]}&`
        }

        // 阻止重复请求。当上个请求未完成时，相同的请求不会进行
        const errorMsg = `${url} 请求被中断`
        reqList.includes(url)?cancel(errorMsg): reqList.push(url);
        return config
    },
    err => Promise.reject(err)
)

// 响应拦截器
service.interceptors.response.use(
    response => {
        // 增加延迟，相同请求不得在短时间内重复发送
        setTimeout(() => {
            allowRequest(reqList, response.config.url)
        }, 1000)
        // ...请求成功后的后续操作
        return response
    },
    error => {
        console.log(reqList)
        if (axios.isCancel(error)) { // Axios.isCancel(error)判断是不是取消请求导致的请求失败
            console.log("请求取消: ", error.message);
        } else {
            // 增加延迟，相同请求不得在短时间内重复发送
            setTimeout(() => {
                allowRequest(reqList, error.config.url)
            }, 1000)
        }
        // ...请求失败后的后续操作
        return Promise.reject(error);
    }
)

export  default  service
```

### 更改请求体编码格式
默认情况下，axios 会将 JavaScript 对象序列化为 JSON，也就是以application/json格式编解码。

如果想要使用 application/x-www-form-urlencoded 格式编解码数据，可以使用 [URLSearchParams API](https://developer.mozilla.org/zh-CN/docs/Web/API/URLSearchParams)
也可以使用现在热门的[qs 库](https://github.com/ljharb/qs)，如下：
```js
import qs from 'qs';
const data = { 'bar': 123 };
const options = {
  method: 'POST',
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
  data: qs.stringify(data),
  url,
};
axios(options);
```

Node环境下请参考[官方文档](https://www.axios-http.cn/docs/urlencoded)

参考：[JS URL()和URLSearchParams() API接口详细介绍](https://www.zhangxinxu.com/wordpress/2019/08/js-url-urlsearchparams/?shrink=1)

## 补充：HTTP 中 POST 提交数据的四种方式
HTTP 是如何传输表单数据的。HTTP 是以ASCII 码传输的，建立在TCP/IP 协议之上的应用层规范。
HTTP 请求包括：请求行、请求头、消息主体数据，如下格式：
```
<method> <url> <version>
<headers>
<entity-body>
```

最原始的 form 表单发送请求，常见属性如下：
- action：属性定义发送数据要去的地方，如：www.baidu.com
- method：属性定义如何发送数据，常见的方法有：POST,GET,HEAD,PATCH……
- name：属性定义表单的名字
- enctype：定义表单的数据如何编码。如：POST 中对发送数据的四种编码方式。
- target：提交表单后，在那个页面显示响应内容

```html
<form method="post" enctype="multipart/form-data" name="myForm" action="https://www.baidu.com"> 
  <div>
    <label for="file">选择附件：</label>
    <input type="file" id="file" name="myFile">
  </div>
  <div>
    <button type=“submit”>提交</button>
  </div>
</form>
```
触发 submit 按钮后，浏览器会对表单内容会以 multipart/form-data 编码，采用 POST 的方法向指定主机发送数据。

Content-Type 有4个可选值：
- application/x-www-form-urlencoded （URL encoded，默认，常见的 Ajax 也默认是这种格式）
- multipart/form-data （键值对型数据，多用与客户端向服务端传送大文件数据，如：图片或者文件。）
- application/json （数据将以 JSON 字符串的形式编解码）
- text/xml （xml）

测试以上编码格式，推荐使用[httpbin.org](http://httpbin.org/)





