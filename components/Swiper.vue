<template>
  <view class="swiper-container">
    <swiper 
      class="swiper" 
      :indicator-dots="indicatorDots" 
      :autoplay="autoplay" 
      :interval="interval" 
      :duration="duration"
      :circular="circular"
      :indicator-color="indicatorColor"
      :indicator-active-color="indicatorActiveColor"
      @change="onChange"
      @animationfinish="onAnimationfinish"
    >
      <swiper-item v-for="(item, index) in swiperList" :key="index" @click="onItemClick(item, index)">
        <image 
          :src="item.image" 
          class="swiper-image" 
          mode="aspectFill"
          @error="onImageError"
        />
        <view v-if="item.title" class="swiper-title">{{ item.title }}</view>
      </swiper-item>
    </swiper>
    
    <!-- 自定义指示器 -->
    <view v-if="customIndicator" class="custom-indicator">
      <view 
        v-for="(item, index) in swiperList" 
        :key="index"
        class="indicator-dot"
        :class="{ active: currentIndex === index }"
        @click="goToIndex(index)"
      ></view>
    </view>
    
    <!-- 左右切换按钮 -->
    <view v-if="showNavigation" class="navigation-buttons">
      <view class="nav-btn prev-btn" @click="prevSlide">
        <text class="nav-icon">‹</text>
      </view>
      <view class="nav-btn next-btn" @click="nextSlide">
        <text class="nav-icon">›</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'Swiper',
  props: {
    // 轮播图数据
    swiperList: {
      type: Array,
      default: () => [
        {image:"../static/e_000102_r_ll.png"},
        {image:"../static/e_000103_r.png"},
        {image:"../static/e_000100_r_w.png"},
      ]
    },
    // 是否显示指示器
    indicatorDots: {
      type: Boolean,
      default: true
    },
    // 是否自动播放
    autoplay: {
      type: Boolean,
      default: true
    },
    // 自动切换时间间隔
    interval: {
      type: Number,
      default: 3000
    },
    // 滑动动画时长
    duration: {
      type: Number,
      default: 500
    },
    // 是否循环播放
    circular: {
      type: Boolean,
      default: true
    },
    // 指示器颜色
    indicatorColor: {
      type: String,
      default: 'rgba(255, 255, 255, 0.6)'
    },
    // 当前选中的指示器颜色
    indicatorActiveColor: {
      type: String,
      default: '#ffffff'
    },
    // 是否显示自定义指示器
    customIndicator: {
      type: Boolean,
      default: false
    },
    // 是否显示导航按钮
    showNavigation: {
      type: Boolean,
      default: false
    },
    // 轮播图高度
    height: {
      type: String,
      default: '300rpx'
    }
  },
  data() {
    return {
      currentIndex: 0
    }
  },
  methods: {
    // 轮播图切换事件
    onChange(e) {
      this.currentIndex = e.detail.current
      this.$emit('change', {
        current: e.detail.current,
        source: e.detail.source
      })
    },
    // 动画结束事件
    onAnimationfinish(e) {
      this.$emit('animationfinish', {
        current: e.detail.current,
        source: e.detail.source
      })
    },
    // 点击轮播图项
    onItemClick(item, index) {
      this.$emit('itemClick', {
        item,
        index
      })
    },
    // 图片加载错误
    onImageError(e) {
      this.$emit('imageError', e)
    },
    // 跳转到指定索引
    goToIndex(index) {
      this.currentIndex = index
      // 这里可以通过ref调用swiper的方法来跳转
      this.$emit('goToIndex', index)
    },
    // 上一张
    prevSlide() {
      const prevIndex = this.currentIndex === 0 ? this.swiperList.length - 1 : this.currentIndex - 1
      this.goToIndex(prevIndex)
    },
    // 下一张
    nextSlide() {
      const nextIndex = this.currentIndex === this.swiperList.length - 1 ? 0 : this.currentIndex + 1
      this.goToIndex(nextIndex)
    }
  }
}
</script>

<style scoped>
.swiper-container {
  position: relative;
  width: 100%;
}

.swiper {
  width: 100%;
  height: v-bind(height);
}

.swiper-image {
  width: 100%;
  height: 100%;
}

.swiper-title {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  color: #ffffff;
  padding: 20rpx;
  font-size: 28rpx;
  line-height: 1.4;
}

/* 自定义指示器样式 */
.custom-indicator {
  position: absolute;
  bottom: 20rpx;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 16rpx;
}

.indicator-dot {
  width: 16rpx;
  height: 16rpx;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.6);
  transition: all 0.3s ease;
}

.indicator-dot.active {
  background-color: #ffffff;
  transform: scale(1.2);
}

/* 导航按钮样式 */
.navigation-buttons {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  display: flex;
  justify-content: space-between;
  padding: 0 20rpx;
  pointer-events: none;
}

.nav-btn {
  width: 60rpx;
  height: 60rpx;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: auto;
  transition: all 0.3s ease;
}

.nav-btn:hover {
  background-color: rgba(0, 0, 0, 0.5);
}

.nav-icon {
  color: #ffffff;
  font-size: 40rpx;
  font-weight: bold;
  line-height: 1;
}
</style> 