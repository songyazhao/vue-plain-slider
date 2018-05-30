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
    onSlideChangeStart(currentPage, el) {
      console.log('onSlideChangeStart', currentPage, el)
    },
    onSlideChangeEnd(currentPage, el) {
      console.log('onSlideChangeEnd', currentPage, el)
    }
  }
}
</script>

<style lang="less" scoped>
.slider {
  height: 300px;
}
</style>
