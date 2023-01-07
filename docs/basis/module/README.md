# JS module

学习 js module 推荐前往[javaScript module](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Modules)

## 你需要了解一下内容

1. .js 与.mjs 的区别和兼容性支持
2. TypeScript 不支持.mjs
3. 为了使模块可以正常工作，需要确保服务器可以正常处理 Content-Type 头，应该包含 JavaScript 的 MIME 类型 text/javascript
4. `<script type="module">` 属性指示引入的模块
5. 因为 js moudle 的安全性需要，若需要在本地测试 js module，则需要通过本地 web 服务器去运行。否则会报 CORS 错误。
6. 使用 export 或 export {} 导出，注意，不能在函数内使用 export
7. 导入语句: import {} from ''
8. 在一些模块系统中你可以忽略文件扩展名（比如 '/model/squre'）。这在原生 JavaScript 模块系统中不工作。
9. 模块会自动使用严格模式，所以可能会从模块内部定义的脚本部分获得与标准脚本中不同的行为。
10. 加载一个模块脚本时不需要使用 defer 属性，模块也会自动延迟加载。
11. 模块功能导入到单独的脚本文件无法在全局获得，因此，只能在导入这些功能的脚本文件中使用，也无法通过 JavaScript console 中获取到他们。
12. 每个模块只允许有一个 export default 默认导出，
13. 避免命名冲突：使用 as newName 重命名导出和导入
14. 如果模块过多，我们可以使用模块对象，如：`import * as Module from '/modules/module.mjs'`,这样更加简洁
15. 避免命名冲突的另一种方法是将方法、属性封装为类并导出它
16. 提供了合并模块功能，如`export * from ''`，这一句的意思是：我导入模块后，重新导出所有模块。
17. import('url') 返回 Promise 对象，这样动态加载模块可以有效优化性能，
18. .mjs 是一个相当新的文件后缀，.mjs 后缀的文件需要以 MIME-type 为 javascript/esm 来加载，你需要知道 macOS 会悄悄地在 .mjs 后缀的文件后面添加 .js 达到隐藏后缀的效果。
