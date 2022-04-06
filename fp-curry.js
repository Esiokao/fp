// const curry = (fn) => (...args) => args.length < fn.length ? curry(fn).bind(null, ...args) : fn.call(null, ...args)

// const add = (x,y) => x + y

// const _add = curry(add)

// console.log(_add(1,2))
// console.log(_add(1,2))

// function curry(fn, arity = fn.length) {
//   var args = []
//   console.log(fn, arity)
//   return function curried(nextArg) {
//       args = [...args, nextArg]
//       if(args.length >= arity) {
//           console.log(args, args.length)
//           return fn(...args)
//       } else {
//           return curried
//       }
//   }    
// }

export function curry(fn) {
  return function curried(...args){
    return args.length < fn.length ? curried.bind(null, ...args) : fn.call(null,...args)
  }
}

// _add(1)(2)(3)