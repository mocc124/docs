# 互联网

推荐资源:
[30 张图解 HTTP](https://mubu.com/doc/4n-ehUovcCP#m)
[Cookie、Session、Token、JWT](https://mubu.com/doc/12i79Sq9hmP)
[RSA初探，聊聊怎么破解HTTPS](https://juejin.cn/post/6844904087205445640)
[github 160k HTTP](https://github.com/CyC2018/CS-Notes/blob/master/notes/HTTP.md)
[网络协议](https://github.com/AnsonZnl/v-blog/blob/master/docs/computer-base/%E7%BD%91%E7%BB%9C%E5%8D%8F%E8%AE%AE.md)

## Review
需要掌握的以下问题：
### internet
1. 什么是互联网？[MDN 互联网是如何工作的](https://developer.mozilla.org/zh-CN/docs/Learn/Common_questions/How_does_the_Internet_work)

  互联网（Internet）是网络基础，互联网把电脑互相连接起来，由无数的局域网通过与 ISP（互联网服务提供商）接入，每台终端网络消息可以被 ISP 捕获并发送到相应的网络，互联网就是由这些所有的网络设施所组成。

2. 请简单介绍一下HTTP。[MDN HTTP 概述](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Overview)

  http是一种基于 tcp/ip 通信协议进行文本传输的protocol(通讯协议)，定义了数据在客户端内和服务端之间进行交换的规则。
  http协议工作位于BS架构上。浏览器作为http的客户端通过url（web统一地址）向Web服务器（http服务端）发送请求。当 web 收到 request 后，就会向客户端发送 response（响应信息）。
  
  特点：
  - 灵活（支持传输任何类型数据，通过content-type标记）、
  - 无状态（http协议已处理的事务没有记忆）、
  - 无连接（每次连接只会处理一个请求）（这里的无连接可以理解为应用层的无连接，tcp的面向连接为传输层。所以才会有长连接和短连接之分，这里的分别也是在tcp连接里才会成立）
  - 简单快速（发送请求时只需要发送请求方法和路径）

  通信步骤：
  - 客户端连接到服务器（http端口（80）建立一个socket连接。https端口（443）在http之上应用了安全套接子层（ssl））
  - 发送http请求（报文）（请求行、空行，请求头部，请求实体）
  - web服务器解析请求，返回响应（报文）（响应头部，状态行，空行，响应实体）
  - 断开tcp连接
  - 客户端解析响应报文

  注意：一个tcp里是支持多个http的（但是只能一对一响应）。处理完一个http后tcp连接不会断开（长连接是tcp建立连接后不断开，持续为不同http建立连接）。
  - HTTP1.0默认是不支持持久连接的，所以它的连接都是串行，那么自然他的最大连接数相对来说可以比较多。
  - HTTP1.1 或HTTP2.0 默认是持久连接。（TCP连接复用）
  - HTTP2.0是可以在一个TCP连接里走多个并行HTTP请求。

3. 常用的HTTP协议位于TCP/IP的哪一层？

应用层


4. 在HTTP协议中，总共有5类状态码，请简单介绍一下这5类状态码。[MDN HTTP 响应状态码](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status)

为什么说HTTP不安全？
HTTPS有哪些缺点？
HTTP/1.1有哪些不足？
HTTP/2.0比HTTP/1.1优秀许多，为什么没有马上取代它？
HTTP应答中的500错误是指什么？
什么是OSI参考模型？

HTTP请求报文有5部分组成，是哪5部分？
HTTP协议中的请求首部有哪些？[MDN HTTP 标头（header）](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers)
HTTP/2.0的新特性有哪些？

HTTP协议中可用的请求方法有哪些？[MDN HTTP 请求方法](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods)、[W3C html请求方法](https://www.w3school.com.cn/tags/html_ref_httpmethods.asp)

请简单介绍一下网络中的协议。
什么是计算机网络。[Internet](https://developer.mozilla.org/zh-CN/docs/Glossary/Internet)
请谈谈你对TCP/IP的理解。
什么是MAC地址？
什么是IP地址？[MDN IP地址](https://developer.mozilla.org/zh-CN/docs/Glossary/IP_Address)

请简单介绍一下Web缓存机制，具体过程有哪几步。[HTTP缓存策略](https://juejin.cn/post/6908540505115033614)
URL有哪些组成部分？
在浏览器中，一个页面从输入URL到加载完成，都有哪些步骤？
请求方法GET和POST的区别有哪些？[99%的人都理解错了HTTP中GET与POST的区别](https://mp.weixin.qq.com/s?__biz=MzI3NzIzMzg3Mw==&mid=100000054&idx=1&sn=71f6c214f3833d9ca20b9f7dcd9d33e4#rd)
请简单介绍一下REST。
什么是RESTful API？如何设计RESTful API？
请描述一下TCP三次握手的过程。[TCP协议的三次握手和四次分手](https://github.com/jawil/blog/issues/14)
TCP协议为什么采用三次握手，而不是二次握手？
请描述一下TCP四次挥手的过程。
TCP协议有哪些重传机制？
请谈谈你对UDP协议的理解。


二进制分帧层是HTTP/2.0性能增强的关键，它是如何增强性能的？
TCP中的队首阻塞是怎么回事？

CDN是什么？
请介绍下HTTP中的Cache-Control首部。
当用一台机器作为网络客户端时，该机器最多可以保存多少个到服务端的连接？
一个广域网和一个局域网相连，需要什么设备？
什么是路由选择？
在用浏览器打开一个网页的过程中，浏览器会使用的网络协议包括哪些？
TCP能准确可靠地从源设备到目的地设备传输数据，靠的是什么？
什么情况会造成流量劫持？

什么是RARP协议？
实现防火墙的主流技术是什么？
数字签名和加密的区别是什么？
对称加密算法有哪些？
某主机的IP地址为202.117.131.12/20，其子网掩码是多少？
对于IP地址130.63.160.2，掩码为255.255.255.0，子网号为多少？
某网络的IP地址空间为192.168.5.0/24，采用定长子网划分，子网掩码为255.255.255.248，则该网络的最大子网个数、每个子网内最大可分配地址个数各为多少？
IPv6地址占几个字节？
网络安全控制技术有哪些？
IP地址200.5.6.4属于哪一类地址？
可以显示源机器与目标机器之间的路由数量，以及各路由之间的RTT的是哪个命令？
什么是弱网？弱网测试的目的是什么？

DNS的作用有哪些？
什么是运营商劫持？有什么办法预防？
简要介绍一下Socket通信协议。
什么是正向代理？什么是反向代理？
端口号的作用是什么？
请谈谈你对no-store和no-cache的理解。
强缓存和协商缓存是指什么？
当一个网站突然不能访问时，你能想到哪些原因？
负载均衡的原理是什么？
CDN原理是什么？
DNS查询过程是怎么样的？
## 