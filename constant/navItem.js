import charming from "charming";

export default class NavItem {
  constructor(props, index) {
    Object.assign(this, props)
    this.index = index

    this.offset = {
      x: 0,
      y: 0,
    }
  }

  get link() {
    return `/work/${this.title.replace("\\s+", "-").toLowerCase()}`
  }

  get style() {
    return {
      width: this.width + 'px' || 'auto',
      whiteSpace: this.oneLine ? 'nowrap' : '',
      textAlign: this.textAlign || 'left'
    }
  }


  get letterIndex() {
    return this.title.split('').findIndex(l => l.toLowerCase() === this.letter.toLowerCase())
  }

}
