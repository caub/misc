export function flat(o, p=[]){
  return Object.fromEntries(
    Object.entries(nestedObj).flatMap(([k, v]) => {
      if (v && typeof v === 'object') {
        const subObj = flat(v, [...p, k]);
        return Object.entries(subObj);
      }
      return [[[...p, k].join(sep), v]];
    })
  );
}

export function unflat(o){
    // -- using lodash
//   const o = {};
//   for (const [k, v] of Object.entries(flatObj)) {
//     _.set(o, k.replaceAll(sep, '.'), v);
//   }
//   return o;
  return Object.entries(o).reduce((a, [k, v]) => {
    const ks = k.split('.');
    return {
      ...a,
      [ks[0]]: ks.length > 1 ? unflat({ ...a[ks[0]], [ks.slice(1).join('.')]: v }) : v
    };
  },{});
}
