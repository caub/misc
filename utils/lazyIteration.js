function range(si, ei) {
  return ({
    *[Symbol.iterator]() {
      for (let i = si; i < ei; i += 1) yield i;
    },
    *flatMap(fn) {
      for (const o of this) {
        yield* fn(o);
      }
    },
    *map(fn) {
      for (const o of this) {
        yield fn(o);
      }
    }
  })
}

const tripleIt = range(1, 10)
  .flatMap(a => range(a + 1, 10)
    .flatMap(b => range(b + 1, 10)
      .map(c => [a, b, c])));

console.log(
  [...tripleIt]
)
