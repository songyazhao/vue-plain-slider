# vue-plain-slider

[![vue](https://img.shields.io/badge/vue-2.0+-brightgreen.svg)](https://github.com/vuejs/vue)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/songyazhao/vue-plain-slider/blob/master/LICENSE)

A simple slider component for Vue.js

[Zh-CN Document](https://github.com/songyazhao/vue-plain-slider)

## Features

* Lightweight, no dependencies
* Navigation, pager and arrows
* Slider and Mouse support
* Vertical or Horizontal sliding, Align left or right

## Install

```
npm install --save vue-plain-slider
```

## Usage

> Example - Basic usage
```html
<template>
  <Slider
    ref="Slider"
    direction="horizontal"
    :mousewheel-control="true"
    :performance-mode="true"
    :pagination-visible="true"
    :pagination-clickable="true"
    :loop="true"
    :speed="500"
    @slide-change-start="onSlideChangeStart"
    @slide-change-end="onSlideChangeEnd">
      <div>Page 1</div>
      <div>Page 2</div>
      <div>Page 3</div>
  </Slider>
</template>

<script>
import Slider from 'vue-plain-slider'

export default {
  name: 'slider-demo',
  components: { Slider },
  methods: {
    onSlideChangeStart (currentPage, el) {
      console.log('onSlideChangeStart', currentPage, el);
    },
    onSlideChangeEnd (currentPage, el) {
      console.log('onSlideChangeEnd', currentPage, el);
    }
  }
}
</script>

<style scoped>
.slider {
  height: 300px;
}
</style>
```

## More demo

* [Example - Complete](https://github.com/songyazhao/vue-plain-slider/blob/master/demo/basic-DEMO.vue)

* [Example - The left slide to delete](https://github.com/songyazhao/vue-plain-slider/blob/master/demo/left-slider-delete-DEMO.vue)

![left-slider-delete.gif](http://ohef3m3y6.bkt.clouddn.com/vue-plain-slider/left-slider-delete.gif)

## Api
### Properties
| Name                 | Type      | Default      | Description                                                                            |
|----------------------|-----------|--------------|----------------------------------------------------------------------------------------|
| direction            | `String`  | `"vertical"` | Could be 'horizontal'(for horizontal slider) or 'vertical' (for vertical slider).      |
| align                | `String`  | `"left"`     | Could be 'left'(align left) or 'right' (align right).                                  |
| mousewheel-control   | `Boolean` | `true`       | Set to true to enable navigation through slides using mouse wheel.                     |
| pagination-visible   | `Boolean` | `false`      | Toggle (hide/true) pagination container visibility when click on Slider's container.   |
| pagination-clickable | `Boolean` | `false`      | If true then clicking on pagination button will cause transition to appropriate slide. |
| transition-mode      | `Boolean` | `true`       | Disable advance effect for better performance.                                         |
| loop                 | `Boolean` | `false`      | Set to true to enable continuous loop mode.                                            |
| speed                | `Number`  | `500`        | Set transition duration of slider.                                                     |
| ----------------------------------------------- |

### Methods
| Method            | Description              |
|-------------------|--------------------------|
| next()            | Go next page.            |
| prev()            | Go previous page.        |
| setPage(`Number`) | Set current page number. |

### Events
| Name               | Arguments              | Description                                                            |
|--------------------|------------------------|------------------------------------------------------------------------|
| slide-change-start | `pageNumber` `element` | Fire in the beginning of animation to other slide (next or previous).  |
| slide-change-end   | `pageNumber` `element` | Will be fired after animation to other slide (next or previous).       |
| slide-revert-start | `pageNumber` `element` | Fire in the beginning of animation to revert slide (no change).        |
| slide-revert-end   | `pageNumber` `element` | Will be fired after animation to revert slide (no change).             |
| slider-move        | `offset`               | Callback function, will be executed when user touch and move<br>finger over Swiper and move it. Receives swiper instance and<br>'touchmove' event as an arguments. |

## License

[MIT](https://github.com/songyazhao/vue-plain-slider/blob/master/LICENSE)