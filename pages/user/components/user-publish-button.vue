<template>
  <button class="publish-btn" :class="{ 'is-bubbling': isBubbling }" @click="$emit('click')">
    <view class="bubble-layer">
      <view v-for="n in 6" :key="n" class="bubble-item">
        <text class="bubble-text">HiGo</text>
      </view>
    </view>
    <text class="publish-icon">+</text>
    <text class="publish-text">发布</text>
  </button>
</template>

<script>
export default {
  name: 'UserPublishButton',
  props: {
    isBubbling: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style scoped>
.publish-btn {
  position: fixed;
  bottom: 180rpx;
  left: 30rpx;
  background: linear-gradient(145deg, #56b6ff 0%, #2d8cff 58%, #1677ff 100%);
  color: #ffffff;
  width: 120rpx;
  height: 120rpx;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2rpx solid rgba(255, 255, 255, 0.7);
  box-shadow: 0 14rpx 30rpx rgba(22, 119, 255, 0.26), 0 6rpx 14rpx rgba(86, 182, 255, 0.2);
  overflow: visible;
  transition: transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease;
  z-index: 99;
}

.bubble-layer {
  position: absolute;
  left: 50%;
  bottom: 88rpx;
  width: 180rpx;
  height: 160rpx;
  transform: translateX(-50%);
  pointer-events: none;
  z-index: 1;
}

.bubble-item {
  position: absolute;
  bottom: 20rpx;
  left: 50%;
  min-width: 44rpx;
  height: 28rpx;
  padding: 0 10rpx;
  border-radius: 999rpx;
  opacity: 0;
  transform: translateX(-50%) scale(0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.96) 0%, rgba(222, 241, 255, 0.96) 60%, rgba(156, 209, 255, 0.9) 100%);
  box-shadow: 0 4rpx 12rpx rgba(22, 119, 255, 0.28);
  border: 1rpx solid rgba(255, 255, 255, 0.85);
}

.bubble-text {
  font-size: 14rpx;
  line-height: 1;
  font-weight: 700;
  color: #1677ff;
  letter-spacing: 1rpx;
}

.publish-btn::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 18rpx;
  height: 18rpx;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.55) 0%, rgba(255, 255, 255, 0) 72%);
  transform: translate(-50%, -50%) scale(0.6);
  opacity: 0;
  pointer-events: none;
  transition: transform 0.24s ease, opacity 0.24s ease;
}

.publish-btn::after {
  content: '';
  position: absolute;
  top: 8rpx;
  left: 12rpx;
  width: 52rpx;
  height: 24rpx;
  border-radius: 999rpx;
  background: rgba(255, 255, 255, 0.75);
  transform: rotate(-20deg);
  pointer-events: none;
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.publish-btn:active {
  transform: scale(0.95);
  box-shadow: 0 8rpx 18rpx rgba(22, 119, 255, 0.2), 0 4rpx 10rpx rgba(86, 182, 255, 0.16);
  filter: brightness(1.03);
}

.publish-btn:active::before {
  transform: translate(-50%, -50%) scale(10.5);
  opacity: 0.42;
}

.publish-btn:active::after {
  transform: rotate(-20deg) translateX(8rpx);
  opacity: 0.9;
}

.publish-btn.is-bubbling .bubble-item {
  animation-name: bubble-rise;
  animation-duration: 3s;
  animation-timing-function: cubic-bezier(0.2, 0.55, 0.2, 1);
  animation-fill-mode: forwards;
}

.publish-btn.is-bubbling .bubble-item:nth-child(1) {
  --dx: -56rpx;
  --dy: -126rpx;
  --s: 1.1;
  animation-delay: 0s;
}

.publish-btn.is-bubbling .bubble-item:nth-child(2) {
  --dx: -26rpx;
  --dy: -148rpx;
  --s: 0.95;
  min-width: 40rpx;
  height: 26rpx;
  animation-delay: 0.15s;
}

.publish-btn.is-bubbling .bubble-item:nth-child(3) {
  --dx: 0rpx;
  --dy: -136rpx;
  --s: 1.2;
  min-width: 52rpx;
  height: 30rpx;
  animation-delay: 0.32s;
}

.publish-btn.is-bubbling .bubble-item:nth-child(4) {
  --dx: 24rpx;
  --dy: -154rpx;
  --s: 0.9;
  min-width: 38rpx;
  height: 24rpx;
  animation-delay: 0.55s;
}

.publish-btn.is-bubbling .bubble-item:nth-child(5) {
  --dx: 50rpx;
  --dy: -128rpx;
  --s: 1;
  min-width: 46rpx;
  height: 28rpx;
  animation-delay: 0.8s;
}

.publish-btn.is-bubbling .bubble-item:nth-child(6) {
  --dx: 14rpx;
  --dy: -116rpx;
  --s: 0.78;
  min-width: 34rpx;
  height: 22rpx;
  animation-delay: 1.05s;
}

.publish-icon {
  position: relative;
  z-index: 3;
  font-size: 46rpx;
  line-height: 44rpx;
  font-weight: 700;
  text-shadow: 0 2rpx 8rpx rgba(13, 71, 161, 0.2);
  transition: transform 0.2s ease;
}

.publish-text {
  position: relative;
  z-index: 3;
  margin-top: 2rpx;
  font-size: 22rpx;
  line-height: 22rpx;
  font-weight: 600;
  letter-spacing: 2rpx;
  text-shadow: 0 2rpx 8rpx rgba(13, 71, 161, 0.18);
  transition: transform 0.2s ease;
}

.publish-btn:active .publish-icon {
  transform: scale(0.92) rotate(-8deg);
}

.publish-btn:active .publish-text {
  transform: translateY(2rpx);
}

@keyframes bubble-rise {
  0% {
    opacity: 0;
    transform: translate(-50%, 0) scale(0.5);
  }
  15% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translate(calc(-50% + var(--dx, 0rpx)), var(--dy, -120rpx)) scale(var(--s, 1));
  }
}
</style>
