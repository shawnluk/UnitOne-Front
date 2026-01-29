<template>
	
  <view class="user-container">
    <!-- 顶部用户信息区域 -->
    <view class="user-header">
      <view class="user-info">
        <image class="avatar" src="/static/helloworld_01.jpg" mode="aspectFill"></image>
        <view class="user-details">
          <view class="username">shawn</view>
          <view class="user-id">取伙号：987627983 <text class="id-tag">🟠</text></view>
          <view class="user-badges">
            <text class="badge">🔄1年</text>
            <text class="badge">🎪</text>
            <text class="badge">🛡️</text>
          </view>
        </view>
      </view>
      <view class="header-actions">
        <text class="action-btn">...</text>
        <text class="action-btn">—</text>
        <text class="action-btn">⚪</text>
      </view>
    </view>
    
    <!-- 访客标识 -->
    <view class="visitor-badge">
      <text class="visitor-text">访客 ></text>
    </view>
    
    <!-- 成为会员提示 -->
    <view class="member-section">
      <view class="member-content">
        <view class="member-title">成为会员</view>
        <view class="member-desc">付费一场活动，立即成为取伙会员</view>
      </view>
      <view class="member-link">查看会员权益 ></view>
    </view>
    
    <!-- 统计数据区域 -->
    <view class="stats-section">
      <view class="stats-item">
        <view class="stats-number">0</view>
        <view class="stats-label">
          <text class="stats-icon">🔥</text>
          伙柴
        </view>
      </view>
      <view class="stats-item">
        <view class="stats-number">0</view>
        <view class="stats-label">
          <text class="stats-icon">🎫</text>
          伙卡
        </view>
      </view>
      <view class="stats-item star-item">
        <view class="star-content">
          <view class="star-title">
            <text class="star-icon">⭐</text>
            伙星
          </view>
          <view class="star-number">5</view>
        </view>
        <view class="star-btn">待领取</view>
      </view>
    </view>
    
    <!-- 功能导航区 -->
    <view class="nav-section">
      <view class="nav-item">
        <text class="nav-icon">📋</text>
        <text class="nav-label">订单</text>
      </view>
      <view class="nav-item">
        <text class="nav-icon">💰</text>
        <text class="nav-label">钱包</text>
      </view>
      <view class="nav-item">
        <text class="nav-icon">🎧</text>
        <text class="nav-label">客服</text>
      </view>
      <view class="nav-item">
        <text class="nav-icon">⚙️</text>
        <text class="nav-label">设置</text>
      </view>
    </view>
    
    <!-- 个人数据区 -->
    <view class="data-section">
      <view class="data-item">
        <view class="data-number">4</view>
        <view class="data-label">圈子</view>
      </view>
      <view class="data-item">
        <view class="data-number">1</view>
        <view class="data-label">好友</view>
      </view>
      <view class="data-item">
        <view class="data-number">0</view>
        <view class="data-label">历史活动</view>
      </view>
      <view class="data-item">
        <view class="data-number">0</view>
        <view class="data-label">相册</view>
      </view>
    </view>
    
    <!-- 圈子管理区域 -->
    <view class="circle-section">
      <view class="circle-header">
        <text class="circle-title">圈子管理 1</text>
        <text class="circle-more">更多 ></text>
      </view>
      <view class="circle-item">
        <image class="circle-cover" src="/static/real-madrid-ucl-1024x1024.jpg" mode="aspectFill"></image>
        <view class="circle-info">
          <view class="circle-name">皇马球迷足球活动</view>
          <view class="circle-stats">0活动 1成员</view>
        </view>
        <view class="circle-badge">圈子主</view>
        <view class="circle-top">置顶</view>
      </view>
    </view>
    
    <!-- 底部发布按钮 -->
    <button class="publish-btn" @click="CreateActivity">
      <text class="publish-icon">+</text>
      <text class="publish-text">发布</text>
    </button>
    
    <!-- 底部活动提示 -->
    <view class="activity-footer">
      <text class="footer-text">活动</text>
      <text class="footer-text">感兴趣的</text>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      // 可以在这里添加数据
    };
  },
  methods: {
	CreateActivity(){
		console.log('hello,CreateActivity')
	}
  }
};
</script>

<style scoped>
.user-container {
  background-color: #f5f5f5;
  min-height: 100vh;
  font-size: 28rpx;
}

/* 顶部用户信息区域 */
.user-header {
  background-color: #333;
  color: white;
  padding: 40rpx 30rpx 30rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
}

.user-details {
  flex: 1;
}

.username {
  font-size: 36rpx;
  font-weight: bold;
  margin-bottom: 8rpx;
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

.header-actions {
  display: flex;
  gap: 20rpx;
  align-items: center;
}

.action-btn {
  font-size: 28rpx;
  opacity: 0.8;
}

/* 访客标识 */
.visitor-badge {
  background-color: #333;
  color: white;
  padding: 0 30rpx 20rpx;
  text-align: right;
  font-size: 24rpx;
}

.visitor-text {
  background-color: rgba(255, 255, 255, 0.2);
  padding: 4rpx 12rpx;
  border-radius: 16rpx;
}

/* 成为会员提示 */
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

/* 统计数据区域 */
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

/* 功能导航区 */
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

/* 个人数据区 */
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

/* 圈子管理区域 */
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

/* 底部发布按钮 */
.publish-btn {
  position: fixed;
  bottom: 120rpx;
  right: 30rpx;
  background-color: #ff6b00;
  color: white;
  width: 120rpx;
  height: 120rpx;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4rpx 12rpx rgba(255, 107, 0, 0.3);
}

.publish-icon {
  font-size: 48rpx;
  line-height: 48rpx;
}

.publish-text {
  font-size: 20rpx;
  line-height: 20rpx;
}

/* 底部活动提示 */
.activity-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  padding: 20rpx;
  display: flex;
  justify-content: space-around;
  border-top: 1rpx solid #f0f0f0;
}

.footer-text {
  font-size: 28rpx;
  font-weight: bold;
  color: #333;
}

.footer-text:nth-child(2) {
  color: #999;
}
</style>