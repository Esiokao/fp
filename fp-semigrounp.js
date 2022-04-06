import { curry } from './fp-curry.js';
/**
 *
 * Definition of a Semigroup
 * 一個集合(Set)或稱型別(Type)
 * 有 concat method
 * 必須符合 associative
 * @ Type Signature
 * concat:: Semigroup a => a ~> a -> a
 * 若 a 是 Semigroup 且有 concat 這個 method 在內， 則 a -> a 成立
 */
const Sum = val => ({
  val,
  concat: o => Sum(val + o.val),
  inspect: () => `Sum(${val})`,
});

Sum(1).concat(Sum(1)).val; // 2

const Product = val => ({
  val,
  concat: o => Product(val * o.val),
  inspect: () => `Product(${val})`,
});

Product(10).concat(Product(10)).val; // 100

// intersection of array
const Intersection = val => ({
  val,
  concat: ({ val: oVal }) => Intersection(val.filter(x => oVal.some(y => x === y))),
  inspect: () => `Intersection(${JSON.stringify(val)})`,
});

Intersection([1, 2, 3]).concat(Intersection([3, 4, 5])).val; // [3]

// max of array

const Max = val => ({
  val,
  concat: ({ val: oVal }) => Max(val > oVal ? val : oVal),
  inspect: () => `Max(${val})`,
});

// concatAll func

const concatAll = curry((semi, initValue, arr) =>
  arr.map(semi).reduce((acc, cur) => acc.concat(cur), semi(initValue)),
);

// const max = concatAll(Max, Number.NEGATIVE_INFINITY)

// max([1,2,3,4,5])

const max = concatAll(Max, Number.NEGATIVE_INFINITY)
max([1,2,3,4,5,6,7,8,9]).val //9
