# vue-plain-slider

[![vue](https://img.shields.io/badge/vue-2.0+-brightgreen.svg)](https://github.com/vuejs/vue)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/songyazhao/vue-plain-slider/blob/master/LICENSE)
[![downloads](https://img.shields.io/npm/dt/vue-plain-slider.svg)](https://www.npmjs.com/package/vue-plain-slider)

一个基于Vue的简单滑块/轮播组件

[English Document](https://github.com/songyazhao/vue-plain-slider/blob/master/README-EN.md)

## 特性

* 轻量级, 无其他依赖
* 导航, 分页 和 箭头
* 触摸、鼠标控制
* 水平或者垂直滑动, 左或右对齐

## 安装

```bash
npm install --save vue-plain-slider # Or yarn add vue-plain-slider
```

## 使用

> [基础用法](https://github.com/songyazhao/vue-plain-slider/blob/master/src/views/Demo/Basic.vue)
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

## 更多Demo

* [完整实例](https://github.com/songyazhao/vue-plain-slider/blob/master/src/views/Demo/Full.vue)

*垂直*

![Vertical.gif](http://ohef3m3y6.bkt.clouddn.com/vue-plain-slider/Vertical.gif)

*水平*

![Horizontal.gif](http://ohef3m3y6.bkt.clouddn.com/vue-plain-slider/Horizontal.gif)

*循环*

![Loop-Mode.gif](http://ohef3m3y6.bkt.clouddn.com/vue-plain-slider/Loop-Mode.gif)

*子元素不固定大小*

![Different-Children-Size.gif](http://ohef3m3y6.bkt.clouddn.com/vue-plain-slider/Different-Children-Size.gif)

*嵌套宫格式*

![Nested-Grid-Slider.gif](http://ohef3m3y6.bkt.clouddn.com/vue-plain-slider/Nested-Grid-Slider.gif)

* [如果你想做一个左滑删除的效果](https://github.com/songyazhao/vue-plain-slider/blob/master/src/views/Demo/LeftSliderDelete.vue)

![left-slider-delete.gif](http://ohef3m3y6.bkt.clouddn.com/vue-plain-slider/left-slider-delete.gif)

## Api
### Properties
| Name                 | Type      | Default      | Description                                                 |
|----------------------|-----------|--------------|-------------------------------------------------------------|
| align                | `String`  | `"left"`     | 对齐方向，`direction`为`'horizontal'`时有效，可选 `'left'`、`'right'`。|
| auto                 | `Boolean` | `false`      | 是否自动轮播。                                               |
| asyncData            | `Array`、`Boolean` | `false` | 为`false`时表示数据不需要异步，当数据为异步获取或者需要动态改变的时，必须加此属性，值为与v-for绑定的同一字段 |
| curPage              | `Number`  | `1`          | 设置默认从第几个开始。                                        |
| direction            | `String`  | `"vertical"` | 滑动方向，可选 `'horizontal'`(水平) 或者 `'vertical'`(垂直)。  |
| dragEnable           | `Boolean` | `true`       | 是否启用拖拽。                                               |
| mousewheel-control   | `Boolean` | `true`       | 设置为 `true` 使slider可以通过鼠标滚轮控制。                   |
| pagination-visible   | `Boolean` | `false`      | 是否显示切换的分页 (hide/true)。                              |
| pagination-clickable | `Boolean` | `false`      | 如果为 true 点击分页切换到对应的滑块。                         |
| performance-mode     | `Boolean` | `true`       | 是否启用过渡,关闭过渡会提升相应的渲染性能。                     |
| loop                 | `Boolean` | `false`      | 是否启用轮播模式。                                            |
| interval             | `Number`  | `3000`       | 触发下一次轮播的时间，`auto`为`true`时有效                     |
| speed                | `Number`  | `500`        | 滑块之间的过渡时间。                                          |

### Methods
| Method            | Description              |
|-------------------|--------------------------|
| next()            | 下一个滑块。             |
| prev()            | 上一个滑块。             |
| setPage(`Number`) | 跳到指定页数的滑块。     |

### Events
| Name                            | Arguments | Description                           |
|--------------------|------------------------|---------------------------------------|
| slide-change-start | `pageNumber` `element` | 动画之前触发(到下一个或上一个滑块)。  |
| slide-change-end   | `pageNumber` `element` | 动画之后触发(到下一个或上一个滑块)。  |
| slide-revert-start | `pageNumber` `element` | 动画之前触发(没有变化)。              |
| slide-revert-end   | `pageNumber` `element` | 动画之后触发(没有变化)。              |
| slider-move        | `offset`               | 回调函数,触摸移动过程中触发。         |

## License

[MIT](https://github.com/songyazhao/vue-plain-slider/blob/master/LICENSE)
