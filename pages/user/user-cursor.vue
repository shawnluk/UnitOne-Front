<template>
	<view class="page">
		<!-- 顶部背景与头像 -->
		<view class="top">
			<image class="top-bg" src="/static/Snipaste_2024-07-25_10-44-27.png" mode="widthFix"></image>
			<view class="profile-card">
				<view class="profile-left">
					<image class="avatar" src="/static/R-C.jpg" mode="aspectFill"></image>
					<view class="profile-info">
						<view class="name">shawn</view>
						<view class="uid">取收号：987627983</view>
						<view class="tags">
							<text class="tag">1年</text>
							<text class="tag orange">已绑手机</text>
						</view>
					</view>
				</view>
				<view class="profile-right">
					<view class="profile-buttons">
						<view class="btn icon">⋯</view>
						<view class="btn">-</view>
						<view class="btn icon">◉</view>
					</view>
					<view class="role">访客</view>
					<view class="notice">NEW</view>
				</view>
			</view>
		</view>

		<!-- 会员卡片 -->
		<view class="card vip-card">
			<view class="vip-title">成为会员</view>
			<view class="vip-desc">付费一场活动，立即成为取收会员</view>
			<button class="vip-btn" size="mini" type="default">查看会员权益 &gt;</button>
		</view>

		<!-- 伙伴/伙卡及伏星 -->
		<view class="pair-card card">
			<view class="pair-left">
				<view class="pair-item">
					<view class="pair-num">0</view>
					<view class="pair-label">伙伴</view>
				</view>
				<view class="pair-item">
					<view class="pair-num">0</view>
					<view class="pair-label">伙卡</view>
				</view>
			</view>
			<view class="pair-divider"></view>
			<view class="pair-right">
				<view class="star-label">伏星</view>
				<view class="star-count">{{ star }}</view>
				<button class="star-btn" size="mini" type="warn">待领取</button>
			</view>
		</view>

		<!-- 功能入口 -->
		<view class="grid card">
			<view v-for="item in entryList" :key="item.name" class="grid-item">
				<view class="grid-icon">{{ item.icon }}</view>
				<view class="grid-text">{{ item.name }}</view>
			</view>
		</view>

		<!-- 数据行 -->
		<view class="stats card">
			<view v-for="item in stats" :key="item.name" class="stat-item">
				<view class="stat-num">{{ item.value }}</view>
				<view class="stat-label">{{ item.name }}</view>
			</view>
		</view>

		<!-- 圈子管理 -->
		<view class="card group-card">
			<view class="group-header">
				<view class="group-title">圈子管理</view>
				<view class="group-more">更多 &gt;</view>
			</view>
			<view class="group-item">
				<image class="group-cover" src="/static/Snipaste_2023-05-08_16-59-13.png" mode="aspectFill"></image>
				<view class="group-info">
					<view class="group-name">皇家球迷足球活动</view>
					<view class="group-meta">【圈主】 1成员</view>
					<view class="group-states">
						<text class="state active">置顶</text>
						<text class="state">审批</text>
						<text class="state">活动邀请</text>
					</view>
				</view>
				<button class="publish-btn" type="warn" size="mini">+ 发布</button>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			star: 5,
			entryList: [
				{ name: '订单', icon: '📄' },
				{ name: '钱包', icon: '👛' },
				{ name: '客服', icon: '☎️' },
				{ name: '设置', icon: '⚙️' }
			],
			stats: [
				{ name: '圈子', value: 4 },
				{ name: '好友', value: 1 },
				{ name: '历史活动', value: 0 },
				{ name: '相册', value: 0 }
			]
		};
	}
};
</script>

<style>
.page {
	background: #f6f6f6;
	min-height: 100vh;
	padding: 20rpx;
	box-sizing: border-box;
}

.top {
	position: relative;
	margin-bottom: 20rpx;
}

.top-bg {
	width: 100%;
	border-radius: 20rpx;
}

.profile-card {
	position: absolute;
	left: 20rpx;
	right: 20rpx;
	bottom: -60rpx;
	background: #fff;
	border-radius: 20rpx;
	padding: 20rpx;
	display: flex;
	justify-content: space-between;
	box-shadow: 0 10rpx 30rpx rgba(0, 0, 0, 0.08);
}

.profile-left {
	display: flex;
}

.avatar {
	width: 120rpx;
	height: 120rpx;
	border-radius: 50%;
	margin-right: 20rpx;
}

