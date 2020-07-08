# toy-reactive（模拟vue3.0中用proxy和Reflect实现对数据响应式）
### vue2.0与vue3.0数据响应式的区别
1. vue2.0使用Object.defineProperty监听数据，vue3.0使用proxy和Reflect实现观察者模式监听数据（惰性监听）。
2. vue3.0之后，开发者可以选择性的生成可观察对象。这样的好处是提高了实例初始化速度，降低了运行内存的使用。
### reactive和effect

### [proxy的学习（这里只做简单介绍）](https://es6.ruanyifeng.com/#docs/proxy)<br>
````
let target = {
    a: 1,
    b: 2
}

let handler = {
    construct() {
        return ...;
    },
    get() {
        return ...;
    },
    set() {
        return ...;
    }
    ....
}

let p = new Proxy(target, handler)
````
1. proxy：拦截器，可操作数据
2. target：源数据
3. handler: 调用钩子函数对源数据在不同的阶段做出操作<br>

例子：<br>
````
let target = {
    a: 1
}
let handler = {
    get(obj, prop, receiver) {
        console.log(obj, prop, receiver)
        return obj[prop]
    }, 
    set(obj, prop, value, receiver) {
        console.log(obj, prop, value, receiver)
        return obj[prop] = value
    }
}
let p = new Proxy(target, handler)
````
### 要实现的功能
1. 数据监听<br>
2. 数据深度监听<br>
3. 数据新增或删除<br>
4. 数组<br>
