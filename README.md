# Heads-Up.js

[![headsup.js on NPM](https://img.shields.io/npm/v/headsup.js.svg?style=flat-square)](https://www.npmjs.com/package/headsup.js) [![Standard JavaScript Style](https://img.shields.io/badge/code_style-standard-brightgreen.svg?style=flat-square)](http://standardjs.com/)

Sticky headers that hide on scroll.

[See a demo.](https://chriscavs.github.io/headsup-demo/)

## Usage

Follow these steps to get started:

1. [Install](#install)
2. [Import](#import)
4. [Review Options](#options)

**Note**: It is required that you use a css reset that clears user agent stylesheet margin/padding.
See here for an [example](https://meyerweb.com/eric/tools/css/reset/).

### Install

Using NPM, install Heads-up, and save it to your `package.json` dependencies.

```bash
$ npm install headsup.js --save
```

### Import

Import Heads-up, naming it according to your preference.

```es6
import headsUp from 'headsup.js'
```

## Options

All options are optional, and come with defaults. The defaults are shown below:

```es6
headsUp({
  selector: 'header',
  duration: 0.3,
  easing: 'ease',
  delay: 0,
  debounce: false
})
```

Explanation of each option follows:

* [selector](#selector)
* [duration](#duration)
* [easing](#easing)
* [delay](#delay)
* [debounce](#debounce)

### selector

Any CSS selector that targets to your header element.  It is recommended that you use the default semantic HTML tag.

```es6
headsUp({
  target: '#header'
})
```

### duration

The time it takes for the header to hide, in seconds.

```es6
headsUp({
  duration: 0.5
})
```

### easing

Easing function used to transition the header.

```es6
headsUp({
  easing: 'ease-in'
})
```

Heads-up uses the transition property to accomplish easing.  See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-timing-function) for more information.

### delay

Delay from the time the user starts scrolling until the header starts to hide, in seconds.

```es6
headsUp({
  delay: 1
})
```

### debounce

When the user scrolls, a function is called to check whether it is necessary to hide or reveal the header.  Specify the amount of time between function calls with the debounce option, in milliseconds.  This may help with performance.

```es6

// will wait 100ms after each function call

headsUp({
  debounce: 100
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