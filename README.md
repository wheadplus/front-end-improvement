
## 深拷贝
简单的深拷贝可以使用`JSON`编译再反编译实现
```js
var obj = { name: 'jim'}
var obj2 = JSON.parse(JSON.stringify(obj))
```
### 缺点
由于 `JSON`不支持 
- undefined
- funciton
- Date
- RegExp
- 环对象(即 obj.self = obj)

### 深拷贝实现
实现的深拷贝需要满足以下要求
- 复制基础类型（String, Number,Bolean,Undefined, Null, Symbol）
- 复制普通对象
- 复制数组对象
- 复制函数
- 复制正则
- 复制Date
- 过滤原型属性
- 复制环

具体逻辑参考 [./deepClone/index.js](https://github.com/wheadplus/front-end-improvement/blob/master/deepClone/index.js)
执行测试代码
```
yarn test-clone
```