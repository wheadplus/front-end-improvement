  # 前言
  js 中 不同文件之中，需要数据通信的需求。所以 发布订阅模式（eventhub）就应运而生。

  # eventHub 是什么 ?

![evenhub 图解.png](http://ww1.sinaimg.cn/large/8afe7f49gy1g7v7dn1mjmj217u0mgdh5.jpg)

eventHub 就是一个中转站，在不同文件中做周转。
它有三个api ：
- on - 提交事件
- emit - 查询eventhub事件传递参数并执行
- off - 销毁事件的执行函数

# eventHub 实现
## eventhub
声明 class EventHub，其中 cache 用来存储 on 提交的事件 
```js
class EventHub() {
   constructor () {
    this.cache = {}
  }
}
```
## .on
`on` 向 `eventHub`提交事件和执行函数
```js
on (eventName, fn) {
  this.cache[eventName] = this.cache[eventName] || []
  this.cache[eventName].push(fn)
}
```
## .emit
`emit` 向 `eventHub` 查询是否有该函数，传递参数并执行
```js
emit (eventName, args) { 
  (this.cache[eventName] || []).forEach( el => {
    el(args)
  });
}
```
## .off
`off` 向 `eventHub` 销毁事件的执行函数
```js
off (eventName, fn) {
  let index = this.cache[eventName].indexOf(fn)
  this.cache[eventName].splice(index, 1)
}
```
# 优点
- 解决多层文件通信的问题
- 代码量少，相对其他通信中间件,如（vue的vuex）

# 缺点
- 在大项目合作中，存在多次 emit同一个事件的问题。
- 逻辑混乱

# 如何解决这些缺点

vuex 