<template>
  <view class="activity-container">
    <!-- 顶部导航栏 -->
    <view class="header">
      <view class="header-left">
        <button class="back-btn" @click="backTo">←</button>
        <text class="home-btn">🏠</text>
      </view>
      <view class="header-center">
        <text class="logo">⚡</text>
        <text class="app-name">取伙</text>
      </view>
      <view class="header-right">
        <text class="action-btn">...</text>
        <text class="action-btn">—</text>
        <text class="action-btn">⚪</text>
      </view>
    </view>
    
    <!-- 活动标题和状态 -->
    <view class="activity-header">
      <view class="activity-tags">
        <text class="tag sport-tag">{{actDetail.data.acid}}</text>
        <text class="tag ufc-tag">{{actDetail.data.name}}</text>
      </view>
      <text class="activity-title">{{actDetail.data.title}}</text>
      <text class="activity-status">候补中 0</text>
    </view>
    
    <!-- 活动图片 -->
    <view class="activity-image">
      <image src="/static/helloworld_01.jpg" mode="aspectFill"></image>
      <text class="image-text">{{actDetail.data.title}}</text>
      <text class="image-subtext">强者如律 拳拳到肉</text>
      <view class="image-badges">
        <text class="badge">🏆</text>
        <text class="badge">🎟️</text>
        <text class="badge">🔥</text>
      </view>
    </view>
    
    <!-- 价格信息 -->
    <view class="price-section">
      <text class="price">¥ 25</text>
    </view>
    
    <!-- 时间地点信息 -->
    <view class="time-location">
      <text class="time">{{actDetail.data.time}}</text>
      <view class="location">
        <!-- <text>广州市 | </text> -->
        <text class="location-detail">{{actDetail.data.locationText}}</text>
        <text class="location-arrow">></text>
      </view>
    </view>
    
    <!-- 参与人数 -->
    <view class="participants-section">
      <view class="participants-header">
        <text class="participants-count">参与人数 {{actDetail.data.joinCount}} ></text>
        <text class="wave-btn">🌊 测一测</text>
      </view>
	  <scroll-view scroll-x class="hc-scroll" :show-scrollbar="false" >
	  	<view class="participants-avatars">
	  	  <view class="avatar-item" v-for="(item, index) in actDetail.data.joinAvatars" :key="index">
	  	    <image class="avatar" :src="item" mode="aspectFill"></image>
	  	    <!-- <text class="avatar-name">{{ participant.name }}</text> -->
	  	  </view>
	  	</view>
	  </scroll-view>
    </view>
    
    <!-- 标签页 -->
    <view class="tab-section">
      <text class="tab">主办方</text>
      <text class="tab active">活动详情</text>
      <text class="tab">报名须知</text>
      <text class="tab highlighted">我搭子</text>
    </view>
    
    <!-- 活动详情内容 -->
    <view class="content-section">
      <text class="content-title">【CAGES×UFC线下观赛团】</text>
      <text class="content-text">嗨大家好！</text>
      <text class="content-text">UFC324倒计时一周冲刺！🔥</text>
    </view>
    
    <!-- 底部操作栏 -->
    <view class="bottom-bar">
      <view class="bottom-left">
        <text class="action-icon">↗️</text>
        <text class="action-icon">💬</text>
      </view>
      <view class="bottom-right">
        <button class="register-btn">立即报名</button>
      </view>
    </view>
  </view>
</template>

<script setup>
	import { reactive, ref } from 'vue';
	import { onLoad } from '@dcloudio/uni-app'
	
	const actDetail = reactive({
		data:{},
		// joinAvatars:[],
	})
	onLoad((option)=>{		
		// console.log(item)
		// actDetail.data = JSON.parse(decodeURIComponent(option.item))
		// console.log(actDetail.data)
	})
	
	const backTo = () => {
			uni.navigateTo({
				url:"/pages/index/index"
			})
	};
	// backTo(()=>{
	// 	uni.navigateBack()
	// })
	
	// {
	// 	acid:1,
	// 	name:"1-1",
	// 	isActive:false,
	// 	cover:"/static/e_000100_r_w.png",
	// 	title:"标题-1",
	// 	locationText:"地址-1",
	// 	timeText:"时间",
	// 	orgAvatar: '/static/logo.png',
	// 	orgName:"作者-1",
	// 	joinCount:10,
	// 	joinAvatars: ['/static/flag_007_ll.png', '/static/e_000108_r.png', '/static/e_000103_r.png'],
	// },
	// 参与人员数据
	// const participants = ref([
	//   { name: 'El-Dla...', avatar: '/static/helloworld_01.jpg' },
	//   { name: '薛', avatar: '/static/helloworld_02.jpg' },
	//   { name: '艾斯的...', avatar: '/static/logo.png' },
	//   { name: 'JC', avatar: '/static/real-madrid-ucl-1024x1024.jpg' },
	//   { name: 'Chase', avatar: '/static/e_000100_r_w.png' },
	//   { name: '沈先生', avatar: '/static/e_000102_r_ll.png' }
	// ]);

	// 活动详情数据
	// const activityDetails = ref({
	//   title: 'UFC324广州线下观赛活动',
	//   status: '候补中 0',
	//   price: '¥ 25',
	//   time: '2026年01月25日 周日 10:00 - 14:00',
	//   location: '广州市 | CAGES凯吉思·江景露台·运动西餐吧(琶醍店)',
	//   participantsCount: 12
	// });

	// 方法
	const handleBack = () => {
	  console.log('返回');
	};

	const handleRegister = () => {
	  console.log('立即报名');
	};

	const handleShare = () => {
	  console.log('分享');
	};

	const handleComment = () => {
	  console.log('评论');
	};

