/**
 * @description compose = f3(f2(f1(x))) -> compose(f3, f2, f1)
 */
import { pipe } from './fp-pipe.js';
import { test } from './test.js';
function reducer(g, f) {
  return x => {
    return g(f(x));
  };
}
// [f1, f2, f3] reduceRight
//      g           f  x  g(f(x))   return
//     f3          f2  x  f3(f2(x))  x => f2(f1(x))
// x => f3(f2(x))  f1  x  f3(f2(f1(x))) x=> f3(f2(f1(x)))
// turns into pipe... ==
function compose(...fns) {
  return x => fns.reduceRight((v, fn) => fn(v), x);
}

export function optimizedCompose(...fs) {
  return fs.reduce(
    (g, f) => x => g(f(x)),
    x => x,
  );
}

const anotherCompose = (...functions) =>
  functions.reduce(
    (acc, fn) =>
      (...args) =>
        acc(fn(...args)),
    x => x,
  );

const add = x => y => x + y;
const substract = x => y => y - x;
const add10 = add(10);
const sub50 = substract(50);

test('origin compose', () => {
  console.log(compose(add10, sub50)(100));
});

test('optimized compose', () => {
  console.log(optimizedCompose(add10, sub50, add10)(100));
});

const comma = str => str + ',';
const questuionMark = str => str + '?';

const str = 'test';
test('anotherCompose', () => {
  console.log(compose(comma, questuionMark)(str));
});

test('opt', () => {
  console.log(optimizedCompose(comma, questuionMark)(str));
});

test('pipe', () => {
  console.log(pipe(comma, questuionMark)(str));
});
