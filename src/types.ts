/*
    This file exports:
        ValRef - support for pass by reference (of POD)
        Vec1 - float utilities, container of a single float
        Vec2 - 2d vector
        Rect - rectangle
        MutableString -
 */

/**
 * used to pass by reference a simple value that can be modified by target.
 * useful for changing various visibility configs.
 */
export class ValRef {
  value: any;
  constructor(val: any) {
    this.value = val;
  }

  get(): any {
    return this.value;
  }
  set(v: any) {
    this.value = v;
  }
  toggle() {
    this.value = !this.value;
  }
}

/**
 * Vec1 is an object that is comprised of a single number.
 * It is also a repository for utility functions as static methods.
 */
export class Vec1 {
  x: number;
  constructor(x: number) {
    this.x = x;
  }

  Clone() {
    return new Vec1(this.x);
  }

  static Lerp(a: number, b: number, pct: number) {
    if (typeof a === "number") return a + (b - a) * pct;
    else console.assert(false);
  }

  static Clamp(a: number, min: number, max: number) {
    if (a < min) return min;
    if (a > max) return max;
    return a;
  }

  static Saturate(val: number) {
    return val < 0 ? 0 : val > 1 ? 1 : val;
  }
}

export class Vec2 {
  x: number;
  y: number;
  constructor(x?: number, y?: number) {
    this.x = x === undefined ? 0 : x;
    this.y = y === undefined ? 0 : y;
  }

  Equals(other: Vec2) {
    return this.x === other.x && this.y === other.y;
  }

  IsNaN() {
    return isNaN(this.x) || isNaN(this.y);
  }

  Clone() {
    return new Vec2(this.x, this.y);
  }

  Copy(src: Vec2) {
    this.x = src.x;
    this.y = src.y;
  }

