document.addEventListener('DOMContentLoaded', () => {

  const defaultOptions = {
    loop: false,
    animateCursor: true,

    blinkSpeed: 200,

    typeSpeed: 125,
    deleteSpeed: 85,

    typeSpeedMin: 85,
    typeSpeedMax: 150,

    deleteSpeedMin: 85,
    deleteSpeedMax: 150,

    typeClass: 'type-span',
    cursorClass: 'cursor-span',

    typeColor: 'black',
    cursorColor: 'black'
  }

  class Cursor {
    constructor (el, speed) {
      this.el = el
      this.speed = speed

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
        ? setTimeout(this.fadeIn, this.speed)
        : setTimeout(this.fade, this.speed)
    }

    start () {
      setTimeout(this.fade.bind(this), 0)
    }
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

    strings (...arr) {
      arr.forEach(str => {
        this.queue.push({
          type: 'type',
          content: str
        })
      })

      return this
    }

    remove (num) {
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

    changeOps (options) {
      this.options = Object.assign(this.options, options)

      return this
    }

    then (cb) {
      this.queue.push({
        type: 'callback',
        cb
      })

      return this
    }

    start() {
      if (this.running) return

      if (!this.cursorEl) {
        this.createCursorEl()
      }
      
      this.running = true
      this.deleteAll().then(_ => this.loop(0))
    }

    // ACTIONS

    add (content) {
      let count = 0
      this.timestamp = Date.now()

      return new Promise((resolve, _) => {

        const _step = () => {
          if (count === content.length) return resolve()

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
          if (count === 0) return resolve()

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

    callback (cb) {
      return new Promise ((resolve, _) => {
        cb()
        resolve()
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

    getTypeSpeed () {
      const speed = this.options.typeSpeed

      if (typeof speed === 'number') {
        return speed
      }

      const max = this.options.typeSpeedMax
      const min = this.options.typeSpeedMin

      const random = Math.floor(Math.random() * (max-min))
      return random + min
    }

    getDeleteSpeed () {
      const speed = this.options.deleteSpeed

      if (typeof speed === 'number') {
        return speed
      }

      const max = this.options.deleteSpeedMax
      const min = this.options.deleteSpeedMin

      const random = Math.floor(Math.random() * (max-min))
      return random + min
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

        case 'callback':
          return this.callback(action.cb)
      }
    }

    loop (idx) {
      if (idx === this.queue.length) {
        this.running = false
        
        if (this.options.loop) {
          this.start()
        }
        return
      }

      this.step(idx).then(_ => {
        this.loop(idx + 1)
      })
    }

    createCursorEl () {
      this.cursorEl = document.createElement('span')
      this.cursorEl.innerHTML = '|'
      this.cursorEl.style.color = this.options.cursorColor
      this.cursorEl.classList.add(this.options.cursorClass)
      
      this.el.appendChild(this.cursorEl)

      if (this.options.animateCursor) {
        this.cursor = new Cursor(this.cursorEl, this.options.blinkSpeed)
        this.cursor.start()
      }
    }

    createTextEl () {
      const textEl = document.createElement('span')
      textEl.classList.add(this.options.typeClass)
      textEl.style.color = this.options.typeColor
      this.el.appendChild(textEl)

      this.textEl = textEl
    }

    render () {
      this.textEl.innerHTML = this.text
    }
  }

  const test = document.querySelector('.test')
  const typeWriter = new Typewriter(test)

  window.typewriter = typeWriter
})