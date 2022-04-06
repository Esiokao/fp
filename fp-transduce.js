import { test } from './test.js';
import { optimizedCompose } from './fp-compose.js';
function createCat(name, age, breed, color) {
  return {
    name,
    age,
    breed,
    color,
  };
}

const cats = [
  createCat('QQ', 3, 'Persian', 'white'),
  createCat('錢錢', 8, 'Mix', 'white'),
  createCat('Molly', 5, 'Mix', 'tiger'),
];

// implement map with reduce
const map = (transformer, arr) => arr.reduce((accu, curr) => [...accu, transformer(curr)], []);
// implement filter with reduce
const filter = (predicator, arr) =>
  arr.reduce((accu, curr) => (predicator(curr) ? [...accu, curr] : accu), []);

// arr.reduce((acc, cur /* reducer */) => map(transfromer)(reducer), [])
function propEq(prop, value) {
  return obj => obj[prop] === value;
}

function getProp(prop) {
  return obj => obj[prop];
}

function addNotation(notation) {
  return str => str + notation;
}

const isWhite = propEq('color', 'white');

const getName = getProp('name');

const addComma = addNotation(',');

test('Vjs', () => {
  const result = cats.filter(isWhite).map(getName);
  return result;
});

test('reduce', () => {
  const result = map(getName, filter(isWhite, cats));
  return result;
});

/** */
// abstraction the arr logic outside of the mainly logic
// arr.reduce((acc, cur) => map(transformer)(acc, val))
const map2 = transformer => (accu, curr) => [...accu, transformer(curr)];

const filter2 = predicator => (accu, curr) => predicator(curr) ? [...accu, curr] : accu;

test('abstract the arr logic', () => {
  const result = cats
    .reduce(filter2(isWhite), []) // eq (reducer) => map2(transformer)(reducer)
    .reduce(map2(getName), []); // eq (reducer) => filter2(predicator)(reducer))
  return result;
});

/** */
// abstraction the reducer logic
// transformer -> reducer -> transformed reducer
const map3 = transformer => reducer => (accu, curr) => reducer(accu, transformer(curr));
const filter3 = predicator => reducer => (accu, curr) =>
  predicator(curr) ? reducer(accu, curr) : accu;

const arrReducer = (accu, curr) => [...accu, curr];

const strReducer = (accu, curr) => accu + curr;

test('abstract the reducer', () => {
  const transducer = filter3(isWhite)(map3(getName)(arrReducer));
  // const map3 = transformer => reducer => (accu, curr) => reducer(accu, transformer(curr));
  // (accu, curr) => arrReducer(accu, getName(curr)) eq arrReducer(accu, getName(curr))(accu, curr)
  // const filter3 = predicator => reducer => (accu, curr) => predicator(curr) ? reducer(accu, curr) : accu;
  // const filter3 = isWhite => (accu, curr) => arrReducer(accu, getName(curr)) => (accu, curr) => (accu, curr) => arrReducer(accu, getName(curr))(accu, curr) => predicator(curr) ? reducer(accu, curr) : accu
  const result = cats.reduce(transducer, []);
  return result;
});

test('strReducer', () => {
  // last arg = (accu, curr) => strReducer(accu, addQuestionMark(curr))  // Algebra with nextReducer
  const transducer = map3(getName)(map3(addComma)(strReducer)); // transducer = (accu, curr) => nextReducer(accu, getName(curr))
  const result = cats.reduce(transducer, '');
  // 1. accu, curr = '', obj1
  // (accu, curr) => nextReducer(accu, getName(curr)) // eq nextReducer(accu, getName(curr))('', obj1) eq nextReducer('', getName(obj1))
  // inside nextReducer, strReducer(accu, addQuestionMark(curr))('', getName(obj1)) eq strReducer('', addQusetionMark(getName(obj1)))
  // 2. accu, curr = strReducer('', addQusetionMark(getName(obj1))), obj2 ...
  return result;
});

/** */
// absctraction of the transducer
// const transducer = filter3(isWhite)(map3(getName)(arrReducer))
// const isWhiteReducer = filter3(isWhite)
// const getNameReducer = map3(getName)
// const transducer = isWhiteReducer(getNameReducer(arrReducer)) eq g(f(x))

const transduce = (transducer, reducer, initalValue, array) =>
  array.reduce(transducer(reducer), initalValue);

const isWhiteReducer = filter3(isWhite);
const getNameReducer = map3(getName);
const isWhiteThenGetNameReducer = optimizedCompose(isWhiteReducer, getNameReducer);

test('absctraction of the transducer', () => {
  return transduce(isWhiteThenGetNameReducer, arrReducer, [], cats);
});
