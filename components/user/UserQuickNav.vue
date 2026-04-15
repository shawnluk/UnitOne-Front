<template>
  <view class="nav-section">
    <view class="nav-item" v-for="item in items" :key="item.label">
      <text class="nav-icon">{{ item.icon }}</text>
      <text class="nav-label">{{ item.label }}</text>
    </view>
  </view>
</template>

<script>
export default {
  name: 'UserQuickNav',
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style scoped>
.nav-section {
  background-color: white;
  margin: 20rpx;
  padding: 30rpx;
  border-radius: 16rpx;
  display: flex;
  justify-content: space-around;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10rpx;
}

.nav-icon {
  font-size: 48rpx;
}

.nav-label {
  font-size: 24rpx;
  color: #666;
}
</style>
