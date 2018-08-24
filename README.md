# Type-Right.js

[![type-right.js on NPM](https://img.shields.io/npm/v/type-right.js.svg?style=flat-square)](https://www.npmjs.com/package/type-right.js) [![Standard JavaScript Style](https://img.shields.io/badge/code_style-standard-brightgreen.svg?style=flat-square)](http://standardjs.com/)

Native typewriter effect, without compromises or dependencies.

[See a demo](https://chriscavs.github.io/type-right-demo/) for ideas/examples.

## Why

Creating a custom typewriter effect can be cumbersome and time consuming.  However, most of the libraries out there are either slow, bloated with dependencies, or lacking in functionality.

Type-Right.js was designed to provide maximum flexibility and usability, while remaining fast and dependency free.

## Usage

Follow these steps to get started:

1. [Install](#install)
2. [Import](#import)
3. [Instanciate](#instanciate)
5. [Review Options](#options)
4. [Review Api](#api)
5. [Browser Support](#browsersupport)

### Install

Using NPM, install Type-Write and save it to your `package.json` dependencies.

```bash
$ npm install type-write.js --save
```

### Import

Import Heads-up, naming it according to your preference.

```es6
import Typewriter from 'type-write.js'
```

### Instanciate

Make as many instances of the Typewriter class as you would like.  Upon instantiation, pass in the target element that will contain the typewriter, as well as an options hash.

```es6
// target element => <div class="tw"></div>

const target = document.querySelector('.tw')

const options = {
  loop: true
}

const writer = new Typewriter(target, options)
```

## Options

All options come with defaults, and are truly optional. The defaults are shown below:

```es6
const defaultOptions = {
  loop: false,
  animateCursor: true,

  blinkSpeed: 400,

  typeSpeed: 100,
  deleteSpeed: 40,

  typeSpeedMin: 65,
  typeSpeedMax: 130,

  deleteSpeedMin: 85,
  deleteSpeedMax: 150,

  typeClass: 'type-span',
  cursorClass: 'cursor-span',

  typeColor: 'black',
  cursorColor: 'black'
}
```

Explanation of each option follows:

* [loop](#loop)
* [animateCursor](#animateCursor)
* speeds
  * [blinkSpeed](#blinkSpeed)
  * [typeSpeed](#typeSpeed)
  * [deleteSpeed](#deleteSpeed)
  * [typeSpeedMin](#typeSpeedMin)
  * [typeSpeedMax](#typeSpeedMax)
  * [deleteSpeedMin](#deleteSpeedMin)
  * [deleteSpeedMax](#deleteSpeedMax)
* classes
  * [typeClass](#typeClass)
  * [cursorClass](#cursorClass)
* colors
  * [typeColor](#typeColor)
  * [cursorColor](#cursorColor)

### loop

Any CSS selector that targets to your header element.  It is recommended that you use the default semantic HTML tag.

```es6
headsUp({
  target: '#header'
})
```

### animateCursor

The time it takes for the header to hide, in seconds.

```es6
headsUp({
  duration: 0.5
})
```

### blinkSpeed

Easing function used to transition the header.

```es6
headsUp({
  easing: 'ease-in'
})
```

Heads-up uses the transition property to accomplish easing.  See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-timing-function) for more information.

### typeSpeed

Delay from the time the user starts scrolling until the header starts to hide, in seconds.

```es6
headsUp({
  delay: 1
})
```

### deleteSpeed

When the user scrolls, a function is called to check whether it is necessary to hide or reveal the header.  Specify the amount of time between function calls with the debounce option, in milliseconds.  This may help with performance.

```es6

// will wait 100ms after each function call

headsUp({
  debounce: 100
})
```

### typeSpeedMin

Delay from the time the user starts scrolling until the header starts to hide, in seconds.

```es6
headsUp({
  delay: 1
})
```

### typeSpeedMax

Delay from the time the user starts scrolling until the header starts to hide, in seconds.

```es6
headsUp({
  delay: 1
})
```

### typeSpeedMin

Delay from the time the user starts scrolling until the header starts to hide, in seconds.

```es6
headsUp({
  delay: 1
})
```

### deleteSpeedMax

Delay from the time the user starts scrolling until the header starts to hide, in seconds.

```es6
headsUp({
  delay: 1
})
```

### typeClass

Delay from the time the user starts scrolling until the header starts to hide, in seconds.

```es6
headsUp({
  delay: 1
})
```

### cursorClass

Delay from the time the user starts scrolling until the header starts to hide, in seconds.

```es6
headsUp({
  delay: 1
})
```

### typeColor

Delay from the time the user starts scrolling until the header starts to hide, in seconds.

```es6
headsUp({
  delay: 1
})
```

### cursorColor

Delay from the time the user starts scrolling until the header starts to hide, in seconds.

```es6
headsUp({
  delay: 1
})
```

## Browser Support

Heads-up depends on the following browser APIs:

* [pageYOffset](https://developer.mozilla.org/en-US/docs/Web/API/Window/pageYOffset)
* [querySelector](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector)
* [getBoundingClientRect](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect)

Consequently, it supports the following natively:

* Chrome 1+
* Firefox 3.5+
* Safari 3.2+
* Opera 10+
* IE 9+
* iOS Safari 4+
* Android Browser 2+

## License

[MIT](https://opensource.org/licenses/MIT). © 2018 Christopher Cavalea