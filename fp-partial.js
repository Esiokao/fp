function partialFromBind(fn, ...args) {
  log(fn);
  log(args);
  return fn.bind(null, ...args);
}

function partial(fn, ...args) {
  return (...otherArgs) => {
    log(fn);
    log(args);
    fn(...args, ...otherArgs);
  };
}

function add(x, y, z) {
  return x + y + z;
}

function log(message) {
  console.log(message);
}

const add10 = partialFromBind(add, 10);
const add30 = partialFromBind(add10, 20);
log(add30(50));
