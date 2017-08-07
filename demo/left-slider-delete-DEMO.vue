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
  name: 'left-slider-delete',
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
