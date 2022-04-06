/**
 * map
 */

function map(fn, functor) {
  // Ramda: base on curry(2) and (arguments[arguments.length - 1])'s type
  // to return transducer of do the map function

}

function _map(fn, functor) {
  var idx = 0;
  var len = functor.length;
  var result = Array(len);
  while (idx < len) {
    result[idx] = fn(functor[idx]);
    idx += 1;
  }
  return result;
}

function f() {
  return arguments.length
}

