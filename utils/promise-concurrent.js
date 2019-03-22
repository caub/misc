async function concurrent(xs, f, n=Infinity) {
  const finished = Symbol();
  let promises = xs.slice(0, n).map(f), others = xs.slice(n);
  while (promises.length) {
    await Promise.race(promises.map(promise => promise.then(() => { promise[finished] = true; })));
    promises = promises.filter(promise => !promise[finished]);
    const nResolved = n - promises.length;
    promises.push(...others.slice(0, nResolved).map(f));
    others = others.slice(nResolved);
  }
};
var delay = t => new Promise(r=>setTimeout(r, t));
(async()=>{
console.time(1); await concurrent([500,3000,800,2000,1500], delay, 2); console.timeEnd(1)
// 1: 4501.019775390625ms
})()