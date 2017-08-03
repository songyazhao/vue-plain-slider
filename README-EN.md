# vue-plain-slider

[![vue](https://img.shields.io/badge/vue-2.3.3-brightgreen.svg)](https://github.com/vuejs/vue)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/songyazhao/vue-plain-slider/blob/master/LICENSE)

A simple slider component for Vue.js

[Zh-CN](https://github.com/songyazhao/vue-plain-slider)

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

> Example - complete
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

> Example - The left slide to delete
```html
<template>
  <div>
    <transition-group
      leave-active-class="animated fadeOutLeft">
      <Slider
        ref="Slider"
        direction="horizontal"
        align="right"
        v-for="(item, index) in items"
        :key="index"
        :data-index="index"
        @slide-change-start="onSlideChangeStart"
        @slide-change-end="onSlideChangeEnd"
        :style="{ 'z-index': item.isModify ? 11 : 'auto' }">
          <div class="slider-label">
            <span>{{ item.label }}</span>
          </div>
          <div class="slider-button">
            <div role="edit" @click="onEdit(item, index)">编辑</div>
            <div role="delete" @click="onDelete(item, index)">删除</div>
          </div>
      </Slider>
    </transition-group>
    <div
      class="mask"
      v-show="isShowMask"
      @click="onReSlide">
    </div>
  </div>
</template>

<script>
import Slider from 'vue-plain-slider'

export default {
  name: 'app',
  components: {
    Slider
  },
  data () {
    return {
      items: [{
          label: 'item1',
          isModify: false
        }, {
          label: 'item2',
          isModify: false
        }, {
          label: 'item3',
          isModify: false
        }
      ]
    }
  },
  computed: {
    isShowMask() {
      return this.items.some(item => item.isModify === true)
    },
    currentIndex() {
      let i = false
      this.items.forEach((item, index) => {
        item.isModify === true && (i = index)
      })
      return i
    }
  },
  methods: {
    onSlideChangeStart(currentPage, el) {
      let currentItem = this.items[el.dataset['index']]

      if (currentPage === 2)
        currentItem.isModify = true
      else if (currentPage === 1)
        currentItem.isModify = false
    },
    onSlideChangeEnd(currentPage, el) {},
    onEdit(item, index) {},
    onDelete(item, index) {
      this.items.splice(index, 1) // 删除对应数据
    },
    onReSlide() { //滑块重置
      this.$refs.Slider[this.currentIndex].setPage(1) // 调用子组件的setPage方法
    }
  }
}
</script>

<style lang="less" scoped>
@import '//libs.cdnjs.net/animate.css/3.5.2/animate.min.css';

.slider {
  height: 82px;
  line-height: 82px;
  text-align: center;
  margin-top: 5px;
  .slider-label {
    width: 100%;
    font-size: 18px;
    background-color: white;
    box-sizing: border-box;
    border: 1px solid #E8E8E8;
    display: flex;
    align-items: center;
    span {
      padding-left: 12px;
    }
    img {
      width: 46px;
      height: 46px;
      margin-left: 18px;
    }
  }
  .slider-button {
    width: 128px;
    color: white;
    display: flex;
    div {
      flex: 1;
      text-align: center;
      &[role="edit"] {
        background-color: #D1D1D1;
      }
      &[role="delete"] {
        background-color: #FF5A60;
      }
    }
  }
}
.mask {
  background: transparent;
  // background: rgba(0, 0, 0, .3);
  z-index: 10;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
}
</style>
```

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
| -------------------- | --------- | ------------ | ------------------- |

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