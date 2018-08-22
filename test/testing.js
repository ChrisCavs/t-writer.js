document.addEventListener('DOMContentLoaded', () => {

  class Cursor {
    constructor (el) {
      this.el = el
      this.faded = false

      this.initialAssignment()
      this.el.addEventListener('transitionend', this.logic.bind(this))

      this.fade = this.fade.bind(this)
      this.fadeIn = this.fadeIn.bind(this)
    }

    initialAssignment () {
      Object.assign(this.el.style, {
        opacity: '1',
        'transition-duration': '0.1s'
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
        ? setTimeout(this.fadeIn, 400)
        : setTimeout(this.fade, 400)
    }

    start () {
      setTimeout(this.fade.bind(this), 0)
    }
  }

  const defaultOptions = {
    loop: false,
    animateCursor: true,
    typeSpeed: 150,
    deleteSpeed: 150
  }

  class Typewriter {
    constructor (el, options) {
      this.el = el
      this.text = ''
      this.queue = []
      this.options = Object.assign(defaultOptions, options)

      this.createTextEl()
    }

    // API

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

      return this
    }

    clear () {
      this.queue.push({
        type: 'clear'
      })

      return this
    }

    rest (time) {
      this.queue.push({
        type: 'pause',
        time
      })

      return this
    }

    start() {
      this.createCursorEl()
      this.loop(0)
    }

    // ACTIONS

    add (content) {
      let count = 0
      this.timestamp = Date.now()

      return new Promise((resolve, _) => {

        const _step = () => {
          if (count === content.length) {
            return resolve()
          }

          const newStamp = Date.now()

          if (newStamp - this.timestamp >= this.options.typeSpeed) {
            this.addChar(content[count])
            this.timestamp = newStamp
            count++
          }
          requestAnimationFrame(_step)
        }

        requestAnimationFrame(_step)
      })
    }

    delete (count) {
      this.timestamp = Date.now()

      return new Promise((resolve, _) => {

        const _step = () => {
          if (count === 0) {
            return resolve()
          }

          const newStamp = Date.now()

          if (newStamp - this.timestamp >= this.options.deleteSpeed) {
            this.deleteChar()
            this.timestamp = newStamp
            count--
          }
          requestAnimationFrame(_step)
        }

        requestAnimationFrame(_step)
      })
    }

    deleteAll () {
      return this.delete(this.text.length)
    }

    pause (time) {
      return new Promise ((resolve, _) => {
        setTimeout(resolve, time)
      })
    }

    // HELPERS

    deleteChar() {
      this.text = this.text.slice(0, -1)
      this.render()
    }

    addChar(char) {
      this.text += char
      this.render()
    }

    step (idx) {
      const action = this.queue[idx]

      switch (action.type) {
        case 'type':
          return this.add(action.content)

        case 'deleteChars':
          return this.delete(action.count)
          
        case 'clear':
          return this.deleteAll()

        case 'pause':
          return this.pause(action.time)
      }
    }

    loop (idx) {
      if (idx === this.queue.length) {
        if (this.options.loop) {
          this.deleteAll().then(_ => this.loop(0))
        }

        return
      }

      this.step(idx).then(_ => {
        this.loop(idx + 1)
      })
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
      console.log(this.text)
    }
  }

  const test = document.querySelector('.test')
  const typeWriter = new Typewriter(test, {loop: true})

  window.typewriter = typeWriter
})