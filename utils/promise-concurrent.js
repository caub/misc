const all = async (xs, f, n=Infinity) => {
  const chunks = Array.from({length: Math.ceil(xs.length/n)||1}, (_,i)=>xs.slice(i*n, (i+1)*n));
  for (const chunk of chunks) await Promise.all(chunk.map(f));
}
var delay=t=>new Promise(r=>setTimeout(r,t))
console.time(1); await all([500,3000,800,2000,1500], delay, 2); console.timeEnd(1)
// 1: 6501.330078125ms


const findTruthyIndexes = (arr, n=Infinity) => { const a=[]; for (let i=0;i<arr.length && a.length<n;i++){ if (arr[i]) a.push(i); }; return a };
const concurrent=async (xs, f, n=Infinity) => {
  const rs = xs.map(() => true);
  let a = xs.slice(0, n);
  while (a.length) {
    await Promise.race(a.map(i => f(xs[i]).then(() => {rs[i] = false;})));
    a = findTruthyIndexes(rs);
    }
};
console.time(1); await concurrent([500,3000,800,2000,1500], delay, 2); console.timeEnd(1)
// 1: 5805.26513671875ms
