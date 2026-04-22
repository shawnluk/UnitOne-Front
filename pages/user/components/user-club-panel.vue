<template>
  <view class="circle-section">
    <view class="circle-header">
      <text class="circle-title">{{ title }}</text>
      <text class="circle-more">{{ moreText }}</text>
    </view>
    <view class="circle-item">
      <image class="circle-cover" :src="item.cover" mode="aspectFill"></image>
      <view class="circle-info">
        <view class="circle-name">{{ item.name }}</view>
        <view class="circle-stats">{{ item.stats }}</view>
      </view>
      <view class="circle-badge">{{ item.badge }}</view>
      <view class="circle-top">{{ item.topTag }}</view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'UserClubPanel',
  data() {
    return {
      title: '圈子管理 1',
      moreText: '更多 >',
      item: {
        cover: 'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/real-madrid-ucl-1024x1024.jpg',
        name: '皇马球迷足球活动',
        stats: '0活动 1成员',
        badge: '圈子主',
        topTag: '置顶',
      },
    }
  },
}
</script>

<style scoped>
.circle-section {
  background-color: white;
  margin: 0 20rpx 20rpx;
  padding: 30rpx;
  border-radius: 16rpx;
}

.circle-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20rpx;
}

.circle-title {
  font-size: 32rpx;
  font-weight: bold;
}

.circle-more {
  font-size: 24rpx;
  color: #999;
}

.circle-item {
  display: flex;
  align-items: center;
  gap: 20rpx;
  padding: 20rpx;
  background-color: #f9f9f9;
  border-radius: 12rpx;
}

.circle-cover {
  width: 120rpx;
  height: 120rpx;
  border-radius: 8rpx;
}

.circle-info {
  flex: 1;
}

.circle-name {
  font-size: 28rpx;
  font-weight: bold;
  margin-bottom: 8rpx;
}

.circle-stats {
  font-size: 20rpx;
  color: #999;
}

.circle-badge {
  background-color: #e6f7ff;
  color: #1890ff;
  font-size: 20rpx;
  padding: 4rpx 12rpx;
  border-radius: 12rpx;
}

.circle-top {
  background-color: #fff3cd;
  color: #ff6b00;
  font-size: 20rpx;
  padding: 4rpx 12rpx;
  border-radius: 12rpx;
}
</style>
