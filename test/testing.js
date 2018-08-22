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

  const defaultOptions = {
    loop: false,
    animateCursor: true,
    typeSpeed: 
  }

  class Typewriter {
    constructor (el, options) {
      this.el = el
      this.text = ''
      this.queue = []
      this.options = Object.assign(defaultOptions, options)

      this.createTextEl()
    }

    deleteChar () {

    }

    type (action) {

    }

    delete (action) {

    }

    deleteAll () {
      while (this.text.length > 0) {
        if (!this.timeout) {
          this.deleteChar()
          this.timeout = setTimeout(() => {
            this.timeout = null
          }, (1000 / this.options.typeSpeed))
        }
      }
    }

    step (idx) {
      const action = this.queue[idx]

      switch (action.type) {
        case 'type':
          return this.add(action)

        case 'deleteChars':
          return this.delete(action)
          
        case 'clear':
          return this.deleteAll()
      }
    }

    start () {
      this.createCursorEl()
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

    createCursorEl () {
      const cursorEl = document.createElement('span')
      const cursorText = document.createTextNode('|')
      cursorEl.appendChild(cursorText)

      this.el.appendChild(cursorEl)

      if (this.options.animateCursor) {
        this.cursor = new Cursor(cursorEl)
        this.cursor.start()
      }
    }

    createTextEl () {
      const textEl = document.createElement('span')
      this.el.appendChild(textEl)

      this.textEl = textEl
    }

    render () {
      this.textEl.innerHTML = this.text
    }
  }
})