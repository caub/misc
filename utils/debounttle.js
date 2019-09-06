const {performance} = typeof window!=='undefined' ? window : require('perf_hooks');

// dttle:|  |
// dboun:|   |
// evts: | ||| | |     ||       ||||
// debtt:   |  |     |      |      |

const debounttle = (fn, throttleMs = 500, debounceMs = throttleMs) => {
  // if (debounceMs > throttleMs) throw new Error(`debounceMs ${debounceMs} must be higher or equal to throttleMs ${throttleMs}`);
  let d, timeout;
  return (...a) => {
    let _d = Date.now();
    if (!d) d=_d;
    if (_d - d > throttleMs) {
      if (timeout) clearTimeout(timeout);
      fn(...a, 't');
      d = undefined;
    } else {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        fn(...a, 'd');
        d = undefined;
      }, debounceMs);
    }
  };
}


const delay = (t, x) => new Promise(r => setTimeout(r, t, x));

const times = [0, 10, 30, 40, 50, 60, 80, 99, 100, 101, 120, 140, 160, 180, 200, 230, 410, 445, 800, 810, 820, 840];


console.time(1);
const fn = (...a) => console.timeLog(1, 'woop', ...a);

const fn_ = debounttle(fn, 100, 40);

let i=0;

const t0 = performance.now();

async function eventLoopTest() {
  const t = performance.now() - t0;

  if (t > times[i]) {
    // console.log(t);
    fn_(i, t);
    i++;
    if (i>=times.length) return; // stop
  }

  setImmediate(eventLoopTest);
}


eventLoopTest();
