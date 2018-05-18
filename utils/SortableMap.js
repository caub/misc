export default class SortableMap {
  constructor(data) {
    this.m = new Map(Array.isArray(data) || data instanceof Map
      ? data
      : data instanceof SortableMap
        ? [...data]
        : Object.entries(data)
    );
  }
  set(k, v) { // return SortableMap
    this.m.set(k, v);
    return new SortableMap(this.m);
  }
  delete(k) { // return SortableMap
    this.m.delete(k, v);
    return new SortableMap(this.m);
  }
  get(k) {
    return this.m.get(k);
  }
  forEach(fn) {
    this.m.forEach(fn);
  }
  filter(fn) {
    const a = [...this.m].filter(entry => fn(entry[1]));
    return new SortableMap(a);
  }
  map(fn) { // return Array
    return Array.from(this.m.values(), fn);
  }
  sort(fn) { // return SortableMap
    const a = [...this.m].sort((x, y) => fn(x[1], y[1])); // sort with values
    return new SortableMap(a);
  }
  reverse() { // return SortableMap
    return new SortableMap([...this.m].reverse());
  }
  every(fn) {
    return [...this.m.values()].every(fn);
  }
  some(fn) {
    return [...this.m.values()].some(fn);
  }
  get size() {
    return this.m.size;
  }
  entries() {
    return this.m.entries();
  }
  values() {
    return this.m.values();
  }
  keys() {
    return this.m.keys();
  }
  toJSON() {
    return [...this.m.values()];
  }
  *[Symbol.iterator]() {
    yield* this.m;
  }
}