  CopyXY(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  Add(other: Vec2 | number) {
    if (typeof other === "number") {
      this.x += other;
      this.y += other;
    } else {
      this.x += other.x;
      this.y += other.y;
    }
    return this; // chainable
  }

  AddXY(x: number, y: number) {
    this.x += x;
    this.y += y;
    return this;
  }

  Subtract(other: Vec2 | number) {
    if (typeof other === "number") {
      this.x -= other;
      this.y -= other;
    } else {
      this.x -= other.x;
      this.y -= other.y;
    }
    return this; // chainable
  }

  SubtractXY(x: number, y: number) {
    this.x -= x;
    this.y -= y;
    return this; // chainable
  }

  Mult(other: Vec2 | number) {
    if (typeof other === "number") {
      this.x *= other;
      this.y *= other;
    } else {
      this.x *= other.x;
      this.y *= other.y;
    }
    return this; // chainable
  }

  MultXY(x: number, y: number) {
    this.x *= x;
    this.y *= y;
    return this;
  }

  Divide(other: Vec2 | number) {
    if (typeof other === "number") {
      this.x /= other;
      this.y /= other;
    } else {
      this.x /= other.x;
      this.y /= other.y;
    }
    return this; // chainable
  }

  Floor() {
    this.x = Math.floor(this.x);
    this.y = Math.floor(this.y);
    return this;
  }

  LengthSq() {
    return this.x * this.x + this.y * this.y;
  }

  static Zero(clone: boolean = true) {
    return clone ? sZero.Clone() : sZero;
  }

  static MAX_VALUE(clone: boolean = true) {
    return clone ? sMaxValue.Clone() : sMaxValue;
  }

  static MAX_NEGVALUE(clone: boolean = true) {
    return clone ? sMaxNegValue.Clone() : sMaxNegValue;
  }

  static Add(a: Vec2, b: Vec2 | number, c?: number) {
    if (typeof b === "number") {
      if (c === undefined) c = b;
      return new Vec2(a.x + b, a.y + c);
    } else return new Vec2(a.x + b.x, a.y + b.y);
  }

  static AddXY(a: Vec2, x: number, y: number) {
    return new Vec2(a.x + x, a.y + y);
  }

  static Subtract(a: Vec2, b: Vec2) {
    return new Vec2(a.x - b.x, a.y - b.y);
  }

  static SubtractXY(a: Vec2, x: number, y: number) {
    return new Vec2(a.x - x, a.y - y);
  }

  static Scale(a: Vec2, factor: number) {
    return Vec2.Mult(a, factor);
  }

  static Mult(a: Vec2, factor: Vec2 | number) {
    if (typeof factor === "number") return new Vec2(a.x * factor, a.y * factor);
    else return new Vec2(a.x * factor.x, a.y * factor.y);
  }

  static MultXY(a: Vec2, mx: number, my: number) {
    return new Vec2(a.x * mx, a.y * my);
  }

  static Divide(a: Vec2, factor: Vec2 | number) {
    if (typeof factor === "number") return new Vec2(a.x / factor, a.y / factor);
    else return new Vec2(a.x / factor.x, a.y / factor.y);
  }

  static LengthSq(a: Vec2, b: Vec2) {
    let dp = Vec2.Subtract(a, b);
    return dp.LengthSq();
  }

  static Dot(a: Vec2, b: Vec2) {
    return a.x * b.x + a.y + b.y;
  }

  static Min(lhs: Vec2, rhs: Vec2) {
    return new Vec2(
      lhs.x < rhs.x ? lhs.x : rhs.x,
      lhs.y < rhs.y ? lhs.y : rhs.y
    );
  }

  static Max(lhs: Vec2, rhs: Vec2) {
    return new Vec2(
      lhs.x >= rhs.x ? lhs.x : rhs.x,
      lhs.y >= rhs.y ? lhs.y : rhs.y
    );
  }

  static Clamp(v: Vec2, mn: Vec2, mx: Vec2) {
    return new Vec2(
      v.x < mn.x ? mn.x : v.x > mx.x ? mx.x : v.x,
      v.y < mn.y ? mn.y : v.y > mx.y ? mx.y : v.y
    );
  }

  static Floor(v: Vec2) {
    return new Vec2(Math.floor(v.x), Math.floor(v.y));
  }

  static Lerp(a: Vec2, b: Vec2, pct: Vec2 | number) {
    if (typeof pct === "number")
      return new Vec2(a.x + (b.x - a.x) * pct, a.y + (b.y - a.y) * pct);
    else return new Vec2(a.x + (b.x - a.x) * pct.x, a.y + (b.y - a.y) * pct.y);
  }
}

let sZero = new Vec2(0, 0);
let sMaxValue = new Vec2(Number.MAX_VALUE, Number.MAX_VALUE);
let sMaxNegValue = new Vec2(-Number.MAX_VALUE, -Number.MAX_VALUE);

export class Rect {
  Min: Vec2;
  Max: Vec2;
  // accept no args, 2 pts, or 4 numbers
  constructor(
    a: Vec2 | number | null = null,
    b: Vec2 | number | null = null,
    c: number | null | boolean = null,
    d: number | null = null,
    clone: boolean = true
  ) {
    if (a === null) {
      // default rect
      this.Min = new Vec2(Number.MAX_VALUE, Number.MAX_VALUE);
      this.Max = new Vec2(-Number.MAX_VALUE, -Number.MAX_VALUE);
    } else if (
      typeof a === "number" &&
      typeof c === "number" &&
      typeof b === "number" &&
      d !== null
    ) {
      // four numbers
      this.Min = new Vec2(a, b);
      this.Max = new Vec2(c, d);
    } else if (a instanceof Vec2 && b instanceof Vec2) {
      // two points
      if (c) {
        this.Min = a.Clone();
        this.Max = b.Clone();
      } else {
        this.Min = a;
        this.Max = b;
      }
    } else {
      this.Min = new Vec2(Number.MAX_VALUE, Number.MAX_VALUE);
      this.Max = new Vec2(-Number.MAX_VALUE, -Number.MAX_VALUE);
    }
  }

  static Expand(r: Rect, val: number | Vec2) {
    return Rect.FromRect(r).Expand(val);
  }

  static FromRect(r: Rect) {
    return new Rect(r.Min, r.Max);
  }

