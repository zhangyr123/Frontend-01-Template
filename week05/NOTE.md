# 每周总结可以写在这里
### 结构化程序设计
JS Context=》Realm<br>
宏任务<br>
微任务<br>
函数调用(Execution Context)<br>
语句/声明<br>
表达式<br>
直接量/变量/this。。。<br>

#### Realm 
对象。。。



#### 问题
什么是realm
realm互相通讯是什么
可视化？

上下文栈

### 浏览器工作原理
1. url敲了回车之后发生了什么<br>
1） http请求，拿到html代码，parse dom树，css compute，css规则应用上去，layout排版，dom树所有的位置确定，根据background等得到一个完整的dom树，渲染，得到bid map（图片），显示在网页。<br>
3）合成等<br>
2）排版：流排版，正常流，float，flex，grid<br>
2. 目标：理解浏览器工作的流程
3. node的http怎么实现
1)http server
2)http client
4. [http标准](https://tools.ietf.org/html/rfc2616)
5. request method:get,post,put,delete,options,connect,head,trace
6. 调试node环境时，应先开启服务端，再开启客户端
7. http协议是文本协议