<template>
  <view>
    <view class="user-header">
      <view class="user-info">
        <image
          class="avatar"
          :src="avatarUrl"
          mode="aspectFill"
          @click="$emit('avatar-click')"
        ></image>
        <view class="user-details">
          <view
            class="username"
            :class="{ guest: !isLoggedIn }"
            @click="$emit('username-click')"
          >{{ displayName }}</view>
          <view class="user-id">取伙号：987627983 <text class="id-tag">🟠</text></view>
          <view class="user-badges">
            <text class="badge">🔄1年</text>
            <text class="badge">🎪</text>
            <text class="badge">🛡️</text>
          </view>
        </view>
      </view>
    </view>

    <view class="member-section">
      <view class="member-content">
        <view class="member-title">成为会员</view>
        <view class="member-desc">付费一场活动，立即成为取伙会员</view>
      </view>
      <view class="member-link">查看会员权益 ></view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'UserHeaderPanel',
  props: {
    avatarUrl: {
      type: String,
      required: true,
    },
    displayName: {
      type: String,
      required: true,
    },
    isLoggedIn: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style scoped>
.user-header {
  position: relative;
  background-image: url('https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/TopBar/TopBar.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: white;
  padding: 40rpx 30rpx 30rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
}

.user-header::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  z-index: 0;
}

.user-header {
  position: relative;
  z-index: 1;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 20rpx;
}

.avatar {
  width: 120rpx;
  height: 120rpx;
  border-radius: 50%;
  border: 2rpx solid white;
  overflow: hidden;
}

.user-details {
  flex: 1;
}

.username {
  font-size: 36rpx;
  font-weight: bold;
  margin-bottom: 8rpx;
}

.username.guest {
  text-decoration: underline;
  opacity: 0.95;
}

.user-id {
  font-size: 24rpx;
  opacity: 0.8;
  margin-bottom: 10rpx;
}

.id-tag {
  font-size: 20rpx;
}

.user-badges {
  display: flex;
  gap: 12rpx;
}

.badge {
  font-size: 20rpx;
  background-color: rgba(255, 255, 255, 0.2);
  padding: 4rpx 8rpx;
  border-radius: 12rpx;
}

.member-section {
  background-color: #e6f7ff;
  margin: 20rpx;
  padding: 30rpx;
  border-radius: 16rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.member-content {
  flex: 1;
}

.member-title {
  font-size: 32rpx;
  font-weight: bold;
  margin-bottom: 10rpx;
}

.member-desc {
  font-size: 24rpx;
  color: #666;
}

.member-link {
  color: #1890ff;
  font-size: 24rpx;
}
</style>
