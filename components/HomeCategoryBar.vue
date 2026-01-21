<template>
  <view class="hc-wrap">
    <scroll-view scroll-x class="hc-scroll" :show-scrollbar="false">
      <view class="hc-row">
        <view
          v-for="(item, idx) in items"
          :key="idx"
          class="hc-item"
          @click="$emit('select', item, idx)"
		  :style="{color:item.isActive ? 'blue' : 'red'}"
        >
			<view class="hc-icon-box">
				<image class="hc-icon" :src="item.icon" />
				<view v-if="item.badge" class="hc-badge"></view>
			</view>
			<text class="hc-text">{{ item.text }}</text>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
export default {
  name: 'HomeCategoryBar',
  emits:['select'],
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style scoped>
.hc-wrap {
  padding: 18rpx 24rpx 8rpx;
  background: #fff;
}

.hc-scroll {
  white-space: nowrap;
}

.hc-row {
  display: flex;
  align-items: center;
  gap: 18rpx;
  padding-right: 12rpx;
}

.hc-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: space-between; */
  width: 120rpx;
}

.hc-icon-box {
  position: relative;
  width: 104rpx;
  height: 104rpx;
  border-radius: 28rpx;
  background: #ffffff;
  box-shadow: 0 10rpx 26rpx rgba(0, 0, 0, 0.06);
  display: flex;
  align-items: center;
  justify-content: center;
}

.hc-icon {
  width: 62rpx;
  height: 62rpx;
}

.hc-text {
  /* margin-top: 12rpx; */
  font-size: 26rpx;
  /* color: #666; */
}

.hc-badge {
  position: absolute;
  top: 10rpx;
  right: 14rpx;
  width: 16rpx;
  height: 16rpx;
  border-radius: 50%;
  background: #ff3b30;
  border: 3rpx solid #fff;
}
</style>

