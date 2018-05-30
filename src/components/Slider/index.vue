<style lang="less">
@import "./index.less";
</style>

<template>
	<div class="slider"
		:class="[direction, {'dragging': dragging}]"
		ref="slider"
		@touchstart="_onTouchStart"
		@mousedown="_onTouchStart"
		@wheel="_onWheel">
		<div class="slider-wrap"
			ref="sliderWrap"
			:style="{
				'transform' : 'translate3d(' + translateX + 'px,' + translateY + 'px, 0)',
				'transition-duration': transitionDuration + 'ms'
			}"
			@transitionend="_onTransitionEnd">
			<slot></slot>
		</div>
		<div class="slider-pagination"
			v-show="paginationVisible">
			<span class="slider-pagination-bullet"
				:class="{'active': index+1===currentPage}"
				v-for="(slide, index) in slideEls"
				:key="index"
				@click="paginationClickable && setPage(index+1)"></span>
		</div>
	</div>
</template>

<script>
const VERTICAL = 'vertical'
const HORIZONTAL = 'horizontal'
const LEFT = 'left'
const RIGHT = 'right'

export default {
  props: {
    // 对齐方向
    align: {
      type: String,
      default: LEFT,
      validator: (value) => [LEFT, RIGHT].indexOf(value) > -1
    },
    // 是否自动轮播
    auto: {
      type: Boolean,
      default: false
    },
    // 可以设置默认第几个
    curPage: {
      type: Number,
      default: 1
    },
    // 轮播方向
    direction: {
      type: String,
      default: VERTICAL,
      validator: (value) => [VERTICAL, HORIZONTAL].indexOf(value) > -1
    },
    // 启用拖拽
    dragEnable: {
      type: Boolean,
      default: true
    },
    // 是否启用滚轮控制
    mousewheelControl: {
      type: Boolean,
      default: true
    },
    performanceMode: {
      type: Boolean,
      default: true
    },
    // 是否显示分页
    paginationVisible: {
      type: Boolean,
      default: false
    },
    // 分页是否可点击
    paginationClickable: {
      type: Boolean,
      default: false
    },
    // 是否循环轮播
    loop: {
      type: Boolean,
      default: false
    },
    // 循环轮播时间，`auto`为`true`时生效
    interval: {
      type: Number,
      default: 3000
    },
    // 到下一个的间隔速度
    speed: {
      type: Number,
      default: 500
    }
  },
  data() {
    return {
      currentPage: this.curPage,
      lastPage: 1,
      translateX: 0,
      translateY: 0,
      startTranslate: 0,
      delta: 0,
      dragging: false,
      startPos: null,
      transitioning: false,
      slideEls: [],
      translateOffset: 0,
      transitionDuration: 0
    }
  },
  watch: {
    currentPage(newVal) {
      this.$emit('update:curPage', newVal)
    }
  },
  mounted() {
    this._onTouchMove = this._onTouchMove.bind(this)
    this._onTouchEnd = this._onTouchEnd.bind(this)
    this.slideEls = [].map.call(this.$refs.sliderWrap.children, el => el)
    if (this.loop) {
      this.$nextTick(() => {
        this._createLoop()
        this.setPage(this.currentPage, true)
      })
    } else {
      this.setPage(this.currentPage)
    }
    if (this.auto) {
      this._autoMove()
    }
  },
  methods: {
    next() {
      let page = this.currentPage
      if (page < this.slideEls.length || this.loop) {
        this.setPage(page + 1)
      } else {
        this._revert()
      }
    },
    prev() {
      let page = this.currentPage
      if (page > 1 || this.loop) {
        this.setPage(page - 1)
      } else {
        this._revert()
      }
    },
    setPage(page, noAnimation) {
      let _ = this
      this.lastPage = this.currentPage
      if (page === 0) {
        this.currentPage = this.slideEls.length
      } else if (page === this.slideEls.length + 1) {
        this.currentPage = 1
      } else {
        this.currentPage = page
      }
      if (this.loop) {
        if (this.delta === 0) {
          this._setTranslate(_._getTranslateOfPage(this.lastPage))
        }
        setTimeout(() => {
          _._setTranslate(_._getTranslateOfPage(page))
          if (noAnimation) return
          _._onTransitionStart()
        }, 0)
      } else {
        this._setTranslate(this._getTranslateOfPage(page))
        if (noAnimation) return
        this._onTransitionStart()
      }
    },
    isHorizontal() {
      return this.direction === HORIZONTAL
    },
    isVertical() {
      return this.direction === VERTICAL
    },
    _onTouchStart(e) {
      if (!this.dragEnable) return
      this.startPos = this._getTouchPos(e)
      this.delta = 0
      this.startTranslate = this._getTranslateOfPage(this.currentPage)
      this.startTime = new Date().getTime()
      this.dragging = true
      this.transitionDuration = 0
      document.addEventListener('touchmove', this._onTouchMove, false)
      document.addEventListener('touchend', this._onTouchEnd, false)
      document.addEventListener('mousemove', this._onTouchMove, false)
      document.addEventListener('mouseup', this._onTouchEnd, false)
    },
    _onTouchMove(e) {
      this.delta = this._getTouchPos(e) - this.startPos
      if (this.performanceMode) {
        this._setTranslate(this.startTranslate + this.delta)
        this.$emit('slider-move', this._getTranslate())
      }
      if (this.isVertical() || (this.isHorizontal() && Math.abs(this.delta) > 0)) {
        e.preventDefault()
      }
    },
    _onTouchEnd(e) {
      this.dragging = false
      this.transitionDuration = this.speed
      let isQuickAction = new Date().getTime() - this.startTime < 1000
      if (this.delta < -100 || (isQuickAction && this.delta < -15)) {
        this.next()
      } else if (this.delta > 100 || (isQuickAction && this.delta > 15)) {
        this.prev()
      } else {
        this._revert()
      }
      document.removeEventListener('touchmove', this._onTouchMove)
      document.removeEventListener('touchend', this._onTouchEnd)
      document.removeEventListener('mousemove', this._onTouchMove)
      document.removeEventListener('mouseup', this._onTouchEnd)
    },
    _onWheel(e) {
      if (this.mousewheelControl) {
        // TODO Support apple magic mouse and trackpad.
        if (!this.transitioning) {
          if (e.deltaY > 0) {
            this.next()
          } else {
            this.prev()
          }
        }
        if (this._isPageChanged()) e.preventDefault()
      }
    },
    _revert() {
      this.setPage(this.currentPage)
    },
    _getTouchPos(e) {
      let key = this.isHorizontal() ? 'pageX' : 'pageY'
      return e.changedTouches ? e.changedTouches[0][key] : e[key]
    },
    _onTransitionStart() {
      this.transitioning = true
      this.transitionDuration = this.speed
      if (this._isPageChanged()) {
        this.$emit('slide-change-start', this.currentPage, this.$refs.slider)
      } else {
        this.$emit('slide-revert-start', this.currentPage, this.$refs.slider)
      }
    },
    _onTransitionEnd() {
      this.transitioning = false
      this.transitionDuration = 0
      this.delta = 0
      if (this._isPageChanged()) {
        this.$emit('slide-change-end', this.currentPage, this.$refs.slider)
      } else {
        this.$emit('slide-revert-end', this.currentPage, this.$refs.slider)
      }
    },
    _isPageChanged() {
      return this.lastPage !== this.currentPage
    },
    _setTranslate(value) {
      let translateName = this.isHorizontal() ? 'translateX' : 'translateY'
      this[translateName] = value
    },
    _getTranslate() {
      let translateName = this.isHorizontal() ? 'translateX' : 'translateY'
      return this[translateName]
    },
    _getTranslateOfPage(page) {
      if (page === 0) return 0
      let propName = this.isHorizontal() ? 'clientWidth' : 'clientHeight'
      return -[].reduce.call(this.slideEls, (total, el, i) => {
        if (this.align === 'left') {
          return i > page - 2 ? total : total + el[propName]
        } else if (this.align === 'right') {
          return i === 0 || i >= page ? total : total + el[propName]
        }
      }, 0) + this.translateOffset
    },
    // 自动进行轮播
    _autoMove() {
      if (this.loop) {
        setInterval(this.next, this.interval)
      } else {
        let i = 1
        const size = this.$el.children.length
        setInterval(() => {
          this.setPage(i = i < size ? (i + 1) : 1)
        }, this.interval)
      }
    },
    // 创建循环滚动的Dom
    _createLoop() {
      let propName = this.isHorizontal() ? 'clientWidth' : 'clientHeight'
      let sliderWrapEl = this.$refs.sliderWrap
      let duplicateFirstChild = sliderWrapEl.firstElementChild.cloneNode(true)
      let duplicateLastChild = sliderWrapEl.lastElementChild.cloneNode(true)
      sliderWrapEl.insertBefore(duplicateLastChild, sliderWrapEl.firstElementChild)
      sliderWrapEl.appendChild(duplicateFirstChild)
      this.translateOffset = -duplicateLastChild[propName]
    }
  }
}
</script>
