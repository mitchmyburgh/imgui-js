// https://bit.ly/2KsZkSO

// some extensions to Array to facilitate imgui porting.
// we don't extend Array directly because it may muck with
// non-imgui packages array iteration.
export class ArrayEx<T> extends Array<T> {
  constructor() {
    super();
  }

  clear() {
    this.length = 0;
  }

  back() {
    return this[this.length - 1];
  }

  push_back(v: T) {
    return this.push(v);
  }

  pop_back() {
    return this.pop();
  }

  push_front(v: T) {
    this.unshift(v);
    // return this.splice(0, 0, v);
  }

  resize(len: number) {
    return (this.length = len);
  }

  empty() {
    return this.length === 0;
  }

  clone() {
    return this.slice();
  }
}
