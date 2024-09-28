type Key = string;
type Value = string;
type Map = { [key: string]: Value | Map };

class MultiMap {
  private map: Map;

  constructor() {
    this.map = {};
  }

  public set(key: Key, value: Value): void {
    const keys = key.split('.');
    let current = this.map;

    for (let i = 0; i < keys.length; i++) {
      const k = keys[i];

      if (!current[k]) {
        current[k] = {};
      }

      if (i === keys.length - 1) {
        current[k] = value;
      } else {
        current = current[k] as Map;
      }
    }
  }

  public get(key: Key): Value | undefined {
    const keys = key.split('.');
    let current = this.map;

    for (let i = 0; i < keys.length; i++) {
      const k = keys[i];

      if (!current[k]) {
        return undefined;
      }

      if (i === keys.length - 1) {
        return current[k] as Value;
      } else {
        current = current[k] as Map;
      }
    }
  }

  public delete(key: Key): boolean {
    const keys = key.split('.');
    let current = this.map;

    for (let i = 0; i < keys.length; i++) {
      const k = keys[i];

      if (!current[k]) {
        return false;
      }

      if (i === keys.length - 1) {
        delete current[k];
        return true;
      } else {
        current = current[k] as Map;
      }
    }

    return false;
  }
}
