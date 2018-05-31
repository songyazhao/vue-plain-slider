# vue-plain-slider

[![vue](https://img.shields.io/badge/vue-^2.1.0-brightgreen.svg)](https://github.com/vuejs/vue)
[![Shippable](https://img.shields.io/shippable/5444c5ecb904a4b21567b0ff.svg)](https://www.npmjs.com/package/vue-plain-slider)
[![downloads](https://img.shields.io/npm/dt/vue-plain-slider.svg)](https://www.npmjs.com/package/vue-plain-slider)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/songyazhao/vue-plain-slider/blob/master/LICENSE)

A simple slider component for Vue.js

[Zh-CN Document](https://github.com/songyazhao/vue-plain-slider)

## Features

* Lightweight, no dependencies
* Navigation, pager and arrows
* Slider and Mouse support
* Vertical or Horizontal sliding, Align left or right

## Install

```bash
npm install --save vue-plain-slider # Or yarn add vue-plain-slider
```

## Usage

> [Example - Basic usage](https://github.com/songyazhao/vue-plain-slider/blob/master/src/views/Demo/Basic.vue)
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

* [Example - Complete](https://github.com/songyazhao/vue-plain-slider/blob/master/src/views/Demo/Full.vue)

*Vertical*

![Vertical.gif](http://ohef3m3y6.bkt.clouddn.com/vue-plain-slider/Vertical.gif)

*Horizontal*

![Horizontal.gif](http://ohef3m3y6.bkt.clouddn.com/vue-plain-slider/Horizontal.gif)

*Loop*

![Loop-Mode.gif](http://ohef3m3y6.bkt.clouddn.com/vue-plain-slider/Loop-Mode.gif)

*Different children size*

![Different-Children-Size.gif](http://ohef3m3y6.bkt.clouddn.com/vue-plain-slider/Different-Children-Size.gif)

*Nested grid*

![Nested-Grid-Slider.gif](http://ohef3m3y6.bkt.clouddn.com/vue-plain-slider/Nested-Grid-Slider.gif)

* [Example - The left slide to delete](https://github.com/songyazhao/vue-plain-slider/blob/master/src/views/Demo/LeftSliderDelete.vue)

![left-slider-delete.gif](http://ohef3m3y6.bkt.clouddn.com/vue-plain-slider/left-slider-delete.gif)

## Api
### Properties
| Name                 | Type      | Default      | Description                                                                            |
|----------------------|-----------|--------------|----------------------------------------------------------------------------------------|
| align                | `String`  | `"left"`     | Align n Orientation, Could be `'left'` or `'right'`.                                   |
| auto                 | `Boolean` | `false`      | Whether or not automatic carousel.                                                     |
| asyncData            | `Array`、`Boolean` | `false` | For `false` that do not need the asynchronous data, when the data is asynchronous dynamic access to or need to change, must add this attribute, value and `v-for` binding in the same field |
| curPage              | `Number`  | `1`          | Set the default start from which one.                                                  |
| direction            | `String`  | `"vertical"` | Could be `'horizontal'`(for horizontal slider) or `'vertical'` (for vertical slider).  |
| dragEnable           | `Boolean` | `true`       | Whether to enable drag and drop.                                                       |
| mousewheel-control   | `Boolean` | `true`       | Set to `true` to enable navigation through slides using mouse wheel.                   |
| pagination-visible   | `Boolean` | `false`      | Toggle (hide/true) pagination container visibility when click on Slider's container.   |
| pagination-clickable | `Boolean` | `false`      | If true then clicking on pagination button will cause transition to appropriate slide. |
| performance-mode     | `Boolean` | `true`       | Disable advance effect for better performance.                                         |
| loop                 | `Boolean` | `false`      | Set to `true` to enable continuous loop mode.                                          |
| interval             | `Number`  | `3000`       | Trigger the next round of play time, ` auto ` is ` true ` available                    |
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