const strMixins = {
  truncate(num) {
    if(num < this.length) return `${this.slice(0, num)}...`
    return this.slice(0, num)   
  },
  parameterize() {
    return this.toLowerCase().replace(/[\W-]+/g, '-')
  }
}

const objMixins = {
  deepClone() {
    return JSON.parse(JSON.stringify(this))
  }
}

Object.assign(String.prototype, strMixins);
// Object.assign(Object.prototype, objMixins);