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

  get made_up_link() {
      return  `/work/${this.title.replace(" ", "-").toLowerCase()}`
  }

  get link() {
    return this.full_slug || this.made_up_link
  }

  get title() {
    return this.name
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
