class Complex {
  constructor(re = 0, im = 0) {
    this.re = re
    this.im = im
  }
  
  conjugate() {
    return new Complex(this.re, -1 * this.im)
  }

  times(other) {
    return new Complex(this.re * other.re - this.im * other.im,
                       this.im * other.re + this.im * other.re)
  }

  add(other) {
    return new Complex(this.re + other.re, this.im + other.im)
  }

  norm() {
    return Math.sqrt(Math.pow(this.re, 2) + Math.pow(this.im, 2))
  }

  toString() {
    return `${this.re} + i${this.im}`
  }
}

export default Complex
