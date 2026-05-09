<template>
	<view class="squadSection">
		<view class="squadInner">
			<view class="squadHeader">
				<text class="squadTitle">{{ title }}</text>
				<view
					class="squadMoreWrap"
					hover-class="squadMoreWrap--hover"
					hover-stay-time="120"
					@tap="goCreateUnit"
				>
					<text class="squadMore">{{ moreText }}</text>
				</view>
			</view>
			<view class="squadItem">
				<image class="squadCover" :src="item.cover" mode="aspectFill" />
				<view class="squadInfo">
					<view class="squadName">{{ item.name }}</view>
					<view class="squadStats">{{ item.stats }}</view>
				</view>
				<view class="squadTags">
					<text class="squadBadge">{{ item.badge }}</text>
					<text class="squadTop">{{ item.topTag }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'UserSquadPanel',
	data() {
		return {
			title: '小队管理',
			moreText: '更多 >',
			item: {
				cover: 'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/real-madrid-ucl-1024x1024.jpg',
				name: '皇马球迷足球活动',
				stats: '0活动 1成员',
				badge: '小队长',
				topTag: '置顶',
			},
		}
	},
	methods: {
		goCreateUnit() {
			uni.navigateTo({
				url: '/src/create-unit/create-unit',
				fail: () => {
					uni.showToast({ title: '页面打开失败', icon: 'none' })
				},
			})
		},
	},
}
</script>

<style scoped>
.squadSection {
	position: relative;
	overflow: hidden;
	background: linear-gradient(145deg, #ffffff 0%, #f8f3ff 52%, #f0faff 100%);
	border-radius: 32rpx;
	padding: 22rpx;
	box-shadow: 0 20rpx 48rpx rgba(105, 62, 255, 0.13);
	border: 2rpx solid rgba(255, 255, 255, 0.9);
}

.squadSection::before {
	content: '';
	position: absolute;
	top: -50rpx;
	right: -36rpx;
	width: 160rpx;
	height: 160rpx;
	border-radius: 50%;
	background: radial-gradient(circle, rgba(125, 95, 255, 0.18) 0%, rgba(125, 95, 255, 0) 70%);
	pointer-events: none;
}

.squadInner {
	position: relative;
	z-index: 1;
}

.squadHeader {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 18rpx;
}

.squadTitle {
	font-size: 30rpx;
	font-weight: 700;
	color: #1b1732;
	letter-spacing: 0.2rpx;
}

.squadMoreWrap {
	padding: 10rpx 16rpx;
	margin: -6rpx -10rpx -6rpx 0;
	border-radius: 999rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: opacity 0.15s ease;
}

.squadMoreWrap--hover {
	background: rgba(125, 95, 255, 0.12);
}

.squadMore {
	font-size: 24rpx;
	color: #5d37ff;
	font-weight: 600;
}

.squadItem {
	display: flex;
	align-items: center;
	gap: 20rpx;
	padding: 18rpx;
	background: rgba(255, 255, 255, 0.72);
	border-radius: 24rpx;
	border: 1rpx solid rgba(255, 255, 255, 0.86);
	box-shadow: 0 8rpx 22rpx rgba(50, 40, 90, 0.08);
}

.squadCover {
	width: 120rpx;
	height: 120rpx;
	border-radius: 24rpx;
	box-shadow: 0 14rpx 28rpx rgba(50, 40, 90, 0.18);
	flex-shrink: 0;
}

.squadInfo {
	flex: 1;
	min-width: 0;
}

.squadName {
	font-size: 28rpx;
	font-weight: 600;
	color: #1b1732;
	margin-bottom: 8rpx;
}

.squadStats {
	font-size: 22rpx;
	color: #6c6392;
}

.squadTags {
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	gap: 10rpx;
	flex-shrink: 0;
}

.squadBadge {
	display: inline-flex;
	align-items: center;
	height: 40rpx;
	font-size: 20rpx;
	font-weight: 600;
	color: #ffffff;
	background: linear-gradient(90deg, #7d5fff 0%, #ff5fb3 100%);
	padding: 0 14rpx;
	border-radius: 20rpx;
	box-shadow: 0 8rpx 18rpx rgba(125, 95, 255, 0.28);
}

.squadTop {
	font-size: 20rpx;
	font-weight: 600;
	color: #5d37ff;
	background: linear-gradient(90deg, rgba(125, 95, 255, 0.14) 0%, rgba(255, 95, 179, 0.12) 100%);
	padding: 6rpx 14rpx;
	border-radius: 999rpx;
	border: 1rpx solid rgba(125, 95, 255, 0.26);
}
</style>
