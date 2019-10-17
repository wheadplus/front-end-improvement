class EventHub {
  constructor () {
    this.cache = {}
  }
  on (eventName, fn) {
    this.cache[eventName] = this.cache[eventName] || []
    this.cache[eventName].push(fn)
  }
  emit (eventName, args) { 
    (this.cache[eventName] || []).forEach( el => {
      el(args)
    });
  }

  off (eventName, fn) {
    let index = this.cache[eventName].indexOf(fn)
    this.cache[eventName].splice(index, 1)
  }
}

module.exports = EventHub