  static FromXY(x1: number | Vec2, y1: number, x2: number, y2?: number) {
    if (typeof x1 === "number") {
      return new Rect(new Vec2(x1, y1), new Vec2(x2, y2), false);
    } else {
      // minpt, xmax, ymax
      console.assert(y2 === undefined);
      return new Rect(x1.Clone(), new Vec2(y1, x2));
    }
  }

  Clone() {
    return Rect.FromRect(this);
  }

  Copy(src: Rect) {
    this.Min.Copy(src.Min);
    this.Max.Copy(src.Max);
  }

  IsNaN() {
    return this.Min.IsNaN() || this.Max.IsNaN();
  }

  IsValid() {
    if (
      this.Min.x === Number.MAX_VALUE &&
      this.Min.y === Number.MAX_VALUE &&
      this.Max.x === -Number.MAX_VALUE &&
      this.Max.y === -Number.MAX_VALUE
    ) {
      return false;
    } else return true;
  }

  GetTL() {
    return this.Min;
  }

  GetTR() {
    return new Vec2(this.Max.x, this.Min.y);
  }

  GetBR() {
    return this.Max;
  }

  GetBL() {
    return new Vec2(this.Min.x, this.Max.y);
  }

  GetMin() {
    return this.Min;
  }

  GetMax() {
    return this.Max;
  }

  GetSize() {
    return new Vec2(this.GetWidth(), this.GetHeight());
  }

  SetSize(
    sz: number | Vec2,
    szy?: number // polymorph Vec2 or x, y
  ) {
    if (szy != undefined && typeof sz === "number") {
      this.Max.x = this.Min.x + sz;
      this.Max.y = this.Min.y + szy;
    } else if (sz instanceof Vec2) {
      this.Max.x = this.Min.x + sz.x;
      this.Max.y = this.Min.y + sz.y;
    }
  }

  GetWidth() {
    return this.Max.x - this.Min.x;
  }

  GetHeight() {
    return this.Max.y - this.Min.y;
  }

  GetCenter() {
    return new Vec2(
      this.Min.x + 0.5 * this.GetWidth(),
      this.Min.y + 0.5 * this.GetHeight()
    );
  }

  Contains(p: Vec2 | Rect) {
    if (p instanceof Vec2) return this.ContainsPt(p);
    else if (p instanceof Rect) return this.ContainsRect(p);
    else console.assert(!!"unexpected parameter");
  }

  ContainsPt(p: Vec2) {
    return (
      p.x >= this.Min.x &&
      p.y >= this.Min.y &&
      p.x < this.Max.x &&
      p.y < this.Max.y
    );
  }

  ContainsRect(r: Rect) {
    return (
      r.Min.x >= this.Min.x &&
      r.Min.y >= this.Min.y &&
      r.Max.x <= this.Max.x &&
      r.Max.y <= this.Max.y
    );
  }

  Overlaps(r: Rect) {
    return (
      r.Min.y < this.Max.y &&
      r.Max.y > this.Min.y &&
      r.Min.x < this.Max.x &&
      r.Max.x > this.Min.x
    );
  }

  AddPt(
    p: Vec2 // grow the rect to include pt
  ) {
    if (this.Min.x > p.x) this.Min.x = p.x;
    if (this.Min.y > p.y) this.Min.y = p.y;
    if (this.Max.x < p.x) this.Max.x = p.x;
    if (this.Max.y < p.y) this.Max.y = p.y;
  }

  AddRect(
    r: Rect // grow the rect to include r
  ) {
    if (this.Min.x > r.Min.x) this.Min.x = r.Min.x;
    if (this.Min.y > r.Min.y) this.Min.y = r.Min.y;
    if (this.Max.x < r.Max.x) this.Max.x = r.Max.x;
    if (this.Max.y < r.Max.y) this.Max.y = r.Max.y;
  }

  Expand(val: number | Vec2) {
    if (typeof val === "number") this.expandF(val);
    else this.expandXY(val.x, val.y);
    return this;
  }

