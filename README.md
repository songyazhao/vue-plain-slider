# vue-plain-slider

[![vue](https://img.shields.io/badge/vue-2.3.3-brightgreen.svg)](https://github.com/vuejs/vue)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/songyazhao/vue-plain-slider/blob/master/LICENSE)

一个基于Vue的简单滑块组件

[English](https://github.com/songyazhao/vue-plain-slider/blob/master/README-EN.md)

## 特性

* 轻量级, 无其他依赖
* 导航, 分页 和 箭头
* 触摸、鼠标控制
* 水平或者垂直滑动, 左或右对齐

## 安装
```
npm install --save vue-plain-slider
```

## 使用

> 完整实例
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

> 如果你想做一个左滑删除的效果
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
| Name                 | Type      | Default      | Description                                               |
|----------------------|-----------|--------------|-----------------------------------------------------------|
| direction            | `String`  | `"vertical"` | 可选值 'horizontal'(水平滑块) 或者 'vertical'(垂直滑块)。
																									|
| align			           | `String`  | `"left"`			| 可选值 'left'(左对齐) 或者 'right'(右对齐)。
																									|
| mousewheel-control   | `Boolean` | `true`       | 设置为 true 使slider可以通过鼠标滚轮控制。
																									|
| pagination-visible   | `Boolean` | `false`      | 是否显示切换的分页 (hide/true)。
																									|
| pagination-clickable | `Boolean` | `false`      | 如果为 true 点击分页切换到对应的滑块。
																									|
| transition-mode      | `Boolean` | `true`      	| 是否启用过渡,关闭过渡会提升相应的渲染性能。
																									|
| loop                 | `Boolean` | `false`      | 是否轮播。
																									|
| speed                | `Number`  | `500`        | 设置滑块之间的过渡时间。
																									|
| ==================== | ========= | ============ | =================== |

### Methods
| Method            | Description              |
|-------------------|--------------------------|
| next()            | 下一个滑块。           		|
| prev()            | 上一个滑块。       				|
| setPage(`Number`) | 跳到指定页数的滑块。			 |

### Events
| Name                            | Arguments | Description																										 |
|--------------------|------------|----------------------------------------------------------------------------|
| slide-change-start | `pageNumber` `element` | 动画之前触发(到下一个或上一个滑块)。
                                        			|
| slide-change-end   | `pageNumber` `element` | 动画之后触发(到下一个或上一个滑块)。
                                        			|
| slide-revert-start | `pageNumber` `element` | 动画之前触发(没有变化)。
                                        			|
| slide-revert-end   | `pageNumber` `element` | 动画之后触发(没有变化)。
                                        			|
| slider-move        | `offset`         			| 回调函数,触摸移动过程中触发。
																							|
| ================== | ====================== | ============================ |

## License

MIT