<template>
  <view class="stats-section">
    <view class="stats-item" v-for="item in stats" :key="item.label">
      <view class="stats-number">{{ item.value }}</view>
      <view class="stats-label">
        <text class="stats-icon">{{ item.icon }}</text>
        {{ item.label }}
      </view>
    </view>
    <view class="stats-item star-item">
      <view class="star-content">
        <view class="star-title">
          <text class="star-icon">⭐</text>
          伙星
        </view>
        <view class="star-number">{{ starValue }}</view>
      </view>
      <view class="star-btn">待领取</view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'UserStatsPanel',
  props: {
    stats: {
      type: Array,
      default: () => [],
    },
    starValue: {
      type: [String, Number],
      default: 5,
    },
  },
}
</script>

<style scoped>
.stats-section {
  background-color: white;
  margin: 0 20rpx;
  padding: 30rpx;
  border-radius: 16rpx;
  display: flex;
  gap: 20rpx;
}

.stats-item {
  flex: 1;
  text-align: center;
  padding: 20rpx;
  background-color: #f9f9f9;
  border-radius: 12rpx;
}

.stats-number {
  font-size: 36rpx;
  font-weight: bold;
  margin-bottom: 10rpx;
}

.stats-label {
  font-size: 24rpx;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6rpx;
}

.stats-icon {
  font-size: 24rpx;
}

.star-item {
  background-color: #fff3cd;
  position: relative;
}

.star-content {
  text-align: center;
}

.star-title {
  font-size: 24rpx;
  font-weight: bold;
  margin-bottom: 10rpx;
  color: #ff6b00;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6rpx;
}

.star-icon {
  font-size: 24rpx;
}

.star-number {
  font-size: 36rpx;
  font-weight: bold;
  color: #ff6b00;
  margin-bottom: 10rpx;
}

.star-btn {
  background-color: #ff6b00;
  color: white;
  font-size: 20rpx;
  padding: 6rpx 16rpx;
  border-radius: 16rpx;
  position: absolute;
  bottom: 10rpx;
  left: 50%;
  transform: translateX(-50%);
}
</style>
