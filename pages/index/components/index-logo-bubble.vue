<template>
  <view class="logoBubbleWrap" @click="handleClick">
    <image src="/static/logo.png" mode="aspectFit" class="logoIcon"></image>
    <view
      v-for="bubble in bubbleList"
      :key="bubble.id"
      class="bubbleItem"
      :style="{
        left: bubble.left + 'rpx',
        animationDelay: bubble.delay + 'ms',
        animationDuration: bubble.duration + 'ms',
      }"
    >
      HiGo
    </view>
  </view>
</template>

<script>
export default {
  name: 'IndexLogoBubble',
  data() {
    return {
      bubbleSeed: 0,
      bubbleList: [],
    }
  },
  methods: {
    handleClick() {
      const now = Date.now()
      const bubbles = Array.from({ length: 6 }, (_, index) => {
        const id = `${now}-${this.bubbleSeed + index}`
        return {
          id,
          left: 10 + Math.round(Math.random() * 90),
          delay: index * 45,
          duration: 950 + Math.round(Math.random() * 300),
        }
      })
      this.bubbleSeed += bubbles.length
      this.bubbleList = [...this.bubbleList, ...bubbles]
      setTimeout(() => {
        const ids = new Set(bubbles.map((item) => item.id))
        this.bubbleList = this.bubbleList.filter((item) => !ids.has(item.id))
      }, 1400)
      this.$emit('logo-click')
    },
  },
}
</script>

<style scoped>
.logoIcon {
  width: 120rpx;
  height: 120rpx;
  margin-right: 14rpx;
  align-self: center;
  margin-top: 10rpx;
}

.logoBubbleWrap {
  position: relative;
  width: 120rpx;
  height: 120rpx;
  margin-top: 10rpx;
  margin-right: 14rpx;
  flex-shrink: 0;
}

.bubbleItem {
  position: absolute;
  bottom: 22rpx;
  padding: 6rpx 16rpx;
  border-radius: 999rpx;
  font-size: 20rpx;
  line-height: 1;
  font-weight: 700;
  color: #7f3dff;
  background: rgba(255, 255, 255, 0.95);
  border: 1rpx solid rgba(127, 61, 255, 0.25);
  box-shadow: 0 10rpx 20rpx rgba(127, 61, 255, 0.15);
  transform: translate(-50%, 0) scale(0.9);
  pointer-events: none;
  animation-name: logoBubbleFloat;
  animation-timing-function: ease-out;
  animation-fill-mode: forwards;
}

@keyframes logoBubbleFloat {
  0% {
    opacity: 0;
    transform: translate(-50%, 0) scale(0.8);
  }
  15% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -150rpx) scale(1.18);
  }
}
</style>
