const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);

const assert = chai.assert;
const bind = require("./index");


describe("bind", () => {
  it("fn.bind 能用", () => {
    Function.prototype.bind2 = bind
    assert(Function.prototype.bind2 !== undefined)
  })

  it('this 绑定成功', () => {
    Function.prototype.bind2 = bind
    let fn1 = function () {return this}
    let newFn1 = fn1.bind2({name: 'jim'})
    assert(newFn1().name === 'jim')

  })  

  it('this , p1,p2 绑定成功', () => {
    Function.prototype.bind2 = bind
    let fn1 = function (p1,p2) {
      return [this,p1,p2]
    }
    let newFn1 = fn1.bind2({name: 'jim'},"123",123)
    assert(newFn1()[0].name === 'jim')
    assert(newFn1()[1] === '123')
    assert(newFn1()[2] === 123)
  })

  it("this, p1 绑定成 ，后传 p2 调用成功", () => {
    Function.prototype.bind2 = bind
    let fn1 = function (p1,p2) {
      return [this,p1,p2]
    }
    let newFn1 = fn1.bind2({name: 'jim'},"123")
    assert(newFn1(123)[0].name === 'jim')
    assert(newFn1(123)[1] === '123')
    assert(newFn1(123)[2] === 123)
  })

  it("new 的时候绑定了 p1, p2", () => {
    Function.prototype.bind2 = bind
    const fn = function(p1, p2) {
      this.p1 = p1
      this.p2 = p2
    }
    const fn2 =fn.bind2(undefined, 'x', 'y')
    const object = new fn2()
    assert(object.p1 === 'x', 'x')
    assert(object.p2 === 'y', 'y')
  })

  it("new 的时候绑定了 p1,p2, 并且 fn 有 prototype.sayHi", () => {
    Function.prototype.bind2 = bind
    let fn = function(p1, p2) {
      this.p1 = p1
      this.p2 = p2
    }
    fn.prototype.sayHi = function() {}
    const fn2 =fn.bind2(undefined, 'x', 'y')
    const object = new fn2()
    assert(object.p1 === 'x', 'x')
    assert(object.p2 === 'y', 'y')
    assert(fn.prototype.isPrototypeOf(object));
    assert.isFunction(object.sayHi)
  })

  it("不用 new 但是用类似的对象", () => {
    Function.prototype.bind2 = bind;
  const fn = function(p1, p2) {
    this.p1 = p1;
    this.p2 = p2;
  };
  fn.prototype.sayHi = function() {};
  const object1 = new fn("a", "b");
  const fn2 = fn.bind2(object1, "x", "y");
  const object = fn2(); // 没有new
  // console.log(object1,'-----',object)
  assert(object === undefined);
  assert(object1.p1 === "x", "x");
  assert(object1.p2 === "y", "y");
  })
})  