  expandF(amount: number) {
    this.Min.x -= amount;
    this.Min.y -= amount;
    this.Max.x += amount;
    this.Max.y += amount;
  }

  expandXY(x: number, y: number) {
    this.Min.x -= x;
    this.Min.y -= y;
    this.Max.x += x;
    this.Max.y += y;
  }

  Translate(pt: Vec2) {
    this.Min.x += pt.x;
    this.Min.y += pt.y;
    this.Max.x += pt.x;
    this.Max.y += pt.y;
  }

  TranslateX(dx: number) {
    this.Min.x += dx;
    this.Max.x += dx;
  }

  TranslateY(dy: number) {
    this.Min.y += dy;
    this.Max.y += dy;
  }

  ClipWith(
    r: Rect // r is Rect
  ) {
    // Simple version, may lead to an inverted rectangle, which is fine
    // for Contains/Overlaps test but not for display.
    this.Min = Vec2.Max(this.Min, r.Min);
    this.Max = Vec2.Min(this.Max, r.Max);
    return this;
  }

  ClipWithFull(r: Rect) {
    // Full version, ensure both points are fully clipped.
    this.Min = Vec2.Clamp(this.Min, r.Min, r.Max);
    this.Max = Vec2.Clamp(this.Max, r.Min, r.Max);
    return this;
  }

  Floor() {
    this.Min.x = Math.floor(this.Min.x);
    this.Min.y = Math.floor(this.Min.y);
    this.Max.x = Math.floor(this.Max.x);
    this.Max.y = Math.floor(this.Max.y);
    return this;
  }

  IsInverted() {
    return this.Min.x > this.Max.x || this.Min.y > this.Max.y;
  }
}

export class MutableString {
  str: string;
  constructor(str: string = "") {
    this.str = str;
  }

  get IsMutable() {
    return true;
  }

  Clone() {
    // since str's are immutable, it's as simple as this:
    return new MutableString(this.str);
  }

  Copy(mstr: MutableString) {
    console.assert(mstr.IsMutable);
    this.str = mstr.str;
  }

  Equals(str: MutableString | string) {
    if (str instanceof MutableString) return this.str === str.str;
    else return this.str === str;
  }

  Get() {
    return this.str;
  }

  toString() {
    return this.str;
  }

  Set(str: string) {
    this.str = str ? str : "";
  }

  Length() {
    return this.str ? this.str.length : 0;
  }

  CountLines() {
    let linecount = 1;
    for (let i = 0; i < this.str.length; i++) {
      if (this.str.charCodeAt(i) === 10)
        // 0x0a
        linecount++;
    }
    return linecount;
  }

  GetChar(idx: number) {
    return this.str[idx];
  }

  // walk backward from idx, looking for newline
  FindLineBegin(idx: number) {
    for (let i = idx - 1; i >= 0; i--) {
      if (this.str.charCodeAt(i) === 10) return i + 1;
    }
    return 0;
  }

  IsNewline(idx: number) {
    return this.str.charCodeAt(idx) === 10;
  }

  IsSeparator(idx: number) {
    return /[\s,;(){}|]/.test(this.str[idx]);
  }

  GetCharCode(idx: number) {
    return this.str.charCodeAt(idx);
  }

  GetChars(where: number, len: number) {
    return this.str.slice(where, where + len);
  }

  DeleteChars(where: number, len: number) {
    this.Splice(where, len);
  }

  InsertChars(where: number, chars: string) {
    this.Splice(where, 0, chars);
  }

  /**
   * The splice() method changes the content of a string by removing a range of
   * characters and/or adding new characters.
   *
   * @this {String}
   * @param {number} start Index at which to start changing the string.
   * @param {number} delCount An integer indicating the number of old chars to remove.
   * @param {string} newSubStr The String that is spliced in.
   */
  Splice(start: number, delCount: number, newSubStr?: string) {
    let str = this.str;
    if (newSubStr)
      this.str = str.slice(0, start) + newSubStr + str.slice(start + delCount);
    else this.str = str.slice(0, start) + str.slice(start + delCount);
  }
}

export default Vec2;
