if (!Array.prototype.remove) {
  Array.prototype.remove = function <T>(this: T[], elem: T): T[] {
    return this.filter((e) => e !== elem);
  };
}

if (!Array.prototype.last) {
  Array.prototype.last = function <T>(this: T[]): T {
    return this[this.length - 1];
  };
}
