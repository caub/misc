class Store {
  change = new EventType;
  data = new Map();

  get(key) {
    return this.data.get(key);
  }

  set(key, value) {
    this.data.set(key, value);
    this.change.emit(this.data);
  }

  use(selector, deps = undefined) {
    const [, forceUpdate] = React.useReducer(c => c + 1, 0);
    const ref = React.useRef(selector(this));
    this.change.use(() => {
      const next = selector(this);
      if (next !== ref.current) {
        ref.current = next;
        forceUpdate();
      }
    }, deps ?? [selector]);

    return selector(this);
  }
}

class EventType {
  listeners = new Set();

  emit(data) {
    this.listeners.forEach(listener => {
      listener(data);
    });
  }

  on(handler) {
    const listener = data => handler(data);

    this.listeners.add(listener);

    return () => this.listeners.delete(listener);
  }

  use(handler, deps = undefined) {
    React.useEffect(() => this.on(handler), deps || [handler])
  }
}