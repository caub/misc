// quick-sort impls

// from left
var qsL = (arr, l = 0, r = arr.length - 1) => {
  if (l >= r) return arr;
  const pivot = arr[r];
  let k = l; // will be pivot index
  for (let i = l; i <= r; i++) {
    if (arr[i] <= pivot) {
      [arr[k], arr[i]] = [arr[i], arr[k]];
      k++;
    }
  }
  qsL(arr, l, k - 2);
  qsL(arr, k, r);
  return arr;
}

// faster one, from right
var qsR = (arr, l = 0, r = arr.length - 1) => {
  if (l >= r) return arr;
  let i = l;
  let k = r; // pivot index
  for (; i < k;) {
    if (arr[i] > arr[k]) { // if bigger than pivot, move to right of the k
      [arr[i], arr[k - 1], arr[k]] = [arr[k - 1], arr[k], arr[i]];
      k--;
    } else {
      i++;
    }
  }
  qsR(arr, l, k - 1);
  qsR(arr, k + 1, r);
  return arr;
}
console.log(qsL([1, 2, 5, 4, -1, -2, 3]))
console.log(qsR([1, 2, 5, 4, -1, -2, 3]))


// benching
const data = Array.from({length: 1e4}, () => 
  Array.from({length: 35 * Math.random()}, () => 256*Math.random())
);

const right =  () => {
  data.forEach(a => {
    const sortd = qsR(a);
  })
};
const left =  () => {
  data.forEach(a => {
    const sortd = qsL(a);
  })
};


bench(left)
bench(left)
bench(left)
bench(left)
bench(right)
bench(right)
bench(right)
bench(right)


function bench(fn, name=fn.name) {
  console.time(name);
  fn();
  console.timeEnd(name);
}