<template>
	<view class="activityContainer">
		<!-- 顶部导航栏 -->
		<view class="header">
			<view class="headerLeft">
				<button class="backBtn" @click="backTo">←</button>
				<text class="homeBtn">🏠</text>
			</view>
			<view class="headerCenter">
				<text class="logo">⚡</text>
				<text class="appName">取伙</text>
			</view>
			<view class="headerRight">
				<text class="actionBtn">...</text>
				<text class="actionBtn">—</text>
				<text class="actionBtn">⚪</text>
			</view>
		</view>

		<!-- 活动标题和状态 -->
		<view class="activityHeader">
			<view class="activityTags">
				<text class="tag sportTag">{{actDetail.data.acid}}</text>
				<text class="tag ufcTag">{{actDetail.data.name}}</text>
			</view>
			<text class="activityTitle">{{actDetail.data.title}}</text>
			<text class="activityStatus">候补中 0</text>
		</view>

		<!-- 活动图片 -->
		<view class="activityImage">
			<image src="/static/helloworld_01.jpg" mode="aspectFill"></image>
			<text class="imageText">{{actDetail.data.title}}</text>
			<text class="imageSubtext">强者如律 拳拳到肉</text>
			<view class="imageBadges">
				<text class="badge">🏆</text>
				<text class="badge">🎟️</text>
				<text class="badge">🔥</text>
			</view>
		</view>

		<!-- 价格信息 -->
		<view class="priceSection">
			<text class="price">¥ 25</text>
		</view>

		<!-- 时间地点信息 -->
		<view class="timeLocation">
			<text class="time">{{actDetail.data.time}}</text>
			<view class="location">
				<!-- <text>广州市 | </text> -->
				<text class="locationDetail">{{actDetail.data.locationText}}</text>
				<text class="locationArrow">></text>
			</view>
		</view>

		<!-- 参与人数 -->
		<view class="participantsSection">
			<view class="participantsHeader">
				<text class="participantsCount">参与人数 {{actDetail.data.joinCount}} ></text>
				<text class="waveBtn">🌊 测一测</text>
			</view>
		<scroll-view scroll-x class="hcScroll" :show-scrollbar="false" >
			<view class="participantsAvatars">
				<view class="avatarItem" v-for="(item, index) in actDetail.data.joinAvatars" :key="index">
					<image class="avatar" :src="item" mode="aspectFill"></image>
					<!-- <text class="avatar-name">{{ participant.name }}</text> -->
				</view>
			</view>
		</scroll-view>
		</view>

		<!-- 标签页 -->
		<view class="tabSection">
			<text class="tab">主办方</text>
			<text class="tab active">活动详情</text>
			<text class="tab">报名须知</text>
			<text class="tab highlighted">我搭子</text>
		</view>

		<!-- 活动详情内容 -->
		<view class="contentSection">
			<text class="contentTitle">【CAGES×UFC线下观赛团】</text>
			<text class="contentText">嗨大家好！</text>
			<text class="contentText">UFC324倒计时一周冲刺！🔥</text>
		</view>

		<!-- 底部操作栏 -->
		<view class="bottomBar">
			<view class="bottomLeft">
				<text class="actionIcon">↗️</text>
				<text class="actionIcon">💬</text>
			</view>
			<view class="bottomRight">
				<button class="registerBtn">立即报名</button>
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
.activityContainer {
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

.headerLeft {
	display: flex;
	gap: 20rpx;
}

.backBtn {
	font-size: 36rpx;
}

.homeBtn {
	font-size: 32rpx;
}

.headerCenter {
	display: flex;
	align-items: center;
	gap: 10rpx;
}

.logo {
	font-size: 32rpx;
}

.appName {
	font-size: 32rpx;
	font-weight: bold;
	color: #ff6b00;
}

.headerRight {
	display: flex;
	gap: 20rpx;
}

.actionBtn {
	font-size: 28rpx;
	color: #999;
}

/* 活动标题和状态 */
.activityHeader {
	padding: 30rpx;
}

.activityTags {
	display: flex;
	gap: 10rpx;
	margin-bottom: 20rpx;
}

.tag {
	font-size: 20rpx;
	padding: 6rpx 12rpx;
	border-radius: 12rpx;
}

.sportTag {
	background-color: #1890ff;
}

.ufcTag {
	background-color: #ff4d4f;
}

.activityTitle {
	font-size: 36rpx;
	font-weight: bold;
	margin-bottom: 10rpx;
	line-height: 1.3;
}

.activityStatus {
	font-size: 24rpx;
	color: #ff6b00;
}

/* 活动图片 */
.activityImage {
	position: relative;
	height: 400rpx;
	margin: 0 30rpx 30rpx;
	border-radius: 16rpx;
	overflow: hidden;
}

.activityImage image {
	width: 100%;
	height: 100%;
}

.imageText {
	position: absolute;
	bottom: 100rpx;
	left: 30rpx;
	font-size: 36rpx;
	font-weight: bold;
	color: white;
	text-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.5);
}

.imageSubtext {
	position: absolute;
	bottom: 70rpx;
	left: 30rpx;
	font-size: 24rpx;
	color: white;
	text-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.5);
}

.imageBadges {
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
.priceSection {
	padding: 0 30rpx 20rpx;
}

.price {
	font-size: 48rpx;
	font-weight: bold;
	color: #ff6b00;
}

/* 时间地点信息 */
.timeLocation {
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

.locationDetail {
	flex: 1;
	margin-right: 10rpx;
	line-height: 1.3;
}

.locationArrow {
	font-size: 20rpx;
}

/* 参与人数 */
.hcScroll {
	white-space: nowrap;
}

.participantsSection {
	padding: 30rpx;
	border-bottom: 1rpx solid #333;
}

.participantsHeader {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 20rpx;
}

.participantsCount {
	font-size: 28rpx;
	font-weight: bold;
}

.waveBtn {
	font-size: 24rpx;
	background-color: #ff6b00;
	color: white;
	padding: 8rpx 16rpx;
	border-radius: 16rpx;
}

.participantsAvatars {
	display: flex;
	/* flex-wrap: wrap; */
	gap: 20rpx;
}

.avatarItem {
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

.avatarName {
	font-size: 20rpx;
	color: #ccc;
	text-align: center;
	line-height: 1.2;
}

/* 标签页 */
.tabSection {
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
.contentSection {
	padding: 30rpx;
	min-height: 400rpx;
}

.contentTitle {
	font-size: 32rpx;
	font-weight: bold;
	margin-bottom: 20rpx;
	display: block;
}

.contentText {
	font-size: 28rpx;
	line-height: 1.5;
	margin-bottom: 20rpx;
	display: block;
	color: #ccc;
}

/* 底部操作栏 */
.bottomBar {
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

.bottomLeft {
	display: flex;
	gap: 30rpx;
}

.actionIcon {
	font-size: 36rpx;
}

.bottomRight {
	flex: 1;
	margin-left: 30rpx;
}

.registerBtn {
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