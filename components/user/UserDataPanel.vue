<template>
  <view class="data-section">
    <view class="data-item" v-for="item in items" :key="item.label">
      <view class="data-number">{{ item.value }}</view>
      <view class="data-label">{{ item.label }}</view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'UserDataPanel',
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style scoped>
.data-section {
  background-color: white;
  margin: 0 20rpx 20rpx;
  padding: 30rpx;
  border-radius: 16rpx;
  display: flex;
  justify-content: space-around;
}

.data-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10rpx;
}

.data-number {
  font-size: 32rpx;
  font-weight: bold;
}

.data-label {
  font-size: 24rpx;
  color: #666;
}
</style>