.profile-info .name {
	font-size: 32rpx;
	font-weight: 600;
}

.uid {
	color: #888;
	font-size: 24rpx;
	margin: 4rpx 0;
}

.tags {
	display: flex;
	gap: 10rpx;
}

.tag {
	padding: 6rpx 12rpx;
	background: #eee;
	border-radius: 12rpx;
	font-size: 22rpx;
}

.tag.orange {
	background: #ffe8d8;
	color: #ff7f3f;
}

.profile-right {
	align-items: flex-end;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}

.profile-buttons {
	display: flex;
	gap: 10rpx;
}

.btn {
	width: 60rpx;
	height: 60rpx;
	border-radius: 12rpx;
	background: #f2f2f2;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 28rpx;
}

.btn.icon {
	font-size: 34rpx;
}

.role {
	font-size: 24rpx;
	color: #888;
}

.notice {
	background: #ff4d4f;
	color: #fff;
	padding: 4rpx 10rpx;
	border-radius: 999rpx;
	font-size: 20rpx;
}

.card {
	background: #fff;
	border-radius: 20rpx;
	padding: 24rpx;
	box-shadow: 0 10rpx 30rpx rgba(0, 0, 0, 0.05);
	margin-top: 80rpx;
}

.vip-card {
	margin-top: 60rpx;
	background: linear-gradient(90deg, #fef5ec, #ffffff);
}

.vip-title {
	font-size: 32rpx;
	font-weight: 600;
}

.vip-desc {
	margin: 10rpx 0;
	color: #666;
	font-size: 24rpx;
}

.vip-btn {
	width: 230rpx;
	color: #ff7f3f;
	border: 1px solid #ff7f3f;
}

.pair-card {
	display: flex;
	align-items: center;
	margin-top: 20rpx;
}

.pair-left {
	flex: 1;
	display: flex;
	justify-content: space-around;
}

.pair-item {
	text-align: center;
}

.pair-num {
	font-size: 36rpx;
	font-weight: 700;
}

.pair-label {
	color: #999;
	margin-top: 6rpx;
}

.pair-divider {
	width: 2rpx;
	height: 100rpx;
	background: #f0f0f0;
	margin: 0 20rpx;
}

.pair-right {
	width: 200rpx;
	text-align: center;
}

.star-label {
	color: #888;
	font-size: 24rpx;
}

.star-count {
	font-size: 48rpx;
	color: #ff7f3f;
	margin: 4rpx 0;
}

.star-btn {
	width: 160rpx;
}

.grid {
	margin-top: 20rpx;
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: 10rpx 0;
}

.grid-item {
	align-items: center;
	display: flex;
	flex-direction: column;
}

.grid-icon {
	width: 80rpx;
	height: 80rpx;
	border-radius: 18rpx;
	background: #fff5ed;
	color: #ff7f3f;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 40rpx;
}

.grid-text {
	margin-top: 10rpx;
	color: #333;
	font-size: 24rpx;
}

.stats {
	display: flex;
	justify-content: space-between;
	margin-top: 20rpx;
}

.stat-item {
	flex: 1;
	text-align: center;
}

.stat-num {
	font-size: 34rpx;
	font-weight: 700;
}

.stat-label {
	color: #999;
	margin-top: 6rpx;
	font-size: 24rpx;
}

.group-card {
	margin-top: 20rpx;
}

.group-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 20rpx;
}

.group-title {
	font-size: 32rpx;
	font-weight: 600;
}

.group-more {
	color: #999;
	font-size: 24rpx;
}

.group-item {
	display: flex;
	align-items: center;
	position: relative;
}

.group-cover {
	width: 160rpx;
	height: 160rpx;
	border-radius: 16rpx;
	object-fit: cover;
	margin-right: 20rpx;
}

.group-info {
	flex: 1;
}

.group-name {
	font-size: 30rpx;
	font-weight: 600;
}

.group-meta {
	margin: 8rpx 0;
	color: #999;
	font-size: 22rpx;
}

.group-states {
	display: flex;
	gap: 10rpx;
	flex-wrap: wrap;
}

.state {
	padding: 6rpx 14rpx;
	border-radius: 12rpx;
	background: #f5f5f5;
	font-size: 22rpx;
	color: #666;
}

.state.active {
	background: #fff1e6;
	color: #ff7f3f;
}

.publish-btn {
	position: absolute;
	right: 0;
	bottom: 0;
	width: 140rpx;
}
</style>