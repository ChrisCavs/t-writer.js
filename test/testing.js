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
      this.text = ''
      this.queue = []
      this.options = Object.assign(defaultOptions, options)
    }

    step (idx) {
      const action = this.queue[idx]

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

      this.startLoop()
    }

    startLoop () {
      for (let idx = 0; idx < this.queue.length; idx++) {
        this.step(idx)
      }

      if (this.options.loop) {
        this.deleteAll()
        this.startLoop()
      }
    }
  }
})