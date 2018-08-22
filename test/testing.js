document.addEventListener('DOMContentLoaded', () => {

  class Cursor {
    constructor (el) {
      this.el = el
      this.faded = false

      this.initialAssignment()
      this.el.addEventListener('transitionend', this.logic.bind(this))
    }

    initialAssignment () {
      Object.assign(this.el.style, {
        opacity: '1',
        'transition-duration': '0.3s'
      })
    }

    fade () {
      this
        .el
        .style
        .opacity = '0'

      this.faded = true
    }

    fadeIn () {
      this
        .el
        .style
        .opacity = '1'

      this.faded = false
    }

    logic () {
      this.faded
        ? this.fadeIn()
        : this.fade()
    }

    start () {
      setTimeout(this.fade.bind(this), 0)
    }
  }

  example queue element:
  {
    type: 'delete',

  }

  const defaultOptions = {
    loop: false
  }

  class Typewriter {
    constructor (el, options) {
      this.el = el
      this.queue = []
      this.options = Object.assign(defaultOptions, options)
    }

    step () {
      const action = this.queue.shift()

      switch (action.type) {
        case 'type':
          return this.add(action)
          
        case 'deleteChars':
          return this.delete(action)
          
        case 'deleteAll':
          return this.deleteAll()
      }
    }

    start () {
      const cursorEl = document.createElement('span')

      this.el.appendChild(cursorEl)

      this.cursor = new Cursor(cursorEl)
      this.cursor.start()

      while (this.queue.length > 0) {
        this.step()
      }
    }
  }
})