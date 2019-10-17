const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);

const assert = chai.assert;
const Eventhub = require("./index");

describe("eventHub ", () => {

  it('能够创建对象', () => {
    let eventHub = new Eventhub()
    assert.isObject(eventHub)
  })
  it(".on 了之后 .emit,会触发 .on 的函数", () => {
    let eventHub = new Eventhub()
    let called = false
    eventHub.on('xxx', x => {
      called = true
      assert(x[0] === '今天晚上吃米饭')
      assert(x[1] === '加上酱油真的香')
    })
    eventHub.emit('xxx',["今天晚上吃米饭",'加上酱油真的香'])
    assert.isTrue(called)
  })


  it("off 能取消触发.emit触发的函数" , () => {
    let eventHub = new Eventhub()
    let called = false
    let fn = () => {
      called = true
    }
    eventHub.on('xxx',fn)
    eventHub.off('xxx',fn)
    eventHub.emit('xxx')
    assert.isFalse(called)
  })
})