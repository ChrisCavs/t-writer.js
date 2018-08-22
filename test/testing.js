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
    typeSpeed: 100,
    deleteSpeed: 100
  }

  class Typewriter {
    constructor (el, options) {
      this.el = el
      this.text = ''
      this.queue = []
      this.options = Object.assign(defaultOptions, options)

      this.createTextEl()
    }

    type (str) {
      this.queue.push({
        type: 'type',
        content: str
      })

      return this
    }

    deleteChars (num) {
      this.queue.push({
        type: 'deleteChars',
        count: num
      })
    }

    clear () {
      this.queue.push({
        type: 'clear'
      })

      return this
    }

    start() {
      this.createCursorEl()
      this.startLoop()
    }

    deleteChar () {
      this.text = this.text.slice(0, -1)
      this.render()
    }

    addChar (char) {
      this.text += char
      this.render()
    }

    add (action) {
      let count = 0
      this.timestamp = Date.now()

      const step = () => {
        if (count === action.content.length) return
        const newStamp = Date.now()

        if (newStamp - this.timestamp >= this.options.typeSpeed) {
          this.addChar(action.content[count])
          this.timestamp = newStamp
          count++
        }
        requestAnimationFrame(step)
      }

      requestAnimationFrame(step)
    }

    delete (action) {
      let count = action.count

      while (count > 0) {
        if (!this.timeout) {
          this.deleteChar()
          count--

          this.timeout = setTimeout(() => {
            this.timeout = null
          }, (1000 / this.options.deleteSpeed))
        }
      }
    }

    deleteAll () {
      while (this.text.length > 0) {
        if (!this.timeout) {
          this.deleteChar()

          this.timeout = setTimeout(() => {
            this.timeout = null
          }, (1000 / this.options.deleteSpeed))
        }
      }
    }

    step (idx) {
      console.log(idx)
      const action = this.queue[idx]

      switch (action.type) {
        case 'type':
          console.log('type action')
          return this.add(action)

        case 'deleteChars':
          return this.delete(action)
          
        case 'clear':
          return this.deleteAll()
      }
    }

    startLoop () {
      for (let idx = 0; idx < this.queue.length; idx++) {
        console.log('in loop')
        this.step(idx)
      }
      console.log('out of loop')
      if (this.options.loop) {
        this.deleteAll()
        this.startLoop()
      }
    }

    createCursorEl () {
      const cursorEl = document.createElement('span')
      cursorEl.innerHTML = '|'
      
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
      console.log(this.textEl.innerHTML)
    }
  }

  const test = document.querySelector('.test')
  const typeWriter = new Typewriter(test)

  window.typewriter = typeWriter
})