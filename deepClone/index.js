class DeepCloner {
  constructor() {
    this.cache = []
  }
  clone(source) {
    if (source instanceof Object) {
      let distCache = this.findCache(source)
      if (distCache) {
        return distCache
      } else {
        let dist
        if (source instanceof Array) {
          dist = new Array()
        } else if (source instanceof Function) {
          dist = function () {
            // arguments 函数参数 ，使用call的话，  ...arguments
            return source.apply(this, arguments)
          }
        } else if(source instanceof RegExp) {
          //.source .flag 为正则的属性 
          dist = new RegExp(source.source, source.flags)
        } else if(source instanceof Date) {
          dist = new Date(source)
        }else {
          dist = new Object()
        }
        this.cache.push([source, dist]) //push [source, dist] 是为了findCache()比较，
        for (let key in source) {
          if (source.hasOwnProperty(key)) {
            dist[key] = this.clone(source[key])
          }
        }
        return dist
      }
    }
    return source
  }

  findCache(source) {
    for (let i = 0; i < this.cache.length; i++) {
      if (this.cache[i][0] === source) {
        return this.cache[i][1]
      }
    }
    return undefined
  }
}




module.exports = DeepCloner