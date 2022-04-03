export function flat(o, p=[]){
  return Object.fromEntries(
    Object.entries(o).flatMap(([k, v]) => typeof v=='string' ? [[[...p, k].join('.'),v]] : Object.entries(flat(v, [...p, k])))
  );
}

export function unflat(o){
  return Object.entries(o).reduce((a, [k, v]) => {
    const ks = k.split('.');
    return {
      ...a,
      [ks[0]]: ks.length > 1 ? unflat({ ...a[ks[0]], [ks.slice(1).join('.')]: v }) : v
    };
  },{});
}
