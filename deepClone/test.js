const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);

const assert = chai.assert;
const DeepCloner = require("./index");


describe("new DeepCloner().clone()", () => {
    it("是一个类", () => {
        assert.isFunction(DeepCloner)
    })
    it("能复制基础类型",() => {
        let n = 12
        let n2 = new DeepCloner().clone(n)
        assert(n === n2)
        let s = '123'
        let s2 = new DeepCloner().clone(s)
        assert(s === s2)
        let b = true
        let b2 = new DeepCloner().clone(b)
        assert(b === b2)
        let u = undefined
        let u2 = new DeepCloner().clone(u)
        assert(u === u2)
        let empty = null
        let empty2 = new DeepCloner().clone(empty)
        assert(empty === empty2)
        let sym = Symbol()
        let sym2 = new DeepCloner().clone(sym)
        assert(sym === sym2)

    })
    describe("对象", () => {
        it("能够复制普通对象", () => {
            let obj = { name :'jim', child : { name : 'jimmy'}}
            let obj2 = new DeepCloner().clone(obj)
            assert(obj !== obj2)
            assert(obj.name === obj2.name)
            assert(obj.child !== obj2.child)
            assert(obj.child.name === obj2.child.name)
        })
        
        it("能够复制数组对象", () => {
            let obj = [[11,12], [21,22], [31,32]]
            let obj2 = new DeepCloner().clone(obj)
            assert(obj[0] !== obj2[0])
            assert(obj[1] !== obj2[1])
            assert(obj[2] !== obj2[2])
            assert(obj[0][1] === obj2[0][1])
            assert(obj[1][1] === obj2[1][1])
            assert(obj[2][1] === obj2[2][1])
        })
        
        it("能够复制函数", () => {
            let a = function (x,y) {
                    return x+y
                }
            a.xx = {yy: {zz : 11}}
            
            let b = new DeepCloner().clone(a)
            // console.log(a ,"bbb : ",b)
            assert(a.xx !== b.xx)
            assert(a.xx.yy !== b.xx.yy)
            assert(a.xx.yy.zz === b.xx.yy.zz)
            assert(a(1,2) === b(1,2))
        })

        it("能够复制环 ", () => {
            let obj = {
                name: "jim"         
            }
            obj.self = obj
            let obj2 = new DeepCloner().clone(obj)
            assert(obj !== obj2)
            assert(obj.name === obj2.name)
            assert(obj.self !== obj2.self)
        })

        it("跳过原型属性", () => {
            let obj = Object.create({name : 'jim'})
            obj.xx = { yy: { zz: 11 }}
            let obj2 = new DeepCloner().clone(obj)
            assert(obj !== obj2)
            assert.isFalse('name' in obj2) 
            assert(obj.xx !== obj2.xx)
            assert(obj.xx.yy !== obj2.xx.yy)
            assert(obj.xx.yy.zz === obj2.xx.yy.zz)
        })

        it("能够复制正则", () => {
            let obj = new RegExp('/hi/','g')
            obj.xx = { yy: { zz: 11 }}
            let obj2 = new DeepCloner().clone(obj)
            assert(obj.source === obj2.source)
            assert(obj.flags === obj2.flags)
            assert(obj !== obj2)
            assert.isFalse('name' in obj2) 
            assert(obj.xx !== obj2.xx)
            assert(obj.xx.yy !== obj2.xx.yy)
            assert(obj.xx.yy.zz === obj2.xx.yy.zz)
        })

        it('能够复制Date', () => {
            let date  = new Date()
            date.xx = {yy : {zz: 11}}
            let date2 = new DeepCloner().clone(date)
            assert(date !== date2)
            assert(date.getSeconds() === date2.getSeconds())
            assert(date.xx !== date2.xx)
            assert(date.xx.yy !== date2.xx.yy)
            assert(date.xx.yy.zz === date2.xx.yy.zz)
        })
        it("很复杂的对象", () => {
            const a = {
              n: NaN,
              n2: Infinity,
              s: "",
              bool: false,
              null: null,
              u: undefined,
              sym: Symbol(),
              o: {
                n: NaN,
                n2: Infinity,
                s: "",
                bool: false,
                null: null,
                u: undefined,
                sym: Symbol()
              },
              array: [
                {
                  n: NaN,
                  n2: Infinity,
                  s: "",
                  bool: false,
                  null: null,
                  u: undefined,
                  sym: Symbol()
                }
              ]
            };
            const a2 = new DeepCloner().clone(a);
            assert(a !== a2);
            assert.isNaN(a2.n);
            assert(a.n2 === a2.n2);
            assert(a.s === a2.s);
            assert(a.bool === a2.bool);
            assert(a.null === a2.null);
            assert(a.u === a2.u);
            assert(a.sym === a2.sym);
            assert(a.o !== a2.o);
            assert.isNaN(a2.o.n);
            assert(a.o.n2 === a2.o.n2);
            assert(a.o.s === a2.o.s);
            assert(a.o.bool === a2.o.bool);
            assert(a.o.null === a2.o.null);
            assert(a.o.u === a2.o.u);
            assert(a.o.sym === a2.o.sym);
            assert(a.array !== a2.array);
            assert(a.array[0] !== a2.array[0]);
            assert.isNaN(a2.array[0].n);
            assert(a.array[0].n2 === a2.array[0].n2);
            assert(a.array[0].s === a2.array[0].s);
            assert(a.array[0].bool === a2.array[0].bool);
            assert(a.array[0].null === a2.array[0].null);
            assert(a.array[0].u === a2.array[0].u);
            assert(a.array[0].sym === a2.array[0].sym);
          });
     
    })
})