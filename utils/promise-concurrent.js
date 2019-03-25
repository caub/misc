/**
 * 
 * @param {array<() => Promise>} thunks 
 * @param {number?} n 
 */
async function concurrent(thunks, n = Infinity) {
  const finished = Symbol();
  let promises = thunks.slice(0, n).map(thunk => thunk()), others = thunks.slice(n);
  while (promises.length) {
    await Promise.race(promises.map(promise => promise.then(() => { promise[finished] = true; })));
    promises = promises.filter(promise => !promise[finished]);
    const nResolved = n - promises.length;
    promises.push(...others.slice(0, nResolved).map(thunk => thunk()));
    others = others.slice(nResolved);
  }
}

const delay = t => new Promise(r => setTimeout(r, t));
(async () => {
  console.time(1); await concurrent([500, 3000, 800, 2000, 1500].map(t => () => delay(t)), 2); console.timeEnd(1)
  // 1: 4501.019775390625ms
})()
