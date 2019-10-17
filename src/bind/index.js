

module.exports = _bind


if(!Function.prototype.bind) {
  Function.prototype.bind = bind
}

var slice = Array.prototype.slice
function _bind(asThis) {
  var fn = this
  var args =slice.call(arguments,1)
  if(typeof fn !== 'function') {
    throw new Error("bind 必须在函数上调用")
  }
  function resultFn() {
    var args2 = slice.call(arguments,0)
    return fn.apply(resultFn.prototype.isPrototypeOf(this) ? this :
     asThis, args.concat(args2))
  }
  resultFn.prototype = fn.prototype
  return resultFn

}

function bind(asThis, ...args) {
  // this  调用bind的函数
  let fn = this
  
  function resultFn(...args2) {
    return fn.call(this instanceof resultFn ? this: asThis, ...args,...args2)
  }
  resultFn.prototype = fn.prototype
  return resultFn
}