</script>

<style scoped>
.activity-container {
  background-color: #1a1a1a;
  color: white;
  min-height: 100vh;
  font-size: 28rpx;
}

/* 顶部导航栏 */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20rpx 30rpx;
  background-color: #1a1a1a;
  border-bottom: 1rpx solid #333;
}

.header-left {
  display: flex;
  gap: 20rpx;
}

.back-btn {
  font-size: 36rpx;
}

.home-btn {
  font-size: 32rpx;
}

.header-center {
  display: flex;
  align-items: center;
  gap: 10rpx;
}

.logo {
  font-size: 32rpx;
}

.app-name {
  font-size: 32rpx;
  font-weight: bold;
  color: #ff6b00;
}

.header-right {
  display: flex;
  gap: 20rpx;
}

.action-btn {
  font-size: 28rpx;
  color: #999;
}

/* 活动标题和状态 */
.activity-header {
  padding: 30rpx;
}

.activity-tags {
  display: flex;
  gap: 10rpx;
  margin-bottom: 20rpx;
}

.tag {
  font-size: 20rpx;
  padding: 6rpx 12rpx;
  border-radius: 12rpx;
}

.sport-tag {
  background-color: #1890ff;
}

.ufc-tag {
  background-color: #ff4d4f;
}

.activity-title {
  font-size: 36rpx;
  font-weight: bold;
  margin-bottom: 10rpx;
  line-height: 1.3;
}

.activity-status {
  font-size: 24rpx;
  color: #ff6b00;
}

/* 活动图片 */
.activity-image {
  position: relative;
  height: 400rpx;
  margin: 0 30rpx 30rpx;
  border-radius: 16rpx;
  overflow: hidden;
}

.activity-image image {
  width: 100%;
  height: 100%;
}

.image-text {
  position: absolute;
  bottom: 100rpx;
  left: 30rpx;
  font-size: 36rpx;
  font-weight: bold;
  color: white;
  text-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.5);
}

.image-subtext {
  position: absolute;
  bottom: 70rpx;
  left: 30rpx;
  font-size: 24rpx;
  color: white;
  text-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.5);
}

.image-badges {
  position: absolute;
  bottom: 30rpx;
  left: 30rpx;
  display: flex;
  gap: 10rpx;
}

.badge {
  font-size: 24rpx;
}

/* 价格信息 */
.price-section {
  padding: 0 30rpx 20rpx;
}

.price {
  font-size: 48rpx;
  font-weight: bold;
  color: #ff6b00;
}

/* 时间地点信息 */
.time-location {
  padding: 0 30rpx 30rpx;
  border-bottom: 1rpx solid #333;
}

.time {
  display: block;
  font-size: 28rpx;
  margin-bottom: 15rpx;
  line-height: 1.3;
}

.location {
  font-size: 24rpx;
  color: #ccc;
  display: flex;
  align-items: center;
}

.location-detail {
  flex: 1;
  margin-right: 10rpx;
  line-height: 1.3;
}

.location-arrow {
  font-size: 20rpx;
}

/* 参与人数 */
.hc-scroll {
  white-space: nowrap;
}

.participants-section {
  padding: 30rpx;
  border-bottom: 1rpx solid #333;
}

.participants-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20rpx;
}

.participants-count {
  font-size: 28rpx;
  font-weight: bold;
}

.wave-btn {
  font-size: 24rpx;
  background-color: #ff6b00;
  color: white;
  padding: 8rpx 16rpx;
  border-radius: 16rpx;
}

.participants-avatars {
  display: flex;
  /* flex-wrap: wrap; */
  gap: 20rpx;
}

.avatar-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100rpx;
}

.avatar {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  margin-bottom: 10rpx;
}

.avatar-name {
  font-size: 20rpx;
  color: #ccc;
  text-align: center;
  line-height: 1.2;
}

/* 标签页 */
.tab-section {
  display: flex;
  padding: 30rpx;
  border-bottom: 1rpx solid #333;
  gap: 30rpx;
  overflow-x: auto;
}

.tab {
  font-size: 28rpx;
  color: #999;
  white-space: nowrap;
  padding-bottom: 10rpx;
  position: relative;
}

.tab.active {
  color: white;
  font-weight: bold;
}

.tab.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 4rpx;
  background-color: #1890ff;
  border-radius: 2rpx;
}

.tab.highlighted {
  color: #ff6b00;
  font-weight: bold;
}

/* 活动详情内容 */
.content-section {
  padding: 30rpx;
  min-height: 400rpx;
}

.content-title {
  font-size: 32rpx;
  font-weight: bold;
  margin-bottom: 20rpx;
  display: block;
}

.content-text {
  font-size: 28rpx;
  line-height: 1.5;
  margin-bottom: 20rpx;
  display: block;
  color: #ccc;
}

/* 底部操作栏 */
.bottom-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #1a1a1a;
  border-top: 1rpx solid #333;
  padding: 20rpx 30rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.bottom-left {
  display: flex;
  gap: 30rpx;
}

.action-icon {
  font-size: 36rpx;
}

.bottom-right {
  flex: 1;
  margin-left: 30rpx;
}

.register-btn {
  background-color: #ff6b00;
  color: white;
  font-size: 32rpx;
  font-weight: bold;
  padding: 20rpx;
  border-radius: 12rpx;
  width: 100%;
  border: none;
}
</style>