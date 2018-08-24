# Type-Write.js

[![type-write.js on NPM](https://img.shields.io/npm/v/type-write.js.svg?style=flat-square)](https://www.npmjs.com/package/type-write.js) [![Standard JavaScript Style](https://img.shields.io/badge/code_style-standard-brightgreen.svg?style=flat-square)](http://standardjs.com/)

Native typewriter effect, without compromises or dependencies.

[See a demo](https://chriscavs.github.io/type-write-demo/) for ideas/examples.

## Why

Creating a custom typewriter effect can be cumbersome and time consuming.  However, most of the libraries out there are either slow, bloated with dependencies, or lacking in functionality.

Type-Right.js was designed to provide maximum flexibility and usability, while remaining fast and dependency free.

## Usage

Follow these steps to get started:

1. [Install](#install)
2. [Import](#import)
3. [Instanciate](#instanciate)
4. [Overview](#overview)
6. [Review Api](#api)
5. [Review Options](#options)

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
// target element  <div class="tw"></div>

const target = document.querySelector('.tw')

const options = {
  loop: true
}

const writer = new Typewriter(target, options)
```

### Overview (how to use)

To create a typewriter effect with Type-Write, you need to:

1. queue up actions
2. call the `start()` method

To queue up actions, use one of the [queue methods](#queue) in the API reference below.  You can chain methods together to keep code DRY.  See the [demo](https://chriscavs.github.io/type-write-demo/) for examples.

Every action returns a promise, guaranteeing that only one action is running at a time.  This improves performance, since it eliminates the need to contantly check whether to continue to the next action.

The order of actions is preserved, so the same queue can be used as many times as the user wishes.  To clear the queue (effectively wiping the slate clean), simply use the [clearQueue](#clearQueue) method.

## API

Queue Methods:
* [type](#type)
* [remove](#remove)
* [rest](#rest)
* [strings](#strings)
* [clear](#clear)
* [then](#then)

* [queueClearText](#queueClearText)
* [changeOps](#changeOps)
* [removeCursor](#removeCursor)
* [addCursor](#addCursor)

* [changeTypeColor](#changeTypeColor)
* [changeCursorColor](#changeCursorColor)
* [changeTypeClass](#changeTypeClass)
* [changeCursorClass](#changeCursorClass)

Other:
* [start](#start)
* [clearText](#clearText)
* [clearQueue](#clearQueue)

### type

### remove

### rest

### strings

### clear

### then

## Options

It is not required to pass in options, as each option comes with a default:

```es6
const defaultOptions = {
  loop: false,
  animateCursor: true,

  blinkSpeed: 400,

  typeSpeed: 90,
  deleteSpeed: 40,

  typeSpeedMin: 65,
  typeSpeedMax: 115,

  deleteSpeedMin: 40,
  deleteSpeedMax: 90,

  typeClass: 'type-span',
  cursorClass: 'cursor-span',

  typeColor: 'black',
  cursorColor: 'black'
}
```

Explanation of each option follows:

general
* [loop](#loop)
* [animateCursor](#animateCursor)
speeds
* [blinkSpeed](#blinkSpeed)
* [typeSpeed](#typeSpeed)
* [deleteSpeed](#deleteSpeed)
* [typeSpeedMin](#typeSpeedMin)
* [typeSpeedMax](#typeSpeedMax)
* [deleteSpeedMin](#deleteSpeedMin)
* [deleteSpeedMax](#deleteSpeedMax)
classes
* [typeClass](#typeClass)
* [cursorClass](#cursorClass)
colors
* [typeColor](#typeColor)
* [cursorColor](#cursorColor)

### loop

Accepts a `boolean`.  

* `true` -> the writer will loop through it's actions on repeat
* `false` -> the writer will run just one time

### animateCursor

Accepts either a `boolean`, or a string of `"none"`.

* `boolean`
  * `true` -> cursor blinks (according to [blinkSpeed](#blinkSpeed))
  * `false` -> cursor does not blink

* `string`
  * `"none"` -> cursor is not added

### blinkSpeed

Accepts an `integer`.

The time between each blink, given in milliseconds.  **A lower integer results in a faster blink speed.**

### typeSpeed

Accepts either an `integer`, or a string of `"random"`.

* `integer`
  * The time between typing a letter and typing the next, given in milliseconds.  **A lower integer results in a faster type speed.**
* `string`
  * `"random"` -> constantly re-evaluates the speed based on the [typeSpeedMin](#typeSpeedMin) and [typeSpeedMax](#typeSpeedMax).  Used for a more 'human' typing effect.

### deleteSpeed

Accepts either an `integer`, or a string of `"random"`.

* `integer`
  * The time between deleting a letter and deleting the next, given in milliseconds.  **A lower integer results in a faster delete speed.**
* `string`
  * `"random"` -> constantly re-evaluates the speed based on the [deleteSpeedMin](#deleteSpeedMin) and [deleteSpeedMax](#deleteSpeedMax).  Used for a more 'human' typing effect.

### typeSpeedMin

Accepts an `integer`.

The minimum type speed, applicable only if using `typeSpeed: "random"`.

### typeSpeedMax

Accepts an `integer`.

The maximum type speed, applicable only if using `typeSpeed: "random"`.

### deleteSpeedMin

Accepts an `integer`.

The minimum delete speed, applicable only if using `deleteSpeed: "random"`.

### deleteSpeedMax

Accepts an `integer`.

The maximum delete speed, applicable only if using `deleteSpeed: "random"`.

### typeClass

Accepts a `string`.

The class given to the `<span>` element that wraps around the typed portion of the writer.  Use this option to specifically style the text of the writer.

### cursorClass

Accepts a `string`.

The class given to the `<span>` element that wraps around the cursor portion of the writer.  Use this option to specifically style the cursor of the writer.

### typeColor

Accepts a `string` of any CSS color (rbg, 'white', etc).

Applies an inline-style to the `<span>` element that wraps around the text portion of the writer.

### cursorColor

Accepts a `string` of any CSS color (rbg, 'white', etc).

Applies an inline-style to the `<span>` element that wraps around the cursor portion of the writer.

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