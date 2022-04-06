// function pipe(...fns) {
//   return function piped(x) {
//     return fns.reduce((v, fn) => fn(v), x);
//   };
// }

export function pipe(f, ...fs) {
  if (fs.length < 1) {
    return f;
  } // No tail? Return the function

  // Return a function that takes arguments
  // applies `f` to them, then passes that result
  // the the function returned from calling pipe
  // again on the remaining functions
  return (...args) => pipe(...fs)(f(...args));
}

export function optimizedPipe(...fs) {
  return fs.reduceRight(
    (g, f) =>
      (...args) =>
        g(f(...args)),
    x => x,
  );
}
