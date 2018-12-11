<template>
  <div>
    <h2>vue-plain-slider DEMO</h2>

    <h3>Vertical</h3>
    <Slider
      id="slider_vertical"
      :pagination-visible="true"
      @slide-change-start="onSlideChangeStart"
      @slide-change-end="onSlideChangeEnd"
      @slide-revert-start="onSlideRevertStart"
      @slide-revert-end="onSlideRevertEnd"
      @slider-move="onSliderMove">
        <div class="slide-1">↑<br>o<br>↓</div>
        <div v-for="(n, i) in [2, 3, 4]" :key="i">Page {{n}}</div>
    </Slider>

    <h3>Append Child</h3>
    <div id="append_child">
      <button @click="appendSlide('New Page!')">Append child to the horizontal slider</button>
    </div>

    <h3>Horizontal</h3>
    <Slider
      id="slider_horizontal"
      :pagination-visible="true"
      :pagination-clickable="true"
      :async-data="slides"
      direction="horizontal">
        <div v-for="(slideText, i) in slides" :key="i">{{slideText}}</div>
    </Slider>

    <h3>Loop Mode / Infinite Loop</h3>
    <Slider
      id="slider_loop"
      :loop="true"
      :pagination-visible="true"
      direction="horizontal">
        <div v-for="(slideText, i) in slides" :key="i">{{slideText}}</div>
    </Slider>

    <h3>Different children size</h3>
    <Slider id="slider_children_size">
      <div class="slide-1">↑<br>o<br>↓</div>
      <div v-for="(n, i) in [2, 3, 4]" :key="i" :class="'slide-' + n">Page {{n}}</div>
    </Slider>

    <h3>Nested slider</h3>
    <Slider id="slider_nested"
            direction="horizontal"
            @slide-change-start="onSlideChangeStart"
            @slide-change-end="onSlideChangeEnd">
      <div class="slide-1">
        <Slider
          class="slider-nested-inner"
          direction="vertical">
            <div class="slide-1">1-1</div>
            <div class="slide-2">1-2</div>
            <div class="slide-3">1-3</div>
        </Slider>
      </div>
      <div class="slide-2">
        <Slider
          class="slider-nested-inner"
          direction="vertical">
            <div class="slide-1">2-1</div>
            <div class="slide-2">2-2</div>
            <div class="slide-3">2-3</div>
        </Slider>
      </div>
      <div class="slide-3">
        <Slider
          class="slider-nested-inner"
          direction="vertical">
            <div class="slide-1">3-1</div>
            <div class="slide-2">3-2</div>
            <div class="slide-3">3-3</div>
        </Slider>
      </div>
    </Slider>
  </div>
</template>

<script>
import Slider from 'vue-plain-slider'

export default {
  name: 'slider-demo',
  components: { Slider },
  data () {
    return {
      slides: ['← o →', 'Page 2', 'Page 3', 'Page 4']
    }
  },
  methods: {
    onSlideChangeStart: function (currentPage, el) {
      console.log('onSlideChangeStart', currentPage, el)
    },
    onSlideChangeEnd: function (currentPage, el) {
      console.log('onSlideChangeEnd', currentPage, el)
    },
    onSlideRevertStart: function (currentPage, el) {
      console.log('onSlideRevertStart', currentPage, el)
    },
    onSlideRevertEnd: function (currentPage, el) {
      console.log('onSlideRevertEnd', currentPage, el)
    },
    onSliderMove: function (offset) {
      console.log('onSliderMove', offset)
    },
    prependSlide: function (slideText) {
      this.slides.unshift(slideText)
    },
    appendSlide: function (slideText) {
      this.slides.push(slideText)
    },
    removeSlide: function () { }
  }
}
</script>

<style lang="less" scoped>
h2, h3 {
  text-align: center;
}
.slider {
  height: 200px;
  margin-bottom: 80px;
  .slider-wrap {
    div {
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      font-size: 48px;
      color: #fff;
      &:nth-child(3n) {
        background-color: skyblue;
      }
      &:nth-child(3n + 1) {
        background-color: yellowgreen;
      }
      &:nth-child(3n + 2) {
        background-color: rosybrown;
      }
    }
  }
}
#slider_children_size {
  height: 400px;
  .slide-1 {
    height: 200px;
  }
  .slide-2 {
    height: 150px;
  }
  .slide-3 {
    height: 100px;
  }
  .slide-4 {
    height: 350px;
  }
}
.slider-nested-inner {
  width: 100%;
  height: 100%;
  margin-bottom: 0;
}
// #append_child {
//   text-align: center;
//   margin-bottom: 80px;
//   button {
//     background-color: skyblue;
//     color: white;
//     padding: 0.5rem 1.2rem;
//     font-size: 1rem;
//     border-radius: 0.3rem;
//     transition: all 0.25s ease;
//     box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
//     outline: none;
//     appearance: none;
//     border: none;
//     cursor: pointer;
//     &:hover {
//       background-color: #fff;
//       color: #000;
//       box-shadow: 0 0 40px rgba(0, 0, 0, 0.5);
//       transform: scale(1.05);
//     }
//     &:active {
//       background-color: #ddd;
//       color: #333;
//       box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
//       transform: scale(1);
//     }
//   }
// }
</style>
